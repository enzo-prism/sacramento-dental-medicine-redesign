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
  await expect(page.locator("[data-openai-measurement-frame]")).toHaveCount(1);
  const original = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), CLICK_KEY);
  expect(original.reference).toBe("original-click_123");
  expect(new URL(page.url()).searchParams.has("oppref")).toBe(false);
  await page.locator('a[href="/schedule"]').first().click();
  await expect(page).toHaveURL(/\/schedule$/);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), CLICK_KEY)).toEqual(original);
  // Simulate a previously unconsumed landing URL, then perform a full reload.
  // The persistent reference must keep its original timestamp, and consumption
  // must retain all unrelated query values, hash and Next/browser history state.
  await page.evaluate(() => history.replaceState({ ...history.state, measurementFixture: "preserved" }, "",
    "/schedule?oppref=original-click_123&utm_source=chatgpt&unrelated=keep#sentinel"));
  await page.reload();
  await expect(page.locator("[data-openai-measurement-frame]")).toHaveAttribute("src", /oppref=original-click_123/);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), CLICK_KEY)).toEqual(original);
  expect(new URL(page.url()).searchParams.has("oppref")).toBe(false);
  expect(new URL(page.url()).searchParams.get("utm_source")).toBe("chatgpt");
  expect(new URL(page.url()).searchParams.get("unrelated")).toBe("keep");
  expect(new URL(page.url()).hash).toBe("#sentinel");
  expect(await page.evaluate(() => history.state.measurementFixture)).toBe("preserved");
  const returning = await context.newPage();
  await returning.goto("/schedule");
  await expect(returning.locator("#openai-ads-measurement-frame")).toHaveAttribute("src", /oppref=original-click_123/);
  expect(await returning.evaluate(key => JSON.parse(localStorage.getItem(key)!), CLICK_KEY)).toEqual(original);
  await returning.goto("/wisdom-teeth?oppref=new-click_456");
  await expect(returning.locator("#openai-ads-measurement-frame")).toHaveAttribute("src", /oppref=new-click_456/);
  const replacement = await returning.evaluate(key => JSON.parse(localStorage.getItem(key)!), CLICK_KEY);
  expect(replacement.reference).toBe("new-click_456");
  expect(replacement.capturedAt).toBeGreaterThanOrEqual(original.capturedAt);
  // The still-open first tab must not overwrite a newer shared click on focus.
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), CLICK_KEY)).toEqual(replacement);
  await page.close();
  // Seed expiry from a document with no mounted tracking helper. An active
  // helper correctly clears an injected expired record before a new navigation.
  await returning.goto("/measurement/openai.html");
  await returning.evaluate(({ key, lifetime }) => localStorage.setItem(key, JSON.stringify({ version: 1, reference: "expired-click", capturedAt: Date.now() - lifetime })), { key: CLICK_KEY, lifetime });
  await returning.goto("/schedule?oppref=expired-click&utm_source=chatgpt#expired");
  await expect(returning.locator("#openai-ads-measurement-frame")).toHaveCount(1);
  expect(await returning.locator("#openai-ads-measurement-frame").getAttribute("src")).not.toContain("oppref=");
  expect(new URL(returning.url()).searchParams.has("oppref")).toBe(false);
  expect(new URL(returning.url()).searchParams.get("utm_source")).toBe("chatgpt");
  expect(new URL(returning.url()).hash).toBe("#expired");
  expect(await returning.evaluate(key => localStorage.getItem(key), CLICK_KEY)).toBeNull();
  await returning.reload();
  await expect(returning.locator("#openai-ads-measurement-frame")).toHaveCount(1);
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
    await expect(page.locator("[data-openai-measurement-frame]")).toHaveCount(0);
    await expect.poll(() => page.evaluate(key => [localStorage.getItem(key), sessionStorage.getItem(key)], CLICK_KEY)).toEqual([null, null]);
    expect(new URL(page.url()).searchParams.has("oppref")).toBe(false);
  });
}

test("withdrawal deletes the persistent reference, and a later untagged grant does not recover it", async ({ page, context }) => {
  await intercept(context);
  await page.goto("/?oppref=original-click");
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await expect(page.locator("[data-openai-measurement-frame]")).toHaveCount(1);
  await page.goto("/privacy-practices");
  await page.getByRole("button", { name: "Advertising measurement settings" }).click();
  await page.evaluate(() => Object.assign(window, { retiredMeasurementFrame: document.querySelector("[data-openai-measurement-frame]") }));
  await page.getByRole("button", { name: "Decline", exact: true }).click();
  expect(await page.evaluate(key => localStorage.getItem(key), CLICK_KEY)).toBeNull();
  await expect(page.locator("[data-openai-measurement-frame]")).toHaveCount(0);
  await page.getByRole("button", { name: "Advertising measurement settings" }).click();
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await expect(page.locator("[data-openai-measurement-frame]")).toHaveCount(1);
  expect(await page.locator("[data-openai-measurement-frame]").getAttribute("src")).not.toContain("oppref=");
  // An already queued browser callback from the retired SDK must not recreate
  // an unowned frame after withdrawal and a different grant epoch.
  await page.evaluate(() => (window as typeof window & { retiredMeasurementFrame: HTMLIFrameElement }).retiredMeasurementFrame.dispatchEvent(new Event("error")));
  await page.waitForTimeout(1200); // Real first retry backoff is one second.
  await expect(page.locator("[data-openai-measurement-frame]")).toHaveCount(1);
  expect(await page.locator("[data-openai-measurement-frame]").getAttribute("src")).not.toContain("oppref=");
});

test("failed Decline persistence removes the stale readable Grant and stays declined after reload", async ({ page, context }) => {
  await intercept(context);
  await page.goto("/?oppref=storage-failure-click");
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await page.evaluate(() => {
    Storage.prototype.setItem = () => { throw new DOMException("fixture unavailable", "QuotaExceededError"); };
    window.dispatchEvent(new Event("sdm:openai-settings"));
  });
  await page.getByRole("button", { name: "Decline", exact: true }).click();
  await expect(page.locator("[data-openai-measurement-frame]")).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem("sdm_openai_measurement_consent_v1"))).toBeNull();
  await page.reload();
  await expect(page.getByRole("button", { name: "Allow", exact: true })).toBeVisible();
  await expect(page.locator("[data-openai-measurement-frame]")).toHaveCount(0);
});

test("a stale Grant fails closed on reload when readable storage cannot record changes", async ({ page, context }) => {
  await intercept(context);
  await page.goto("/");
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new DOMException("fixture unavailable", "QuotaExceededError"); };
  });
  await page.reload();
  await expect(page.getByRole("button", { name: "Allow", exact: true })).toBeVisible();
  await expect(page.locator("[data-openai-measurement-frame]")).toHaveCount(0);
});
