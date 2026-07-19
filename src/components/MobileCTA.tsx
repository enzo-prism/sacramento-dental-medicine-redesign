"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Phone } from "lucide-react";
import { contact } from "@/data/site";

export function MobileCTA() {
  const [visitInView, setVisitInView] = useState(false);

  useEffect(() => {
    const visit = document.querySelector("#visit");
    if (!visit) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisitInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(visit);
    return () => observer.disconnect();
  }, []);

  if (visitInView) return null;

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
