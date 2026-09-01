import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { Footer } from "@/components/sections/Footer";
import { contact, structuredData } from "@/data/site";
import {
  servicePageBySlug,
  servicePages,
  type ServicePage,
} from "@/data/service-pages";
import { siteUrl } from "@/lib/site-url";

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
      title: service.title,
      description: service.description,
      type: "website",
      locale: "en_US",
      url: `/${service.slug}`,
      siteName: contact.practiceName,
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
    },
  };
}

function JsonLd({ service }: { service: ServicePage }) {
  const graph = [
    structuredData,
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.navLabel,
      description: service.description,
      url: `${siteUrl}/${service.slug}`,
      areaServed: contact.serviceArea,
      provider: {
        "@type": "Dentist",
        name: contact.practiceName,
        telephone: "+1-916-727-6453",
        address: structuredData.address,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: service.navLabel,
          item: `${siteUrl}/${service.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
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
      <JsonLd service={service} />
      <Header />
      <main id="main" className="flex-1">
        <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 lg:pb-24 lg:pt-40">
          <div
            aria-hidden="true"
            className="absolute -right-36 top-16 size-[30rem] rounded-full bg-brand-tint/65 blur-3xl"
          />
          <div className="container-x relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <div>
              <p className="eyebrow text-brand-deep">{service.eyebrow}</p>
              <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2.4rem,7vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                {service.intro}
              </p>
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
              {service.faqs.map((faq) => (
                <article key={faq.question} className="py-6 first:pt-0 last:pb-0">
                  <h3 className="font-display text-xl font-semibold text-ink">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{faq.answer}</p>
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
