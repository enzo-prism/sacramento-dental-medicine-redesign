import { ScrollReveal } from "@/components/ScrollReveal";
import { quickFacts } from "@/data/site";

export function TrustBand() {
  return (
    <section aria-label="Practice highlights" className="relative bg-wash">
      <div className="hairline" />

      <div className="container-x grid gap-4 py-8 sm:grid-cols-3 md:py-10">
        {quickFacts.map((fact) => (
          <ScrollReveal
            key={fact.label}
            variant="fade"
            className="flex items-start gap-4 rounded-2xl border border-line bg-card p-5"
          >
            <span className="icon-orb orb-brand size-12 shrink-0">
              <fact.icon className="size-5" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint">
                {fact.label}
              </p>
              <p className="mt-1.5 font-display text-lg font-medium leading-tight text-ink sm:min-h-[2.75rem]">
                {fact.value}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="hairline" />
    </section>
  );
}
