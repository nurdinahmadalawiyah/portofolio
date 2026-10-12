import en from "@/messages/en.json";
import id from "@/messages/id.json";
import { defaultLocale, type Locale } from "./config";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
	en,
	id,
};

export function getDictionary(locale: Locale): Dictionary {
	return dictionaries[locale] ?? dictionaries[defaultLocale];
}
