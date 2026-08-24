import { socialProof } from "@/data/site";
import {
  createReviewsSocialImage,
  socialImageSize,
} from "@/lib/social-image";

export const alt = `${socialProof.rating} out of 5 from ${socialProof.totalReviews} Google reviews for Sacramento Dental Medicine.`;
export const size = socialImageSize;
export const contentType = "image/png";

export default function Image() {
  const fiveStarShare = Math.round(
    (socialProof.fiveStarReviews / socialProof.totalReviews) * 1000,
  ) / 10;

  return createReviewsSocialImage({
    rating: socialProof.rating,
    totalReviews: socialProof.totalReviews,
    fiveStarShare,
    checkedDate: socialProof.checkedDate,
  });
}
