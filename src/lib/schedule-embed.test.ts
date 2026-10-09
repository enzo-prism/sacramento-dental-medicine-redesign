import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { contact, navItems } from "../data/site.ts";

const root = process.cwd();
const jarvisSrc =
  "https://schedule.jarvisanalytics.com/frame?eoid=9251&elid=9000000000334";

function read(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("Jarvis schedule embed", () => {
  it("embeds Jarvis at the top of /schedule and keeps the Formspree fallback", () => {
    const page = read("src/app/schedule/page.tsx");
    const iframeIndex = page.indexOf("<iframe");
    const schedulerIndex = page.indexOf("<Scheduler");
    assert.notEqual(iframeIndex, -1);
    assert.ok(schedulerIndex > iframeIndex, "Jarvis iframe must sit above the request form");
    assert.match(page, new RegExp(`src=\\{JARVIS_SCHEDULE_EMBED_SRC\\}|src="${jarvisSrc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(page, /https:\/\/schedule\.jarvisanalytics\.com\/frame\?eoid=9251&elid=9000000000334/);
    assert.match(page, /title="Book an appointment at Sacramento Dental Medicine"/);
    assert.match(page, /loading="lazy"/);
    assert.match(page, /min-h-\[600px\]/);
    assert.match(page, /w-full/);
    assert.match(page, /border-0/);
    assert.match(page, /<Scheduler \/>/);
  });

  it("sends every Schedule/Book CTA to /schedule", () => {
    assert.equal(contact.bookingHref, "/schedule");
    assert.ok(navItems.some((item) => item.label === "Schedule" && item.href === "/schedule"));

    const ctaFiles = [
      "src/components/Header.tsx",
      "src/components/MobileCTA.tsx",
      "src/components/sections/Hero.tsx",
      "src/components/sections/Footer.tsx",
      "src/components/sections/ScheduleCTA.tsx",
      "src/components/sections/NewPatients.tsx",
      "src/app/reviews/page.tsx",
      "src/app/new-patients/page.tsx",
      "src/app/meet-dr-narodovich/page.tsx",
      "src/app/[service]/page.tsx",
    ];
    for (const path of ctaFiles) {
      const source = read(path);
      assert.match(
        source,
        /bookingHref|href="\/schedule"/,
        `${path} is missing a /schedule booking target`,
      );
      assert.doesNotMatch(
        source,
        /Book online[\s\S]{0,80}href="https?:|Schedule online[\s\S]{0,80}href="https?:|href="https?:[\s\S]{0,80}Book online|href="https?:[\s\S]{0,80}Schedule online/,
        `${path} must not send Book/Schedule CTAs off-site`,
      );
    }
  });

  it("does not ship a site CSP or frame-busting header", () => {
    const config = read("next.config.ts");
    assert.doesNotMatch(config, /headers\s*\(/);
    assert.doesNotMatch(config, /Content-Security-Policy|X-Frame-Options|frame-ancestors|frame-src/);
    assert.equal(existsSync(join(root, "middleware.ts")), false);
    assert.equal(existsSync(join(root, "src/middleware.ts")), false);
    assert.equal(existsSync(join(root, "vercel.json")), false);
    const layout = read("src/app/layout.tsx");
    assert.doesNotMatch(layout, /http-equiv="Content-Security-Policy"|Content-Security-Policy/);
  });
});
