// Shared, framework-neutral types for the appointment form.
// Kept out of the "use server" actions file, which may only export async functions.

export type AppointmentState = {
  ok: boolean;
  message: string;
  errors: Partial<Record<"name" | "phone" | "email", string>>;
};

export const initialAppointmentState: AppointmentState = {
  ok: false,
  message: "",
  errors: {},
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const APPOINTMENT_TIME_ZONE = "America/Los_Angeles";
export const APPOINTMENT_HORIZON_DAYS = 40;

export type OfficeWindow = { open: number; close: number };
export type AppointmentOfficeHours = Record<number, OfficeWindow | null>;

type AppointmentSelection = {
  visitType: string;
  date: string;
  time: string;
};

type AppointmentSelectionConfig = {
  visitTypeLabels: readonly string[];
  officeHours: AppointmentOfficeHours;
  horizonDays?: number;
};

export type AppointmentSelectionResult =
  | {
      ok: true;
      dateLabel: string;
    }
  | {
      ok: false;
      reason:
        | "visit-type"
        | "date-format"
        | "date-past"
        | "date-horizon"
        | "date-closed"
        | "time";
    };

const PHONE_ALLOWED_CHARACTERS = /^\s*\+?[\d\s().-]+\s*$/;

/** Returns the ten national digits for a US number, or null when invalid. */
export function normalizeUsPhoneDigits(raw: string): string | null {
  if (!PHONE_ALLOWED_CHARACTERS.test(raw)) return null;

  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }
  return digits.length === 10 ? digits : null;
}

export function hasUsablePhone(phone: string) {
  return normalizeUsPhoneDigits(phone) !== null;
}

export function hasUsableEmail(email: string) {
  return EMAIL_RE.test(email.trim());
}

export function formatUsPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }

  // Do not silently turn an overlong number into a different, valid number.
  // Keeping the user's input visible lets the validation message explain it.
  if (digits.length > 10) return raw;

  if (digits.length === 0) return "";
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatTime(minutes: number) {
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${pad(minute)} ${suffix}`;
}

/** Exact labels the browser is allowed to submit for a configured weekday. */
export function appointmentTimeLabels(
  weekday: number,
  officeHours: AppointmentOfficeHours,
): string[] {
  const hours = officeHours[weekday];
  if (!hours) return [];

  const labels: string[] = [];
  const morningEnd = Math.min(hours.close, 12 * 60);
  if (hours.open < 12 * 60 && morningEnd > hours.open) {
    labels.push(
      `Morning (${formatTime(hours.open)} – ${formatTime(morningEnd)})`,
    );
  }

  const afternoonStart = Math.max(hours.open, 12 * 60);
  const afternoonEnd = Math.min(hours.close, 17 * 60);
  if (afternoonEnd > afternoonStart) {
    labels.push(
      `Afternoon (${formatTime(afternoonStart)} – ${formatTime(afternoonEnd)})`,
    );
  }

  const eveningStart = Math.max(hours.open, 17 * 60);
  if (hours.close > eveningStart) {
    labels.push(
      `Evening (${formatTime(eveningStart)} – ${formatTime(hours.close)})`,
    );
  }

  return labels;
}

type CalendarDate = {
  year: number;
  month: number;
  day: number;
  dayNumber: number;
  weekday: number;
};

function parseCalendarDate(value: string): CalendarDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const utc = new Date(Date.UTC(year, month - 1, day));
  if (
    utc.getUTCFullYear() !== year ||
    utc.getUTCMonth() !== month - 1 ||
    utc.getUTCDate() !== day
  ) {
    return null;
  }

  return {
    year,
    month,
    day,
    dayNumber: Math.floor(utc.getTime() / 86_400_000),
    weekday: utc.getUTCDay(),
  };
}

function calendarDateInTimeZone(now: Date, timeZone: string): CalendarDate {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  const parsed = parseCalendarDate(
    `${value("year")}-${pad(value("month"))}-${pad(value("day"))}`,
  );
  if (!parsed) throw new Error("Unable to determine the local appointment date");
  return parsed;
}

function appointmentDateLabel(date: CalendarDate) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(Date.UTC(date.year, date.month - 1, date.day)));
}

/**
 * Validates every server-controlled scheduling choice and derives the label
 * used for delivery. `now` is injectable so date boundaries stay testable.
 */
export function validateAppointmentSelection(
  selection: AppointmentSelection,
  config: AppointmentSelectionConfig,
  now: Date = new Date(),
): AppointmentSelectionResult {
  if (!config.visitTypeLabels.includes(selection.visitType)) {
    return { ok: false, reason: "visit-type" };
  }

  const date = parseCalendarDate(selection.date);
  if (!date) return { ok: false, reason: "date-format" };

  const today = calendarDateInTimeZone(now, APPOINTMENT_TIME_ZONE);
  const daysAhead = date.dayNumber - today.dayNumber;
  if (daysAhead < 1) return { ok: false, reason: "date-past" };
  if (daysAhead > (config.horizonDays ?? APPOINTMENT_HORIZON_DAYS)) {
    return { ok: false, reason: "date-horizon" };
  }

  if (!config.officeHours[date.weekday]) {
    return { ok: false, reason: "date-closed" };
  }
  if (!appointmentTimeLabels(date.weekday, config.officeHours).includes(selection.time)) {
    return { ok: false, reason: "time" };
  }

  return { ok: true, dateLabel: appointmentDateLabel(date) };
}

export function contactStatusMessage(phone: string, email: string) {
  const phoneDigits = phone.replace(/\D/g, "").length;
  const phoneOk = hasUsablePhone(phone);
  const emailOk = hasUsableEmail(email);

  if (phoneDigits > 0 && !phoneOk) {
    return "Enter a 10-digit phone number, or clear it and use email.";
  }
  if (email.trim() && !emailOk) {
    return "Enter a valid email address, or clear it and use phone.";
  }
  if (!phoneOk && !emailOk) {
    return "Add a phone number or an email — at least one.";
  }
  if (phoneOk && emailOk) return "Both contact methods look good.";
  return phoneOk
    ? "Phone added — email is optional."
    : "Email added — phone is optional.";
}

/** Phone or email is enough; incomplete extras still error. */
export function contactFieldErrors(
  phone: string,
  email: string,
): Partial<Record<"phone" | "email", string>> {
  const errors: Partial<Record<"phone" | "email", string>> = {};
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneOk = hasUsablePhone(phone);
  const emailOk = hasUsableEmail(email);

  if (phoneDigits.length > 0 && !phoneOk) {
    errors.phone =
      phoneDigits.length < 10
        ? "That phone number looks short."
        : "Enter exactly 10 US digits (a leading +1 is okay).";
  }
  if (email.trim() && !emailOk) {
    errors.email = "That email doesn't look right.";
  }
  if (!phoneOk && !emailOk && !errors.phone && !errors.email) {
    const reach = "Add a phone number or an email so we can confirm.";
    errors.phone = reach;
    errors.email = reach;
  }
  return errors;
}
