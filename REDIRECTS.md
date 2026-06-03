# URL redirects → zicy.com (new Astro site)

Server-side 301/302 redirects live in [`vercel.json`](./vercel.json) (`redirects` +
`trailingSlash:false`). They run at Vercel's edge before static files are served,
so they apply to the SSG build with no adapter. Canonical host is **www.zicy.com**
(set `www` as the primary domain in Vercel; apex `zicy.com` → `www`).

Two source families are merged in one file:
1. **zicy.com current → new** — the live WordPress/old-Zicy URLs being renamed.
2. **Growth.pro legacy SEO-agency URLs** — older agency paths consolidated onto Zicy.

## Conventions

- **`statusCode: 301/302`** for the classic SEO codes (301 permanent, 302 temporary).
  Not combined with `permanent`. (`permanent:true` would emit 308/307 — equivalent
  to Google, but we use explicit 301/302.)
- **`trailingSlash:false`** matches `astro.config` (`trailingSlash:'never'`). Slashed
  legacy URLs (`/x/`) 308-normalise to `/x` first, then match — ≤2 hops.
- First-match-wins; **specific rules before wildcards**; `source` is case-sensitive.

## Case-study slug rename (zicy.com → new)

All 15 case studies were renamed to cleaner, descriptive slugs. `data/cases.ts`
now holds the **new** slugs (pages build there); the **old** slugs 301 to them.
`public/llms.txt` and the sitemap were updated to the new slugs too.

| Old slug | New slug |
|---|---|
| `531-ai-citations-ecommerce` | `ecommerce-531-ai-citations` |
| `increased-ai-users-and-events` | `ecommerce-ai-referred-traffic` |
| `ai-optimised-content` | `ecommerce-ai-ready-content` |
| `increasing-ai-citations` | `architectural-services-ai-citations` |
| `aeo-case-study-brand-mentions-ai-cited-product-pages` | `ecommerce-product-pages-ai-visibility` |
| `aeo-case-study-brand-mentions-website-citation-coverage-in-ai-results` | `ecommerce-ai-mention-coverage` |
| `aeo-case-study-brand-mentions-ai-citations-share-of-voice` | `education-ai-share-of-voice` |
| `aeo-geo-case-study-ai-visibility-ecommerce-growth` | `ecommerce-ai-visibility-growth` |
| `aeo-case-study-aesthetic-clinic-ai-visibility` | `aesthetic-clinic-ai-visibility` |
| `aeo-geo-case-study-b2b` | `b2b-advisory-ai-visibility` |
| `aeo-geo-case-study-elevated-b2b-visibility` | `b2b-services-prompt-level-visibility` |
| `aeo-geo-case-study-education-brand` | `education-owned-earned-citations` |
| `aeo-case-study-b2b-brand-mentions-ai-sessions-growth` | `b2b-services-90-day-ai-visibility` |
| `aeo-geo-case-study-interior-decor` | `commercial-interiors-ai-visibility` |
| `aeo-geo-case-study-b2b-electronics` | `b2b-electronics-ai-visibility` |

**No broad `/case-studies/:path*` catch-all.** It would shadow the new detail
pages (Vercel redirects run before the filesystem), 301-ing every live case study
to the index. Only `/case-studies/page/:n*` → `/case-studies` (pagination) is kept.

## Other zicy.com → new

| Old | New | Code | Note |
|---|---|---|---|
| `/aeo-geo-consultant` | `/consultant` | 301 | page **removed**; `/consultant` is the canonical consultant page (sitemap + llms.txt + free-tools repointed) |
| `/agency` | `/solutions/agencies` | 301 | |
| `/join-list`, `/book-a-demo` | `/pricing` | 301 | commercial intent |
| `/terms-and-conditions` | `/legal/terms` | 301 | |
| `/privacy-policy` | `/legal/privacy` | 301 | live legal page |

## Growth.pro legacy SEO-agency URLs

| Old | New | Code | Note |
|---|---|---|---|
| `/about-us`, `/media`, `/jobs`, `/website-design-client-portfolio`, `/website-assets-portfolio` | `/about` | 301 | firm/portfolio pages retired |
| `/contact-us` | `/contact` | 301 | `/contact` page created in this repo |
| `/seo-audit` | `/audit` | 301 | |
| `/seo-pricing`, `/seo-pricing-malaysia`, `/professional-aeo-geo-content-writing-services`, `/professional-seo-content-writing-services`, `/web-design-development-pricing`, `/white-label-seo-services` | `/pricing` | 301 | commercial intent |
| `/seo-malaysia` | `/` | 301 | MY-market landing = homepage |
| `/zicy` | `/consultant` | 301 | methodology/consultant hub |
| `/seo-case-study`, `/seo-case-study/:path*` | `/case-studies` | 301 | ~150 old agency case-study URLs → index |
| `/feed`, `/comments/feed` | `/` | 301 | legacy WordPress RSS |
| `/about-for-llms` | `/about` | **302** | interim — recreate AEO asset, then drop redirect |

WordPress system URLs (`/wp-admin/*`, `/wp-login.php`, `/xmlrpc.php`,
`/wp-content/uploads/*`) are intentionally **not** redirected — let them 404/410.

## Blog (interim) + staged activation

Blog has no section on the new site yet, so:

```
/blog          → /resources   (302)
/blog/:path*   → /resources   (302)
```

When a blog/resources article section ships, activate
[`REDIRECTS.blog-staged.json`](./REDIRECTS.blog-staged.json): it carries the two
known typo-slug 1:1 fixes plus a catch-all to the blog index. **Find-replace the
destination prefix** to match the real section (e.g. `/blog` → `/resources` or
`/insights`), then replace the two interim `/blog` rules above with that block,
keeping the specific rules **before** the wildcard. Flip them to 301 at that point.

If instead an `/insights` section ships, the on-brand AEO posts from the original
Growth.pro map should 301 1:1 (incl. the typo fix
`seo-strategis-for-ai-driven-search` → `seo-strategies-for-ai-driven-search`).
