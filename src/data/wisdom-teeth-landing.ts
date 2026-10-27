import { contact } from "./site.ts";
import { servicePageBySlug } from "./service-pages.ts";

const wisdomTeeth = servicePageBySlug.get("wisdom-teeth");

if (!wisdomTeeth) {
  throw new Error("wisdom-teeth service page is missing");
}

export const WISDOM_TEETH_LANDING_PATH = "/wisdom-teeth-removal-sacramento";

type LandingFaq = {
  question: string;
  answer: string;
  links?: { href: string; label: string }[];
};

export const wisdomTeethLanding = {
  slug: WISDOM_TEETH_LANDING_PATH.slice(1),
  title: "Wisdom Teeth Removal in Sacramento | Sacramento Dental Medicine",
  h1: "Wisdom teeth removal in Sacramento",
  eyebrow: "Oral surgery in Antelope",
  description:
    "Get a wisdom teeth evaluation or removal at Sacramento Dental Medicine in Antelope, serving Sacramento, Roseville, Citrus Heights, North Highlands, and nearby communities.",
  intro:
    "Wisdom teeth can stay quiet for years or start to crowd, inflame, or decay. Sacramento Dental Medicine evaluates them in-house at 4320 Elverta Rd #3, Antelope, CA 95843 and handles removal when that is the healthier next step. An exam and imaging show whether the teeth should be watched, treated, or removed, and whether a specialist should be involved.",
  symptoms: [
    "Pain or tenderness at the back of the mouth",
    "Swelling, redness, or a tooth that is only partly through the gum",
    "Crowding, pressure, or a tooth that is hard to keep clean",
    "Decay or repeated irritation around an erupting wisdom tooth",
  ],
  whenToCall:
    "If a wisdom tooth hurts now, call (916) 727-6453. The team can describe the next step and ask about the earliest available evaluation. Same-day visits are offered when possible, not guaranteed.",
  benefits: wisdomTeeth.benefits,
  steps: wisdomTeeth.steps,
  comfort:
    "Local numbing is part of extraction care. The practice also uses computer-controlled numbing (The Wand). Tell the team about anxiety or comfort concerns so they can explain the options that may be appropriate for your health and the procedure. A dentist must review your medical history before confirming whether sedation is appropriate — do not assume a particular medication or method is offered.",
  coverage:
    "Call the front desk with your plan information to confirm whether your dental plan is accepted and to ask about current payment options. Estimates depend on the exam and the care you need. This page does not list insurance plans, financing products, or prices.",
  officeLine: `${contact.addressLine1}, ${contact.addressLine2}`,
  relatedLinks: [
    { href: "/wisdom-teeth", label: "Wisdom teeth" },
    { href: "/tooth-extractions", label: "Tooth extractions" },
  ],
  faqs: [
    {
      question: "Do all wisdom teeth need to be removed?",
      answer:
        "No. Some wisdom teeth stay healthy and have enough space. Others crowd, partially erupt, or become difficult to clean. An exam and imaging determine whether removal is recommended.",
    },
    {
      question: "Can wisdom teeth be removed at this office?",
      answer:
        "Yes. Sacramento Dental Medicine lists wisdom teeth removal among its in-house oral surgery services. Complex cases may be coordinated with a specialist when that is the safer plan.",
    },
    {
      question: "What should I do if a wisdom tooth hurts now?",
      answer:
        "Call (916) 727-6453 to describe the pain or swelling and ask about the earliest available evaluation. Same-day visits are offered when possible. An online request is reviewed during office hours and does not confirm a visit.",
    },
    {
      question: "Will I be numb for wisdom teeth removal?",
      answer:
        "Local numbing is part of extraction care. Tell the team about anxiety or comfort concerns so they can explain the options that may be appropriate for your health and the procedure.",
    },
    {
      question: "Do you see patients from Sacramento, Roseville, and nearby cities?",
      answer:
        "The office is in Antelope. The practice lists Antelope, Sacramento, Roseville, Citrus Heights, North Highlands, and Folsom among the communities it serves. Patients from nearby cities, including Rio Linda, can call to ask about a visit.",
    },
    {
      question: "How do I request a wisdom teeth evaluation?",
      answer:
        "Call (916) 727-6453, use the request form on this page, or book online on the schedule page. The request is not a confirmed appointment until the office reaches you during office hours.",
    },
    {
      question: "What is recovery like after wisdom teeth removal?",
      answer:
        "If removal is recommended, the team explains what to expect and how to care for the area afterward. You leave with after-care instructions. Healing varies by person and procedure, and no specific recovery time is promised.",
    },
    {
      question: "Is sedation available for wisdom teeth removal?",
      answer:
        "Local numbing is part of extraction care. Tell the team about anxiety or comfort concerns so they can explain the options that may be appropriate. A dentist must review your medical history and planned treatment before confirming whether sedation is appropriate. Learn more about sedation dentistry.",
      links: [{ href: "/sedation-dentistry", label: "sedation dentistry" }],
    },
    {
      question: "When is a wisdom tooth urgent?",
      answer:
        "Call (916) 727-6453 for wisdom-tooth pain or swelling and ask about the earliest available evaluation. Same-day visits are offered when possible, not guaranteed. For uncontrolled bleeding, trouble breathing, or a life-threatening injury, call 911. See Dental emergencies for urgent pain or swelling.",
      links: [{ href: "/dental-emergencies", label: "Dental emergencies" }],
    },
  ] satisfies LandingFaq[],
  source: wisdomTeeth.sources?.[0],
};
