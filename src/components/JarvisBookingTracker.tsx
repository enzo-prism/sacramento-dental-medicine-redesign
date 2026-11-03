"use client";

import { useEffect } from "react";
import { createJarvisBookingStartRecorder } from "@/lib/conversion";

/**
 * Fires `jarvis_booking_start` once per visit to `/schedule`, when focus
 * first moves into the Jarvis frame. Cross-origin frames do not expose
 * clicks, but the parent window blurs and the frame becomes the active
 * element. Completed bookings are counted in Jarvis, not here.
 */
export function JarvisBookingTracker() {
  useEffect(() => {
    const record = createJarvisBookingStartRecorder();
    let timer: number | undefined;
    const onBlur = () => {
      window.clearTimeout(timer);
      // activeElement updates after the blur event in some browsers.
      timer = window.setTimeout(() => record(document.activeElement), 0);
    };
    window.addEventListener("blur", onBlur);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return null;
}
