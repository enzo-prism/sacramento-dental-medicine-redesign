"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  isGoogleAnalyticsProductionHostname,
} from "@/lib/google-analytics";
import { createGoogleAnalyticsController } from "@/lib/google-analytics-runtime";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __sacramentoGoogleAnalyticsController?: ReturnType<typeof createGoogleAnalyticsController>;
    "ga-disable-G-E1QV3QH6XD"?: boolean;
  }
}

function analyticsOptOut() {
  const choice = new URLSearchParams(window.location.search).get("analytics");
  try {
    if (choice === "off") sessionStorage.setItem("sdm_analytics_opt_out", "1");
    if (choice === "on") sessionStorage.removeItem("sdm_analytics_opt_out");
    return sessionStorage.getItem("sdm_analytics_opt_out") === "1";
  } catch {
    return choice === "off";
  }
}

function controller() {
  if (window.__sacramentoGoogleAnalyticsController) return window.__sacramentoGoogleAnalyticsController;
  const instance = createGoogleAnalyticsController({
    send: (...args: unknown[]) => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function gtag() {
        // gtag commands must retain the standard Arguments object shape.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };
      window.gtag(...args);
    },
    setDisabled: (disabled) => { window["ga-disable-G-E1QV3QH6XD"] = disabled; },
    load: () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`;
      script.dataset.sacramentoGoogleAnalytics = "true";
      document.head.appendChild(script);
    },
  });
  window.__sacramentoGoogleAnalyticsController = instance;
  return instance;
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    if (!isGoogleAnalyticsProductionHostname(window.location.hostname)) return;
    controller().page(pathname, window.location.search, document.referrer, analyticsOptOut());
  }, [pathname]);
  return null;
}
