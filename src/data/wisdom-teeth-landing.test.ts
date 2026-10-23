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
    assert.equal(page.includes("noindex"), false);
    assert.match(sitemap, /wisdom-teeth-removal-sacramento/);
    assert.match(wisdomTeethLanding.h1, /Wisdom teeth removal in Sacramento/);
    assert.ok(wisdomTeethLanding.cities.includes("Rio Linda"));
    assert.ok(wisdomTeethLanding.intro.includes(contact.addressLine1));
    assert.equal(wisdomTeethLanding.officeLine, `${contact.addressLine1}, ${contact.addressLine2}`);
    assert.equal(formspreeEndpoint, "https://formspree.io/f/xvkpdvyz");
    const blob = JSON.stringify(wisdomTeethLanding);
    assert.doesNotMatch(blob, /CareCredit|Medi-Cal|\$\d/);
    assert.match(blob, /call the front desk/i);
  });
});
