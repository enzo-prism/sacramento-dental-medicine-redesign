/** This module never exposes appointment fields to the vendor SDK. */
export const OPENAI_CONSENT_KEY = "sdm_openai_measurement_consent_v1";
export const OPENAI_CONSENT_EVENT = "sdm:openai-consent";
export const OPENAI_SETTINGS_EVENT = "sdm:openai-settings";
export const OPENAI_LEAD_EVENT = "sdm:openai-lead";
export const OPENAI_CLICK_KEY = "sdm_openai_click_v1";
export type MeasurementChoice = "granted" | "denied" | "";
export const UUID_V4 = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;

export function validClickReference(value: unknown): string {
  return typeof value === "string" && value.length <= 2048 && value.length > 0
    && !/[\u0000-\u0020\u007f]/.test(value) ? value : "";
}

export function isMeasurementTest(name: string, email: string, explicit = "") {
  return explicit === "true" || /^(?:codex tracking test|sdm launch test)\b/i.test(name)
    || /@(?:example\.(?:com|org|net)|test\.invalid)$/i.test(email);
}

export function acceptedMeasurementEventId(accepted: boolean, isTest: boolean, id: string) {
  return accepted && !isTest && UUID_V4.test(id) ? id : undefined;
}

export const OPENAI_CLICK_LIFETIME_MS = 30 * 24 * 60 * 60 * 1000;
export type MeasurementClickRecord = { version: 1; reference: string; capturedAt: number };

export function parseMeasurementClickRecord(raw: string | null, now = Date.now()): MeasurementClickRecord | null {
  try {
    const record = JSON.parse(raw ?? "null") as Partial<MeasurementClickRecord> | null;
    if (!record || record.version !== 1 || !validClickReference(record.reference)
      || typeof record.capturedAt !== "number" || !Number.isFinite(record.capturedAt)
      || record.capturedAt <= 0 || record.capturedAt > now
      || record.capturedAt + OPENAI_CLICK_LIFETIME_MS <= now) return null;
    return { version: 1, reference: record.reference!, capturedAt: record.capturedAt };
  } catch { return null; }
}

let memoryChoice: MeasurementChoice = "";
let storageUnavailable = false;
let memoryClick: MeasurementClickRecord | null = null;
let lastUrlReference = "";
// A failed storage delete must never restore an old reference in this document.
let clicksRevoked = false;
function clearPersistedClick() {
  try { window.localStorage.removeItem(OPENAI_CLICK_KEY); } catch { /* Unavailable storage. */ }
  try { window.sessionStorage.removeItem(OPENAI_CLICK_KEY); } catch { /* Remove old session-only records too. */ }
}
export function purgeMeasurementClick() {
  memoryClick = null;
  lastUrlReference = "";
  clicksRevoked = true;
  clearPersistedClick();
}
function privacyRestricted() {
  return measurementChoice() === "denied" || navigator.doNotTrack === "1"
    || Boolean((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl);
}
export function measurementClickReference() {
  if (privacyRestricted()) { purgeMeasurementClick(); return ""; }
  const now = Date.now();
  const current = validClickReference(new URLSearchParams(window.location.search).get("oppref"));
  // A new actual URL identifier wins. Looking up the same memory/stored record
  // does not extend its timestamp. No reference is written before permission.
  if (current && current !== lastUrlReference) {
    lastUrlReference = current;
    memoryClick = { version: 1, reference: current, capturedAt: now };
    clicksRevoked = false;
  }
  if (memoryClick && !parseMeasurementClickRecord(JSON.stringify(memoryClick), now)) memoryClick = null;
  if (!measurementAllowed()) { clearPersistedClick(); return memoryClick?.reference ?? ""; }
  if (!memoryClick && !clicksRevoked) {
    try { memoryClick = parseMeasurementClickRecord(window.localStorage.getItem(OPENAI_CLICK_KEY), now); }
    catch { /* In-memory capture works when storage is blocked. */ }
  }
  if (memoryClick) {
    try { window.localStorage.setItem(OPENAI_CLICK_KEY, JSON.stringify(memoryClick)); }
    catch { /* Keep the exact in-memory record without extending capture time. */ }
  } else clearPersistedClick();
  return memoryClick?.reference ?? "";
}
export function measurementChoice(): MeasurementChoice {
  if (typeof window === "undefined") return "";
  if (storageUnavailable) return memoryChoice;
  try {
    const value = window.localStorage.getItem(OPENAI_CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : "";
  } catch { return memoryChoice; }
}
export function setMeasurementChoice(choice: Exclude<MeasurementChoice, "">) {
  memoryChoice = choice;
  try { window.localStorage.setItem(OPENAI_CONSENT_KEY, choice); storageUnavailable = false; }
  catch { storageUnavailable = true; }
  if (choice === "denied") purgeMeasurementClick();
  window.dispatchEvent(new Event(OPENAI_CONSENT_EVENT));
}
export function resetMemoryChoice() { storageUnavailable = false; memoryChoice = ""; }
export function measurementAllowed() {
  if (privacyRestricted()) { purgeMeasurementClick(); return false; }
  return measurementChoice() === "granted";
}
