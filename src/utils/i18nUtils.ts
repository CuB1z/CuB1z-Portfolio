const messages = import.meta.glob<Record<string, unknown>>("../locales/*/*.json", {
    eager: true,
    import: "default",
});

export const DEFAULT_LOCALE = "en";

/**
 * `getStaticPaths` for pages served in every locale: the default locale at the
 * root and Spanish under `/es`.
 */
export function localePaths() {
    return [{ params: { lang: undefined } }, { params: { lang: "es" } }];
}

/**
 * Returns a translator bound to a locale. Keys are `namespace:dot.path`, the
 * namespace defaults to `common`, and a missing key resolves to itself.
 *
 * @param {string} [locale] - The locale to translate into.
 * @returns The `t` function for that locale.
 */
export function useTranslations(locale: string = DEFAULT_LOCALE) {
    function t(key: string): string;
    function t(key: string, options: { returnObjects: true }): unknown;
    function t(key: string): unknown {
        const [ns, path] = key.includes(":") ? key.split(":") : ["common", key];
        const value = path
            .split(".")
            .reduce<any>((node, part) => node?.[part], messages[`../locales/${locale}/${ns}.json`]);
        return value ?? key;
    }
    return t;
}
