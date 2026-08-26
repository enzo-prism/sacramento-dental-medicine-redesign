"use client";

import { useEffect, useRef } from "react";
import {
  ATTRIBUTION_FIELD_NAMES,
  persistFirstTouchFromLocation,
} from "@/lib/lead-attribution";

export function LeadAttributionHiddenFields() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const attribution = persistFirstTouchFromLocation();
    const root = rootRef.current;
    if (!root) return;

    for (const field of ATTRIBUTION_FIELD_NAMES) {
      const input = root.querySelector<HTMLInputElement>(`input[name="${field}"]`);
      if (input) input.value = attribution[field];
    }
  }, []);

  return (
    <div hidden ref={rootRef}>
      {ATTRIBUTION_FIELD_NAMES.map((field) => (
        <input key={field} type="hidden" name={field} defaultValue="" />
      ))}
    </div>
  );
}
