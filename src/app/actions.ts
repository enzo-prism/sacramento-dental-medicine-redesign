"use server";

import { contact } from "@/data/site";
import type { AppointmentState } from "@/lib/appointment";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Native appointment-request handler.
 *
 * This validates the lead and is the single place to wire real delivery
 * (email via Resend, a Dentrix webhook, or a CRM). Until that's connected it
 * logs the lead server-side so submissions are never silently lost.
 *
 * NOTE: Server Functions are reachable via direct POST, so all input is treated
 * as untrusted and validated here. Add rate limiting / CAPTCHA before launch.
 */
export async function requestAppointment(
  _prevState: AppointmentState,
  formData: FormData,
): Promise<AppointmentState> {
  // Honeypot: real users never fill this hidden field. Pretend success on bots.
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

  // A direct POST could skip the step UI, so re-check the scheduling choices.
  if (!visitType || !date || !time) {
    return {
      ok: false,
      message: "Please choose a visit type, day, and time before submitting.",
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

  const lead = {
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
    await deliverLead(lead);
  } catch (err) {
    console.error("[appointment] delivery failed", err);
    return {
      ok: false,
      message: `Something went wrong on our end. Please call us at ${contact.phoneDisplay}.`,
      errors: {},
    };
  }

  return {
    ok: true,
    message:
      "Thanks — your request is in. A team member will call you back shortly to confirm a time.",
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

/**
 * Delivery seam — wire one of these for production:
 *   • Email: connect an approved office inbox through your email provider
 *   • Webhook: `await fetch(process.env.LEAD_WEBHOOK_URL, { method: "POST", ... })`
 * Set the relevant env var in Vercel and replace the log below.
 */
async function deliverLead(lead: Lead): Promise<void> {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`Lead webhook returned ${res.status}`);
    return;
  }
  // Fallback until delivery is configured: don't drop the lead.
  console.info("[appointment] new request (configure LEAD_WEBHOOK_URL to deliver):", lead);
}
