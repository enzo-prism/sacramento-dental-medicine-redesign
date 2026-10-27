import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { serializeJsonLd } from "./json-ld.ts";
import { highlightedServiceSlugs, servicePages } from "../data/service-pages.ts";
import { contact, officeHours, structuredData } from "../data/site.ts";
import { wisdomTeethLanding } from "../data/wisdom-teeth-landing.ts";

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
      for (const faq of service.faqs) {
        for (const link of faq.links ?? []) {
          assert.ok(faq.answer.includes(link.label), `${faq.question} missing ${link.label}`);
        }
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
      "dental-implants",
    ]);
  });

  it("keeps implant and wisdom-teeth titles and tightens their meta descriptions", () => {
    const implants = servicePages.find((service) => service.slug === "dental-implants");
    const wisdom = servicePages.find((service) => service.slug === "wisdom-teeth");
    assert.equal(implants?.title, "Dental Implants in Sacramento & Antelope, CA");
    assert.equal(wisdom?.title, "Wisdom Teeth Removal in Antelope & Sacramento, CA");
    for (const page of [implants, wisdom]) {
      assert.ok(page);
      assert.ok(page.description.length >= 140 && page.description.length <= 155, page.description);
      assert.match(page.description, /\(916\) 727-6453|request a visit/i);
    }
  });

  it("adds implant and wisdom-teeth FAQs from existing practice claims only", () => {
    const implants = servicePages.find((service) => service.slug === "dental-implants");
    const wisdom = servicePages.find((service) => service.slug === "wisdom-teeth");
    assert.ok(implants && wisdom);
    const implantQuestions = implants.faqs.map((faq) => faq.question);
    const wisdomQuestions = wisdom.faqs.map((faq) => faq.question);
    assert.ok(implantQuestions.includes("How long does dental implant treatment take?"));
    assert.ok(implantQuestions.includes("What if I need bone support for an implant?"));
    assert.ok(implantQuestions.includes("Can I be sedated for dental implant treatment?"));
    assert.ok(wisdomQuestions.includes("What is recovery like after wisdom teeth removal?"));
    assert.ok(wisdomQuestions.includes("Is sedation available for wisdom teeth removal?"));
    assert.ok(wisdomQuestions.includes("When is a wisdom tooth urgent?"));
    const implantBone = implants.faqs.find((faq) => faq.question.includes("bone support"));
    const implantSedation = implants.faqs.find((faq) => faq.question.includes("sedated"));
    const wisdomSedation = wisdom.faqs.find((faq) => faq.question.startsWith("Is sedation"));
    const wisdomUrgent = wisdom.faqs.find((faq) => faq.question.includes("urgent"));
    assert.deepEqual(implantBone?.links, [{ href: "/platelet-rich-fibrin", label: "PRF & grafting" }]);
    assert.deepEqual(implantSedation?.links, [{ href: "/sedation-dentistry", label: "sedation dentistry" }]);
    assert.deepEqual(wisdomSedation?.links, [{ href: "/sedation-dentistry", label: "sedation dentistry" }]);
    assert.deepEqual(wisdomUrgent?.links, [{ href: "/dental-emergencies", label: "Dental emergencies" }]);
    assert.ok(implants.relatedSlugs.includes("sedation-dentistry"));
    assert.ok(implants.relatedSlugs.includes("wisdom-teeth"));
    assert.deepEqual(
      implants.nearbyLinks?.map((link) => link.href),
      ["/sedation-dentistry", "/wisdom-teeth", "/meet-dr-narodovich"],
    );
    const prf = servicePages.find((service) => service.slug === "platelet-rich-fibrin");
    assert.equal(prf?.sources, undefined);
    const addedAnswers = [
      ...implants.faqs.slice(-3),
      ...wisdom.faqs.slice(-3),
    ].map((faq) => `${faq.question} ${faq.answer}`).join(" ");
    assert.doesNotMatch(addedAnswers, /CareCredit|discount|financ|\b\$\d|guarantee|implantolog|board[- ]certified/i);
  });

  it("adds serviceType to Service JSON-LD and Oral Surgery only when the site lists it", () => {
    const structured = readFileSync(join(process.cwd(), "src/lib/structured-data.ts"), "utf8");
    const servicePage = readFileSync(join(process.cwd(), "src/app/[service]/page.tsx"), "utf8");
    const landingPage = readFileSync(
      join(process.cwd(), "src/app/wisdom-teeth-removal-sacramento/page.tsx"),
      "utf8",
    );
    assert.match(structured, /serviceType,/);
    assert.match(structured, /"Oral Surgery"/);
    assert.doesNotMatch(structured, /"Implantology"/);
    assert.match(servicePage, /serviceJsonLd\(/);
    assert.match(landingPage, /serviceJsonLd\(/);
    assert.deepEqual(structuredData.medicalSpecialty, ["Dentistry", "Cosmetic Dentistry", "Endodontics"]);
  });

  it("stamps service sitemap dates and keeps the ad landing out of the sitemap", () => {
    const sitemap = readFileSync(join(process.cwd(), "src/app/sitemap.ts"), "utf8");
    assert.match(sitemap, /lastModified: new Date\("2026-10-27"\)/);
    assert.doesNotMatch(sitemap, /wisdom-teeth-removal-sacramento/);
    assert.deepEqual(
      wisdomTeethLanding.relatedLinks.map((link) => link.href),
      ["/wisdom-teeth", "/tooth-extractions"],
    );
  });
  it("publishes a noindex Sacramento wisdom-teeth landing with FAQ copy", () => {
    assert.equal(wisdomTeethLanding.slug, "wisdom-teeth-removal-sacramento");
    assert.match(wisdomTeethLanding.h1, /Wisdom teeth removal in Sacramento/);
    assert.ok(wisdomTeethLanding.faqs.length >= 4);
    assert.equal(new Set(wisdomTeethLanding.faqs.map((faq) => faq.question)).size, wisdomTeethLanding.faqs.length);
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
