import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { ReviewStars } from "@/components/ReviewStars";
import { ScrollReveal } from "@/components/ScrollReveal";
import { googleReviewThemes, socialProof } from "@/data/site";

export function ReviewProof() {
  const fiveStarShare = Math.round(
    (socialProof.fiveStarReviews / socialProof.totalReviews) * 1000,
  ) / 10;

  return (
    <section aria-labelledby="review-proof-title" className="pb-5 sm:pb-8">
      <div className="container-x">
        <ScrollReveal variant="fade">
          <div className="overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_24px_70px_-50px_rgba(13,27,46,0.45)]">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="flex items-center gap-5 border-b border-line p-6 sm:p-7 lg:border-b-0 lg:border-r">
                <div className="font-display text-5xl font-semibold tracking-[-0.06em] text-ink sm:text-6xl">
                  {socialProof.rating}
                </div>
                <div>
                  <ReviewStars rating={socialProof.rating} className="text-lg" />
                  <p className="mt-1.5 text-sm font-medium text-ink">
                    {socialProof.totalReviews} Google reviews
                  </p>
                  <p className="mt-0.5 text-xs text-ink-faint">
                    {fiveStarShare}% are five-star
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-5 p-6 sm:p-7 lg:flex-row lg:items-center">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
                    <BadgeCheck className="size-4" aria-hidden="true" />
                    What patients mention most
                  </div>
                  <h2 id="review-proof-title" className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
                    Kind people. Clear answers. Care that earns trust.
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    {googleReviewThemes.slice(0, 3).map((theme) => theme.title).join(" · ")}
                  </p>
                </div>
                <Link href={socialProof.reviewsUrl} className="btn-text shrink-0 self-start lg:self-auto">
                  Explore patient reviews
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
