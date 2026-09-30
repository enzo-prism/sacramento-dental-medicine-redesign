import { expect, test, type BrowserContext } from "@playwright/test";
const CLICK_KEY = "sdm_openai_click_v1";
const CHOICE_KEY = "sdm_openai_measurement_consent_v1";
const lifetime = 30 * 24 * 60 * 60 * 1000;
let sdk: string;
test.beforeAll(async ({ request }) => {
  const response = await request.get("https://bzrcdn.openai.com/sdk/oaiq.min.js");
  expect(response.ok()).toBe(true);
  sdk = await response.text();
});
async function intercept(context: BrowserContext) {
  await context.route("**/*", route => {
    const url = new URL(route.request().url());
    if (url.hostname === "127.0.0.1") return route.continue();
    if (url.href === "https://bzrcdn.openai.com/sdk/oaiq.min.js") return route.fulfill({ contentType: "application/javascript", body: sdk });
    if (url.hostname === "bzrcdn.openai.com") return route.fulfill({ contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: '{"automatic_advanced_matching_enabled":true}' });
    if (url.hostname === "bzr.openai.com") return route.fulfill({ headers: { "Access-Control-Allow-Origin": "*" }, body: "" });
    return route.abort();
  });
}
test("consent-gated original click survives a new tab, expires on time, and is replaced only by a real new URL click", async ({ page, context }) => {
  await intercept(context);
  await page.goto("/wisdom-teeth?oppref=original-click_123");
  expect(await page.evaluate(key => localStorage.getItem(key), CLICK_KEY)).toBeNull();
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await expect(page.locator("#openai-ads-measurement-frame")).toHaveCount(1);
  const original = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), CLICK_KEY);
  expect(original.reference).toBe("original-click_123");
  await page.locator('a[href="/schedule"]').first().click();
  await expect(page).toHaveURL(/\/schedule$/);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), CLICK_KEY)).toEqual(original);
  const returning = await context.newPage();
  await returning.goto("/schedule");
  await expect(returning.locator("#openai-ads-measurement-frame")).toHaveAttribute("src", /oppref=original-click_123/);
  expect(await returning.evaluate(key => JSON.parse(localStorage.getItem(key)!), CLICK_KEY)).toEqual(original);
  await returning.goto("/wisdom-teeth?oppref=new-click_456");
  await expect(returning.locator("#openai-ads-measurement-frame")).toHaveAttribute("src", /oppref=new-click_456/);
  const replacement = await returning.evaluate(key => JSON.parse(localStorage.getItem(key)!), CLICK_KEY);
  expect(replacement.reference).toBe("new-click_456");
  expect(replacement.capturedAt).toBeGreaterThanOrEqual(original.capturedAt);
  await returning.evaluate(({ key, lifetime }) => localStorage.setItem(key, JSON.stringify({ version: 1, reference: "expired-click", capturedAt: Date.now() - lifetime })), { key: CLICK_KEY, lifetime });
  await returning.goto("/schedule");
  await expect(returning.locator("#openai-ads-measurement-frame")).toHaveCount(1);
  expect(await returning.locator("#openai-ads-measurement-frame").getAttribute("src")).not.toContain("oppref=");
  expect(await returning.evaluate(key => localStorage.getItem(key), CLICK_KEY)).toBeNull();
});

for (const restriction of ["denied", "gpc", "dnt"] as const) {
  test(`${restriction} purges stored click attribution and never initializes the frame`, async ({ page, context }) => {
    await intercept(context);
    await page.addInitScript(({ restriction, clickKey, choiceKey }) => {
      localStorage.setItem(choiceKey, restriction === "denied" ? "denied" : "granted");
      const record = JSON.stringify({ version: 1, reference: "withdrawn-click", capturedAt: Date.now() });
      localStorage.setItem(clickKey, record);
      sessionStorage.setItem(clickKey, "legacy-session-reference");
      if (restriction === "gpc") Object.defineProperty(navigator, "globalPrivacyControl", { get: () => true });
      if (restriction === "dnt") Object.defineProperty(navigator, "doNotTrack", { get: () => "1" });
    }, { restriction, clickKey: CLICK_KEY, choiceKey: CHOICE_KEY });
    await page.goto("/wisdom-teeth?oppref=should-not-persist");
    await expect(page.locator("#openai-ads-measurement-frame")).toHaveCount(0);
    await expect.poll(() => page.evaluate(key => [localStorage.getItem(key), sessionStorage.getItem(key)], CLICK_KEY)).toEqual([null, null]);
  });
}

test("withdrawal deletes the persistent reference, and a later untagged grant does not recover it", async ({ page, context }) => {
  await intercept(context);
  await page.goto("/?oppref=original-click");
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await expect(page.locator("#openai-ads-measurement-frame")).toHaveCount(1);
  await page.goto("/privacy-practices");
  await page.getByRole("button", { name: "Advertising measurement settings" }).click();
  await page.getByRole("button", { name: "Decline", exact: true }).click();
  expect(await page.evaluate(key => localStorage.getItem(key), CLICK_KEY)).toBeNull();
  await expect(page.locator("#openai-ads-measurement-frame")).toHaveCount(0);
  await page.getByRole("button", { name: "Advertising measurement settings" }).click();
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await expect(page.locator("#openai-ads-measurement-frame")).toHaveCount(1);
  expect(await page.locator("#openai-ads-measurement-frame").getAttribute("src")).not.toContain("oppref=");
});
