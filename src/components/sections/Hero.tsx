import Image from "next/image";
import { CalendarDays, Check, MapPin, MessageCircle, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { contact, heroTrust, imagery, socialProof } from "@/data/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 lg:pt-40">
      {/* Mobile-only: the abstract art as a quiet backdrop band fading into canvas */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-80 lg:hidden">
        <Image
          src={imagery.hero}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/30 via-canvas/75 to-canvas" />
      </div>

      <div className="container-x relative grid items-center gap-12 pb-16 sm:pb-20 lg:grid-cols-[1.05fr_0.85fr] lg:gap-16 lg:pb-24">
        <ScrollReveal className="max-w-3xl">
          <a
            href={socialProof.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-ink-soft backdrop-blur-md transition hover:border-brand-deep hover:text-brand-deep"
          >
            <MapPin className="size-4 text-brand-deep" />
            <span>Antelope, CA</span>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <MessageCircle className="size-3.5 text-brand-deep" />
            <span>{socialProof.label}</span>
          </a>

          <h1 className="mt-6 font-display text-[clamp(1.85rem,8vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink text-balance lg:text-[clamp(2.6rem,4.4vw,3.6rem)]">
            Calm, modern dentistry
            <span className="block text-brand-deep">for the whole family.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
            {contact.tagline}. Comfort-first technology, honest answers, and a
            team that treats anxious patients like old friends.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={contact.bookingHref} className="btn btn-primary h-12 px-5 text-base">
              <CalendarDays className="size-5" />
              Book online
            </a>
            <a
              href={contact.phoneHref}
              className="btn btn-outline h-12 px-5 text-base"
            >
              <Phone className="size-5" />
              {contact.phoneDisplay}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5">
            {heroTrust.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft"
              >
                <Check className="size-4 shrink-0 text-brand-deep" />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        {/* Desktop: the art as a soft rounded panel — white gallery, morning light */}
        <ScrollReveal
          variant="slide-left"
          delay={140}
          className="relative hidden lg:block"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[32px] bg-brand-tint/40 blur-2xl"
          />
          <div className="image-panel image-frame relative aspect-[4/5] max-h-[560px] w-full">
            <Image
              src={imagery.hero}
              alt="Soft abstract art in the practice's periwinkle blue, evoking calm, light-filled care"
              fill
              preload
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[62%_center]"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
