"use client";

import { useEffect, useState } from "react";
import {
  ATTRIBUTION_FIELD_NAMES,
  emptyAttribution,
  persistFirstTouchFromLocation,
  type FirstTouchAttribution,
} from "@/lib/lead-attribution";

export function LeadAttributionHiddenFields() {
  const [attribution, setAttribution] = useState<FirstTouchAttribution>(emptyAttribution);

  useEffect(() => {
    setAttribution(persistFirstTouchFromLocation());
  }, []);

  return (
    <div hidden>
      {ATTRIBUTION_FIELD_NAMES.map((field) => (
        <input key={field} type="hidden" name={field} value={attribution[field]} />
      ))}
    </div>
  );
}
