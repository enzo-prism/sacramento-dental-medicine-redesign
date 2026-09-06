import Image from "next/image";
import { CalendarDays, MapPin, Phone } from "lucide-react";
import { contact, imagery } from "@/data/site";

export function Hero() {
  return (
    <section
      id="top"
      data-mobile-cta-stop
      className="relative overflow-hidden pt-32 lg:pt-40"
    >
      <div className="container-x relative grid items-center gap-12 pb-16 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24">
        <div className="relative z-10 max-w-3xl">
          <p className="flex items-center gap-2 text-sm font-medium text-ink-faint">
            <MapPin className="size-4 shrink-0 text-brand-deep" aria-hidden="true" />
            Sacramento Dental Medicine · Antelope, CA
          </p>

          <h1 className="mt-5 font-display text-[clamp(1.85rem,8vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink text-balance lg:text-[clamp(2.6rem,4.4vw,3.6rem)]">
            A dentist visit{" "}
            <span className="block text-brand-deep">you won&apos;t dread.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
            {contact.tagline}. The team works gently, explains everything in
            plain English, and takes special care of people who haven&apos;t
            seen a dentist in years.
          </p>

          <div
            data-mobile-cta-stop
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
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
        </div>

        <div className="absolute inset-x-0 -top-32 h-72 lg:relative lg:inset-auto lg:col-start-2 lg:row-start-1 lg:h-auto">
          <div
            aria-hidden="true"
            className="absolute -inset-6 hidden rounded-[32px] bg-brand-tint/50 blur-2xl lg:block"
          />
          <div className="relative h-full w-full lg:aspect-[4/3] lg:overflow-hidden lg:rounded-[22px] lg:shadow-xl">
            <Image
              src={imagery.hero}
              alt="Sunlit contemporary treatment room — atmospheric photography, not the Elverta Road office"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1280px) 544px, (min-width: 1024px) calc(47.5vw - 65px), 100vw"
              className="object-cover object-center opacity-30 lg:opacity-100"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-canvas/20 via-canvas/80 to-canvas lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
