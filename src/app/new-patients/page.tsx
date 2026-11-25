import { openGraphImages, twitterImages } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { contact, hours, mediCalNotice, newPatient } from "@/data/site";
import { OfficeEmail } from "@/components/OfficeEmail";
import { pageGraph } from "@/lib/structured-data";

const title = "New Patients in Antelope | Sacramento Dental Medicine";
const description =
  "What to expect at your first dental visit on Elverta Rd in Antelope: what to bring, insurance and payment answers, hours, and online booking.";
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/new-patients" },
  openGraph: {
    images: openGraphImages,
    title,
    description,
    url: "/new-patients",
    type: "website",
    locale: "en_US",
    siteName: contact.practiceName,
  },
  twitter: {
    images: twitterImages,
    card: "summary_large_image",
    title,
    description,
  },
};

export default function NewPatientsPage() {
  return (
    <>
      <JsonLd data={pageGraph("/new-patients", "New-patient guide")} />
      <Header />
      <main id="main" className="flex-1">
        <section className="pb-16 pt-32 lg:pt-40">
          <div className="container-x max-w-5xl">
            <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
              <Link href="/" className="hover:underline">Home</Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">New patients</span>
            </nav>
            <p className="eyebrow mt-8 text-brand-deep">New to our office?</p>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
              Your first visit in Antelope, minus the guesswork.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft">
              We welcome new patients of all ages at {contact.addressLine1}, {contact.addressLine2}. Here is what to bring along, how to verify your dental plan, and exactly what happens once you sit down with us.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={contact.bookingHref} className="btn btn-primary">Book your first visit</Link>
              <a href={contact.phoneHref} className="btn btn-outline">Call {contact.phoneDisplay}</a>
            </div>
          </div>
        </section>
        <section className="section bg-wash" aria-labelledby="first-visit-title">
          <div className="container-x grid gap-10 md:grid-cols-2">
            <div>
              <h2 id="first-visit-title" className="font-display text-3xl font-semibold text-ink">
                What happens at my first appointment?
              </h2>
              <p className="mt-5 leading-8 text-ink-soft">{newPatient.firstVisit}</p>
              <p className="mt-4 leading-8 text-ink-soft">
                Feeling nervous—or coming back after a few years away? Tell us upfront so we can set an easy pace. You can also read about our{" "}
                <Link className="underline" href="/sedation-dentistry">comfort options for anxious patients</Link>{" "}
                before you arrive.
              </p>
              <Link href="/meet-dr-narodovich" className="btn-text mt-5">Meet Dr. Michael Narodovich</Link>
            </div>
            <div className="surface-card p-7">
              <h2 className="font-display text-2xl font-semibold text-ink">What should I bring?</h2>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-ink-soft">
                {newPatient.bring.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="section bg-white" aria-labelledby="coverage-title">
          <div className="container-x grid gap-10 md:grid-cols-2">
            <div>
              <h2 id="coverage-title" className="font-display text-3xl font-semibold text-ink">
                Dental insurance &amp; Medi-Cal
              </h2>
              <p className="mt-5 leading-8 text-ink-soft">{mediCalNotice}</p>
              <p className="mt-4 leading-8 text-ink-soft">
                Have another dental plan? Call {contact.phoneDisplay} with your member details before your visit. Our front desk will confirm whether your plan is accepted and walk through how benefits apply—exact coverage and out-of-pocket costs always depend on your plan and what your exam reveals.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink">
                Coming in without insurance?
              </h2>
              <p className="mt-5 leading-8 text-ink-soft">
                You&apos;re still very welcome here. Call our front desk to ask what an initial exam costs and which payment options are currently available. Before any treatment starts, we walk through findings and give you a written estimate so there are no surprises.
              </p>
            </div>
          </div>
        </section>
        <section className="section bg-wash" aria-labelledby="booking-title">
          <div className="container-x grid gap-10 md:grid-cols-2">
            <div>
              <h2 id="booking-title" className="font-display text-3xl font-semibold text-ink">
                How do I book?
              </h2>
              <p className="mt-5 leading-8 text-ink-soft">
                Pick an opening right on our online scheduling page, or call or email our desk during weekday hours. Dealing with sudden pain, swelling, or a broken tooth? Call us first—we fit in same-day emergency visits whenever space allows.
              </p>
              <div className="mt-5 flex flex-wrap gap-5">
                <Link href="/schedule" className="btn-text">Schedule online</Link>
                <Link href="/dental-emergencies" className="btn-text">Emergency dental care</Link>
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink">
                Where to find us &amp; office hours
              </h2>
              <address className="mt-5 not-italic leading-8 text-ink-soft">
                {contact.practiceName}
                <br />
                {contact.addressLine1}
                <br />
                {contact.addressLine2}
              </address>
              <div className="mt-3 flex flex-wrap gap-5">
                <a href={contact.emailHref} className="btn-text"><OfficeEmail /></a>
                <a href={contact.mapsHref} className="btn-text">Get directions on Google Maps</a>
              </div>
              <dl className="mt-6 space-y-2 text-sm text-ink-soft">
                {hours.map(({ day, time }) => (
                  <div key={day} className="flex justify-between gap-4">
                    <dt>{day}</dt>
                    <dd>{time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm leading-7 text-ink-soft">
                All hours are Pacific time. Evening appointments run until 7 PM on Wednesdays and Thursdays.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
