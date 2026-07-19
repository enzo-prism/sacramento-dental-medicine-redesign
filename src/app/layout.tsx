import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { siteUrl } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
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
        url: "/images/og.jpg",
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
    images: ["/images/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
      className={`${geistSans.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
