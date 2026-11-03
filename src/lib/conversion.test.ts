import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  CLICK_TO_CALL,
  CLICK_TO_EMAIL,
  GENERATE_LEAD,
  JARVIS_BOOKING_START,
} from "./analytics.ts";
import {
  JARVIS_FRAME_ATTRIBUTE,
  contactClickEvent,
  createJarvisBookingStartRecorder,
  recordClickToCall,
  recordContactClick,
  recordLeadConversion,
} from "./conversion.ts";
import { contact } from "../data/site.ts";
import { OPENAI_LEAD_EVENT } from "./openai-measurement.ts";

const EVENT_ID = "b65ee13a-1299-4e3a-9ccd-2cc692ae4f93";
const EPOCH = "c65ee13a-1299-4e3a-9ccd-2cc692ae4f93";

function harness() {
  const vercel: string[] = [];
  const google: string[] = [];
  const dispatched: Event[] = [];
  const seen = new Set<string>();
  const deps = {
    seen,
    consentEpoch: EPOCH,
    vercelTrack: (name: string) => vercel.push(name),
    googleEvent: (name: string) => google.push(name),
    dispatch: (event: Event) => {
      dispatched.push(event);
      return true;
    },
  };
  return { vercel, google, dispatched, seen, deps };
}

describe("recordLeadConversion", () => {
  it("fires generate_lead and sdm:openai-lead once on accepted success", () => {
    const { vercel, google, dispatched, deps } = harness();
    const first = recordLeadConversion(
      {
        ok: true,
        measurementEventId: EVENT_ID,
        measurementClickReference: "original-click",
        measurementConsentEpoch: EPOCH,
      },
      deps,
    );
    const second = recordLeadConversion(
      {
        ok: true,
        measurementEventId: EVENT_ID,
        measurementClickReference: "original-click",
        measurementConsentEpoch: EPOCH,
      },
      deps,
    );

    assert.deepEqual(first, { generateLead: true, openaiLead: true });
    assert.deepEqual(second, { generateLead: false, openaiLead: false });
    assert.deepEqual(vercel, [GENERATE_LEAD]);
    assert.deepEqual(google, [GENERATE_LEAD]);
    assert.equal(dispatched.length, 1);
    assert.equal(dispatched[0].type, OPENAI_LEAD_EVENT);
    const detail = (dispatched[0] as CustomEvent).detail;
    assert.deepEqual(detail, {
      eventId: EVENT_ID,
      clickReference: "original-click",
      consentEpoch: EPOCH,
    });
    assert.ok(!JSON.stringify({ vercel, google, detail }).includes("@"));
    assert.ok(!JSON.stringify({ vercel, google, detail }).includes("916"));
  });

  it("does not fire generate_lead or sdm:openai-lead on failure", () => {
    const { vercel, google, dispatched, deps } = harness();
    const result = recordLeadConversion(
      { ok: false, measurementEventId: EVENT_ID, measurementConsentEpoch: EPOCH },
      deps,
    );
    assert.deepEqual(result, { generateLead: false, openaiLead: false });
    assert.deepEqual(vercel, []);
    assert.deepEqual(google, []);
    assert.deepEqual(dispatched, []);
  });

  it("does not treat honeypot or test acceptances (no event id) as leads", () => {
    const { vercel, dispatched, deps } = harness();
    assert.deepEqual(
      recordLeadConversion({ ok: true, message: "Thanks" } as never, deps),
      { generateLead: false, openaiLead: false },
    );
    assert.deepEqual(
      recordLeadConversion({ ok: true, measurementEventId: "not-a-uuid" }, deps),
      { generateLead: false, openaiLead: false },
    );
    assert.deepEqual(vercel, []);
    assert.deepEqual(dispatched, []);
  });

  it("still records generate_lead when OpenAI consent is not granted", () => {
    const { vercel, dispatched, deps } = harness();
    const result = recordLeadConversion(
      { ok: true, measurementEventId: EVENT_ID },
      deps,
    );
    assert.deepEqual(result, { generateLead: true, openaiLead: false });
    assert.deepEqual(vercel, [GENERATE_LEAD]);
    assert.deepEqual(dispatched, []);
  });
});

describe("recordClickToCall", () => {
  it("fires click_to_call with no properties or PII", () => {
    const vercel: string[] = [];
    const google: string[] = [];
    assert.equal(
      recordClickToCall({
        vercelTrack: (name) => vercel.push(name),
        googleEvent: (name) => google.push(name),
      }),
      true,
    );
    assert.deepEqual(vercel, [CLICK_TO_CALL]);
    assert.deepEqual(google, [CLICK_TO_CALL]);
  });
});

function sinks() {
  const vercel: string[] = [];
  const google: string[] = [];
  return {
    vercel,
    google,
    deps: {
      vercelTrack: (name: string) => vercel.push(name),
      googleEvent: (name: string) => google.push(name),
    },
  };
}

describe("recordContactClick", () => {
  it("maps tel: to click_to_call and mailto: to click_to_email", () => {
    assert.equal(contactClickEvent(contact.phoneHref), CLICK_TO_CALL);
    assert.equal(contactClickEvent(contact.emailHref), CLICK_TO_EMAIL);
    assert.equal(contactClickEvent("TEL:+19167276453"), CLICK_TO_CALL);
    assert.equal(contactClickEvent(" MailTo:office@sacramentodentalmedicine.com"), CLICK_TO_EMAIL);
    for (const href of ["/schedule", "https://example.com/tel:1", "#mailto:", "", null, undefined, contact.mapsHref]) {
      assert.equal(contactClickEvent(href), null, String(href));
    }
  });

  it("sends only the event name for phone and email clicks", () => {
    const { vercel, google, deps } = sinks();
    assert.equal(recordContactClick(contact.phoneHref, deps), true);
    assert.equal(recordContactClick(contact.emailHref, deps), true);
    assert.equal(recordContactClick("/schedule", deps), false);
    assert.deepEqual(vercel, [CLICK_TO_CALL, CLICK_TO_EMAIL]);
    assert.deepEqual(google, [CLICK_TO_CALL, CLICK_TO_EMAIL]);
    const sent = JSON.stringify({ vercel, google });
    assert.ok(!sent.includes("@"));
    assert.ok(!sent.includes("916"));
  });

  it("listens site-wide from the root layout exactly once", () => {
    const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
    const layout = read("src/app/layout.tsx");
    const tracker = read("src/components/ConversionClickTracker.tsx");
    assert.equal(layout.match(/<ConversionClickTracker \/>/g)?.length, 1);
    assert.match(tracker, /a\[href\^='tel:'\], a\[href\^='mailto:'\]/);
    assert.match(tracker, /recordContactClick/);
    // Page-level mounts would double count.
    for (const path of [
      "src/app/wisdom-teeth-removal-sacramento/page.tsx",
      "src/app/schedule/page.tsx",
      "src/app/[service]/page.tsx",
    ]) {
      assert.doesNotMatch(read(path), /ConversionClickTracker/, path);
    }
  });
});

describe("createJarvisBookingStartRecorder", () => {
  const frame = (attributes: string[], tagName = "IFRAME") => ({
    tagName,
    hasAttribute: (name: string) => attributes.includes(name),
  });

  it("fires jarvis_booking_start once when focus enters the Jarvis frame", () => {
    const { vercel, google, deps } = sinks();
    const record = createJarvisBookingStartRecorder(deps);
    assert.equal(record(null), false);
    assert.equal(record(frame([JARVIS_FRAME_ATTRIBUTE], "BUTTON")), false);
    assert.equal(record(frame(["data-openai-measurement-frame"])), false);
    assert.equal(record(frame([JARVIS_FRAME_ATTRIBUTE])), true);
    assert.equal(record(frame([JARVIS_FRAME_ATTRIBUTE])), false);
    assert.deepEqual(vercel, [JARVIS_BOOKING_START]);
    assert.deepEqual(google, [JARVIS_BOOKING_START]);
  });

  it("marks only the Jarvis iframe and mounts the tracker on /schedule", () => {
    const page = readFileSync(join(process.cwd(), "src/app/schedule/page.tsx"), "utf8");
    assert.equal(page.match(new RegExp(`${JARVIS_FRAME_ATTRIBUTE}=""`, "g"))?.length, 1);
    assert.match(page, /<iframe\s+src=\{JARVIS_SCHEDULE_EMBED_SRC\}[^>]*data-jarvis-scheduler=""/);
    assert.match(page, /<JarvisBookingTracker \/>/);
  });
});
