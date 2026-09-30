"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  measurementChoice, OPENAI_CONSENT_EVENT, OPENAI_SETTINGS_EVENT,
  OPENAI_CONSENT_KEY, resetMemoryChoice, setMeasurementChoice,
} from "@/lib/openai-measurement";

function subscribe(listener: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key === null || event.key === OPENAI_CONSENT_KEY) { resetMemoryChoice(); listener(); }
  };
  window.addEventListener(OPENAI_CONSENT_EVENT, listener);
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener(OPENAI_CONSENT_EVENT, listener);
    window.removeEventListener("storage", storage);
  };
}

export function OpenAIMeasurementChoice() {
  const choice = useSyncExternalStore(subscribe, measurementChoice, () => "");
  const [editing, setEditing] = useState(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  useEffect(() => {
    const open = () => setEditing(true);
    window.addEventListener(OPENAI_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPENAI_SETTINGS_EVENT, open);
  }, []);
  if (!process.env.NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID || !mounted || (choice && !editing)) return null;
  const choose = (value: "granted" | "denied") => { setMeasurementChoice(value); setEditing(false); };
  return (
    <section aria-label="Advertising measurement choice" className="fixed bottom-24 left-4 right-4 z-50 max-w-md rounded-2xl border border-line bg-white p-5 text-sm text-ink shadow-lg lg:bottom-6">
      <p className="font-semibold">Optional advertising measurement</p>
      <p className="mt-2 leading-6 text-ink-soft">
        Allow OpenAI Ads to measure a completed appointment request using a random event ID and an ad click reference, when available?
        If allowed, we store the ad click reference for up to 30 days.
        Your name, contact details, visit selection and notes are not sent to OpenAI.
        You can change this choice in Privacy Practices.
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => choose("granted")} className="btn btn-primary px-4 py-2">Allow</button>
        <button type="button" onClick={() => choose("denied")} className="btn btn-secondary px-4 py-2">Decline</button>
      </div>
    </section>
  );
}

export function OpenAIMeasurementSettings() {
  return <button type="button" className="btn btn-secondary mt-5 px-4 py-2" onClick={() => window.dispatchEvent(new Event(OPENAI_SETTINGS_EVENT))}>Advertising measurement settings</button>;
}
