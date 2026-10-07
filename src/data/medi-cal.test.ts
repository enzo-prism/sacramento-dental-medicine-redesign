import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  contact,
  faqStructuredData,
  faqs,
  mediCalFaqQuestion,
  mediCalSelfPayAnswer,
  newPatient,
} from "./site.ts";

const inventedOffers = /CareCredit|Cherry|Sunbit|membership plan|in-house plan|\d+\s*%/i;

describe("Medi-Cal and self-pay copy", () => {
  it("uses the shared heading and FAQ question on both patient surfaces", () => {
    assert.equal(newPatient.insuranceHeading, "Insurance & Medi-Cal");
    assert.equal(newPatient.billing[0]?.title, "Insurance & Medi-Cal");
    assert.equal(mediCalFaqQuestion, "Do you accept Medi-Cal?");
    assert.equal(newPatient.billing[0]?.body, mediCalSelfPayAnswer);
  });

  it("says Medi-Cal is not accepted and points to discounted cash rates without inventing offers", () => {
    assert.equal(
      mediCalSelfPayAnswer,
      "Unfortunately, we don't accept Medi-Cal (Denti-Cal), but we do offer discounted rates for patients who pay cash. Call us at (916) 727-6453 to ask about pricing.",
    );
    assert.match(newPatient.selfPayBody, /discounted rates for patients who pay cash/);
    assert.match(newPatient.billing[1]?.body ?? "", /discounted rates for patients who pay cash/);
    assert.doesNotMatch(mediCalSelfPayAnswer, /cash-pay options/i);
    assert.doesNotMatch(newPatient.selfPayBody, /cash-pay options/i);
    assert.doesNotMatch(newPatient.billing[1]?.body ?? "", /cash-pay options/i);
    assert.match(mediCalSelfPayAnswer, new RegExp(contact.phoneDisplay.replace(/[()]/g, "\\$&")));
    assert.doesNotMatch(mediCalSelfPayAnswer, inventedOffers);
    assert.doesNotMatch(newPatient.selfPayBody, inventedOffers);
    assert.doesNotMatch(newPatient.insuranceOtherPlans, inventedOffers);
    assert.equal(contact.phoneDisplay, "(916) 727-6453");
    assert.equal(contact.email, "office@sacramentodentalmedicine.com");
  });

  it("keeps FAQ JSON-LD identical to the visible FAQ text", () => {
    const mediCalFaq = faqs.find((faq) => faq.q === mediCalFaqQuestion);
    assert.ok(mediCalFaq);
    assert.equal(mediCalFaq.a, mediCalSelfPayAnswer);

    const encoded = faqStructuredData.mainEntity.find(
      (entity) => entity.name === mediCalFaqQuestion,
    );
    assert.ok(encoded);
    assert.equal(encoded["@type"], "Question");
    assert.equal(encoded.acceptedAnswer["@type"], "Answer");
    assert.equal(encoded.acceptedAnswer.text, mediCalFaq.a);
    assert.equal(encoded.name, mediCalFaq.q);

    for (const faq of faqs) {
      const entity = faqStructuredData.mainEntity.find((item) => item.name === faq.q);
      assert.ok(entity, `missing JSON-LD for ${faq.q}`);
      assert.equal(entity.acceptedAnswer.text, faq.a);
    }
  });

  it("renders the insurance section from the shared copy", () => {
    const page = readFileSync(join(process.cwd(), "src/app/new-patients/page.tsx"), "utf8");
    assert.match(page, /id="insurance"/);
    assert.match(page, /newPatient\.insuranceHeading/);
    assert.match(page, /mediCalFaqQuestion/);
    assert.match(page, /mediCalSelfPayAnswer/);
    assert.match(page, /newPatient\.selfPayHeading/);
    assert.match(page, /acceptedAnswer: \{ "@type": "Answer", text: mediCalSelfPayAnswer \}/);
  });
});
