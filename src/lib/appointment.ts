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
