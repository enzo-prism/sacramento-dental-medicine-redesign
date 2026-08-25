import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  appointmentTimeLabels,
  contactFieldErrors,
  contactStatusMessage,
  formatUsPhone,
  hasUsableEmail,
  hasUsablePhone,
  normalizeUsPhoneDigits,
  validateAppointmentSelection,
} from "./appointment.ts";

const testHours = {
  0: null,
  1: { open: 9 * 60, close: 18 * 60 },
  2: { open: 8 * 60, close: 17 * 60 },
  3: { open: 10 * 60, close: 19 * 60 },
  4: { open: 11 * 60, close: 19 * 60 },
  5: { open: 8 * 60, close: 14 * 60 },
  6: null,
};

const selectionConfig = {
  visitTypeLabels: ["New patient exam", "Pain or emergency"],
  officeHours: testHours,
};

const sacramentoTuesdayNoon = new Date("2026-08-25T19:00:00.000Z");

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

  it("rejects extra phone digits even when an email is valid", () => {
    const errors = contactFieldErrors("91655501000", "pat@example.com");
    assert.equal(
      errors.phone,
      "Enter exactly 10 US digits (a leading +1 is okay).",
    );
    assert.equal(errors.email, undefined);
  });
});

describe("hasUsablePhone / hasUsableEmail", () => {
  it("counts 10 digits as a usable phone", () => {
    assert.equal(hasUsablePhone("(916) 555-0100"), true);
    assert.equal(hasUsablePhone("555-0100"), false);
  });

  it("accepts only ten US digits with an optional leading country code", () => {
    assert.equal(hasUsablePhone("+1 (916) 555-0100"), true);
    assert.equal(normalizeUsPhoneDigits("+1 (916) 555-0100"), "9165550100");
    assert.equal(hasUsablePhone("91655501000"), false);
    assert.equal(hasUsablePhone("+11 (916) 555-0100"), false);
    assert.equal(hasUsablePhone("call 916-555-0100"), false);
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

  it("does not silently truncate an overlong number", () => {
    assert.equal(formatUsPhone("91655501000"), "91655501000");
  });
});

describe("appointmentTimeLabels", () => {
  it("derives only the windows actually contained in each workday", () => {
    assert.deepEqual(appointmentTimeLabels(3, testHours), [
      "Morning (10:00 AM – 12:00 PM)",
      "Afternoon (12:00 PM – 5:00 PM)",
      "Evening (5:00 PM – 7:00 PM)",
    ]);
    assert.deepEqual(appointmentTimeLabels(5, testHours), [
      "Morning (8:00 AM – 12:00 PM)",
      "Afternoon (12:00 PM – 2:00 PM)",
    ]);
    assert.deepEqual(appointmentTimeLabels(6, testHours), []);
  });
});

describe("validateAppointmentSelection", () => {
  it("accepts a configured visit, future business date, and weekday time", () => {
    assert.deepEqual(
      validateAppointmentSelection(
        {
          visitType: "New patient exam",
          date: "2026-08-26",
          time: "Evening (5:00 PM – 7:00 PM)",
        },
        selectionConfig,
        sacramentoTuesdayNoon,
      ),
      { ok: true, dateLabel: "Wed, Aug 26, 2026" },
    );
  });

  it("rejects visit-type and time-window tampering", () => {
    assert.deepEqual(
      validateAppointmentSelection(
        {
          visitType: "Free implant",
          date: "2026-08-26",
          time: "Evening (5:00 PM – 7:00 PM)",
        },
        selectionConfig,
        sacramentoTuesdayNoon,
      ),
      { ok: false, reason: "visit-type" },
    );
    assert.deepEqual(
      validateAppointmentSelection(
        {
          visitType: "New patient exam",
          date: "2026-08-28",
          time: "Evening (5:00 PM – 7:00 PM)",
        },
        selectionConfig,
        sacramentoTuesdayNoon,
      ),
      { ok: false, reason: "time" },
    );
  });

  it("rejects malformed, past, weekend, and out-of-horizon dates", () => {
    const base = {
      visitType: "New patient exam",
      time: "Morning (9:00 AM – 12:00 PM)",
    };
    assert.deepEqual(
      validateAppointmentSelection({ ...base, date: "2026-02-30" }, selectionConfig, sacramentoTuesdayNoon),
      { ok: false, reason: "date-format" },
    );
    assert.deepEqual(
      validateAppointmentSelection({ ...base, date: "2026-08-25" }, selectionConfig, sacramentoTuesdayNoon),
      { ok: false, reason: "date-past" },
    );
    assert.deepEqual(
      validateAppointmentSelection({ ...base, date: "2026-08-24" }, selectionConfig, sacramentoTuesdayNoon),
      { ok: false, reason: "date-past" },
    );
    assert.deepEqual(
      validateAppointmentSelection({ ...base, date: "2026-08-29" }, selectionConfig, sacramentoTuesdayNoon),
      { ok: false, reason: "date-closed" },
    );
    assert.deepEqual(
      validateAppointmentSelection({ ...base, date: "2026-10-05" }, selectionConfig, sacramentoTuesdayNoon),
      { ok: false, reason: "date-horizon" },
    );
  });

  it("uses Sacramento local midnight for the future-date boundary", () => {
    const nextDay = {
      visitType: "New patient exam",
      date: "2026-08-26",
      time: "Morning (10:00 AM – 12:00 PM)",
    };
    assert.equal(
      validateAppointmentSelection(
        nextDay,
        selectionConfig,
        new Date("2026-08-26T06:59:00.000Z"),
      ).ok,
      true,
    );
    assert.deepEqual(
      validateAppointmentSelection(
        nextDay,
        selectionConfig,
        new Date("2026-08-26T07:01:00.000Z"),
      ),
      { ok: false, reason: "date-past" },
    );
  });

  it("accepts the horizon boundary and rejects the following day", () => {
    const sundayNoon = new Date("2026-08-23T19:00:00.000Z");
    const base = {
      visitType: "New patient exam",
      time: "Morning (8:00 AM – 12:00 PM)",
    };
    assert.deepEqual(
      validateAppointmentSelection(
        { ...base, date: "2026-10-02" },
        selectionConfig,
        sundayNoon,
      ),
      { ok: true, dateLabel: "Fri, Oct 2, 2026" },
    );
    assert.deepEqual(
      validateAppointmentSelection(
        { ...base, date: "2026-10-03" },
        selectionConfig,
        sundayNoon,
      ),
      { ok: false, reason: "date-horizon" },
    );
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
