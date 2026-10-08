# AGENTS.md

Single source of truth for AI coding agents (Claude Code, Codex) working in this repo. Claude Code reads it via `CLAUDE.md` (`@AGENTS.md`); Codex loads it natively. **When project facts change, update this file, not the tool files.**

## Notes for all agents

- **Branch from `main`** with a prefix and merge via PR into `main` (every PR in the history targets `main`). Prefixes in use: `chore/`, `feature/`, `fix/`, `feat/`, and `zicy-sync/` for branches produced by the zicy-sync pipeline. Don't commit to `main` directly.
- **Commits** use conventional commits with a scope where one fits, e.g. `chore(llms): ...`, `feat(resources): ...`, `fix(screenshots): ...`, `fix(copy): ...`, `feat(solutions): ...`.
- **Deploy:** the site is on Vercel with no adapter (`vercel.json`). Per the zicy-tests zicy-sync skill, a push to `main` deploys live to www.zicy.com, so treat a merge to `main` as a production release. This repo does not document preview-deployment behaviour for other branches.
- **Screenshots and captures come from the zicy-sync pipeline** in the sibling repo `../zicy-tests` (`.agents/skills/zicy-sync/`, tracked in its `manifest/config.yaml`). zicy-sync PRs write certified fixture renders into `src/assets/screenshots/` and `src/assets/resources/<article>/` (plus the matching `src/pages/resources/*.astro` edits). Don't hand-edit or hand-replace those images; recapture through zicy-sync. The old `anonymised/` image set is gone and must not be referenced.
- **Specs:** active specifications live in `specs/active/`; a handoff must name the exact spec path. Template: `specs/templates/spec.md`.

## What this is

The marketing site for Zicy (`www.zicy.com`), an AI visibility platform built by Growth.pro. Astro 5, static output (SSG): every page is pre-rendered to HTML at build time so content is present in the initial response for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) and traditional search bots. Deployed on Vercel with no adapter.

## Layout

| Path | What it is |
|---|---|
| `src/pages/` | Routes: `index`, `platform/`, `solutions/`, `case-studies/`, `resources/` (incl. `glossary/`), `about/`, `legal/`, `ai-brand-audit`, `pricing`, `pricing.json.ts`, `og/[...route].ts` |
| `src/data/` | Copy and structured content: `site.ts`, `cases.ts`, `icps.ts`, `faqs.ts`, `og-pages.ts`, `pricing.ts`, `resources-posts.ts`, `free-diagnostic.ts`, `press-logo-scale.mjs` |
| `src/components/` | Astro components (`Schema`, `Header`, `Footer`, `CookieConsent`, `FaqAccordion`, `Screenshot`, `AskZicyWidget`, `FreeDiagnostic`, `pricing/`, etc.) |
| `src/layouts/BaseLayout.astro` | The only page shell |
| `src/lib/schema.ts` | Shared JSON-LD helpers |
| `src/scripts/askZicy.ts` | Client script for the Ask Zicy widget |
| `src/dev/diagnostic-api-proxy.ts` | Dev-only proxy for the free-audit API |
| `src/styles/` | Global styles |
| `src/assets/` | Build-processed images: `screenshots/`, `resources/`, `case-studies/`, `team/` |
| `public/` | Static files served as-is: `robots.txt`, `llms.txt`, `press/`, `case-studies/`, favicons, logos, `og-image.png` |
| `og-assets/fonts/` | Fonts used to render the generated OG cards |
| `scripts/` | Node helper scripts (`dev-public-chat-stub.mjs`, `make-press-tiles.mjs`) |
| `docs/` | Legal and cookie-policy source copy and reviews (not part of the site build) |
| `specs/` | Feature specs: `active/`, `completed/`, `templates/spec.md` |
| `vercel.json` | Headers and all redirects |
| `REDIRECTS.md`, `REDIRECTS.blog-staged.json` | Redirect documentation and staged blog redirects |
| `.env.example` | Env vars: `PUBLIC_DIAGNOSTIC_API_BASE`, `DIAGNOSTIC_API_TARGET` |

## Commands

Install with `npm ci`. There is no test suite or linter configured. TypeScript uses `astro/tsconfigs/strict`.

| Command | What it does |
|---|---|
| `npm run dev` | `astro dev` at http://localhost:4321 |
| `npm run dev:local-api` | Dev server with `DIAGNOSTIC_API_TARGET=http://localhost:8000`; the proxy in `src/dev/diagnostic-api-proxy.ts` forwards free-audit API calls to a local backend |
| `npm run dev:prod-api` | Same, with `DIAGNOSTIC_API_TARGET=https://api.zicy.com` |
| `npm run dev:chat-stub` | `scripts/dev-public-chat-stub.mjs`: dev-only stub of `POST /public-chat/stream` for the Ask Zicy widget (port `PUBLIC_CHAT_STUB_PORT`, default 8787; trigger words like `!429`, `!error`, `!xss-js` in the message select canned replies; see the file header). Point `DIAGNOSTIC_API_TARGET` at it |
| `npm run build` | `astro build` to `dist/` (123 pages at time of writing) |
| `npm run preview` | Preview the production build |
| `npm run press-tiles` | `scripts/make-press-tiles.mjs`: regenerates `public/press/tiles/<slug>.webp` from the publisher logos in `public/press/` |
| `npx astro check` | Type-check `.astro` files. Baseline on `main` is not clean (85 errors at time of writing), so compare against that baseline rather than expecting zero |

## Conventions

Existing docs: `REDIRECTS.md` (read before adding or reasoning about redirects), `.env.example` (env vars), `docs/` (legal and cookie copy). There is no README.

### Architecture

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

### House style (copy in `src/data/*.ts` and page components)

These rules are repeated as comments across the data files — apply them to any new or edited copy:

- Sentence case; no em dashes (use commas, colons, periods, or a middot instead)
- The five AI engines are named in fixed order and full form when listed: ChatGPT, Gemini, Perplexity, Google AI Overviews, Google AI Mode
- No banned vocabulary: hijack / hijack rate / leaked rate / Answer Share / AI Butler / co-pilot / AEO Specialist / Citation Velocity / real-time
- No Growth.pro-internal IP names in customer-facing copy (PAVA, AICE, AI Visibility Operating System)
- No hardcoded/invented metrics, rival names, or demo-brand data in brand-level marketing copy (case study cards, OG cards); real stats must carry publisher + sample + year inline
- Straight apostrophes, not curly, for consistency with existing data files
- Case-study client data stays anonymised pending naming permission — don't add client names

### Screenshots

Product screenshots used on marketing pages must be captured ONLY from the demo test account (the three demo profiles MenuPilot, GreenGrid Media and NorthStar Digital) and must carry the mandatory "SAMPLE DASHBOARD" banner, as defined in `vocab/redaction-rules.json` in zicy-tests. Never capture from a real customer account. The old `anonymised/` image set was deleted on 2026-08-05 and must not be referenced. See the comment in `src/data/icps.ts` for the privacy-gate rule before adding a new screenshot embed.
