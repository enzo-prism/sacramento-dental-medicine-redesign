import {
  Activity,
  Boxes,
  CalendarClock,
  Droplets,
  HeartPulse,
  type LucideIcon,
  MessageCircle,
  Microscope,
  ShieldCheck,
  Siren,
  Smile,
  SmilePlus,
  Sparkles,
  Stethoscope,
  Syringe,
  Waves,
} from "lucide-react";

// Canonical site origin (used by metadata, sitemap, and robots) --------------
export const siteUrl = "https://sacramentodentalmedicine.com";

// Contact + conversion targets ----------------------------------------------
export const contact = {
  practiceName: "Sacramento Dental Medicine",
  shortName: "Sacramento Dental",
  tagline: "Modern family, cosmetic & restorative dentistry in Antelope, CA",
  phoneDisplay: "(916) 727-6453",
  phoneHref: "tel:+19167276453",
  // All "Book online" CTAs route to the on-site scheduler (#visit), which
  // captures leads natively. When the practice provides its Dentrix Ascend
  // deep link, point this at it instead — the bare bookit.dentrixascend.com
  // domain lands on a generic portal that doesn't identify the practice.
  bookingHref: "#visit",
  addressLine1: "4320 Elverta Rd #3",
  addressLine2: "Antelope, CA 95843",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=4320%20Elverta%20Rd%20%233%20Antelope%20CA%2095843",
  serviceArea: ["Antelope", "Sacramento", "Roseville", "Citrus Heights", "North Highlands", "Folsom"],
};

// Imagery --------------------------------------------------------------------
// All assets are self-hosted under /public/images to remove the fragile
// dependency on the old site's CDN (which was hot-linked before).
export const imagery = {
  logo: "/images/logo.png",
  logoFull: "/images/logo-full.png",
  hero: "/images/abstract-hero.webp",
  care: "/images/abstract-care.webp",
  narodovich: "/images/dr-narodovich.jpg",
  sheppard: "/images/dr-sheppard.webp",
};

// Primary navigation ---------------------------------------------------------
export const navItems = [
  { label: "Care", href: "#services" },
  { label: "Technology", href: "#technology" },
  { label: "Doctors", href: "#doctors" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

// Marquee / trust strip ------------------------------------------------------
export const trustStrip = [
  "Accepting new patients",
  "Same-day emergency care when possible",
  "The Wand STA anesthesia",
  "CBCT 3D imaging",
  "Soft-tissue laser",
  "Open until 7 PM Wed & Thu",
  "Family · Cosmetic · Restorative",
  "Serving Greater Sacramento",
];

// Compact, single-line trust signals shown under the hero CTAs ----------------
export const heroTrust = [
  "Accepting new patients",
  "Same-day emergency care when possible",
  "Open until 7 PM Wed & Thu",
];

// Emergency pathway (high-intent, time-sensitive) ----------------------------
export const emergency = {
  eyebrow: "Dental emergency?",
  headline: "In pain right now? Call us first.",
  body: "A chipped or knocked-out tooth, swelling, a lost filling or crown, pain that kept you up last night. Call now and we'll do everything we can to see you today.",
};

// Social proof — keep this verifiable -----------------------------------------
// The quoted reviews live on this page (#reviews); more patient reviews are
// visible on the practice's Google Maps listing.
export const socialProof = {
  reviewsUrl: "#reviews",
  moreReviewsUrl: contact.mapsHref,
  label: "Read patient reviews",
};

// Quick facts (sub-hero band) ------------------------------------------------
export const quickFacts: { icon: LucideIcon; label: string; value: string }[] = [
  {
    icon: CalendarClock,
    label: "Booking",
    value: "Accepting new patients of all ages",
  },
  {
    icon: HeartPulse,
    label: "Emergencies",
    value: "Same-day visits when possible. Call first.",
  },
  {
    icon: Sparkles,
    label: "Extended hours",
    value: "Open until 7 PM Wednesday & Thursday",
  },
];

// Services -------------------------------------------------------------------
export type Service = {
  index: string;
  title: string;
  blurb: string;
  details: string[];
  icon: LucideIcon;
  accent: "brand" | "slate" | "ember" | "ink";
};

export const services: Service[] = [
  {
    index: "01",
    title: "Preventive care",
    blurb:
      "Exams, cleanings, and gum care that catch small problems while they're still small.",
    details: [
      "Comprehensive exams & cleanings",
      "Periodontal (gum) therapy",
      "Children's dentistry",
      "Bruxism & night guards",
    ],
    icon: ShieldCheck,
    accent: "brand",
  },
  {
    index: "02",
    title: "Cosmetic dentistry",
    blurb:
      "Whitening, veneers, and Invisalign planned around your face, not a one-size template.",
    details: [
      "Professional whitening",
      "Porcelain veneers",
      "Invisalign clear aligners",
      "Smile design & planning",
    ],
    icon: Sparkles,
    accent: "slate",
  },
  {
    index: "03",
    title: "Restorative dentistry",
    blurb:
      "Crowns, implants, dentures, and root canals built to last and to feel like your own teeth.",
    details: [
      "Crowns & bridges",
      "Dental implants",
      "Full & partial dentures",
      "Root canal therapy",
    ],
    icon: SmilePlus,
    accent: "ink",
  },
  {
    index: "04",
    title: "Oral surgery",
    blurb:
      "Extractions and wisdom teeth handled gently in-house, with specialists brought in when a case calls for one.",
    details: [
      "Tooth extractions",
      "Wisdom teeth removal",
      "Platelet rich fibrin (PRF)",
      "Specialist coordination",
    ],
    icon: Stethoscope,
    accent: "brand",
  },
];

// Technology grid ------------------------------------------------------------
export const technology: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: Boxes,
    title: "CBCT 3D imaging",
    body: "A full 3D view of teeth, roots, and bone, so implants and surgery are planned on the whole picture.",
  },
  {
    icon: Syringe,
    title: "The Wand STA",
    body: "Computer-controlled numbing that trades the dreaded syringe for a slow, precise, barely-there flow.",
  },
  {
    icon: Waves,
    title: "Soft tissue laser",
    body: "Treats gum tissue with less bleeding, less soreness, and faster healing than traditional tools.",
  },
  {
    icon: Microscope,
    title: "Digital X-rays",
    body: "Sharper images at a fraction of the radiation, on screen in seconds.",
  },
  {
    icon: Activity,
    title: "Oral cancer screening",
    body: "Part of every routine exam, because with oral cancer, early is everything.",
  },
  {
    icon: Droplets,
    title: "Modern sterilization",
    body: "Distilled-water lines and strict protocols in every treatment room, every day.",
  },
];

export const technologyTags = [
  "CBCT 3D imaging",
  "The Wand STA",
  "Digital X-rays",
  "Soft tissue laser",
  "Oral cancer screening",
  "Modern sterilization",
  "Perio Protect",
];

// Doctors --------------------------------------------------------------------
export type Doctor = {
  name: string;
  title: string;
  focus: string;
  image: string;
  description: string;
  credentials: string[];
};

export const doctors: Doctor[] = [
  {
    name: "Dr. Michael Narodovich",
    title: "DMD",
    focus: "Family & cosmetic dentistry",
    image: imagery.narodovich,
    description:
      "Patients call him Dr. Mike. He's who people ask for after years away from the chair: modern technique, steady hands, and zero judgment about how long it's been.",
    credentials: ["Doctor of Dental Medicine", "Gentle by default", "Anxious-patient care"],
  },
  {
    name: "Dr. Lucas L. Sheppard",
    title: "DMD",
    focus: "Endodontics",
    image: imagery.sheppard,
    description:
      "A root canal specialist and U.S. Air Force veteran, Dr. Sheppard takes on the complex cases. He diagnoses carefully and explains each step, which is how the words \"root canal\" stop being scary.",
    credentials: ["Endodontic specialist", "U.S. Air Force veteran", "Precise diagnostics"],
  },
];

// Reviews --------------------------------------------------------------------
export type Review = {
  quote: string;
  name: string;
  source: string;
};

// Quotes are verbatim from the practice's current website — do not edit their
// wording or punctuation; truncate only at a sentence boundary.
export const reviews: Review[] = [
  {
    quote:
      "Dr. Narodovich has given me the smile I've always wanted! The staff are very friendly, professional, and make you feel like family when you walk through the door.",
    name: "Kourtney W.",
    source: "the practice's website",
  },
  {
    quote:
      "Love this place! They took such great care of us on our visits. The experience overall was amazing.",
    name: "Tracy R.",
    source: "the practice's website",
  },
  {
    quote:
      "To me, Sacramento Dental Medicine is the best dental office in Sacramento! Dr. Narodovich and his staff are amazing!",
    name: "Catherine C.",
    source: "the practice's website",
  },
];

// Office hours ---------------------------------------------------------------
export const hours: { day: string; time: string }[] = [
  { day: "Monday", time: "9:00 AM – 6:00 PM" },
  { day: "Tuesday", time: "8:00 AM – 5:00 PM" },
  { day: "Wednesday", time: "10:00 AM – 7:00 PM" },
  { day: "Thursday", time: "11:00 AM – 7:00 PM" },
  { day: "Friday", time: "8:00 AM – 2:00 PM" },
  { day: "Sat – Sun", time: "Closed" },
];

// Scheduling -----------------------------------------------------------------
// Machine-readable hours (minutes from midnight) keyed by JS weekday (0=Sun).
// The scheduler generates real, bookable-looking time slots from these so the
// UX is honest about availability even before a booking backend is wired up.
export const officeHours: Record<number, { open: number; close: number } | null> = {
  0: null, // Sunday — closed
  1: { open: 9 * 60, close: 18 * 60 }, // Mon 9:00–6:00
  2: { open: 8 * 60, close: 17 * 60 }, // Tue 8:00–5:00
  3: { open: 10 * 60, close: 19 * 60 }, // Wed 10:00–7:00
  4: { open: 11 * 60, close: 19 * 60 }, // Thu 11:00–7:00
  5: { open: 8 * 60, close: 14 * 60 }, // Fri 8:00–2:00
  6: null, // Saturday — closed
};

// Minutes between selectable appointment start times.
export const slotIntervalMinutes = 30;

export type VisitType = {
  id: string;
  label: string;
  blurb: string;
  icon: LucideIcon;
  urgent?: boolean;
};

export const visitTypes: VisitType[] = [
  {
    id: "new-patient",
    label: "New patient exam",
    blurb: "Exam, X-rays & a gentle cleaning",
    icon: Stethoscope,
  },
  {
    id: "checkup",
    label: "Cleaning & checkup",
    blurb: "Routine preventive care",
    icon: Smile,
  },
  {
    id: "cosmetic",
    label: "Cosmetic consult",
    blurb: "Whitening, veneers, Invisalign",
    icon: Sparkles,
  },
  {
    id: "emergency",
    label: "Pain or emergency",
    blurb: "Call for the earliest available visit",
    icon: Siren,
    urgent: true,
  },
  {
    id: "other",
    label: "Something else",
    blurb: "Tell us what you need",
    icon: MessageCircle,
  },
];

// New patients — practical, high-intent info (coverage, payment, first visit)
export const newPatient = {
  eyebrow: "New patients",
  title: "Your first visit, without the unknowns.",
  intro:
    "Here's how coverage works, what to bring, and what actually happens in the chair.",
  billing: [
    {
      title: "Confirm your coverage",
      body: "One quick call to the front desk confirms whether your dental plan is accepted, before you ever sit down.",
    },
    {
      title: "Ask about payment options",
      body: "Paying without insurance? Call, and the front desk will walk you through your options.",
    },
    {
      title: "New patients welcome",
      body: "Now accepting new patients of all ages, from Antelope and across Greater Sacramento.",
    },
  ],
  bring: [
    "Photo ID",
    "Dental insurance card (if you have one)",
    "A list of current medications",
    "Your questions, and what you'd change about your smile",
  ],
  firstVisit:
    "Expect a comprehensive exam, digital X-rays if you need them, an unhurried conversation about your goals, and usually a gentle cleaning. You'll leave knowing exactly what we found and what we'd recommend next.",
};

// FAQ ------------------------------------------------------------------------
export const faqs: { q: string; a: string }[] = [
  {
    q: "Are you accepting new patients?",
    a: "Yes. Sacramento Dental Medicine is welcoming new patients of all ages across Antelope and Greater Sacramento. Book online or call the office, and we'll find a first appointment that fits your schedule.",
  },
  {
    q: "What should I expect at my first visit?",
    a: "Plan on a comprehensive exam, digital X-rays if needed, and a real conversation about your goals, usually followed by a gentle cleaning. Before you leave, we'll walk you through what we found and what we recommend.",
  },
  {
    q: "Do you handle dental emergencies?",
    a: "Yes. If you're in pain or have had a dental accident, call (916) 727-6453 right away. We'll tell you what to do immediately and do everything possible to see you the same day.",
  },
  {
    q: "Do you offer financing or payment plans?",
    a: "Coverage and payment options change, so the most reliable answer comes from a quick call to the front desk. We'll confirm whether your plan is accepted and explain the payment options currently available.",
  },
];

// Philosophy points (numbered editorial rows in the Intro section) -----------
export const philosophy = {
  points: [
    {
      title: "Straight answers first",
      body: "No upsell, no scare tactics. An honest read on your teeth, and a plan you understand before you commit to anything.",
    },
    {
      title: "Comfort, by design",
      body: "Computer-guided anesthesia, an unhurried pace, and a team that treats dental nerves as normal, because they are.",
    },
    {
      title: "Diagnosed, not guessed",
      body: "CBCT 3D imaging and digital X-rays show the full picture before we recommend anything.",
    },
  ],
};

// Structured data (schema.org / Dentist) -------------------------------------
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: contact.practiceName,
  image: imagery.hero,
  url: "https://sacramentodentalmedicine.com",
  telephone: "+1-916-727-6453",
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.addressLine1,
    addressLocality: "Antelope",
    addressRegion: "CA",
    postalCode: "95843",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "08:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "10:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "11:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "14:00" },
  ],
  areaServed: contact.serviceArea,
  medicalSpecialty: ["Dentistry", "Cosmetic Dentistry", "Endodontics"],
};

// FAQ structured data (schema.org / FAQPage) ---------------------------------
// Surfaces the existing FAQ content to search engines for rich results.
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};
