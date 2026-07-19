import {
  Activity,
  BadgeCheck,
  Boxes,
  CalendarClock,
  Compass,
  Droplets,
  Gem,
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
  // TODO: replace with the practice-specific Dentrix Ascend deep link.
  // The bare domain lands on a generic portal; the on-site appointment form
  // (src/app/actions.ts) is the native fallback that captures leads directly.
  bookingHref: "https://bookit.dentrixascend.com",
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
  visit: "/images/abstract-visit.webp",
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
  "Emergency care available",
  "Accepting new patients",
  "The Wand STA injections",
  "CBCT 3D imaging",
  "Soft tissue laser",
  "Call to confirm insurance",
  "Ask about payment options",
  "Comfort-first care",
];

// Hero proof points ----------------------------------------------------------
export const proofPoints = [
  "Accepting new patients across Greater Sacramento",
  "Call for prompt emergency dental care",
  "Modern imaging & comfort-first technology",
];

// Compact, single-line trust signals shown under the hero CTAs ----------------
export const heroTrust = [
  "Accepting new patients",
  "Same-day emergency care when possible",
  "Call to confirm insurance coverage",
];

// Emergency pathway (high-intent, time-sensitive) ----------------------------
export const emergency = {
  eyebrow: "Dental emergency?",
  headline: "In pain or had an accident? Call us now.",
  body: "We’ll do everything we can to see emergency patients the same day — including chipped or knocked-out teeth, severe pain, swelling, or a lost filling or crown.",
};

// Social proof — keep this verifiable -----------------------------------------
export const socialProof = {
  reviewsUrl: `${siteUrl}/patient-reviews/`,
  label: "Read patient reviews",
};

// Quick facts (sub-hero band) ------------------------------------------------
export const quickFacts: { icon: LucideIcon; label: string; value: string }[] = [
  {
    icon: CalendarClock,
    label: "Booking",
    value: "Currently accepting new patients",
  },
  {
    icon: HeartPulse,
    label: "Emergencies",
    value: "Same-day care when possible — call now",
  },
  {
    icon: Sparkles,
    label: "Extended hours",
    value: "Open until 7 PM Wed & Thu",
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
      "Routine exams, cleanings, and gum care that keep small problems from becoming big ones.",
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
      "Whitening, veneers, and Invisalign planned around your features for a natural, confident smile.",
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
      "Crowns, implants, dentures, and root canals focused on longevity, comfort, and a natural look.",
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
      "Extractions, wisdom teeth, and coordinated specialty care delivered gently and precisely.",
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
    body: "Cone-beam scans give the team a complete view for surgical, implant, and diagnostic planning.",
  },
  {
    icon: Syringe,
    title: "The Wand STA",
    body: "Computer-controlled anesthesia makes injections gentler and far less intimidating.",
  },
  {
    icon: Waves,
    title: "Soft tissue laser",
    body: "Laser care supports cleaner, more comfortable treatment of gum tissue with less downtime.",
  },
  {
    icon: Microscope,
    title: "Digital X-rays",
    body: "Lower-radiation digital imaging produces clearer diagnostics in seconds, not minutes.",
  },
  {
    icon: Activity,
    title: "Oral cancer screening",
    body: "Routine screenings help catch concerns early, when they are most treatable.",
  },
  {
    icon: Droplets,
    title: "Modern sterilization",
    body: "Distilled-water systems and strict protocols keep every operatory sanitary and safe.",
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
      "Known to patients as Dr. Mike, he pairs modern technique with a calm chairside manner — especially for anxious patients who haven't been to the dentist in years.",
    credentials: ["Doctor of Dental Medicine", "Comfort-first focus", "Anxious-patient care"],
  },
  {
    name: "Dr. Lucas L. Sheppard",
    title: "DMD",
    focus: "Endodontics",
    image: imagery.sheppard,
    description:
      "An endodontic specialist and former Air Force dentist, Dr. Sheppard brings careful diagnosis, clear communication, and empathetic care to every root canal and complex case.",
    credentials: ["Endodontic specialist", "U.S. Air Force veteran", "Precise diagnostics"],
  },
];

// Reviews --------------------------------------------------------------------
export type Review = {
  quote: string;
  name: string;
  context: string;
  source: string;
};

export const reviews: Review[] = [
  {
    quote:
      "Dr. Narodovich has given me the smile I have always wanted. The staff are friendly, professional, and make you feel like family.",
    name: "Kourtney W.",
    context: "Cosmetic patient",
    source: "Practice website",
  },
  {
    quote:
      "Love this place. They took such great care of us on our visits. The experience overall was amazing.",
    name: "Tracy R.",
    context: "Family patient",
    source: "Practice website",
  },
  {
    quote:
      "To me, Sacramento Dental Medicine is the best dental office in Sacramento. Dr. Narodovich and his staff are amazing.",
    name: "Catherine C.",
    context: "Long-time patient",
    source: "Practice website",
  },
];

// Office hours ---------------------------------------------------------------
export const hours: { day: string; time: string; isToday?: boolean }[] = [
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
  title: "Everything you need for an easy first visit.",
  intro:
    "No surprises. Here's how billing works, what to bring, and what your first appointment looks like.",
  billing: [
    {
      title: "Confirm your coverage",
      body: "Call the office before your visit to confirm whether your dental plan is accepted.",
    },
    {
      title: "Ask about payment options",
      body: "The team can explain the payment options currently available for your care.",
    },
    {
      title: "New patients welcome",
      body: "The practice is currently accepting new patients from Antelope and Greater Sacramento.",
    },
  ],
  bring: [
    "Photo ID",
    "Dental insurance card (if you have one)",
    "A list of current medications",
    "Any questions or goals for your smile",
  ],
  firstVisit:
    "Your first visit usually includes a comprehensive exam, any necessary digital X-rays, a conversation about your goals, and a gentle cleaning when appropriate — followed by a clear care plan.",
};

// FAQ ------------------------------------------------------------------------
export const faqs: { q: string; a: string }[] = [
  {
    q: "Are you accepting new patients?",
    a: "Yes. Sacramento Dental Medicine is currently welcoming new patients of all ages across Antelope and Greater Sacramento. Book online or call the office to claim your first appointment.",
  },
  {
    q: "What should I expect at my first visit?",
    a: "Your first visit typically includes a comprehensive exam, any necessary digital X-rays or imaging, a conversation about your goals, and a gentle cleaning when appropriate. The team will explain the recommended care plan and answer your questions.",
  },
  {
    q: "Do you handle dental emergencies?",
    a: "Yes. If you're in pain or have had a dental accident, call (916) 727-6453 right away. The team will give you instructions and do everything possible to see you promptly.",
  },
  {
    q: "Do you offer financing or payment plans?",
    a: "Please call the office to confirm insurance coverage and ask which payment options are currently available.",
  },
];

// Distillation icons (used in philosophy band) ------------------------------
export const philosophy = {
  icon: Gem,
  points: [
    {
      icon: Compass,
      title: "Clear from the first call",
      body: "Clear answers and a care plan you understand before treatment begins.",
    },
    {
      icon: HeartPulse,
      title: "Comfort is the standard",
      body: "From The Wand STA to a calm, unhurried pace, every detail is designed for anxious and first-time patients.",
    },
    {
      icon: BadgeCheck,
      title: "Built on modern diagnostics",
      body: "CBCT 3D imaging and digital workflows mean fewer surprises and more predictable outcomes.",
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
