import { openGraphImages, twitterImages } from "@/lib/social-metadata";
import type { Metadata } from "next";
import { contact, doctors } from "@/data/site";
import { DoctorProfile } from "@/components/DoctorProfile";

const doctor = doctors[0];

export const metadata: Metadata = {
  title: { absolute: "Dr. Michael Narodovich, DMD | Antelope & Sacramento Dentist" },
  description:
    "Meet Dr. Michael Narodovich ('Dr. Mike'), family and cosmetic dentist on Elverta Rd in Antelope—known for steady hands and zero-judgment care.",
  alternates: { canonical: "/meet-dr-narodovich" },
  openGraph: {
    images: openGraphImages,
    title: "Meet Dr. Michael Narodovich, DMD ('Dr. Mike')",
    description:
      "Family, cosmetic, and anxious-patient dentistry at Sacramento Dental Medicine on Elverta Rd in Antelope, CA.",
    type: "profile",
    locale: "en_US",
    url: "/meet-dr-narodovich",
    siteName: contact.practiceName,
  },
  twitter: {
    images: twitterImages,
    card: "summary_large_image",
    title: "Meet Dr. Michael Narodovich, DMD ('Dr. Mike')",
    description: "Unhurried, zero-judgment family and cosmetic dentistry in Antelope, CA.",
  },
};

export default function DrNarodovichPage() { return <DoctorProfile doctor={doctor} />; }
