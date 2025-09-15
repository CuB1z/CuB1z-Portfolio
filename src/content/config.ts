import { defineCollection, z } from "astro:content";

const post = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        updatedDate: z.date().optional(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional().default(true),
        locale: z.enum(["en", "es"]).default("en"),
        slug: z.string().optional(),
    }),
});

export const collections = {
    post,
};
