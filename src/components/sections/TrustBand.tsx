import { Marquee } from "@/components/Marquee";
import { ScrollReveal } from "@/components/ScrollReveal";
import { quickFacts, trustStrip } from "@/data/site";

export function TrustBand() {
  return (
    <section
      aria-label="Practice highlights"
      className="relative border-b border-rule bg-ink text-white"
    >
      <Marquee items={trustStrip} tone="dark" className="py-3.5" />

      <div className="container-x grid gap-4 py-8 sm:grid-cols-3 md:py-10">
        {quickFacts.map((fact, index) => (
          <ScrollReveal
            key={fact.label}
            delay={index * 80}
            variant="fade"
            className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/4 p-5 transition hover:border-white/16 hover:bg-white/8"
          >
            <span className="icon-orb grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--gold-bright)] text-ink">
              <fact.icon className="size-5" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                {fact.label}
              </p>
              <p className="mt-1.5 font-display text-lg font-medium leading-tight text-white">
                {fact.value}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
