import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  contactFieldErrors,
  contactStatusMessage,
  formatUsPhone,
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

describe("formatUsPhone", () => {
  it("formats a ten-digit phone number", () => {
    assert.equal(formatUsPhone("9165550100"), "(916) 555-0100");
  });

  it("drops the US country code from autofilled phone numbers", () => {
    assert.equal(formatUsPhone("+1 (916) 555-0100"), "(916) 555-0100");
  });
});

describe("contactStatusMessage", () => {
  it("explains that either contact method is enough", () => {
    assert.equal(
      contactStatusMessage("", ""),
      "Add a phone number or an email — at least one.",
    );
    assert.equal(
      contactStatusMessage("(916) 555-0100", ""),
      "Phone added — email is optional.",
    );
    assert.equal(
      contactStatusMessage("", "pat@example.com"),
      "Email added — phone is optional.",
    );
  });

  it("gives a specific recovery path for incomplete contact details", () => {
    assert.equal(
      contactStatusMessage("555-01", "pat@example.com"),
      "Enter a 10-digit phone number, or clear it and use email.",
    );
    assert.equal(
      contactStatusMessage("(916) 555-0100", "pat@"),
      "Enter a valid email address, or clear it and use phone.",
    );
  });
});
