# Entity graph implementation notes — 2026-09

Running log for the owned entity-graph fixes across zicy.com's JSON-LD. One section per gate.
Each numbered item corresponds to the brief's numbering. `<VERIFY: ...>` placeholders are
collected at the end.

## Gate 1 (blocking) — commit `<see git log>`

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
   four askzicy profiles (LinkedIn company page, Facebook, Instagram, YouTube). No replacement
   added. The relationship to Growth.pro is still expressed structurally via
   `orgNode.parentOrganization` (`@id` growth.pro/#org), so removing the sameAs link does not drop
   that relationship from the graph, only the redundant/mis-scoped links (a parent's homepage and a
   person's personal profile are not the *organization's own* sameAs profiles).
3. **legalName.** Deleted `legalName` from `orgNode` rather than inserting a `<VERIFY>` placeholder.
   Reasoning, not a guess: `SITE.legalName` ('Growth Pro Sdn. Bhd.') is explicitly the *parent's*
   registered name (see `orgNode.parentOrganization.name` = 'Growth.pro' and the removed comment
   "confirmed by the owner... legalName and the registration number are the owner-supplied legal
   identity"). `/about` itself says "Growth Pro Sdn. Bhd. operates under Malaysia Digital (MD)
   status" — i.e. Growth Pro Sdn. Bhd. is the operating legal entity, and Zicy is its product/brand,
   not a separately incorporated company. The brief's own fallback for this item ("delete this
   property if Zicy has no separate registration") applies directly on this evidence. If Zicy is
   ever separately incorporated, add the real legalName to `orgNode` then. `SITE.legalName` itself
   (used elsewhere, e.g. footer/terms copy) was left untouched — out of scope, and still accurate
   for Growth Pro Sdn. Bhd. as an entity.
4. **Brand node.** Added `brandNode` (`@id` `https://www.zicy.com/#brand`, `@type: Brand`,
   `parentOrganization: { '@id': ORG_ID }`) to `lib/schema.ts`, rendered unconditionally in
   `Schema.astro` alongside `orgNode`. Added `brand: { '@id': BRAND_ID }` to both `orgNode` and the
   `SoftwareApplication` (`#app`) node in `Schema.astro`.
5. **Person nodes removed from the shared block.** `Schema.astro` no longer emits Ritu's or Peter's
   `Person` nodes on every page. Added `rituPersonNode`/`peterPersonNode` exports to `lib/schema.ts`
   (same shape/pattern as the existing `alvinPersonNode`) and:
   - Emitted both in full on `/about` (`src/pages/about.astro`), which is where their bios live —
     neither has a dedicated bio page the way Alvin does (`about.link` is `null` for both in the
     `team` array), so `/about` is their canonical resolution point, same role
     `/about/alvin-koay` plays for Alvin.
   - Emitted `rituPersonNode` in full on every resources article that names her as byline author.
     Peter is never a byline author anywhere in the codebase (`resources-posts.ts` /
     `authorName`), so no equivalent pass was needed for him. Found by grepping the built pages for
     the `about#ritu-khanna` `@id` string she's referenced by (`author: { '@id': author }`
     pattern): 23 files under `src/pages/resources/*.astro`. Each got one added import line
     (`import { rituPersonNode } from '../../lib/schema';`) and one added
     `<script type="application/ld+json" ...>` tag emitting the full node, alongside their existing
     `graph`/`faqPage` script tags — additive, no existing JSON-LD in those files was altered.
     Alvin's existing single-post byline (`cloudflare-bot-management.astro`) was left as-is per the
     established pattern (he already resolves via `/about/alvin-koay`, unchanged by this brief).

Build verified clean (`npm run build`, 84 pages) after each step; `npx astro check` was not run
(the `@astrojs/check`/`typescript` dependency isn't installed in this repo and installing a new
dependency wasn't part of this brief).

## Gate 2 (high) — in progress, one commit per item

(to be filled in as each numbered item lands)

## Gate 3 (medium) — pending

## Verification

(to be filled in once Gates 2–3 land)

## `<VERIFY: ...>` placeholders inserted

(running list — none yet from Gate 1: item 3's legalName was resolved by deletion with evidence,
not a placeholder, per the brief's own stated fallback)
