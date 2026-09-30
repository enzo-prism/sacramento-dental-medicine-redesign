import { expect, test } from "@playwright/test";
const id = "b65ee13a-1299-4e3a-9ccd-2cc692ae4f93";
let sdk: string;
test.beforeAll(async ({ request }) => {
  const response = await request.get("https://bzrcdn.openai.com/sdk/oaiq.min.js");
  expect(response.ok()).toBe(true);
  sdk = await response.text();
});
test("SDK stays isolated and opt-in; only accepted UUID signals produce deduplicated leads", async ({ page }) => {
  const requests: unknown[] = [];
  await page.route("**/*", async route => {
    const url = new URL(route.request().url());
    if (url.hostname === "127.0.0.1") return route.continue();
    if (url.href === "https://bzrcdn.openai.com/sdk/oaiq.min.js") return route.fulfill({ contentType: "application/javascript", body: sdk });
    if (url.hostname === "bzrcdn.openai.com" && url.pathname.startsWith("/pixel-config/")) return route.fulfill({ contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: '{"automatic_advanced_matching_enabled":true}' });
    if (url.hostname === "bzr.openai.com") {
      if (route.request().postData()) requests.push(JSON.parse(route.request().postData()!));
      return route.fulfill({ headers: { "Access-Control-Allow-Origin": "*" }, body: "" });
    }
    return route.abort();
  });
  await page.goto("/schedule?oppref=original-click-reference&utm_source=chatgpt&utm_medium=paid");
  await expect(page.getByRole("button", { name: "Allow", exact: true })).toBeVisible();
  await expect(page.locator("#openai-ads-measurement-frame")).toHaveCount(0);
  await page.getByRole("button", { name: "Decline", exact: true }).click();
  await page.evaluate(eventId => window.dispatchEvent(new CustomEvent("sdm:openai-lead", { detail: { eventId, clickReference: "original-click-reference", consentEpoch: localStorage.getItem("sdm_openai_measurement_epoch_v1") } })), id);
  await expect(page.locator("#openai-ads-measurement-frame")).toHaveCount(0);
  await page.goto("/privacy-practices");
  await page.getByRole("button", { name: "Advertising measurement settings" }).click();
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await expect(page.locator("#openai-ads-measurement-frame")).toHaveAttribute("sandbox", "allow-scripts");
  await page.goto("/schedule?oppref=original-click-reference");
  await expect(page.locator("#openai-ads-measurement-frame")).toHaveCount(1);
  await expect.poll(() => requests.length).toBeGreaterThan(0);
  await page.evaluate(eventId => {
    const form = document.createElement("form");
    form.innerHTML = '<input name="email" value="patient-sentinel@example.test"><input name="notes" value="medical-sentinel">';
    document.body.appendChild(form);
    for (const value of ["invalid", eventId, eventId]) window.dispatchEvent(new CustomEvent("sdm:openai-lead", { detail: { eventId: value, clickReference: "original-click-reference", consentEpoch: localStorage.getItem("sdm_openai_measurement_epoch_v1") } }));
  }, id);
  await expect.poll(() => JSON.stringify(requests).includes(id)).toBe(true);
  const payloads = requests as Array<{ oppref?: string; user?: unknown; events?: Array<{ type: string; id: string; opt_out?: boolean }> }>;
  expect(payloads.flatMap(p => p.events || []).filter(e => e.type === "lead_created")).toEqual([expect.objectContaining({ id, opt_out: true })]);
  expect(payloads.find(p => p.events?.some(e => e.id === id))?.oppref).toBe("original-click-reference");
  expect(JSON.stringify(payloads)).not.toContain("patient-sentinel");
  expect(JSON.stringify(payloads)).not.toContain("medical-sentinel");
  expect(payloads.every(p => p.user === undefined)).toBe(true);
  await page.evaluate(() => {
    localStorage.setItem("sdm_openai_measurement_consent_v1", "denied");
    window.dispatchEvent(new StorageEvent("storage", { key: "sdm_openai_measurement_consent_v1" }));
  });
  await expect(page.locator("#openai-ads-measurement-frame")).toHaveCount(0);
});
