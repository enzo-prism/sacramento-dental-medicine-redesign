import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { Footer } from "@/components/sections/Footer";
import { contact, type Doctor } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/JsonLd";
import { pageGraph, practiceId } from "@/lib/structured-data";

export function DoctorProfile({ doctor }: { doctor: Doctor }) {
  const url = `${siteUrl}${doctor.href}`;
  const isNarodovich = doctor.href === "/meet-dr-narodovich";
  const graph = pageGraph(doctor.href, doctor.name, [{
    "@type": "Person", "@id": `${url}#person`, name: doctor.name,
    honorificSuffix: doctor.title, jobTitle: doctor.focus === "Endodontics" ? "Endodontist" : "Family and cosmetic dentist",
    description: doctor.description, image: `${siteUrl}${doctor.image}`, url,
    worksFor: { "@id": practiceId },
    ...(isNarodovich ? { alumniOf: [{ "@type": "CollegeOrUniversity", name: "The Ohio State University" }, { "@type": "CollegeOrUniversity", name: "Temple University" }], sameAs: ["https://waikikidental.com/michael-narodovich-dmd/#person"] } : {}),
  }], "ProfilePage", `${url}#person`);

  return (
    <>
      <JsonLd data={graph} />
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
                sizes="(min-width: 450px) 360px, calc(100vw - 40px)"
                className="object-cover object-top"
              />
            </div>
            <div>
              <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-faint">
                <Link href="/" className="hover:text-ink">Home</Link>
                <span aria-hidden="true" className="mx-2">/</span>
                <span aria-current="page">{doctor.name}</span>
              </nav>
              <p className="eyebrow text-brand-deep">{doctor.focus}</p>
              <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2.4rem,7vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink">
                {doctor.name}, {doctor.title}
              </h1>
              <div className="mt-6 grid max-w-2xl gap-4 text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                {doctor.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {doctor.education ? <ul className="mt-5 space-y-2 text-sm text-brand-deep">{doctor.education.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              <p className="mt-5 text-sm leading-7 text-ink-soft">Check current professional license information using the <a className="underline" href="https://search.dca.ca.gov/">California Department of Consumer Affairs license search</a>. Ask the office about the clinician and qualifications for your planned treatment.</p>
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
              {(isNarodovich ? [
                "Modern family and cosmetic dentistry",
                "Comfort-focused care for nervous patients",
                "Clear explanations before treatment begins",
                "A judgment-free return after time away from the dentist",
              ] : ["Endodontic consultation and root canal evaluation", "An explanation of findings and treatment choices", "Planning for complex root canal cases", "Coordination of follow-up restoration"]).map((item) => (
                <li key={item} className="flex gap-3 border-b border-line pb-4 text-ink-soft last:border-0">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-deep">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <nav aria-label="Care with this clinician" className="lg:col-start-2 flex flex-wrap gap-5 text-sm font-semibold text-brand-deep">
              <Link className="underline" href={isNarodovich ? "/sedation-dentistry" : "/root-canal-therapy"}>{isNarodovich ? "Care for nervous patients" : "Root canal treatment"}</Link>
              <Link className="underline" href="/new-patients">Plan your first visit</Link>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
