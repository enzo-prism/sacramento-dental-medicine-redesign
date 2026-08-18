import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { reviews, socialProof } from "@/data/site";

export function Reviews() {
  const [featured, ...rest] = reviews;

  return (
    <section id="reviews" className="section relative bg-canvas">
      <div className="container-x">
        <SectionLabel
          eyebrow="Patient reviews"
          title="Take their word for it."
          intro="Their words, exactly as they wrote them. We'd rather show you those than grade ourselves."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <ScrollReveal variant="fade">
            <figure>
              <span
                aria-hidden
                className="block h-[0.55em] font-display text-[72px] font-medium leading-none text-brand-deep"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 font-display text-pretty text-2xl font-medium leading-snug tracking-[-0.02em] text-ink md:text-[1.85rem] md:leading-[1.35]">
                {featured.quote}
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-display text-base font-medium text-ink">
                  {featured.name}
                </p>
                <p className="mt-0.5 text-xs text-ink-faint">
                  Published on {featured.source}
                </p>
              </figcaption>
            </figure>
          </ScrollReveal>

          <div className="flex flex-col justify-center divide-y divide-line">
            {rest.map((review) => (
              <figure key={review.name} className="py-6 first:pt-0 last:pb-0">
                <blockquote className="text-pretty text-base leading-7 text-ink">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-4">
                  <p className="text-sm font-medium text-ink">{review.name}</p>
                  <p className="mt-0.5 text-xs text-ink-faint">
                    Published on {review.source}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="mt-10">
          <a
            href={socialProof.moreReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-text"
          >
            More reviews on Google Maps
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </p>
      </div>
    </section>
  );
}
