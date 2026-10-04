import { defineCollection, z } from "astro:content";

const post = defineCollection({
    type: "content",
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
