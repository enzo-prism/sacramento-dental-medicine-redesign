import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { contact, services, type Service } from "@/data/site";

const orbMap: Record<Service["accent"], string> = {
  brand: "orb-brand",
  slate: "orb-slate",
  ember: "orb-ember",
  ink: "orb-ink",
};

export function Services() {
  return (
    <section id="services" className="section bg-wash">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionLabel
            eyebrow="Full-scope care"
            accent="brand"
            title="Every stage of your smile, under one calm roof."
            intro="Preventive, cosmetic, restorative, and surgical care — coordinated by one team that knows your history, your goals, and your comfort level."
          />
          <ScrollReveal delay={120} variant="fade">
            <a href={contact.bookingHref} className="btn btn-primary px-5">
              Schedule a consultation
              <ArrowRight className="size-4" />
            </a>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.title}
              delay={(index % 2) * 90}
              variant="fade-up"
              className="h-full"
            >
              <article className="surface-card lift relative flex h-full flex-col overflow-hidden p-6 md:p-8">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 right-5 font-display text-[4.6rem] font-semibold leading-none tracking-[-0.04em] text-brand-tint select-none md:text-[5.4rem]"
                >
                  {service.index}
                </span>

                <span
                  className={`icon-orb relative size-12 ${orbMap[service.accent]}`}
                >
                  <service.icon className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.015em] text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-md text-pretty text-sm leading-7 text-ink-soft md:text-base">
                  {service.blurb}
                </p>
                <ul className="mt-6 grid gap-2.5 border-t border-line pt-6 sm:grid-cols-2 sm:gap-x-6">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-2.5 text-sm text-ink-soft"
                    >
                      <Check className="size-4 shrink-0 text-brand-deep" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
