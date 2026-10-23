"use client";

import { useEffect } from "react";
import { recordClickToCall } from "@/lib/conversion";

/** Tracks `tel:` clicks on this document as `click_to_call`. No PII. */
export function ConversionClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("a[href^='tel:']")) return;
      recordClickToCall();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
