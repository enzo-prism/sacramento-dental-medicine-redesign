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
