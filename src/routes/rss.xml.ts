import { getCollection } from "astro:content";

const esc = (s: string) =>
    s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

export async function GET(context: { site: URL; url: URL }) {
    const site = context.site.href.replace(/\/$/, "");
    const isEs = context.url.pathname.startsWith("/es");
    const locale = isEs ? "es" : "en";
    const base = isEs ? `${site}/es` : site;

    const title = "Diego Sánchez Rincón · Blog";
    const description = isEs
        ? "Posts sobre ingeniería, arquitectura y el proyecto TripFlow."
        : "Posts on engineering, architecture and the TripFlow project.";

    const posts = (await getCollection("post"))
        .filter((p) => (p.data.locale ?? "en") === locale)
        .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

    const items = posts
        .map((p) => {
            const url = `${base}/blog/${p.data.slug || p.slug}/`;
            return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${p.data.pubDate.toUTCString()}</pubDate>
      <description>${esc(p.data.description)}</description>
    </item>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(title)}</title>
    <link>${base}/blog/</link>
    <description>${esc(description)}</description>
    <language>${locale}</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml" },
    });
}
