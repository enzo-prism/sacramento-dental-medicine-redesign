"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  isGoogleAnalyticsProductionHostname,
  sanitizeGoogleAnalyticsPath,
} from "@/lib/google-analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __sacramentoGoogleAnalyticsInitialized?: boolean;
  }
}

function initializeGoogleAnalytics() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  if (window.__sacramentoGoogleAnalyticsInitialized) return;

  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ANALYTICS_MEASUREMENT_ID, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    send_page_view: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`;
  script.dataset.sacramentoGoogleAnalytics = "true";
  document.head.appendChild(script);

  window.__sacramentoGoogleAnalyticsInitialized = true;
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const lastObservedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!isGoogleAnalyticsProductionHostname(window.location.hostname)) return;
    if (lastObservedPath.current === pathname) return;
    lastObservedPath.current = pathname;

    const safePath = sanitizeGoogleAnalyticsPath(pathname);
    if (!safePath) return;

    initializeGoogleAnalytics();
    window.gtag?.("event", "page_view", {
      page_location: `${window.location.origin}${safePath}`,
      page_path: safePath,
      page_referrer: "",
      page_title: "Sacramento Dental Medicine",
      send_to: GOOGLE_ANALYTICS_MEASUREMENT_ID,
    });
  }, [pathname]);

  return null;
}
