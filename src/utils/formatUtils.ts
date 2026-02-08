
/**
 * Formats a date to a locale-specific string.
 * 
 * @param date The date to format.
 * @param locale The locale to use for formatting.
 * @returns The formatted date string.
 */
export function formatDate(date: Date, locale: string): string {
    return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
}