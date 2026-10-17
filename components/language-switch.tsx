"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Languages } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { useLocale, useT } from "@/i18n/context";

const SHORT_LABELS: Record<Locale, string> = { en: "EN", id: "ID" };
const LANGUAGE_NAMES: Record<Locale, string> = { en: "English", id: "Indonesia" };

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const LanguageSwitch = ({ className }: { className?: string } = {}) => {
  const t = useT();
  const { locale, setLocale } = useLocale();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuAnchorRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; right: number } | null>(null);

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
        // Matches ThemeSwitch's offset so both menus open at the same spot.
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
          ref={menuAnchorRef}
          aria-label={t.common.language}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="flex items-center justify-center w-9 h-8 rounded-lg text-default-600 hover:text-foreground transition-colors"
        >
          <Languages size={16} />
        </button>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && menuPos && (
              <motion.div
                role="menu"
                aria-label={t.common.language}
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="fixed w-44 rounded-2xl border border-black/10 dark:border-white/10 bg-background/70 dark:bg-background/60 backdrop-blur-xl shadow-none ring-1 ring-black/5 dark:ring-white/10 overflow-hidden z-[9999]"
                style={{ top: menuPos.top, right: menuPos.right }}
              >
                <div className="p-1">
                  {locales.map((option) => {
                    const isActive = locale === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        role="menuitem"
                        lang={option}
                        onClick={() => {
                          setLocale(option);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors
                          ${isActive ? "bg-black/5 dark:bg-white/5 text-foreground" : "text-default-600 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"}`}
                      >
                        <span className="w-6 text-center text-[10px] font-black uppercase text-default-500">
                          {SHORT_LABELS[option]}
                        </span>
                        <span className="flex-1 text-left">{LANGUAGE_NAMES[option]}</span>
                        {isActive && (
                          <span className="text-turquoise">
                            <CheckIcon />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
