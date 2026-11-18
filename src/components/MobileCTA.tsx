"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Phone } from "lucide-react";
import { contact } from "@/data/site";

export function MobileCTA({
  bookHref = contact.bookingHref,
  bookLabel = "Book online",
  callFirst = false,
}: {
  bookHref?: string;
  bookLabel?: string;
  callFirst?: boolean;
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const nodes = [
      ...document.querySelectorAll("[data-mobile-cta-stop], footer"),
    ];
    if (nodes.length === 0 || typeof IntersectionObserver === "undefined") return;

    const seen = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          seen.set(entry.target, entry.isIntersecting);
        }
        setHidden([...seen.values()].some(Boolean));
      },
      { threshold: 0.12 },
    );
    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <nav aria-label="Quick actions" className="mobile-cta lg:hidden">
      <a href={contact.phoneHref} className={callFirst ? "mobile-cta-primary" : "mobile-cta-secondary"}>
        <Phone className="size-4" />
        {callFirst ? "Call first" : "Call"}
      </a>
      <Link href={bookHref} className={callFirst ? "mobile-cta-secondary" : "mobile-cta-primary"}>
        <CalendarDays className="size-4" />
        {callFirst ? "Non-urgent visit" : bookLabel}
      </Link>
    </nav>
  );
}
