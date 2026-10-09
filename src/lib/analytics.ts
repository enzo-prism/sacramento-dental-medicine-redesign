import type { BeforeSendEvent } from "@vercel/analytics/next";

const PRIVATE_PATHS = new Set(["/privacy-practices"]);

export const SCHEDULE_PHONE_CLICK = "Schedule Phone Click";
export const SCHEDULE_EMAIL_CLICK = "Schedule Email Click";

export const CUSTOM_ANALYTICS_EVENTS = [
  SCHEDULE_PHONE_CLICK,
  SCHEDULE_EMAIL_CLICK,
] as const;

export type CustomAnalyticsEvent = (typeof CUSTOM_ANALYTICS_EVENTS)[number];
export type ScheduleContactKind = "phone" | "email";

export function isAllowedCustomAnalyticsEvent(
  name: string,
): name is CustomAnalyticsEvent {
  return (CUSTOM_ANALYTICS_EVENTS as readonly string[]).includes(name);
}

export function scheduleContactEventName(
  kind: ScheduleContactKind,
): CustomAnalyticsEvent {
  switch (kind) {
    case "phone":
      return SCHEDULE_PHONE_CLICK;
    case "email":
      return SCHEDULE_EMAIL_CLICK;
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

function normalizedPathname(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
}

function analyticsPath(pathname: string) {
  const normalized = normalizedPathname(pathname);

  if (PRIVATE_PATHS.has(normalized)) return null;
  if (normalized === "/schedule") return "/conversion";
  if (normalized === "/reviews") return "/reviews";
  return "/";
}

/**
 * Keeps Vercel Web Analytics useful without retaining query strings or a
 * visitor's exact appointment path. Never add form values, treatment reasons,
 * contact details, or attribution parameters to this event.
 */
export function sanitizeVercelAnalyticsEvent(
  event: BeforeSendEvent,
): BeforeSendEvent | null {
  try {
    const isAbsolute = /^https?:\/\//i.test(event.url);
    const url = new URL(event.url, "https://analytics.invalid");
    const path = analyticsPath(url.pathname);

    if (!path) return null;

    return {
      ...event,
      url: isAbsolute ? `${url.origin}${path}` : path,
    };
  } catch {
    return null;
  }
}
