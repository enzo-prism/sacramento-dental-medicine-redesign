import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { sanitizeVercelAnalyticsEvent } from "./analytics.ts";

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
