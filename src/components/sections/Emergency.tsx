import { Phone, Siren } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { contact, emergency } from "@/data/site";

export function Emergency() {
  return (
    <section
      aria-label="Dental emergencies"
      className="relative bg-canvas pt-[clamp(4rem,8vw,7.5rem)] pb-[clamp(2rem,4vw,3.5rem)]"
    >
      <div className="container-x">
        <ScrollReveal className="relative overflow-hidden rounded-3xl border border-ember/15 bg-ember-tint p-7 md:p-10">
          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="flex items-start gap-4 md:max-w-2xl md:gap-5">
              <span className="icon-orb orb-ember size-12 shrink-0 bg-white! ring-1 ring-ember/20">
                <Siren className="size-6" />
              </span>
              <div>
                <p className="eyebrow text-ember-deep">{emergency.eyebrow}</p>
                <h2 className="mt-2.5 font-display text-balance text-2xl font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[1.9rem]">
                  {emergency.headline}
                </h2>
                <p className="mt-3 max-w-xl text-pretty text-sm leading-7 text-ink-soft md:text-base">
                  {emergency.body}
                </p>
              </div>
            </div>

            <a
              href={contact.phoneHref}
              className="btn btn-ember shrink-0 self-start px-6 md:self-center"
            >
              <Phone className="size-4" />
              Call {contact.phoneDisplay}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
