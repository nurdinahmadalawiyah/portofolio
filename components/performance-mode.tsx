"use client";

import { useEffect } from "react";
import { usePerformanceMode } from "./usePerformanceMode";

export function PerformanceMode() {
  const isLowPowerMode = usePerformanceMode();

  useEffect(() => {
    document.documentElement.classList.toggle("performance-lite", isLowPowerMode);
  }, [isLowPowerMode]);

  return null;
}

