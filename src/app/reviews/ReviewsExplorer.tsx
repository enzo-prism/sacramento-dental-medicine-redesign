"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Quote } from "lucide-react";
import { ReviewStars } from "@/components/ReviewStars";
import { googleReviewExcerpts, socialProof } from "@/data/site";

const filters = [
  "All",
  "Comfort",
  "Communication",
  "Team",
  "Long-term care",
  "Urgent care",
] as const;

type Filter = (typeof filters)[number];

export function ReviewsExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const visibleReviews = useMemo(
    () =>
      filter === "All"
        ? googleReviewExcerpts
        : googleReviewExcerpts.filter((review) => review.theme === filter),
    [filter],
  );

  return (
    <div>
      <div
        role="group"
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        aria-label="Filter review excerpts"
      >
        {filters.map((item) => {
          const active = item === filter;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "border-brand-deep bg-brand-deep text-white shadow-sm"
                  : "border-line bg-white text-ink-soft hover:border-brand hover:text-ink"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visibleReviews.length} review excerpt
        {visibleReviews.length === 1 ? "" : "s"} for {filter}.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleReviews.map((review) => (
          <figure
            key={`${review.name}-${review.quote}`}
            className="flex min-h-64 flex-col rounded-[20px] border border-line bg-white p-6 shadow-[0_18px_55px_-45px_rgba(13,27,46,0.45)]"
          >
            <div className="flex items-center justify-between gap-4">
              <ReviewStars className="text-sm" />
              <Quote className="size-5 text-brand" aria-hidden="true" />
            </div>
            <blockquote className="mt-7 flex-1 font-display text-xl font-medium leading-snug tracking-[-0.02em] text-ink">
              “{review.quote}”
            </blockquote>
            <figcaption className="mt-7 border-t border-line pt-4">
              <p className="text-sm font-semibold text-ink">{review.name}</p>
              <p className="mt-1 text-xs text-ink-faint">
                Google review · {review.date}
              </p>
              <span className="mt-3 inline-flex rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-bold text-brand-ink">
                {review.theme}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[20px] bg-wash p-6 sm:flex-row sm:items-center sm:p-7">
        <div>
          <p className="font-display text-xl font-semibold text-ink">
            Want every word, in the original context?
          </p>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-ink-soft">
            These are short excerpts. Google keeps the complete, continuously updated archive in its original context.
          </p>
        </div>
        <a
          href={socialProof.moreReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline shrink-0"
        >
          Read all on Google
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
