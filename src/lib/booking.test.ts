import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { BOOK_ONLINE_LOCATIONS } from "./booking-analytics.ts";
import { contact } from "../data/site.ts";

const jarvis =
  "https://schedule.jarvisanalytics.com/frame?eoid=9251&elid=9000000000334";
const srcRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) out.push(...walk(path));
    else if (/\.(ts|tsx)$/.test(entry)) out.push(path);
  }
  return out;
}

describe("Jarvis booking cutover", () => {
  it("uses the live Jarvis URL as the only booking href", () => {
    assert.equal(contact.bookingHref, jarvis);
    assert.ok(!("jarvisBookingHref" in contact));
  });

  it("removes the Formspree appointment form from site source", () => {
    const files = walk(srcRoot);
    const banned = [
      /formspree\.io/i,
      /requestAppointment/,
      /@\/components\/Scheduler/,
      /from ["']@\/app\/actions["']/,
      /from ["']@\/lib\/formspree/,
      /from ["']@\/lib\/appointment/,
      /LeadAttributionHiddenFields/,
    ];
    for (const file of files) {
      if (file.endsWith(".test.ts") || file.endsWith(".test.tsx")) continue;
      const text = readFileSync(file, "utf8");
      for (const pattern of banned) {
        assert.equal(pattern.test(text), false, `${file} still matches ${pattern}`);
      }
    }
  });

  it("does not leave in-app links to a /schedule form", () => {
    const files = walk(join(srcRoot, "components")).concat(
      walk(join(srcRoot, "app")).filter((file) => !file.includes("/schedule/")),
    );
    for (const file of files) {
      if (file.endsWith(".test.ts") || file.endsWith(".test.tsx")) continue;
      const text = readFileSync(file, "utf8");
      assert.equal(
        /href=["']\/schedule["']/.test(text),
        false,
        `${file} still links to /schedule`,
      );
    }
  });

  it("routes every Jarvis booking CTA through BookingLink with a known location", () => {
    const files = walk(srcRoot).filter(
      (file) => !file.endsWith(".test.ts") && !file.endsWith(".test.tsx"),
    );
    const locations = new Set<string>();
    const locationPattern =
      /<BookingLink\b([^>]*)>/g;
    const locationAttr = /\blocation=["']([a-z_]+)["']/;

    for (const file of files) {
      const text = readFileSync(file, "utf8");
      if (file.endsWith("BookingLink.tsx")) continue;
      assert.equal(
        /href=\{contact\.bookingHref\}/.test(text),
        false,
        `${file} still uses a raw booking href`,
      );
      for (const match of text.matchAll(locationPattern)) {
        const attrs = match[1] ?? "";
        const location = attrs.match(locationAttr)?.[1];
        assert.ok(location, `${file} is missing BookingLink location`);
        assert.ok(
          (BOOK_ONLINE_LOCATIONS as readonly string[]).includes(location),
          `${file} uses unknown location ${location}`,
        );
        locations.add(location);
      }
    }

    for (const required of [
      "header",
      "header_mobile",
      "hero",
      "mobile_cta",
      "footer",
      "schedule_page",
      "reviews",
      "service_page",
    ]) {
      assert.ok(locations.has(required), `missing BookingLink location ${required}`);
    }
  });
});
