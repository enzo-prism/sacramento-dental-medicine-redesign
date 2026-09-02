import {
  Activity,
  Boxes,
  CalendarClock,
  Droplets,
  Ellipsis,
  HeartPulse,
  type LucideIcon,
  Microscope,
  ShieldCheck,
  Smile,
  SmilePlus,
  Sparkles,
  Stethoscope,
  Syringe,
  UserPlus,
  Waves,
} from "lucide-react";

// Public Formspree form — appointment requests POST here from the Server Action.
export const formspreeEndpoint = "https://formspree.io/f/xvkpdvyz";

/** Official custom domain. Do not attach DNS from this repo. */
export const productionDomain = "https://sacramentodentalmedicine.com";

export const seo = {
  title: "Antelope, CA Dentist | Sacramento Dental Medicine",
  description:
    "Gentle family, cosmetic, restorative and emergency dentistry in Antelope, CA. New patients welcome; same-day emergency visits when possible.",
  ogTitle: "A dentist visit you won't dread.",
  ogDescription:
    "Gentle family, cosmetic and emergency care in Antelope, CA. New patients welcome.",
  ogImageAlt:
    "Sacramento Dental Medicine in Antelope, California: A dentist visit you won't dread.",
};

// Contact + conversion targets ----------------------------------------------
export const contact = {
  practiceName: "Sacramento Dental Medicine",
  shortName: "Sacramento Dental",
  tagline: "Modern family, cosmetic & restorative dentistry in Antelope, CA",
  phoneDisplay: "(916) 727-6453",
  phoneHref: "tel:+19167276453",
  // All booking CTAs route to the dedicated on-site scheduling page, which
  // captures leads natively. When the practice provides its Dentrix Ascend
  // deep link, point this at it instead — the bare bookit.dentrixascend.com
  // domain lands on a generic portal that doesn't identify the practice.
  bookingHref: "/schedule",
  addressLine1: "4320 Elverta Rd #3",
  addressLine2: "Antelope, CA 95843",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=4320%20Elverta%20Rd%20%233%20Antelope%20CA%2095843",
  serviceArea: ["Antelope", "Sacramento", "Roseville", "Citrus Heights", "North Highlands", "Folsom"],
};

// Imagery --------------------------------------------------------------------
// All assets are self-hosted under /public/images.
// Hero, waiting, and still-life frames are atmospheric stand-ins — they are
// not photographs of the Elverta Road office. Doctor portraits are the
// practice's own photos, matted. `officePhotos` are Mike's August 2026
// JPEGs of 4320 Elverta Rd #3 (IMG_4036–4044, 4046). IMG_4040 and IMG_4043
// were dropped as near-duplicates of reception and the same treatment room.
export const imagery = {
  logo: "/images/logo-mark.png",
  logoFull: "/images/logo-full-on-dark.png",
  hero: "/images/hero.webp",
  care: "/images/waiting.webp",
  stillLife: "/images/still-life.webp",
  narodovich: "/images/dr-narodovich.webp",
  sheppard: "/images/dr-sheppard-portrait.webp",
};

export type OfficePhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const officePhotos: OfficePhoto[] = [
  {
    src: "/images/office-exterior.webp",
    alt: "Sacramento Dental Medicine storefront at 4320 Elverta Rd in Antelope",
    width: 1536,
    height: 1152,
  },
  {
    src: "/images/office-waiting.webp",
    alt: "Waiting area with a tufted sofa, artwork, and marble-look tile at the Elverta Road office",
    width: 1536,
    height: 1152,
  },
  {
    src: "/images/office-lounge.webp",
    alt: "Lounge seating, abstract wall art, and a snake plant in the office waiting room",
    width: 1152,
    height: 1536,
  },
  {
    src: "/images/office-reception.webp",
    alt: "Front reception desk and granite counter at Sacramento Dental Medicine",
    width: 1536,
    height: 1152,
  },
  {
    src: "/images/office-hallway.webp",
    alt: "Office hallway with framed certificates looking into a treatment room",
    width: 1152,
    height: 1536,
  },
  {
    src: "/images/office-treatment.webp",
    alt: "Treatment room with a dental chair, exam light, and cabinetry",
    width: 1152,
    height: 1536,
  },
  {
    src: "/images/office-operatory.webp",
    alt: "Treatment bay with a dental chair, sink station, and ceiling monitor",
    width: 1152,
    height: 1536,
  },
  {
    src: "/images/office-scanner.webp",
    alt: "Intraoral scanner and air purifier in a treatment room at the Elverta Road office",
    width: 1152,
    height: 1536,
  },
];

// Primary navigation ---------------------------------------------------------
export const navItems = [
  { label: "Care", href: "/#services" },
  { label: "Technology", href: "/#technology" },
  { label: "Doctors", href: "/#doctors" },
  { label: "Reviews", href: "/reviews" },
  { label: "Schedule", href: "/schedule" },
];

// Emergency pathway (high-intent, time-sensitive) ----------------------------
export const emergency = {
  eyebrow: "Dental emergency?",
  headline: "In pain right now? Call us first.",
  body: "A chipped or knocked-out tooth, swelling, a lost filling or crown, pain that kept you up last night. Call now and we'll do everything we can to see you today.",
};

// Social proof — verified directly against the practice's Google Business
// Profile on August 24, 2026. Counts will change as new reviews arrive, so
// re-check the live listing before revising this snapshot.
export const socialProof = {
  rating: 4.8,
  totalReviews: 632,
  fiveStarReviews: 589,
  writtenReviews: 428,
  checkedDate: "August 24, 2026",
  reviewsUrl: "/reviews",
  moreReviewsUrl:
    "https://www.google.com/maps/place/Sacramento+Dental+Medicine/@38.7122668,-121.3634404,17z/data=!4m8!3m7!1s0x809b274f1a844d9f:0xe2ebfbf8063fa173!8m2!3d38.7122668!4d-121.3634404!9m1!1b1!16s%2Fg%2F1vzg2h6z",
  label: "Read all patient reviews",
  distribution: [
    { stars: 5, count: 589 },
    { stars: 4, count: 16 },
    { stars: 3, count: 9 },
    { stars: 2, count: 4 },
    { stars: 1, count: 14 },
  ],
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


// Doctors --------------------------------------------------------------------
export type Doctor = {
  name: string;
  title: string;
  focus: string;
  image: string;
  description: string;
  highlights: string;
};

export const doctors: Doctor[] = [
  {
    name: "Dr. Michael Narodovich",
    title: "DMD",
    focus: "Family & cosmetic dentistry",
    image: imagery.narodovich,
    description:
      "Patients call him Dr. Mike. He's who people ask for after years away from the chair: modern technique, steady hands, and zero judgment about how long it's been.",
    highlights: "Gentle by default · Anxious-patient care",
  },
  {
    name: "Dr. Lucas L. Sheppard",
    title: "DMD",
    focus: "Endodontics",
    image: imagery.sheppard,
    description:
      "A root canal specialist and U.S. Air Force veteran, Dr. Sheppard takes on the complex cases. He diagnoses carefully and explains each step, which is how the words \"root canal\" stop being scary.",
    highlights: "Endodontic specialist · U.S. Air Force veteran",
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

export type GoogleReviewTheme = {
  title: string;
  count: number;
  body: string;
};

export const googleReviewAnalysis = {
  summary:
    "Across the full corpus, patients most often praise a kind team, a clean office, Dr. Mike, long-term and family care, comfort for anxious patients, and clear explanations.",
  lowerRatedNote:
    "The smaller set of lower-rated reviews most often mentions communication friction, cost or insurance frustration, scheduling issues, or procedure discomfort.",
};

// Theme counts are overlapping text matches across the 428 written Google
// reviews, not a survey or mutually exclusive categories.
export const googleReviewThemes: GoogleReviewTheme[] = [
  {
    title: "Friendly, kind care",
    count: 228,
    body: "Patients repeatedly describe a warm welcome, patient assistants, and a team that remembers them.",
  },
  {
    title: "A clean, organized office",
    count: 140,
    body: "Cleanliness and organization are among the most common practical details patients mention.",
  },
  {
    title: "Dr. Mike",
    count: 100,
    body: "Reviews frequently call out Dr. Michael Narodovich for being thorough, gentle, and easy to talk to.",
  },
  {
    title: "Long-term and family care",
    count: 89,
    body: "Many patients mention years with the practice, bringing family, or continuing to drive back after moving.",
  },
  {
    title: "Comfort for anxious patients",
    count: 75,
    body: "People who describe dental anxiety often say the team helped them feel safe, relaxed, and never judged.",
  },
  {
    title: "Clear explanations",
    count: 64,
    body: "Patients value having X-rays, options, costs, and next steps explained before treatment begins.",
  },
];

export type GoogleReviewExcerpt = {
  quote: string;
  name: string;
  date: string;
  theme: "Comfort" | "Communication" | "Team" | "Long-term care" | "Urgent care";
};

// Short excerpts from public Google reviews. Each excerpt is under 25 words;
// the full, live reviews remain on Google via socialProof.moreReviewsUrl.
export const googleReviewExcerpts: GoogleReviewExcerpt[] = [
  {
    quote: "They make the experience completely doable and not so scary.",
    name: "Rebecca Simpson",
    date: "2 years ago",
    theme: "Comfort",
  },
  {
    quote: "He takes the time to explain everything and give me options, so I don’t feel pressured.",
    name: "Whitney Eklund",
    date: "2 years ago",
    theme: "Communication",
  },
  {
    quote: "Staff are professional & friendly; made me feel very welcomed.",
    name: "Beverly A. Plunkett",
    date: "Edited 2 years ago",
    theme: "Team",
  },
  {
    quote: "We have been going to Sacramento Dental Medicine for over 20 years.",
    name: "Ael S.",
    date: "Edited a year ago",
    theme: "Long-term care",
  },
  {
    quote: "I am so happy to finally have found a dental team that I can trust.",
    name: "Roxanne Gray",
    date: "Edited 4 years ago",
    theme: "Comfort",
  },
  {
    quote: "Everyone who treated me was very thorough and explained every step of the appointment.",
    name: "Megan E. Swan",
    date: "8 years ago",
    theme: "Communication",
  },
  {
    quote: "The staff were kind, friendly and above all else concerned enough to stay late to save my tooth.",
    name: "Riptan Tornup",
    date: "2 years ago",
    theme: "Urgent care",
  },
  {
    quote: "We even moved out of the area a few years ago but commute back to them because they’re so great.",
    name: "Dave Eubanks",
    date: "4 years ago",
    theme: "Long-term care",
  },
  {
    quote: "Kim the cleaning tech was very gentle on my sensitive teeth and did an amazing job.",
    name: "Haley Daniels",
    date: "2 years ago",
    theme: "Team",
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
// The scheduler offers morning / afternoon / evening windows from these hours
// rather than 30-minute slots that look like live inventory.
export const officeHours: Record<number, { open: number; close: number } | null> = {
  0: null, // Sunday — closed
  1: { open: 9 * 60, close: 18 * 60 }, // Mon 9:00–6:00
  2: { open: 8 * 60, close: 17 * 60 }, // Tue 8:00–5:00
  3: { open: 10 * 60, close: 19 * 60 }, // Wed 10:00–7:00
  4: { open: 11 * 60, close: 19 * 60 }, // Thu 11:00–7:00
  5: { open: 8 * 60, close: 14 * 60 }, // Fri 8:00–2:00
  6: null, // Saturday — closed
};

// Scheduler offers morning / afternoon / evening windows inside office hours
// rather than 30-minute slots that look like live inventory.

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
    icon: UserPlus,
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
    icon: HeartPulse,
    urgent: true,
  },
  {
    id: "other",
    label: "Something else",
    blurb: "Tell us what you need",
    icon: Ellipsis,
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
    a: "Yes. Sacramento Dental Medicine is welcoming new patients of all ages across Antelope and Greater Sacramento. Request a visit online or call the office, and we'll find a first appointment that fits your schedule.",
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
  telephone: "+1-916-727-6453",
  sameAs: [socialProof.moreReviewsUrl],
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: socialProof.rating,
    reviewCount: socialProof.totalReviews,
    bestRating: 5,
    worstRating: 1,
  },
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
