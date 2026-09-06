import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  googleAnalyticsPageParameters,
  isGoogleAnalyticsProductionHostname,
  safeGoogleAnalyticsAcquisition,
  sanitizeGoogleAnalyticsPath,
} from "./google-analytics.ts";
import { createGoogleAnalyticsController } from "./google-analytics-runtime.ts";
import { servicePages } from "../data/service-pages.ts";

describe("Google Analytics measurement boundary", () => {
  it("uses only the authorized stream and production hosts", () => {
    assert.equal(GOOGLE_ANALYTICS_MEASUREMENT_ID, "G-E1QV3QH6XD");
    for (const host of ["sacramentodentalmedicine.com", "www.sacramentodentalmedicine.com"]) assert.equal(isGoogleAnalyticsProductionHostname(host), true);
    for (const host of ["localhost", "sacramento-dental-medicine-redesign.vercel.app", "sacramentodentalmedicine.com.evil.com"]) assert.equal(isGoogleAnalyticsProductionHostname(host), false);
  });
  it("distinguishes public page groups without retaining treatment names", () => {
    assert.equal(sanitizeGoogleAnalyticsPath("/schedule/"), "/conversion");
    assert.equal(sanitizeGoogleAnalyticsPath("/reviews/?email=private#name"), "/reviews");
    assert.equal(sanitizeGoogleAnalyticsPath("/meet-dr-narodovich"), "/team");
    assert.equal(sanitizeGoogleAnalyticsPath("/new-patients"), "/new-patients");
    for (const service of servicePages) {
      assert.equal(sanitizeGoogleAnalyticsPath(`/${service.slug}`), service.slug === "our-services" ? "/our-services" : "/care");
    }
  });
  it("fails closed for private, unknown, and malformed routes", () => {
    for (const path of ["/privacy-practices/", "/patient/123", "/unknown", "//evil.com", "https://evil.com", "/constructor"]) assert.equal(sanitizeGoogleAnalyticsPath(path), null);
  });
  it("preserves only known referral hosts, never paths, search terms, or credentials", () => {
    assert.deepEqual(safeGoogleAnalyticsAcquisition("", "https://www.google.com/search?q=private"), {page_referrer:"https://www.google.com/"});
    assert.deepEqual(safeGoogleAnalyticsAcquisition("", "https://chatgpt.com/c/private-chat"), {page_referrer:"https://chatgpt.com/"});
    assert.deepEqual(safeGoogleAnalyticsAcquisition("", "https://tenant.private.example/patient"), {page_referrer:"", campaign_source:"other-referral", campaign_medium:"referral"});
    for (const referrer of ["", "javascript:alert(1)", "https://user:pass@www.google.com/", "https://sacramentodentalmedicine.com/schedule?email=private"]) assert.deepEqual(safeGoogleAnalyticsAcquisition("", referrer), {page_referrer:""});
  });
  it("maps approved source/medium values and drops all free-form attribution", () => {
    assert.deepEqual(safeGoogleAnalyticsAcquisition("?utm_source=FB&utm_medium=paid-social&utm_campaign=private&utm_content=private&utm_term=private&gclid=private", ""), {page_referrer:"", campaign_source:"facebook", campaign_medium:"paid_social"});
    for (const search of ["?utm_source=patient@example.com&utm_medium=cpc", "?utm_source=google&utm_medium=private", "?utm_source=constructor&utm_medium=organic", "?utm_source=google"]) assert.deepEqual(safeGoogleAnalyticsAcquisition(search, ""), {page_referrer:""});
  });
  it("uses fixed safe titles and content groups instead of document titles", () => {
    const page = googleAnalyticsPageParameters("/dental-implants?name=private", "");
    assert.equal(page?.page_location, "https://sacramentodentalmedicine.com/care");
    assert.equal(page?.page_title, "Care information | Sacramento Dental Medicine");
    assert.equal(page?.content_group, "Care information");
  });
});

describe("Google Analytics lifecycle", () => {
  function harness() {
    const calls: unknown[][] = [];
    const controller = createGoogleAnalyticsController({
      send: (...args) => calls.push(args), load: () => calls.push(["load"]),
      setDisabled: (disabled) => calls.push(["disabled", disabled]),
    });
    return { calls, controller };
  }
  it("sets safe global context before loading the tag and sends one view per navigation", () => {
    const {calls,controller} = harness();
    controller.page("/dental-implants", "?utm_campaign=private", "https://www.google.com/search?q=private");
    controller.page("/dental-implants", "", ""); // React effect replay
    controller.page("/reviews", "", "");
    assert.equal(calls[0][0], "set");
    // Config scope wins over global scope: never pin the first page there.
    const config = calls.find(([command]) => command === "config")?.[2] as Record<string, unknown>;
    assert.equal(config.page_location, undefined);
    assert.equal(config.page_title, undefined);
    assert.equal(config.send_page_view, false);
    assert.equal(calls.filter(([command]) => command === "load").length, 1);
    assert.equal(calls.filter(([command,event]) => command === "event" && event === "page_view").length, 2);
    assert.ok(!JSON.stringify(calls).includes("private"));
    const view = calls.filter(([command]) => command === "event").at(-1)?.[2] as Record<string,unknown>;
    assert.equal(view.page_referrer, "https://sacramentodentalmedicine.com/care");
  });
  it("disables an already-loaded tag on excluded routes and resumes safely", () => {
    const {calls,controller} = harness();
    controller.page("/", "", "");
    controller.page("/privacy-practices", "", "");
    assert.deepEqual(calls.at(-2), ["disabled",true]);
    controller.page("/reviews", "", "");
    assert.equal(calls.filter(([command]) => command === "event").length,2);
    assert.equal(calls.filter(([command]) => command === "load").length,1);
  });
  it("does not load a tag on unknown pages or opted-out QA sessions", () => {
    const {calls,controller} = harness();
    controller.page("/patient/123", "", "");
    controller.page("/", "", "", true);
    assert.deepEqual(calls, [["disabled",true],["disabled",true]]);
  });
  it("keeps initial acquisition through SPA navigation without replaying raw tags", () => {
    const {calls,controller} = harness();
    controller.page("/", "?utm_source=google&utm_medium=cpc", "");
    controller.page("/reviews", "?utm_source=facebook&utm_medium=social", "");
    const sets = calls.filter(([command]) => command === "set");
    for (const [,data] of sets) assert.equal((data as Record<string,unknown>).campaign_source,"google");
  });
});
