# Entity graph implementation notes — 2026-09

Running log for the owned entity-graph fixes across zicy.com's JSON-LD. One section per gate.
Each numbered item corresponds to the brief's numbering. No visible copy was changed anywhere in
this work — every edit is inside `<script type="application/ld+json">` blocks or the `.ts`/`.astro`
frontmatter that builds them.

## Gate 1 (blocking) — commit `ceb54e5`

1. **Organization on all 82 pages.** `src/components/Schema.astro` previously spliced `orgNode`
   into the shared `@graph` only on the homepage (`isHome` gate), with the stated rationale that
   repeating it everywhere would be "entity fragmentation." That rationale was wrong: fragmentation
   is *conflicting* descriptions of the same `@id`; byte-identical repetition of the same node is
   the documented, correct pattern for a sitewide entity, and it's what let `/legal/privacy`,
   `/legal/privacy-bm` and `/legal/cookies` ship with **zero** JSON-LD at all (none of the three
   import anything from `lib/schema.ts`, they rely entirely on `BaseLayout` → `Schema.astro`).
   Removed the `isHome` gate; `orgNode` (and the new `brandNode`, below) now render unconditionally
   in `Schema.astro`, i.e. on all 82 routes.
2. **sameAs trimmed.** Removed `https://www.growth.pro/`, `https://www.linkedin.com/in/alvinkoay/`
   and `https://www.growth.pro/#alvin-koay` from `ORG_SAME_AS` in `src/lib/schema.ts`. Kept the
   four askzicy profiles. No replacement added. The relationship to Growth.pro is still expressed
   structurally via `orgNode.parentOrganization`.
3. **legalName.** Deleted `legalName` from `orgNode` rather than inserting a `<VERIFY>` placeholder.
   `SITE.legalName` ('Growth Pro Sdn. Bhd.') is explicitly the *parent's* registered name (see
   `orgNode.parentOrganization.name` = 'Growth.pro', and the removed comment "confirmed by the
   owner... legalName and the registration number are the owner-supplied legal identity").
   `/about` itself says "Growth Pro Sdn. Bhd. operates under Malaysia Digital (MD) status" — i.e.
   Growth Pro Sdn. Bhd. is the operating legal entity, and Zicy is its product/brand, not a
   separately incorporated company. The brief's own fallback for this item ("delete this property
   if Zicy has no separate registration") applies directly on this evidence.
4. **Brand node.** Added `brandNode` (`#brand`, `@type: Brand`, `parentOrganization: {'@id': ORG_ID}`)
   rendered unconditionally alongside `orgNode`. Added `brand: {'@id': BRAND_ID}` to both `orgNode`
   and `#app`.
5. **Person nodes removed from the shared block.** Added `rituPersonNode`/`peterPersonNode` to
   `lib/schema.ts` (same pattern as the existing `alvinPersonNode`). Emitted in full on `/about`
   (neither has a dedicated bio page). `rituPersonNode` is also emitted in full on the 23 resources
   articles that byline her as author (found by grepping for the `about#ritu-khanna` `@id` string
   they already referenced). Peter never authors an article, so no equivalent pass was needed for
   him. Alvin's existing pattern (`/about/alvin-koay` only) is untouched.

## Gate 2 (high)

6. **`/case-studies` CollectionPage** (`c9532c6`). `#collection`, `isPartOf #site`, `about`/
   `publisher #org`, `mainEntity` an `ItemList` naming all 17 case studies' `#article` ids **in the
   grid's actual render order** (`displayCases`: `LEAD_SLUGS` first, then `FEATURED_SME_SLUG`
   pulled forward, matching the page's own display logic — not `CASES`'s raw array order).
7. **17 case study Articles** (`c9532c6`). Each got `@id` `{pageUrl}#article`, `isPartOf` back to
   `#collection`. `datePublished` was already present from `cases.ts` frontmatter, no placeholder
   needed. Added `about` (a `/solutions/{icp}#service`) and `mentions` (a glossary `#term`) per
   study — mapping extracted into `src/data/case-entity-map.ts` (`CASE_ENTITY_MAP` +
   `caseSlugsForIcp()`), picked by reading each study's body copy, not guessed from the slug:

   | slug | icp | term | why |
   |---|---|---|---|
   | ecommerce-531-ai-citations | brands | citation-coverage | headline metric is a raw citation count per engine |
   | ecommerce-ai-referred-traffic | brands | ai-visibility | about AI-referral traffic/conversion; none of the 12 terms names this directly, ai-visibility is the closest umbrella — **weak fit, flagged** |
   | ecommerce-ai-ready-content | brands | aeo | strategy section is "entity-level authority signals... structured metadata and NLP-driven entity optimisation," near-verbatim AEO |
   | architectural-services-ai-citations | smb | citation-coverage | small practice going from zero to 99 citations; "starting from zero" framing matches smb positioning — no `smeLabel` on this one, inferred from body, not a tag |
   | ecommerce-product-pages-ai-visibility | brands | ai-mention-coverage | H1 leads with "74.6% Brand Mention Coverage" |
   | ecommerce-ai-mention-coverage | brands | ai-mention-coverage | slug/h1 literally about mention coverage |
   | education-ai-share-of-voice | brands | ai-share-of-voice | slug/metrics centre on AI Share of Voice |
   | ecommerce-ai-visibility-growth | brands | average-ai-ranking | case's own point is "higher ranking consistency than brands with larger citation counts" |
   | aesthetic-clinic-ai-visibility | smb | ai-mention-coverage | has `smeLabel: "Local services"`; the exact case quoted verbatim on smb.astro's proof block |
   | b2b-advisory-ai-visibility | brands | ai-mention-coverage | the exact case (90.61%, "professional services") quoted verbatim on brands.astro's proof block |
   | b2b-services-prompt-level-visibility | brands | answer-intent-query | strategy is "query-specific content alignment... high-intent 'best provider' searches" |
   | education-owned-earned-citations | pr | citation-coverage | "owned/earned/competitor citations" framework is a near-verbatim match to the PR page's Citation Analysis module description |
   | b2b-services-90-day-ai-visibility | smb | prompt-tracking | has `smeLabel: "Small team, no prior AI strategy"`; strategy is "prompt-level gap analysis... tracked multi-platform consistency" |
   | commercial-interiors-ai-visibility | brands | entity-gap | "Blind Spots: uncovered areas for structured expansion" is functionally the entity-gap definition |
   | b2b-electronics-ai-visibility | brands | average-ai-ranking | weak average ranking (#4.01) drives the whole strategy |
   | b2b-logistics-ai-procurement-filter | brands | ai-mention-coverage | explicit per-engine mention-coverage table |
   | aesthetic-clinic-ai-referred-purchases | brands | ai-share-of-voice | "16.44% share of voice... nearly three times the nearest rival" |

   No case study is a natural fit for the **agencies** or **publishers** ICP — none of the 17
   clients is itself an agency reselling white-label reporting or a publisher whose attribution is
   at stake. Left unmapped rather than forced.
8. **Reciprocal `subjectOf`** (`f7e8c41`). `brands` (13), `smb` (3) and `pr` (1) Service nodes list
   the case studies whose `Article.about` points at them, computed via `caseSlugsForIcp()` so the
   two sides of the edge share one source and can't drift. `agencies`/`publishers` have none.
9. **Service nodes for brands/pr/publishers** (`fd24d49`). Extended `serviceSchema()` with
   `isRelatedTo` (`#app`) and an `audience` (`BusinessAudience`, the same `audienceType` string
   already passed to that page's `<SegmentSchema>`) — the brief describes this as "the exact shape
   used on /solutions/smb," but smb's *existing* node actually had neither field before this;
   backfilled both onto smb's and agencies' existing nodes too so all five are now consistent.
   `name`/`description`/`serviceType` on the three new nodes are lifted verbatim from each page's
   own H1/lead/module copy. `SegmentSchema`'s `WebPage` node gets a new optional `serviceId` prop
   wired to `mainEntity`, used on all five pages.
10. **Pricing Offers** (`ead637b`). Four real `Offer` nodes at `/pricing#offer-{starter,growth,
    scale,enterprise}`, each with `itemOffered #app` / `offeredBy #org`. `#app.offers` now
    references these four `@id`s. Deleted the anonymous `Product` node and its `AGENCY_TIERS`
    offers (never asked to preserve a schema representation for the agency tiers; that data still
    exists as visible copy in `AgencyBlock`, just not duplicated into structured data). Prices
    unchanged (79/199/449/contact-sales).
11. **Growth.pro doctrine DefinedTermSet** (`6c1331c`). `/about#doctrine` lists the three framework
    `#term` ids. Each framework page's `DefinedTerm.inDefinedTermSet` now references it instead of
    an inline, anonymous, three-times-duplicated "Growth.pro AI Visibility Frameworks" set. Each
    page's `TechArticle.author` now references `GROWTH_PRO_ORG_ID` (newly exported from
    `lib/schema.ts`) instead of an inline anonymous Organization literal.
12. **Glossary set unified to 13 members** (`7062342`). `entity-collapse`'s term is repointed from
    its own orphaned single-member private `#set` (deleted) to the main `#glossary`. AI Reality
    Score's actual glossary membership moves to a **new** `DefinedTerm` on its glossary stub page
    (`resources/glossary/ai-reality-score.astro`, previously had none); the canonical
    `/platform/ai-reality-score#term` now records the relationship via `sameAs` instead of also
    claiming set membership through its own inline anonymous set (deleted). 11 `GLOSSARY_TERMS` +
    `entity-collapse` + `ai-reality-score` = 13.
13. **`/media` item ids and about edges** (`8e66a96`). Each of the 7 items got a `slug` field (a
    new field, distinct from the shared per-publication logo slug — two `e27` items would have
    collided on that one) and an `@id` (`/media#item-{slug}`). `about` is `#org` for the five
    `scope: 'zicy'` items, `growth.pro/#org` for the two `scope: 'founder'` BFM podcast episodes.
    Of those two, "The Growthpro Strategy to Combat Traditional SEOs" is explicitly about
    Growth.pro's agency business — clear. **"Is SEO Dead? The AI Search Shake-Up" never names
    either Zicy or Growth.pro in its own headline/summary** — it's general market commentary with
    Alvin as spokesperson. Defaulted to `growth.pro/#org` for consistency with the other BFM/
    founder-scope item, but this is a genuine judgement call, not a clean read from the copy.
    Also dropped the full inline `orgNode` duplicate on the page's `CollectionPage.about` (now
    redundant since Gate 1 renders `#org` in full on this same page) in favour of an `@id`.

## Gate 3 (medium)

14. **Chrome extension SoftwareApplication identified** (`1dabf8b`). `@id`
    `/chrome-extension#extension`, `isPartOf #app`.
15. **Duplicate `/platform` WebPage removed** (`fdb015a`). The bare, anonymous-`@id`-less
    `platformPage` node (about `#app`) is gone; its `speakable` hint moved onto the one proper
    `webPageSchema()` node (about `#org`, `@id` with `#webpage`).
16. **`/done-for-you` Service** (`cfc78aa`). `provider` now references `https://www.zicy.com/#org`
    by `@id`, per the brief, instead of an inline anonymous Growth.pro Organization literal (the
    visible copy still correctly attributes the managed programme to Growth.pro; only the
    structured-data `provider` edge changed, as instructed). Service also got its own `@id`.
17. **12 `/platform` feature ids** (`fdb015a`, same commit as #15). Each `ListItem` in the module
    `ItemList` now carries `@id` `/platform#feature-{slug}` (slugified from the module's own name).
18. **Two orphaned resources pages folded into `#blog`** (`6a75e38`). Both live under
    subdirectories the drift guard's single-level `import.meta.glob` doesn't reach, so their
    `#article` ids were added to `blogPost` by hand (not via `RESOURCE_POSTS`, so the drift guard
    is untouched) with `isPartOf` added on both Articles. The guide's `HowTo` got `publisher` and
    `isPartOf` pointing at its own Article.
19. **inLanguage normalised** (`4939efc`). `webPageSchema()` now defaults `inLanguage` to `'en'`
    (picked up automatically by the 9 pages that already call it). `/legal/privacy-bm` — previously
    zero JSON-LD, zero `inLanguage` — gets a `WebPage` node with `inLanguage: 'ms-MY'`. The three
    pages that said `'en-GB'` (`entity-collapse`, the research study, the guide) are now `'en'`.
    **Scope note:** many page-specific node types built outside `webPageSchema()` (Article, Service,
    Blog, CollectionPage, etc. on case studies, solutions pages, /media, /done-for-you, and more)
    still omit `inLanguage` entirely across the site. The brief's own anchor for this item was
    specifically "the research study and the guide currently say en-GB," so a full sweep adding
    `inLanguage` to every custom node on all 82 pages was treated as out of scope for this pass,
    not attempted, and is flagged here as a possible follow-up rather than silently done or
    silently skipped.
20. **`/consultant` Service, `/free-tools` CollectionPage** (`dc39f7f`). Consultant's Service:
    name/description lifted from the tool's own H1/subtitle (`Consultant.astro`), serviceType "AI
    consultant" (verbatim, this tool's own eyebrow in two places). No audience segment: it's an
    open public tool, not one ICP's offering — made `serviceSchema()`'s `audienceType` parameter
    optional to support that (before this it was required, introduced in item 9). `/free-tools`
    CollectionPage names both tools by their own entity nodes (the new consultant Service, the
    Chrome extension SoftwareApplication from item 14) rather than re-describing them.

## Verification

Ran `node scripts/verify-entity-graph.mjs` (kept in the repo) against the production build
(`npm run build`, static HTML — this *is* the JS-disabled view, since the site is SSG) for the 12
required URLs. Full per-page node dump is in the script's own output; summary of the required
assertions:

| Assertion | Result |
|---|---|
| `#org` present on all 12 URLs | **PASS** |
| `#org.sameAs` length 4, no growth.pro/alvinkoay entry | **PASS** |
| Every case study Article has an `@id` and an `isPartOf` | **PASS** (spot-checked `education-ai-share-of-voice`; all 17 built identically via the shared `[slug].astro` template) |
| Every solutions page has a `#service` | **PASS** (brands, pr, agencies, publishers, smb all confirmed) |
| Glossary set has 13 members | **PASS** |
| No anonymous Offer anywhere | **FAIL** — see below |

### Failing assertion: anonymous Offer on `/chrome-extension`

`src/pages/chrome-extension.astro`'s `softwareApp.offers` is still
`{ '@type': 'Offer', price: '0', priceCurrency: 'USD' }` — no `@id`. This was not inside the scope
of any of the 20 numbered items (item 14 only asked to fix the `SoftwareApplication` node itself,
which is done), so per the instruction to report a failing assertion rather than edit to force a
pass, it was left as found rather than patched silently. Flagging it here for a decision: give it
an `@id` (e.g. `/chrome-extension#offer-free`) in a follow-up, or leave it — it is a real, if minor,
gap against the "no anonymous Offer anywhere" bar.

## `<VERIFY: ...>` placeholders inserted

**None.** Every item that named a specific fact requiring verification was resolved from existing
repo evidence instead of guessed:
- Item 3 (legalName): resolved by deletion, with the reasoning above, using the brief's own stated
  fallback ("delete this property if Zicy has no separate registration").
- Item 7 (datePublished): already present in `cases.ts` frontmatter for all 17 case studies, no
  placeholder needed.

No other item required a fact (identifier, price, date, legal name) that couldn't be read from the
repo or derived structurally from existing `@id`s.
