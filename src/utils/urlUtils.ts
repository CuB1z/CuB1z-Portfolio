import { getLocale, getDefaultLocale } from "i18n:astro";

/**
 * Normalises a path to have exactly one trailing slash so that every internal
 * link and `hreflang` matches the trailing-slash canonical URLs Astro emits.
 * The root path stays as "/".
 *
 * @param {string} path - The path to normalise.
 * @returns {string} The path with a single trailing slash.
 */
function withTrailingSlash(path: string): string {
    if (!path || path === "/") return "/";
    return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Builds a URL with the current locale prefix if applicable.
 *
 * @param {string} path - The path to be appended to the base URL.
 * @returns {string} The complete URL with the locale prefix.
 */
export function buildUrl(path: string): string {
    const locale = getLocale();

    const baseUrl = locale && locale !== getDefaultLocale() ? `/${locale}` : "";
    return withTrailingSlash(baseUrl + path);
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
    return withTrailingSlash(baseUrl + path);
}
