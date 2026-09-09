import { openGraphImages, twitterImages } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { Footer } from "@/components/sections/Footer";
import { contact } from "@/data/site";
import {
  highlightedServiceSlugs,
  servicePageBySlug,
  servicePages,
  type ServicePage,
} from "@/data/service-pages";
import { siteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/JsonLd";
import { pageGraph, practiceId } from "@/lib/structured-data";

type Props = {
  params: Promise<{ service: string }>;
};

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ service: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const service = servicePageBySlug.get(slug);

  if (!service) return {};

  return {
    title: { absolute: service.title },
    description: service.description,
    alternates: { canonical: `/${service.slug}` },
    openGraph: {
      images: openGraphImages,
      title: service.title,
      description: service.description,
      type: "website",
      locale: "en_US",
      url: `/${service.slug}`,
      siteName: contact.practiceName,
    },
    twitter: {
      images: twitterImages,
      card: "summary_large_image",
      title: service.title,
      description: service.description,
    },
  };
}

export default async function ServiceRoute({ params }: Props) {
  const { service: slug } = await params;
  const service = servicePageBySlug.get(slug);
  if (!service) notFound();

  const related = service.relatedSlugs
    .map((relatedSlug) => servicePageBySlug.get(relatedSlug))
    .filter((item): item is ServicePage => Boolean(item));

  return (
    <>
      <JsonLd data={pageGraph(`/${service.slug}`, service.navLabel, [
        ...(service.slug === "our-services" ? [{
          "@type": "ItemList",
          "@id": `${siteUrl}/our-services#services`,
          itemListElement: servicePages.filter((item) => item.slug !== "our-services").map((item, index) => ({
            "@type": "ListItem", position: index + 1, name: item.navLabel, url: `${siteUrl}/${item.slug}`,
          })),
        }] : [{
          "@type": "Service", "@id": `${siteUrl}/${service.slug}#service`,
          name: service.navLabel, description: service.intro, url: `${siteUrl}/${service.slug}`,
          areaServed: contact.serviceArea, provider: { "@id": practiceId },
        }]),
        {
          "@type": "FAQPage", "@id": `${siteUrl}/${service.slug}#faq`,
          mainEntity: service.faqs.map(({ question, answer }) => ({
            "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ])} />
      <Header />
      <main id="main" className="flex-1">
        <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 lg:pb-24 lg:pt-40">
          <div
            aria-hidden="true"
            className="absolute -right-36 top-16 size-[30rem] rounded-full bg-brand-tint/65 blur-3xl"
          />
          <div className="container-x relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <div>
              <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft">
                <Link href="/" className="hover:underline">Home</Link>
                {service.slug !== "our-services" && <><span aria-hidden="true"> / </span><Link href="/our-services" className="hover:underline">Dental services</Link></>}
                <span aria-hidden="true"> / </span><span aria-current="page">{service.navLabel}</span>
              </nav>
              <p className="eyebrow text-brand-deep">{service.eyebrow}</p>
              <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2.4rem,7vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                {service.intro}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={service.slug === "dental-emergencies" ? contact.phoneHref : contact.bookingHref} className="btn btn-primary h-12 px-5 text-base">
                  {service.slug === "dental-emergencies" ? `Call ${contact.phoneDisplay} first` : "Request an appointment"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a href={service.slug === "dental-emergencies" ? contact.bookingHref : contact.phoneHref} className="btn btn-outline h-12 px-5 text-base">
                  <Phone className="size-4" aria-hidden="true" />
                  {service.slug === "dental-emergencies" ? "Request a non-urgent visit" : `Call ${contact.phoneDisplay}`}
                </a>
              </div>
            </div>

            <aside className="rounded-[24px] border border-line bg-white p-6 shadow-[0_30px_80px_-55px_rgba(13,27,46,0.55)] sm:p-8">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                What this care can help with
              </h2>
              <ul className="mt-6 grid gap-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-sm leading-6 text-ink-soft">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-deep">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {service.slug === "our-services" && (
          <section className="section bg-wash" aria-labelledby="care-directory-title">
            <div className="container-x">
              <h2 id="care-directory-title" className="font-display text-3xl font-semibold text-ink">Find the care you need</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {highlightedServiceSlugs
                  .map((slug) => servicePageBySlug.get(slug))
                  .filter((item): item is ServicePage => Boolean(item))
                  .map((item) => (
                    <Link key={item.slug} href={`/${item.slug}`} className="surface-card border-brand-deep/40 p-6 transition hover:border-brand-deep">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-ink">Often requested</p>
                      <h3 className="mt-3 font-display text-xl font-semibold text-brand-deep">{item.navLabel}</h3>
                      <p className="mt-3 text-sm leading-6 text-ink-soft">{item.description}</p>
                    </Link>
                  ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {servicePages.filter((item) => item.slug !== "our-services" && !highlightedServiceSlugs.some((slug) => slug === item.slug)).map((item) => (
                  <Link key={item.slug} href={`/${item.slug}`} className="surface-card p-6 transition hover:border-brand-deep">
                    <h3 className="font-display text-xl font-semibold text-brand-deep">{item.navLabel}</h3>
                    <p className="mt-3 text-sm leading-6 text-ink-soft">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section bg-white" aria-labelledby="process-title">
          <div className="container-x">
            <p className="eyebrow text-brand-deep">A clear path forward</p>
            <h2 id="process-title" className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
              What to expect from the first visit.
            </h2>
            <ol className="mt-10 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-3">
              {service.steps.map((step, index) => (
                <li key={step.title} className="bg-canvas p-6 sm:p-8">
                  <span className="font-display text-sm font-semibold text-brand-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section bg-canvas" aria-labelledby="faq-title">
          <div className="container-x grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="eyebrow text-brand-deep">Common questions</p>
              <h2 id="faq-title" className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
                Answers before you schedule.
              </h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {service.faqs.map((faq, index) => (
                <article id={`question-${index + 1}`} key={faq.question} className="py-6 first:pt-0 last:pb-0">
                  <h3 className="font-display text-xl font-semibold text-ink">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="visit-details-title">
          <div className="container-x grid gap-8 md:grid-cols-2">
            <div>
              <h2 id="visit-details-title" className="font-display text-2xl font-semibold text-ink">Plan your visit in Antelope</h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">Sacramento Dental Medicine is at {contact.addressLine1}, {contact.addressLine2}. Call {contact.phoneDisplay} to ask about availability, your dental plan, and treatment estimates.</p>
              <div className="mt-5 flex flex-wrap gap-5"><a href={contact.mapsHref} className="btn-text">Get directions</a><Link href="/new-patients" className="btn-text">New-patient guide</Link></div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Get to know your dental team</h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">Meet Dr. Michael Narodovich and learn about the practice before requesting an appointment. Your dentist will explain which treatment fits your exam findings and goals.</p>
              <Link href="/meet-dr-narodovich" className="btn-text mt-5">Meet Dr. Narodovich</Link>
              {service.sources?.length ? <p className="mt-5 text-sm leading-7 text-ink-soft">Patient education: {service.sources.map((source, index) => <span key={source.url}>{index > 0 ? "; " : ""}<a className="underline underline-offset-4" href={source.url}>{source.label}</a></span>)}. General information; your treatment recommendations follow an exam.</p> : null}
            </div>
          </div>
        </section>

        <section className="bg-night text-white">
          <div className="container-x grid gap-8 py-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#d5e1f4]">Related care</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                {related.map((item) => (
                  <Link key={item.slug} href={`/${item.slug}`} className="btn-text-light">
                    {item.navLabel}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
            <Link href={contact.bookingHref} className="btn btn-primary h-12 px-5">
              Request a visit
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
