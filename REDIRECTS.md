# Legacy URL redirects (Growth.pro SEO site → zicy.com)

Server-side 301/302 redirects from the old WordPress SEO-agency URLs to the live
Zicy site live in [`vercel.json`](./vercel.json) (`redirects` + `trailingSlash:false`).
They run at Vercel's edge before static files are served, so they apply to the
SSG build with no adapter.

## Why `statusCode` + `trailingSlash:false`

- **`statusCode: 301/302`** gives the classic SEO codes. (`permanent:true/false`
  would emit 308/307 — Google treats those equivalently, but 301/302 match the
  migration brief's language and are unambiguous.)
- **`trailingSlash:false`** matches the site's `trailingSlash:'never'` (astro.config).
  Old WP URLs were mostly slashed (`/about-us/`); Vercel 308-normalises any `/x/`
  → `/x` first, then the rule below matches. Slashed legacy URLs therefore resolve
  in at most two hops — fine for SEO consolidation.
- **`/seo-case-study/:path*`** + bare `/seo-case-study` collapse the ~150 individual
  case-study posts, category archives and `/page/N` pagination into one target.
  `/blog/:path*` + `/blog` do the same for every blog post.

## Map → live-route reconciliation

The supplied redirect map targeted an aspirational AEO-consultant IA. Targets that
don't exist on the built Zicy product site were remapped to the nearest live route
(decisions confirmed by the owner):

| Map target | Live route used | Code | Note |
|---|---|---|---|
| `/about` | `/about` | 301 | exact |
| `/contact` | `/contact` | 301 | **new page created** (`src/pages/contact.astro`) |
| `/audit` | `/audit` | 301 | exact |
| `/case-studies` | `/case-studies` | 301 | exact |
| `/engagements` (pricing/services) | `/pricing` | 301 | no `/engagements`; closest commercial intent |
| `/approach`, `/zicy` | `/consultant` | 301 | no `/approach`; methodology/consultant hub |
| `/` (seo-malaysia) | `/` | 301 | homepage = MY-market landing |
| `/privacy-policy` | `/legal/privacy` | 301 | live legal page (map's interim `/` superseded) |
| `/about-for-llms` | `/about` | **302** | interim — recreate AEO asset, then drop redirect |
| `/blog`, `/blog/*`, `/insights` | `/resources` | **302** | interim — `/insights` not built yet |
| `/media`, `/jobs`, `/website-design-client-portfolio`, `/website-assets-portfolio` | `/about` | 301 | retired firm/portfolio pages |
| `/feed`, `/comments/feed` | `/` | 301 | legacy WordPress RSS |

WordPress system URLs (`/wp-admin/*`, `/wp-login.php`, `/xmlrpc.php`,
`/wp-content/uploads/*`) are intentionally **not** redirected — let them 404/410.

## TODO when `/insights` ships

The blog posts are 302 → `/resources` for now. When the `/insights` section is
built, **insert these 1:1 301s _above_ the `/blog/:path*` wildcard** (first match
wins) and flip the wildcard from 302→301. These are the on-brand AEO posts the map
flagged high-priority for 1:1 migration (note the one slug typo fix):

```
/blog/google-ai-grounding-budget                 → /insights/google-ai-grounding-budget
/blog/ai-ready-marketing-steps                    → /insights/ai-ready-marketing-steps
/blog/tracking-seo-success-in-ai-era              → /insights/tracking-seo-success-in-ai-era
/blog/seo-strategis-for-ai-driven-search          → /insights/seo-strategies-for-ai-driven-search   (typo fixed)
/blog/query-fan-out-explained                     → /insights/query-fan-out-explained
/blog/google-gemini-ai-brain-behind-future-of-search → /insights/google-gemini-ai-brain-behind-future-of-search
/blog/why-google-ai-mode-changes-everything       → /insights/why-google-ai-mode-changes-everything
/blog/entities-and-seo                            → /insights/entities-and-seo
/blog/google-eat-ymyl-seo-content                 → /insights/google-eat-ymyl-seo-content
```

Also recreate `/about-for-llms` as a real asset, then remove its interim 302.
