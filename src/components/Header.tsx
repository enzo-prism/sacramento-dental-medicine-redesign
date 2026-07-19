"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, ChevronRight, Menu, Phone, X } from "lucide-react";
import { contact, imagery, navItems } from "@/data/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeAndRefocus = () => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) document.documentElement.dataset.menuOpen = "true";
    else delete document.documentElement.dataset.menuOpen;
    return () => {
      delete document.documentElement.dataset.menuOpen;
    };
  }, [menuOpen]);

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
          <span className="grid size-10 place-items-center rounded-xl bg-night shadow-[0_10px_24px_-12px_rgba(10,20,36,0.5)] transition group-hover:shadow-[0_14px_30px_-12px_rgba(10,20,36,0.6)] lg:size-11">
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
            <span className="block text-[10px] font-semibold tracking-[0.22em] text-ink-faint lg:text-[11px]">
              ANTELOPE · CA
            </span>
            <span className="block font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
              Sacramento Dental Medicine
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 text-sm font-medium text-ink-soft lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 transition hover:bg-wash hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={contact.phoneHref}
            className="btn btn-outline h-10 px-3.5 text-sm"
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
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-xl border border-line bg-white text-ink shadow-sm lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? "mobile-menu" : undefined}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="lg:hidden">
          <div
            className="fixed inset-x-0 top-[64px] z-[-1] h-[100dvh] bg-ink/30 backdrop-blur-sm"
            onClick={closeAndRefocus}
            aria-hidden="true"
          />
          <div id="mobile-menu" className="mobile-menu-panel container-x pb-6 pt-1">
            <nav className="surface-card flex flex-col gap-1 p-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-ink transition hover:bg-wash"
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
