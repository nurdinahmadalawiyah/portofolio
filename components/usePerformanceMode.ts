"use client";

import { useEffect, useState } from "react";

const getIsLowPowerDevice = () => {
  if (typeof window === "undefined") return false;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: {
      saveData?: boolean;
      effectiveType?: string;
    };
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const prefersReducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
  const lowCoreCount = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const saveData = Boolean(nav.connection?.saveData);
  const slowConnection = nav.connection?.effectiveType === "slow-2g" || nav.connection?.effectiveType === "2g";

  return prefersReducedMotion || prefersReducedData || lowCoreCount || lowMemory || saveData || slowConnection;
};

export function usePerformanceMode() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  useEffect(() => {
    const update = () => setIsLowPowerMode(getIsLowPowerDevice());

    update();

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedDataQuery = window.matchMedia("(prefers-reduced-data: reduce)");

    reducedMotionQuery.addEventListener("change", update);
    reducedDataQuery.addEventListener("change", update);

    return () => {
      reducedMotionQuery.removeEventListener("change", update);
      reducedDataQuery.removeEventListener("change", update);
    };
  }, []);

  return isLowPowerMode;
}

