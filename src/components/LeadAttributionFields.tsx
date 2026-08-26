"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  ATTRIBUTION_FIELD_NAMES,
  getAttributionSnapshot,
  getEmptyAttributionSnapshot,
  refreshAttributionSnapshot,
  subscribeAttributionSnapshot,
} from "@/lib/lead-attribution";

export function LeadAttributionHiddenFields() {
  const attribution = useSyncExternalStore(
    subscribeAttributionSnapshot,
    getAttributionSnapshot,
    getEmptyAttributionSnapshot,
  );

  useEffect(() => {
    refreshAttributionSnapshot();
  }, []);

  return (
    <div hidden>
      {ATTRIBUTION_FIELD_NAMES.map((field) => (
        <input
          key={field}
          type="hidden"
          name={field}
          value={attribution[field]}
          readOnly
        />
      ))}
    </div>
  );
}
