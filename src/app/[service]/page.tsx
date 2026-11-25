import { openGraphImages, twitterImages } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { Footer } from "@/components/sections/Footer";
import { contact, hours } from "@/data/site";
import { FaqAnswer } from "@/components/FaqAnswer";
import { OfficeEmail } from "@/components/OfficeEmail";
import {
  highlightedServiceSlugs,
  serviceJsonLdTypes,
  servicePageBySlug,
  servicePages,
  serviceSearchCopy,
  type ServicePage,
} from "@/data/service-pages";
import { siteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/JsonLd";
import { pageGraph, serviceJsonLd } from "@/lib/structured-data";

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

  const { title, description } = serviceSearchCopy(service);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/${service.slug}` },
    openGraph: {
      images: openGraphImages,
      title,
      description,
      type: "website",
      locale: "en_US",
      url: `/${service.slug}`,
      siteName: contact.practiceName,
    },
    twitter: {
      images: twitterImages,
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServiceRoute({ params }: Props) {
  const { service: slug } = await params;
  const service = servicePageBySlug.get(slug);
  if (!service) notFound();

  const isEmergency = slug === "dental-emergencies";
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
        }] : [serviceJsonLd(`/${service.slug}`, service.navLabel, service.intro, serviceJsonLdTypes[service.slug])]),
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
              {service.nearbyLinks?.length ? (
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-ink">
                  {service.nearbyLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="btn-text">
                      {link.label}
                    </Link>
                  ))}
                </p>
              ) : null}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {isEmergency ? (
                  <>
                    <a href={contact.phoneHref} className="btn btn-ember h-12 px-5 text-base">
                      <Phone className="size-4" aria-hidden="true" /> Call {contact.phoneDisplay}
                    </a>
                    <a href="#office-hours" className="btn btn-outline h-12 px-5 text-base">View office hours</a>
                  </>
                ) : (
                  <>
                    <Link href={contact.bookingHref} className="btn btn-primary h-12 px-5 text-base">
                      {service.bookingLabel ?? "Book online"} <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                    <a href={contact.phoneHref} className="btn btn-outline h-12 px-5 text-base">
                      <Phone className="size-4" aria-hidden="true" /> Call {contact.phoneDisplay}
                    </a>
                  </>
                )}
              </div>
            </div>

            <aside className="rounded-[24px] border border-line bg-white p-6 shadow-[0_30px_80px_-55px_rgba(13,27,46,0.55)] sm:p-8">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                How we can help
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

        {service.slug === "dental-emergencies" && (
          <section className="section bg-wash" aria-labelledby="urgent-access-title">
            <div className="container-x grid gap-10 lg:grid-cols-2">
              <div>
                <h2 id="urgent-access-title" className="font-display text-3xl font-semibold text-ink">Call first for the earliest available visit.</h2>
                <p className="mt-5 leading-8 text-ink-soft">Find us at {contact.addressLine1}, {contact.addressLine2}. We fit in same-day emergency visits whenever space allows—calling our desk first is the quickest way to hear what to do right away and check today&apos;s openings.</p>
                <p className="mt-4 leading-8 text-ink-soft">We aren&apos;t a 24-hour clinic, so if pain strikes after hours, don&apos;t wait on an online message when you need urgent help. For trouble breathing or swallowing, uncontrolled bleeding, or a serious facial or head injury, call 911 immediately.</p>
                <p className="mt-4 leading-8 text-ink-soft">Our front desk can share what an urgent exam costs and includes. Any treatment choices and a written estimate follow the dentist&apos;s exam.</p>
                <a className="btn btn-primary mt-6" href={contact.phoneHref}>Call {contact.phoneDisplay}</a>
              </div>
              <div>
                <h2 id="office-hours" className="scroll-mt-28 font-display text-2xl font-semibold text-ink">Antelope office hours</h2>
                <dl className="mt-5 space-y-3 text-sm text-ink-soft">{hours.map(({ day, time }) => <div key={day} className="flex justify-between gap-5"><dt>{day}</dt><dd>{time}</dd></div>)}</dl>
                <p className="mt-4 text-sm leading-7 text-ink-soft">All times are Pacific. On holidays, call first to confirm we&apos;re open before heading over. Online scheduling does not guarantee a same-day urgent slot.</p>
                <a className="btn-text mt-5 inline-flex" href={contact.mapsHref}>Directions to our Elverta Road office</a>
              </div>
            </div>
          </section>
        )}
        {service.slug === "our-services" && (
          <section className="section bg-wash" aria-labelledby="care-directory-title">
            <div className="container-x">
              <h2 id="care-directory-title" className="font-display text-3xl font-semibold text-ink">Find the care you need</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
            <p className="eyebrow text-brand-deep">Step by step</p>
            <h2 id="process-title" className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
              What your visit looks like.
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
                Questions worth asking before you book.
              </h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {service.faqs.map((faq, index) => (
                <article id={`question-${index + 1}`} key={faq.question} className="py-6 first:pt-0 last:pb-0">
                  <h3 className="font-display text-xl font-semibold text-ink">{faq.question}</h3>
                  <FaqAnswer answer={faq.answer} links={faq.links} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="visit-details-title">
          <div className="container-x grid gap-8 md:grid-cols-2">
            <div>
              <h2 id="visit-details-title" className="font-display text-2xl font-semibold text-ink">Visit us on Elverta Road</h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">We&apos;re located at {contact.addressLine1}, {contact.addressLine2}, open weekdays including until 7 PM on Wednesdays and Thursdays. Call {contact.phoneDisplay} or email <a className="underline underline-offset-4" href={contact.emailHref}><OfficeEmail /></a> to check your dental plan, ask about exam fees, or find a convenient opening.</p>
              <div className="mt-5 flex flex-wrap gap-5"><a href={contact.mapsHref} className="btn-text">Get directions</a><a href={contact.emailHref} className="btn-text">Email our desk</a><Link href="/new-patients" className="btn-text">New-patient guide</Link></div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Doctors who take their time</h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">Get to know Dr. Michael Narodovich before you walk through the door. Every treatment recommendation starts with an exam and a straightforward talk about what fits your goals.</p>
              <Link href="/meet-dr-narodovich" className="btn-text mt-5">Meet Dr. Narodovich</Link>
              {service.sources?.length ? <p className="mt-5 text-sm leading-7 text-ink-soft">Clinical background: {service.sources.map((source, index) => <span key={source.url}>{index > 0 ? "; " : ""}<a className="underline underline-offset-4" href={source.url}>{source.label}</a></span>)}. General patient education; your personal plan always follows an exam.</p> : null}
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
              {service.bookingLabel ?? "Book online"}
            </Link>
          </div>
        </section>
      </main>
      <Footer seasonal={slug !== "dental-emergencies"} />
      <MobileCTA callFirst={isEmergency} />
    </>
  );
}
