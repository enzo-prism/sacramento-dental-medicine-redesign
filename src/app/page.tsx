import Image from "next/image";
import type { ReactNode } from "react";
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
  team: "https://sacramentodentalmedicine.com/img/upload/sacramento_dental_medicine_antelope.jpg",
  family: "https://sacramentodentalmedicine.com/img/upload/000image_super_img55.jpg",
  smile: "https://sacramentodentalmedicine.com/img/upload/000image_super_img58.big.jpg",
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
  image: images.team,
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
      <main className="min-h-screen bg-[#fbfaf7] text-[#182433]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-[#102039]/85 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Home">
            <span className="grid size-10 place-items-center rounded-lg bg-white">
              <Image
                src={images.logo}
                alt=""
                width={30}
                height={24}
                unoptimized
                className="h-7 w-auto"
              />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-[0.14em] text-white/70">
                ANTELOPE, CA
              </span>
              <span className="block text-base font-semibold">
                Sacramento Dental Medicine
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-white/80 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={phoneHref}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              <Phone className="size-4" />
              (916) 727-6453
            </a>
            <a
              href={bookingHref}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#f2c36b] px-4 text-sm font-bold text-[#142033] transition hover:bg-[#ffd27c]"
            >
              Book online
              <ArrowRight className="size-4" />
            </a>
          </div>

          <details className="relative lg:hidden">
            <summary
              className="grid size-10 cursor-pointer list-none place-items-center rounded-lg border border-white/20"
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </summary>
            <div className="absolute right-0 mt-3 w-64 rounded-lg border border-white/10 bg-[#102039] p-3 shadow-2xl">
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
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#f2c36b] px-3 py-3 text-sm font-bold text-[#142033]"
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
        className="relative flex min-h-[78svh] items-end overflow-hidden pt-28 text-white"
      >
        <Image
          src={images.team}
          alt="Sacramento Dental Medicine team"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,22,39,0.86),rgba(10,22,39,0.56)_48%,rgba(10,22,39,0.18))]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 pb-12 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold text-white/90 backdrop-blur">
              <MapPin className="size-4 text-[#f2c36b]" />
              4320 Elverta Rd #3, Antelope, CA 95843
            </div>
            <h1 className="text-balance text-5xl font-semibold leading-[0.96] tracking-normal text-white md:text-7xl lg:text-8xl">
              Sacramento Dental Medicine
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-white/86 md:text-xl">
              Modern family, cosmetic, restorative, and emergency dental care
              for Antelope and Greater Sacramento, led by a team that keeps
              comfort and clarity at the center of every visit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={bookingHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#f2c36b] px-5 text-base font-bold text-[#142033] transition hover:bg-[#ffd27c]"
              >
                Schedule today
                <CalendarDays className="size-5" />
              </a>
              <a
                href={phoneHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 text-base font-bold text-white backdrop-blur transition hover:bg-white/18"
              >
                Call the office
                <Phone className="size-5" />
              </a>
            </div>
          </div>

          <div className="self-end rounded-lg border border-white/18 bg-white/12 p-4 backdrop-blur-md">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f2c36b]">
              Why patients choose us
            </p>
            <div className="mt-4 space-y-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-white text-[#1d6f65]">
                    <Check className="size-4" />
                  </span>
                  <span className="leading-6 text-white/88">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e5ddd1] bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-5 md:grid-cols-3 lg:px-8">
          <QuickFact
            icon={<CalendarDays className="size-5" />}
            label="New patients"
            value="Currently accepting appointments"
          />
          <QuickFact
            icon={<HeartPulse className="size-5" />}
            label="Dental emergencies"
            value="Call for same-day availability"
          />
          <QuickFact
            icon={<Clock3 className="size-5" />}
            label="Extended days"
            value="Open until 7 PM Wednesday and Thursday"
          />
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg">
            <Image
              src={images.smile}
              alt="Patient smiling after dental care"
              fill
              loading="eager"
              unoptimized
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1d6f65]">
              Simple from the first step
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal text-[#102039] md:text-6xl">
              Clear answers before you sit in the chair.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52606f]">
              From the first call to the follow-up plan, the practice keeps the
              details easy to understand: what care is offered, who patients
              will meet, how appointments work, and what technology supports
              the visit.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Book online or call the Antelope office",
                "Explore preventive, cosmetic, restorative, and surgical care",
                "Meet the doctors before the appointment",
                "Check hours, address, and directions quickly",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-lg border border-[#e5ddd1] bg-white p-4"
                >
                  <Check className="mt-1 size-5 shrink-0 text-[#1d6f65]" />
                  <p className="text-sm leading-6 text-[#334155]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b65f43]">
                Dental services
              </p>
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-normal text-[#102039] md:text-6xl">
                Full-scope care for healthy, confident smiles.
              </h2>
            </div>
            <a
              href={bookingHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#102039] px-5 text-base font-bold text-white transition hover:bg-[#1c3459]"
            >
              Schedule a consultation
              <ArrowRight className="size-5" />
            </a>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-lg border border-[#e5ddd1] bg-[#fbfaf7] p-6"
              >
                <div
                  className={`mb-8 grid size-12 place-items-center rounded-lg ${service.color}`}
                >
                  <service.icon className="size-6" />
                </div>
                <h3 className="text-2xl font-semibold text-[#102039]">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#52606f]">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="bg-[#102039] px-5 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f2c36b]">
              Technology and comfort
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal md:text-6xl">
              Modern tools, calmer appointments.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/76">
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
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TechCard
              icon={<Syringe className="size-6" />}
              title="Comfort-first injections"
              body="The Wand STA system helps make injections gentler and less intimidating than traditional syringes."
            />
            <TechCard
              icon={<SmilePlus className="size-6" />}
              title="Precise treatment planning"
              body="CBCT 3D imaging gives the team a more complete view for surgical and implant-related planning."
            />
            <TechCard
              icon={<Waves className="size-6" />}
              title="Cleaner water systems"
              body="Modern sterilization and distilled water systems support a sanitary care environment."
            />
            <TechCard
              icon={<HeartPulse className="size-6" />}
              title="Preventive screening"
              body="Oral cancer screenings and digital diagnostics help patients make informed decisions earlier."
            />
          </div>
        </div>
      </section>

      <section id="doctors" className="bg-[#eef3ed] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1d6f65]">
              Meet the doctors
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal text-[#102039] md:text-6xl">
              Experienced care with a human voice.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {doctors.map((doctor) => (
              <article
                key={doctor.name}
                className="grid overflow-hidden rounded-lg border border-[#d7dfd2] bg-white md:grid-cols-[220px_1fr]"
              >
                <div className="relative min-h-[300px] md:min-h-full">
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
                <div className="p-6 md:p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b65f43]">
                    {doctor.title}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold text-[#102039]">
                    {doctor.name}
                  </h3>
                  <p className="mt-5 text-base leading-8 text-[#52606f]">
                    {doctor.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#315f9d]">
                Patient reviews
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal text-[#102039] md:text-6xl">
                Warm care patients remember.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#52606f]">
              Patients repeatedly point to friendly staff, a family feeling,
              and a comfortable experience. Those details matter when choosing
              care for yourself or your family.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="rounded-lg border border-[#e5ddd1] bg-[#fbfaf7] p-6"
              >
                <div className="mb-5 flex text-[#d8a34d]" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-5 fill-current" />
                  ))}
                </div>
                <p className="text-lg leading-8 text-[#263547]">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-[#52606f]">
                  {review.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="bg-[#fbfaf7] px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-lg border border-[#e5ddd1] bg-white p-6 md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1d6f65]">
              Visit the practice
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal text-[#102039] md:text-6xl">
              Book online, call, or get directions.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
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
            <div className="mt-8 overflow-hidden rounded-lg border border-[#e5ddd1]">
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
          </div>

          <div className="relative min-h-[560px] overflow-hidden rounded-lg">
            <Image
              src={images.family}
              alt="Family smiling outdoors"
              fill
              loading="eager"
              unoptimized
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-lg bg-white p-5 shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b65f43]">
                Sacramento Dental Medicine
              </p>
              <p className="mt-2 text-2xl font-semibold text-[#102039]">
                4320 Elverta Rd #3
              </p>
              <p className="mt-1 text-[#52606f]">Antelope, CA 95843</p>
            </div>
          </div>
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
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/18 px-4 text-sm font-bold text-white hover:bg-white/10"
            >
              <Phone className="size-4" />
              (916) 727-6453
            </a>
            <a
              href={bookingHref}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#f2c36b] px-4 text-sm font-bold text-[#142033] hover:bg-[#ffd27c]"
            >
              Book online
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </footer>
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
    <div className="flex gap-4 rounded-lg border border-[#e5ddd1] bg-[#fbfaf7] p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#e3f0ec] text-[#1d6f65]">
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
    <article className="rounded-lg border border-white/12 bg-white/8 p-6">
      <span className="grid size-12 place-items-center rounded-lg bg-[#f2c36b] text-[#102039]">
        {icon}
      </span>
      <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
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
      className="group rounded-lg border border-[#e5ddd1] bg-[#fbfaf7] p-4 transition hover:border-[#1d6f65]/40 hover:bg-[#f5f8f2]"
    >
      <span className="grid size-11 place-items-center rounded-lg bg-[#e3f0ec] text-[#1d6f65]">
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
