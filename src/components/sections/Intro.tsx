import Image from "next/image";
import { contact, imagery, philosophy } from "@/data/site";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Intro() {
  return (
    <section className="relative bg-canvas pt-[clamp(1.75rem,3.5vw,3.25rem)] pb-[clamp(4.5rem,9vw,8.5rem)]">
      <div className="container-x grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <ScrollReveal>
            <span className="eyebrow accent-brand">Why this practice</span>
            <h2 className="mt-6 max-w-xl font-display text-balance text-[clamp(2.1rem,4.4vw,3.3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
              Made for people{" "}
              <span className="text-brand-deep">
                who&apos;ve been putting this off.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
              Sacramento Dental Medicine runs on a simple idea: clear answers,
              gentle hands, and enough time to do things right. You&apos;ll
              always know what we found and what happens next, before any
              treatment begins.
            </p>
          </ScrollReveal>

          <ScrollReveal
            delay={80}
            variant="fade"
            className="relative mt-10 hidden aspect-[4/3] max-w-xl overflow-hidden rounded-2xl border border-line lg:block"
          >
            <Image
              src={imagery.care}
              alt="Quiet waiting lounge in morning light — atmospheric photography, not the Elverta Road office"
              fill
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="object-cover object-center"
            />
          </ScrollReveal>

          <ScrollReveal delay={120} className="mt-10 flex flex-wrap items-center gap-6">
            <a href={contact.bookingHref} className="btn-text">
              Become a patient
            </a>
            <a href="#doctors" className="btn-text">
              Meet the doctors
            </a>
          </ScrollReveal>
        </div>

        <div className="flex flex-col justify-center">
          {philosophy.points.map((point, index) => (
            <div
              key={point.title}
              className={index > 0 ? "border-t border-line" : ""}
            >
              <div
                className={`flex items-baseline gap-6 pb-8 lg:pb-9 ${
                  index > 0 ? "pt-8 lg:pt-9" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-semibold tracking-[0.08em] text-brand-ink"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
