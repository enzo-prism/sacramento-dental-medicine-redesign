import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { contact, imagery, philosophy } from "@/data/site";

export function Intro() {
  return (
    <section className="section">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <ScrollReveal
          variant="slide-right"
          className="image-panel image-frame relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
        >
          <Image
            src={imagery.care}
            alt="Soft abstract painting in sage, ivory, and teal — calm modern care"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-ink/70 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
            Sacramento Dental Medicine · Antelope
          </figcaption>
        </ScrollReveal>

        <div>
          <ScrollReveal>
            <span className="eyebrow accent-teal">Why this practice</span>
            <h2 className="mt-5 max-w-xl font-display text-balance text-[clamp(1.9rem,4vw,2.9rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
              Dentistry that feels less like a transaction, more like care.
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
              We built Sacramento Dental Medicine around a simple idea: people
              deserve clear answers, gentle hands, and modern tools — without the
              rush. From the first call to the follow-up plan, the details stay
              easy to understand.
            </p>
          </ScrollReveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {philosophy.points.map((point, index) => (
              <ScrollReveal
                key={point.title}
                delay={index * 90}
                variant="fade"
                className="surface-card lift h-full p-5"
              >
                <span className="icon-orb grid size-11 place-items-center rounded-xl orb-teal">
                  <point.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{point.body}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120} className="mt-8 flex flex-wrap items-center gap-4">
            <a href={contact.bookingHref} className="btn btn-ink px-5">
              Become a patient
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#doctors"
              className="text-sm font-semibold text-ink underline-offset-4 hover:underline"
            >
              Meet the doctors
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
