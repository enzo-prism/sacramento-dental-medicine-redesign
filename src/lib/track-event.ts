import { track } from "@vercel/analytics";
import { isAllowedCustomAnalyticsEvent } from "./analytics.ts";

type TrackDeps = {
  vercelTrack?: (name: string) => void;
  googleEvent?: (name: string) => void;
};

/**
 * Fires an allowlisted custom event with no properties.
 * Never attach phone numbers, emails, names, or other PII.
 */
export function trackAllowedCustomEvent(name: string, deps: TrackDeps = {}): boolean {
  if (!isAllowedCustomAnalyticsEvent(name)) return false;

  (deps.vercelTrack ?? track)(name);

  if (deps.googleEvent) {
    deps.googleEvent(name);
  } else if (typeof window !== "undefined") {
    window.__sacramentoGoogleAnalyticsController?.event(name);
  }

  return true;
}
