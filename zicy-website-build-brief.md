# Zicy Website — Build Brief

**Pairs with:** `zicy-website-wireframe.html` (the clickable prototype — the visual North Star).
**Also reference:** `zicy-website-copy-deck.md` (**final copy for every page — source of truth**), `zicy-new-website-plan.md` (full IA), `zicy-brand-assets.md` (colour + type), `zicy-module-to-icp-value-matrix.md` (per-ICP proof blocks).

---

## How to use this (the fast path with Claude)

1. **Open the wireframe** in a browser. Click through every page — it's the agreed structure, layout, and look.
2. **Pick a build target.** Recommended: a static-site framework (Astro or Next.js static export) so the team can drop the wireframe's markup in almost verbatim and split it into components.
3. **Drive Claude page by page.** Give Claude (Claude Code, or chat) three things each time: the wireframe file, this brief, and the specific page's copy from the website plan. Use the prompts at the bottom.
4. **Build the templates first, not 14 unique pages.** The site is really ~6 templates (below). Most pages are clones with swapped copy.

The wireframe removes the guesswork; Claude turns it into a real codebase. That combination is the quickest route to launch.

---

## Build approach — templates, not pages

| Template | Build once | Reuse for |
|---|---|---|
| **Home** | Homepage | — |
| **Platform** | Platform page | — |
| **ICP solution** | For Brands | For PR agencies · For Marketing & creative agencies · For Publishers (swap USP, loss hook, hero modules per the value matrix) |
| **Case index + case detail** | Case studies index + one case | All 5 cases |
| **Pricing** | Pricing | — |
| **Free tools** | Free tools hub + AEO/GEO Consultant + Chrome extension landing | (Audit page reuses ICP/editorial shell) |
| **Editorial** | Done-for-you | About · Resources · Legal (same content shell) |

So: **7 templates → ~20 pages.** Building the four ICP pages and five case pages is copy-swapping, not new design.

**Free tools group (carried over from the current live site — don't lose these):**
- **Free AI visibility audit** — `/audit` (conversion page; copy in deck §16).
- **AEO/GEO Consultant** — `/aeo-geo-consultant` (embeds the existing interactive consultant app; copy in deck §17). Carries a light, attributed Growth.pro mention — see §A2 note, flag for sign-off.
- **Chrome extension** — `/chrome-extension` landing page (copy in deck §18); install button deep-links to the Chrome Web Store. The extension itself (AI-readiness score, AI bot-access checker, schema generator, 12 languages) is also a distribution channel — link it in nav, footer, and relevant ICP pages.

---

## Brand tokens (paste into the stylesheet / theme)

```css
:root{
  --indigo:#312E81;        /* primary — headings, brand, authority */
  --indigo-bright:#4F46E5; /* links, interactive, focus */
  --orange:#F97316;        /* action only — CTAs, the one loud colour */
  --ink:#1A1A2E;           /* body text */
  --lavender:#F4F4FB;      /* surfaces, alternating section bg */
  --green:#16A34A;         /* positive / visible / cited */
  --red:#E24B4A;           /* at-risk / invisible / hijacked */
  --amber:#F59E0B;         /* gaps / caution */
  --muted:#6B7280;         /* secondary text */
}
```

Type (Google Fonts): **Schibsted Grotesk** (display/headlines, 600–700) · **Inter** (body/UI, 400–600) · **Space Mono** (every metric, score, %, rank, label).

Non-negotiables: every number is mono (the signature). Orange is reserved for action only. Sections alternate white / lavender. Confirm hex against the live brand before launch.

---

## Global components (reused on every page)

- **Header** — sticky, blurred, logo (keep existing logo; the wireframe uses a text placeholder), nav, orange "Run a free audit" CTA.
- **Footer** — link columns, entity line (`Growth Pro Sdn. Bhd. · Penang, Malaysia`), policy-alignment note.
- **Proof bar** — `ChatGPT · Gemini · Perplexity · Google AI Overviews · Copilot` in mono + "All engines. All languages. All markets."
- **Metric card** — lavender bg, mono number, muted label. Green/red variants for positive/risk.
- **The loop** — Measure → Diagnose → Act → Prove (4-cell).
- **Screenshot block** — dashed placeholder; replace with real dashboard screenshots per the plan's §E index.
- **Indigo CTA band** — full-width conversion moment.
- **Provenance line** — "Built by Growth.pro — the consultancy behind the PAVA framework for AI visibility."

---

## §A2 guardrails — do not violate

- **Zicy keeps its own positioning** (truth layer + measure→diagnose→act→prove). Do **not** rebrand Zicy as "the AI Visibility Operating System" and do **not** use Growth.pro's "Earn the Answer." tagline.
- **Growth.pro's IP appears in three places only:** the provenance line, the About page, and the Done-for-you page — **always attributed to Growth.pro**, never as Zicy's own framework.
- **Policy-clean language everywhere** (per PK v3.6): no "engineering," no manipulation framing. Use "Enablement," "earn," brand-side language.

---

## Before screenshots go live (compile flags)

- **Do not ship** the AI-visibility-vs-brand-search correlation screenshot — it currently reads as a strong *negative* correlation on a tiny sample (n=4). Reframe / strengthen first.
- **Entity graph** is display-only; wire it into the action layer before using it as the Publishers proof.
- **Case studies stay anonymised** until naming permission is secured (Prudential / Taylor's / TVB).

---

## AI crawlability & AEO build spec (critical)

Zicy's whole pitch is that brands should be readable and citable by AI. **The site itself must score perfectly on that test** — it's both a hard requirement and a credibility signal. Run the finished site through Zicy's own Site Audit before launch and fix anything it flags.

### 1. Render server-side — this is non-negotiable
Most AI crawlers do not execute JavaScript. **All content must be present in the initial HTML.**
- Build with a static/SSR framework (Astro or Next SSG/SSR), **one real URL per page**.
- The wireframe's client-side show/hide is **prototype only** — do not ship it as a JS SPA. Each "page" in the wireframe becomes a real, server-rendered route.
- Navigation and CTAs must be real `<a href>` links so crawlers follow them. No JS-only `onclick` navigation for content.
- No content behind tabs, accordions that aren't in the DOM, logins, or interactions.

### 2. robots.txt — explicitly welcome AI crawlers
Deliberately allow AI assistant, answer, and training crawlers (this is a choice — Zicy *wants* to be in the index):
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bingbot
Allow: /
User-agent: Amazonbot
Allow: /
User-agent: CCBot
Allow: /
User-agent: Meta-ExternalAgent
Allow: /
User-agent: Bytespider
Allow: /

Sitemap: https://zicy.com/sitemap.xml
```

### 3. llms.txt — a map for the models (Zicy generates these; ship one)
Place at `https://zicy.com/llms.txt`:
```
# Zicy

> Zicy is the truth layer for AI visibility — it measures how every AI engine describes a brand, diagnoses what's wrong, helps fix it, and proves the work moved demand. All engines, all languages, all markets.

## Core
- [Platform](https://zicy.com/platform): The closed loop (measure, diagnose, act, prove) and the full module set.
- [Pricing](https://zicy.com/pricing): Self-serve from $25/mo, plus done-for-you.
- [Case studies](https://zicy.com/case-studies): Measured AI visibility results (anonymised).
- [About](https://zicy.com/about): Built by Growth.pro; APAC-native, globally capable.

## Solutions
- [For brands](https://zicy.com/solutions/brands)
- [For PR agencies](https://zicy.com/solutions/pr)
- [For marketing & creative agencies](https://zicy.com/solutions/agencies)
- [For publishers](https://zicy.com/solutions/publishers)

## Free tools
- [Free AI visibility audit](https://zicy.com/audit): Complimentary baseline across every AI engine.
- [AEO/GEO Consultant](https://zicy.com/aeo-geo-consultant): Free AI consultant — audit a page or ask any AEO/GEO question.
- [Chrome extension](https://zicy.com/chrome-extension): On-page AI-readiness audit, bot-access checker, and schema generator.

## Resources
- [Guides & research](https://zicy.com/resources)
```

### 4. sitemap.xml
Auto-generate, list every public URL, reference in robots.txt, keep lastmod current.

### 5. Structured data (JSON-LD) on every page
The wireframe head carries a starter graph (Organization + WebSite + SoftwareApplication). Per page type, add:
- **Sitewide (in layout):** `Organization` + `WebSite`.
- **Platform / Pricing:** `SoftwareApplication` with `offers`.
- **Pricing FAQ + ICP FAQs:** `FAQPage`.
- **Case studies:** `Article` (or `CreativeWork`) per case.
- **Resources posts:** `BlogPosting` / `Article` with author + datePublished.
- **Deep pages:** `BreadcrumbList`.

### 6. Semantic HTML + meta
- One `<h1>` per page, logical heading order, real `<header>/<nav>/<main>/<article>/<section>/<footer>`.
- Unique `<title>` + `meta description` per page — **all written in the copy deck**.
- `rel="canonical"`, Open Graph + Twitter tags, `<html lang>`. Add `hreflang` when multi-language ships.
- Descriptive `alt` text on every screenshot/image (the screenshots carry the data story — describe it).
- Fast TTFB, mobile-first, accessible (AA contrast — palette already clears it).

### 7. Don't index the noise
`noindex` the app/dashboard, auth, and any thin utility pages. Index every marketing/content page.

---

## Ready-to-paste Claude prompts

**Scaffold the project**
> "Here's a clickable HTML wireframe (`zicy-website-wireframe.html`), a build brief, and a copy deck. Scaffold an Astro static site that reproduces this design. Critical: render every page server-side as a real route with all content in the initial HTML — do not reproduce the wireframe's client-side show/hide. Extract the `<style>` into a shared theme using the CSS variables in the brief, split the global header and footer into components, and add the robots.txt, llms.txt, sitemap.xml and JSON-LD from the build brief's crawlability spec. Build the homepage first using the copy deck, matching the wireframe exactly."

**Build an ICP page from the template**
> "Using the For Brands page in the wireframe as the template, build the *For PR agencies* page. Keep the layout identical. Swap the hero to USP 'Reputation is now decided inside AI answers. Measure it. Move it. Prove it.', and replace the three hero modules with the PR hero modules from `zicy-module-to-icp-value-matrix.md`. Keep all brand tokens and the mono-numeral treatment."

**Build the case template**
> "Build a reusable case-study detail template matching the wireframe's case rows: challenge → approach → result, with mono stat cards and the methodology disclosure footer. Then generate all five case pages from the data in `zicy-new-website-plan.md`. Keep clients anonymised."

**Polish pass**
> "Review every page against the build brief: confirm orange is used only for actions, every metric is in JetBrains Mono, sections alternate white/lavender, and the §A2 guardrails hold (Growth.pro IP only on Done-for-you + About + the provenance line, always attributed, policy-clean language). Flag anything off."

---

## Launch acceptance checklist

- [ ] Existing logo dropped into header + footer; reversed version on indigo bands; favicon set
- [ ] All 6 templates built; ICP + case pages populated
- [ ] Every metric in mono; orange = action only; white/lavender alternation
- [ ] §A2 guardrails verified across all pages
- [ ] Real screenshots in (compile-flagged ones excluded)
- [ ] Cases anonymised pending permission
- [ ] Pricing tiers confirmed against live
- [ ] Mobile nav built (wireframe hides desktop nav under 860px — needs a real menu)
- [ ] Free-audit CTA wired to the actual audit flow
- [ ] Server-side rendered — content in initial HTML, real URL per page (not the SPA wireframe pattern)
- [ ] robots.txt allows AI crawlers; llms.txt + sitemap.xml live
- [ ] JSON-LD on every page (Organization, WebSite, SoftwareApplication, FAQPage, Article as relevant)
- [ ] Unique title + meta description per page (from the copy deck); canonical + OG tags
- [ ] Finished site passes Zicy's own Site Audit (eat the dog food)
- [ ] Analytics
