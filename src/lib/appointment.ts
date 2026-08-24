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

export function hasUsablePhone(phone: string) {
  return phone.replace(/\D/g, "").length >= 10;
}

export function hasUsableEmail(email: string) {
  return EMAIL_RE.test(email.trim());
}

export function formatUsPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length >= 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);

  if (digits.length === 0) return "";
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
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
    errors.phone = "That phone number looks short.";
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
