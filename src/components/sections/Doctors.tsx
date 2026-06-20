import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { contact, doctors } from "@/data/site";

export function Doctors() {
  return (
    <section id="doctors" className="section bg-mist/50">
      <div className="container-x">
        <SectionLabel
          eyebrow="Meet the doctors"
          accent="teal"
          title="Experienced care with a human voice."
          intro="You'll meet the same faces at every visit. The doctors at Sacramento Dental Medicine pair deep clinical experience with the kind of unhurried, plain-spoken communication that puts anxious patients at ease."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {doctors.map((doctor, index) => (
            <ScrollReveal
              key={doctor.name}
              delay={index * 120}
              variant={index % 2 === 0 ? "slide-right" : "slide-left"}
              className="h-full"
            >
              <article className="surface-card lift grid h-full overflow-hidden md:grid-cols-[240px_1fr]">
                <div className="relative aspect-[4/5] md:aspect-auto">
                  <Image
                    src={doctor.image}
                    alt={`${doctor.name}, ${doctor.title}`}
                    fill
                    sizes="(min-width: 1024px) 240px, 100vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-ink/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                    {doctor.focus}
                  </span>
                </div>
                <div className="flex flex-col p-6 md:p-8">
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] accent-coral">
                    {doctor.title}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-medium text-ink md:text-[1.7rem]">
                    {doctor.name}
                  </h3>
                  <p className="mt-4 text-pretty text-sm leading-7 text-ink-soft md:text-base md:leading-8">
                    {doctor.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2 border-t border-rule pt-5">
                    {doctor.credentials.map((cred) => (
                      <li
                        key={cred}
                        className="rounded-full bg-paper-2 px-3 py-1 text-xs font-semibold text-ink-soft"
                      >
                        {cred}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal
          delay={120}
          variant="fade"
          className="mt-10 flex flex-wrap items-center justify-between gap-4"
        >
          <p className="max-w-md text-sm text-ink-soft">
            Not sure who to book with? Call the office and the front desk will
            match you with the right doctor for your needs.
          </p>
          <a href={contact.bookingHref} className="btn btn-ink px-5">
            Book your visit
            <ArrowRight className="size-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
