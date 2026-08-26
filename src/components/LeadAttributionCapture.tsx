"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { persistFirstTouchFromLocation } from "@/lib/lead-attribution";

/** Persist first-touch ad tags on every public page, including later navigations. */
export function LeadAttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    persistFirstTouchFromLocation();
  }, [pathname]);

  return null;
}
