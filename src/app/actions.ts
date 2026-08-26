"use server";

import { after } from "next/server";
import {
  contact,
  formspreeEndpoint,
  officeHours,
  visitTypes,
} from "@/data/site";
import {
  contactFieldErrors,
  formatUsPhone,
  type AppointmentState,
  validateAppointmentSelection,
} from "@/lib/appointment";
import {
  applyAttributionToPayload,
  formatAttributionMessageLines,
  readAttributionFromFormData,
  type FirstTouchAttribution,
} from "@/lib/lead-attribution";

const FORMSPREE_TIMEOUT_MS = 8_000;
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

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      errors,
    };
  }

  const lead: Lead = {
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

  try {
    await deliverToFormspree(lead);
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

type Lead = {
  name: string;
  phone: string;
  email: string;
  visitType: string;
  date: string;
  dateLabel: string;
  time: string;
  notes: string;
  receivedAt: string;
  attribution: FirstTouchAttribution;
};

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

async function deliverToFormspree(lead: Lead): Promise<void> {
  const endpoint = process.env.FORMSPREE_ENDPOINT ?? formspreeEndpoint;
  const attributionLines = formatAttributionMessageLines(lead.attribution);
  const payload: Record<string, string> = {
    name: lead.name,
    subject: `New appointment request from ${lead.name}`,
    visitType: lead.visitType,
    date: lead.dateLabel || lead.date,
    time: lead.time,
    message: [
      `Visit: ${lead.visitType}`,
      `When: ${lead.dateLabel || lead.date} · ${lead.time}`,
      lead.phone && `Phone: ${lead.phone}`,
      lead.email && `Email: ${lead.email}`,
      lead.notes && `Notes: ${lead.notes}`,
      attributionLines.length ? `Attribution: ${attributionLines.join("; ")}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  };
  if (lead.phone) payload.phone = lead.phone;
  if (lead.email) payload.email = lead.email;
  applyAttributionToPayload(payload, lead.attribution);

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(FORMSPREE_TIMEOUT_MS),
  });

  const body: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`Formspree rejected the lead: ${formspreeErrorMessage(body, res.status)}`);
  }
}

async function deliverToWebhook(webhook: string, lead: Lead): Promise<void> {
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
