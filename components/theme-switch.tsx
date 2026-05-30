"use client";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { createPortal } from "react-dom";

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

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
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
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isSSR = useIsSSR();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuAnchorRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; right: number } | null>(null);

  const currentTheme: ThemeOption = useMemo(() => {
    if (isSSR) return "system";
    if (theme === "light" || theme === "dark" || theme === "system") return theme;
    return "system";
  }, [isSSR, theme]);

  const effectiveTheme: "light" | "dark" = useMemo(() => {
    if (isSSR) return "light";
    if (resolvedTheme === "light" || resolvedTheme === "dark") return resolvedTheme;
    return currentTheme === "dark" ? "dark" : "light";
  }, [currentTheme, isSSR, resolvedTheme]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (!containerRef.current?.contains(target)) setIsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const update = () => {
      const anchor = menuAnchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 24,
        right: window.innerWidth - rect.right,
      });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative flex items-center ${className ?? ""}`}>
      <div className="flex items-center rounded-xl bg-default-100 border border-black/10 dark:border-white/10 p-1">
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() => setTheme(effectiveTheme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center w-9 h-8 rounded-lg text-default-600 hover:text-foreground transition-colors"
        >
          {effectiveTheme === "dark" ? <MoonIcon /> : <SunIcon />}
        </button>

        <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1" />

        <button
          type="button"
          aria-label="Theme options"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          ref={menuAnchorRef}
          className="flex items-center justify-center w-9 h-8 rounded-lg text-default-500 hover:text-foreground transition-colors"
        >
          <span className={`transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </span>
        </button>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
            isOpen && menuPos ? (
              <div
                role="menu"
                aria-label="Theme options"
                className="fixed w-44 rounded-2xl border border-black/10 dark:border-white/10 bg-background/70 dark:bg-background/60 backdrop-blur-xl shadow-none ring-1 ring-black/5 dark:ring-white/10 overflow-hidden z-[9999] animate-theme-menu-in"
                style={{ top: menuPos.top, right: menuPos.right }}
              >
                <div className="p-1">
                  {THEMES.map((t) => {
                    const isActive = currentTheme === t.value;
                    return (
                      <button
                        key={t.value}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setTheme(t.value);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors
                          ${isActive ? "bg-black/5 dark:bg-white/5 text-foreground" : "text-default-600 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"}`}
                      >
                        <span className="text-default-500">{t.icon}</span>
                        <span className="flex-1 text-left">{t.label}</span>
                        {isActive && (
                          <span className="text-turquoise">
                            <CheckIcon />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null,
          document.body
        )}
    </div>
  );
};
