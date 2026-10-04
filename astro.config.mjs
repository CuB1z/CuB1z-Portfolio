import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://cub1z.es",
    i18n: {
        defaultLocale: "en",
        locales: ["en", "es"],
    },
    vite: {
        preview: {
            allowedHosts: true,
        },
    },
});
