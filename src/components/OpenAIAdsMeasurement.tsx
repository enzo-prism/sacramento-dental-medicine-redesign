"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isGoogleAnalyticsProductionHostname } from "@/lib/google-analytics";
import {
  OPENAI_LEAD_EVENT, OPENAI_CONSENT_EVENT, OPENAI_CONSENT_KEY,
  measurementAllowed, resetMemoryChoice, measurementClickReference,
} from "@/lib/openai-measurement";

const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const MAX_FRAME_ATTEMPTS = 3;

/** The vendor runs in an opaque frame, never in the document containing the form. */
export const OpenAIAdsMeasurement = () => {
  const pathname = usePathname();

  useEffect(() => { measurementClickReference(); }, [pathname]);

  // RootLayout owns this queue for the full document lifetime. Client route
  // changes must not discard an accepted request while the SDK is loading.
  useEffect(() => {
    const pixelId = process.env.NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID?.trim() ?? '';
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(pixelId)
      || !(isGoogleAnalyticsProductionHostname(window.location.hostname)
        || (["localhost", "127.0.0.1"].includes(window.location.hostname) && pixelId === "playwright-test-pixel"))) return;

    let frame: HTMLIFrameElement | undefined;
    let channel = '';
    let ready = false;
    let attempts = 0;
    let retryTimer: number | undefined;
    let loadTimer: number | undefined;
    let disposed = false;
    const pending = new Set<string>();
    const seen = new Set<string>();

    measurementClickReference();
    const allowed = () => {
      if (disposed) return false;
      if (measurementAllowed()) return true;
      pending.clear();
      removeFrame();
      return false;
    };

    const removeFrame = () => {
      window.clearTimeout(loadTimer);
      window.clearTimeout(retryTimer);
      frame?.remove();
      frame = undefined;
      ready = false;
    };

    const flush = () => {
      if (!ready || !frame?.contentWindow || !allowed()) return;
      for (const eventId of pending) {
        // An opaque sandbox has no addressable origin. This targets only our
        // frame's WindowProxy; the frame authenticates source, origin and channel.
        frame.contentWindow.postMessage({ type: 'sdm:openai-lead', channel, eventId }, '*');
      }
    };

    const recover = () => {
      removeFrame();
      if (allowed() && attempts < MAX_FRAME_ATTEMPTS) {
        retryTimer = window.setTimeout(initialize, attempts * 1_000);
      }
    };

    function initialize() {
      if (!allowed() || frame || attempts >= MAX_FRAME_ATTEMPTS) return;
      attempts += 1;
      channel = crypto.randomUUID();
      const url = new URL('/measurement/openai.html', window.location.origin);
      url.searchParams.set('pixel_id', pixelId);
      url.searchParams.set('channel', channel);
      const oppref = measurementClickReference();
      if (oppref) url.searchParams.set("oppref", oppref);
      frame = document.createElement('iframe');
      frame.id = 'openai-ads-measurement-frame';
      frame.title = 'Campaign measurement';
      frame.hidden = true;
      frame.setAttribute('aria-hidden', 'true');
      frame.setAttribute('sandbox', 'allow-scripts');
      frame.referrerPolicy = 'no-referrer';
      frame.src = url.toString();
      frame.onerror = recover;
      document.body.appendChild(frame);
      // The child owns three 10-second script attempts plus 1s/2s backoff.
      loadTimer = window.setTimeout(recover, 35_000);
    }

    const handleMessage = (event: MessageEvent) => {
      if (!frame || event.source !== frame.contentWindow || event.origin !== 'null'
        || !event.data || event.data.channel !== channel || !allowed()) return;
      if (event.data.type === 'sdm:openai-ready') {
        window.clearTimeout(loadTimer);
        ready = true;
        flush();
      } else if (event.data.type === 'sdm:openai-queued'
        && typeof event.data.eventId === 'string') {
        pending.delete(event.data.eventId);
      } else if (event.data.type === 'sdm:openai-error') recover();
    };

    const syncConsent = () => {
      if (allowed()) initialize();
      else {
        removeFrame();
        pending.clear(); // Never replay a conversion after consent was withdrawn.
        attempts = 0;
      }
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === OPENAI_CONSENT_KEY) {
        resetMemoryChoice();
        syncConsent();
      }
    };
    const handleLeadConfirmed = (event: Event) => {
      const eventId = (event as CustomEvent<{ eventId?: unknown }>).detail?.eventId;
      if (!allowed() || typeof eventId !== 'string' || !UUID.test(eventId) || seen.has(eventId)) return;
      seen.add(eventId);
      pending.add(eventId);
      initialize();
      flush();
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', syncConsent);
    document.addEventListener('visibilitychange', syncConsent);
    window.addEventListener(OPENAI_CONSENT_EVENT, syncConsent);
    window.addEventListener(OPENAI_LEAD_EVENT, handleLeadConfirmed);
    initialize();
    return () => {
      disposed = true;
      removeFrame();
      pending.clear();
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', syncConsent);
      document.removeEventListener('visibilitychange', syncConsent);
      window.removeEventListener(OPENAI_CONSENT_EVENT, syncConsent);
      window.removeEventListener(OPENAI_LEAD_EVENT, handleLeadConfirmed);
    };
  }, []);

  return null;
};
