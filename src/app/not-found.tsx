import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { SeasonalNotFoundArt } from "@/components/Seasonal";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section className="pb-20 pt-32 sm:pb-24 lg:pt-40">
          <div className="container-x text-center">
            <SeasonalNotFoundArt />
            <p className="eyebrow text-brand-deep">Error 404</p>
            <h1 className="mx-auto mt-4 max-w-2xl font-display text-balance text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
              We couldn&apos;t find that page.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-ink-soft">
              The link may be old or mistyped. Head back to the home page,
              or call the front desk and we&apos;ll help you find what you
              need.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/" className="btn btn-primary h-12 px-5 text-base">
                Back to home
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a href={contact.phoneHref} className="btn btn-outline h-12 px-5 text-base">
                <Phone className="size-5" aria-hidden="true" />
                {contact.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
