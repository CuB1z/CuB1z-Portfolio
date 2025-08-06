import { getLocale, getDefaultLocale } from "i18n:astro";

/**
 * Builds a URL with the current locale prefix if applicable.
 *
 * @param {string} path - The path to be appended to the base URL.
 * @returns {string} The complete URL with the locale prefix.
 */
export function buildUrl(path: string): string {
    const locale = getLocale();

    const baseUrl = locale && locale !== getDefaultLocale() ? `/${locale}` : "";
    return baseUrl + path;
}
