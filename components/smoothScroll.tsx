"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import { usePerformanceMode } from "./usePerformanceMode";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const isLowPowerMode = usePerformanceMode();

  if (isLowPowerMode) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ 
      duration: 1.2, 
      lerp: 0.1, 
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    }}>
      {children}
    </ReactLenis>
  );
}
