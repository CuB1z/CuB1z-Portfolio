import { defineConfig } from "astro/config";
import i18n from "@astrolicious/i18n";

export default defineConfig({
    site: "https://cub1z.es",
    integrations: [
        i18n({
            defaultLocale: "en",
            locales: ["en", "es"],
            strategy: "prefixExceptDefault",
        }),
    ],
});
