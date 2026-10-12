import { IntlMessageFormat } from "intl-messageformat";
import type { Locale } from "./config";

export type MessageValues = Record<string, string | number | boolean | null | undefined>;

// Messages use ICU syntax ({name}, {count, plural, ...}), so a message is only
// parsed when values are passed: plain copy never goes through the formatter.
export function formatMessage(
	locale: Locale,
	message: string,
	values?: MessageValues
): string {
	if (!values) return message;
	return new IntlMessageFormat(message, locale).format(values) as string;
}
