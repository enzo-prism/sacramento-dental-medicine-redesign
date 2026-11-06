import { expect, test } from "@playwright/test";

for (const width of [390, 1280]) {
  test(`clinician and urgent-care routes stay useful at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.route("**/*", route => new URL(route.request().url()).hostname === "127.0.0.1" ? route.continue() : route.abort());
    await page.goto("/meet-dr-sheppard");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Dr. Lucas L. Sheppard, DMD");
    await expect(page.getByRole("navigation", { name: "Care with this clinician" }).getByRole("link", { name: "Root canal treatment" })).toHaveAttribute("href", "/root-canal-therapy");
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(schemas.some(text => text.includes('"@type":"ProfilePage"') && text.includes('"@type":"Person"'))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.goto("/dental-emergencies");
    await expect(page.getByRole("heading", { name: "Call first for the earliest available visit." })).toBeVisible();
    await expect(page.getByRole("link", { name: /Call.*727-6453/ }).first()).toHaveAttribute("href", "tel:+19167276453");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
