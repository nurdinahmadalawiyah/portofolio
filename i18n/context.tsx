"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultLocale, isLocale, LOCALE_STORAGE_KEY, type Locale } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";
import { formatMessage, type MessageValues } from "./format";

type LocaleContextValue = {
	locale: Locale;
	dictionary: Dictionary;
	setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
	children,
	initialLocale = defaultLocale,
}: {
	children: ReactNode;
	initialLocale?: Locale;
}) {
	const [locale, setLocaleState] = useState<Locale>(initialLocale);

	// Applied after hydration so SSR markup and the first client render stay identical.
	useEffect(() => {
		const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
		if (isLocale(stored)) {
			if (stored !== locale) setLocaleState(stored);
			return;
		}

		const preferred = window.navigator.languages.find(isLocale);
		if (preferred && preferred !== locale) setLocaleState(preferred);
	}, [locale]);

	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	const setLocale = (next: Locale) => {
		setLocaleState(next);
		window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
	};

	const value = useMemo(
		() => ({ locale, dictionary: getDictionary(locale), setLocale }),
		[locale]
	);

	return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
	const context = useContext(LocaleContext);
	if (!context) throw new Error("useLocale must be used inside <LocaleProvider>");
	return context;
}

export function useT(): Dictionary {
	return useLocale().dictionary;
}

export function useFormat(): (message: string, values?: MessageValues) => string {
	const { locale } = useLocale();
	return useMemo(() => (message: string, values?: MessageValues) => formatMessage(locale, message, values), [locale]);
}
