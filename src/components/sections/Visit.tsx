import { ArrowRight, Clock3, MapPin, Navigation, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Scheduler } from "@/components/Scheduler";
import { FAQ } from "@/components/sections/FAQ";
import { contact, hours } from "@/data/site";

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${contact.addressLine1}, ${contact.addressLine2}`,
)}&output=embed`;

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
          <h2 className="font-display text-balance text-[2rem] font-medium leading-[1.04] tracking-[-0.02em] text-white sm:text-4xl md:text-[2.9rem]">
            Book your visit in about a minute.
          </h2>
          <p className="max-w-2xl text-balance text-base leading-7 text-white/70 md:text-lg md:leading-8">
            Choose what you need, pick a time that works, and we&apos;ll
            confirm. Prefer to talk? Call or stop by — the office is an easy
            drive from Sacramento, Roseville, and Citrus Heights.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
          {/* Scheduler — the conversion moment, white card on the dark band */}
          <ScrollReveal
            delay={60}
            variant="slide-left"
            className="min-w-0 lg:order-2"
          >
            <Scheduler />
          </ScrollReveal>

          {/* Hours, address, phone, and a real map */}
          <ScrollReveal
            variant="slide-right"
            className="flex min-w-0 flex-col gap-9 lg:order-1"
          >
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

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                  <MapPin className="size-4 text-brand" />
                  Address
                </p>
                <address className="mt-3 not-italic text-sm leading-6 text-white/80">
                  {contact.addressLine1}
                  <br />
                  {contact.addressLine2}
                </address>
                <a
                  href={contact.mapsHref}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-white"
                >
                  <Navigation className="size-4" />
                  Open in Maps
                  <ArrowRight className="size-3.5" />
                </a>
              </div>

              <div>
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                  <Phone className="size-4 text-brand" />
                  Call
                </p>
                <a
                  href={contact.phoneHref}
                  className="mt-3 inline-block font-display text-xl font-medium text-white transition hover:text-brand"
                >
                  {contact.phoneDisplay}
                </a>
                <p className="mt-1 text-sm leading-6 text-white/65">
                  Call the office
                </p>
              </div>
            </div>

            <div className="map-frame h-[360px] lg:h-[420px]">
              <iframe
                src={mapEmbedSrc}
                title={`Map to ${contact.practiceName}, ${contact.addressLine1}, ${contact.addressLine2}`}
                className="h-[360px] w-full lg:h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* FAQ — nested in the section, lifted onto a light surface */}
        <ScrollReveal delay={80} variant="fade" className="mt-14 md:mt-20">
          <div className="surface-card p-6 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
              <div className="flex flex-col">
                <span className="eyebrow accent-brand">Good to know</span>
                <h3 className="mt-5 font-display text-balance text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-tight text-ink">
                  Common questions, answered.
                </h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft">
                  New patient? Start here. If your question isn&apos;t covered,
                  the front desk is happy to help.
                </p>
                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <a
                    href={contact.phoneHref}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-brand-deep transition hover:border-brand/60"
                  >
                    <Phone className="size-4" />
                    Front desk: {contact.phoneDisplay}
                  </a>
                </div>
              </div>
              <FAQ />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
