"use client";

import { useEffect } from "react";

/**
 * Next's scroll restoration can preserve a long Home-page offset when the
 * destination starts with a fixed header. A scheduling route should always
 * open at its introduction, never halfway through the form or office details.
 */
export function ScheduleRouteStart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
