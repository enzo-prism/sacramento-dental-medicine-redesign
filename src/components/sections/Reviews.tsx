import { ArrowUpRight, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { reviews, socialProof } from "@/data/site";

export function Reviews() {
  return (
    <section id="reviews" className="section relative bg-wash">
      <div aria-hidden className="hairline absolute inset-x-0 top-0" />
      <div aria-hidden className="hairline absolute inset-x-0 bottom-0" />

      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionLabel
            eyebrow="Patient reviews"
            title="Take their word for it."
            intro="Their words, exactly as they wrote them. We'd rather show you those than grade ourselves."
          />
          <ScrollReveal delay={120} variant="fade">
            <a
              href={socialProof.moreReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group surface-card lift flex items-center gap-4 px-5 py-4"
            >
              <span className="icon-orb orb-brand size-11">
                <MessageCircle className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-lg font-medium text-ink">
                  Patient experiences
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-faint">
                  See more on Google Maps
                  <ArrowUpRight
                    className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </span>
            </a>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <ScrollReveal
              key={review.name}
              delay={index * 70}
              variant="scale"
              className="h-full"
            >
              <figure className="surface-card lift flex h-full flex-col p-6 md:p-7">
                <span
                  aria-hidden
                  className="block h-[0.55em] font-display text-[64px] font-medium leading-none text-brand"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-pretty text-base leading-7 text-ink md:text-[1.05rem] md:leading-8">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <p className="font-display text-base font-medium text-ink">
                    {review.name}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-faint">
                    Published on {review.source}
                  </p>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={120} variant="fade" className="mt-10 text-center">
          <a
            href={socialProof.moreReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-display text-lg font-medium text-brand-deep underline decoration-brand/50 decoration-2 underline-offset-8 transition hover:text-brand-ink hover:decoration-brand"
          >
            See more reviews on Google Maps
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
