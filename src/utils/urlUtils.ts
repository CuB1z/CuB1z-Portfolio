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

/**
 * Builds an alternative language URL with the specified locale prefix if applicable.
 * @param {string} path - The path to be appended to the base URL.
 * @param {string} locale - The target locale for the URL.
 * @returns {string} The complete URL with the specified locale prefix.
 */
export function buildAltLangUrl(path: string, locale: string): string {
    const altLocale = locale === "es" ? "en" : "es";
    const baseUrl = altLocale !== getDefaultLocale() ? `/${altLocale}` : "";
    return baseUrl + path;
}
