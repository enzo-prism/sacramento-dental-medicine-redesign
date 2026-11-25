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
    "In-house wisdom teeth exams and gentle removal on Elverta Rd in Antelope, serving Sacramento, Roseville, Citrus Heights, and North Highlands.",
  intro:
    "Wisdom teeth can sit quietly for years—or start aching, crowding, trapping food, or swelling your back gums. At our office at 4320 Elverta Rd #3, Antelope, CA 95843, we evaluate wisdom teeth with digital or 3D imaging and handle removal in-house whenever taking them out is the healthier step, coordinating with a specialist if a complex impaction calls for it.",
  symptoms: [
    "Aching, throbbing, or tenderness behind your back molars",
    "Swollen, red gums around a tooth that only came partway through",
    "Pressure, crowding, or back teeth that are nearly impossible to brush clean",
    "Cavities or recurring gum flare-ups around an erupting wisdom tooth",
  ],
  whenToCall:
    "Hurting right now? Call (916) 727-6453 first. Our front desk will talk through your symptoms and check for our soonest opening. We offer same-day urgent visits whenever space allows, though same-day openings aren't guaranteed.",
  benefits: wisdomTeeth.benefits,
  steps: wisdomTeeth.steps,
  comfort:
    "Thorough local numbing is always part of extraction care, and we use computer-guided delivery (The Wand STA) to keep numbing gentle. Tell us if you feel anxious—we review your health history and planned procedure first so we can confirm which comfort or sedation options are safe and available here.",
  coverage:
    "Call the front desk with your dental plan details so we can confirm whether your plan is accepted and walk through current payment options. Because every wisdom-tooth case is different, we provide a written estimate after your exam and imaging.",
  officeLine: `${contact.addressLine1}, ${contact.addressLine2}`,
  relatedLinks: [
    { href: "/wisdom-teeth", label: "Wisdom teeth" },
    { href: "/tooth-extractions", label: "Tooth extractions" },
  ],
  faqs: [
    {
      question: "Do all wisdom teeth have to come out?",
      answer:
        "No. Healthy wisdom teeth that come in straight with enough room to stay clean can often be left alone and monitored. An exam and imaging show whether watching or removing them is the safer call.",
    },
    {
      question: "Can my wisdom teeth be removed right at your office?",
      answer:
        "Yes—we handle wisdom teeth evaluations and removals right here in Antelope. If imaging shows a particularly complex impaction, we coordinate with a specialist when that is the safer path.",
    },
    {
      question: "What should I do if a wisdom tooth hurts right now?",
      answer:
        "Call (916) 727-6453 to describe your pain or swelling and ask about our soonest opening. Same-day visits are offered when space allows; an online request is reviewed during office hours and does not confirm a visit. See Dental emergencies for urgent hours and guidance.",
      links: [{ href: "/dental-emergencies", label: "Dental emergencies" }],
    },
    {
      question: "Will I be numb for wisdom teeth removal?",
      answer:
        "Yes—thorough local numbing is always part of extraction care, with computer-guided delivery available via The Wand STA. Let us know about anxiety so we can review your health history and talk through available sedation dentistry options.",
      links: [{ href: "/sedation-dentistry", label: "sedation dentistry" }],
    },
    {
      question: "Do you treat patients from Sacramento, Roseville, and nearby cities?",
      answer:
        "Yes. Our office is on Elverta Road in Antelope, and patients regularly visit us from Antelope, Sacramento, Roseville, Citrus Heights, North Highlands, and Folsom—as well as nearby communities like Rio Linda.",
    },
    {
      question: "How do I request a wisdom teeth evaluation?",
      answer:
        "Call (916) 727-6453, send the quick request form on this page, or book online through our schedule page. Requests submitted on this page are confirmed by our front desk during weekday office hours.",
    },
    {
      question: "What is recovery like after wisdom teeth removal?",
      answer:
        "Recovery depends on how many teeth are removed and how deeply they sit. Before treatment day, we walk you through swelling, food, comfort planning, and how to care for the area afterward.",
    },
  ] satisfies LandingFaq[],
  source: wisdomTeeth.sources?.[0],
};
