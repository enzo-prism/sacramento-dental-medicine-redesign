import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  SCHEDULE_EMAIL_CLICK,
  SCHEDULE_PHONE_CLICK,
  isAllowedCustomAnalyticsEvent,
  sanitizeVercelAnalyticsEvent,
  scheduleContactEventName,
} from "./analytics.ts";
import { trackAllowedCustomEvent } from "./track-event.ts";

describe("sanitizeVercelAnalyticsEvent", () => {
  it("removes query strings and fragments", () => {
    assert.deepEqual(
      sanitizeVercelAnalyticsEvent({
        type: "pageview",
        url: "https://sacramentodentalmedicine.com/reviews/?utm_source=test#ratings",
      }),
      {
        type: "pageview",
        url: "https://sacramentodentalmedicine.com/reviews",
      },
    );
  });

  it("groups the appointment route under a non-clinical conversion path", () => {
    assert.deepEqual(
      sanitizeVercelAnalyticsEvent({
        type: "pageview",
        url: "https://sacramentodentalmedicine.com/schedule/?reason=emergency",
      }),
      {
        type: "pageview",
        url: "https://sacramentodentalmedicine.com/conversion",
      },
    );
  });

  it("does not collect the privacy-practices route", () => {
    assert.equal(
      sanitizeVercelAnalyticsEvent({
        type: "pageview",
        url: "https://sacramentodentalmedicine.com/privacy-practices/",
      }),
      null,
    );
  });

  it("fails closed for malformed URLs", () => {
    assert.equal(
      sanitizeVercelAnalyticsEvent({ type: "pageview", url: "http://[" }),
      null,
    );
  });
});

describe("custom schedule contact events", () => {
  it("allowlists only the phone and email click names", () => {
    assert.equal(scheduleContactEventName("phone"), SCHEDULE_PHONE_CLICK);
    assert.equal(scheduleContactEventName("email"), SCHEDULE_EMAIL_CLICK);
    assert.equal(isAllowedCustomAnalyticsEvent(SCHEDULE_PHONE_CLICK), true);
    assert.equal(isAllowedCustomAnalyticsEvent(SCHEDULE_EMAIL_CLICK), true);
    assert.equal(isAllowedCustomAnalyticsEvent("Lead Submit"), false);
  });

  it("tracks allowlisted events with no properties or PII", () => {
    const vercel: string[] = [];
    const google: string[] = [];
    assert.equal(
      trackAllowedCustomEvent(SCHEDULE_PHONE_CLICK, {
        vercelTrack: (name) => vercel.push(name),
        googleEvent: (name) => google.push(name),
      }),
      true,
    );
    assert.equal(
      trackAllowedCustomEvent("patient@example.com", {
        vercelTrack: (name) => vercel.push(name),
        googleEvent: (name) => google.push(name),
      }),
      false,
    );
    assert.deepEqual(vercel, [SCHEDULE_PHONE_CLICK]);
    assert.deepEqual(google, [SCHEDULE_PHONE_CLICK]);
    assert.ok(!JSON.stringify({ vercel, google }).includes("@"));
    assert.ok(!JSON.stringify({ vercel, google }).includes("916"));
  });
});

