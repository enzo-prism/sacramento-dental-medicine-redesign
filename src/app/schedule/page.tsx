import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Scheduler } from "@/components/Scheduler";
import { ScheduleRouteStart } from "@/components/ScheduleRouteStart";
import { Footer } from "@/components/sections/Footer";
import { contact, hours } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: "Schedule a Dentist Appointment | Sacramento Dental Medicine",
  },
  description:
    "Request an appointment with Sacramento Dental Medicine in Antelope. Choose a visit type and preferred time, then provide a phone number or email.",
  alternates: { canonical: "/schedule" },
  openGraph: {
    title: "Schedule with Sacramento Dental Medicine",
    description:
      "Request a dental visit in about a minute. Choose your preferred day and time, and the front desk will confirm the details.",
    type: "website",
    locale: "en_US",
    url: "/schedule",
    siteName: contact.practiceName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule with Sacramento Dental Medicine",
    description:
      "Request a dental visit in about a minute. The front desk will confirm the details.",
  },
};

const assurances = [
  {
    icon: Clock3,
    title: "About a minute",
    body: "Three short steps, with no account to create.",
  },
  {
    icon: ShieldCheck,
    title: "One contact method",
    body: "Enter a phone number or an email. You do not need both.",
  },
  {
    icon: CheckCircle2,
    title: "Confirmed by a person",
    body: "The front desk will contact you to confirm the exact time.",
  },
];

export default function SchedulePage() {
  return (
    <>
      <ScheduleRouteStart />
      <Header />
      <main id="main" className="flex-1">
        <section className="night-band relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
          <div aria-hidden="true" className="absolute -right-36 top-8 size-[34rem] rounded-full bg-brand/10 blur-3xl" />
          <div className="container-x relative">
            <Link href="/" className="btn-text-light">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to the website
            </Link>

            <div className="mt-7 grid gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-x-14 lg:gap-y-8 xl:gap-x-20">
              <div className="min-w-0 lg:col-start-1 lg:row-start-1">
                <p className="eyebrow text-[#d5e1f4]">Request an appointment</p>
                <h1 className="mt-5 max-w-2xl font-display text-balance text-[clamp(2.45rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
                  Let&apos;s find a visit that works.
                </h1>
                <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-white/70 md:text-lg md:leading-8">
                  Tell us what you need and when you&apos;d like to come in. This
                  is a request, not a confirmed appointment; the front desk will
                  follow up during office hours.
                </p>

              </div>

              <div className="min-w-0 lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <Scheduler />
              </div>

              <div className="min-w-0 lg:col-start-1 lg:row-start-2">
                <ul className="grid gap-3" aria-label="What to expect">
                  {assurances.map((item) => (
                    <li key={item.title} className="surface-night-card flex gap-3.5 p-4">
                      <span className="orb-night grid size-10 shrink-0 place-items-center rounded-xl">
                        <item.icon className="size-4.5" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-display text-base font-medium text-white">
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-sm leading-6 text-white/62">
                          {item.body}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-[20px] border border-ember/35 bg-ember/10 p-5">
                  <p className="font-display text-lg font-medium text-white">
                    In pain or dealing with a dental emergency?
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    Calling is the fastest way to reach the team and ask about
                    the earliest available visit.
                  </p>
                  <a href={contact.phoneHref} className="btn btn-ember mt-4 h-11 px-4">
                    <Phone className="size-4" aria-hidden="true" />
                    Call {contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-5 border-t border-white/10 pt-10 lg:mt-20 lg:grid-cols-2 lg:gap-8">
              <section className="surface-night-card p-6" aria-labelledby="schedule-hours-title">
                <h2 id="schedule-hours-title" className="flex items-center gap-2 font-display text-xl font-medium text-white">
                  <Clock3 className="size-5 text-[#d5e1f4]" aria-hidden="true" />
                  Office hours
                </h2>
                <ul className="mt-5 grid gap-2 text-sm text-white/70 sm:grid-cols-2 sm:gap-x-8">
                  {hours.map((row) => (
                    <li key={row.day} className="flex justify-between gap-4 border-b border-white/10 py-2.5">
                      <span className="font-medium text-white">{row.day}</span>
                      <span>{row.time}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="surface-night-card flex flex-col p-6" aria-labelledby="schedule-office-title">
                <h2 id="schedule-office-title" className="flex items-center gap-2 font-display text-xl font-medium text-white">
                  <MapPin className="size-5 text-[#d5e1f4]" aria-hidden="true" />
                  The office
                </h2>
                <address className="mt-5 not-italic font-display text-xl font-medium leading-snug text-white">
                  {contact.addressLine1}<br />
                  {contact.addressLine2}
                </address>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
                  Convenient to Antelope, Sacramento, Roseville, North Highlands,
                  and Citrus Heights.
                </p>
                <a href={contact.mapsHref} className="btn-text-light mt-4">
                  <Navigation className="size-4" aria-hidden="true" />
                  Open in Maps
                </a>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
