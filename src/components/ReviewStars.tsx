import { Star } from "lucide-react";

type ReviewStarsProps = {
  rating?: number;
  className?: string;
};

export function ReviewStars({ rating = 5, className = "" }: ReviewStarsProps) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[#c77724] ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.min(1, Math.max(0, rating - index));
        return (
          <span key={index} aria-hidden="true" className="relative size-[1em]">
            <Star
              className="absolute inset-0 size-full"
              style={{ opacity: 0.28 }}
              fill="none"
              strokeWidth={1.8}
            />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-[1em]" fill="currentColor" strokeWidth={1.8} />
            </span>
          </span>
        );
      })}
    </span>
  );
}
