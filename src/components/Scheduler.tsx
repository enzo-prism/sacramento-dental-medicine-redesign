"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CircleCheck,
  Clock,
  type LucideIcon,
  LoaderCircle,
  Pencil,
  Phone,
  Sun,
  Sunrise,
  Sunset,
  Zap,
} from "lucide-react";
import { requestAppointment } from "@/app/actions";
import { initialAppointmentState } from "@/lib/appointment";
import {
  contact,
  officeHours,
  slotIntervalMinutes,
  visitTypes,
} from "@/data/site";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const STEPS = ["Visit", "Date & time", "Your details"];

type DayOption = {
  iso: string;
  wd: number;
  weekday: string;
  dayNum: number;
  month: string;
  relative: string;
};

type SlotGroup = { label: string; icon: LucideIcon; slots: number[] };

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatTime(min: number) {
  const h24 = Math.floor(min / 60);
  const m = min % 60;
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${pad(m)} ${ampm}`;
}

// Build the next `count` open days (uses Date — runs client-side only).
function buildDays(count: number): DayOption[] {
  const out: DayOption[] = [];
  const today = new Date();
  for (let i = 1; out.length < count && i <= 40; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const wd = d.getDay();
    if (!officeHours[wd]) continue;
    out.push({
      iso: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      wd,
      weekday: WEEKDAYS[wd],
      dayNum: d.getDate(),
      month: MONTHS[d.getMonth()],
      relative: i === 1 ? "Tomorrow" : "",
    });
  }
  return out;
}

// Generate real time slots from the office hours, grouped by part of day.
function buildSlots(wd: number): SlotGroup[] {
  const h = officeHours[wd];
  if (!h) return [];
  const all: number[] = [];
  for (let t = h.open; t + slotIntervalMinutes <= h.close; t += slotIntervalMinutes) {
    all.push(t);
  }
  const groups: SlotGroup[] = [
    { label: "Morning", icon: Sunrise, slots: all.filter((t) => t < 12 * 60) },
    { label: "Afternoon", icon: Sun, slots: all.filter((t) => t >= 12 * 60 && t < 17 * 60) },
    { label: "Evening", icon: Sunset, slots: all.filter((t) => t >= 17 * 60) },
  ];
  return groups.filter((g) => g.slots.length > 0);
}

function dayLabel(day: DayOption) {
  return `${day.weekday}, ${day.month} ${day.dayNum}`;
}

export function Scheduler() {
  const [state, formAction, pending] = useActionState(
    requestAppointment,
    initialAppointmentState,
  );

  const [step, setStep] = useState(0);
  const [visitId, setVisitId] = useState<string | null>(null);
  const [days, setDays] = useState<DayOption[]>([]);
  const [dateIso, setDateIso] = useState<string | null>(null);
  const [timeMin, setTimeMin] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Date list depends on "today" — compute on the client to avoid SSR mismatch.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setDays(buildDays(10)));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Move focus to the step heading when advancing (skip initial mount).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const selectedVisit = visitTypes.find((v) => v.id === visitId) ?? null;
  const selectedDay = days.find((d) => d.iso === dateIso) ?? null;
  const slotGroups = selectedDay ? buildSlots(selectedDay.wd) : [];

  const earliestDay = days[0] ?? null;
  const earliestSlot = earliestDay ? buildSlots(earliestDay.wd)[0]?.slots[0] ?? null : null;

  const phoneDigits = phone.replace(/\D/g, "").length;
  const canSubmit = name.trim().length > 1 && phoneDigits >= 10 && !pending;

  function chooseVisit(id: string, urgent?: boolean) {
    setVisitId(id);
    if (!urgent) setStep(1);
  }

  function pickEarliest() {
    if (!earliestDay || earliestSlot == null) return;
    setDateIso(earliestDay.iso);
    setTimeMin(earliestSlot);
  }

  // ---- Success ----
  if (state.ok) {
    return (
      <div className="surface-card mx-auto flex max-w-2xl flex-col items-center gap-5 p-8 text-center md:p-12">
        <span className="grid size-16 place-items-center rounded-full orb-brand">
          <CircleCheck className="size-8" />
        </span>
        <h3 className="font-display text-3xl font-medium text-ink">
          Request received
        </h3>
        {selectedVisit && selectedDay && timeMin != null ? (
          <div className="surface-wash w-full max-w-md p-5 text-left">
            <SummaryRow icon={selectedVisit.icon} label={selectedVisit.label} />
            <div className="my-3 hairline" />
            <SummaryRow icon={CalendarDays} label={dayLabel(selectedDay)} />
            <div className="my-3 hairline" />
            <SummaryRow icon={Clock} label={formatTime(timeMin)} />
          </div>
        ) : null}
        <p className="max-w-md text-pretty text-sm leading-7 text-ink-soft md:text-base">
          {state.message}
        </p>
        <a href={contact.phoneHref} className="btn btn-outline">
          <Phone className="size-4" />
          Questions? Call {contact.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <div className="surface-card mx-auto w-full min-w-0 max-w-3xl overflow-hidden">
      {/* Progress header */}
      <div className="border-b border-line bg-white px-5 py-4 md:px-7">
        <p className="sr-only" aria-live="polite">
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </p>
        <ol className="flex items-center gap-2" aria-hidden="true">
          {STEPS.map((label, i) => (
            <li
              key={label}
              className={`flex items-center gap-2 ${
                i < STEPS.length - 1 ? "flex-1" : ""
              }`}
            >
              <span
                className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition ${
                  i < step
                    ? "bg-brand-tint text-brand-ink"
                    : i === step
                      ? "bg-brand-deep text-white"
                      : "bg-brand-tint/50 text-brand-ink"
                }`}
              >
                {i < step ? (
                  <Check className="size-3.5" />
                ) : (
                  <span className="text-[11px] font-bold">{i + 1}</span>
                )}
                <span className="hidden sm:inline">{label}</span>
              </span>
              {i < STEPS.length - 1 ? (
                <span
                  className={`mx-1 h-px flex-1 ${
                    i < step ? "bg-brand-deep" : "bg-line"
                  }`}
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <form action={formAction} className="p-5 md:p-7">
        {/* Selections travel with the form for submission */}
        <input type="hidden" name="visitType" value={selectedVisit?.label ?? ""} />
        <input type="hidden" name="date" value={dateIso ?? ""} />
        <input
          type="hidden"
          name="dateLabel"
          value={selectedDay ? dayLabel(selectedDay) : ""}
        />
        <input type="hidden" name="time" value={timeMin != null ? formatTime(timeMin) : ""} />

        {/* STEP 0 — visit type */}
        {step === 0 ? (
          <div className="step-panel" key="step-visit">
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-2xl font-medium text-ink outline-none"
            >
              What brings you in?
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Pick the closest fit. You can add details later.
            </p>

            <div
              role="group"
              aria-label="Visit type"
              className="mt-6 grid gap-3 sm:grid-cols-2"
            >
              {visitTypes.map((v) => {
                const active = visitId === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => chooseVisit(v.id, v.urgent)}
                    className={`option-tile flex items-center gap-4 rounded-2xl border p-4 text-left ${
                      active
                        ? "border-brand-deep bg-wash ring-1 ring-brand-deep"
                        : "border-line bg-white hover:border-brand/60"
                    }`}
                  >
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-xl ${
                        v.urgent ? "orb-ember" : "orb-brand"
                      }`}
                    >
                      <v.icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-base font-medium text-ink">
                        {v.label}
                      </span>
                      <span className="block text-xs leading-5 text-ink-soft">
                        {v.blurb}
                      </span>
                    </span>
                    {active ? (
                      <Check className="size-5 shrink-0 text-brand-deep" />
                    ) : null}
                  </button>
                );
              })}
            </div>

            {selectedVisit?.urgent ? (
              <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-ember/30 bg-ember-tint p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-ember-deep">
                  Calling is the fastest way in. We&apos;ll do everything we
                  can to see you today.
                </p>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <a
                    href={contact.phoneHref}
                    className="btn btn-ember text-sm"
                  >
                    <Phone className="size-4" />
                    Call now
                  </a>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex min-h-11 items-center gap-1 rounded-full border border-ember/40 px-4 py-2.5 text-sm font-semibold text-ember-deep transition hover:bg-white/60"
                  >
                    Schedule online
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* STEP 1 — date & time */}
        {step === 1 ? (
          <div className="step-panel" key="step-time">
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-2xl font-medium text-ink outline-none"
            >
              Choose a day & time
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Pick a time inside our office hours. The front desk will call to
              confirm it&apos;s open.
            </p>

            {earliestDay && earliestSlot != null ? (
              <button
                type="button"
                onClick={pickEarliest}
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-brand/40 bg-wash px-4 py-2 text-sm font-semibold text-brand-deep transition hover:bg-wash-2"
              >
                <Zap className="size-4" />
                Soonest to request: {earliestDay.relative || earliestDay.weekday}{" "}
                {formatTime(earliestSlot)}
              </button>
            ) : null}

            {/* Date rail */}
            <div className="mt-5">
              <div className="no-scrollbar -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
                {days.length === 0 ? (
                  <p className="py-6 text-sm text-ink-faint">Loading days…</p>
                ) : (
                  days.map((d) => {
                    const active = dateIso === d.iso;
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        onClick={() => {
                          setDateIso(d.iso);
                          setTimeMin(null);
                        }}
                        aria-pressed={active}
                        className={`option-tile flex w-16 shrink-0 snap-start flex-col items-center gap-0.5 rounded-2xl border px-2 py-3 ${
                          active
                            ? "border-brand-deep bg-brand-deep text-white"
                            : "border-line bg-white text-ink hover:border-brand/60"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wide ${
                            active ? "text-white/90" : "text-ink-faint"
                          }`}
                        >
                          {d.relative || d.weekday}
                        </span>
                        <span className="font-display text-xl font-medium leading-none">
                          {d.dayNum}
                        </span>
                        <span
                          className={`text-[10px] font-semibold ${
                            active ? "text-white/90" : "text-ink-faint"
                          }`}
                        >
                          {d.month}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Time slots */}
            <div className="mt-6 min-h-[7rem]">
              {!selectedDay ? (
                <div className="flex items-center gap-2 rounded-2xl border border-dashed border-line px-4 py-8 text-sm text-ink-faint">
                  <CalendarDays className="size-4" />
                  Pick a day to see available times.
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {slotGroups.map((group) => (
                    <div key={group.label}>
                      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint">
                        <group.icon className="size-3.5" />
                        {group.label}
                      </p>
                      <div className="no-scrollbar -mx-1 mt-2.5 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
                        {group.slots.map((min) => {
                          const active = timeMin === min;
                          return (
                            <button
                              key={min}
                              type="button"
                              onClick={() => setTimeMin(min)}
                              aria-pressed={active}
                              className={`option-tile h-11 shrink-0 snap-start rounded-xl border px-4 text-sm font-semibold ${
                                active
                                  ? "border-brand-deep bg-brand-deep text-white"
                                  : "border-line bg-white text-ink hover:border-brand/60"
                              }`}
                            >
                              {formatTime(min)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* STEP 2 — details */}
        {step === 2 ? (
          <div className="step-panel" key="step-details">
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-2xl font-medium text-ink outline-none"
            >
              Where can we reach you?
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              We&apos;ll text or call to confirm your appointment.
            </p>

            {/* Editable summary */}
            <div className="mt-5 flex flex-wrap gap-2">
              <SummaryChip
                label={selectedVisit?.label ?? "Visit"}
                onEdit={() => setStep(0)}
              />
              <SummaryChip
                label={
                  selectedDay && timeMin != null
                    ? `${dayLabel(selectedDay)} · ${formatTime(timeMin)}`
                    : "Date & time"
                }
                onEdit={() => setStep(1)}
              />
            </div>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Your name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={setName}
                  error={state.errors.name}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={setPhone}
                  error={state.errors.phone}
                />
              </div>
              <TextField
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                optional
                value={email}
                onChange={setEmail}
                error={state.errors.email}
              />
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-ink">
                  Anything we should know?{" "}
                  <span className="font-normal text-ink-faint">(optional)</span>
                </span>
                <textarea
                  name="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="A specific tooth, insurance questions, dental anxiety…"
                  className="resize-none rounded-xl border border-line bg-white px-3.5 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-ink-faint focus:border-brand-deep"
                />
              </label>
            </div>

            {/* Honeypot */}
            <div aria-hidden="true" className="absolute left-[-9999px]">
              <label>
                Company
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

          </div>
        ) : null}

        {/* Submission errors — container stays mounted so screen readers
            announce content swapped into it */}
        <div aria-live="polite">
          {step === 2 && state.message && !state.ok ? (
            <p className="mt-4 rounded-xl border border-ember/40 bg-ember-tint px-4 py-3 text-sm font-medium text-ember-deep">
              {state.message}
            </p>
          ) : null}
        </div>

        {/* Footer nav */}
        <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn btn-outline shrink-0"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
          ) : (
            <span className="shrink-0 text-xs text-ink-faint">
              Takes about a minute
            </span>
          )}

          {step === 0 ? (
            <button
              type="button"
              disabled={!visitId}
              onClick={() => setStep(1)}
              className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <ArrowRight className="size-4" />
            </button>
          ) : null}

          {step === 1 ? (
            <button
              type="button"
              disabled={!dateIso || timeMin == null}
              onClick={() => setStep(2)}
              className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <ArrowRight className="size-4" />
            </button>
          ) : null}

          {step === 2 ? (
            <button
              type="submit"
              disabled={!canSubmit}
              className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  Request appointment
                </>
              )}
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function SummaryRow({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="size-4 shrink-0 text-brand-deep" />
      <span className="font-medium text-ink">{label}</span>
    </div>
  );
}

function SummaryChip({ label, onEdit }: { label: string; onEdit: () => void }) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-3.5 pr-2.5 text-sm font-medium text-ink transition hover:border-brand/60"
    >
      {label}
      <span className="grid size-5 place-items-center rounded-full bg-wash text-ink-faint">
        <Pencil className="size-3" />
      </span>
    </button>
  );
}

type TextFieldProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  optional?: boolean;
  required?: boolean;
  error?: string;
};

function TextField({
  label,
  name,
  type,
  value,
  onChange,
  autoComplete,
  optional,
  required,
  error,
}: TextFieldProps) {
  const errorId = `${name}-error`;
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-ink">
        {label}
        {optional ? (
          <span className="font-normal text-ink-faint"> (optional)</span>
        ) : null}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required ? true : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-12 rounded-xl border bg-white px-3.5 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-brand-deep ${
          error ? "border-ember" : "border-line"
        }`}
      />
      {/* Always-mounted live region — error text is swapped in */}
      <span aria-live="polite">
        {error ? (
          <span
            id={errorId}
            className="text-xs font-medium text-ember-deep"
          >
            {error}
          </span>
        ) : null}
      </span>
    </label>
  );
}
