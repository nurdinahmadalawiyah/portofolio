import en from "@/messages/en.json";
import { defaultLocale, type Locale } from "./config";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
	en,
};

export function getDictionary(locale: Locale): Dictionary {
	return dictionaries[locale] ?? dictionaries[defaultLocale];
}
