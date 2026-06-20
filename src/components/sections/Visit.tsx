import { ArrowRight, Clock3, MapPin, Navigation, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Scheduler } from "@/components/Scheduler";
import { FAQ } from "@/components/sections/FAQ";
import { contact, hours } from "@/data/site";

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${contact.addressLine1}, ${contact.addressLine2}`,
)}&output=embed`;

const visitActions = [
  {
    icon: MapPin,
    title: "Visit",
    body: `${contact.addressLine1}, ${contact.addressLine2}`,
    href: contact.mapsHref,
    label: "Open in Maps",
  },
  {
    icon: Phone,
    title: "Call",
    body: contact.phoneDisplay,
    href: contact.phoneHref,
    label: "Call the office",
  },
];

export function Visit() {
  return (
    <section id="visit" className="section bg-paper-2/60">
      <div className="container-x">
        <SectionLabel
          eyebrow="Schedule a visit"
          accent="teal"
          title="Book your visit in about a minute."
          intro="Choose what you need, pick a time that works, and we'll confirm. Prefer to talk? Call or stop by — the office is an easy drive from Sacramento, Roseville, and Citrus Heights."
          align="center"
          className="mx-auto text-center"
        />

        {/* Scheduler — the primary conversion path */}
        <ScrollReveal delay={60} variant="fade" className="mt-12">
          <Scheduler />
        </ScrollReveal>

        {/* Contact, hours, and a real map */}
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
          <ScrollReveal variant="slide-right" className="flex flex-col gap-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {visitActions.map((action) => (
                <a
                  key={action.title}
                  href={action.href}
                  className="group rounded-2xl border border-rule bg-white p-5 transition hover:border-teal/40 hover:bg-mist/40"
                >
                  <span className="icon-orb grid size-11 place-items-center rounded-xl orb-teal">
                    <action.icon className="size-5" />
                  </span>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint">
                    {action.title}
                  </p>
                  <p className="mt-1 font-display text-base font-medium text-ink">
                    {action.body}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                    {action.label}
                    <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-rule">
              <div className="flex items-center gap-2 bg-ink px-4 py-2.5 text-white">
                <Clock3 className="size-4 text-[var(--gold-bright)]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Office hours
                </span>
              </div>
              <ul>
                {hours.map((row) => (
                  <li
                    key={row.day}
                    className="flex items-center justify-between border-b border-rule bg-white px-4 py-3 text-sm last:border-b-0"
                  >
                    <span className="font-semibold text-ink">{row.day}</span>
                    <span className="text-ink-soft">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a href={contact.mapsHref} className="btn btn-outline w-full">
              <Navigation className="size-4" />
              Get directions
            </a>
          </ScrollReveal>

          <ScrollReveal delay={100} variant="slide-left" className="map-frame">
            <iframe
              src={mapEmbedSrc}
              title={`Map to ${contact.practiceName}, ${contact.addressLine1}, ${contact.addressLine2}`}
              className="h-[360px] w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </ScrollReveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ScrollReveal>
            <span className="eyebrow accent-coral">Good to know</span>
            <h3 className="mt-5 font-display text-balance text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-tight text-ink">
              Common questions, answered.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft">
              New patient? Start here. If your question isn&apos;t covered, the
              front desk is happy to help.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100} variant="fade">
            <FAQ />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
