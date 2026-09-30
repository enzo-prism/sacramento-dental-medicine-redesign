/** This module never exposes appointment fields to the vendor SDK. */
export const OPENAI_CONSENT_KEY = "sdm_openai_measurement_consent_v1";
export const OPENAI_CONSENT_EPOCH_KEY = "sdm_openai_measurement_epoch_v1";
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
let memoryEpoch = "";
let memoryClick: MeasurementClickRecord | null = null;
let memoryClickPersisted = false;
let lastUrlReference = "";
// A failed storage delete must never restore an old reference in this document.
let clicksRevoked = false;
export function consumeMeasurementClickUrl() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("oppref")) return;
  url.searchParams.delete("oppref");
  // Preserve Next's router state and every unrelated query parameter/hash.
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
}
function clearPersistedClick() {
  try { window.localStorage.removeItem(OPENAI_CLICK_KEY); } catch { /* Unavailable storage. */ }
  try { window.sessionStorage.removeItem(OPENAI_CLICK_KEY); } catch { /* Remove old session-only records too. */ }
}
export function purgeMeasurementClick() {
  memoryEpoch = "";
  try { window.localStorage.removeItem(OPENAI_CONSENT_EPOCH_KEY); } catch { /* In-memory consent still applies. */ }
  memoryClick = null;
  memoryClickPersisted = false;
  lastUrlReference = "";
  clicksRevoked = true;
  clearPersistedClick();
  consumeMeasurementClickUrl();
}
function privacyRestricted() {
  return measurementChoice() === "denied" || navigator.doNotTrack === "1"
    || Boolean((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl);
}
export function measurementClickReference() {
  if (privacyRestricted()) { purgeMeasurementClick(); return ""; }
  const now = Date.now();
  const current = validClickReference(new URLSearchParams(window.location.search).get("oppref"));
  const allowed = measurementAllowed();
  let stored: MeasurementClickRecord | null = null;
  let rejectedStoredReference = "";
  let storeReadable = false;
  if (allowed && !clicksRevoked) {
    try {
      const raw = window.localStorage.getItem(OPENAI_CLICK_KEY);
      storeReadable = true;
      stored = parseMeasurementClickRecord(raw, now);
      if (!stored && raw) {
        // A known expired/malformed click cannot be renewed by its stale URL.
        const known = JSON.parse(raw) as { reference?: unknown } | null;
        rejectedStoredReference = validClickReference(known?.reference);
      }
    } catch { /* Keep current-document memory when storage cannot be read. */ }
  }
  if (current && current === rejectedStoredReference) {
    memoryClick = null;
    memoryClickPersisted = false;
    lastUrlReference = current;
    clearPersistedClick();
    consumeMeasurementClickUrl();
    return "";
  }
  if (current && current !== lastUrlReference) {
    lastUrlReference = current;
    memoryClick = stored?.reference === current ? stored : { version: 1, reference: current, capturedAt: now };
    memoryClickPersisted = stored?.reference === current;
    clicksRevoked = false;
  } else if (allowed && storeReadable) {
    // Shared first-party state wins on reads. A tab must not rewrite an older
    // memory reference over another tab's new click or deletion/expiry.
    memoryClick = stored ?? (memoryClickPersisted ? null : memoryClick);
    memoryClickPersisted = Boolean(stored);
  }
  if (memoryClick && !parseMeasurementClickRecord(JSON.stringify(memoryClick), now)) {
    memoryClick = null;
    memoryClickPersisted = false;
  }
  if (!allowed) { clearPersistedClick(); return memoryClick?.reference ?? ""; }
  if (memoryClick) {
    if (!memoryClickPersisted) {
      try {
        window.localStorage.setItem(OPENAI_CLICK_KEY, JSON.stringify(memoryClick));
        memoryClickPersisted = true;
      } catch { /* Preserve exact memory capture time; never extend it. */ }
    }
    consumeMeasurementClickUrl();
  } else {
    clearPersistedClick();
    if (rejectedStoredReference) consumeMeasurementClickUrl();
  }
  return memoryClick?.reference ?? "";
}
export function measurementClickSnapshot(): MeasurementClickRecord | null {
  measurementClickReference();
  return measurementAllowed() && memoryClick ? { ...memoryClick } : null;
}
export function acceptedMeasurementReference(reference: string, capturedAt: string, permission: string, submittedAt: string, now = Date.now()) {
  const requestedAt = Number(submittedAt);
  if (permission !== "granted" || !Number.isFinite(requestedAt) || requestedAt <= 0 || requestedAt > now + 60000) return "";
  // Eligibility belongs to the request boundary, even when acceptance is delayed.
  return parseMeasurementClickRecord(JSON.stringify({ version: 1, reference, capturedAt: Number(capturedAt) }), requestedAt)?.reference ?? "";
}
export function measurementConsentEpoch() {
  if (!measurementAllowed()) return "";
  if (storageUnavailable) return memoryEpoch;
  try {
    const epoch = window.localStorage.getItem(OPENAI_CONSENT_EPOCH_KEY) ?? "";
    return UUID_V4.test(epoch) ? epoch : "";
  } catch { return memoryEpoch; }
}
export function measurementChoice(): MeasurementChoice {
  if (typeof window === "undefined") return "";
  if (storageUnavailable) return memoryChoice;
  try {
    const value = window.localStorage.getItem(OPENAI_CONSENT_KEY);
    // A stale readable grant is unsafe when this store cannot record withdrawal.
    if (value === "granted") window.localStorage.setItem(OPENAI_CONSENT_KEY, value);
    return value === "granted" || value === "denied" ? value : "";
  } catch { storageUnavailable = true; return memoryChoice; }
}
export function setMeasurementChoice(choice: Exclude<MeasurementChoice, "">) {
  memoryChoice = choice;
  memoryEpoch = choice === "granted" ? crypto.randomUUID() : "";
  try {
    if (memoryEpoch) window.localStorage.setItem(OPENAI_CONSENT_EPOCH_KEY, memoryEpoch);
    else window.localStorage.removeItem(OPENAI_CONSENT_EPOCH_KEY);
    window.localStorage.setItem(OPENAI_CONSENT_KEY, choice); storageUnavailable = false;
  }
  catch {
    storageUnavailable = true;
    if (choice === "denied") {
      try { window.localStorage.removeItem(OPENAI_CONSENT_KEY); } catch { /* Current-document memory denial still wins. */ }
      try { window.localStorage.removeItem(OPENAI_CONSENT_EPOCH_KEY); } catch { /* Best effort. */ }
    }
  }
  if (choice === "denied") purgeMeasurementClick();
  window.dispatchEvent(new Event(OPENAI_CONSENT_EVENT));
}
export function resetMemoryChoice() { storageUnavailable = false; memoryChoice = ""; memoryEpoch = ""; }
export function measurementAllowed() {
  if (privacyRestricted()) { purgeMeasurementClick(); return false; }
  return measurementChoice() === "granted";
}
