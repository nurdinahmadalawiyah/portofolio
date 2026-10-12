"use client";

import clsx from "clsx";
import { locales, type Locale } from "@/i18n/config";
import { useLocale, useT } from "@/i18n/context";

const SHORT_LABELS: Record<Locale, string> = { en: "EN", id: "ID" };
const LANGUAGE_NAMES: Record<Locale, string> = { en: "English", id: "Bahasa Indonesia" };

export const LanguageSwitch = ({ className }: { className?: string } = {}) => {
  const t = useT();
  const { locale, setLocale } = useLocale();

  return (
    <div className={`relative flex items-center ${className ?? ""}`}>
      <div
        role="group"
        aria-label={t.common.language}
        className="flex items-center rounded-xl bg-default-100 border border-black/10 dark:border-white/10 p-1"
      >
        {locales.map((option) => {
          const isActive = locale === option;
          return (
            <button
              key={option}
              type="button"
              lang={option}
              aria-pressed={isActive}
              aria-label={LANGUAGE_NAMES[option]}
              title={LANGUAGE_NAMES[option]}
              onClick={() => setLocale(option)}
              className={clsx(
                "flex items-center justify-center w-9 h-8 rounded-lg text-xs font-bold transition-colors",
                isActive
                  ? "bg-black/5 dark:bg-white/5 text-turquoise"
                  : "text-default-600 hover:text-foreground"
              )}
            >
              {SHORT_LABELS[option]}
            </button>
          );
        })}
      </div>
    </div>
  );
};
