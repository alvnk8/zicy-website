# Zicy — Brand Assets (Colour, Type, ICP Psychology)

**Method (same as the Growth.pro brand work):** define a colour system + font pairing, tie every choice to the audience's psychology, and keep the existing palette with minimal change.

**Who we're designing for:** all four ICPs — brands, PR firms, marketing/creative agencies, publishers — are *brand- and credibility-literate*. Creative agencies and brand teams judge brand craft for a living; PR and publishers run on trust and gravitas. The brand must survive professional scrutiny. The current "AI butler / affordable" warmth fails that test.

**Strategy:** keep the existing **indigo + orange** palette (already distinctive and on-narrative), and differentiate Zicy's *type* from Growth.pro's. Growth.pro is serif-led editorial authority; Zicy is **precise, sans-and-mono data intelligence** — so the two read as one family without competing. Monospace numerals are Zicy's signature: the product runs on scores, so precision *is* the truth-layer made visible.

> Hex values below are derived from your live product UI and should be confirmed against the exact brand hex before build.

---

## 1. Colour system

Keep the existing palette. The duality is the story: **indigo = see the truth, orange = act on it.**

| Token | Hex | Role | Psychology |
|---|---|---|---|
| **Indigo** (primary) | `#312E81` | Headlines, primary UI, brand | Intelligence, authority, trust, premium depth — the "truth/thinking" colour |
| **Indigo bright** | `#4F46E5` | Links, interactive, focus | Same family, more energy for live elements |
| **Orange** (accent) | `#F97316` | CTAs, action chips, "do it now" | Energy, confidence, distinctiveness — stands out in a sea of blue SaaS; used sparingly = premium, not loud |
| **Ink** | `#1A1A2E` | Body text | Near-black with an indigo tint — softer and more intelligent than pure black |
| **Lavender** | `#F4F4FB` | Surfaces, cards, page bg | Soft, modern, calm — keeps dense data from feeling clinical |
| **Green** | `#16A34A` | Visible / positive / cited | Outcome semantics |
| **Red** | `#E24B4A` | At risk / invisible / hijacked | Loss-aversion semantics — pairs with your "what you lose" framing |
| **Amber** | `#F59E0B` | Gaps / caution | Mid-state, attention without alarm |
| **Muted** | `#6B7280` | Secondary text, labels | Neutral support |

**Rules:**
- Indigo carries authority; orange is the *only* loud colour and is reserved for action. Never use orange for body or decoration.
- Green/red/amber are semantic only — tie them to outcomes (visible vs at-risk), which doubles as loss-aversion messaging.
- Keep backgrounds light (white + lavender). Reserve solid indigo blocks for high-impact moments (hero band, CTA cards).

---

## 2. Type system

Recommended pairing — a three-role system that reads precise, intelligent, and agency-credible:

| Role | Typeface | Why |
|---|---|---|
| **Display / headlines** | **Schibsted Grotesk** (600 / 700) | A contemporary news/brand grotesque — sharp, modern, distinctive without being quirky; gives Zicy its own voice and stays clearly distinct from Growth.pro's serif |
| **Body / UI** | **Inter** (400 / 500) | The workhorse — superb legibility at dashboard data density; neutral so the display and the data carry the character |
| **Data / metrics / labels** | **Space Mono** (400 / 700) | The signature — scores, percentages, rankings in mono read precise and intentional; precision = the truth layer made visible |

All three are free / open (Google Fonts + JetBrains), easy to ship.

**Roles in use:** Schibsted Grotesk for hero lines, section headers, big statements. Inter for everything readable — paragraphs, nav, buttons, table content. Space Mono for every number that matters: scores, %, ranks, deltas, code-like labels, citation URLs.

**Alternates considered (not selected):**
- *Direction A — editorial authority:* Fraunces + Hanken Grotesk + IBM Plex Mono. More gravitas, but the serif drifts toward Growth.pro's identity.
- *Direction C — refined neutral:* Manrope + Inter + JetBrains Mono. Cleaner and calmer, but less distinctive.

**Locked: Schibsted Grotesk + Inter + Space Mono** (Direction B). Sharp, modern, and distinctly Zicy's own — credible to all four ICPs while staying clearly separate from Growth.pro's editorial serif.

---

## 3. How the system serves each ICP's psychology

- **Brands / branding professionals** — indigo authority + Schibsted Grotesk's sharp, modern character signal brand sophistication; they need to trust that a brand tool *understands* brand. Restraint (one loud colour) reads premium.
- **PR agencies** — indigo + mono = calm, precise, trustworthy; the gravitas reassures a discipline built on reputation and crisis. Red used for risk/hijack mirrors how they think. (If they want more gravitas, the Newsreader alternate.)
- **Marketing / creative / media agencies** — the harshest judges of craft. A distinctive grotesque + mono + disciplined palette reads "designed by people who care," and the clean, neutral base is white-label-friendly enough to sit beside their own brands.
- **Publishers / media companies** — mono numerals and clean structure read data-authoritative and editorial; signals Zicy is a serious intelligence source, not a marketing toy.

---

## 4. Guardrails

- **Don't over-warm it.** Retire the "butler" friendliness. Confidence and clarity, not cuteness.
- **One loud colour.** Orange earns attention precisely because everything else is restrained.
- **Mono is the signature.** Every meaningful number is mono — it's the cheapest, most ownable way to look precise and trustworthy.
- **Differentiate from Growth.pro on purpose.** Zicy = sans + mono (platform/precision); Growth.pro = serif (consultancy/editorial). Same family, distinct roles.
- **Policy-clean, per PK v3.6.** Wherever Growth.pro's IP is referenced, no "engineering" / manipulation language — "Enablement," "earn," brand-side framing only.
- **Accessibility.** Indigo `#312E81` on white and white on indigo both clear AA. Confirm orange text contrast — prefer orange as a fill with white/ink text, not as small text on white.
- **Confirm hex** against the exact brand values before build; treat these as the codified, refined version of what's already live.
