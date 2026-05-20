"use client";

import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { motion, AnimatePresence } from "framer-motion";

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const SystemIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

type ThemeOption = "light" | "system" | "dark";

const THEMES: { value: ThemeOption; icon: React.ReactNode; label: string }[] = [
  { value: "light", icon: <SunIcon />, label: "Light" },
  { value: "system", icon: <SystemIcon />, label: "System" },
  { value: "dark", icon: <MoonIcon />, label: "Dark" },
];

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();
  const [showTooltip, setShowTooltip] = useState(false);

  const currentTheme: ThemeOption =
    !isSSR && (theme === "light" || theme === "dark" || theme === "system")
      ? (theme as ThemeOption)
      : "system";

  const currentIndex = THEMES.findIndex((t) => t.value === currentTheme);


  useEffect(() => {
    if (!showTooltip) return;
    const t = setTimeout(() => setShowTooltip(false), 1500);
    return () => clearTimeout(t);
  }, [showTooltip, currentTheme]);

  return (
    <div className={`relative flex items-center ${className ?? ""}`}>
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold px-2 py-1 rounded-lg bg-default-100 border border-black/10 dark:border-white/10 text-default-600 pointer-events-none z-50"
          >
            {THEMES[currentIndex].label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3-way pill toggle */}
      <div
        className="relative flex items-center gap-0.5 p-1 rounded-xl bg-default-100 border border-black/10 dark:border-white/10"
        role="group"
        aria-label="Theme selector"
      >
        {/* Sliding background indicator */}
        <motion.div
          className="absolute top-1 bottom-1 rounded-lg bg-white dark:bg-default-200 shadow-sm border border-black/5 dark:border-white/10"
          initial={false}
          animate={{
            left: `calc(${currentIndex} * (100% - 0.5rem) / 3 + 0.25rem)`,
            width: `calc((100% - 0.5rem) / 3)`,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        {THEMES.map((t, i) => (
          <button
            key={t.value}
            aria-label={`Switch to ${t.label} mode`}
            aria-pressed={currentIndex === i}
            onClick={() => {
              setTheme(t.value);
              setShowTooltip(true);
            }}
            className={`relative z-10 flex items-center justify-center w-8 h-7 rounded-lg transition-colors duration-200 cursor-pointer
              ${currentIndex === i
                ? "text-foreground"
                : "text-default-400 hover:text-default-600"
              }`}
          >
            {t.icon}
          </button>
        ))}
      </div>
    </div>
  );
};
