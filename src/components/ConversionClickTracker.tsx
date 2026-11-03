"use client";

import { useEffect } from "react";
import { recordContactClick } from "@/lib/conversion";

/**
 * Site-wide: tracks `tel:` clicks as `click_to_call` and `mailto:` clicks as
 * `click_to_email`. Mounted once in the root layout. No PII.
 */
export function ConversionClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href^='tel:'], a[href^='mailto:']");
      if (!link) return;
      recordContactClick(link.getAttribute("href"));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
