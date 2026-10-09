import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { runInNewContext } from "node:vm";
import {
  SEASON_ATTRIBUTE,
  SEASON_OPT_OUT_KEY,
  SEASON_PREVIEW_KEY,
  activeSeason,
  buildSeasonScript,
  halloween2026,
  isSeasonInRange,
} from "./seasonal.ts";

// Pacific Daylight Time is UTC-7 throughout October 2026.
const SEP_30_LAST_MINUTE = "2026-10-01T06:59:00Z";
const OCT_1_MIDNIGHT = "2026-10-01T07:00:00Z";
const OCT_31_LAST_MINUTE = "2026-11-01T06:59:00Z";
const NOV_1_MIDNIGHT = "2026-11-01T07:00:00Z";

describe("isSeasonInRange", () => {
  it("follows the practice's Pacific calendar day, not UTC", () => {
    assert.equal(isSeasonInRange(halloween2026, new Date(SEP_30_LAST_MINUTE)), false);
    assert.equal(isSeasonInRange(halloween2026, new Date(OCT_1_MIDNIGHT)), true);
    assert.equal(isSeasonInRange(halloween2026, new Date(OCT_31_LAST_MINUTE)), true);
    assert.equal(isSeasonInRange(halloween2026, new Date(NOV_1_MIDNIGHT)), false);
  });
});

type Store = Map<string, string> | "throws";

function storageArea(store: Map<string, string>) {
  return {
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key),
  };
}

/** Runs the real inline script against a fake browser. */
function runScript({
  now,
  search = "",
  local = new Map<string, string>(),
  session = new Map<string, string>(),
}: {
  now: string;
  search?: string;
  local?: Store;
  session?: Store;
}) {
  const attributes = new Map<string, string>();
  const fixed = new Date(now).getTime();
  class FixedDate extends Date {
    constructor(...args: unknown[]) {
      if (args.length === 0) super(fixed);
      else super(...(args as [string]));
    }
  }
  const window: Record<string, unknown> = { location: { search, pathname: "/" } };
  for (const [name, store] of [
    ["localStorage", local],
    ["sessionStorage", session],
  ] as const) {
    Object.defineProperty(window, name, {
      get() {
        if (store === "throws") throw new Error("SecurityError: storage is blocked");
        return storageArea(store);
      },
    });
  }
  const document = {
    documentElement: {
      setAttribute: (name: string, value: string) => void attributes.set(name, value),
    },
  };

  runInNewContext(buildSeasonScript(halloween2026), {
    window,
    document,
    Date: FixedDate,
    Intl,
    URLSearchParams,
  });

  return attributes.get(SEASON_ATTRIBUTE) ?? null;
}

describe("buildSeasonScript", () => {
  it("turns the season on only inside the date range", () => {
    assert.equal(runScript({ now: SEP_30_LAST_MINUTE }), null);
    assert.equal(runScript({ now: OCT_1_MIDNIGHT }), "halloween");
    assert.equal(runScript({ now: OCT_31_LAST_MINUTE }), "halloween");
    assert.equal(runScript({ now: NOV_1_MIDNIGHT }), null);
  });

  it("previews out of season with ?season=halloween for the rest of the session", () => {
    const session = new Map<string, string>();
    assert.equal(runScript({ now: NOV_1_MIDNIGHT, search: "?season=halloween", session }), "halloween");
    assert.equal(session.get(SEASON_PREVIEW_KEY), "1");
    assert.equal(runScript({ now: NOV_1_MIDNIGHT, session }), "halloween");
  });

  it("opts a browser out with ?season=off and resets with ?season=auto", () => {
    const local = new Map<string, string>();
    assert.equal(runScript({ now: OCT_1_MIDNIGHT, search: "?season=off", local }), null);
    assert.equal(local.get(SEASON_OPT_OUT_KEY), "off");
    assert.equal(runScript({ now: OCT_1_MIDNIGHT, local }), null);
    assert.equal(runScript({ now: OCT_1_MIDNIGHT, search: "?season=auto", local }), "halloween");
    assert.equal(local.has(SEASON_OPT_OUT_KEY), false);
  });

  it("an explicit ?season=off wins over an active preview", () => {
    const session = new Map([[SEASON_PREVIEW_KEY, "1"]]);
    assert.equal(runScript({ now: OCT_1_MIDNIGHT, search: "?season=off", session }), null);
    assert.equal(session.has(SEASON_PREVIEW_KEY), false);
  });

  it("still follows the calendar (and honors ?season=) when storage is blocked", () => {
    assert.equal(runScript({ now: OCT_1_MIDNIGHT, local: "throws", session: "throws" }), "halloween");
    assert.equal(runScript({ now: NOV_1_MIDNIGHT, local: "throws", session: "throws" }), null);
    assert.equal(
      runScript({ now: NOV_1_MIDNIGHT, search: "?season=halloween", local: "throws", session: "throws" }),
      "halloween",
    );
  });

  it("escapes markup in the inlined config", () => {
    assert.doesNotMatch(buildSeasonScript(halloween2026), /<\/?script/i);
  });
});

describe("seasonal layer boundaries", () => {
  it("ships the seasonal favicon", () => {
    assert.ok(activeSeason);
    assert.ok(activeSeason.startsOn <= activeSeason.endsOn);
    assert.ok(existsSync(join(process.cwd(), "public", activeSeason.icon)), `${activeSeason.icon} is missing`);
  });

  it("keeps decorations off the scheduler, privacy, and emergency pages", () => {
    const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
    assert.match(read("src/app/schedule/page.tsx"), /<Footer seasonal=\{false\} \/>/);
    assert.match(read("src/app/privacy-practices/page.tsx"), /<Footer seasonal=\{false\} \/>/);
    assert.match(read("src/app/[service]/page.tsx"), /seasonal=\{slug !== "dental-emergencies"\}/);
    for (const path of ["src/app/schedule/page.tsx", "src/components/ScheduleOfficeContacts.tsx", "src/components/sections/Emergency.tsx", "src/components/MobileCTA.tsx"]) {
      assert.doesNotMatch(read(path), /Seasonal|sdm-season/, `${path} must stay undecorated`);
    }
  });
});
