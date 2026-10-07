import { ArrowRight, CalendarDays, Phone } from "lucide-react";
import { BookingLink } from "@/components/BookingLink";
import { ScrollReveal } from "@/components/ScrollReveal";
import { contact } from "@/data/site";

export function ScheduleCTA() {
  return (
    <section data-mobile-cta-stop className="night-band py-16 sm:py-20">
      <div className="container-x">
        <ScrollReveal
          variant="fade"
          className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <div>
            <p className="eyebrow text-[#d5e1f4]">Ready when you are</p>
            <h2 className="mt-5 max-w-2xl font-display text-balance text-[clamp(2rem,4.2vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-white">
              Book a visit on your own time.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-white/70 md:text-lg md:leading-8">
              Open the online scheduler to choose a visit, or call the office
              and the front desk will help you find a time.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <BookingLink location="schedule_cta" className="btn btn-primary h-12 px-5 text-base">
              <CalendarDays className="size-5" aria-hidden="true" />
              Schedule online
              <ArrowRight className="size-4" aria-hidden="true" />
            </BookingLink>
            <a href={contact.phoneHref} className="btn btn-ghost-light h-12 px-5 text-base">
              <Phone className="size-5" aria-hidden="true" />
              Call {contact.phoneDisplay}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
