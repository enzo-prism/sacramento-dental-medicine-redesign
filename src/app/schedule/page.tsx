import { JsonLd } from "@/components/JsonLd";
import { pageGraph } from "@/lib/structured-data";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { BookingLink } from "@/components/BookingLink";
import { Header } from "@/components/Header";
import { ScheduleRouteStart } from "@/components/ScheduleRouteStart";
import { Footer } from "@/components/sections/Footer";
import { contact, hours, officePhotos } from "@/data/site";
import { OfficeEmail } from "@/components/OfficeEmail";

export const metadata: Metadata = {
  title: {
    absolute: "Schedule a Dentist Appointment | Sacramento Dental Medicine",
  },
  description:
    "Book a dentist appointment online with Sacramento Dental Medicine in Antelope, or call (916) 727-6453.",
  alternates: { canonical: "/schedule" },
  openGraph: {
    title: "Schedule with Sacramento Dental Medicine",
    description:
      "Book a dental visit online, or call the office to find a time that works.",
    type: "website",
    locale: "en_US",
    url: "/schedule",
    siteName: contact.practiceName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule with Sacramento Dental Medicine",
    description:
      "Book a dental visit online, or call the office to find a time that works.",
  },
};

export default function SchedulePage() {
  return (
    <>
      <JsonLd data={pageGraph("/schedule", "Book a dental appointment", [], "ContactPage")} />
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
                <p className="eyebrow text-[#d5e1f4]">Book an appointment</p>
                <h1 className="mt-5 max-w-2xl font-display text-balance text-[clamp(2.45rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
                  Let&apos;s find a visit that works.
                </h1>
                <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-white/70 md:text-lg md:leading-8">
                  Book online with the practice scheduler, or call the front desk.
                  For pain or an injury, calling is the fastest way to ask about
                  the earliest available visit.
                </p>
              </div>

              <div className="min-w-0 lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <div className="surface-night-card p-6 md:p-8">
                  <p className="font-display text-2xl font-medium text-white">
                    Book your visit online.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Opens the Sacramento Dental Medicine scheduler in a new tab.
                  </p>
                  <BookingLink className="btn btn-primary mt-6 h-12 w-full px-5 text-base">
                    <CalendarDays className="size-5" aria-hidden="true" />
                    Book online
                  </BookingLink>
                  <a
                    href={contact.phoneHref}
                    className="btn btn-ghost-light mt-3 h-12 w-full px-5 text-base"
                  >
                    <Phone className="size-5" aria-hidden="true" />
                    {contact.phoneDisplay}
                  </a>
                </div>

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

              <section className="surface-night-card flex flex-col overflow-hidden p-0" aria-labelledby="schedule-office-title">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={officePhotos[0].src}
                    alt={officePhotos[0].alt}
                    fill
                    sizes="(min-width: 768px) 22rem, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col p-6">
                  <h2 id="schedule-office-title" className="flex items-center gap-2 font-display text-xl font-medium text-white">
                    <MapPin className="size-5 text-[#d5e1f4]" aria-hidden="true" />
                    The office
                  </h2>
                  <address className="mt-5 not-italic font-display text-xl font-medium leading-snug text-white">
                    {contact.addressLine1}<br />
                    {contact.addressLine2}
                  </address>
                  <a href={contact.emailHref} className="btn-text-light mt-4">
                    <Mail className="size-4 shrink-0" aria-hidden="true" />
                    <OfficeEmail />
                  </a>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
                    Convenient to Antelope, Sacramento, Roseville, North Highlands,
                    and Citrus Heights.
                  </p>
                  <a href={contact.mapsHref} className="btn-text-light mt-4">
                    <Navigation className="size-4" aria-hidden="true" />
                    Open in Maps
                  </a>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
