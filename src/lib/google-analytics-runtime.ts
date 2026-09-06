import {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  GOOGLE_ANALYTICS_ORIGIN,
  GOOGLE_ANALYTICS_PRIVACY_CONFIG,
  googleAnalyticsPageParameters,
  safeGoogleAnalyticsAcquisition,
} from "./google-analytics.ts";

type AnalyticsEnvironment = {
  send: (...args: unknown[]) => void;
  load: () => void;
  setDisabled: (disabled: boolean) => void;
};

/** One controller per document. All paths, including excluded paths, reach it. */
export function createGoogleAnalyticsController(env: AnalyticsEnvironment) {
  let initialized = false;
  let lastObservedPath: string | null = null;
  let previousLocation = "";
  let acquisition: ReturnType<typeof safeGoogleAnalyticsAcquisition> | null = null;

  return {
    page(pathname: string, search: string, referrer: string, optedOut = false) {
      if (optedOut) {
        env.setDisabled(true);
        lastObservedPath = null;
        return;
      }
      if (lastObservedPath === pathname) return;
      lastObservedPath = pathname;
      const incoming = acquisition ?? safeGoogleAnalyticsAcquisition(search, referrer);
      const page = googleAnalyticsPageParameters(pathname, previousLocation || incoming.page_referrer);
      if (!page) {
        env.setDisabled(true);
        if (initialized) env.send("set", {
          page_location: `${GOOGLE_ANALYTICS_ORIGIN}/`, page_path: "/",
          page_title: "Sacramento Dental Medicine", page_referrer: "", content_group: "",
        });
        return;
      }
      acquisition = incoming;
      // Update tag-wide context BEFORE config/load. Event-only overrides do not
      // protect automatic user_engagement, first_visit, and session_start events.
      const context = { ...GOOGLE_ANALYTICS_PRIVACY_CONFIG, ...acquisition, ...page };
      env.send("set", context);
      env.setDisabled(false);
      if (!initialized) {
        env.send("js", new Date());
        env.send("config", GOOGLE_ANALYTICS_MEASUREMENT_ID, GOOGLE_ANALYTICS_PRIVACY_CONFIG);
        env.load();
        initialized = true;
      }
      env.send("event", "page_view", { ...page, send_to: GOOGLE_ANALYTICS_MEASUREMENT_ID });
      previousLocation = page.page_location;
    },
  };
}
