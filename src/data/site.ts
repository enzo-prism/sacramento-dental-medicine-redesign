import {
  Activity,
  Boxes,
  CalendarClock,
  Droplets,
  HeartPulse,
  type LucideIcon,
  Microscope,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Stethoscope,
  Syringe,
  Waves,
} from "lucide-react";

/** Official custom domain. Do not attach DNS from this repo. */
export const productionDomain = "https://sacramentodentalmedicine.com";

/** Appointment requests from the wisdom-teeth landing form POST here. */
export const formspreeEndpoint = "https://formspree.io/f/xvkpdvyz";

export const seo = {
  title: "Antelope, CA Dentist | Sacramento Dental Medicine",
  description:
    "Unhurried family, cosmetic, restorative, and urgent dental care on Elverta Rd in Antelope, CA. Open until 7 PM Wed & Thu. Call (916) 727-6453.",
  ogTitle: "Dentistry in Antelope you won't put off.",
  ogDescription:
    "Unhurried family, cosmetic, restorative, and emergency dental care in Antelope, CA. Accepting new patients of all ages.",
  ogImageAlt:
    "Sacramento Dental Medicine in Antelope, California: Unhurried family, cosmetic, restorative, and emergency dentistry.",
};

// Contact + conversion targets ----------------------------------------------
export const contact = {
  practiceName: "Sacramento Dental Medicine",
  shortName: "Sacramento Dental",
  tagline: "Family, cosmetic, restorative, and endodontic dentistry in Antelope, CA",
  phoneDisplay: "(916) 727-6453",
  phoneHref: "tel:+19167276453",
  // Confirmed 2026-09-23 RDA+Enzo client sync. Do not invent extra mailboxes.
  email: "office@sacramentodentalmedicine.com",
  emailHref: "mailto:office@sacramentodentalmedicine.com",
  // All booking CTAs route to /schedule, which embeds Jarvis online booking.
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
    alt: "Sacramento Dental Medicine exterior storefront at 4320 Elverta Rd #3 in Antelope",
    width: 1536,
    height: 1152,
  },
  {
    src: "/images/office-waiting.webp",
    alt: "Bright reception lounge with a tufted sofa, framed artwork, and marble-look tile on Elverta Road",
    width: 1536,
    height: 1152,
  },
  {
    src: "/images/office-lounge.webp",
    alt: "Waiting room seating corner with abstract wall art and a potted snake plant at the Antelope office",
    width: 1152,
    height: 1536,
  },
  {
    src: "/images/office-reception.webp",
    alt: "Front check-in desk and polished granite counter at Sacramento Dental Medicine",
    width: 1536,
    height: 1152,
  },
  {
    src: "/images/office-hallway.webp",
    alt: "Clean interior hallway lined with framed diplomas leading toward a treatment room",
    width: 1152,
    height: 1536,
  },
  {
    src: "/images/office-treatment.webp",
    alt: "Private dental treatment room equipped with a cushioned chair, overhead light, and cabinetry",
    width: 1152,
    height: 1536,
  },
  {
    src: "/images/office-operatory.webp",
    alt: "Treatment bay featuring a dental chair, handwashing station, and overhead ceiling monitor",
    width: 1152,
    height: 1536,
  },
  {
    src: "/images/office-scanner.webp",
    alt: "Digital intraoral scanner and room air purifier inside a treatment room on Elverta Road",
    width: 1152,
    height: 1536,
  },
];

// Primary navigation ---------------------------------------------------------
export const navItems = [
  { label: "Care", href: "/our-services" },
  { label: "Technology", href: "/#technology" },
  { label: "Doctors", href: "/#doctors" },
  { label: "Reviews", href: "/reviews" },
  { label: "Schedule", href: "/schedule" },
];

// Emergency pathway (high-intent, time-sensitive) ----------------------------
export const emergency = {
  eyebrow: "Dental emergency?",
  headline: "Hurting right now? Call us first.",
  body: "A throbbing toothache, sudden swelling, a cracked tooth, or a crown that just came loose—call our Elverta Road desk first. We'll walk you through what to do right away and get you in the same day whenever space opens up.",
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
    label: "New patients",
    value: "Welcoming kids, adults, and families",
  },
  {
    icon: HeartPulse,
    label: "Urgent care",
    value: "Same-day emergency visits when space allows",
  },
  {
    icon: Sparkles,
    label: "Evening hours",
    value: "Open until 7 PM Wednesdays & Thursdays",
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
      "Thorough checkups, gentle cleanings, and gum care designed to catch tiny issues long before they hurt or get expensive.",
    details: [
      "Exams & professional cleanings",
      "Periodontal (gum) therapy",
      "Children's dentistry",
      "Teeth grinding & night guards",
    ],
    icon: ShieldCheck,
    accent: "brand",
  },
  {
    index: "02",
    title: "Cosmetic dentistry",
    blurb:
      "Whitening, bonding, porcelain veneers, and Invisalign shaped to fit your face and bite—never an artificial cookie-cutter smile.",
    details: [
      "In-office & take-home whitening",
      "Porcelain veneers & bonding",
      "Invisalign clear aligners",
      "Personalized smile planning",
    ],
    icon: Sparkles,
    accent: "slate",
  },
  {
    index: "03",
    title: "Restorative dentistry",
    blurb:
      "Crowns, bridges, implants, dentures, and in-house root canal care built to restore real chewing strength and look completely natural.",
    details: [
      "Crowns & bridges",
      "Dental implants",
      "Full & partial dentures",
      "Specialist root canal therapy",
    ],
    icon: SmilePlus,
    accent: "ink",
  },
  {
    index: "04",
    title: "Oral surgery",
    blurb:
      "Extractions and wisdom teeth handled calmly under our own roof, with PRF or bone grafting when extra support helps the site.",
    details: [
      "Tooth extractions",
      "Wisdom teeth removal",
      "PRF & bone grafting",
      "Specialist coordination when needed",
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
    body: "Maps teeth, roots, nerves, and bone in three dimensions so implants, root canals, and surgery are planned with precision before we begin.",
  },
  {
    icon: Syringe,
    title: "The Wand STA",
    body: "Computer-guided local anesthesia that delivers numbing steadily and gently, replacing the sharp pressure of a traditional syringe.",
  },
  {
    icon: Waves,
    title: "Soft tissue laser",
    body: "Lets us treat gum tissue with greater accuracy, minimal bleeding, and an easier recovery than conventional instruments.",
  },
  {
    icon: Microscope,
    title: "Digital X-rays",
    body: "Crisp, high-detail images appear chairside in seconds using a fraction of the radiation of old film X-rays—so you can see exactly what we see.",
  },
  {
    icon: Activity,
    title: "Oral cancer screening",
    body: "A quick, painless visual and tissue check woven into routine exams, because catching changes early makes all the difference.",
  },
  {
    icon: Droplets,
    title: "Modern sterilization",
    body: "Distilled-water lines and hospital-grade sterilization protocols followed in every operatory, before every single patient.",
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
  href: string;
  bio: string[];
  education?: string[];
  licenseRecords?: { name: string; identifier: string; category: string; url: string }[];
};

export const doctors: Doctor[] = [
  {
    name: "Dr. Michael Narodovich",
    title: "DMD",
    focus: "Family & cosmetic dentistry",
    image: imagery.narodovich,
    description:
      "Most patients know him simply as Dr. Mike. People ask for him by name—especially when it's been years since their last cleaning—because he pairs a calm, careful hand with straight answers and zero lectures.",
    highlights: "Known as Dr. Mike · Anxious-patient friendly",
    href: "/meet-dr-narodovich",
    licenseRecords: [
    {
        "name": "California dentist license #57101",
        "identifier": "57101",
        "category": "Professional license",
        "url": "https://search.dca.ca.gov/profile/440/4401/57101/DDS"
    },
    {
        "name": "Moderate Sedation Permit #44",
        "identifier": "44",
        "category": "Permit",
        "url": "https://search.dca.ca.gov/profile/440/4417/44/MS"
    },
    {
        "name": "Adult Oral Conscious Sedation Certificate #1628",
        "identifier": "1628",
        "category": "Certificate",
        "url": "https://search.dca.ca.gov/profile/440/4406/1628/OCS"
    }
],
    education: ["The Ohio State University, Bachelor of Science", "Temple University, Doctor of Dental Medicine"],
    bio: [
      "Dr. Michael Narodovich grew up in Cleveland, Ohio, earned his Bachelor of Science at The Ohio State University, and completed his Doctor of Dental Medicine degree at Temple University in Philadelphia before putting down roots in Northern California.",
      "Here on Elverta Road, Dr. Mike cares for whole families—from a toddler's first look-around to cosmetic smile planning and long-overdue checkups. If dental visits have ever left you tense, brushed off, or embarrassed about how much time has passed, tell us upfront. We start with a real conversation, not a lecture.",
      "Every plan begins with an honest exam: we show you what we find, separate what needs attention now from what can wait, and walk through comfort choices—including computer-guided local numbing and any sedation options appropriate for your health history and procedure—before you commit to a thing.",
    ],
  },
  {
    name: "Dr. Lucas L. Sheppard",
    title: "DMD",
    focus: "Endodontics",
    image: imagery.sheppard,
    description:
      "An endodontic specialist and U.S. Air Force veteran, Dr. Sheppard focuses on saving compromised teeth and handling complex root canal cases. His thorough diagnosis and step-by-step explanations take the fear out of root canal care.",
    highlights: "Endodontic specialist · U.S. Air Force veteran",
    href: "/meet-dr-sheppard",
    bio: [
      "Dr. Lucas L. Sheppard is our in-house endodontic specialist and a U.S. Air Force veteran. While many neighborhood offices automatically send complex toothaches across town to an unfamiliar clinic, having Dr. Sheppard right here in Antelope means you can stay with a team that already knows you.",
      "Dr. Sheppard focuses on diagnosing the true source of deep tooth pain, treating infections inside the root canals, and preserving natural teeth whenever they can be predictably saved. After examining your tooth and reviewing imaging, he walks you through what's happening, whether saving the tooth makes sense, and how we'll coordinate any follow-up filling or crown.",
    ],
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
    "Reading all 428 written reviews side by side, six themes show up again and again: a genuinely warm team, a spotless office, Dr. Mike's calm bedside manner, multi-decade family loyalty, real relief for nervous patients, and upfront explanations without pressure.",
  lowerRatedNote:
    "In the smaller group of critical reviews, the recurring complaints involve front-desk communication gaps, insurance or cost surprises, scheduling hiccups, or discomfort during a procedure. We share that openly because knowing what patients flag keeps us accountable.",
};

// Theme counts are overlapping text matches across the 428 written Google
// reviews, not a survey or mutually exclusive categories.
export const googleReviewThemes: GoogleReviewTheme[] = [
  {
    title: "Friendly, kind care",
    count: 228,
    body: "Patients talk most about feeling welcomed like a neighbor—from front-desk greetings to assistants and hygienists who actually remember them.",
  },
  {
    title: "A clean, organized office",
    count: 140,
    body: "A spotless, well-run clinic is one of the first practical details patients notice the moment they walk in on Elverta Road.",
  },
  {
    title: "Dr. Mike",
    count: 100,
    body: "Over a hundred written reviews name Dr. Michael Narodovich directly for being thorough, gentle, unhurried, and easy to talk to.",
  },
  {
    title: "Long-term and family care",
    count: 89,
    body: "Patients describe bringing their kids, staying for 10 or 20+ years, and even making the drive back to Antelope after moving away.",
  },
  {
    title: "Comfort for anxious patients",
    count: 75,
    body: "People who once avoided dental chairs write that our pace and kindness made visits feel manageable—without a hint of judgment.",
  },
  {
    title: "Clear explanations",
    count: 64,
    body: "Patients appreciate seeing their X-rays, hearing real options, and knowing expected costs before anyone picks up an instrument.",
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

// New patients — practical, high-intent info (coverage, payment, first visit)
export const mediCalNotice = "We do not accept Medi-Cal.";

export const newPatient = {
  eyebrow: "New patients",
  title: "Your first visit, minus the guesswork.",
  intro:
    "Here is everything you need to know before you walk in—coverage, what to bring, and how we run a first appointment.",
  billing: [
    {
      title: "Check your dental plan first",
      body: `${mediCalNotice} Have another dental plan? Give our front desk a quick call before your appointment and we'll confirm whether we work with your plan.`,
    },
    {
      title: "Visiting without insurance",
      body: "No dental plan? No problem. Call us before you book and our front desk will walk you through current payment options and what an initial visit costs.",
    },
    {
      title: "All ages welcome",
      body: "We're accepting new patients—kids, adults, and seniors—from Antelope, Roseville, Citrus Heights, North Highlands, Sacramento, and Folsom.",
    },
  ],
  bring: [
    "A photo ID",
    "Your dental insurance card (if you carry one)",
    "A list of any current medications or allergies",
    "Your questions—and anything you've been hoping to fix or improve",
  ],
  firstVisit:
    "Plan on a comprehensive exam, digital X-rays only if needed, an unhurried talk about your goals, and typically a gentle cleaning. You'll walk out knowing exactly what we found, what needs attention now, and what can wait.",
};

// FAQ ------------------------------------------------------------------------
export const faqs: { q: string; a: string }[] = [
  {
    q: "Are you accepting new patients?",
    a: "Yes—we're welcoming new patients of all ages from Antelope and across Greater Sacramento. You can book directly online or call (916) 727-6453 and we'll find a time that fits your week.",
  },
  {
    q: "What happens at a first visit?",
    a: "We start by listening. You'll get a thorough exam of your teeth and gums, digital X-rays only where needed, an oral cancer screening, and usually a gentle cleaning. Before you leave, we review everything on screen and talk through next steps without pressure.",
  },
  {
    q: "Can you see me for a dental emergency?",
    a: "Yes. If you're dealing with tooth pain, swelling, or a broken tooth, call (916) 727-6453 right away. We'll tell you what to do in the meantime and work to see you the same day whenever space allows.",
  },
  {
    q: "What are your office hours?",
    a: `${hours
      .filter(({ time }) => time !== "Closed")
      .map(({ day, time }) => `${day} ${time}`)
      .join("; ")}. Closed Saturday and Sunday. Holiday hours may vary, so call (916) 727-6453 before making the trip.`,
  },
  {
    q: "Where is your office, and which areas do you serve?",
    a: `Find us at ${contact.addressLine1}, ${contact.addressLine2}, right on Elverta Road. Patients visit us from ${contact.serviceArea.slice(0, -1).join(", ")}, and ${contact.serviceArea.at(-1)}.`,
  },
  {
    q: "Do you accept Medi-Cal?",
    a: mediCalNotice,
  },
  {
    q: "How do insurance and payment options work?",
    a: "Because dental plans and payment options vary, the fastest way to get an accurate answer is a quick call to (916) 727-6453. Our front desk will check your plan, explain what to expect for an exam, and go over current payment options.",
  },
];

// Philosophy points (numbered editorial rows in the Intro section) -----------
export const philosophy = {
  points: [
    {
      title: "Honest answers, zero pressure",
      body: "We show you what's on the screen, tell you what truly needs care now versus what can wait, and never push work you don't understand or want.",
    },
    {
      title: "Built for nervous visits",
      body: "Computer-guided numbing with The Wand, a calm pace, and a team that treats dental anxiety as completely normal—even if it's been years since your last visit.",
    },
    {
      title: "See first, treat second",
      body: "CBCT 3D scans and digital X-rays let us diagnose from the full picture rather than guesswork, so your treatment plan holds up.",
    },
  ],
};

// Structured data (schema.org / Dentist) -------------------------------------
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${productionDomain}/#practice`,
  url: productionDomain,
  image: `${productionDomain}/images/office-exterior.webp`,
  logo: `${productionDomain}${imagery.logo}`,
  hasMap: contact.mapsHref,
  // Pin coordinates of the practice's Google Business Profile listing
  // (socialProof.moreReviewsUrl), not a geocoded estimate.
  geo: { "@type": "GeoCoordinates", latitude: 38.7122668, longitude: -121.3634404 },
  name: contact.practiceName,
  telephone: "+1-916-727-6453",
  email: contact.email,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-916-727-6453",
    email: contact.email,
    contactType: "customer service",
    areaServed: contact.serviceArea,
    availableLanguage: "English",
  },
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

};

// FAQ structured data (schema.org / FAQPage) ---------------------------------
// Describes visible answers. Google retired FAQ rich results in May 2026.
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
