import { expect, test } from "@playwright/test";

test("failed request emits nothing; accepted server response survives navigation while SDK loads", async ({ page, request }) => {
  const response = await request.get("https://bzrcdn.openai.com/sdk/oaiq.min.js");
  expect(response.ok()).toBe(true);
  const sdk = await response.text();
  let releaseSdk!: () => void;
  const blockedSdk = new Promise<void>(resolve => { releaseSdk = resolve; });
  const payloads: Array<{ oppref?: string; events?: Array<{ type: string; id: string }> }> = [];
  await page.addInitScript(() => {
    const received: unknown[] = [];
    Object.assign(window, { confirmedSignals: received });
    window.addEventListener("sdm:openai-lead", (event) => received.push((event as CustomEvent).detail));
  });
  await page.route("**/*", async route => {
    const url = new URL(route.request().url());
    if (url.hostname === "127.0.0.1") return route.continue();
    if (url.href === "https://bzrcdn.openai.com/sdk/oaiq.min.js") {
      await blockedSdk;
      return route.fulfill({ contentType: "application/javascript", body: sdk });
    }
    if (url.hostname === "bzrcdn.openai.com") return route.fulfill({ contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: '{"automatic_advanced_matching_enabled":true}' });
    if (url.hostname === "bzr.openai.com") {
      if (route.request().postData()) payloads.push(JSON.parse(route.request().postData()!));
      return route.fulfill({ headers: { "Access-Control-Allow-Origin": "*" }, body: "" });
    }
    return route.abort();
  });
  await page.goto("/schedule?oppref=original-request-click");
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await expect(page.locator("#openai-ads-measurement-frame")).toHaveCount(1);
  const originalFrame = await page.locator("#openai-ads-measurement-frame").getAttribute("src");
  await page.getByRole("button", { name: /New patient exam/ }).click();
  await page.getByRole("button", { name: /^Soonest:/ }).click();
  await page.getByLabel("Your name", { exact: true }).fill("Local Failure Fixture");
  await page.getByLabel("Email", { exact: true }).fill("fixture@patient.invalid");
  await page.locator("#appointment-privacy").check();
  await page.getByRole("button", { name: "Request this visit" }).click();
  await expect(page.getByText("Something went wrong on our end.", { exact: false })).toBeVisible();
  expect(await page.evaluate(() => (window as typeof window & { confirmedSignals: unknown[] }).confirmedSignals)).toEqual([]);
  await page.getByLabel("Your name", { exact: true }).fill("Local Success Fixture");
  await page.getByRole("button", { name: "Request this visit" }).click();
  await expect(page.getByRole("heading", { name: "Request sent", exact: true })).toBeVisible();
  const signals = await page.evaluate(() => (window as typeof window & { confirmedSignals: Array<{ eventId: string }> }).confirmedSignals);
  expect(signals).toHaveLength(1);
  await page.locator('a[href="/new-patients"]').first().click();
  await expect(page).toHaveURL(/\/new-patients$/);
  // Same document, same frame/channel, same queue: the accepted request is kept.
  expect(await page.locator("#openai-ads-measurement-frame").getAttribute("src")).toBe(originalFrame);
  releaseSdk();
  await expect.poll(() => payloads.flatMap(p => p.events || []).filter(e => e.type === "lead_created").length).toBe(1);
  const delivered = payloads.find(p => p.events?.some(e => e.type === "lead_created"));
  expect(delivered?.oppref).toBe("original-request-click");
  expect(delivered?.events?.find(e => e.type === "lead_created")?.id).toBe(signals[0].eventId);
  expect(JSON.stringify(payloads)).not.toContain("fixture@patient.invalid");
  expect(JSON.stringify(payloads)).not.toContain("Local Success Fixture");
});
