"use client";

import { Mail, Phone } from "lucide-react";
import { OfficeEmail } from "@/components/OfficeEmail";
import { contact } from "@/data/site";
import {
  type ScheduleContactKind,
  scheduleContactEventName,
} from "@/lib/analytics";
import { trackAllowedCustomEvent } from "@/lib/track-event";

function onScheduleContactClick(kind: ScheduleContactKind) {
  trackAllowedCustomEvent(scheduleContactEventName(kind));
}

export function ScheduleOfficeContacts() {
  return (
    <aside
      className="scheduler-card flex h-full min-w-0 flex-col justify-center gap-4 p-5 sm:p-6"
      aria-label="Call or email the office"
    >
      <p className="font-display text-xl font-medium text-ink">
        Rather talk with our front desk?
      </p>
      <p className="text-sm leading-6 text-ink-soft">
        Call or email us during weekday hours. We&apos;re happy to check your
        dental plan, answer questions, or find the soonest opening.
      </p>
      <a
        href={contact.phoneHref}
        data-schedule-contact="phone"
        className="btn btn-primary h-12 w-full px-4"
        onClick={() => onScheduleContactClick("phone")}
      >
        <Phone className="size-4" aria-hidden="true" />
        Call {contact.phoneDisplay}
      </a>
      <a
        href={contact.emailHref}
        data-schedule-contact="email"
        className="btn btn-outline h-12 w-full px-4"
        onClick={() => onScheduleContactClick("email")}
      >
        <Mail className="size-4 shrink-0" aria-hidden="true" />
        <OfficeEmail />
      </a>
    </aside>
  );
}
