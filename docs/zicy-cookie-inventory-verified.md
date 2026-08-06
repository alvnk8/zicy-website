# Zicy cookie inventory, verified live — v2

**This file supersedes v1.** v1 covered www.zicy.com only and stated the table stood at three rows. That was correct for the evidence available at the time and is now incomplete. A second inspection pass covered app.zicy.com signed in, which changed two conclusions. The corrections are marked below.

**Method, two passes, both on 6 August 2026:**

1. **www.zicy.com** — five pages loaded (home, pricing, platform, contact, case studies), first with consent denied, then with consent accepted through the real UI, recording storage and network each time.
2. **app.zicy.com** — loaded signed in at `/profiles`, read-only. Storage keys, cookie names, live tag registry and all outbound request hosts recorded.

**Scope: both hosts.** Google and Stripe set cookies at the registrable domain `.zicy.com`, so they are present on both. One policy covers both.

---

## Correction 1: `_ga_KV5E88LTXN` is live, not residue

v1 listed it as an orphan. It is not. `G-KV5E88LTXN` is registered in the live tag runtime on **app.zicy.com** — observed directly in `window.google_tag_manager`. Zicy runs **two GA4 properties**:

- `G-YEW4D13JKT` — the marketing site, loaded via GTM container `GTM-5WRRKR2J`
- `G-KV5E88LTXN` — the app, loaded directly, no GTM container

Because both write to `.zicy.com`, both cookies appear on both hosts. That is why it looked orphaned from the marketing site alone.

## Correction 2: four more storage items exist, all on the app

Not visible from the marketing site. All observed on app.zicy.com: `currentToken`, `firebase:authUser`, `__stripe_mid`, `__stripe_sid`.

## Unchanged from v1: `_ga_DEMO123` is a genuine orphan

Registered in neither runtime. Residue from an old configuration, with a two-year cookie life. Keep it off the published table, since the table describes what Zicy sets now.

---

## Confirmed configuration

**www.zicy.com**

- Google Tag Manager container `GTM-5WRRKR2J` on every page; GA4 `G-YEW4D13JKT` loaded through it.
- **Google Consent Mode v2 works correctly.** Consent denied gives `gcs=G100` and `npa=1`; after accepting, `gcs=G111`, `gcu=1`, `npa=0`. No analytics cookie is written before consent.
- **Vercel Web Analytics** at the obfuscated first-party path `/d5bd96ff2b48adc8/script.js`. Script read directly: no cookie, `localStorage` or `sessionStorage` writes. Cookieless confirmed by reading the code.
- **No server-set cookies are possible.** Static output, no adapter, no request-time server, zero `Astro.cookies` matches.
- Fonts self-hosted. No Google Fonts request.
- **No advertising request of any kind** fired across five pages with consent granted. No `licdn.com`, no Doubleclick, no Meta.

**app.zicy.com** — every outbound host observed:

`api.zicy.com`, `firebase.googleapis.com`, `identitytoolkit.googleapis.com`, `securetoken.googleapis.com`, `js.stripe.com`, `o4510272266764288.ingest.us.sentry.io`, `fonts.googleapis.com`, `fonts.gstatic.com`, `www.google-analytics.com`, `www.googletagmanager.com`

Which confirms: **Firebase Authentication** for sign-in, **Stripe** for payments, **Sentry** for error monitoring on a **US** ingest endpoint, and GA4.

---

## The table, ready to publish

**Provenance is marked per row.** *Observed* means I saw it in the live product. *Vendor-published* means the name and presence were observed but the lifetime comes from the provider's own documentation, because cookie expiry is not readable from JavaScript. Both are acceptable to publish. Nothing here is inferred or assumed.

| Name | Provider | Category | Purpose | Lifetime | Provenance |
| :---- | :---- | :---- | :---- | :---- | :---- |
| `zicy-consent` | Zicy, first party, localStorage | Strictly necessary | Stores your cookie choice so the banner does not ask again | Until you clear site data; browser storage has no expiry | Observed |
| `currentToken` | Zicy, first party | Strictly necessary | Keeps you signed in to the Zicy app | Until you sign out or the session expires | Observed, described not measured |
| `firebase:authUser` | Google Firebase, first party, localStorage | Strictly necessary | Holds your sign-in session for the Zicy app | Until you sign out | Observed, described not measured |
| `__stripe_mid` | Stripe | Strictly necessary | Fraud prevention on payment pages | 1 year | Observed; lifetime vendor-published |
| `__stripe_sid` | Stripe | Strictly necessary | Fraud prevention within a session | 30 minutes | Observed; lifetime vendor-published |
| `_ga` | Google Analytics, first party | Analytics | Distinguishes one visitor from another | 2 years | Observed; lifetime vendor-published |
| `_ga_YEW4D13JKT` and `_ga_KV5E88LTXN` | Google Analytics, first party | Analytics | Session state for the Zicy website and the Zicy app respectively | 2 years | Observed; lifetime vendor-published |

Line beneath the table: "The analytics cookies are set only after you accept analytics cookies. If you decline, Zicy's site measurement runs without cookies."

## Third parties for section 5

- **Google** — Tag Manager, Analytics 4, Firebase Authentication. https://policies.google.com/privacy
- **Stripe** — payments and payment fraud prevention. https://stripe.com/privacy
- **Vercel** — cookieless site analytics. https://vercel.com/legal/privacy-policy

No marketing or advertising provider. `[FACT-C03]`, the marketing category, is deleted.

---

## Findings that do not change the cookie policy

Recorded here so nothing is lost, but none of these alters a word of `cookies.astro`. Do not let them block the build.

1. **GTM container `GTM-5WRRKR2J` is not visible from `alvin@growth.pro`**, and 38 invitations sit unaccepted. A governance problem: Zicy is data controller for a container it cannot currently audit. The published table is unaffected, because it was built from observed behaviour rather than from the container.
2. **GA4 returns 503 on every collect hit** — six for six across two sessions on the marketing property. An analytics defect, not a privacy one.
3. **app.zicy.com loads Google Fonts from Google**, unlike the marketing site which self-hosts. This sends visitor IP addresses to Google. Worth fixing, but it sets no cookie and belongs in the privacy policy's transfers section, not here.

## Still open

`[FACT-C09]` Chrome extension local storage, `[FACT-C10]` WordPress plugin. Both unevidenced, so section 8 is deleted.
`[FACT-C08]` Global Privacy Control: no GPC handling exists in the codebase, so the bullet is deleted rather than claiming support.
