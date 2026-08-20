"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Phone } from "lucide-react";
import { contact } from "@/data/site";

export function MobileCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const visit = document.querySelector("#visit");
    const footer = document.querySelector("footer");
    const nodes = [visit, footer].filter(Boolean) as Element[];
    if (nodes.length === 0) return;

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
      <a href={contact.phoneHref} className="mobile-cta-secondary">
        <Phone className="size-4" />
        Call
      </a>
      <a href={contact.bookingHref} className="mobile-cta-primary">
        <CalendarDays className="size-4" />
        Book online
      </a>
    </nav>
  );
}
