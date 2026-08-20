import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  contactFieldErrors,
  hasUsableEmail,
  hasUsablePhone,
} from "./appointment.ts";

describe("contactFieldErrors", () => {
  it("requires at least one usable contact method", () => {
    const errors = contactFieldErrors("", "");
    assert.equal(
      errors.phone,
      "Add a phone number or an email so we can confirm.",
    );
    assert.equal(errors.email, errors.phone);
  });

  it("accepts a phone without an email", () => {
    assert.deepEqual(contactFieldErrors("(916) 555-0100", ""), {});
  });

  it("accepts an email without a phone", () => {
    assert.deepEqual(contactFieldErrors("", "pat@example.com"), {});
  });

  it("accepts both when both are usable", () => {
    assert.deepEqual(
      contactFieldErrors("(916) 555-0100", "pat@example.com"),
      {},
    );
  });

  it("still flags a short phone even if email is valid", () => {
    const errors = contactFieldErrors("555-01", "pat@example.com");
    assert.equal(errors.phone, "That phone number looks short.");
    assert.equal(errors.email, undefined);
  });

  it("still flags a bad email even if phone is valid", () => {
    const errors = contactFieldErrors("(916) 555-0100", "not-an-email");
    assert.equal(errors.email, "That email doesn't look right.");
    assert.equal(errors.phone, undefined);
  });
});

describe("hasUsablePhone / hasUsableEmail", () => {
  it("counts 10 digits as a usable phone", () => {
    assert.equal(hasUsablePhone("(916) 555-0100"), true);
    assert.equal(hasUsablePhone("555-0100"), false);
  });

  it("requires a plausible email", () => {
    assert.equal(hasUsableEmail("pat@example.com"), true);
    assert.equal(hasUsableEmail("pat@"), false);
    assert.equal(hasUsableEmail("  "), false);
  });
});
