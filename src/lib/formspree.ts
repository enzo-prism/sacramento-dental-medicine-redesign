import type { FirstTouchAttribution } from "./lead-attribution.ts";

const ATTRIBUTION_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "ttclid",
  "ad_id",
] as const;

export type AppointmentLead = {
  name: string;
  phone: string;
  email: string;
  visitType: string;
  date: string;
  dateLabel: string;
  time: string;
  notes: string;
  receivedAt: string;
  measurementEventId?: string;
  attribution: FirstTouchAttribution;
};

export const FORMSPREE_TIMEOUT_MS = 8_000;

const FORMSPREE_ENDPOINT_RE = /^https:\/\/formspree\.io\/f\/[a-z0-9]+\/?$/i;

/** Reject blank or malformed overrides so production cannot lose leads silently. */
export function resolveFormspreeEndpoint(candidate: string | undefined, fallback: string) {
  const value = candidate?.trim();
  return value && FORMSPREE_ENDPOINT_RE.test(value) ? value.replace(/\/$/, "") : fallback;
}

export function buildAppointmentFormspreePayload(lead: AppointmentLead) {
  const attributionLines = ATTRIBUTION_FIELDS.filter((field) => lead.attribution[field]).map(
    (field) => `${field}=${lead.attribution[field]}`,
  );
  const when = [lead.dateLabel || lead.date, lead.time].filter(Boolean).join(" · ");
  const payload: Record<string, string> = {
    subject: `New appointment request from ${lead.name}`,
    form_type: "appointment_request",
    source: lead.visitType
      ? `sacramentodentalmedicine.com ${lead.visitType}`
      : "sacramentodentalmedicine.com appointment request",
    name: lead.name,
    visitType: lead.visitType,
    received_at: lead.receivedAt,
    privacy_check: "confirmed",
    message: [
      "APPOINTMENT REQUEST (not confirmed)",
      lead.visitType && `Visit: ${lead.visitType}`,
      when && `When: ${when}`,
      lead.phone && `Phone: ${lead.phone}`,
      lead.email && `Email: ${lead.email}`,
      lead.notes && `Notes: ${lead.notes}`,
      attributionLines.length ? `Attribution: ${attributionLines.join("; ")}` : "",
      `Received: ${lead.receivedAt}`,
    ]
      .filter(Boolean)
      .join("\n"),
  };
  if (lead.dateLabel || lead.date) payload.date = lead.dateLabel || lead.date;
  if (lead.time) payload.time = lead.time;
  if (lead.measurementEventId) payload.measurement_event_id = lead.measurementEventId;
  if (lead.phone) payload.phone = lead.phone;
  if (lead.email) payload.email = lead.email;
  if (lead.notes) payload.notes = lead.notes;
  for (const field of ATTRIBUTION_FIELDS) {
    if (lead.attribution[field]) payload[field] = lead.attribution[field];
  }
  return payload;
}

function normalizeHttpOrigin(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function resolveFormspreeReferer(
  headersList: Pick<Headers, "get">,
  fallbackOrigin: string,
  path = "/wisdom-teeth-removal-sacramento/",
) {
  const forwardedProto = headersList.get("x-forwarded-proto");
  const forwardedHost = headersList.get("x-forwarded-host") ?? headersList.get("host");
  if (
    forwardedHost &&
    (forwardedProto === "https" || forwardedProto === "http")
  ) {
    return `${forwardedProto}://${forwardedHost}${path}`;
  }

  const origin = normalizeHttpOrigin(headersList.get("origin") ?? "");
  if (origin) return `${origin}${path}`;

  const refererOrigin = normalizeHttpOrigin(headersList.get("referer") ?? "");
  if (refererOrigin) return `${refererOrigin}${path}`;

  return `${fallbackOrigin.replace(/\/$/, "")}${path}`;
}

export function buildFormspreeRequestInit(
  payload: Record<string, string>,
  referer: string,
): RequestInit {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Referer: referer,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(FORMSPREE_TIMEOUT_MS),
  };
}
