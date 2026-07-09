# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## What this is

The marketing site for Zicy (`www.zicy.com`), an AI visibility platform built by Growth.pro. Astro 5, static output (SSG) — every page is pre-rendered to HTML at build time so content is present in the initial response for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) and traditional search bots. Deployed on Vercel with no adapter.

## Commands

```
npm run dev       # astro dev, http://localhost:4321
npm run build     # astro build -> dist/
npm run preview   # preview the production build
```

There is no test suite or linter configured. TypeScript uses `astro/tsconfigs/strict`; run `npx astro check` to type-check `.astro` files.

## Architecture

**Data-driven pages.** Copy and structured content live in `src/data/*.ts`, not inline in templates. Dynamic routes (`getStaticPaths`) map that data onto one shared template:

- `src/data/cases.ts` → `src/pages/case-studies/[slug].astro` (case study detail pages; body is stored as HTML in `bodyHtml`)
- `src/data/icps.ts` → `src/pages/solutions/[icp].astro` (the four ICP pages: brands, pr, agencies, publishers)
- `src/pages/resources/glossary/_glossary-data.ts` → `src/pages/resources/glossary/[term].astro` (underscore prefix keeps Astro from routing the data file itself)
- `src/data/faqs.ts` → shared `universalFaqs` rendered on all four `/solutions` pages beneath each page's own FAQ block; both render through `FaqAccordion.astro` / `FaqUniversal.astro`, and each page's `FAQPage` JSON-LD must match what's rendered
- `src/data/site.ts` — single source of truth for site identity/nav (`SITE`, `SOLUTIONS`, `FREE_TOOLS`); URLs here must match `robots.txt`/`llms.txt`/sitemap
- `src/data/og-pages.ts` — maps every route to per-page OG/social-card copy (`eyebrow`/`title`/`description`/`alt`); `src/pages/og/[...route].ts` renders one branded PNG per entry at build time, and `ogImageMeta()` in `BaseLayout.astro` derives the page's `og:image` URL from its own pathname so the advertised URL and the generated PNG can never drift. Case-study OG entries are generated from `CASES` in a loop so coverage stays in sync automatically.

**Structured data.** `src/components/Schema.astro` is the single owner of sitewide JSON-LD (`WebSite`, `Organization`, `SoftwareApplication`/offers, `Person` entries), imported once by `BaseLayout.astro` so it's identical on every page. Page-specific JSON-LD (`Article`, `BreadcrumbList`, `FAQPage`, etc.) lives in the individual page files instead. Nodes use stable `@id`s (`#org`, `#app`, `#site`) for cross-referencing.

**Layout.** `BaseLayout.astro` is the only page shell: head meta/OG/canonical, Google Consent Mode v2 (must default to denied and run before GTM — see the inline script comments), GTM, fonts, `Schema`, `Header`/`Footer`/`CookieConsent`, and a sitewide scroll-reveal `IntersectionObserver` keyed off `.reveal` elements. Every page passes `title`/`description` (and optionally `ogTitle`/`ogDescription`/`noindex`) as props.

**Redirects.** All server-side 301/302s live in `vercel.json` (`redirects`), documented in `REDIRECTS.md` — read that file before adding or reasoning about redirects. Key rules: first-match-wins, specific rules before wildcards, `trailingSlash: false` matches `astro.config.mjs`'s `trailingSlash: 'never'`, and there's deliberately no `/case-studies/:path*` catch-all since it would shadow the real detail pages. Case-study slugs were renamed from the old zicy.com site; `data/cases.ts` holds the new slugs, old ones 301 via `vercel.json`.

**Crawler-facing files.** `public/robots.txt` explicitly allow-lists AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) and `public/llms.txt` gives an AI-readable summary of the brand and canonical pages. Both must stay in sync with actual routes and with `SITE`/`data/cases.ts` slugs when pages are renamed or added.

## House style (copy in `src/data/*.ts` and page components)

These rules are repeated as comments across the data files — apply them to any new or edited copy:

- Sentence case; no em dashes (use commas, colons, periods, or a middot instead)
- The five AI engines are named in fixed order and full form when listed: ChatGPT, Gemini, Perplexity, Google AI Overviews, Google AI Mode
- No banned vocabulary: hijack / hijack rate / leaked rate / Answer Share / AI Butler / co-pilot / AEO Specialist / Citation Velocity / real-time
- No Growth.pro-internal IP names in customer-facing copy (PAVA, AICE, AI Visibility Operating System)
- No hardcoded/invented metrics, rival names, or demo-brand data in brand-level marketing copy (case study cards, OG cards); real stats must carry publisher + sample + year inline
- Straight apostrophes, not curly, for consistency with existing data files
- Case-study client data stays anonymised pending naming permission — don't add client names

## Screenshots

Real product screenshots used on marketing pages must be the privacy-cleared `anonymised/` variants under `src/assets/screenshots/anonymised/` (these carry a "SAMPLE DASHBOARD" banner and blur brand/competitor/URL regions). See the comment in `src/data/icps.ts` for the privacy-gate rule before adding a new screenshot embed.
