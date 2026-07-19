import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { contact, doctors } from "@/data/site";

export function Doctors() {
  return (
    <section id="doctors" className="section">
      <div className="container-x">
        <SectionLabel
          eyebrow="Meet the doctors"
          title="Two doctors who will actually know you."
          intro="No rotating cast of strangers — the same two doctors, and both would rather explain too much than too little."
        />

        <div className="mt-12 flex flex-col gap-5 md:gap-6">
          {doctors.map((doctor, index) => {
            const mirrored = index % 2 === 1;
            return (
              <ScrollReveal
                key={doctor.name}
                delay={index * 100}
                variant={mirrored ? "slide-left" : "slide-right"}
              >
                <article
                  className={`surface-card lift grid items-center gap-7 p-6 md:gap-10 md:p-9 lg:p-10 ${
                    mirrored
                      ? "md:grid-cols-[minmax(0,1fr)_270px]"
                      : "md:grid-cols-[270px_minmax(0,1fr)]"
                  }`}
                >
                  <div
                    className={`relative aspect-[3/4] w-full max-w-[270px] overflow-hidden rounded-2xl ring-1 ring-line ${
                      mirrored ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={doctor.image}
                      alt={`${doctor.name}, ${doctor.title}`}
                      fill
                      sizes="270px"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className={mirrored ? "md:order-1" : ""}>
                    <p className="eyebrow text-brand-deep">{doctor.focus}</p>
                    <h3 className="mt-3 font-display text-2xl font-medium text-ink md:text-[1.8rem]">
                      {doctor.name}
                      <span className="text-ink-faint">, {doctor.title}</span>
                    </h3>
                    <p className="mt-4 max-w-[58ch] text-pretty text-sm leading-7 text-ink-soft md:text-base md:leading-8">
                      {doctor.description}
                    </p>
                    <ul className="mt-6 grid gap-2.5 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-3">
                      {doctor.credentials.map((cred) => (
                        <li
                          key={cred}
                          className="flex items-center gap-2.5 text-sm font-medium text-ink-soft"
                        >
                          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-deep">
                            <Check className="size-3" strokeWidth={3} aria-hidden />
                          </span>
                          {cred}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal
          delay={120}
          variant="fade"
          className="mt-10 flex flex-wrap items-center justify-between gap-4"
        >
          <p className="max-w-md text-sm leading-6 text-ink-soft">
            Not sure who to book with? Call the office and the front desk will
            match you with the right doctor.
          </p>
          <a href={contact.bookingHref} className="btn btn-primary px-6">
            Book your visit
            <ArrowRight className="size-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
