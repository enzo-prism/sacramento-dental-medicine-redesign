import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  HeartPulse,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Waves,
} from "lucide-react";

const bookingHref = "https://bookit.dentrixascend.com";
const phoneHref = "tel:+19167276453";
const mapsHref =
  "https://www.google.com/maps/search/?api=1&query=4320%20Elverta%20Rd%20%233%20Antelope%20CA%2095843";

const images = {
  logo: "https://optimasites.cloudfrontend.net/img/upload/sacramentodentalmed_practice_logo_icon.png",
  hero: "/images/abstract-hero.webp",
  care: "/images/abstract-care.webp",
  visit: "/images/abstract-visit.webp",
  narodovich:
    "https://sacramentodentalmedicine.com/img/upload/michael_narodovich_dmd.jpg",
  sheppard:
    "https://sacramentodentalmedicine.com/img/upload/dr-sheppard.big.webp",
};

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Doctors", href: "#doctors" },
  { label: "Technology", href: "#technology" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

const trustPoints = [
  "Accepting new patients",
  "Same-day emergencies when possible",
  "Advanced imaging and comfort technology",
];

const services = [
  {
    title: "Preventive care",
    description:
      "Routine exams, cleanings, gum care, bruxism care, children's dentistry, and extractions when needed.",
    icon: ShieldCheck,
    color: "bg-[#e3f0ec] text-[#1d6f65]",
  },
  {
    title: "Cosmetic dentistry",
    description:
      "Whitening, veneers, Invisalign, and smile planning for brighter, more confident everyday smiles.",
    icon: Sparkles,
    color: "bg-[#fff0e7] text-[#b65f43]",
  },
  {
    title: "Restorative dentistry",
    description:
      "Crowns, dental implants, dentures, root canal therapy, and repairs focused on comfort and longevity.",
    icon: SmilePlus,
    color: "bg-[#e8eef9] text-[#315f9d]",
  },
  {
    title: "Oral surgery",
    description:
      "Wisdom teeth, tooth extractions, platelet rich fibrin, and coordinated specialty care when appropriate.",
    icon: Stethoscope,
    color: "bg-[#edf0df] text-[#6a7d2f]",
  },
];

const technology = [
  "CBCT 3D imaging",
  "The Wand STA injections",
  "Digital X-rays",
  "Soft tissue laser",
  "Oral cancer screenings",
  "Modern sterilization",
  "Perio Protect",
];

const doctors = [
  {
    name: "Dr. Michael Narodovich",
    title: "DMD",
    image: images.narodovich,
    description:
      "Known to patients as Dr. Mike, he combines modern dental care with a strong focus on safe, comfortable treatment for anxious patients.",
  },
  {
    name: "Dr. Lucas L. Sheppard",
    title: "DMD",
    image: images.sheppard,
    description:
      "An endodontic specialist and former Air Force dentist, Dr. Sheppard brings clear communication, careful diagnosis, and empathetic care.",
  },
];

const reviews = [
  {
    quote:
      "Dr. Narodovich has given me the smile I have always wanted. The staff are friendly, professional, and make you feel like family.",
    name: "Kourtney W.",
  },
  {
    quote:
      "Love this place. They took such great care of us on our visits. The experience overall was amazing.",
    name: "Tracy R.",
  },
  {
    quote:
      "To me, Sacramento Dental Medicine is the best dental office in Sacramento. Dr. Narodovich and his staff are amazing.",
    name: "Catherine C.",
  },
];

const hours = [
  ["Mon", "9:00 AM - 6:00 PM"],
  ["Tue", "8:00 AM - 5:00 PM"],
  ["Wed", "10:00 AM - 7:00 PM"],
  ["Thu", "11:00 AM - 7:00 PM"],
  ["Fri", "8:00 AM - 2:00 PM"],
  ["Sat - Sun", "Closed"],
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Sacramento Dental Medicine",
  image: images.hero,
  url: "https://sacramentodentalmedicine.com",
  telephone: "+1-916-727-6453",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4320 Elverta Rd #3",
    addressLocality: "Antelope",
    addressRegion: "CA",
    postalCode: "95843",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "11:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "08:00",
      closes: "14:00",
    },
  ],
  areaServed: ["Antelope", "Sacramento", "Roseville", "Citrus Heights"],
  medicalSpecialty: ["Dentistry", "Cosmetic Dentistry", "Endodontics"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-[#fbfaf7] pb-24 text-[#182433] lg:pb-0">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#102039]/88 text-white shadow-[0_14px_45px_rgba(16,32,57,0.12)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Home">
            <span className="grid size-9 place-items-center rounded-lg bg-white shadow-sm lg:size-10">
              <Image
                src={images.logo}
                alt=""
                width={30}
                height={24}
                unoptimized
                className="h-6 w-auto lg:h-7"
              />
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] font-semibold tracking-[0.18em] text-white/64 lg:text-sm lg:tracking-[0.14em]">
                ANTELOPE, CA
              </span>
              <span className="block text-sm font-semibold sm:hidden">
                Sacramento Dental
              </span>
              <span className="hidden text-sm font-semibold sm:block lg:text-base">
                Sacramento Dental Medicine
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-white/80 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-1 py-2 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={phoneHref}
              className="interactive-button inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              <Phone className="size-4" />
              (916) 727-6453
            </a>
            <a
              href={bookingHref}
              className="interactive-button inline-flex h-10 items-center gap-2 rounded-lg bg-[#f2c36b] px-4 text-sm font-bold text-[#142033] transition hover:bg-[#ffd27c]"
            >
              Book online
              <ArrowRight className="size-4" />
            </a>
          </div>

          <details className="relative lg:hidden">
            <summary
              className="interactive-button grid size-10 cursor-pointer list-none place-items-center rounded-lg border border-white/20 bg-white/6"
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </summary>
            <div className="mobile-menu-panel absolute right-0 mt-3 w-72 rounded-lg border border-white/10 bg-[#102039] p-3 shadow-2xl">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                  <ChevronRight className="size-4" />
                </a>
              ))}
              <a
                href={bookingHref}
                className="interactive-button mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#f2c36b] px-3 py-3 text-sm font-bold text-[#142033]"
              >
                Book online
                <ArrowRight className="size-4" />
              </a>
            </div>
          </details>
        </div>
      </header>

      <section
        id="top"
        className="hero-shell relative flex min-h-[88svh] items-end overflow-hidden pt-24 text-white md:min-h-[78svh] md:pt-28"
      >
        <Image
          src={images.hero}
          alt="Soft abstract painting in navy, teal, ivory, and gold"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[67%_center] md:object-center"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="hero-thread hero-thread-top" aria-hidden="true" />
        <div className="hero-thread hero-thread-bottom" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-5 px-4 pb-8 sm:pb-12 lg:grid-cols-[1fr_360px] lg:gap-10 lg:px-8">
          <ScrollReveal className="max-w-3xl" variant="slide-right">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/24 bg-white/12 px-3 py-2 text-xs font-semibold text-white/90 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur md:text-sm">
              <MapPin className="size-4 text-[#f2c36b]" />
              <span className="hidden sm:inline">
                4320 Elverta Rd #3, Antelope, CA 95843
              </span>
              <span className="sm:hidden">Antelope, CA</span>
            </div>
            <h1 className="text-balance text-[3rem] font-semibold leading-[0.94] tracking-normal text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Sacramento Dental Medicine
            </h1>
            <p className="mt-5 max-w-2xl text-balance text-base leading-7 text-white/86 md:text-xl md:leading-8">
              Modern family, cosmetic, restorative, and emergency dental care
              for Antelope and Greater Sacramento, led by a team that keeps
              comfort and clarity at the center of every visit.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={bookingHref}
                className="interactive-button inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#f2c36b] px-5 text-base font-bold text-[#142033] shadow-[0_16px_34px_rgba(242,195,107,0.22)] transition hover:bg-[#ffd27c]"
              >
                Schedule today
                <CalendarDays className="size-5" />
              </a>
              <a
                href={phoneHref}
                className="interactive-button inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/28 bg-white/10 px-5 text-base font-bold text-white shadow-[0_16px_34px_rgba(0,0,0,0.16)] backdrop-blur transition hover:bg-white/18"
              >
                Call the office
                <Phone className="size-5" />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={140}
            className="float-soft self-end rounded-lg border border-white/18 bg-white/12 p-4 shadow-[0_22px_60px_rgba(0,0,0,0.22)] backdrop-blur-md"
            variant="scale"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f2c36b] md:text-sm">
              Why patients choose us
            </p>
            <div className="mt-4 space-y-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm">
                  <span className="icon-breathe mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-white text-[#1d6f65]">
                    <Check className="size-4" />
                  </span>
                  <span className="leading-6 text-white/88">{point}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-[#e5ddd1] bg-white">
        <div className="quick-facts mx-auto flex max-w-7xl snap-x gap-3 overflow-x-auto px-4 py-5 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible lg:px-8">
          {[
            {
              icon: <CalendarDays className="size-5" />,
              label: "New patients",
              value: "Currently accepting appointments",
            },
            {
              icon: <HeartPulse className="size-5" />,
              label: "Dental emergencies",
              value: "Call for same-day availability",
            },
            {
              icon: <Clock3 className="size-5" />,
              label: "Extended days",
              value: "Open until 7 PM Wednesday and Thursday",
            },
          ].map((fact, index) => (
            <ScrollReveal
              key={fact.label}
              delay={index * 80}
              className="min-w-[82%] snap-start md:min-w-0"
              variant="scale"
            >
              <QuickFact {...fact} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section-shell bg-[#fbfaf7] px-4 py-16 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <ScrollReveal
            className="image-panel relative min-h-[310px] overflow-hidden rounded-lg sm:min-h-[380px] lg:min-h-[420px]"
            variant="slide-right"
          >
            <Image
              src={images.care}
              alt="Soft abstract painting inspired by calm modern care"
              fill
              loading="eager"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="eyebrow text-sm font-bold uppercase tracking-[0.18em] text-[#1d6f65]">
              Simple from the first step
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal text-[#102039] sm:text-4xl md:text-6xl">
              Clear answers before you sit in the chair.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#52606f] md:text-lg md:leading-8">
              From the first call to the follow-up plan, the practice keeps the
              details easy to understand: what care is offered, who patients
              will meet, how appointments work, and what technology supports
              the visit.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Book online or call the Antelope office",
                "Explore preventive, cosmetic, restorative, and surgical care",
                "Meet the doctors before the appointment",
                "Check hours, address, and directions quickly",
              ].map((item) => (
                <div
                  key={item}
                  className="interactive-card flex gap-3 rounded-lg border border-[#e5ddd1] bg-white p-4 shadow-[0_12px_30px_rgba(16,32,57,0.04)]"
                >
                  <Check className="mt-1 size-5 shrink-0 text-[#1d6f65]" />
                  <p className="text-sm leading-6 text-[#334155]">{item}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="services" className="section-shell bg-white px-4 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-sm font-bold uppercase tracking-[0.18em] text-[#b65f43]">
                Dental services
              </p>
              <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-normal text-[#102039] sm:text-4xl md:text-6xl">
                Full-scope care for healthy, confident smiles.
              </h2>
            </div>
            <a
              href={bookingHref}
              className="interactive-button inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#102039] px-5 text-base font-bold text-white transition hover:bg-[#1c3459]"
            >
              Schedule a consultation
              <ArrowRight className="size-5" />
            </a>
          </ScrollReveal>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <ScrollReveal
                key={service.title}
                delay={index * 90}
                variant="scale"
              >
                <article
                  className="interactive-card h-full rounded-lg border border-[#e5ddd1] bg-[#fbfaf7] p-5 shadow-[0_18px_44px_rgba(16,32,57,0.04)] md:p-6"
                >
                  <div
                    className={`icon-breathe mb-7 grid size-12 place-items-center rounded-lg ${service.color}`}
                  >
                    <service.icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#102039] md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#52606f]">
                    {service.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="tech-section relative overflow-hidden bg-[#102039] px-4 py-16 text-white md:py-20 lg:px-8">
        <div className="care-signal" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
          <ScrollReveal>
            <p className="eyebrow text-sm font-bold uppercase tracking-[0.18em] text-[#f2c36b]">
              Technology and comfort
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal sm:text-4xl md:text-6xl">
              Modern tools, calmer appointments.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/76 md:text-lg md:leading-8">
              Sacramento Dental Medicine highlights digital X-rays, CBCT 3D
              imaging, The Wand injection system, soft tissue laser care, and a
              sterilization approach designed for safety and patient confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {technology.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-white/12 bg-white/8 px-3 py-2 text-sm font-semibold text-white/86"
                >
                  {item}
                </span>
              ))}
            </div>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: <Syringe className="size-6" />,
                title: "Comfort-first injections",
                body: "The Wand STA system helps make injections gentler and less intimidating than traditional syringes.",
              },
              {
                icon: <SmilePlus className="size-6" />,
                title: "Precise treatment planning",
                body: "CBCT 3D imaging gives the team a more complete view for surgical and implant-related planning.",
              },
              {
                icon: <Waves className="size-6" />,
                title: "Cleaner water systems",
                body: "Modern sterilization and distilled water systems support a sanitary care environment.",
              },
              {
                icon: <HeartPulse className="size-6" />,
                title: "Preventive screening",
                body: "Oral cancer screenings and digital diagnostics help patients make informed decisions earlier.",
              },
            ].map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 90} variant="scale">
                <TechCard {...card} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="doctors" className="section-shell bg-[#eef3ed] px-4 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-3xl">
            <p className="eyebrow text-sm font-bold uppercase tracking-[0.18em] text-[#1d6f65]">
              Meet the doctors
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal text-[#102039] sm:text-4xl md:text-6xl">
              Experienced care with a human voice.
            </h2>
          </ScrollReveal>
          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            {doctors.map((doctor, index) => (
              <ScrollReveal
                key={doctor.name}
                delay={index * 120}
                variant={index % 2 === 0 ? "slide-right" : "slide-left"}
              >
                <article className="doctor-card interactive-card grid overflow-hidden rounded-lg border border-[#d7dfd2] bg-white shadow-[0_20px_50px_rgba(16,32,57,0.07)] md:grid-cols-[220px_1fr]">
                  <div className="relative min-h-[260px] md:min-h-full">
                    <Image
                      src={doctor.image}
                      alt={`${doctor.name}, ${doctor.title}`}
                      fill
                      loading="eager"
                      unoptimized
                      sizes="(min-width: 1024px) 220px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 md:p-8">
                    <p className="eyebrow text-xs font-bold uppercase tracking-[0.18em] text-[#b65f43] md:text-sm">
                      {doctor.title}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#102039] md:text-3xl">
                      {doctor.name}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#52606f] md:text-base md:leading-8">
                      {doctor.description}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="section-shell bg-white px-4 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow text-sm font-bold uppercase tracking-[0.18em] text-[#315f9d]">
                Patient reviews
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal text-[#102039] sm:text-4xl md:text-6xl">
                Warm care patients remember.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#52606f] md:text-lg md:leading-8">
              Patients repeatedly point to friendly staff, a family feeling,
              and a comfortable experience. Those details matter when choosing
              care for yourself or your family.
            </p>
          </ScrollReveal>

          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <ScrollReveal
                key={review.name}
                delay={index * 90}
                variant="scale"
              >
                <article className="interactive-card h-full rounded-lg border border-[#e5ddd1] bg-[#fbfaf7] p-5 shadow-[0_18px_44px_rgba(16,32,57,0.04)] md:p-6">
                  <div className="mb-5 flex text-[#d8a34d]" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="star-soft size-5 fill-current"
                        style={
                          { "--star-delay": `${starIndex * 90}ms` } as CSSProperties
                        }
                      />
                    ))}
                  </div>
                  <p className="text-base leading-7 text-[#263547] md:text-lg md:leading-8">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#52606f] md:text-sm">
                    {review.name}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="section-shell bg-[#fbfaf7] px-4 py-16 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <ScrollReveal className="rounded-lg border border-[#e5ddd1] bg-white p-5 shadow-[0_20px_60px_rgba(16,32,57,0.06)] md:p-8">
            <p className="eyebrow text-sm font-bold uppercase tracking-[0.18em] text-[#1d6f65]">
              Visit the practice
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal text-[#102039] sm:text-4xl md:text-6xl">
              Book online, call, or get directions.
            </h2>
            <div className="mt-7 grid gap-3 md:grid-cols-3 md:gap-4">
              <VisitAction
                icon={<CalendarDays className="size-5" />}
                title="Book"
                body="Schedule through Dentrix Ascend."
                href={bookingHref}
                label="Book online"
              />
              <VisitAction
                icon={<Phone className="size-5" />}
                title="Call"
                body="Talk with the Antelope office."
                href={phoneHref}
                label="Call now"
              />
              <VisitAction
                icon={<MapPin className="size-5" />}
                title="Directions"
                body="4320 Elverta Rd #3."
                href={mapsHref}
                label="Open map"
              />
            </div>
            <div className="mt-7 overflow-hidden rounded-lg border border-[#e5ddd1]">
              {hours.map(([day, time]) => (
                <div
                  key={day}
                  className="grid grid-cols-[120px_1fr] border-b border-[#e5ddd1] bg-[#fbfaf7] px-4 py-3 text-sm last:border-b-0"
                >
                  <span className="font-bold text-[#102039]">{day}</span>
                  <span className="text-[#52606f]">{time}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal
            delay={120}
            className="image-panel relative min-h-[390px] overflow-hidden rounded-lg sm:min-h-[500px] lg:min-h-[560px]"
            variant="slide-left"
          >
            <Image
              src={images.visit}
              alt="Soft abstract painting with a welcoming path of warm light"
              fill
              loading="eager"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-lg bg-white p-4 shadow-2xl md:inset-x-5 md:bottom-5 md:p-5">
              <p className="eyebrow text-xs font-bold uppercase tracking-[0.18em] text-[#b65f43] md:text-sm">
                Sacramento Dental Medicine
              </p>
              <p className="mt-2 text-xl font-semibold text-[#102039] md:text-2xl">
                4320 Elverta Rd #3
              </p>
              <p className="mt-1 text-[#52606f]">Antelope, CA 95843</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="bg-[#102039] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-lg bg-white">
              <Image
                src={images.logo}
                alt=""
                width={36}
                height={28}
                unoptimized
                className="h-8 w-auto"
              />
            </span>
            <div>
              <p className="font-semibold">Sacramento Dental Medicine</p>
              <p className="mt-1 text-sm text-white/60">
                Modern dental care in Antelope, CA
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={phoneHref}
              className="interactive-button inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/18 px-4 text-sm font-bold text-white hover:bg-white/10"
            >
              <Phone className="size-4" />
              (916) 727-6453
            </a>
            <a
              href={bookingHref}
              className="interactive-button inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#f2c36b] px-4 text-sm font-bold text-[#142033] hover:bg-[#ffd27c]"
            >
              Book online
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </footer>
      <div className="mobile-cta lg:hidden">
        <a href={phoneHref} className="interactive-button mobile-cta-secondary">
          <Phone className="size-4" />
          Call
        </a>
        <a href={bookingHref} className="interactive-button mobile-cta-primary">
          Book online
          <CalendarDays className="size-4" />
        </a>
      </div>
      </main>
    </>
  );
}

function QuickFact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="interactive-card flex h-full gap-4 rounded-lg border border-[#e5ddd1] bg-[#fbfaf7] p-4 shadow-[0_14px_34px_rgba(16,32,57,0.04)]">
      <span className="icon-breathe grid size-11 shrink-0 place-items-center rounded-lg bg-[#e3f0ec] text-[#1d6f65]">
        {icon}
      </span>
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#52606f]">
          {label}
        </p>
        <p className="mt-1 text-base font-semibold text-[#102039]">{value}</p>
      </div>
    </div>
  );
}

function TechCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="interactive-card h-full rounded-lg border border-white/12 bg-white/8 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] md:p-6">
      <span className="icon-breathe grid size-12 place-items-center rounded-lg bg-[#f2c36b] text-[#102039]">
        {icon}
      </span>
      <h3 className="mt-5 text-xl font-semibold md:mt-6 md:text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/68">{body}</p>
    </article>
  );
}

function VisitAction({
  icon,
  title,
  body,
  href,
  label,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="interactive-card group rounded-lg border border-[#e5ddd1] bg-[#fbfaf7] p-4 transition hover:border-[#1d6f65]/40 hover:bg-[#f5f8f2]"
    >
      <span className="icon-breathe grid size-11 place-items-center rounded-lg bg-[#e3f0ec] text-[#1d6f65]">
        {icon}
      </span>
      <h3 className="mt-5 text-xl font-semibold text-[#102039]">{title}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-[#52606f]">{body}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#1d6f65]">
        {label}
        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
