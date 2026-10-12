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
2. Hamburger breakpoint: remove Home from the desktop nav row only (kept in the mobile panel); both media queries in `src/styles/theme.css` move from 1080px to 1024px (desktop nav fits down to about 1005px with at least 24px between logo and first link; was about 1043px with Home).
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
2. At 1034px the desktop nav is on one line with at least 24px before the first link and no overflow; at 1014px the hamburger shows.
3. `#gt_float_wrapper` is hidden while the banner is shown and visible again after Reject and after Accept; Reject is not covered.
4. With the menu open and the banner showing, `elementFromPoint` on each menu item returns that item.
5. Escape closes the menu and focuses the summary; a tap outside closes it; a tap inside keeps it open.
6. Social icons measure 44x44; Cookie settings and breadcrumb links measure 40px or more in height.
7. No horizontal page overflow at 768 on `/legal/cookies` and `/legal/privacy-bm`.
8. Banner is 180px or less tall at 360x740, with Reject and Accept at least 40px tall.
9. No horizontal overflow on `/`, `/pricing`, `/legal/cookies`, `/legal/privacy-bm`, `/resources` at 360, 390, 768, 1014, 1034 and 1280 wide.

## Verification

`npm run build` passes; `npx astro check` stays at 85 errors (main baseline); Playwright checks at the viewports above against `astro preview`; before/after screenshots saved to the session scratchpad `mobile-fix/` folder.
