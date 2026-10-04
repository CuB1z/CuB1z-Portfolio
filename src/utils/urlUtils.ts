import { DEFAULT_LOCALE } from "./i18nUtils";

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
 * Builds a URL with the given locale prefix if applicable.
 *
 * @param {string} path - The path to be appended to the base URL.
 * @param {string} [locale] - The locale whose prefix to apply.
 * @returns {string} The complete URL with the locale prefix.
 */
export function buildUrl(path: string, locale?: string): string {
    const baseUrl = locale && locale !== DEFAULT_LOCALE ? `/${locale}` : "";
    return withTrailingSlash(baseUrl + path);
}

/**
 * Builds an alternative language URL with the specified locale prefix if applicable.
 * @param {string} path - The path to be appended to the base URL.
 * @param {string} [locale] - The current locale; the URL targets the other one.
 * @returns {string} The complete URL with the specified locale prefix.
 */
export function buildAltLangUrl(path: string, locale?: string): string {
    const altLocale = locale === "es" ? "en" : "es";
    const baseUrl = altLocale !== DEFAULT_LOCALE ? `/${altLocale}` : "";
    return withTrailingSlash(baseUrl + path);
}
