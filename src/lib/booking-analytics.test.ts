import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  BOOK_ONLINE_CLICK_EVENT,
  BOOK_ONLINE_LOCATIONS,
  isExternalHref,
  trackBookOnlineClick,
} from "./booking-analytics.ts";

type AnalyticsGlobals = {
  gtag?: (...args: unknown[]) => void;
};

function withGtag(gtag: AnalyticsGlobals["gtag"] | undefined, run: () => void) {
  const globals = globalThis as typeof globalThis & AnalyticsGlobals;
  const previous = globals.gtag;
  if (gtag === undefined) delete globals.gtag;
  else globals.gtag = gtag;
  try {
    run();
  } finally {
    if (previous === undefined) delete globals.gtag;
    else globals.gtag = previous;
  }
}

describe("book online click tracking", () => {
  it("fires GA4 book_online_click with only cta_location", () => {
    const gtagCalls: unknown[][] = [];
    withGtag((...args) => gtagCalls.push(args), () => {
      trackBookOnlineClick("header");
    });
    assert.deepEqual(gtagCalls, [
      ["event", BOOK_ONLINE_CLICK_EVENT, { cta_location: "header" }],
    ]);
    const params = gtagCalls[0]?.[2] as Record<string, unknown>;
    assert.deepEqual(Object.keys(params), ["cta_location"]);
  });

  it("does not throw when gtag is absent", () => {
    withGtag(undefined, () => {
      assert.doesNotThrow(() => trackBookOnlineClick("footer"));
    });
  });

  it("does not throw when gtag throws", () => {
    withGtag(() => {
      throw new Error("gtag down");
    }, () => {
      assert.doesNotThrow(() => trackBookOnlineClick("mobile_cta"));
    });
  });

  it("does not send an event for an unknown placement", () => {
    const gtagCalls: unknown[][] = [];
    withGtag((...args) => gtagCalls.push(args), () => {
      trackBookOnlineClick("not_a_location" as (typeof BOOK_ONLINE_LOCATIONS)[number]);
    });
    assert.deepEqual(gtagCalls, []);
  });

  it("treats only http(s) hrefs as external booking destinations", () => {
    assert.equal(isExternalHref("https://schedule.jarvisanalytics.com/frame"), true);
    assert.equal(isExternalHref("/schedule"), false);
    assert.equal(isExternalHref("/#visit"), false);
  });

  it("covers every placement the site uses", () => {
    for (const location of [
      "header",
      "header_mobile",
      "hero",
      "mobile_cta",
      "footer",
      "schedule_page",
      "reviews",
      "service_page",
    ] as const) {
      assert.ok(BOOK_ONLINE_LOCATIONS.includes(location));
    }
  });
});
