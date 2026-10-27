import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { contact, formspreeEndpoint } from "./site.ts";
import { wisdomTeethLanding } from "./wisdom-teeth-landing.ts";

describe("wisdom teeth landing content", () => {
  it("reuses verified practice facts and does not invent insurance or prices", () => {
    const page = readFileSync(
      join(process.cwd(), "src/app/wisdom-teeth-removal-sacramento/page.tsx"),
      "utf8",
    );
    const sitemap = readFileSync(join(process.cwd(), "src/app/sitemap.ts"), "utf8");
    assert.match(page, /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/);
    assert.doesNotMatch(sitemap, /wisdom-teeth-removal-sacramento/);
    assert.doesNotMatch(sitemap, /2026-10-23/);
    assert.match(sitemap, /2026-10-27/);
    assert.match(page, /relatedLinks/);
    assert.deepEqual(
      wisdomTeethLanding.relatedLinks.map((link) => link.href),
      ["/wisdom-teeth", "/tooth-extractions"],
    );
    assert.match(wisdomTeethLanding.h1, /Wisdom teeth removal in Sacramento/);
    assert.deepEqual(contact.serviceArea, [
      "Antelope",
      "Sacramento",
      "Roseville",
      "Citrus Heights",
      "North Highlands",
      "Folsom",
    ]);
    assert.equal(contact.serviceArea.includes("Rio Linda"), false);
    assert.match(page, /contact\.serviceArea/);
    assert.ok(wisdomTeethLanding.intro.includes(contact.addressLine1));
    assert.equal(wisdomTeethLanding.officeLine, `${contact.addressLine1}, ${contact.addressLine2}`);
    assert.equal(formspreeEndpoint, "https://formspree.io/f/xvkpdvyz");
    const blob = JSON.stringify(wisdomTeethLanding);
    assert.doesNotMatch(blob, /CareCredit|Medi-Cal|\$\d/);
    assert.match(blob, /call the front desk/i);
  });

  it("blocks every non-mocked measurement-server fetch including LEAD_WEBHOOK_URL", () => {
    const fixture = readFileSync(
      join(process.cwd(), "tests/measurement/server-fetch-fixture.mjs"),
      "utf8",
    );
    assert.match(fixture, /LEAD_WEBHOOK_URL/);
    assert.match(fixture, /Unmocked fetch blocked/);
    assert.doesNotMatch(fixture, /originalFetch\s*\(/);
  });
});
