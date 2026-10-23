import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CLICK_TO_CALL, GENERATE_LEAD } from "./analytics.ts";
import {
  recordClickToCall,
  recordLeadConversion,
} from "./conversion.ts";
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
