import { expect, test } from "@playwright/test";

const OPENAI_SDK_STUB = `
(() => {
  const queued = Array.isArray(window.oaiq && window.oaiq.q) ? window.oaiq.q.slice() : [];
  const oaiq = (...args) => {
    queued.push(args);
    flush();
  };
  oaiq.q = queued;
  oaiq.loaded = true;
  window.oaiq = oaiq;
  function flush() {
    const oppref = new URLSearchParams(location.search).get("oppref") || "";
    for (const args of queued) {
      if (args[0] !== "measure" || args[1] !== "lead_created" || args.sent) continue;
      args.sent = true;
      const options = args[3] || {};
      fetch("https://bzr.openai.com/v1/events", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          oppref,
          events: [{ type: "lead_created", id: options.event_id, opt_out: options.opt_out }],
        }),
      });
    }
  }
  flush();
})();
`;

for (const referenceParam of ["oppref", "click_id"] as const) {
  test(`${referenceParam}: failed form emits nothing; accepted success sends the original click exactly once`, async ({ page }) => {
    const payloads: Array<{ oppref?: string; events?: Array<{ type: string; id: string }> }> = [];
    await page.addInitScript(() => {
      const received: unknown[] = [];
      Object.assign(window, { confirmedSignals: received });
      window.addEventListener("sdm:openai-lead", (event) => received.push((event as CustomEvent).detail));
    });
    await page.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (url.hostname === "127.0.0.1") return route.continue();
      if (url.href === "https://bzrcdn.openai.com/sdk/oaiq.min.js") {
        return route.fulfill({ contentType: "application/javascript", body: OPENAI_SDK_STUB });
      }
      if (url.hostname === "bzrcdn.openai.com") {
        return route.fulfill({
          contentType: "application/json",
          headers: { "Access-Control-Allow-Origin": "*" },
          body: '{"automatic_advanced_matching_enabled":true}',
        });
      }
      if (url.hostname === "bzr.openai.com") {
        if (route.request().postData()) payloads.push(JSON.parse(route.request().postData()!));
        return route.fulfill({ headers: { "Access-Control-Allow-Origin": "*" }, body: "" });
      }
      return route.abort();
    });

    await page.goto(`/wisdom-teeth-removal-sacramento?${referenceParam}=original-request-click&utm_source=chatgpt`);
    await page.getByRole("button", { name: "Allow", exact: true }).click();
    await expect(page.locator("#openai-ads-measurement-frame")).toHaveCount(1);

    await page.getByLabel("Your name", { exact: true }).fill("Local Failure Fixture");
    await page.getByLabel("Email", { exact: true }).fill("fixture@patient.invalid");
    await page.locator("#appointment-privacy").check();
    await page.getByRole("button", { name: "Request this visit" }).click();
    await expect(page.getByText("Something went wrong on our end.", { exact: false })).toBeVisible();
    expect(await page.evaluate(() => (window as typeof window & { confirmedSignals: unknown[] }).confirmedSignals)).toEqual([]);

    await page.getByLabel("Your name", { exact: true }).fill("Local Success Fixture");
    await page.getByLabel("Email", { exact: true }).fill("fixture@patient.invalid");
    await page.locator("#appointment-privacy").check();
    await page.getByRole("button", { name: "Request this visit" }).click();
    await expect(page.getByRole("heading", { name: "Request sent", exact: true })).toBeVisible();
    const signals = await page.evaluate(() => (window as typeof window & { confirmedSignals: Array<{ eventId: string }> }).confirmedSignals);
    expect(signals).toHaveLength(1);

    await expect.poll(() => payloads.flatMap((p) => p.events || []).filter((e) => e.type === "lead_created").length).toBe(1);
    const delivered = payloads.find((p) => p.events?.some((e) => e.type === "lead_created"));
    expect(delivered?.oppref).toBe("original-request-click");
    expect(delivered?.events?.find((e) => e.type === "lead_created")?.id).toBe(signals[0].eventId);
    expect(JSON.stringify(payloads)).not.toContain("fixture@patient.invalid");
    expect(JSON.stringify(payloads)).not.toContain("Local Success Fixture");
  });

}
