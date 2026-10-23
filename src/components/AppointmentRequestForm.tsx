"use client";

import Link from "next/link";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
} from "react";
import { Check, LoaderCircle } from "lucide-react";
import { requestAppointment } from "@/app/actions";
import { LeadAttributionHiddenFields } from "@/components/LeadAttributionFields";
import { contact } from "@/data/site";
import {
  APPOINTMENT_FIELD_LIMITS,
  formatUsPhone,
  initialAppointmentState,
} from "@/lib/appointment";
import { recordLeadConversion } from "@/lib/conversion";
import { ATTRIBUTION_FIELD_NAMES, refreshAttributionSnapshot } from "@/lib/lead-attribution";
import {
  measurementAllowed,
  measurementClickSnapshot,
  measurementConsentEpoch,
} from "@/lib/openai-measurement";

function Field({
  id,
  label,
  name,
  error,
  optional = false,
  ...input
}: {
  id: string;
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name">) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-sm font-semibold text-ink">
        {label}{" "}
        {optional ? (
          <span className="font-normal text-ink-faint">(optional)</span>
        ) : null}
      </span>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="min-w-0 rounded-2xl border border-line bg-white px-3.5 py-3 text-base text-ink transition placeholder:text-ink-faint focus:border-brand-deep md:text-sm"
        {...input}
      />
      {error ? (
        <span id={`${id}-error`} className="text-xs font-medium text-ember-deep">
          {error}
        </span>
      ) : null}
    </label>
  );
}

export function AppointmentRequestForm() {
  const [state, formAction, pending] = useActionState(
    requestAppointment,
    initialAppointmentState,
  );
  const [phone, setPhone] = useState("");
  const [privacyConfirmed, setPrivacyConfirmed] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);
  const measured = useRef(new Set<string>());

  useEffect(() => {
    if (state.ok) successRef.current?.focus();
    recordLeadConversion(state, {
      seen: measured.current,
      consentEpoch: measurementConsentEpoch(),
    });
  }, [state]);

  useEffect(() => {
    if (state.ok || !state.message) return;
    const firstInvalidField = (["name", "phone", "email", "notes", "privacy"] as const).find(
      (field) => state.errors[field],
    );
    if (firstInvalidField) {
      document.getElementById(`appointment-${firstInvalidField}`)?.focus();
    }
  }, [state]);

  if (state.ok) {
    return (
      <div className="surface-card p-6 sm:p-8" data-mobile-cta-stop>
        <h2
          ref={successRef}
          tabIndex={-1}
          className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink"
        >
          Request sent
        </h2>
        <p className="mt-3 text-sm leading-6 text-ink-soft">{state.message}</p>
        <a href={contact.phoneHref} className="btn btn-outline mt-6 h-12 w-full">
          Call {contact.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <div className="surface-card p-6 sm:p-8" data-mobile-cta-stop>
      <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
        Request a wisdom teeth visit
      </h2>
      <p className="mt-2 text-sm leading-6 text-ink-soft">
        Your name, plus a phone number or an email — we only need one. This is a
        request, not a confirmed appointment.
      </p>

      <form
        action={formAction}
        className="mt-6 grid gap-4"
        aria-busy={pending}
        onSubmit={(event) => {
          const snapshot = measurementClickSnapshot();
          const requestFields: Record<string, string> = {
            _openai_click_reference: snapshot?.reference ?? "",
            _openai_click_captured_at: snapshot ? String(snapshot.capturedAt) : "",
            _openai_measurement_consent: measurementAllowed() ? "granted" : "denied",
            _openai_consent_epoch: measurementConsentEpoch(),
            _openai_submitted_at: String(Date.now()),
          };
          for (const [field, value] of Object.entries(requestFields)) {
            const input = event.currentTarget.querySelector<HTMLInputElement>(
              `input[name="${field}"]`,
            );
            if (input) input.value = value;
          }
          const attribution = refreshAttributionSnapshot();
          const form = event.currentTarget;
          for (const field of ATTRIBUTION_FIELD_NAMES) {
            const input = form.querySelector<HTMLInputElement>(`input[name="${field}"]`);
            if (input) input.value = attribution[field];
          }
        }}
      >
        <input type="hidden" name="visitType" value="Wisdom teeth evaluation" />
        <LeadAttributionHiddenFields />
        <input type="hidden" name="_openai_click_reference" defaultValue="" />
        <input type="hidden" name="_openai_click_captured_at" defaultValue="" />
        <input type="hidden" name="_openai_measurement_consent" defaultValue="" />
        <input type="hidden" name="_openai_consent_epoch" defaultValue="" />
        <input type="hidden" name="_openai_submitted_at" defaultValue="" />

        <fieldset disabled={pending} className="grid gap-4">
          <Field
            id="appointment-name"
            label="Your name"
            name="name"
            autoComplete="name"
            maxLength={APPOINTMENT_FIELD_LIMITS.name}
            error={state.errors.name}
          />
          <fieldset
            className="grid gap-3 rounded-2xl border border-line bg-wash/45 p-3.5"
            aria-describedby="contact-help"
          >
            <legend className="px-1 text-sm font-semibold text-ink">
              Contact details{" "}
              <span className="font-normal text-ink-soft">(phone or email required)</span>
            </legend>
            <p id="contact-help" className="text-xs leading-5 text-ink-soft">
              Use whichever is easiest. If you fill in both, both need to be complete.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                id="appointment-phone"
                label="Phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(formatUsPhone(event.target.value))}
                maxLength={APPOINTMENT_FIELD_LIMITS.phone}
                error={state.errors.phone}
              />
              <Field
                id="appointment-email"
                label="Email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                maxLength={APPOINTMENT_FIELD_LIMITS.email}
                error={state.errors.email}
              />
            </div>
          </fieldset>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-ink">
              Anything we should know?{" "}
              <span className="font-normal text-ink-faint">(optional)</span>
            </span>
            <textarea
              id="appointment-notes"
              name="notes"
              rows={2}
              maxLength={APPOINTMENT_FIELD_LIMITS.notes}
              placeholder="Scheduling context or a general question"
              aria-invalid={state.errors.notes ? true : undefined}
              aria-describedby={state.errors.notes ? "notes-error" : "notes-privacy-help"}
              className="resize-none rounded-2xl border border-line bg-white px-3.5 py-3 text-base leading-6 text-ink transition placeholder:text-ink-faint focus:border-brand-deep md:text-sm"
            />
            <span id="notes-privacy-help" className="text-xs leading-5 text-ink-soft">
              Please do not include symptoms, medical history, insurance IDs, or payment details.
            </span>
            {state.errors.notes ? (
              <span id="notes-error" className="text-xs font-medium text-ember-deep">
                {state.errors.notes}
              </span>
            ) : null}
          </label>

          <label className="flex items-start gap-3 rounded-2xl border border-line bg-wash/45 p-3.5 text-xs leading-5 text-ink-soft">
            <input
              id="appointment-privacy"
              name="privacyConsent"
              type="checkbox"
              value="confirmed"
              checked={privacyConfirmed}
              onChange={(event) => setPrivacyConfirmed(event.target.checked)}
              required
              aria-invalid={state.errors.privacy ? true : undefined}
              aria-describedby={state.errors.privacy ? "privacy-error" : undefined}
              className="mt-0.5 size-4 shrink-0 accent-brand-deep"
            />
            <span>
              I understand this is a scheduling request and will not include
              sensitive health or payment information. See our{" "}
              <Link
                href="/privacy-practices/"
                className="font-semibold text-brand-deep underline underline-offset-2"
              >
                privacy practices
              </Link>
              .
              {state.errors.privacy ? (
                <span id="privacy-error" className="mt-1 block font-medium text-ember-deep">
                  {state.errors.privacy}
                </span>
              ) : null}
            </span>
          </label>

          <div className="hidden" aria-hidden="true">
            <label>
              Leave this field empty
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
        </fieldset>

        {state.message && !state.ok ? (
          <p className="rounded-2xl border border-ember/40 bg-ember-tint px-4 py-3 text-sm font-medium text-ember-deep">
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary h-12 w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Check className="size-4" aria-hidden="true" />
              Request this visit
            </>
          )}
        </button>
      </form>
    </div>
  );
}
