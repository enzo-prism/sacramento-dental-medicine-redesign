import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, Phone } from "lucide-react";
import { contact, hours, imagery, navItems } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-night text-white">
      <div className="container-x relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <a
              href="#top"
              className="inline-block"
              aria-label="Sacramento Dental Medicine — home"
            >
              <Image
                src={imagery.logoFull}
                alt="Sacramento Dental Medicine"
                width={278}
                height={209}
                unoptimized
                className="h-auto w-[132px]"
              />
            </a>
            <p className="mt-6 max-w-xs text-sm leading-7 text-white/70">
              {contact.tagline}. Comfort-first, clarity-first, always.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a href={contact.bookingHref} className="btn btn-primary">
                <CalendarDays className="size-4" />
                Book online
              </a>
              <a href={contact.phoneHref} className="btn btn-ghost-light">
                <Phone className="size-4" />
                {contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-block py-2 text-white/70 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              Visit
            </p>
            <address className="mt-4 not-italic text-sm leading-7 text-white/70">
              {contact.addressLine1}
              <br />
              {contact.addressLine2}
            </address>
            <a
              href={contact.mapsHref}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-white"
            >
              <MapPin className="size-4" />
              Get directions
              <ArrowRight className="size-3.5" />
            </a>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
              Hours
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-white/70">
              {hours.map((row) => (
                <li key={row.day} className="flex justify-between gap-3">
                  <span className="text-white/60">{row.day}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {contact.practiceName}. All rights
            reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Serving {contact.serviceArea.slice(0, 4).join(" · ")}</span>
            <span className="hidden sm:inline">·</span>
            <span>Designed with care in Antelope, CA</span>
          </p>
        </div>
      </div>

      {/* Watermark — quiet display-type signature at the very bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative select-none"
      >
        <p className="translate-y-[18%] whitespace-nowrap text-center font-display text-[11vw] font-semibold leading-[0.82] tracking-[-0.04em] text-white/[0.04]">
          Sacramento Dental
        </p>
      </div>
    </footer>
  );
}
