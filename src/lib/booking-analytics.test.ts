import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { GOOGLE_ANALYTICS_MEASUREMENT_ID } from "./google-analytics.ts";
import {
  BOOK_ONLINE_CLICK_EVENT,
  BOOK_ONLINE_LOCATIONS,
  META_SCHEDULE_EVENT,
  trackBookOnlineClick,
} from "./booking-analytics.ts";

const jarvis =
  "https://schedule.jarvisanalytics.com/frame?eoid=9251&elid=9000000000334";

type AnalyticsGlobals = {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

function withGlobals(
  overrides: AnalyticsGlobals,
  run: () => void,
) {
  const globals = globalThis as typeof globalThis & AnalyticsGlobals;
  const previous = { gtag: globals.gtag, fbq: globals.fbq };
  globals.gtag = overrides.gtag;
  globals.fbq = overrides.fbq;
  try {
    run();
  } finally {
    if (previous.gtag === undefined) delete globals.gtag;
    else globals.gtag = previous.gtag;
    if (previous.fbq === undefined) delete globals.fbq;
    else globals.fbq = previous.fbq;
  }
}

describe("book online click tracking", () => {
  it("fires GA4 book_online_click with a known location and the Jarvis URL", () => {
    const gtagCalls: unknown[][] = [];
    withGlobals(
      { gtag: (...args) => gtagCalls.push(args) },
      () => {
        trackBookOnlineClick("header", jarvis);
      },
    );
    assert.deepEqual(gtagCalls, [
      [
        "event",
        BOOK_ONLINE_CLICK_EVENT,
        {
          link_location: "header",
          link_url: jarvis,
          send_to: GOOGLE_ANALYTICS_MEASUREMENT_ID,
        },
      ],
    ]);
  });

  it("fires Meta Schedule only when fbq exists", () => {
    const fbqCalls: unknown[][] = [];
    withGlobals(
      { fbq: (...args) => fbqCalls.push(args) },
      () => {
        trackBookOnlineClick("hero", jarvis);
      },
    );
    assert.deepEqual(fbqCalls, [["track", META_SCHEDULE_EVENT]]);
  });

  it("does not throw when gtag and fbq are absent", () => {
    withGlobals({}, () => {
      assert.doesNotThrow(() => trackBookOnlineClick("footer", jarvis));
    });
  });

  it("still fires Meta Schedule when gtag throws", () => {
    const fbqCalls: unknown[][] = [];
    withGlobals(
      {
        gtag: () => {
          throw new Error("gtag down");
        },
        fbq: (...args) => fbqCalls.push(args),
      },
      () => {
        assert.doesNotThrow(() => trackBookOnlineClick("mobile_cta", jarvis));
      },
    );
    assert.deepEqual(fbqCalls, [["track", META_SCHEDULE_EVENT]]);
  });

  it("does not send an event for an unknown location or a non-https URL", () => {
    const gtagCalls: unknown[][] = [];
    withGlobals(
      { gtag: (...args) => gtagCalls.push(args) },
      () => {
        trackBookOnlineClick("header", "javascript:alert(1)");
        trackBookOnlineClick(
          "not_a_location" as (typeof BOOK_ONLINE_LOCATIONS)[number],
          jarvis,
        );
      },
    );
    assert.deepEqual(gtagCalls, []);
  });

  it("covers every placement the site uses", () => {
    for (const location of [
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
    ] as const) {
      assert.ok(BOOK_ONLINE_LOCATIONS.includes(location));
    }
  });
});
