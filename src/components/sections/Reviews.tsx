import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ReviewStars } from "@/components/ReviewStars";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { googleReviewExcerpts, socialProof } from "@/data/site";

export function Reviews() {
  const [featured, ...rest] = googleReviewExcerpts.slice(0, 3);

  return (
    <section id="reviews" className="section relative bg-canvas">
      <div className="container-x">
        <SectionLabel
          eyebrow="Patient reviews"
          title="Take their word for it."
          intro={`A ${socialProof.rating}-star Google rating across ${socialProof.totalReviews} reviews, grounded in hundreds of specific patient experiences.`}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <ScrollReveal variant="fade">
            <figure>
              <ReviewStars className="text-base" />
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
                  Google review · {featured.date}
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
                    Google review · {review.date}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
          <Link href={socialProof.reviewsUrl} className="btn-text">
            Explore the full review story
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <a href={socialProof.moreReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-text text-ink-faint">
            All reviews on Google
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
