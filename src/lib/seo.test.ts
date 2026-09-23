import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { serializeJsonLd } from "./json-ld.ts";
import { highlightedServiceSlugs, servicePages } from "../data/service-pages.ts";
import { contact, officeHours, structuredData } from "../data/site.ts";

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
  it("publishes dedicated pages for root canal, wisdom teeth, and PRF grafting", () => {
    const slugs = new Set(servicePages.map(({ slug }) => slug));
    for (const slug of highlightedServiceSlugs) {
      assert.ok(slugs.has(slug), `missing highlighted service page ${slug}`);
      const page = servicePages.find((service) => service.slug === slug);
      assert.ok(page?.intro.includes("exam") || page?.faqs.some((faq) => faq.answer.includes("exam")));
    }
    assert.deepEqual([...highlightedServiceSlugs], [
      "root-canal-therapy",
      "wisdom-teeth",
      "platelet-rich-fibrin",
    ]);
  });
  it("keeps practice schema truthful and consistent with scheduling hours", () => {
    assert.ok(!("aggregateRating" in structuredData));
    assert.ok(structuredData.image.endsWith("/images/office-exterior.webp"));
    assert.equal(contact.email, "office@sacramentodentalmedicine.com");
    assert.equal(contact.emailHref, "mailto:office@sacramentodentalmedicine.com");
    assert.equal(structuredData.email, contact.email);
    assert.equal(structuredData.contactPoint["@type"], "ContactPoint");
    assert.equal(structuredData.contactPoint.email, contact.email);
    assert.equal(structuredData.contactPoint.telephone, structuredData.telephone);
    for (const [index, day] of structuredData.openingHoursSpecification.entries()) {
      const minutes = (time: string) => time.split(":").map(Number).reduce((h, m) => h * 60 + m);
      assert.equal(minutes(day.opens), officeHours[index + 1]?.open);
      assert.equal(minutes(day.closes), officeHours[index + 1]?.close);
    }
  });
});
