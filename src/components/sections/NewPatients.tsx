import { Check, ClipboardList } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { FAQ } from "@/components/sections/FAQ";
import { contact, newPatient } from "@/data/site";

export function NewPatients() {
  return (
    <section id="new-patients" className="section bg-wash">
      <div className="container-x">
        <SectionLabel
          eyebrow={newPatient.eyebrow}
          title={newPatient.title}
          intro={newPatient.intro}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            {newPatient.billing.map((item, index) => (
              <div
                key={item.title}
                className={index > 0 ? "border-t border-line pt-7 mt-7" : ""}
              >
                <h3 className="font-display text-lg font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-ink-soft">
                  {item.body}
                </p>
              </div>
            ))}

            <p className="mt-8 text-sm leading-7 text-brand-ink">
              <span className="font-semibold">Your first visit: </span>
              {newPatient.firstVisit}
            </p>

            <a href={contact.bookingHref} className="btn-text mt-6">
              Book your first visit
            </a>
          </div>

          <div className="surface-wash flex flex-col p-6 md:p-7">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-ink">
              <ClipboardList className="size-4" aria-hidden />
              Bring to your first visit
            </span>
            <ul className="mt-5 grid gap-3">
              {newPatient.bring.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-ink"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-md bg-card text-brand-deep">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ScrollReveal variant="fade" className="mt-14 md:mt-16">
          <div className="surface-card p-6 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
              <div className="flex flex-col">
                <span className="eyebrow accent-brand">Good to know</span>
                <h3 className="mt-5 font-display text-balance text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-tight text-ink">
                  Common questions, answered.
                </h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft">
                  The things new patients actually ask. For anything else, call
                  the front desk.
                </p>
                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <a href={contact.phoneHref} className="btn-text">
                    Front desk: {contact.phoneDisplay}
                  </a>
                </div>
              </div>
              <FAQ />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
