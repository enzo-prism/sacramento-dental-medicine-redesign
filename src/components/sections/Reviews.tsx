import { ArrowUpRight, MessageCircle, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { reviews, socialProof } from "@/data/site";

export function Reviews() {
  return (
    <section id="reviews" className="section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionLabel
            eyebrow="Patient reviews"
            accent="gold"
            title="Warm care patients remember."
            intro="Patients come for the dentistry and stay for the people. Read experiences published by the practice."
          />
          <ScrollReveal delay={120} variant="fade">
            <a
              href={socialProof.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-rule bg-white px-5 py-4 transition hover:border-gold/50"
            >
              <MessageCircle className="size-6 text-[var(--gold)]" />
              <div>
                <p className="font-display text-lg font-medium text-ink">
                  Patient experiences
                </p>
                <p className="inline-flex items-center gap-1 text-xs font-medium text-ink-faint">
                  {socialProof.label}
                  <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </div>
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
                <div className="flex items-center justify-between">
                  <Quote className="size-8 text-[var(--gold)]/40" />
                  <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[11px] font-semibold text-ink-faint">
                    via {review.source}
                  </span>
                </div>
                <blockquote className="mt-4 flex-1 text-pretty text-base leading-7 text-ink md:text-[1.05rem] md:leading-8">
                  {review.quote}
                </blockquote>
                <div className="mt-6 flex items-center justify-between border-t border-rule pt-5">
                  <figcaption>
                    <p className="font-display text-base font-medium text-ink">
                      {review.name}
                    </p>
                    <p className="text-xs text-ink-faint">{review.context}</p>
                  </figcaption>
                </div>
              </figure>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={120} variant="fade" className="mt-10 text-center">
          <a
            href={socialProof.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-display text-lg font-medium text-ink underline decoration-[var(--gold)] decoration-2 underline-offset-8 hover:text-teal"
          >
            Read more patient reviews
            <ArrowUpRight className="size-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
