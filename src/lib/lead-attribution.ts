// First-touch ad tags for appointment leads. Framework-neutral so capture,
// hidden fields, and Formspree delivery share one parse/merge contract.

export const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export const CLICK_ID_FIELDS = ["gclid", "fbclid", "ttclid"] as const;

export const ATTRIBUTION_FIELD_NAMES = [
  ...UTM_FIELDS,
  ...CLICK_ID_FIELDS,
  "ad_id",
] as const;

export type UtmField = (typeof UTM_FIELDS)[number];
export type ClickIdField = (typeof CLICK_ID_FIELDS)[number];
export type AttributionFieldName = (typeof ATTRIBUTION_FIELD_NAMES)[number];

export type FirstTouchAttribution = Record<AttributionFieldName, string>;

export const ATTRIBUTION_STORAGE_KEY = "sdm_lead_attribution_v1";
export const ATTRIBUTION_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1_000;
export const ATTRIBUTION_MAX_VALUE_LENGTH = 512;

const EMPTY_ATTRIBUTION: FirstTouchAttribution = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  gclid: "",
  fbclid: "",
  ttclid: "",
  ad_id: "",
};

type StoredAttributionRecord = FirstTouchAttribution & {
  capturedAt: string;
  version: 1;
};

export function emptyAttribution(): FirstTouchAttribution {
  return { ...EMPTY_ATTRIBUTION };
}

export function compactAttributionValue(value: string | null | undefined) {
  if (!value) return "";
  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, ATTRIBUTION_MAX_VALUE_LENGTH);
}

/**
 * Prefer utm_content when it is a bare Meta `{{ad.id}}` / numeric ad id.
 * Also accept a trailing numeric id after a creative prefix (`static_photo_123…`).
 * Do not invent an id from click IDs or other UTM fields.
 */
export function parseAdIdFromUtmContent(utmContent: string | null | undefined) {
  const value = compactAttributionValue(utmContent);
  if (!value) return "";
  if (/^\d{5,40}$/.test(value)) return value;
  return value.match(/_(\d{5,40})$/u)?.[1] ?? "";
}

function getQueryValue(params: URLSearchParams, name: string) {
  const exact = params.get(name);
  if (exact) return compactAttributionValue(exact);

  const lowered = name.toLowerCase();
  for (const [key, value] of params.entries()) {
    if (key.toLowerCase() === lowered) return compactAttributionValue(value);
  }
  return "";
}

export function parseAttributionFromSearch(search: string): FirstTouchAttribution {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search,
  );
  const next = emptyAttribution();

  for (const field of UTM_FIELDS) {
    next[field] = getQueryValue(params, field);
  }
  for (const field of CLICK_ID_FIELDS) {
    next[field] = getQueryValue(params, field);
  }

  next.ad_id =
    parseAdIdFromUtmContent(next.utm_content) || getQueryValue(params, "ad_id");
  return next;
}

export function hasAttributionTags(touch: FirstTouchAttribution) {
  return UTM_FIELDS.some((field) => Boolean(touch[field])) ||
    CLICK_ID_FIELDS.some((field) => Boolean(touch[field])) ||
    Boolean(touch.ad_id);
}

export function mergeFirstTouch(
  stored: FirstTouchAttribution | null,
  current: FirstTouchAttribution,
): FirstTouchAttribution {
  if (stored && hasAttributionTags(stored)) return { ...stored };
  if (hasAttributionTags(current)) return { ...current };
  return stored ? { ...stored } : emptyAttribution();
}

export function readAttributionFromFormData(formData: FormData): FirstTouchAttribution {
  const next = emptyAttribution();
  for (const field of ATTRIBUTION_FIELD_NAMES) {
    const value = formData.get(field);
    next[field] = compactAttributionValue(typeof value === "string" ? value : "");
  }
  next.ad_id ||= parseAdIdFromUtmContent(next.utm_content);
  return next;
}

export function applyAttributionToPayload(
  payload: Record<string, string>,
  attribution: FirstTouchAttribution,
) {
  for (const field of ATTRIBUTION_FIELD_NAMES) {
    if (attribution[field]) payload[field] = attribution[field];
  }
  return payload;
}

export function formatAttributionMessageLines(attribution: FirstTouchAttribution) {
  return ATTRIBUTION_FIELD_NAMES.filter((field) => attribution[field]).map(
    (field) => `${field}=${attribution[field]}`,
  );
}

function isStoredRecord(value: unknown): value is StoredAttributionRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<StoredAttributionRecord>;
  return record.version === 1 && typeof record.capturedAt === "string";
}

export function parseStoredAttribution(
  raw: string,
  now: Date = new Date(),
): FirstTouchAttribution | null {
  try {
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isStoredRecord(parsed)) return null;
    if (Date.parse(parsed.capturedAt) + ATTRIBUTION_MAX_AGE_MS <= now.getTime()) {
      return null;
    }

    const next = emptyAttribution();
    for (const field of ATTRIBUTION_FIELD_NAMES) {
      next[field] = compactAttributionValue(parsed[field]);
    }
    next.ad_id ||= parseAdIdFromUtmContent(next.utm_content);
    return hasAttributionTags(next) ? next : null;
  } catch {
    return null;
  }
}

export function serializeAttribution(
  attribution: FirstTouchAttribution,
  capturedAt: string = new Date().toISOString(),
) {
  const record: StoredAttributionRecord = {
    ...attribution,
    capturedAt,
    version: 1,
  };
  return JSON.stringify(record);
}

function readBrowserStore(storage: Storage | undefined, key: string) {
  try {
    return storage?.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function writeBrowserStore(storage: Storage | undefined, key: string, value: string) {
  try {
    storage?.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

let memoryAttribution = "";

function readStoredRaw() {
  if (typeof window === "undefined") return memoryAttribution;
  return (
    readBrowserStore(window.localStorage, ATTRIBUTION_STORAGE_KEY) ||
    readBrowserStore(window.sessionStorage, ATTRIBUTION_STORAGE_KEY) ||
    memoryAttribution
  );
}

function parseStoredCapturedAt(raw: string) {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (isStoredRecord(parsed)) return parsed.capturedAt;
  } catch {
    return "";
  }
  return "";
}

export function persistFirstTouchFromLocation(
  search: string = typeof window === "undefined" ? "" : window.location.search,
  now: Date = new Date(),
): FirstTouchAttribution {
  const current = parseAttributionFromSearch(search);
  const raw = readStoredRaw();
  const stored = parseStoredAttribution(raw, now);
  const firstTouch = mergeFirstTouch(stored, current);

  if (!hasAttributionTags(firstTouch)) return emptyAttribution();

  const capturedAt =
    stored && hasAttributionTags(stored)
      ? parseStoredCapturedAt(raw) || now.toISOString()
      : now.toISOString();
  const serialized = serializeAttribution(firstTouch, capturedAt);
  memoryAttribution = serialized;

  if (typeof window !== "undefined") {
    writeBrowserStore(window.localStorage, ATTRIBUTION_STORAGE_KEY, serialized);
    writeBrowserStore(window.sessionStorage, ATTRIBUTION_STORAGE_KEY, serialized);
  }

  return firstTouch;
}
