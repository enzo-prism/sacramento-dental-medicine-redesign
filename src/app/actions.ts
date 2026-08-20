"use server";

import { contact, formspreeEndpoint } from "@/data/site";
import type { AppointmentState } from "@/lib/appointment";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  if (field(formData, "company")) {
    return { ok: true, message: "Thanks — we'll be in touch shortly.", errors: {} };
  }

  const name = field(formData, "name");
  const phone = field(formData, "phone");
  const email = field(formData, "email");
  const visitType = field(formData, "visitType");
  const date = field(formData, "date");
  const dateLabel = field(formData, "dateLabel");
  const time = field(formData, "time");
  const notes = field(formData, "notes");

  if (!visitType || !date || !time) {
    return {
      ok: false,
      message: "Please choose a visit type, day, and time of day first.",
      errors: {},
    };
  }

  const errors: AppointmentState["errors"] = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (phone.replace(/\D/g, "").length < 10)
    errors.phone = "Please enter a phone number we can reach you at.";
  if (email && !EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Please fix the highlighted fields and try again.",
      errors,
    };
  }

  const lead: Lead = {
    name,
    phone,
    email,
    visitType,
    date,
    dateLabel,
    time,
    notes,
    receivedAt: new Date().toISOString(),
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

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) console.error("[appointment] extra webhook returned", res.status);
    } catch (err) {
      console.error("[appointment] extra webhook failed", err);
    }
  }

  return {
    ok: true,
    message:
      "Your request was sent. We'll call or text during office hours to confirm a time.",
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
  const payload: Record<string, string> = {
    name: lead.name,
    phone: lead.phone,
    subject: `New appointment request from ${lead.name}`,
    visitType: lead.visitType,
    date: lead.dateLabel || lead.date,
    time: lead.time,
    message: [
      `Visit: ${lead.visitType}`,
      `When: ${lead.dateLabel || lead.date} · ${lead.time}`,
      `Phone: ${lead.phone}`,
      lead.email && `Email: ${lead.email}`,
      lead.notes && `Notes: ${lead.notes}`,
    ]
      .filter(Boolean)
      .join("\n"),
  };
  if (lead.email) payload.email = lead.email;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`Formspree rejected the lead: ${formspreeErrorMessage(body, res.status)}`);
  }
}
