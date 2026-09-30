"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isGoogleAnalyticsProductionHostname } from "@/lib/google-analytics";
import {
  OPENAI_LEAD_EVENT, OPENAI_CONSENT_EVENT, OPENAI_CONSENT_KEY, OPENAI_CONSENT_EPOCH_KEY,
  measurementAllowed, measurementConsentEpoch, resetMemoryChoice, measurementClickReference, validClickReference, UUID_V4,
} from "@/lib/openai-measurement";

type Transport = {
  reference: string;
  channel: string;
  frame?: HTMLIFrameElement;
  ready: boolean;
  attempts: number;
  loadTimer?: number;
  retryTimer?: number;
};

/** The vendor runs in opaque frames, never in the document containing the form. */
export const OpenAIAdsMeasurement = () => {
  const pathname = usePathname();
  useEffect(() => { measurementClickReference(); }, [pathname]);

  // RootLayout owns pending accepted events for this document's lifetime.
  // Each request's immutable reference gets its own isolated SDK transport;
  // expiry/new clicks never reattribute a previously accepted pending request.
  useEffect(() => {
    const pixelId = process.env.NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID?.trim() ?? "";
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(pixelId)
      || !(isGoogleAnalyticsProductionHostname(window.location.hostname)
        || (["localhost", "127.0.0.1"].includes(window.location.hostname) && pixelId === "playwright-test-pixel"))) return;
    let disposed = false;
    let frameNumber = 0;
    let activeEpoch = "";
    const pending = new Map<string, string>();
    const seen = new Set<string>();
    const transports = new Map<string, Transport>();
    const remove = (transport: Transport) => {
      window.clearTimeout(transport.loadTimer);
      window.clearTimeout(transport.retryTimer);
      transport.frame?.remove();
      transport.frame = undefined;
      transport.ready = false;
    };
    const allowed = () => {
      if (disposed) return false;
      if (measurementAllowed()) {
        const epoch = measurementConsentEpoch();
        if (epoch !== activeEpoch) {
          pending.clear();
          for (const transport of transports.values()) remove(transport);
          transports.clear();
          activeEpoch = epoch;
        }
        return true;
      }
      pending.clear();
      for (const transport of transports.values()) remove(transport);
      transports.clear();
      return false;
    };
    const flush = (transport: Transport) => {
      if (!transport.ready || !transport.frame?.contentWindow || !allowed()) return;
      for (const [eventId, reference] of pending) {
        if (reference !== transport.reference) continue;
        transport.frame.contentWindow.postMessage({ type: "sdm:openai-lead", channel: transport.channel, eventId }, "*");
      }
    };
    const recover = (transport: Transport) => {
      remove(transport);
      if (allowed() && transport.attempts < 3) transport.retryTimer = window.setTimeout(() => initialize(transport), transport.attempts * 1000);
    };
    function initialize(transport: Transport) {
      if (!allowed() || transports.get(transport.reference) !== transport || transport.frame || transport.attempts >= 3) return;
      transport.attempts++;
      transport.channel = crypto.randomUUID();
      const url = new URL("/measurement/openai.html", window.location.origin);
      url.searchParams.set("pixel_id", pixelId);
      url.searchParams.set("channel", transport.channel);
      if (transport.reference) url.searchParams.set("oppref", transport.reference);
      const frame = document.createElement("iframe");
      frameNumber++;
      frame.id = `openai-ads-measurement-frame${frameNumber === 1 ? "" : `-${frameNumber}`}`;
      frame.dataset.openaiMeasurementFrame = "true";
      frame.title = "Campaign measurement";
      frame.hidden = true;
      frame.setAttribute("aria-hidden", "true");
      frame.setAttribute("sandbox", "allow-scripts");
      frame.referrerPolicy = "no-referrer";
      frame.src = url.toString();
      frame.onerror = () => recover(transport);
      transport.frame = frame;
      document.body.appendChild(frame);
      transport.loadTimer = window.setTimeout(() => recover(transport), 35000);
    }
    const ensure = (reference: string) => {
      let transport = transports.get(reference);
      if (!transport) {
        transport = { reference, channel: "", ready: false, attempts: 0 };
        transports.set(reference, transport);
      }
      initialize(transport);
      flush(transport);
    };
    const handleMessage = (event: MessageEvent) => {
      if (!allowed() || event.origin !== "null" || !event.data) return;
      const transport = [...transports.values()].find(candidate => candidate.frame?.contentWindow === event.source && candidate.channel === event.data.channel);
      if (!transport) return;
      if (event.data.type === "sdm:openai-ready") {
        window.clearTimeout(transport.loadTimer);
        transport.ready = true;
        flush(transport);
      } else if (event.data.type === "sdm:openai-queued" && typeof event.data.eventId === "string"
        && pending.get(event.data.eventId) === transport.reference) {
        // Queue acknowledgment is not vendor ingestion confirmation.
        pending.delete(event.data.eventId);
      } else if (event.data.type === "sdm:openai-error") recover(transport);
    };
    const syncConsent = () => { if (allowed()) ensure(measurementClickReference()); };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === OPENAI_CONSENT_KEY || event.key === OPENAI_CONSENT_EPOCH_KEY) {
        if (event.key === OPENAI_CONSENT_KEY && event.newValue === "denied") {
          pending.clear();
          for (const transport of transports.values()) remove(transport);
          transports.clear();
        }
        resetMemoryChoice(); syncConsent();
      }
    };
    const handleLeadConfirmed = (event: Event) => {
      const detail = (event as CustomEvent<{ eventId?: unknown; clickReference?: unknown; consentEpoch?: unknown }>).detail;
      if (!allowed() || !detail?.consentEpoch || detail.consentEpoch !== measurementConsentEpoch() || typeof detail?.eventId !== "string" || !UUID_V4.test(detail.eventId) || seen.has(detail.eventId)) return;
      const reference = detail.clickReference === "" ? "" : validClickReference(detail.clickReference);
      if (detail.clickReference !== reference) return;
      seen.add(detail.eventId);
      pending.set(detail.eventId, reference);
      ensure(reference);
    };
    window.addEventListener("message", handleMessage);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", syncConsent);
    document.addEventListener("visibilitychange", syncConsent);
    window.addEventListener(OPENAI_CONSENT_EVENT, syncConsent);
    window.addEventListener(OPENAI_LEAD_EVENT, handleLeadConfirmed);
    syncConsent();
    return () => {
      disposed = true;
      pending.clear();
      for (const transport of transports.values()) remove(transport);
      transports.clear();
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", syncConsent);
      document.removeEventListener("visibilitychange", syncConsent);
      window.removeEventListener(OPENAI_CONSENT_EVENT, syncConsent);
      window.removeEventListener(OPENAI_LEAD_EVENT, handleLeadConfirmed);
    };
  }, []);
  return null;
};
