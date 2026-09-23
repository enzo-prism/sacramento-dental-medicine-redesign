import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { emptyAttribution } from "./lead-attribution.ts";
import {
  buildAppointmentFormspreePayload,
  buildFormspreeRequestInit,
  resolveFormspreeReferer,
  resolveFormspreeEndpoint,
  type AppointmentLead,
} from "./formspree.ts";

const fallback = "https://formspree.io/f/xvkpdvyz";

function lead(overrides: Partial<AppointmentLead> = {}): AppointmentLead {
  return {
    name: "Form QA",
    phone: "(202) 555-0100",
    email: "",
    visitType: "New patient exam",
    date: "2026-09-02",
    dateLabel: "Wed, Sep 2, 2026",
    time: "Morning (9:00 AM – 12:00 PM)",
    notes: "Synthetic test only",
    receivedAt: "2026-09-01T20:00:00.000Z",
    attribution: emptyAttribution(),
    ...overrides,
  };
}

describe("resolveFormspreeEndpoint", () => {
  it("uses only an exact Formspree form endpoint", () => {
    assert.equal(resolveFormspreeEndpoint(" https://formspree.io/f/abc123 ", fallback), "https://formspree.io/f/abc123");
    assert.equal(resolveFormspreeEndpoint("", fallback), fallback);
    assert.equal(resolveFormspreeEndpoint("https://example.com/capture", fallback), fallback);
    assert.equal(resolveFormspreeEndpoint("https://formspree.io/forms/abc123", fallback), fallback);
  });
});

describe("buildAppointmentFormspreePayload", () => {
  it("builds an operationally labeled phone-only request", () => {
    const payload = buildAppointmentFormspreePayload(lead());
    assert.equal(payload.subject, "New appointment request from Form QA");
    assert.equal(payload.form_type, "appointment_request");
    assert.equal(payload.source, "sacramentodentalmedicine.com schedule form");
    assert.equal(payload.phone, "(202) 555-0100");
    assert.equal(payload.email, undefined);
    assert.equal(payload.privacy_check, "confirmed");
    assert.equal(payload.received_at, "2026-09-01T20:00:00.000Z");
    assert.match(payload.message, /^APPOINTMENT REQUEST \(not confirmed\)/);
  });

  it("omits empty phone and notes for an email-only request", () => {
    const payload = buildAppointmentFormspreePayload(
      lead({ phone: "", email: "form-qa@example.com", notes: "" }),
    );
    assert.equal(payload.phone, undefined);
    assert.equal(payload.notes, undefined);
    assert.equal(payload.email, "form-qa@example.com");
  });

  it("adds first-touch attribution to both fields and readable message", () => {
    const attribution = emptyAttribution();
    attribution.utm_source = "google";
    attribution.gclid = "qa-click-id";
    const payload = buildAppointmentFormspreePayload(lead({ attribution }));
    assert.equal(payload.utm_source, "google");
    assert.equal(payload.gclid, "qa-click-id");
    assert.match(payload.message, /Attribution: utm_source=google; gclid=qa-click-id/);
  });
});

describe("buildFormspreeRequestInit", () => {
  it("sends JSON with the production referrer used by domain restriction", () => {
    const init = buildFormspreeRequestInit(
      { form_type: "appointment_request" },
      "https://sacramentodentalmedicine.com/schedule/",
    );
    assert.equal(init.method, "POST");
    assert.deepEqual(init.headers, {
      Accept: "application/json",
      "Content-Type": "application/json",
      Referer: "https://sacramentodentalmedicine.com/schedule/",
    });
    assert.equal(init.body, JSON.stringify({ form_type: "appointment_request" }));
    assert.ok(init.signal instanceof AbortSignal);
  });
});

describe("resolveFormspreeReferer", () => {
  it("prefers the current forwarded production host", () => {
    const referer = resolveFormspreeReferer(
      new Headers({
        "x-forwarded-proto": "https",
        "x-forwarded-host": "sacramentodentalmedicine.com",
      }),
      "https://sacramentodentalmedicine.com",
    );
    assert.equal(referer, "https://sacramentodentalmedicine.com/schedule/");
  });

  it("falls back to the runtime origin before the static production origin", () => {
    const referer = resolveFormspreeReferer(
      new Headers({
        origin: "https://sacramento-dental-medicine-redesign-git-main.vercel.app",
      }),
      "https://sacramentodentalmedicine.com",
    );
    assert.equal(
      referer,
      "https://sacramento-dental-medicine-redesign-git-main.vercel.app/schedule/",
    );
  });
});
