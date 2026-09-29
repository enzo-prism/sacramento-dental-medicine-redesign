export const BOOK_ONLINE_CLICK_EVENT = "book_online_click";

export const BOOK_ONLINE_LOCATIONS = [
  "header",
  "header_mobile",
  "hero",
  "mobile_cta",
  "footer",
  "schedule_page",
  "schedule_cta",
  "reviews",
  "intro",
  "new_patients",
  "new_patients_page",
  "meet_dr_narodovich",
  "service_page",
] as const;

export type BookOnlineLocation = (typeof BOOK_ONLINE_LOCATIONS)[number];

export function isExternalHref(href: string) {
  return href.startsWith("https://") || href.startsWith("http://");
}

const BOOK_ONLINE_LOCATION_SET = new Set<string>(BOOK_ONLINE_LOCATIONS);

type AnalyticsGlobals = {
  gtag?: (...args: unknown[]) => void;
};

function analyticsGlobals() {
  return globalThis as typeof globalThis & AnalyticsGlobals;
}

/** One fixed placement label. Never send URLs, query params, or PII. */
export function trackBookOnlineClick(ctaLocation: BookOnlineLocation) {
  if (!BOOK_ONLINE_LOCATION_SET.has(ctaLocation)) return;

  try {
    const { gtag } = analyticsGlobals();
    if (typeof gtag === "function") {
      gtag("event", BOOK_ONLINE_CLICK_EVENT, { cta_location: ctaLocation });
    }
  } catch {
    // Booking navigation must not depend on the Google tag.
  }
}
