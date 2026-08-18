import { Clock3, MapPin, Navigation, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Scheduler } from "@/components/Scheduler";
import { contact, hours } from "@/data/site";

export function Visit() {
  return (
    <section
      id="visit"
      className="night-band section pb-[clamp(2.25rem,4.5vw,4.25rem)]!"
    >
      <div className="container-x">
        <ScrollReveal
          variant="fade"
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
        >
          <span className="eyebrow text-brand">Schedule a visit</span>
          <h2 className="font-display text-balance text-[clamp(2rem,4.2vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-white">
            Book your visit in about a minute.
          </h2>
          <p className="max-w-2xl text-balance text-base leading-7 text-white/70 md:text-lg md:leading-8">
            Pick what you need and a time of day that works. The front desk will
            call or text to confirm a specific appointment. Prefer a human?
            Call, or just stop by.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12">
          <ScrollReveal
            delay={40}
            variant="fade"
            className="min-w-0 lg:order-2"
          >
            <Scheduler />
          </ScrollReveal>

          <div className="flex min-w-0 flex-col gap-9 lg:order-1">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                <Clock3 className="size-4 text-brand" />
                Office hours
              </p>
              <ul className="mt-4 border-t border-white/10">
                {hours.map((row) => (
                  <li
                    key={row.day}
                    className="flex items-center justify-between border-b border-white/10 py-3 text-sm"
                  >
                    <span className="font-medium text-white">{row.day}</span>
                    <span className="text-white/65">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="place-card p-6">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                <MapPin className="size-4 text-brand" />
                The office
              </p>
              <address className="mt-4 not-italic font-display text-xl font-medium leading-snug text-white">
                {contact.addressLine1}
                <br />
                {contact.addressLine2}
              </address>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
                An easy drive from Sacramento, Roseville, North Highlands, and
                Citrus Heights.
              </p>
              <a
                href={contact.phoneHref}
                className="mt-5 inline-block font-display text-lg font-medium text-white transition hover:text-brand"
              >
                <Phone className="mr-2 inline size-4" />
                {contact.phoneDisplay}
              </a>
              <p className="mt-1 text-sm text-white/55">
                Answered during office hours
              </p>
              <a
                href={contact.mapsHref}
                className="btn-text-light mt-5"
              >
                <Navigation className="size-4" />
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
