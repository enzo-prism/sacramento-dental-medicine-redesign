import Image from "next/image";
import { CalendarDays, Check, MapPin, MessageCircle, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { contact, heroTrust, imagery, socialProof } from "@/data/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88svh] items-end overflow-hidden pt-28 text-white"
    >
      <div className="hero-art absolute inset-0">
        <Image
          src={imagery.hero}
          alt="Soft abstract painting in navy, teal, ivory, and gold evoking calm modern care"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 sm:pb-20 lg:px-10 lg:pb-24">
        <ScrollReveal className="max-w-3xl">
          <a
            href={socialProof.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/22 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white/88 backdrop-blur-md transition hover:bg-white/16"
          >
            <MapPin className="size-4 text-[var(--gold-bright)]" />
            <span>Antelope, CA</span>
            <span className="h-3 w-px bg-white/25" />
            <MessageCircle className="size-3.5 text-[var(--gold-bright)]" />
            <span>{socialProof.label}</span>
          </a>

          <h1 className="mt-6 font-display text-[clamp(2.8rem,7.2vw,5.4rem)] font-medium leading-[0.97] tracking-[-0.025em] text-balance">
            Calm, modern dentistry
            <span className="block italic text-[var(--gold-bright)]">
              for the whole family.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-white/88 md:text-lg md:leading-8">
            {contact.tagline}. Comfort-first technology, honest answers, and a
            team that treats anxious patients like old friends.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={contact.bookingHref} className="btn btn-primary h-12 px-5 text-base">
              <CalendarDays className="size-5" />
              Schedule today
            </a>
            <a
              href={contact.phoneHref}
              className="btn btn-ghost-light h-12 px-5 text-base"
            >
              <Phone className="size-5" />
              {contact.phoneDisplay}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5">
            {heroTrust.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/82"
              >
                <Check className="size-4 text-[var(--gold-bright)]" />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
