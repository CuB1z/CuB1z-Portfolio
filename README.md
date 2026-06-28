# Diego Sánchez Rincón · Portfolio

Personal portfolio and blog — a fast, bilingual site built with [Astro](https://astro.build/).

🔗 **[cub1z.es](https://cub1z.es)**

## ✨ Features

-   **Single-page home** — hero, experience, selected work and about in one scroll, with a floating nav and scroll-spy highlighting the active section.
-   **TripFlow case study** — a dedicated `/work/tripflow` page (problem, comparison table, architecture diagram, key decisions, quality metrics and build log), linked from the featured project card.
-   **Bilingual (EN / ES)** — full i18n via `@astrolicious/i18n`; English at the root, Spanish under `/es`.
-   **Blog** — Markdown posts with a sticky table of contents, breadcrumbs, pagination, reading time, related posts, an author card, and an **RSS feed** (`/rss.xml`, `/es/rss.xml`).
-   **Built for discoverability (GEO / SEO)** — JSON-LD structured data (`Person`, `WebSite`, `BlogPosting`, `BreadcrumbList`, `SoftwareApplication`, project `ItemList`), an `llms.txt` summary, a bilingual sitemap, and canonical + `hreflang` tags.
-   **Performance & a11y** — self-hosted fonts (no render-blocking Google Fonts), WebP images, and respects `prefers-reduced-motion`.
-   **Responsive** — a reusable carousel, stacked layouts and view transitions.
-   **No UI framework** — just Astro + scoped CSS and a touch of vanilla JS.

## 🛠 Tech stack

-   **[Astro 5](https://astro.build/)** — static site generation + view transitions
-   **[@astrolicious/i18n](https://github.com/astrolicious/i18n)** — internationalised routing
-   **Self-hosted [Geist](https://vercel.com/font)** (Geist + Geist Mono, `woff2`)
-   **Scoped CSS** with CSS custom properties (design tokens)

## 🚀 Getting started

```bash
npm install      # install dependencies
npm run dev      # local dev server (add -- --host to open from another device)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## 📁 Project structure

```
src/
├─ routes/              # index, blog, blog/[...slug], work/tripflow, 404, sitemap.xml, rss.xml
├─ layouts/             # Layout.astro — <head>, JSON-LD, design tokens, global CSS + scripts
├─ components/
│  ├─ sections/         # home sections: Hero, Experience, Work, About, WritingTeaser
│  └─ shared/           # Nav, Footer, Breadcrumb, SectionHeader, ArrowButton, Carousel
├─ locales/{en,es}/     # translation strings: common, hero, resume, projects, blog, tripflow, 404
├─ content/post/{en,es} # blog posts (Markdown)
├─ constants/           # socialData
└─ utils/               # urlUtils (locale-aware links), formatUtils (dates)
public/
├─ fonts/               # self-hosted Geist (woff2)
├─ llms.txt             # site summary for AI assistants
└─ robots.txt
```

## ✍️ Editing content

-   **Copy / sections** → edit the JSON files in `src/locales/{en,es}/`.
-   **Projects** → `src/locales/{en,es}/projects.json` (`featured: true` marks the featured card; `page` links it to a case study).
-   **TripFlow case study** → `src/locales/{en,es}/tripflow.json`.
-   **Blog posts** → add a Markdown file under `src/content/post/{en,es}/` with the frontmatter defined in `src/content/config.ts` (`title`, `description`, `pubDate`, `updatedDate`, `tags`, `image`, `imageAlt`, `slug`, `altSlug`).

## 📬 Contact

| Method      | Contact Info                       |
| ----------- | ---------------------------------- |
| 📧 Email    | cub1zdev@gmail.com                 |
| 💼 LinkedIn | https://www.linkedin.com/in/cub1z/ |
| 🐙 GitHub   | https://github.com/CuB1z           |
