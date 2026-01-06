
const pages = [
  "",
  "projects",
  "resume",
  "blog"
];

const locales = ["", "es"];

export async function GET(context: { site: URL }) {
  const siteUrl = context.site.href;
  
  const urls = locales.flatMap(locale => 
    pages.map(page => {
      const localePath = locale ? `/${locale}` : "";
      const pagePath = page ? `/${page}` : "";
      const path = `${localePath}${pagePath}` || "/";
      return new URL(path, siteUrl).href;
    })
  );

  const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.endsWith('/') || url.endsWith('/es') ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>
`.trim();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
