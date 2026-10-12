# Mobile friendly fixes

Branch: `fix/mobile-friendly`. Source: mobile and laptop audit.

## Problem

An audit found eight mobile and laptop issues: the mobile menu cannot reach /resources, the desktop nav hides too early, GTranslate covers the cookie banner's Reject button, the banner covers the open mobile menu, the menu ignores Escape and outside taps, tap targets are small, legal tables overflow at 768, and the cookie banner is too tall on phones.

## Goal

Fix exactly these eight items, surgically, in the existing CSS style.

## Existing behaviour

See the Required behaviour list: each item names what was wrong.

## Required behaviour

1. Mobile menu: add `Resources hub` (`/resources`) as the first item under the Resources group in `src/components/Header.astro`.
2. Hamburger breakpoint: remove Home from the desktop nav row only (kept in the mobile panel); both media queries in `src/styles/theme.css` were 1080px; round 2 moves both to 899px (see Round 2 A).
3. GTranslate: `CookieConsent.astro` toggles `cc-open` on `<html>` while the banner is visible; `html.cc-open #gt_float_wrapper` is hidden. It reappears after accept or reject.
4. Cookie banner over open menu: `header:has(.mnav[open])` gets z-index 210 (banner is 200).
5. Menu close: inline script in `Header.astro` closes `.mnav` on Escape (focus back to summary) and on a click outside it. Menu still works without JS.
6. Tap targets: footer social icons 44x44; footer Cookie settings button and breadcrumb links about 40px tall via padding and negative margin.
7. Legal tables: between 761px and 1024px `table.ctable` uses `table-layout:fixed` with `overflow-wrap:anywhere`, so it fits its column without page overflow (base desktop rule unchanged).
8. Cookie banner at max-width 600px: tighter padding, gaps and font size; drops the global section padding; buttons stay at least 40px tall; about 145px tall.

## Architecture

Static Astro site. Changes are confined to `Header.astro`, `CookieConsent.astro` and `src/styles/theme.css`.

## Affected systems

Header, footer, breadcrumbs (`.crumbs`, rule added in theme.css), legal pages, cookie banner, GTranslate float widget.

## Constraints

No commits or pushes from the fix pass. No em dashes. Do not touch Ask Zicy widget behaviour.

## Edge cases

- No JS: the `<details>` menu still opens and all links are in the HTML.
- Active-state links (`/pricing`, `/resources`) must not make the desktop nav wrap.
- 360x640 with banner up: the last menu item (Try for free) must be reachable and tappable.

## Acceptance criteria

1. At 390x844 and 360x640 the menu contains `Resources hub` linking to `/resources`, and every item is tappable with the banner showing.
2. The desktop nav is on one line with at least 24px before the first link at 900px and up; the hamburger shows at 899px.
3. `#gt_float_wrapper` is hidden while the banner is shown and visible again after Reject and after Accept; Reject is not covered.
4. With the menu open and the banner showing, `elementFromPoint` on each menu item returns that item.
5. Escape closes the menu and focuses the summary; a tap outside closes it; a tap inside keeps it open.
6. Social icons measure 44x44; Cookie settings and breadcrumb links measure 40px or more in height.
7. No horizontal page overflow at 768 on `/legal/cookies` and `/legal/privacy-bm`.
8. Banner is 180px or less tall at 360x740, with Reject and Accept at least 40px tall.
9. No horizontal overflow on `/`, `/pricing`, `/legal/cookies`, `/legal/privacy-bm`, `/resources` at 360, 390, 768, 1014, 1034 and 1280 wide.

## Verification

`npm run build` passes; `npx astro check` stays at 85 errors (main baseline); Playwright checks at the viewports above against `astro preview`; before/after screenshots saved to the session scratchpad `mobile-fix/` folder.

## Round 2

A. Laptop scaling: the desktop nav shows from 900px (a 1366px laptop at 150% is about 911px). A compact band at 900-1180px uses a 56px logo, 14px nav font, 14px gaps, a smaller Try for free button, and right-anchors the Resources dropdown. This fits at 900 with a 72px logo gap, so About stays in the desktop row. Both hamburger media queries are 899px.
B1. `/legal/cookies` and other legal `.ctable` tables fit their 700px column at desktop widths; the /done-for-you table is unchanged.
B2. About 40px tap height via padding plus negative margin: `.card .link` (/free-tools, /legal), `.ct-cta` (/done-for-you), `.team-link` and the press link (/about), `.featured-link` (/media), the /ai-brand-audit optional-fields summary, the pricing billing toggle label. Ask Zicy close button is 40x40. Inline prose links are not changed.
B3. Mobile menu adds Glossary (`/resources/glossary`) and Contact (`/contact`, a real route) after Resources hub.
B4. Footer bottom row, footer contact address, breadcrumbs, `.screenshot` and `.post-figure` figcaptions are 14px.
B5. With `(hover: none)` the first tap on the Solutions or Resources trigger opens its dropdown; a second tap on Resources navigates. Mouse behaviour is unchanged.
C. The real cdn.gtranslate.net widget is hidden while the banner is up and visible after Accept and Reject at 390x844.

Acceptance: no horizontal overflow on /, /pricing, /legal/cookies, /legal/privacy-bm, /done-for-you, /resources, /ai-brand-audit and /about at 360, 390, 768, 899, 900, 1024 and 1280; nav on one line with at least 24px gap at 900, 911, 960, 1024 and 1280 including with dropdowns open; round 1 checks still pass.
