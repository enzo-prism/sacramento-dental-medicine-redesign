import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  CUSTOM_ANALYTICS_EVENTS,
  SCHEDULE_EMAIL_CLICK,
  SCHEDULE_PHONE_CLICK,
} from "./analytics.ts";
import { contact, navItems } from "../data/site.ts";

const root = process.cwd();
const jarvisSrc =
  "https://schedule.jarvisanalytics.com/frame?eoid=9251&elid=9000000000334";

function read(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("Jarvis schedule embed", () => {
  it("embeds Jarvis as the only online booking on /schedule", () => {
    const page = read("src/app/schedule/page.tsx");
    assert.match(page, /https:\/\/schedule\.jarvisanalytics\.com\/frame\?eoid=9251&elid=9000000000334/);
    assert.match(page, new RegExp(jarvisSrc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(page, /title="Book an appointment at Sacramento Dental Medicine"/);
    assert.match(page, /loading="lazy"/);
    assert.match(page, /min-h-\[600px\]/);
    assert.match(page, /w-full/);
    assert.match(page, /border-0/);
    assert.match(page, /<ScheduleOfficeContacts \/>/);
    assert.doesNotMatch(page, /Scheduler|Formspree|requestAppointment/);
    assert.equal(existsSync(join(root, "src/components/Scheduler.tsx")), false);
    assert.equal(existsSync(join(root, "src/app/actions.ts")), false);
  });

  it("places office phone and email next to Jarvis", () => {
    const contacts = read("src/components/ScheduleOfficeContacts.tsx");
    assert.match(contacts, /contact\.phoneHref/);
    assert.match(contacts, /contact\.emailHref/);
    assert.match(contacts, /data-schedule-contact="phone"/);
    assert.match(contacts, /data-schedule-contact="email"/);
    assert.match(contacts, /scheduleContactEventName/);
    assert.match(contacts, /onScheduleContactClick\("phone"\)/);
    assert.match(contacts, /onScheduleContactClick\("email"\)/);
    assert.equal(contact.email, "office@sacramentodentalmedicine.com");
    assert.equal(contact.phoneDisplay, "(916) 727-6453");
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
    }
  });

  it("keeps the /schedule analytics mapping and contact-click allowlist", () => {
    const analytics = read("src/lib/analytics.ts");
    const ga = read("src/lib/google-analytics.ts");
    assert.match(analytics, /normalized === "\/schedule"\) return "\/conversion"/);
    assert.match(ga, /"\/schedule": \{ path: "\/conversion"/);
    assert.deepEqual([...CUSTOM_ANALYTICS_EVENTS], [SCHEDULE_PHONE_CLICK, SCHEDULE_EMAIL_CLICK]);
  });
});
