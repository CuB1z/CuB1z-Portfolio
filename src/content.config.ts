import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const post = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/post" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        updatedDate: z.date().optional(),
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        tags: z.array(z.string()).optional(),
        locale: z.enum(["en", "es"]).default("en"),
        slug: z.string().optional(),
        altSlug: z.string().optional(), // Alternative slug for other language [EN | ES]
        showcase: z.boolean().default(true), // false: only listed in /blog, not on home or project pages
    }),
});

export const collections = {
    post,
};
