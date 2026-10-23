import { CLICK_TO_CALL, GENERATE_LEAD } from "./analytics.ts";
import { OPENAI_LEAD_EVENT, UUID_V4 } from "./openai-measurement.ts";
import { trackAllowedCustomEvent } from "./track-event.ts";

type TrackDeps = {
  vercelTrack?: (name: string) => void;
  googleEvent?: (name: string) => void;
};

export type LeadConversionState = {
  ok: boolean;
  measurementEventId?: string;
  measurementClickReference?: string;
  measurementConsentEpoch?: string;
};

export type LeadConversionResult = {
  generateLead: boolean;
  openaiLead: boolean;
};

/**
 * Fires `generate_lead` once for an accepted appointment request.
 * Also dispatches `sdm:openai-lead` when the consent epoch still matches,
 * which is the only hook the existing OpenAI iframe listens for.
 * Failed, honeypot, and test acceptances (no event id) fire nothing.
 */
export function recordLeadConversion(
  state: LeadConversionState,
  deps: TrackDeps & {
    consentEpoch?: string;
    seen: Set<string>;
    dispatch?: (event: Event) => boolean;
  },
): LeadConversionResult {
  if (!state.ok) return { generateLead: false, openaiLead: false };

  const eventId = state.measurementEventId;
  if (!eventId || !UUID_V4.test(eventId) || deps.seen.has(eventId)) {
    return { generateLead: false, openaiLead: false };
  }

  deps.seen.add(eventId);
  const generateLead = trackAllowedCustomEvent(GENERATE_LEAD, deps);

  const consentEpoch = state.measurementConsentEpoch;
  if (!consentEpoch || consentEpoch !== deps.consentEpoch) {
    return { generateLead, openaiLead: false };
  }

  const event = new CustomEvent(OPENAI_LEAD_EVENT, {
    detail: {
      eventId,
      clickReference: state.measurementClickReference ?? "",
      consentEpoch,
    },
  });
  if (deps.dispatch) deps.dispatch(event);
  else if (typeof window !== "undefined") window.dispatchEvent(event);

  return { generateLead, openaiLead: true };
}

/** Fires `click_to_call` for a `tel:` click. No phone number is attached. */
export function recordClickToCall(deps: TrackDeps = {}): boolean {
  return trackAllowedCustomEvent(CLICK_TO_CALL, deps);
}
