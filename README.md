# Diego Sánchez · Portfolio

Personal portfolio and blog — a fast, bilingual, single-page site built with [Astro](https://astro.build/).

🔗 **[cub1z.es](https://cub1z.es)**

## ✨ Features

-   **Single-page home** — hero, experience, selected work and about in one scroll, with a floating nav and scroll-spy highlighting the active section.
-   **Bilingual (EN / ES)** — full i18n via `@astrolicious/i18n`; English at the root, Spanish under `/es`.
-   **Blog** — Markdown posts with an auto-generated, sticky table of contents, breadcrumbs and client-side pagination.
-   **Responsive** — adapts down to mobile (project carousel, stacked layouts) and respects view transitions.
-   **No UI framework** — just Astro + scoped CSS and a touch of vanilla JS.

## 🛠 Tech stack

-   **[Astro 5](https://astro.build/)** — static site generation + view transitions
-   **[@astrolicious/i18n](https://github.com/astrolicious/i18n)** — internationalised routing
-   **[@lucide/astro](https://lucide.dev/)** — icons
-   **Scoped CSS** with CSS custom properties (design tokens), **Geist** typeface

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
├─ routes/              # pages (astro-i18n): index, blog, blog/[...slug], 404, sitemap.xml
├─ layouts/             # Layout.astro — <head>, design tokens, global CSS + scripts
├─ components/
│  ├─ sections/         # home sections: Hero, Experience, Work, About, WritingTeaser
│  └─ shared/           # Nav, Footer, Breadcrumb, SectionHeader, ArrowButton
├─ locales/{en,es}/     # translation strings: common, hero, resume, projects, blog, 404
├─ content/post/{en,es} # blog posts (Markdown)
├─ constants/           # socialData
└─ utils/               # urlUtils (locale-aware links), formatUtils (dates)
```

## ✍️ Editing content

-   **Copy / sections** → edit the JSON files in `src/locales/{en,es}/`.
-   **Projects** → `src/locales/{en,es}/projects.json` (the first project is rendered as the featured card).
-   **Blog posts** → add a Markdown file under `src/content/post/{en,es}/` with the frontmatter defined in `src/content/config.ts` (`title`, `description`, `pubDate`, `tags`, `slug`, `altSlug`, …).

## 📬 Contact

| Method      | Contact Info                       |
| ----------- | ---------------------------------- |
| 📧 Email    | cub1zdev@gmail.com                 |
| 💼 LinkedIn | https://www.linkedin.com/in/cub1z/ |
| 🐙 GitHub   | https://github.com/CuB1z           |
