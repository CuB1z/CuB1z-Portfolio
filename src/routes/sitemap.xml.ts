import { getCollection } from "astro:content";

const staticPages = ["", "blog"];
const locales = ["", "es"];

/** Joins path segments into an absolute path with exactly one trailing slash. */
function buildPath(...segments: string[]): string {
  const joined = segments.filter(Boolean).join("/");
  return joined ? `/${joined}/` : "/";
}

export async function GET(context: { site: URL }) {
  const siteUrl = context.site.href;
  const now = new Date().toISOString();

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => {
      const path = buildPath(locale, page);
      const isHome = path === "/" || path === "/es/";
      return {
        url: new URL(path, siteUrl).href,
        lastmod: now,
        priority: isHome ? "1.0" : "0.8",
      };
    })
  );

  // Individual blog posts, each under its own locale only.
  const posts = await getCollection("post");
  const postEntries = posts.map((post) => {
    const slug = post.data.slug || post.slug;
    const locale = post.data.locale === "es" ? "es" : "";
    const date = post.data.updatedDate ?? post.data.pubDate;
    return {
      url: new URL(buildPath(locale, "blog", slug), siteUrl).href,
      lastmod: new Date(date).toISOString(),
      priority: "0.6",
    };
  });

  const entries = [...staticEntries, ...postEntries];

  const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries
      .map(
        (entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${entry.priority}</priority>
  </url>
  `
      )
      .join("")}
</urlset>
`.trim();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
