import {
  BadgeCheck,
  Check,
  ClipboardList,
  CreditCard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { contact, newPatient } from "@/data/site";

const billingIcons = [ShieldCheck, CreditCard, BadgeCheck];

export function NewPatients() {
  return (
    <section id="new-patients" className="section">
      <div className="container-x">
        <SectionLabel
          eyebrow={newPatient.eyebrow}
          accent="teal"
          title={newPatient.title}
          intro={newPatient.intro}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Billing / insurance / financing */}
          <div className="grid gap-4 sm:grid-cols-3">
            {newPatient.billing.map((item, index) => {
              const Icon = billingIcons[index] ?? ShieldCheck;
              return (
                <ScrollReveal
                  key={item.title}
                  delay={index * 70}
                  className="surface-card lift flex h-full flex-col p-5"
                >
                  <span className="icon-orb grid size-11 place-items-center rounded-xl orb-teal">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    {item.body}
                  </p>
                </ScrollReveal>
              );
            })}
          </div>

          {/* What to bring */}
          <ScrollReveal
            delay={120}
            variant="slide-left"
            className="surface-tinted flex flex-col p-6 md:p-7"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-deep">
              <ClipboardList className="size-4" />
              Bring to your first visit
            </span>
            <ul className="mt-5 grid gap-3">
              {newPatient.bring.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink">
                  <span className="grid size-5 shrink-0 place-items-center rounded-md bg-white text-teal">
                    <Check className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal
          delay={80}
          variant="fade"
          className="mt-5 flex items-start gap-3 rounded-2xl border border-rule bg-white px-5 py-4"
        >
          <Sparkles className="mt-0.5 size-5 shrink-0 text-[var(--gold-deep)]" />
          <p className="text-sm leading-7 text-ink-soft">
            <span className="font-semibold text-ink">Your first visit: </span>
            {newPatient.firstVisit}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120} className="mt-8">
          <a href={contact.bookingHref} className="btn btn-ink px-5">
            Book your first visit
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
