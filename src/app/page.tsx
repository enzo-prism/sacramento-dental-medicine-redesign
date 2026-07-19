import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { Emergency } from "@/components/sections/Emergency";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { Technology } from "@/components/sections/Technology";
import { Doctors } from "@/components/sections/Doctors";
import { Reviews } from "@/components/sections/Reviews";
import { NewPatients } from "@/components/sections/NewPatients";
import { Visit } from "@/components/sections/Visit";
import { Footer } from "@/components/sections/Footer";
import { faqStructuredData, structuredData } from "@/data/site";

// Escape `<` so JSON-LD payloads can't break out of the <script> tag (XSS-safe).
function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqStructuredData) }}
      />
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <TrustBand />
        <Emergency />
        <Intro />
        <Services />
        <Technology />
        <Doctors />
        <Reviews />
        <NewPatients />
        <Visit />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
