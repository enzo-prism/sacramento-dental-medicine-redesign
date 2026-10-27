import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock3, MapPin, Phone } from "lucide-react";
import { AppointmentRequestForm } from "@/components/AppointmentRequestForm";
import { ConversionClickTracker } from "@/components/ConversionClickTracker";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileCTA } from "@/components/MobileCTA";
import { Footer } from "@/components/sections/Footer";
import { contact, hours, officePhotos, socialProof } from "@/data/site";
import { wisdomTeethLanding } from "@/data/wisdom-teeth-landing";
import { openGraphImages, twitterImages } from "@/lib/social-metadata";
import { pageGraph, serviceJsonLd } from "@/lib/structured-data";
import { siteUrl } from "@/lib/site-url";

const path = `/${wisdomTeethLanding.slug}`;

function FaqAnswer({
  answer,
  links,
}: {
  answer: string;
  links?: { href: string; label: string }[];
}) {
  if (!links?.length) {
    return <p className="mt-3 text-sm leading-7 text-ink-soft">{answer}</p>;
  }

  const hrefByLabel = new Map(links.map((link) => [link.label, link.href]));
  const pattern = new RegExp(
    `(${links.map((link) => link.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  );
  const parts = answer.split(pattern);

  return (
    <p className="mt-3 text-sm leading-7 text-ink-soft">
      {parts.map((part, index) => {
        const href = hrefByLabel.get(part);
        if (!href) {
          return <span key={`${part}-${index}`}>{part}</span>;
        }
        return (
          <Link key={`${href}-${index}`} href={href} className="underline underline-offset-4">
            {part}
          </Link>
        );
      })}
    </p>
  );
}

export const metadata: Metadata = {
  title: { absolute: wisdomTeethLanding.title },
  description: wisdomTeethLanding.description,
  alternates: { canonical: path },
  openGraph: {
    images: openGraphImages,
    title: wisdomTeethLanding.h1,
    description: wisdomTeethLanding.description,
    type: "website",
    locale: "en_US",
    url: path,
    siteName: contact.practiceName,
  },
  twitter: {
    images: twitterImages,
    card: "summary_large_image",
    title: wisdomTeethLanding.h1,
    description: wisdomTeethLanding.description,
  },
  robots: { index: false, follow: true },
};

export default function WisdomTeethRemovalSacramentoPage() {
  return (
    <>
      <JsonLd
        data={pageGraph(path, wisdomTeethLanding.h1, [
          serviceJsonLd(
            path,
            "Wisdom teeth removal",
            wisdomTeethLanding.intro,
            "Wisdom teeth removal",
          ),
          {
            "@type": "FAQPage",
            "@id": `${siteUrl}${path}#faq`,
            mainEntity: wisdomTeethLanding.faqs.map(({ question, answer }) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          },
        ])}
      />
      <ConversionClickTracker />
      <Header />
      <main id="main" className="flex-1">
        <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 lg:pb-24 lg:pt-40">
          <div
            aria-hidden="true"
            className="absolute -right-36 top-16 size-[30rem] rounded-full bg-brand-tint/65 blur-3xl"
          />
          <div className="container-x relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
            <div>
              <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft">
                <Link href="/" className="hover:underline">Home</Link>
                <span aria-hidden="true"> / </span>
                <Link href="/our-services" className="hover:underline">Dental services</Link>
                <span aria-hidden="true"> / </span>
                <span aria-current="page">Wisdom teeth removal</span>
              </nav>
              <p className="eyebrow text-brand-deep">{wisdomTeethLanding.eyebrow}</p>
              <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2.2rem,7vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink">
                {wisdomTeethLanding.h1}
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                {wisdomTeethLanding.intro}
              </p>
              <p className="mt-4 text-sm leading-7 text-ink-soft">
                More about{" "}
                {wisdomTeethLanding.relatedLinks.map((link, index) => (
                  <span key={link.href}>
                    {index > 0 ? " and " : ""}
                    <Link href={link.href} className="underline underline-offset-4">
                      {link.label.toLowerCase()}
                    </Link>
                  </span>
                ))}{" "}
                at this office.
              </p>
              <p className="mt-4 text-sm font-medium text-ink">
                {socialProof.rating} stars from {socialProof.totalReviews} Google reviews
                <span className="font-normal text-ink-soft">
                  {" "}
                  (snapshot {socialProof.checkedDate})
                </span>
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={contact.phoneHref} className="btn btn-primary h-12 px-5 text-base">
                  <Phone className="size-4" aria-hidden="true" />
                  Call {contact.phoneDisplay}
                </a>
                <a href="#request-visit" className="btn btn-outline h-12 px-5 text-base">
                  Request an appointment
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-ink-soft">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-deep" aria-hidden="true" />
                {wisdomTeethLanding.officeLine}
              </p>
            </div>

            <div id="request-visit">
              <AppointmentRequestForm />
            </div>
          </div>
        </section>

        <section className="section bg-wash" aria-labelledby="symptoms-title">
          <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow text-brand-deep">When to get checked</p>
              <h2
                id="symptoms-title"
                className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl"
              >
                Symptoms that are worth an exam.
              </h2>
              <p className="mt-5 text-sm leading-7 text-ink-soft md:text-base">
                {wisdomTeethLanding.whenToCall}{" "}
                <Link href="/dental-emergencies" className="underline underline-offset-4">
                  Dental emergencies
                </Link>
                {" "}are handled by calling the office first.
              </p>
            </div>
            <ul className="grid gap-4">
              {wisdomTeethLanding.symptoms.map((symptom) => (
                <li key={symptom} className="flex gap-3 text-sm leading-6 text-ink-soft">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-deep">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="process-title">
          <div className="container-x">
            <p className="eyebrow text-brand-deep">A clear path forward</p>
            <h2
              id="process-title"
              className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl"
            >
              What the visit and procedure look like.
            </h2>
            <ol className="mt-10 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-3">
              {wisdomTeethLanding.steps.map((step, index) => (
                <li key={step.title} className="bg-canvas p-6 sm:p-8">
                  <span className="font-display text-sm font-semibold text-brand-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{step.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="surface-card p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-ink">Comfort</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  {wisdomTeethLanding.comfort}
                </p>
                <Link href="/sedation-dentistry" className="btn-text mt-5">
                  Comfort and sedation questions
                </Link>
              </div>
              <div className="surface-card p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-ink">
                  Insurance and payment
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  {wisdomTeethLanding.coverage}
                </p>
                <a href={contact.phoneHref} className="btn-text mt-5">
                  Call to confirm your plan
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-canvas" aria-labelledby="area-title">
          <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="eyebrow text-brand-deep">Service area</p>
              <h2
                id="area-title"
                className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl"
              >
                Sacramento-area wisdom teeth care, based in Antelope.
              </h2>
              <p className="mt-5 text-sm leading-7 text-ink-soft md:text-base">
                Patients come to {wisdomTeethLanding.officeLine} from across
                the north Sacramento area. Call first if you are unsure whether
                a visit from your city is a good fit.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {contact.serviceArea.map((city) => (
                  <li
                    key={city}
                    className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-line bg-white">
              <div className="relative aspect-[16/10]">
                <Image
                  src={officePhotos[0].src}
                  alt={officePhotos[0].alt}
                  fill
                  sizes="(min-width: 1024px) 36rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
                    <MapPin className="size-4 text-brand-deep" aria-hidden="true" />
                    The office
                  </h3>
                  <address className="mt-3 not-italic text-sm leading-6 text-ink-soft">
                    {contact.addressLine1}
                    <br />
                    {contact.addressLine2}
                  </address>
                  <a href={contact.mapsHref} className="btn-text mt-3">
                    Get directions
                  </a>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
                    <Clock3 className="size-4 text-brand-deep" aria-hidden="true" />
                    Hours
                  </h3>
                  <dl className="mt-3 space-y-1.5 text-sm text-ink-soft">
                    {hours.map(({ day, time }) => (
                      <div key={day} className="flex justify-between gap-4">
                        <dt>{day}</dt>
                        <dd>{time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="faq-title">
          <div className="container-x grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="eyebrow text-brand-deep">Common questions</p>
              <h2
                id="faq-title"
                className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl"
              >
                Answers before you schedule.
              </h2>
              {wisdomTeethLanding.source ? (
                <p className="mt-5 text-sm leading-7 text-ink-soft">
                  Patient education:{" "}
                  <a
                    className="underline underline-offset-4"
                    href={wisdomTeethLanding.source.url}
                  >
                    {wisdomTeethLanding.source.label}
                  </a>
                  . General information; your treatment recommendations follow an exam.
                </p>
              ) : null}
            </div>
            <div className="divide-y divide-line border-y border-line">
              {wisdomTeethLanding.faqs.map((faq, index) => (
                <article
                  id={`question-${index + 1}`}
                  key={faq.question}
                  className="py-6 first:pt-0 last:pb-0"
                >
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {faq.question}
                  </h3>
                  <FaqAnswer answer={faq.answer} links={faq.links} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-night text-white">
          <div className="container-x grid gap-8 py-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#d5e1f4]">Related care</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                {wisdomTeethLanding.relatedLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="btn-text-light">
                    {link.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <p className="mt-4 max-w-xl text-pretty text-lg leading-7 text-white/75">
                Call the Antelope office or request a wisdom teeth evaluation.
                We will confirm a time during office hours.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={contact.phoneHref} className="btn btn-primary h-12 px-5">
                <Phone className="size-4" aria-hidden="true" />
                Call {contact.phoneDisplay}
              </a>
              <a href="#request-visit" className="btn btn-ghost-light h-12 px-5">
                Request an appointment
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer seasonal={false} />
      <MobileCTA bookHref="#request-visit" bookLabel="Request visit" />
    </>
  );
}
