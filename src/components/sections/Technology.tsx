import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { contact, technology, technologyTags } from "@/data/site";

export function Technology() {
  return (
    <section
      id="technology"
      className="section relative overflow-hidden bg-ink text-white"
    >
      <div className="grain absolute inset-0" aria-hidden="true" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
        <ScrollReveal>
          <span className="eyebrow text-[var(--gold-bright)]">
            Technology & comfort
          </span>
          <h2 className="mt-5 max-w-xl font-display text-balance text-[clamp(1.9rem,4vw,2.9rem)] font-medium leading-[1.04] tracking-[-0.02em]">
            Modern tools, calmer appointments.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-white/76 md:text-lg md:leading-8">
            Every piece of technology at Sacramento Dental Medicine is chosen for
            one reason: to make your visit more precise, more comfortable, and
            more predictable — never just for show.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {technologyTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/12 bg-white/6 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white/82"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={contact.bookingHref}
            className="btn btn-primary mt-9 px-5"
          >
            Experience the difference
            <ArrowRight className="size-4" />
          </a>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {technology.map((item, index) => (
            <ScrollReveal
              key={item.title}
              delay={index * 80}
              variant="scale"
              className="h-full"
            >
              <article className="lift flex h-full flex-col rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                <span className="icon-orb grid size-11 place-items-center rounded-xl bg-[var(--gold-bright)] text-ink">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/80">{item.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
