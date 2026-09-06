import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { ReviewProof } from "@/components/sections/ReviewProof";
import { Emergency } from "@/components/sections/Emergency";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { Technology } from "@/components/sections/Technology";
import { Office } from "@/components/sections/Office";
import { Doctors } from "@/components/sections/Doctors";
import { Reviews } from "@/components/sections/Reviews";
import { NewPatients } from "@/components/sections/NewPatients";
import { ScheduleCTA } from "@/components/sections/ScheduleCTA";
import { Footer } from "@/components/sections/Footer";
import { faqStructuredData, seo } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { pageGraph } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={pageGraph("/", seo.title, [faqStructuredData])} />
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <ReviewProof />
        <TrustBand />
        <Emergency />
        <Intro />
        <Services />
        <Technology />
        <Office />
        <Doctors />
        <Reviews />
        <NewPatients />
        <ScheduleCTA />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
