import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyAttributionToPayload,
  compactAttributionValue,
  emptyAttribution,
  formatAttributionMessageLines,
  hasAttributionTags,
  mergeFirstTouch,
  parseAdIdFromUtmContent,
  parseAttributionFromSearch,
  parseStoredAttribution,
  readAttributionFromFormData,
  serializeAttribution,
} from "./lead-attribution.ts";

describe("parseAdIdFromUtmContent", () => {
  it("uses a bare Meta {{ad.id}} / numeric utm_content as ad_id", () => {
    assert.equal(parseAdIdFromUtmContent("1234567890"), "1234567890");
  });

  it("parses a trailing numeric id after a creative prefix", () => {
    assert.equal(
      parseAdIdFromUtmContent("static_photo_120248349183900567"),
      "120248349183900567",
    );
  });

  it("does not invent an id from a non-numeric creative slug", () => {
    assert.equal(parseAdIdFromUtmContent("summer_cleaning"), "");
    assert.equal(parseAdIdFromUtmContent(""), "");
  });
});

describe("parseAttributionFromSearch", () => {
  it("captures first-touch UTMs, click IDs, and parsed ad_id", () => {
    assert.deepEqual(
      parseAttributionFromSearch(
        "?utm_source=fb&utm_medium=paid&utm_campaign=new_patients&utm_content=1234567890&utm_term=dentist&gclid=g_click&fbclid=f_click&ttclid=t_click",
      ),
      {
        utm_source: "fb",
        utm_medium: "paid",
        utm_campaign: "new_patients",
        utm_content: "1234567890",
        utm_term: "dentist",
        gclid: "g_click",
        fbclid: "f_click",
        ttclid: "t_click",
        ad_id: "1234567890",
      },
    );
  });

  it("leaves click IDs empty when the visitor arrives untagged", () => {
    assert.deepEqual(parseAttributionFromSearch(""), emptyAttribution());
    assert.equal(hasAttributionTags(parseAttributionFromSearch("/schedule")), false);
  });

  it("does not invent click IDs from UTM tags alone", () => {
    const touch = parseAttributionFromSearch("?utm_content=1234567890");
    assert.equal(touch.ad_id, "1234567890");
    assert.equal(touch.utm_content, "1234567890");
    assert.equal(touch.gclid, "");
    assert.equal(touch.fbclid, "");
    assert.equal(touch.ttclid, "");
  });
});

describe("mergeFirstTouch", () => {
  it("keeps the first paid touch when a later page view has different tags", () => {
    const first = parseAttributionFromSearch("?utm_content=1234567890&utm_source=fb");
    const later = parseAttributionFromSearch("?utm_content=999&utm_source=google");
    assert.deepEqual(mergeFirstTouch(first, later), first);
  });

  it("does not let an organic later view overwrite first-touch tags", () => {
    const first = parseAttributionFromSearch("?utm_content=1234567890");
    assert.deepEqual(mergeFirstTouch(first, emptyAttribution()), first);
  });

  it("stores the first tagged visit after an untagged landing", () => {
    const paid = parseAttributionFromSearch("?utm_content=1234567890");
    assert.deepEqual(mergeFirstTouch(emptyAttribution(), paid), paid);
    assert.deepEqual(mergeFirstTouch(null, paid), paid);
  });
});

describe("readAttributionFromFormData / payload", () => {
  it("re-parses ad_id from utm_content when the hidden ad_id is blank", () => {
    const formData = new FormData();
    formData.set("utm_content", "1234567890");
    const attribution = readAttributionFromFormData(formData);
    assert.equal(attribution.ad_id, "1234567890");
    assert.equal(attribution.utm_content, "1234567890");

    const payload = applyAttributionToPayload(
      { name: "Pat", subject: "New appointment request from Pat" },
      attribution,
    );
    assert.equal(payload.ad_id, "1234567890");
    assert.equal(payload.utm_content, "1234567890");
    assert.equal(payload.gclid, undefined);
  });

  it("omits empty attribution keys from the Formspree payload", () => {
    const payload = applyAttributionToPayload({ name: "Pat" }, emptyAttribution());
    assert.deepEqual(payload, { name: "Pat" });
    assert.deepEqual(formatAttributionMessageLines(emptyAttribution()), []);
  });
});

describe("storage helpers", () => {
  it("round-trips a first-touch record and expires after 90 days", () => {
    const touch = parseAttributionFromSearch("?utm_content=1234567890");
    const capturedAt = "2026-05-01T00:00:00.000Z";
    const raw = serializeAttribution(touch, capturedAt);
    assert.deepEqual(
      parseStoredAttribution(raw, new Date("2026-06-01T00:00:00.000Z")),
      touch,
    );
    assert.equal(
      parseStoredAttribution(raw, new Date("2026-08-01T00:00:00.000Z")),
      null,
    );
  });

  it("strips control characters and caps length", () => {
    assert.equal(compactAttributionValue("  123\n456  "), "123456");
    assert.equal(compactAttributionValue("x".repeat(600)).length, 512);
  });
});
