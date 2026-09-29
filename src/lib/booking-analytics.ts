import { GOOGLE_ANALYTICS_MEASUREMENT_ID } from "./google-analytics.ts";

export const BOOK_ONLINE_CLICK_EVENT = "book_online_click";
export const META_SCHEDULE_EVENT = "Schedule";

export const BOOK_ONLINE_LOCATIONS = [
  "header",
  "header_nav",
  "header_menu",
  "header_menu_nav",
  "hero",
  "mobile_cta",
  "footer",
  "footer_nav",
  "schedule_page",
  "schedule_cta",
  "reviews",
  "intro",
  "new_patients",
  "new_patients_page",
  "meet_dr_narodovich",
  "service",
] as const;

export type BookOnlineLocation = (typeof BOOK_ONLINE_LOCATIONS)[number];

const BOOK_ONLINE_LOCATION_SET = new Set<string>(BOOK_ONLINE_LOCATIONS);

type AnalyticsGlobals = {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

function analyticsGlobals() {
  return globalThis as typeof globalThis & AnalyticsGlobals;
}

/** Fixed Jarvis booking URL plus a known placement. Never send form values or PII. */
export function trackBookOnlineClick(location: BookOnlineLocation, linkUrl: string) {
  if (!BOOK_ONLINE_LOCATION_SET.has(location)) return;
  if (typeof linkUrl !== "string" || !linkUrl.startsWith("https://")) return;

  const params = {
    link_location: location,
    link_url: linkUrl,
    send_to: GOOGLE_ANALYTICS_MEASUREMENT_ID,
  };

  try {
    const { gtag } = analyticsGlobals();
    if (typeof gtag === "function") {
      gtag("event", BOOK_ONLINE_CLICK_EVENT, params);
    }
  } catch {
    // Booking navigation must not depend on the Google tag.
  }

  try {
    const { fbq } = analyticsGlobals();
    if (typeof fbq === "function") {
      fbq("track", META_SCHEDULE_EVENT);
    }
  } catch {
    // Meta pixel is optional and currently absent from this site.
  }
}
