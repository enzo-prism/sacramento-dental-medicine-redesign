import { expect, test, type Page } from "@playwright/test";
type Signal = { eventId: string; clickReference: string };
type Payload = { oppref?: string; events?: Array<{ type: string; id: string }> };
async function submitAcceptedFixture(page: Page, name = "Local Success Fixture", wait = true) {
  await page.getByRole("button", { name: /New patient exam/ }).click();
  await page.getByRole("button", { name: /^Soonest:/ }).click();
  await page.getByLabel("Your name", { exact: true }).fill(name);
  await page.getByLabel("Email", { exact: true }).fill("fixture@patient.invalid");
  // This suite owns request semantics, not scheduler scroll/focus animation.
  // Native controls still trigger React's consent and submit handlers.
  await page.locator("#appointment-privacy").evaluate((input: HTMLInputElement) => { if (!input.checked) input.click(); });
  await expect(page.locator("#appointment-privacy")).toBeChecked();
  const submit = page.getByRole("button", { name: "Request this visit" });
  await expect(submit).toBeEnabled();
  await submit.evaluate((button: HTMLButtonElement) => button.form!.requestSubmit(button));
  if (wait) await expect(page.getByRole("heading", { name: "Request sent", exact: true })).toBeVisible();
}
test("pending accepted requests keep their own reference across active-frame expiry and a new click", async ({ page, request }) => {
  const response = await request.get("https://bzrcdn.openai.com/sdk/oaiq.min.js");
  expect(response.ok()).toBe(true);
  const sdk = await response.text();
  let releaseSdk!: () => void;
  const blockedSdk = new Promise<void>(resolve => { releaseSdk = resolve; });
  const payloads: Payload[] = [];
  await page.addInitScript(() => {
    const signals: unknown[] = [];
    Object.assign(window, { confirmedSignals: signals });
    window.addEventListener("sdm:openai-lead", event => signals.push((event as CustomEvent).detail));
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
  // Begin at the actual ad destination and navigate within the same document.
  await page.goto("/wisdom-teeth?oppref=before-expiry-click");
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await page.locator('a[href="/schedule"]').first().click();
  await expect(page).toHaveURL(/\/schedule$/);
  await submitAcceptedFixture(page);
  const originalFrame = await page.locator("#openai-ads-measurement-frame").getAttribute("src");
  await page.getByRole("button", { name: "Request another visit" }).click();
  // Advance only the click clock, preserving real appointment date validation.
  await page.evaluate(() => {
    const realNow = Date.now.bind(Date);
    Object.assign(window, { restoreMeasurementClock: () => { Date.now = realNow; } });
    Date.now = () => realNow() + 30 * 24 * 60 * 60 * 1000 + 1;
  });
  await submitAcceptedFixture(page);
  expect(await page.evaluate(() => localStorage.getItem("sdm_openai_click_v1"))).toBeNull();
  expect(await page.locator("#openai-ads-measurement-frame").getAttribute("src")).toBe(originalFrame);
  await page.getByRole("button", { name: "Request another visit" }).click();
  await page.evaluate(() => {
    (window as typeof window & { restoreMeasurementClock: () => void }).restoreMeasurementClock();
    history.replaceState(history.state, "", "/schedule?oppref=new-request-click&utm_source=chatgpt#new-click");
  });
  await submitAcceptedFixture(page);
  const signals = await page.evaluate(() => (window as typeof window & { confirmedSignals: Signal[] }).confirmedSignals);
  expect(signals.map(signal => signal.clickReference)).toEqual(["before-expiry-click", "", "new-request-click"]);
  expect(new Set(signals.map(signal => signal.eventId)).size).toBe(3);
  await expect(page.locator("[data-openai-measurement-frame]")).toHaveCount(3);
  releaseSdk();
  await expect.poll(() => payloads.flatMap(payload => payload.events || []).filter(event => event.type === "lead_created").length, { timeout: 20000 }).toBe(3);
  for (const signal of signals) {
    const delivered = payloads.filter(payload => payload.events?.some(event => event.type === "lead_created" && event.id === signal.eventId));
    expect(delivered).toHaveLength(1);
    expect(delivered[0].oppref ?? "").toBe(signal.clickReference);
  }
  // ACK never destroys a frame containing a native SDK buffer/retry.
  await expect(page.locator("[data-openai-measurement-frame]")).toHaveCount(3);
  expect(JSON.stringify(payloads)).not.toContain("fixture@patient.invalid");
  expect(JSON.stringify(payloads)).not.toContain("Local Success Fixture");
});

test("withdrawal and a new grant during Formspree acceptance do not measure the previous request", async ({ page, request }) => {
  const response = await request.get("https://bzrcdn.openai.com/sdk/oaiq.min.js");
  expect(response.ok()).toBe(true);
  const sdk = await response.text();
  const payloads: Payload[] = [];
  let holdAcceptedResponse = true;
  let responseArrived!: () => void;
  const acceptedResponse = new Promise<void>(resolve => { responseArrived = resolve; });
  let releaseResponse!: () => void;
  const heldResponse = new Promise<void>(resolve => { releaseResponse = resolve; });
  await page.addInitScript(() => {
    const signals: unknown[] = [];
    Object.assign(window, { confirmedSignals: signals });
    window.addEventListener("sdm:openai-lead", event => signals.push((event as CustomEvent).detail));
  });
  await page.route("**/*", async route => {
    const url = new URL(route.request().url());
    if (url.hostname === "127.0.0.1") {
      if (holdAcceptedResponse && route.request().method() === "POST" && route.request().headers()["next-action"]) {
        holdAcceptedResponse = false;
        // Execute the real local server action and its accepted Formspree
        // fixture, then hold its exact response before React receives it.
        const response = await route.fetch();
        expect(response.ok()).toBe(true);
        responseArrived();
        await heldResponse;
        return route.fulfill({ response });
      }
      return route.continue();
    }
    if (url.href === "https://bzrcdn.openai.com/sdk/oaiq.min.js") return route.fulfill({ contentType: "application/javascript", body: sdk });
    if (url.hostname === "bzrcdn.openai.com") return route.fulfill({ contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: '{"automatic_advanced_matching_enabled":true}' });
    if (url.hostname === "bzr.openai.com") {
      if (route.request().postData()) payloads.push(JSON.parse(route.request().postData()!));
      return route.fulfill({ headers: { "Access-Control-Allow-Origin": "*" }, body: "" });
    }
    return route.abort();
  });
  await page.goto("/schedule?oppref=withdrawn-request-click");
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  const originalEpoch = await page.evaluate(() => localStorage.getItem("sdm_openai_measurement_epoch_v1"));
  await submitAcceptedFixture(page, "Local Success Fixture", false);
  await acceptedResponse;
  await expect(page.locator('form[aria-busy="true"]')).toBeVisible();
  await page.evaluate(() => window.dispatchEvent(new Event("sdm:openai-settings")));
  await page.getByRole("button", { name: "Decline", exact: true }).click();
  await expect(page.locator("[data-openai-measurement-frame]")).toHaveCount(0);
  await page.evaluate(() => window.dispatchEvent(new Event("sdm:openai-settings")));
  await page.getByRole("button", { name: "Allow", exact: true }).click();
  expect(await page.evaluate(() => localStorage.getItem("sdm_openai_measurement_epoch_v1"))).not.toBe(originalEpoch);
  releaseResponse();
  await expect(page.getByRole("heading", { name: "Request sent", exact: true })).toBeVisible();
  expect(await page.evaluate(() => (window as typeof window & { confirmedSignals: Signal[] }).confirmedSignals)).toEqual([]);
  expect(payloads.flatMap(payload => payload.events || []).filter(event => event.type === "lead_created")).toEqual([]);
  // A genuinely new request under the new grant is eligible, without old click.
  await page.getByRole("button", { name: "Request another visit" }).click();
  await submitAcceptedFixture(page);
  await expect.poll(() => payloads.flatMap(payload => payload.events || []).filter(event => event.type === "lead_created").length).toBe(1);
  expect(payloads.find(payload => payload.events?.some(event => event.type === "lead_created"))?.oppref ?? "").toBe("");
});
