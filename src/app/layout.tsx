import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { LeadAttributionCapture } from "@/components/LeadAttributionCapture";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { contact, seo } from "@/data/site";
import { isPreviewDeploy, siteUrl } from "@/lib/site-url";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1424" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: contact.practiceName,
  title: {
    default: seo.title,
    template: "%s | Sacramento Dental Medicine",
  },
  description: seo.description,
  alternates: {
    canonical: "/",
  },
  robots: isPreviewDeploy
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
        },
      },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  appleWebApp: {
    title: contact.shortName,
    statusBarStyle: "default",
  },
  openGraph: {
    title: seo.ogTitle,
    description: seo.ogDescription,
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: contact.practiceName,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.ogDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const analyticsEnabled = process.env.VERCEL_WEB_ANALYTICS_ENABLED === "true";

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
        >
          Skip to content
        </a>
        <LeadAttributionCapture />
        {children}
        <GoogleAnalytics />
        {analyticsEnabled ? <SiteAnalytics /> : null}
      </body>
    </html>
  );
}
