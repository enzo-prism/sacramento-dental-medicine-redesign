import { Phone, Siren } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { contact, emergency } from "@/data/site";

export function Emergency() {
  return (
    <section aria-label="Dental emergencies" className="section-tight">
      <div className="container-x">
        <ScrollReveal className="emergency-band relative overflow-hidden rounded-3xl p-7 md:p-10">
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4 md:max-w-2xl">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25">
                <Siren className="size-6" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
                  {emergency.eyebrow}
                </p>
                <h2 className="mt-1.5 font-display text-balance text-2xl font-medium leading-tight text-white md:text-[1.9rem]">
                  {emergency.headline}
                </h2>
                <p className="mt-2.5 text-pretty text-sm leading-7 text-white/85 md:text-base">
                  {emergency.body}
                </p>
              </div>
            </div>

            <a
              href={contact.phoneHref}
              className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-4 font-semibold text-[var(--coral)] shadow-lg transition hover:scale-[1.02] active:scale-100"
            >
              <Phone className="size-5" />
              <span className="text-left leading-tight">
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--coral)]/70">
                  Call now
                </span>
                <span className="block font-display text-lg">
                  {contact.phoneDisplay}
                </span>
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
