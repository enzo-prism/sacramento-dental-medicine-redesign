import { openGraphImages, twitterImages } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { contact, hours, newPatient } from "@/data/site";
import { pageGraph } from "@/lib/structured-data";

const title = "New Patients in Antelope | Sacramento Dental Medicine";
const description = "Plan your first dental visit in Antelope: what to bring, insurance and payment questions, office hours, directions, and how appointment requests work.";
export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: "/new-patients" },
  openGraph: {
      images: openGraphImages, title, description, url: "/new-patients", type: "website", locale: "en_US", siteName: contact.practiceName },
  twitter: {
      images: twitterImages, card: "summary_large_image", title, description },
};

export default function NewPatientsPage() {
  return <>
    <JsonLd data={pageGraph("/new-patients", "New-patient guide")} />
    <Header />
    <main id="main" className="flex-1">
      <section className="pb-16 pt-32 lg:pt-40">
        <div className="container-x max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-soft"><Link href="/" className="hover:underline">Home</Link><span aria-hidden="true"> / </span><span aria-current="page">New patients</span></nav>
          <p className="eyebrow mt-8 text-brand-deep">Welcome to Sacramento Dental Medicine</p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">Your first dental visit in Antelope.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-soft">We welcome new patients of all ages at {contact.addressLine1}, {contact.addressLine2}. Here is what to bring, how to check coverage, and what happens after you request a visit.</p>
          <div className="mt-8 flex flex-wrap gap-4"><Link href={contact.bookingHref} className="btn btn-primary">Request your first visit</Link><a href={contact.phoneHref} className="btn btn-outline">Call {contact.phoneDisplay}</a></div>
        </div>
      </section>
      <section className="section bg-wash" aria-labelledby="first-visit-title">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div><h2 id="first-visit-title" className="font-display text-3xl font-semibold text-ink">What happens at my first appointment?</h2><p className="mt-5 leading-8 text-ink-soft">{newPatient.firstVisit}</p><p className="mt-4 leading-8 text-ink-soft">Let the team know if you are nervous or have been away from dental care. The first step is a conversation about your concerns and a plan you understand.</p><Link href="/meet-dr-narodovich" className="btn-text mt-5">Meet Dr. Michael Narodovich</Link></div>
          <div className="surface-card p-7"><h2 className="font-display text-2xl font-semibold text-ink">What should I bring?</h2><ul className="mt-5 list-disc space-y-3 pl-5 text-ink-soft">{newPatient.bring.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>
      <section className="section bg-white" aria-labelledby="coverage-title">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div><h2 id="coverage-title" className="font-display text-3xl font-semibold text-ink">Do you accept my insurance?</h2><p className="mt-5 leading-8 text-ink-soft">Call {contact.phoneDisplay} with your plan information before your visit. The front desk can confirm whether your dental plan is accepted and help you understand coverage questions. Coverage and out-of-pocket costs depend on your plan and recommended care.</p></div>
          <div><h2 className="font-display text-3xl font-semibold text-ink">What if I do not have dental insurance?</h2><p className="mt-5 leading-8 text-ink-soft">Ask the front desk about current payment options and the cost of an initial visit. Treatment estimates depend on an exam and the care you need; request an explanation of costs before deciding on treatment.</p></div>
        </div>
      </section>
      <section className="section bg-wash" aria-labelledby="booking-title">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div><h2 id="booking-title" className="font-display text-3xl font-semibold text-ink">Does an online request confirm my appointment?</h2><p className="mt-5 leading-8 text-ink-soft">No. Choose your visit type and preferred day and time, then enter your name and either a phone number or an email. The front desk follows up during office hours to confirm the exact appointment.</p><p className="mt-4 leading-8 text-ink-soft">For urgent tooth pain or an injury, call the office first. Same-day emergency visits depend on availability.</p><div className="mt-5 flex flex-wrap gap-5"><Link href="/schedule" className="btn-text">Request an appointment</Link><Link href="/dental-emergencies" className="btn-text">Emergency dental care</Link></div></div>
          <div><h2 className="font-display text-3xl font-semibold text-ink">Where are you, and when are you open?</h2><address className="mt-5 not-italic leading-8 text-ink-soft">{contact.practiceName}<br />{contact.addressLine1}<br />{contact.addressLine2}</address><a href={contact.mapsHref} className="btn-text mt-3">Get directions to the Antelope office</a><dl className="mt-6 space-y-2 text-sm text-ink-soft">{hours.map(({ day, time }) => <div key={day} className="flex justify-between gap-4"><dt>{day}</dt><dd>{time}</dd></div>)}</dl><p className="mt-4 text-sm leading-7 text-ink-soft">All hours are Pacific time. Wednesday and Thursday appointments extend to 7 PM.</p></div>
        </div>
      </section>
    </main>
    <Footer /><MobileCTA />
  </>;
}
