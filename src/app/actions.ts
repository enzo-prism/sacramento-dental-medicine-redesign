"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import {
  contact,
  formspreeEndpoint,
  officeHours,
  visitTypes,
} from "@/data/site";
import {
  APPOINTMENT_FIELD_LIMITS,
  contactFieldErrors,
  formatUsPhone,
  type AppointmentState,
  validateAppointmentSelection,
} from "@/lib/appointment";
import {
  readAttributionFromFormData,
} from "@/lib/lead-attribution";
import {
  buildAppointmentFormspreePayload,
  buildFormspreeRequestInit,
  resolveFormspreeReferer,
  resolveFormspreeEndpoint,
  type AppointmentLead,
} from "@/lib/formspree";
import { siteUrl } from "@/lib/site-url";

const WEBHOOK_TIMEOUT_MS = 4_000;

function field(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Appointment-request handler.
 *
 * Validates the lead, then delivers via Formspree. Optional LEAD_WEBHOOK_URL
 * is a second hop after Formspree succeeds. Server Functions are reachable
 * via direct POST, so all input is treated as untrusted.
 */
export async function requestAppointment(
  _prevState: AppointmentState,
  formData: FormData,
): Promise<AppointmentState> {
  // Honeypot: real users never fill this. Pretend success on bots.
  if (field(formData, "_gotcha")) {
    return { ok: true, message: "Thanks — we'll be in touch shortly.", errors: {} };
  }

  const name = field(formData, "name");
  const phone = field(formData, "phone");
  const email = field(formData, "email");
  const visitType = field(formData, "visitType");
  const date = field(formData, "date");
  const time = field(formData, "time");
  const notes = field(formData, "notes");
  const privacyConsent = field(formData, "privacyConsent");

  if (!visitType || !date || !time) {
    return {
      ok: false,
      message: "Please choose a visit type, day, and time of day first.",
      errors: {},
    };
  }

  const selection = validateAppointmentSelection(
    { visitType, date, time },
    {
      visitTypeLabels: visitTypes.map((type) => type.label),
      officeHours,
    },
  );
  if (!selection.ok) {
    console.warn("[appointment] rejected invalid selection", selection.reason);
    return {
      ok: false,
      message: "That appointment option is no longer available. Please choose again.",
      errors: {},
    };
  }

  const errors: AppointmentState["errors"] = {
    ...contactFieldErrors(phone, email),
  };
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > APPOINTMENT_FIELD_LIMITS.name) {
    errors.name = "Please keep your name under 120 characters.";
  }
  if (phone.length > APPOINTMENT_FIELD_LIMITS.phone) {
    errors.phone = "Please enter a shorter phone number.";
  }
  if (email.length > APPOINTMENT_FIELD_LIMITS.email) {
    errors.email = "Please keep your email under 254 characters.";
  }
  if (notes.length > APPOINTMENT_FIELD_LIMITS.notes) {
    errors.notes = "Please keep your note under 500 characters.";
  }
  if (privacyConsent !== "confirmed") {
    errors.privacy = "Please confirm that your message does not include sensitive health or payment information.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      errors,
    };
  }

  const lead: AppointmentLead = {
    name,
    phone: phone ? formatUsPhone(phone) : "",
    email,
    visitType,
    date,
    dateLabel: selection.dateLabel,
    time,
    notes,
    receivedAt: new Date().toISOString(),
    attribution: readAttributionFromFormData(formData),
  };
  const formspreeReferer = resolveFormspreeReferer(await headers(), siteUrl);

  try {
    await deliverToFormspree(lead, formspreeReferer);
  } catch (err) {
    console.error("[appointment] Formspree delivery failed", err);
    return {
      ok: false,
      message: `Something went wrong on our end. Please call us at ${contact.phoneDisplay}.`,
      errors: {},
    };
  }

  // Formspree is the authoritative delivery. Run the optional second hop after
  // the response lifecycle so it cannot delay or reverse an accepted request.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      after(() => deliverToWebhook(webhook, lead));
    } catch (err) {
      // Registration is best-effort too: Formspree already accepted the lead.
      console.error("[appointment] could not schedule extra webhook", err);
    }
  }

  return {
    ok: true,
    message:
      "Your request was sent. We'll reach out during office hours to confirm a time.",
    errors: {},
  };
}

function formspreeErrorMessage(body: unknown, status: number): string {
  if (body && typeof body === "object") {
    if ("errors" in body && Array.isArray((body as { errors: unknown }).errors)) {
      const parts = (body as { errors: { message?: string }[] }).errors
        .map((e) => e.message)
        .filter(Boolean);
      if (parts.length) return parts.join("; ");
    }
    if ("error" in body && (body as { error: unknown }).error) {
      return String((body as { error: unknown }).error);
    }
  }
  return `HTTP ${status}`;
}

async function deliverToFormspree(lead: AppointmentLead, referer: string): Promise<void> {
  const endpoint = resolveFormspreeEndpoint(process.env.FORMSPREE_ENDPOINT, formspreeEndpoint);
  const payload = buildAppointmentFormspreePayload(lead);

  const res = await fetch(
    endpoint,
    buildFormspreeRequestInit(payload, referer),
  );

  const body: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`Formspree rejected the lead: ${formspreeErrorMessage(body, res.status)}`);
  }
}

async function deliverToWebhook(webhook: string, lead: AppointmentLead): Promise<void> {
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!res.ok) console.error("[appointment] extra webhook returned", res.status);
  } catch (err) {
    console.error("[appointment] extra webhook failed", err);
  }
}
