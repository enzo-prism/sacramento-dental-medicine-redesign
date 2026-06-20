import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { contact, services } from "@/data/site";

export function Services() {
  return (
    <section id="services" className="section bg-paper-2/60">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionLabel
            eyebrow="Full-scope care"
            accent="coral"
            title="Every stage of your smile, under one calm roof."
            intro="Preventive, cosmetic, restorative, and surgical care — coordinated by one team that knows your history, your goals, and your comfort level."
          />
          <ScrollReveal delay={120} variant="fade">
            <a href={contact.bookingHref} className="btn btn-ink px-5">
              Schedule a consultation
              <ArrowRight className="size-4" />
            </a>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.title}
              delay={index * 90}
              variant="scale"
              className="h-full"
            >
              <article className="surface-card lift flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="icon-orb grid size-12 place-items-center rounded-xl orb-teal">
                    <service.icon className="size-6" />
                  </span>
                  <span className="font-display text-3xl font-medium text-ink/15">
                    {service.index}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  {service.blurb}
                </p>
                <ul className="mt-5 space-y-2 border-t border-rule pt-5">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-2.5 text-sm text-ink-soft"
                    >
                      <Check className="size-4 shrink-0 text-teal" />
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
