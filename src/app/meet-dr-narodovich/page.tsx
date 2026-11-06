import { openGraphImages, twitterImages } from "@/lib/social-metadata";
import type { Metadata } from "next";
import { contact, doctors } from "@/data/site";
import { DoctorProfile } from "@/components/DoctorProfile";

const doctor = doctors[0];

export const metadata: Metadata = {
  title: { absolute: "Dr. Michael Narodovich, DMD | Sacramento Dentist" },
  description:
    "Meet Dr. Michael Narodovich, a family and cosmetic dentist at Sacramento Dental Medicine in Antelope, CA, known for gentle, judgment-free care.",
  alternates: { canonical: "/meet-dr-narodovich" },
  openGraph: {
      images: openGraphImages,
    title: "Meet Dr. Michael Narodovich, DMD",
    description:
      "Family, cosmetic, and anxious-patient dental care at Sacramento Dental Medicine in Antelope, CA.",
    type: "profile",
    locale: "en_US",
    url: "/meet-dr-narodovich",
    siteName: contact.practiceName,
  },
  twitter: {
      images: twitterImages,
    card: "summary_large_image",
    title: "Meet Dr. Michael Narodovich, DMD",
    description: "Gentle, judgment-free dentistry in Antelope, CA.",
  },
};

export default function DrNarodovichPage() { return <DoctorProfile doctor={doctor} />; }
