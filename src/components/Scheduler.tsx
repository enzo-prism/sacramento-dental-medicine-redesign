"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
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
  visitTypes,
} from "@/data/site";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

type DayOption = {
  iso: string;
  wd: number;
  weekday: string;
  dayNum: number;
  month: string;
  relative: string;
};

type DayPart = {
  id: "morning" | "afternoon" | "evening";
  label: string;
  rangeLabel: string;
  icon: LucideIcon;
};

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

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length === 0) return "";
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

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

function buildParts(wd: number): DayPart[] {
  const h = officeHours[wd];
  if (!h) return [];
  const parts: DayPart[] = [];
  const morningEnd = Math.min(h.close, 12 * 60);
  if (h.open < 12 * 60 && morningEnd > h.open) {
    parts.push({
      id: "morning",
      label: "Morning",
      rangeLabel: `${formatTime(h.open)} – ${formatTime(morningEnd)}`,
      icon: Sunrise,
    });
  }
  const afternoonStart = Math.max(h.open, 12 * 60);
  const afternoonEnd = Math.min(h.close, 17 * 60);
  if (afternoonEnd > afternoonStart) {
    parts.push({
      id: "afternoon",
      label: "Afternoon",
      rangeLabel: `${formatTime(afternoonStart)} – ${formatTime(afternoonEnd)}`,
      icon: Sun,
    });
  }
  const eveningStart = Math.max(h.open, 17 * 60);
  if (h.close > eveningStart) {
    parts.push({
      id: "evening",
      label: "Evening",
      rangeLabel: `${formatTime(eveningStart)} – ${formatTime(h.close)}`,
      icon: Sunset,
    });
  }
  return parts;
}

function dayLabel(day: DayOption) {
  return `${day.weekday}, ${day.month} ${day.dayNum}`;
}

export function Scheduler() {
  const [formKey, setFormKey] = useState(0);
  return (
    <SchedulerForm key={formKey} onReset={() => setFormKey((k) => k + 1)} />
  );
}

function SchedulerForm({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(
    requestAppointment,
    initialAppointmentState,
  );

  const [step, setStep] = useState(0);
  const [visitId, setVisitId] = useState<string | null>(null);
  const [days, setDays] = useState<DayOption[]>([]);
  const [dateIso, setDateIso] = useState<string | null>(null);
  const [partId, setPartId] = useState<DayPart["id"] | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setDays(buildDays(8)));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const selectedVisit = visitTypes.find((v) => v.id === visitId) ?? null;
  const selectedDay = days.find((d) => d.iso === dateIso) ?? null;
  const parts = selectedDay ? buildParts(selectedDay.wd) : [];
  const selectedPart = parts.find((p) => p.id === partId) ?? null;

  const earliestDay = days[0] ?? null;
  const earliestPart = earliestDay ? buildParts(earliestDay.wd)[0] ?? null : null;

  const phoneDigits = phone.replace(/\D/g, "").length;
  const canSubmit = name.trim().length > 1 && phoneDigits >= 10 && !pending;

  function chooseVisit(id: string, urgent?: boolean) {
    setVisitId(id);
    if (!urgent) setStep(1);
  }

  function pickEarliest() {
    if (!earliestDay || !earliestPart) return;
    setDateIso(earliestDay.iso);
    setPartId(earliestPart.id);
    setStep(2);
  }

  function pickPart(id: DayPart["id"]) {
    setPartId(id);
    setStep(2);
  }

  if (state.ok) {
    return (
      <div className="scheduler-card mx-auto flex max-w-xl flex-col items-center gap-5 p-7 text-center md:p-10">
        <span className="grid size-14 place-items-center rounded-full orb-brand">
          <CircleCheck className="size-7" strokeWidth={1.75} />
        </span>
        <h3 className="font-display text-2xl font-medium text-ink md:text-3xl">
          Request sent
        </h3>
        {selectedVisit && selectedDay && selectedPart ? (
          <div className="surface-wash w-full p-4 text-left">
            <SummaryRow icon={selectedVisit.icon} label={selectedVisit.label} />
            <div className="my-3 hairline" />
            <SummaryRow icon={CalendarDays} label={dayLabel(selectedDay)} />
            <div className="my-3 hairline" />
            <SummaryRow
              icon={Clock}
              label={`${selectedPart.label} · ${selectedPart.rangeLabel}`}
            />
          </div>
        ) : null}
        <p className="max-w-md text-pretty text-sm leading-7 text-ink-soft">
          {state.message}
        </p>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
          <a href={contact.phoneHref} className="btn btn-outline">
            <Phone className="size-4" />
            Call {contact.phoneDisplay}
          </a>
          <button type="button" onClick={onReset} className="btn-text justify-center">
            Request another visit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="scheduler-card mx-auto w-full min-w-0 max-w-xl">
      <div className="flex items-center gap-3 border-b border-line px-5 py-3.5 md:px-6">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink transition hover:border-brand-deep hover:text-brand-deep"
            aria-label="Back"
          >
            <ArrowLeft className="size-4" />
          </button>
        ) : (
          <span className="size-11 shrink-0" aria-hidden />
        )}
        <p className="sr-only" aria-live="polite">
          Step {step + 1} of 3
        </p>
        <ol className="flex flex-1 items-center justify-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step
                  ? "w-7 bg-brand-deep"
                  : i < step
                    ? "w-1.5 bg-brand-deep"
                    : "w-1.5 bg-line"
              }`}
            />
          ))}
        </ol>
        <span className="size-11 shrink-0" aria-hidden />
      </div>

      <form action={formAction} className="relative">
        <input type="hidden" name="visitType" value={selectedVisit?.label ?? ""} />
        <input type="hidden" name="date" value={dateIso ?? ""} />
        <input
          type="hidden"
          name="dateLabel"
          value={selectedDay ? dayLabel(selectedDay) : ""}
        />
        <input
          type="hidden"
          name="time"
          value={
            selectedPart
              ? `${selectedPart.label} (${selectedPart.rangeLabel})`
              : ""
          }
        />

        <div className="px-5 pb-5 pt-6 md:px-6 md:pb-6">
          {step === 0 ? (
            <div className="step-panel" key="step-visit">
              <h3
                ref={headingRef}
                tabIndex={-1}
                className="font-display text-[1.65rem] font-medium leading-tight text-ink outline-none md:text-2xl"
              >
                What do you need?
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                One tap. You can add details at the end.
              </p>

              <div
                role="group"
                aria-label="Visit type"
                className="mt-5 grid gap-2.5"
              >
                {visitTypes.map((v) => {
                  const active = visitId === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => chooseVisit(v.id, v.urgent)}
                      className={`option-tile flex min-h-16 items-center gap-3.5 rounded-2xl border px-3.5 py-3.5 text-left sm:min-h-[4.25rem] ${
                        active
                          ? "border-brand-deep bg-wash ring-1 ring-brand-deep"
                          : "border-line bg-white hover:border-brand/60"
                      }`}
                    >
                      <span
                        className={`grid size-12 shrink-0 place-items-center rounded-2xl ${
                          v.urgent ? "orb-ember" : "orb-brand"
                        }`}
                      >
                        <v.icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-base font-medium text-ink">
                          {v.label}
                        </span>
                        <span className="block text-sm leading-5 text-ink-soft">
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
                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-ember/30 bg-ember-tint p-4">
                  <p className="text-sm font-medium leading-6 text-ember-deep">
                    Calling is the fastest way in. We&apos;ll do everything we
                    can to see you today.
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <a href={contact.phoneHref} className="btn btn-ember h-12 flex-1">
                      <Phone className="size-4" />
                      Call now
                    </a>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn btn-outline h-12 flex-1 border-ember/30 text-ember-deep"
                    >
                      Request a time instead
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {step === 1 ? (
            <div className="step-panel" key="step-time">
              <h3
                ref={headingRef}
                tabIndex={-1}
                className="font-display text-[1.65rem] font-medium leading-tight text-ink outline-none md:text-2xl"
              >
                When works?
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                Pick a window. We&apos;ll confirm a specific time by phone.
              </p>

              {earliestDay && earliestPart ? (
                <button
                  type="button"
                  onClick={pickEarliest}
                  className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-brand/35 bg-wash px-4 text-sm font-semibold text-brand-ink transition hover:bg-wash-2"
                >
                  <Zap className="size-4" strokeWidth={1.75} />
                  Soonest: {earliestDay.relative || earliestDay.weekday}{" "}
                  {earliestPart.label.toLowerCase()}
                </button>
              ) : null}

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
                            setPartId(null);
                          }}
                          aria-pressed={active}
                          className={`option-tile flex h-[4.75rem] w-[4.35rem] shrink-0 snap-start flex-col items-center justify-center gap-0.5 rounded-2xl border ${
                            active
                              ? "border-brand-deep bg-brand-deep text-white"
                              : "border-line bg-white text-ink hover:border-brand/60"
                          }`}
                        >
                          <span
                            className={`text-[11px] font-bold uppercase tracking-wide ${
                              active ? "text-white/90" : "text-ink-faint"
                            }`}
                          >
                            {d.relative || d.weekday}
                          </span>
                          <span className="font-display text-[1.35rem] font-medium leading-none">
                            {d.dayNum}
                          </span>
                          <span
                            className={`text-[11px] font-semibold ${
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

              <div className="mt-5 min-h-[5.5rem]">
                {!selectedDay ? (
                  <div className="flex min-h-[5.5rem] items-center justify-center gap-2 rounded-2xl border border-dashed border-line px-4 text-sm text-ink-faint">
                    <CalendarDays className="size-4" />
                    Pick a day
                  </div>
                ) : (
                  <div
                    role="group"
                    aria-label="Time of day"
                    className="grid grid-cols-3 gap-2"
                  >
                    {parts.map((part) => {
                      const active = partId === part.id;
                      return (
                        <button
                          key={part.id}
                          type="button"
                          onClick={() => pickPart(part.id)}
                          aria-pressed={active}
                          className={`option-tile flex min-h-[5.5rem] flex-col items-center justify-center gap-1 rounded-2xl border px-1.5 text-center ${
                            active
                              ? "border-brand-deep bg-brand-deep text-white"
                              : "border-line bg-white text-ink hover:border-brand/60"
                          }`}
                        >
                          <part.icon
                            className={`size-5 ${active ? "text-white" : "text-brand-ink"}`}
                            strokeWidth={1.75}
                          />
                          <span className="font-display text-sm font-medium leading-tight">
                            {part.label}
                          </span>
                          <span
                            className={`text-[10px] leading-tight sm:text-[11px] ${
                              active ? "text-white/85" : "text-ink-soft"
                            }`}
                          >
                            {part.rangeLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="step-panel" key="step-details">
              <h3
                ref={headingRef}
                tabIndex={-1}
                className="font-display text-[1.65rem] font-medium leading-tight text-ink outline-none md:text-2xl"
              >
                How can we reach you?
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                Name and phone. We&apos;ll confirm by call or text.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <SummaryChip
                  label={selectedVisit?.label ?? "Visit"}
                  onEdit={() => setStep(0)}
                />
                <SummaryChip
                  label={
                    selectedDay && selectedPart
                      ? `${selectedDay.weekday} ${selectedDay.dayNum} · ${selectedPart.label}`
                      : "When"
                  }
                  onEdit={() => setStep(1)}
                />
              </div>

              <div className="mt-5 grid gap-3">
                <TextField
                  label="Your name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  required
                  value={name}
                  onChange={setName}
                  error={state.errors.name}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  enterKeyHint="next"
                  required
                  value={phone}
                  onChange={(value) => setPhone(formatPhone(value))}
                  error={state.errors.phone}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  inputMode="email"
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
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="A tooth that hurts, insurance questions, dental anxiety…"
                    className="resize-none rounded-2xl border border-line bg-white px-3.5 py-3 text-base leading-6 text-ink outline-none transition placeholder:text-ink-faint focus:border-brand-deep md:text-sm"
                  />
                </label>
              </div>

              <p className="sr-only" aria-hidden="true">
                <label>
                  Company
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
            </div>
          ) : null}

          <div aria-live="polite">
            {step === 2 && state.message && !state.ok ? (
              <p className="mt-4 rounded-2xl border border-ember/40 bg-ember-tint px-4 py-3 text-sm font-medium text-ember-deep">
                {state.message}
              </p>
            ) : null}
          </div>
        </div>

        {step === 2 ? (
          <div className="scheduler-sticky">
            <button
              type="submit"
              disabled={!canSubmit}
              className="btn btn-primary h-12 w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  Request this visit
                </>
              )}
            </button>
            <p className="mt-2 text-center text-xs leading-5 text-ink-faint">
              We only use this to confirm your visit.
            </p>
          </div>
        ) : null}
      </form>
    </div>
  );
}

function SummaryRow({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="size-4 shrink-0 text-brand-deep" strokeWidth={1.75} />
      <span className="font-medium text-ink">{label}</span>
    </div>
  );
}

function SummaryChip({ label, onEdit }: { label: string; onEdit: () => void }) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white py-2 pl-3.5 pr-2.5 text-sm font-medium text-ink transition hover:border-brand/60"
    >
      {label}
      <span className="grid size-6 place-items-center rounded-full bg-wash text-ink-faint">
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
  autoCapitalize?: string;
  inputMode?: "text" | "tel" | "email";
  enterKeyHint?: "next" | "done";
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
  autoCapitalize,
  inputMode,
  enterKeyHint,
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
        inputMode={inputMode}
        enterKeyHint={enterKeyHint}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required ? true : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-12 rounded-2xl border bg-white px-3.5 text-base text-ink outline-none transition placeholder:text-ink-faint focus:border-brand-deep md:text-sm ${
          error ? "border-ember" : "border-line"
        }`}
      />
      <span aria-live="polite">
        {error ? (
          <span id={errorId} className="text-xs font-medium text-ember-deep">
            {error}
          </span>
        ) : null}
      </span>
    </label>
  );
}
