import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { serializeJsonLd } from "./json-ld.ts";
import { highlightedServiceSlugs, serviceJsonLdTypes, servicePages } from "../data/service-pages.ts";
import { contact, officeHours, structuredData } from "../data/site.ts";
import { wisdomTeethLanding } from "../data/wisdom-teeth-landing.ts";

function faqsToJsonLd(faqs: { question: string; answer: string }[]) {
  return faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  }));
}

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

  it("adds only new on-site implant and wisdom-teeth FAQs", () => {
    const implants = servicePages.find((service) => service.slug === "dental-implants");
    const wisdom = servicePages.find((service) => service.slug === "wisdom-teeth");
    assert.ok(implants && wisdom);
    const implantQuestions = implants.faqs.map((faq) => faq.question);
    const wisdomQuestions = wisdom.faqs.map((faq) => faq.question);
    assert.equal(implantQuestions.includes("How long does dental implant treatment take?"), false);
    assert.ok(implantQuestions.includes("What if I need bone support for an implant?"));
    assert.ok(implantQuestions.includes("Can I be sedated for dental implant treatment?"));
    assert.ok(wisdomQuestions.includes("What is recovery like after wisdom teeth removal?"));
    assert.equal(wisdomQuestions.includes("Is sedation available for wisdom teeth removal?"), false);
    assert.equal(wisdomQuestions.includes("When is a wisdom tooth urgent?"), false);
    const implantBone = implants.faqs.find((faq) => faq.question.includes("bone support"));
    const implantSedation = implants.faqs.find((faq) => faq.question.includes("sedated"));
    const wisdomRecovery = wisdom.faqs.find((faq) => faq.question.includes("recovery"));
    const wisdomNumb = wisdom.faqs.find((faq) => faq.question.includes("numb"));
    const wisdomUrgent = wisdom.faqs.find((faq) => faq.question.includes("hurts now"));
    assert.deepEqual(implantBone?.links, [{ href: "/platelet-rich-fibrin", label: "PRF & grafting" }]);
    assert.deepEqual(implantSedation?.links, [{ href: "/sedation-dentistry", label: "sedation dentistry" }]);
    assert.deepEqual(wisdomNumb?.links, [{ href: "/sedation-dentistry", label: "sedation dentistry" }]);
    assert.deepEqual(wisdomUrgent?.links, [{ href: "/dental-emergencies", label: "Dental emergencies" }]);
    assert.match(wisdomRecovery?.answer ?? "", /how to care for the area afterward/);
    assert.doesNotMatch(wisdomRecovery?.answer ?? "", /leave with after-care instructions/i);
    assert.ok(implants.relatedSlugs.includes("sedation-dentistry"));
    assert.ok(implants.relatedSlugs.includes("wisdom-teeth"));
    assert.deepEqual(
      implants.nearbyLinks?.map((link) => link.href),
      ["/sedation-dentistry", "/wisdom-teeth", "/meet-dr-narodovich"],
    );
    const prf = servicePages.find((service) => service.slug === "platelet-rich-fibrin");
    assert.equal(prf?.sources, undefined);
    const reviewText = [
      implants.description,
      wisdom.description,
      implantBone?.question,
      implantBone?.answer,
      implantSedation?.question,
      implantSedation?.answer,
      wisdomRecovery?.question,
      wisdomRecovery?.answer,
    ].join(" ");
    assert.doesNotMatch(reviewText, /financing|Periodontics|discount|CareCredit|\$/);
    assert.doesNotMatch(reviewText, /leave with after-care instructions/i);
  });

  it("puts every visible FAQ into JSON-LD and limits serviceType to two pages", () => {
    const implants = servicePages.find((service) => service.slug === "dental-implants");
    const wisdom = servicePages.find((service) => service.slug === "wisdom-teeth");
    assert.ok(implants && wisdom);
    for (const page of servicePages) {
      const jsonLd = faqsToJsonLd(page.faqs);
      assert.equal(jsonLd.length, page.faqs.length);
      for (const [index, faq] of page.faqs.entries()) {
        assert.equal(jsonLd[index]?.name, faq.question);
        assert.equal(jsonLd[index]?.acceptedAnswer.text, faq.answer);
      }
    }
    const landingJsonLd = faqsToJsonLd(wisdomTeethLanding.faqs);
    assert.equal(landingJsonLd.length, wisdomTeethLanding.faqs.length);
    for (const [index, faq] of wisdomTeethLanding.faqs.entries()) {
      assert.equal(landingJsonLd[index]?.name, faq.question);
      assert.equal(landingJsonLd[index]?.acceptedAnswer.text, faq.answer);
    }
    assert.deepEqual(serviceJsonLdTypes, {
      "dental-implants": "Dental implants",
      "wisdom-teeth": "Wisdom teeth",
    });
    const structured = readFileSync(join(process.cwd(), "src/lib/structured-data.ts"), "utf8");
    const servicePage = readFileSync(join(process.cwd(), "src/app/[service]/page.tsx"), "utf8");
    const landingPage = readFileSync(
      join(process.cwd(), "src/app/wisdom-teeth-removal-sacramento/page.tsx"),
      "utf8",
    );
    assert.match(servicePage, /serviceJsonLdTypes\[service\.slug\]/);
    assert.match(servicePage, /from "@\/components\/FaqAnswer"/);
    assert.match(landingPage, /from "@\/components\/FaqAnswer"/);
    assert.doesNotMatch(landingPage, /serviceType/);
    assert.doesNotMatch(structured, /Oral Surgery/);
    assert.deepEqual(structuredData.medicalSpecialty, ["Dentistry", "Cosmetic Dentistry", "Endodontics"]);
  });

  it("stamps sitemap dates only for the two changed service pages", () => {
    const sitemap = readFileSync(join(process.cwd(), "src/app/sitemap.ts"), "utf8");
    assert.match(
      sitemap,
      /slug === "dental-implants" \|\| slug === "wisdom-teeth" \? "2026-10-27" : "2026-09-06"/,
    );
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
