import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  isGoogleAnalyticsProductionHostname,
  sanitizeGoogleAnalyticsPath,
} from "./google-analytics.ts";

describe("Google Analytics configuration", () => {
  it("uses the authorized Sacramento Dental Medicine stream", () => {
    assert.equal(GOOGLE_ANALYTICS_MEASUREMENT_ID, "G-E1QV3QH6XD");
  });

  it("runs only on the public custom domain", () => {
    assert.equal(
      isGoogleAnalyticsProductionHostname("sacramentodentalmedicine.com"),
      true,
    );
    assert.equal(
      isGoogleAnalyticsProductionHostname("www.sacramentodentalmedicine.com"),
      true,
    );
    assert.equal(
      isGoogleAnalyticsProductionHostname("sacramento-dental-medicine-redesign.vercel.app"),
      false,
    );
    assert.equal(isGoogleAnalyticsProductionHostname("localhost"), false);
  });

  it("removes sensitive appointment context", () => {
    assert.equal(sanitizeGoogleAnalyticsPath("/schedule"), "/conversion");
    assert.equal(sanitizeGoogleAnalyticsPath("/schedule/"), "/conversion");
  });

  it("keeps only the useful public route groups", () => {
    assert.equal(sanitizeGoogleAnalyticsPath("/reviews/"), "/reviews");
    assert.equal(sanitizeGoogleAnalyticsPath("/"), "/");
    assert.equal(sanitizeGoogleAnalyticsPath("/services/implants"), "/");
  });

  it("does not collect the privacy-practices route", () => {
    assert.equal(sanitizeGoogleAnalyticsPath("/privacy-practices/"), null);
  });
});

