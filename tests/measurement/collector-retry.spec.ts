import { expect, test } from "@playwright/test";
test("a transient collector network failure retries the same lead UUID and original click reference", async ({ page, request }) => {
  const response = await request.get("https://bzrcdn.openai.com/sdk/oaiq.min.js");
  expect(response.ok()).toBe(true);
  const sdk = await response.text();
  const id = "b65ee13a-1299-4e3a-9ccd-2cc692ae4f93";
  const attempts: Array<{ oppref?: string; events?: Array<{ type: string; id: string }> }> = [];
  const delivered: typeof attempts = [];
  await page.route("**/*", async route => {
    const url = new URL(route.request().url());
    if (url.hostname === "127.0.0.1") return route.continue();
    if (url.href === "https://bzrcdn.openai.com/sdk/oaiq.min.js") return route.fulfill({ contentType: "application/javascript", body: sdk });
    if (url.hostname === "bzrcdn.openai.com") return route.fulfill({ contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: '{"automatic_advanced_matching_enabled":true}' });
    if (url.hostname === "bzr.openai.com") {
      const payload = JSON.parse(route.request().postData() || "{}");
      if (payload.events?.some((event: { type: string }) => event.type === "lead_created")) {
        attempts.push(payload);
        if (attempts.length === 1) return route.abort("failed");
        delivered.push(payload);
      }
      return route.fulfill({ headers: { "Access-Control-Allow-Origin": "*" }, body: "" });
    }
    return route.abort();
  });
  await page.goto("/?oppref=original-retry-click");
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await expect(page.locator("#openai-ads-measurement-frame")).toHaveCount(1);
  await page.evaluate(eventId => window.dispatchEvent(new CustomEvent("sdm:openai-lead", { detail: { eventId, clickReference: "original-retry-click", consentEpoch: localStorage.getItem("sdm_openai_measurement_epoch_v1") } })), id);
  await expect.poll(() => delivered.length, { timeout: 20000 }).toBe(1);
  expect(attempts.length).toBeGreaterThanOrEqual(2);
  expect(attempts.every(payload => payload.oppref === "original-retry-click")).toBe(true);
  expect(attempts.every(payload => payload.events?.find(event => event.type === "lead_created")?.id === id)).toBe(true);
  expect(delivered.flatMap(payload => payload.events || []).filter(event => event.type === "lead_created")).toHaveLength(1);
});
