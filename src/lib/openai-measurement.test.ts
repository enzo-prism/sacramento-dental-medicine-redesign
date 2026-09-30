import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { acceptedMeasurementEventId, isMeasurementTest, validClickReference, parseMeasurementClickRecord, OPENAI_CLICK_LIFETIME_MS } from "./openai-measurement.ts";

const id = "b65ee13a-1299-4e3a-9ccd-2cc692ae4f93";
describe("accepted appointment measurement", () => {
  it("never identifies failed, honeypot or test responses as acquisition conversions", () => {
    assert.equal(acceptedMeasurementEventId(false, false, id), undefined);
    assert.equal(acceptedMeasurementEventId(true, true, id), undefined);
    assert.equal(acceptedMeasurementEventId(true, false, "email@example.com"), undefined);
    assert.equal(acceptedMeasurementEventId(true, false, id), id);
  });
  it("recognizes explicit tests, reserved addresses and labeled fictional records", () => {
    assert.equal(isMeasurementTest("Sample", "sample@example.com"), true);
    assert.equal(isMeasurementTest("Codex Tracking Test - ignore", "sample@patient.invalid"), true);
    assert.equal(isMeasurementTest("SDM Launch Test", "sample@patient.invalid"), true);
    assert.equal(isMeasurementTest("Sample", "sample@patient.invalid", "true"), true);
    assert.equal(isMeasurementTest("Local Fixture", "fixture@patient.invalid"), false);
  });
  it("preserves native click references exactly instead of truncating or repairing them", () => {
    const reference = "OpenAI_123456789-".repeat(100);
    assert.equal(validClickReference(reference), reference);
    for (const invalid of ["a b", "a\nb", "x".repeat(2049), null, {}]) assert.equal(validClickReference(invalid), "");
  });
});

describe("return-visit attribution expiry", () => {
  it("preserves capture time through reads and expires exactly after 30 days", () => {
    const capturedAt = Date.parse("2026-09-01T12:00:00Z");
    const record = { version: 1, reference: "original_123-Reference", capturedAt };
    const raw = JSON.stringify(record);
    assert.deepEqual(parseMeasurementClickRecord(raw, capturedAt + OPENAI_CLICK_LIFETIME_MS - 1), record);
    assert.equal(parseMeasurementClickRecord(raw, capturedAt + OPENAI_CLICK_LIFETIME_MS), null);
    assert.equal(parseMeasurementClickRecord(raw, capturedAt + OPENAI_CLICK_LIFETIME_MS + 1), null);
    assert.equal(JSON.parse(raw).capturedAt, capturedAt);
  });
  it("rejects untimestamped legacy IDs, future/invalid timestamps and repaired identifiers", () => {
    const now = Date.now();
    for (const value of ["old-session-only-id", { version: 1, reference: "a b", capturedAt: now },
      { version: 1, reference: "reference", capturedAt: now + 1 }, { version: 1, reference: "reference" }]) {
      assert.equal(parseMeasurementClickRecord(JSON.stringify(value), now), null);
    }
  });
});
