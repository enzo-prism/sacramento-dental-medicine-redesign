import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import { siteUrl } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sacramento Dental Medicine | Antelope, CA Dentist",
    template: "%s · Sacramento Dental Medicine",
  },
  description:
    "Modern family, cosmetic, restorative, and emergency dental care in Antelope, CA. Same-day emergency care when possible, comfort-first technology, and a team that puts clarity first. Book online or call (916) 727-6453.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Antelope dentist",
    "Sacramento dentist",
    "Sacramento Dental Medicine",
    "cosmetic dentistry",
    "dental implants",
    "Invisalign",
    "emergency dentist",
    "family dentist Antelope",
    "Dr. Narodovich",
  ],
  authors: [{ name: "Sacramento Dental Medicine" }],
  openGraph: {
    title: "Sacramento Dental Medicine",
    description:
      "Modern family, cosmetic, restorative, and emergency dental care in Antelope, CA.",
    type: "website",
    siteName: "Sacramento Dental Medicine",
    images: [
      {
        url: "/images/abstract-hero.webp",
        width: 1200,
        height: 630,
        alt: "Sacramento Dental Medicine — modern dental care in Antelope, CA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacramento Dental Medicine",
    description:
      "Modern family, cosmetic, restorative, and emergency dental care in Antelope, CA.",
    images: ["/images/abstract-hero.webp"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
