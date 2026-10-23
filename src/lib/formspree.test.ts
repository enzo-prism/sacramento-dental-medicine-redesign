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
    visitType: "Wisdom teeth evaluation",
    date: "",
    dateLabel: "",
    time: "",
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
  });
});

describe("buildAppointmentFormspreePayload", () => {
  it("builds a labeled request without inventing a visit time", () => {
    const payload = buildAppointmentFormspreePayload(lead());
    assert.equal(payload.subject, "New appointment request from Form QA");
    assert.equal(payload.form_type, "appointment_request");
    assert.equal(payload.visitType, "Wisdom teeth evaluation");
    assert.equal(payload.phone, "(202) 555-0100");
    assert.equal(payload.date, undefined);
    assert.equal(payload.time, undefined);
    assert.match(payload.message, /^APPOINTMENT REQUEST \(not confirmed\)/);
  });

  it("adds first-touch attribution to both fields and readable message", () => {
    const attribution = emptyAttribution();
    attribution.utm_source = "chatgpt";
    attribution.gclid = "qa-click-id";
    const payload = buildAppointmentFormspreePayload(lead({ attribution }));
    assert.equal(payload.utm_source, "chatgpt");
    assert.equal(payload.gclid, "qa-click-id");
    assert.match(payload.message, /Attribution: utm_source=chatgpt; gclid=qa-click-id/);
  });
});

describe("resolveFormspreeReferer", () => {
  it("defaults to the wisdom-teeth landing path", () => {
    const referer = resolveFormspreeReferer(
      new Headers({
        "x-forwarded-proto": "https",
        "x-forwarded-host": "sacramentodentalmedicine.com",
      }),
      "https://sacramentodentalmedicine.com",
    );
    assert.equal(referer, "https://sacramentodentalmedicine.com/wisdom-teeth-removal-sacramento/");
  });
});

describe("buildFormspreeRequestInit", () => {
  it("sends JSON with the landing-page referrer", () => {
    const init = buildFormspreeRequestInit(
      { form_type: "appointment_request" },
      "https://sacramentodentalmedicine.com/wisdom-teeth-removal-sacramento/",
    );
    assert.equal(init.method, "POST");
    assert.equal(
      (init.headers as Record<string, string>).Referer,
      "https://sacramentodentalmedicine.com/wisdom-teeth-removal-sacramento/",
    );
  });
});
