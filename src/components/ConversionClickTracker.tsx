"use client";

import { useEffect } from "react";
import { recordContactClick, recordSchedulerLinkClick } from "@/lib/conversion";

/**
 * Records contact clicks and entry into the on-site scheduler.
 * Mounted once in the root layout. No contact details or URLs are sent.
 */
export function ConversionClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!recordContactClick(href)) recordSchedulerLinkClick(href);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
