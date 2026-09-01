import type { Metadata } from "next";
import { ArrowUpRight, FileText } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Notice of Privacy Practices",
  description:
    "Read or download Sacramento Dental Medicine's current Notice of Privacy Practices.",
  alternates: { canonical: "/privacy-practices/" },
  robots: { index: false, follow: true },
};

export default function PrivacyPracticesPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section className="relative overflow-hidden pb-20 pt-32 sm:pb-24 lg:pt-40">
          <div
            aria-hidden="true"
            className="absolute -right-36 top-16 size-[30rem] rounded-full bg-brand-tint/65 blur-3xl"
          />
          <div className="container-x relative">
            <div className="max-w-3xl rounded-[24px] border border-line bg-white p-7 shadow-[0_30px_80px_-55px_rgba(13,27,46,0.55)] sm:p-10">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-tint text-brand-deep">
                <FileText aria-hidden="true" className="size-6" />
              </div>
              <p className="eyebrow mt-7 text-brand-deep">Patient privacy</p>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl">
                Notice of Privacy Practices
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft">
                This notice explains how medical information may be used and
                disclosed, and how patients can access that information. The
                PDF below preserves the notice published by the practice
                before this website transition.
              </p>
              <a
                href="/privacy-practices.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-8 h-12 px-5 text-base"
              >
                Open privacy notice (PDF)
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
