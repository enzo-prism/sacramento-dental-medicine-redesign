import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { Footer } from "@/components/sections/Footer";
import { contact, doctors, structuredData } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

const doctor = doctors[0];

export const metadata: Metadata = {
  title: { absolute: "Dr. Michael Narodovich, DMD | Sacramento Dentist" },
  description:
    "Meet Dr. Michael Narodovich, a family and cosmetic dentist at Sacramento Dental Medicine in Antelope, CA, known for gentle, judgment-free care.",
  alternates: { canonical: "/meet-dr-narodovich" },
  openGraph: {
    title: "Meet Dr. Michael Narodovich, DMD",
    description:
      "Family, cosmetic, and anxious-patient dental care at Sacramento Dental Medicine in Antelope, CA.",
    type: "profile",
    locale: "en_US",
    url: "/meet-dr-narodovich",
    siteName: contact.practiceName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Dr. Michael Narodovich, DMD",
    description: "Gentle, judgment-free dentistry in Antelope, CA.",
  },
};

export default function DrNarodovichPage() {
  const url = `${siteUrl}/meet-dr-narodovich`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "@id": `${url}#dentist`,
      name: doctor.name,
      jobTitle: `${doctor.title}, Family & Cosmetic Dentist`,
      description: doctor.description,
      image: `${siteUrl}${doctor.image}`,
      url,
      worksFor: {
        "@type": "Dentist",
        name: contact.practiceName,
        url: siteUrl,
        address: structuredData.address,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: doctor.name, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main" className="flex-1">
        <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 lg:pb-24 lg:pt-40">
          <div aria-hidden="true" className="absolute -right-36 top-16 size-[30rem] rounded-full bg-brand-tint/65 blur-3xl" />
          <div className="container-x relative grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
            <div className="portrait-mat relative aspect-[3/4] w-full max-w-[360px] ring-1 ring-line">
              <Image
                src={doctor.image}
                alt={`${doctor.name}, ${doctor.title}`}
                fill
                priority
                sizes="(min-width: 1024px) 360px, 80vw"
                className="object-cover object-top"
              />
            </div>
            <div>
              <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-faint">
                <Link href="/" className="hover:text-ink">Home</Link>
                <span aria-hidden="true" className="mx-2">/</span>
                <span aria-current="page">Meet Dr. Narodovich</span>
              </nav>
              <p className="eyebrow text-brand-deep">{doctor.focus}</p>
              <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2.4rem,7vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink">
                {doctor.name}, {doctor.title}
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                {doctor.description}
              </p>
              <p className="mt-5 text-sm font-semibold text-brand-deep">{doctor.highlights}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={contact.bookingHref} className="btn btn-primary h-12 px-5 text-base">
                  Request an appointment
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a href={contact.phoneHref} className="btn btn-outline h-12 px-5 text-base">
                  <Phone className="size-4" aria-hidden="true" />
                  Call {contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="care-title">
          <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow text-brand-deep">A calmer dental relationship</p>
              <h2 id="care-title" className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
                Care that starts with listening.
              </h2>
            </div>
            <ul className="grid gap-4">
              {[
                "Modern family and cosmetic dentistry",
                "Comfort-focused care for nervous patients",
                "Clear explanations before treatment begins",
                "A judgment-free return after time away from the dentist",
              ].map((item) => (
                <li key={item} className="flex gap-3 border-b border-line pb-4 text-ink-soft last:border-0">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-deep">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
