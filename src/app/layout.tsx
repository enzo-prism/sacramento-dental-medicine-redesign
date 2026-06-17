import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sacramento Dental Medicine | Antelope, CA Dentist",
  description:
    "Modern family, cosmetic, restorative, and emergency dental care in Antelope, CA. Book online or call Sacramento Dental Medicine.",
  keywords: [
    "Sacramento Dental Medicine",
    "Antelope dentist",
    "Sacramento dental care",
    "family dentist",
    "cosmetic dentistry",
    "dental implants",
    "emergency dentist",
  ],
  openGraph: {
    title: "Sacramento Dental Medicine",
    description:
      "Modern dental care for Antelope and Greater Sacramento families.",
    type: "website",
    images: [
      {
        url: "https://sacramentodentalmedicine.com/img/upload/sacramento_dental_medicine_antelope.jpg",
        width: 900,
        height: 558,
        alt: "Sacramento Dental Medicine team",
      },
    ],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
