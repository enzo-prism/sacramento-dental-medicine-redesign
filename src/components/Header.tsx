"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, ChevronRight, Menu, Phone, X } from "lucide-react";
import { contact, imagery, navItems } from "@/data/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container-x flex items-center justify-between py-3.5">
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label={`${contact.practiceName} home`}
        >
          <span className="grid size-9 place-items-center rounded-lg bg-white shadow-sm transition group-hover:shadow-md lg:size-10">
            <Image
              src={imagery.logo}
              alt=""
              width={30}
              height={24}
              unoptimized
              className="h-6 w-auto lg:h-7"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-[10px] font-semibold tracking-[0.22em] text-white/70 lg:text-[11px]">
              ANTELOPE · CA
            </span>
            <span className="block font-display text-base font-medium tracking-tight sm:text-lg">
              Sacramento Dental Medicine
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 text-sm font-medium text-white/72 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 transition hover:bg-white/8 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={contact.phoneHref}
            className="btn btn-ghost-light h-10 px-3.5 text-sm"
          >
            <Phone className="size-4" />
            {contact.phoneDisplay}
          </a>
          <a href={contact.bookingHref} className="btn btn-primary h-10 px-4 text-sm">
            Book online
            <ArrowRight className="size-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-lg border border-white/20 bg-white/8 text-white lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 top-[64px] z-[-1] bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="mobile-menu-panel container-x pb-6 pt-1">
            <nav className="surface-card flex flex-col gap-1 p-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-ink hover:bg-paper-2"
                >
                  {item.label}
                  <ChevronRight className="size-4 text-ink-faint" />
                </a>
              ))}
              <a
                href={contact.phoneHref}
                onClick={() => setMenuOpen(false)}
                className="btn btn-outline mt-2 h-12 w-full"
              >
                <Phone className="size-4" />
                {contact.phoneDisplay}
              </a>
              <a
                href={contact.bookingHref}
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary mt-2 h-12 w-full"
              >
                <CalendarDays className="size-4" />
                Book online
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
