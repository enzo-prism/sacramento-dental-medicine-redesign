"use client";

import { useEffect } from "react";

/**
 * Next's scroll restoration can preserve a long Home-page offset when the
 * destination starts with a fixed header. The schedule route should open at
 * its introduction.
 */
export function ScheduleRouteStart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
