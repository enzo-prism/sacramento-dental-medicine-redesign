"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, ChevronRight, Menu, Phone, X } from "lucide-react";
import { contact, imagery, navItems } from "@/data/site";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSectionHref, setActiveSectionHref] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeAndRefocus = () => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    let frame = 0;
    const updateHeaderState = () => {
      setScrolled(window.scrollY > 24);
      if (pathname !== "/") {
        setActiveSectionHref(null);
        return;
      }

      const threshold = 150;
      const active = navItems
        .filter((item) => item.href.startsWith("/#"))
        .map((item) => ({
          href: item.href,
          element: document.getElementById(item.href.slice(2)),
        }))
        .filter((item) => item.element)
        .findLast((item) => item.element!.getBoundingClientRect().top <= threshold);
      setActiveSectionHref(active?.href ?? null);
    };
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateHeaderState);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, [pathname]);

  function isActive(href: string) {
    if (href.startsWith("/#")) return pathname === "/" && href === activeSectionHref;
    return href === pathname;
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const frame = window.requestAnimationFrame(() => {
      const firstFocusable = menuRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      firstFocusable?.focus();
    });

    window.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
    };
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
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${contact.practiceName} home`}
        >
          <span className="grid size-10 place-items-center rounded-xl bg-brand-tint lg:size-11">
            <Image
              src={imagery.logo}
              alt=""
              width={40}
              height={40}
              className="h-8 w-8 lg:h-9 lg:w-9"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-[10px] font-semibold tracking-[0.22em] text-ink-faint lg:text-[11px]">
              ANTELOPE · CA
            </span>
            <span className="hidden font-display text-base font-semibold tracking-tight text-ink sm:block sm:text-lg">
              Sacramento Dental Medicine
            </span>
            <span className="block font-display text-base font-semibold tracking-tight text-ink sm:hidden">
              {contact.shortName}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-ink-soft lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? (item.href.startsWith("/#") ? "location" : "page") : undefined}
                className={`rounded-lg px-3 py-2 transition hover:bg-wash hover:text-ink ${
                  active ? "bg-wash text-ink" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a href={contact.phoneHref} className="btn btn-outline h-10 px-3.5 text-sm">
            <Phone className="size-4" />
            {contact.phoneDisplay}
          </a>
          <Link href={contact.bookingHref} className="btn btn-primary h-10 px-4 text-sm">
            Book online
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-xl border border-line bg-white text-ink shadow-sm lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
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
          <div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="mobile-menu-panel container-x pb-6 pt-1"
          >
            <nav className="surface-card flex flex-col gap-1 p-3">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? (item.href.startsWith("/#") ? "location" : "page") : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-ink transition hover:bg-wash ${
                      active ? "bg-wash" : ""
                    }`}
                  >
                    {item.label}
                    <ChevronRight className="size-4 text-ink-faint" />
                  </Link>
                );
              })}
              <a
                href={contact.phoneHref}
                onClick={() => setMenuOpen(false)}
                className="btn btn-outline mt-2 h-12 w-full"
              >
                <Phone className="size-4" />
                {contact.phoneDisplay}
              </a>
              <Link
                href={contact.bookingHref}
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary mt-2 h-12 w-full"
              >
                <CalendarDays className="size-4" />
                Book online
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
