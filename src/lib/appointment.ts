// Shared, framework-neutral types for the appointment request form.
// Kept out of the "use server" actions file, which may only export async functions.

export type AppointmentState = {
  ok: boolean;
  measurementEventId?: string;
  measurementClickReference?: string;
  measurementConsentEpoch?: string;
  message: string;
  errors: Partial<Record<"name" | "phone" | "email" | "notes" | "privacy", string>>;
};

export const initialAppointmentState: AppointmentState = {
  ok: false,
  message: "",
  errors: {},
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const APPOINTMENT_FIELD_LIMITS = {
  name: 120,
  phone: 32,
  email: 254,
  notes: 500,
} as const;

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
  const value = email.trim();
  return value.length <= APPOINTMENT_FIELD_LIMITS.email && EMAIL_RE.test(value);
}

export function formatUsPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }

  // Do not silently turn an overlong number into a different, valid number.
  if (digits.length > 10) return raw;

  if (digits.length === 0) return "";
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

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
