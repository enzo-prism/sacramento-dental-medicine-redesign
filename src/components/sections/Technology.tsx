import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { imagery, technology } from "@/data/site";

export function Technology() {
  return (
    <section id="technology" className="section relative bg-canvas">
      <div className="container-x">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <ScrollReveal className="max-w-2xl">
            <span className="eyebrow accent-brand">Technology &amp; comfort</span>
            <h2 className="mt-5 font-display text-balance text-[clamp(2rem,4.2vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-ink">
              Modern tools, calmer appointments.
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
              Nothing in these rooms is for show. Every tool earned its place
              by making visits measurably better: clearer diagnosis, gentler
              treatment, fewer surprises.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade" className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-line lg:block">
            <Image
              src={imagery.hero}
              alt="Bright treatment room with a dental chair in soft morning light — atmospheric photography"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[20%_center]"
            />
          </ScrollReveal>
        </div>

        <ol className="mt-12 grid gap-0 border-t border-line md:mt-16 md:grid-cols-2 md:gap-x-12">
          {technology.map((item, index) => (
            <li
              key={item.title}
              className="flex items-baseline gap-5 border-b border-line py-7"
            >
              <span
                aria-hidden="true"
                className="font-display text-sm font-semibold tracking-[0.08em] text-brand-ink"
              >
                0{index + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md text-pretty text-sm leading-6 text-ink-soft">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
