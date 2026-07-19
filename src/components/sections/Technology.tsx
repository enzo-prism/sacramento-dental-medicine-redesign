import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { contact, technology, technologyTags } from "@/data/site";

export function Technology() {
  return (
    <section id="technology" className="night-band section relative overflow-hidden">
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-12">
          <ScrollReveal className="max-w-2xl">
            <span className="eyebrow text-brand">Technology &amp; comfort</span>
            <h2 className="mt-5 font-display text-balance text-[clamp(2rem,4.2vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-white">
              Modern tools, calmer appointments.
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-white/70 md:text-lg md:leading-8">
              Nothing in these rooms is for show. Every tool earned its place
              by making visits measurably better: clearer diagnosis, gentler
              treatment, fewer surprises.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140} variant="fade" className="shrink-0">
            <a href={contact.bookingHref} className="btn btn-ghost-light px-5">
              Book a calmer visit
              <ArrowRight className="size-4" />
            </a>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {technology.map((item, index) => (
            <ScrollReveal
              key={item.title}
              delay={(index % 3) * 90}
              variant="fade-up"
              className="h-full"
            >
              <article className="surface-night-card lift flex h-full flex-col p-6">
                <span className="icon-orb orb-night size-11">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.01em] text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-6 text-white/70">
                  {item.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal
          delay={120}
          variant="fade"
          className="mt-10 flex flex-wrap gap-2.5 lg:mt-12"
        >
          {technologyTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/72"
            >
              {tag}
            </span>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
