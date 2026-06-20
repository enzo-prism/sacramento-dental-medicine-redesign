import Image from "next/image";
import { ArrowRight, CalendarDays, Clock3, MapPin, Phone } from "lucide-react";
import { contact, hours, imagery, navItems } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="grain absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="container-x relative py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-3" aria-label="Home">
              <span className="grid size-11 place-items-center rounded-xl bg-white">
                <Image
                  src={imagery.logo}
                  alt=""
                  width={36}
                  height={28}
                  unoptimized
                  className="h-7 w-auto"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] font-semibold tracking-[0.22em] text-white/68">
                  ANTELOPE · CA
                </span>
                <span className="font-display text-lg font-medium">
                  Sacramento Dental Medicine
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/74">
              {contact.tagline}. Comfort-first, clarity-first, always.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a href={contact.bookingHref} className="btn btn-primary h-11 px-4 text-sm">
                <CalendarDays className="size-4" />
                Book online
              </a>
              <a
                href={contact.phoneHref}
                className="btn btn-ghost-light h-11 px-4 text-sm"
              >
                <Phone className="size-4" />
                {contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/62">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/72 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/62">
              Visit
            </p>
            <address className="mt-4 not-italic text-sm leading-7 text-white/72">
              {contact.addressLine1}
              <br />
              {contact.addressLine2}
            </address>
            <a
              href={contact.mapsHref}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gold-bright)]"
            >
              <MapPin className="size-4" />
              Get directions
              <ArrowRight className="size-3.5" />
            </a>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/62">
              Hours
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-white/72">
              {hours.slice(0, 5).map((row) => (
                <li key={row.day} className="flex justify-between gap-3">
                  <span className="text-white/68">{row.day.slice(0, 3)}</span>
                  <span>{row.time}</span>
                </li>
              ))}
              <li className="flex items-center gap-1.5 pt-2 text-white/62">
                <Clock3 className="size-3.5" />
                Sat – Sun: Closed
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/62 sm:flex-row sm:items-center">
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
    </footer>
  );
}
