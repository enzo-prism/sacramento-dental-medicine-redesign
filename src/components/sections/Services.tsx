import Image from "next/image";
import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { imagery, services } from "@/data/site";

export function Services() {
  const [featured, ...rest] = services;

  return (
    <section id="services" className="section bg-wash">
      <div className="container-x">
        <SectionLabel
          eyebrow="Full-scope care"
          accent="brand"
          title="From first cleanings to full restorations."
          intro="Preventive, cosmetic, restorative, and surgical care in one place, from a team that knows your history, your goals, and exactly how you feel about dental chairs."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <ScrollReveal variant="fade" className="h-full">
            <article className="surface-card flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={imagery.stillLife}
                  alt="Quiet still life of linen and morning light — atmospheric photography"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-ink">
                  Start here
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.015em] text-ink">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-md text-pretty text-sm leading-7 text-ink-soft md:text-base">
                  {featured.blurb}
                </p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
                  {featured.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-2.5 text-sm text-ink-soft"
                    >
                      <Check className="size-4 shrink-0 text-brand-deep" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </ScrollReveal>

          <div className="flex flex-col justify-center divide-y divide-line rounded-[20px] border border-line bg-card px-5 md:px-7">
            {rest.map((service) => (
              <article key={service.title} className="py-6 md:py-7">
                <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-6 text-ink-soft">
                  {service.blurb}
                </p>
                <p className="mt-3 text-sm text-ink-faint">
                  {service.details.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
