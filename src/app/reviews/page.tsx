import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { ReviewStars } from "@/components/ReviewStars";
import { Footer } from "@/components/sections/Footer";
import { ReviewsExplorer } from "@/app/reviews/ReviewsExplorer";
import {
  contact,
  googleReviewAnalysis,
  googleReviewThemes,
  socialProof,
} from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: `${contact.practiceName} Reviews | ${socialProof.rating} on Google`,
  },
  description: `Read what ${socialProof.totalReviews} patients say about Sacramento Dental Medicine in Antelope, including comfort, clear explanations, Dr. Mike, and long-term care.`,
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: `${socialProof.totalReviews} Patient Reviews. One Clear Pattern.`,
    description:
      `See the patterns across ${socialProof.totalReviews} Google reviews, including comfort, kindness, clear explanations, and long-term care.`,
    type: "website",
    locale: "en_US",
    url: "/reviews",
    siteName: contact.practiceName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${socialProof.totalReviews} Patient Reviews. One Clear Pattern.`,
    description:
      `See the patterns across ${socialProof.totalReviews} Google reviews, including comfort, kindness, clear explanations, and long-term care.`,
  },
};

const themeIcons = [UsersRound, Sparkles, ShieldCheck, HeartHandshake, CheckCircle2, MessageCircleMore];

export default function ReviewsPage() {
  const fiveStarShare = Math.round(
    (socialProof.fiveStarReviews / socialProof.totalReviews) * 1000,
  ) / 10;

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 lg:pb-24 lg:pt-40">
          <div aria-hidden="true" className="absolute -right-36 top-16 size-[30rem] rounded-full bg-brand-tint/65 blur-3xl" />
          <div className="container-x relative grid items-end gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div>
              <p className="eyebrow text-brand-deep">Patient reviews</p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,7vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink text-balance">
                {socialProof.totalReviews} patient perspectives. One clear pattern.
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                We read every Google review: the praise, the practical details, and the criticism. Here is the clearest picture of what patients consistently say.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#review-stories" className="btn btn-primary h-12 px-5 text-base">
                  Explore their stories
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a href={socialProof.moreReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline h-12 px-5 text-base">
                  Open Google reviews
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div>
              <div className="rounded-[24px] border border-line bg-white p-6 shadow-[0_30px_80px_-55px_rgba(13,27,46,0.55)] sm:p-8">
                <div className="flex items-end justify-between gap-4 border-b border-line pb-7">
                  <div>
                    <div className="font-display text-6xl font-semibold tracking-[-0.065em] text-ink sm:text-7xl">
                      {socialProof.rating}
                    </div>
                    <ReviewStars rating={socialProof.rating} className="mt-2 text-xl" />
                  </div>
                  <div className="text-right">
                    <p className="font-display text-3xl font-semibold text-ink">{socialProof.totalReviews}</p>
                    <p className="mt-1 text-sm text-ink-faint">Google reviews</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3" aria-label="Google rating distribution">
                  {socialProof.distribution.map((row) => (
                    <div key={row.stars} className="grid grid-cols-[2.5rem_1fr_2.8rem] items-center gap-3 text-sm">
                      <span className="font-medium text-ink">{row.stars}★</span>
                      <div className="h-2 overflow-hidden rounded-full bg-wash-2">
                        <div
                          className="h-full rounded-full bg-brand-deep"
                          style={{ width: `${(row.count / socialProof.totalReviews) * 100}%` }}
                        />
                      </div>
                      <span className="text-right tabular-nums text-ink-faint">{row.count}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-5 text-ink-faint">
                  {socialProof.fiveStarReviews} five-star reviews · {fiveStarShare}% of all reviews · checked {socialProof.checkedDate}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="themes-title">
          <div className="container-x">
            <div className="max-w-3xl">
              <p className="eyebrow text-brand-deep">Across the full review set</p>
              <h2 id="themes-title" className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
                The themes patients return to.
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft">
                We analyzed all {socialProof.totalReviews} ratings and all {socialProof.writtenReviews} written reviews. Mention counts overlap because one review can praise more than one part of the experience.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-ink-faint">
                {googleReviewAnalysis.summary}
              </p>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
              {googleReviewThemes.map((theme, index) => {
                const Icon = themeIcons[index];
                return (
                  <article key={theme.title} className="bg-canvas p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid size-10 place-items-center rounded-xl bg-brand-tint text-brand-ink">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-2xl font-semibold text-brand-deep tabular-nums">{theme.count}</span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-semibold text-ink">{theme.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{theme.body}</p>
                    <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint">written-review mentions</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 rounded-[24px] border border-line bg-wash px-5 py-5 sm:px-6">
              <p className="text-sm font-semibold text-ink">We read the harder feedback too.</p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-soft">
                {googleReviewAnalysis.lowerRatedNote}
              </p>
            </div>
          </div>
        </section>

        <section id="review-stories" className="section scroll-mt-24 bg-canvas" aria-labelledby="stories-title">
          <div className="container-x">
            <div className="max-w-3xl">
              <p className="eyebrow text-brand-deep">In their own words</p>
              <h2 id="stories-title" className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
                Find the experience that matters to you.
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft">
                Filter a representative set of short excerpts. Names and relative timing are shown as they appeared publicly on Google when checked {socialProof.checkedDate}.
              </p>
            </div>
            <div className="mt-10">
              <ReviewsExplorer />
            </div>
          </div>
        </section>

        <section data-mobile-cta-stop className="bg-night text-white">
          <div className="container-x grid gap-8 py-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#d5e1f4]">Ready when you are</p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Come see what patients are talking about.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
                Request a visit online, then the front desk will reach out to confirm the day and time.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={contact.bookingHref} className="btn btn-primary h-12 px-5">
                <CalendarDays className="size-4" aria-hidden="true" />
                Book online
              </Link>
              <a href={contact.phoneHref} className="btn btn-ghost-light h-12 px-5">
                Call {contact.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
