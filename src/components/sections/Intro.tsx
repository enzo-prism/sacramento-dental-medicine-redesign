import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { contact, imagery, philosophy } from "@/data/site";

export function Intro() {
  return (
    <section className="relative bg-canvas pt-[clamp(1.75rem,3.5vw,3.25rem)] pb-[clamp(4.5rem,9vw,8.5rem)]">
      <div className="container-x grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <ScrollReveal>
            <span className="eyebrow accent-brand">Why this practice</span>
            <h2 className="mt-6 max-w-xl font-display text-balance text-[clamp(2.1rem,4.4vw,3.3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
              Dentistry that feels less like a transaction,{" "}
              <span className="text-brand-deep">more like care.</span>
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
              We built Sacramento Dental Medicine around a simple idea: people
              deserve clear answers, gentle hands, and modern tools — without the
              rush. From the first call to the follow-up plan, the details stay
              easy to understand.
            </p>
          </ScrollReveal>

          <ScrollReveal
            delay={120}
            variant="slide-right"
            className="relative mt-10 hidden aspect-[16/7] max-w-xl overflow-hidden rounded-2xl border border-line lg:block"
          >
            <Image
              src={imagery.care}
              alt="Soft abstract art in the practice's periwinkle and powder blues"
              fill
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover object-top"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(106,142,206,0.18),transparent)]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-line ring-inset"
            />
          </ScrollReveal>

          <ScrollReveal delay={160} className="mt-10 flex flex-wrap items-center gap-5">
            <a href={contact.bookingHref} className="btn btn-primary px-5">
              Become a patient
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#doctors"
              className="text-sm font-semibold text-brand-deep underline-offset-4 hover:underline"
            >
              Meet the doctors
            </a>
          </ScrollReveal>
        </div>

        <div className="flex flex-col justify-center">
          {philosophy.points.map((point, index) => (
            <ScrollReveal
              key={point.title}
              delay={index * 110}
              variant="fade"
              className={index > 0 ? "border-t border-line" : ""}
            >
              <div
                className={`flex items-baseline gap-6 pb-8 lg:pb-9 ${
                  index > 0 ? "pt-8 lg:pt-9" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-semibold tracking-[0.08em] text-brand-deep"
                >
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-2.5 max-w-md text-pretty text-sm leading-7 text-ink-soft md:text-base">
                    {point.body}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
