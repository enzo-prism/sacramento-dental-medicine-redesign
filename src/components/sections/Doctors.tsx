import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { contact, doctors } from "@/data/site";

export function Doctors() {
  return (
    <section id="doctors" className="section bg-wash">
      <div className="container-x">
        <SectionLabel
          eyebrow="Meet the doctors"
          title="Two doctors who will actually know you."
          intro="No rotating cast of strangers — the same two doctors, and both would rather explain too much than too little."
        />

        <div className="mt-12 flex flex-col gap-8 md:gap-10">
          {doctors.map((doctor) => (
            <article
              key={doctor.name}
              className="grid items-center gap-7 md:grid-cols-[240px_minmax(0,1fr)] md:gap-10 lg:grid-cols-[280px_minmax(0,1fr)]"
            >
              <div className="portrait-mat relative aspect-[3/4] w-full max-w-[280px] ring-1 ring-line">
                <Image
                  src={doctor.image}
                  alt={`${doctor.name}, ${doctor.title}`}
                  fill
                  sizes="280px"
                  className="object-cover object-top"
                />
              </div>

              <div>
                <p className="eyebrow text-brand-ink">{doctor.focus}</p>
                <h3 className="mt-3 font-display text-2xl font-medium text-ink md:text-[1.8rem]">
                  {doctor.name}
                  <span className="text-ink-faint">, {doctor.title}</span>
                </h3>
                <p className="mt-4 max-w-[58ch] text-pretty text-sm leading-7 text-ink-soft md:text-base md:leading-8">
                  {doctor.description}
                </p>
                <p className="mt-5 text-sm font-medium text-brand-ink">
                  {doctor.highlights}
                </p>
              </div>
            </article>
          ))}
        </div>

        <ScrollReveal variant="fade" className="mt-10">
          <p className="max-w-md text-sm leading-6 text-ink-soft">
            Not sure who to book with? Call{" "}
            <a href={contact.phoneHref} className="font-semibold text-brand-ink">
              {contact.phoneDisplay}
            </a>{" "}
            and the front desk will match you with the right doctor.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
