import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { serializeJsonLd } from "./json-ld.ts";
import { servicePages } from "../data/service-pages.ts";
import { officeHours, structuredData } from "../data/site.ts";

describe("search content integrity", () => {
  it("escapes script-breakout content while preserving valid JSON", () => {
    const value = { name: '</script><script>alert("x")</script>', question: "< & >" };
    const serialized = serializeJsonLd(value);
    assert.ok(!serialized.includes("<"));
    assert.deepEqual(JSON.parse(serialized), value);
  });
  it("has unique routes and valid related-care destinations", () => {
    const slugs = new Set(servicePages.map(({ slug }) => slug));
    assert.equal(slugs.size, servicePages.length);
    assert.equal(new Set(servicePages.map(({ title }) => title)).size, servicePages.length);
    assert.equal(new Set(servicePages.map(({ description }) => description)).size, servicePages.length);
    for (const service of servicePages) {
      assert.match(service.slug, /^[a-z]+(?:-[a-z]+)*$/);
      assert.equal(new Set(service.faqs.map(({ question }) => question)).size, service.faqs.length);
      for (const slug of service.relatedSlugs) {
        assert.ok(slugs.has(slug), `${service.slug} links to missing ${slug}`);
        assert.notEqual(slug, service.slug);
      }
    }
  });
  it("keeps practice schema truthful and consistent with scheduling hours", () => {
    assert.ok(!("aggregateRating" in structuredData));
    assert.ok(structuredData.image.endsWith("/images/office-exterior.webp"));
    for (const [index, day] of structuredData.openingHoursSpecification.entries()) {
      const minutes = (time: string) => time.split(":").map(Number).reduce((h, m) => h * 60 + m);
      assert.equal(minutes(day.opens), officeHours[index + 1]?.open);
      assert.equal(minutes(day.closes), officeHours[index + 1]?.close);
    }
  });
});
