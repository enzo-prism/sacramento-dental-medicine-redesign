import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  googleReviewExcerpts,
  googleReviewThemes,
  socialProof,
} from "./site.ts";

describe("Google review snapshot", () => {
  it("keeps the rating distribution internally consistent", () => {
    const total = socialProof.distribution.reduce(
      (sum, row) => sum + row.count,
      0,
    );
    const weightedRating =
      socialProof.distribution.reduce(
        (sum, row) => sum + row.stars * row.count,
        0,
      ) / total;

    assert.equal(total, socialProof.totalReviews);
    assert.equal(socialProof.distribution[0].count, socialProof.fiveStarReviews);
    assert.equal(Number(weightedRating.toFixed(1)), socialProof.rating);
    assert.deepEqual(socialProof.distribution, [
      { stars: 5, count: 589 },
      { stars: 4, count: 16 },
      { stars: 3, count: 9 },
      { stars: 2, count: 4 },
      { stars: 1, count: 14 },
    ]);
    assert.equal(socialProof.writtenReviews, 428);
    assert.equal(socialProof.checkedDate, "August 24, 2026");
  });

  it("keeps every displayed excerpt short", () => {
    for (const review of googleReviewExcerpts) {
      const words = review.quote.trim().split(/\s+/).length;
      assert.ok(words < 25, `${review.name}'s excerpt has ${words} words`);
    }
  });

  it("keeps overlapping theme counts within the written corpus", () => {
    for (const theme of googleReviewThemes) {
      assert.ok(theme.count > 0);
      assert.ok(theme.count <= socialProof.writtenReviews);
    }

    assert.deepEqual(
      googleReviewThemes.map(({ title, count }) => ({ title, count })),
      [
        { title: "Friendly, kind care", count: 228 },
        { title: "A clean, organized office", count: 140 },
        { title: "Dr. Mike", count: 100 },
        { title: "Long-term and family care", count: 89 },
        { title: "Comfort for anxious patients", count: 75 },
        { title: "Clear explanations", count: 64 },
      ],
    );
  });
});
