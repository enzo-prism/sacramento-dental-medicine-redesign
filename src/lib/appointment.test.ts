import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  contactFieldErrors,
  formatUsPhone,
  hasUsableEmail,
  hasUsablePhone,
} from "./appointment.ts";

describe("contactFieldErrors", () => {
  it("requires a usable phone or email", () => {
    const errors = contactFieldErrors("", "");
    assert.equal(errors.phone, "Add a phone number or an email so we can confirm.");
    assert.equal(errors.email, "Add a phone number or an email so we can confirm.");
  });

  it("accepts a US phone without an email", () => {
    assert.deepEqual(contactFieldErrors("(916) 727-6453", ""), {});
    assert.equal(hasUsablePhone("(916) 727-6453"), true);
  });

  it("rejects a short or invalid phone when one is entered", () => {
    assert.equal(contactFieldErrors("916", "").phone, "That phone number looks short.");
    assert.equal(hasUsableEmail("not-an-email"), false);
  });
});

describe("formatUsPhone", () => {
  it("formats ten national digits without inventing a different number", () => {
    assert.equal(formatUsPhone("9167276453"), "(916) 727-6453");
    assert.equal(formatUsPhone("191672764531"), "191672764531");
  });
});
