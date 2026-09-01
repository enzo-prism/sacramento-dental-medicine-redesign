import type { BeforeSendEvent } from "@vercel/analytics/next";

const PRIVATE_PATHS = new Set(["/privacy-practices"]);

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
