import type { Metadata } from "next";
import { DoctorProfile } from "@/components/DoctorProfile";
import { doctors } from "@/data/site";
import { openGraphImages, twitterImages } from "@/lib/social-metadata";

const title = "Dr. Lucas L. Sheppard, DMD | Antelope Root Canal Care";
const description = "Meet Dr. Lucas L. Sheppard, endodontic specialist and U.S. Air Force veteran at Sacramento Dental Medicine in Antelope. Ask about root canal evaluation.";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: "/meet-dr-sheppard" },
  openGraph: { title, description, url: "/meet-dr-sheppard", type: "profile", images: openGraphImages },
  twitter: { title, description, card: "summary_large_image", images: twitterImages },
};
export default function DrSheppardPage() { return <DoctorProfile doctor={doctors[1]} />; }
