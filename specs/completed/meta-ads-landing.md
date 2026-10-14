# Meta ads proof block on /ai-brand-audit

## Problem

Meta video ads need a landing destination that shows proof next to the audit form, without a separate page to maintain.

## Goal

Meta video ads land on /ai-brand-audit (with utm params). A short proof block sits directly under the audit form.

## Existing behaviour

/ai-brand-audit renders the free audit form (`FreeDiagnostic.astro`) followed by progress, results and info sections. There is no proof content near the form.

## Required behaviour

Under the form card, show a compact list using the existing `.checklist` styling:

- The 52% aesthetic clinic result and its measurement note, with a "Read the case study" link to /case-studies/aesthetic-clinic-ai-visibility.
- The BrightLocal 45% stat with its source inline.

Both are verbatim from `src/pages/index.astro`.

## Architecture

`FreeDiagnostic.astro` gains a named slot `after-form`, rendered right after the form. `src/pages/ai-brand-audit.astro` fills it. Pages that do not fill the slot render identically to before.

## Affected systems

`src/components/FreeDiagnostic.astro`, `src/pages/ai-brand-audit.astro`.

## Constraints

House style (no em dashes, straight apostrophes). Headline, subhead, nav, footer, trial card and JSON-LD stay as on main. Client stays anonymised.

## Edge cases

Other pages using `FreeDiagnostic` must be unchanged. Out of scope: a separate menu-free landing page (kept on local branch `backup/meta-landing-standalone`).

## Acceptance criteria

- Proof block appears under the form at 375px and 1280px.
- All other pages build byte-identical to main.

## Verification

`npm run build`, diff against a main build, house-style grep, `npx astro check` at or below 85 errors, screenshots at 375px and 1280px.
