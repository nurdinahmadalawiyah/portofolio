"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Prevent scrolling while splash screen is active
    document.body.style.overflow = "hidden";
    
    // Hide splash screen after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 2000);

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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative size-24 rounded-3xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md flex items-center justify-center overflow-hidden">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="text-3xl font-black tracking-tight text-foreground"
              >
                <span className="text-turquoise">{initials.slice(0, 1)}</span>
                <span>{initials.slice(1)}</span>
              </motion.div>

              <motion.svg
                aria-hidden
                viewBox="0 0 120 120"
                className="absolute inset-0 size-full"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { repeat: Infinity, duration: 2.4, ease: "linear" }
                }
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
              </motion.svg>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="text-[10px] uppercase tracking-[0.35em] text-default-500 dark:text-default-400 font-black">
              Loading portfolio
            </div>
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-2 rounded-full bg-turquoise"
                  animate={prefersReducedMotion ? undefined : { y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: i * 0.12 }
                  }
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
