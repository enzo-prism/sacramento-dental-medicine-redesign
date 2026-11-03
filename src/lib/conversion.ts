import {
  CLICK_TO_CALL,
  CLICK_TO_EMAIL,
  GENERATE_LEAD,
  JARVIS_BOOKING_START,
} from "./analytics.ts";
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

/**
 * Maps a clicked link's href to its contact conversion: `tel:` is
 * `click_to_call` and `mailto:` is `click_to_email`. Anything else is null.
 */
export function contactClickEvent(href: string | null | undefined) {
  const scheme = href?.trim().slice(0, 7).toLowerCase() ?? "";
  if (scheme.startsWith("tel:")) return CLICK_TO_CALL;
  if (scheme === "mailto:") return CLICK_TO_EMAIL;
  return null;
}

/**
 * Fires the contact conversion for a clicked link. Only the event name is
 * sent: never the number, address, link text, or page.
 */
export function recordContactClick(
  href: string | null | undefined,
  deps: TrackDeps = {},
): boolean {
  const event = contactClickEvent(href);
  return event ? trackAllowedCustomEvent(event, deps) : false;
}

/** Marks the Jarvis booking iframe on `/schedule`. */
export const JARVIS_FRAME_ATTRIBUTE = "data-jarvis-scheduler";

type FocusTarget = {
  tagName?: string;
  hasAttribute?: (name: string) => boolean;
} | null;

/**
 * Returns a recorder that fires `jarvis_booking_start` the first time focus
 * moves into the Jarvis frame (a click or tab into the scheduler). The frame
 * is cross-origin, so completed bookings are not visible here; count those in
 * Jarvis.
 */
export function createJarvisBookingStartRecorder(deps: TrackDeps = {}) {
  let recorded = false;
  return (active: FocusTarget): boolean => {
    if (recorded || !active || active.tagName?.toUpperCase() !== "IFRAME") return false;
    if (!active.hasAttribute?.(JARVIS_FRAME_ATTRIBUTE)) return false;
    recorded = true;
    return trackAllowedCustomEvent(JARVIS_BOOKING_START, deps);
  };
}
