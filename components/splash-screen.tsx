"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while splash screen is active
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 1600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  const initials = siteConfig.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          <div className="relative flex items-center justify-center">
            <div className="relative size-24 rounded-3xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md flex items-center justify-center overflow-hidden">
              <div className="text-3xl font-black tracking-tight text-foreground">
                <span className="text-turquoise">{initials.slice(0, 1)}</span>
                <span>{initials.slice(1)}</span>
              </div>

              <svg
                aria-hidden
                viewBox="0 0 120 120"
                className="absolute inset-0 size-full"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="none"
                  stroke="rgba(44,231,241,0.6)"
                  strokeWidth="2"
                  strokeDasharray="18 10"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <div className="text-[10px] uppercase tracking-[0.35em] text-default-500 dark:text-default-400 font-black">
              Loading portfolio
            </div>
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-2 rounded-full bg-turquoise"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
