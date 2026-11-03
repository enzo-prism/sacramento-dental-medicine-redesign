import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  CANONICAL_ORIGIN,
  LEGACY_HOSTS,
  canonicalSlashPaths,
  legacyRedirects,
  siteRedirects,
  trailingSlashRoutes,
  type SiteRedirect,
} from "./redirects.ts";
import { servicePages } from "../data/service-pages.ts";

const CANONICAL_HOST = new URL(CANONICAL_ORIGIN).host;
const rules = siteRedirects();

/** First-match evaluation of the literal and `/:path*` sources this site uses. */
function match(rules: SiteRedirect[], host: string, path: string) {
  for (const rule of rules) {
    if (rule.has && !rule.has.some((condition) => condition.value === host)) continue;
    // Next's `:path*` capture drops a trailing slash.
    if (rule.source === "/:path*") return rule.destination.replace("/:path*", path.replace(/(.)\/+$/, "$1"));
    if (rule.source === path) return rule.destination;
  }
  return null;
}

/** Follows redirects like a crawler and returns every hop. */
function follow(url: string) {
  const hops: string[] = [];
  let current = new URL(url);
  for (let i = 0; i < 5; i++) {
    const next = match(rules, current.host, current.pathname);
    if (!next) return { final: current.href, hops };
    current = new URL(next, current);
    hops.push(current.href);
  }
  throw new Error(`redirect loop from ${url}`);
}

const legacyPaths = rules.filter((rule) => !rule.has).map((rule) => rule.source);

describe("legacy URL redirects", () => {
  it("sends every old www URL to its final canonical URL in one hop", () => {
    for (const host of LEGACY_HOSTS) {
      for (const path of legacyPaths) {
        const apexRule = rules.find((rule) => !rule.has && rule.source === path);
        assert.ok(apexRule);
        const { final, hops } = follow(`https://${host}${path}`);
        assert.equal(hops.length, 1, `${host}${path} took ${hops.length} hops: ${hops.join(" -> ")}`);
        assert.equal(final, new URL(apexRule.destination, CANONICAL_ORIGIN).href);
      }
    }
  });

  it("keeps the path for www URLs that are already current pages", () => {
    for (const host of LEGACY_HOSTS) {
      for (const path of ["/", "/dental-emergencies", "/schedule", ...canonicalSlashPaths, "/reviews?tab=all"]) {
        const url = new URL(path, `https://${host}`);
        const { final, hops } = follow(url.href);
        assert.equal(hops.length, 1, path);
        assert.equal(new URL(final).host, CANONICAL_HOST);
        assert.equal(new URL(final).pathname, url.pathname);
      }
    }
  });

  it("never points a canonical-host redirect at another redirect", () => {
    for (const rule of rules.filter((candidate) => !candidate.has)) {
      assert.equal(rule.permanent, true);
      assert.ok(rule.destination.startsWith("/"), rule.destination);
      const { hops } = follow(`${CANONICAL_ORIGIN}${rule.source}`);
      assert.equal(hops.length, 1, `${rule.source} chains: ${hops.join(" -> ")}`);
    }
  });

  it("orders host rules before path rules and the host catch-all last for its host", () => {
    const firstPathRule = rules.findIndex((rule) => !rule.has);
    assert.ok(rules.slice(0, firstPathRule).every((rule) => rule.has));
    assert.ok(rules.slice(firstPathRule).every((rule) => !rule.has));
    for (const host of LEGACY_HOSTS) {
      const hostRules = rules.filter((rule) => rule.has?.[0].value === host);
      assert.equal(hostRules.at(-1)?.source, "/:path*");
      assert.ok(hostRules.slice(0, -1).every((rule) => rule.destination.startsWith(`${CANONICAL_ORIGIN}/`)));
    }
    assert.ok(!(LEGACY_HOSTS as readonly string[]).includes(CANONICAL_HOST));
  });

  it("covers every indexable page and legacy path with and without a trailing slash", () => {
    const slashSources = new Set(rules.filter((rule) => !rule.has).map((rule) => rule.source));
    for (const { slug } of servicePages) {
      assert.ok((trailingSlashRoutes as readonly string[]).includes(slug), `missing /${slug}/ redirect`);
    }
    for (const { source } of legacyRedirects) {
      assert.ok(slashSources.has(source), source);
      assert.ok(slashSources.has(`${source}/`), `${source}/`);
    }
    assert.equal(new Set(rules.map((rule) => `${rule.has?.[0].value ?? ""} ${rule.source}`)).size, rules.length);
  });

  it("is the list next.config.ts serves", () => {
    const config = readFileSync(join(process.cwd(), "next.config.ts"), "utf8");
    assert.match(config, /from "\.\/src\/lib\/redirects"/);
    assert.match(config, /return siteRedirects\(\);/);
    assert.match(config, /skipTrailingSlashRedirect: true/);
    const privacy = readFileSync(join(process.cwd(), "src/app/privacy-practices/page.tsx"), "utf8");
    assert.match(privacy, /canonical: "\/privacy-practices\/"/);
    assert.deepEqual([...canonicalSlashPaths], ["/privacy-practices/"]);
  });
});
