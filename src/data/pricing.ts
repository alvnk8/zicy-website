// Single source of truth for the pricing-v2 page (DRAFT, /pricing-v2).
// Every price, count, comparison row and FAQ the page renders is defined here; the page and its
// components read from this file and never redefine a value. Customer-facing fields only:
// no cost, margin, profit, breakeven or fixed-cost data lives here by design.
//
// House style: sentence case, no em dashes, UK spelling. Numerals are rendered in the mono face by
// the components, not by anything here.

export const URLS = {
  // Self-serve register (free diagnostic + self-serve tiers) and the sales contact.
  register: 'https://app.zicy.com/register',
  contactSales: 'https://www.zicy.com/enterprise-inquiry',
} as const;

// Annual billing is Zicy's own commitment: 13 months for the price of 12. The toggle shows the
// annual-equivalent monthly price, price * 12/13, rounded to the nearest dollar.
export const ANNUAL = {
  monthsBilled: 12,
  monthsGranted: 13,
  factor: 12 / 13,
  note: '13 months for the price of 12',
  labels: { monthly: 'Monthly', annual: 'Annual' },
} as const;

/** Annual-equivalent monthly price for a monthly price, rounded to the nearest dollar. */
export function annualMonthly(monthly: number): number {
  return Math.round(monthly * ANNUAL.factor);
}

export interface Cta {
  label: string;
  href: string;
  primary?: boolean;
  external?: boolean;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Tier {
  id: string;
  name: string;
  /** Positioning line under the name, e.g. "Solo / single brand". */
  label?: string;
  /** Monthly price in USD, or null when the price is quote-only ("Custom"). */
  priceMonthly: number | null;
  /** Shown in place of a number when priceMonthly is null. */
  priceDisplay?: string;
  per?: string;
  badge?: string;
  default?: boolean;
  /** Headline counts, rendered as a small spec list. */
  specs: Spec[];
  /** Qualitative capabilities, rendered as bullets. */
  features: string[];
  cta: Cta;
}

// --- Free diagnostic: the funnel-top wedge shown ABOVE the paid ladder, not a ladder card. ---
export const FREE_DIAGNOSTIC = {
  name: 'Free diagnostic',
  price: 'Free',
  blurb: 'A one-off snapshot of how AI engines describe your brand today.',
  specs: [
    { label: 'One-off snapshot', value: 'One-off snapshot' },
    { label: 'Audit pages', value: 'Limited audit pages' },
    { label: 'Brand Intelligence runs', value: '1 run' },
    { label: 'Brands', value: '1 brand' },
  ] as Spec[],
  cta: { label: 'Run a free diagnostic', href: URLS.register, primary: true, external: true } as Cta,
};

// --- Core self-serve ladder: Starter, Growth (default), Scale, Enterprise. ---
export const CORE_TIERS: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    label: 'Solo or single brand',
    priceMonthly: 79,
    per: '/mo',
    specs: [
      { label: 'Tracked prompts', value: '50' },
      { label: 'Audit pages', value: '500' },
      { label: 'Brand Intelligence runs', value: '5' },
      { label: 'Brands', value: '1' },
      { label: 'Content credits', value: '0' },
    ],
    features: [
      'All five AI engines, flat',
      'Daily tracking',
      'Multi-market baseline (1 market and core languages)',
    ],
    cta: { label: 'Try for free', href: URLS.register, primary: false, external: true },
  },
  {
    id: 'growth',
    name: 'Growth',
    priceMonthly: 199,
    per: '/mo',
    badge: 'Most popular',
    default: true,
    specs: [
      { label: 'Tracked prompts', value: '150' },
      { label: 'Audit pages', value: '1,500' },
      { label: 'Brand Intelligence runs', value: '20' },
      { label: 'Brands', value: '3' },
      { label: 'Content credits', value: '0' },
    ],
    features: [
      'Everything in Starter',
    ],
    cta: { label: 'Try for free', href: URLS.register, primary: true, external: true },
  },
  {
    id: 'scale',
    name: 'Scale',
    priceMonthly: 449,
    per: '/mo',
    specs: [
      { label: 'Tracked prompts', value: '400' },
      { label: 'Audit pages', value: '4,000' },
      { label: 'Brand Intelligence runs', value: '50' },
      { label: 'Brands', value: '5' },
      { label: 'Content credits', value: '10' },
    ],
    features: [
      'Everything in Growth',
      'Multi-market and multi-language',
      'Priority support',
    ],
    cta: { label: 'Try for free', href: URLS.register, primary: false, external: true },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceMonthly: null,
    priceDisplay: 'Custom',
    specs: [
      { label: 'Tracked prompts', value: 'Custom' },
      { label: 'Audit pages', value: 'Custom' },
      { label: 'Brand Intelligence runs', value: 'Custom' },
      { label: 'Brands', value: 'Unlimited' },
      { label: 'Content credits', value: '50' },
    ],
    features: [
      'Everything in Scale',
      'Dedicated support',
      'Custom markets and languages',
      'Handoff to the Growth.pro managed service',
    ],
    cta: { label: 'Contact sales', href: URLS.contactSales, primary: false, external: false },
  },
];

// --- Agency track: pooled prompts across client workspaces, white-label, unlimited seats. ---
export const AGENCY_TIERS: Tier[] = [
  {
    id: 'agency',
    name: 'Agency',
    priceMonthly: 549,
    per: '/mo',
    specs: [
      { label: 'Pooled prompts', value: '500' },
      { label: 'Client workspaces', value: 'Up to 10' },
      { label: 'Seats', value: 'Unlimited' },
    ],
    features: [
      'All five AI engines on every pooled prompt',
      'White-label reporting',
      'Pitch and audit workspaces',
      'Unlimited seats',
    ],
    cta: { label: 'Contact sales', href: URLS.contactSales, primary: true, external: false },
  },
  {
    id: 'agency-scale',
    name: 'Agency Scale',
    priceMonthly: 999,
    per: '/mo',
    specs: [
      { label: 'Pooled prompts', value: '1,200' },
      { label: 'Client workspaces', value: 'Up to 25' },
      { label: 'Seats', value: 'Unlimited' },
    ],
    features: [
      'All five AI engines on every pooled prompt',
      'White-label reporting',
      'Unlimited seats',
    ],
    cta: { label: 'Contact sales', href: URLS.contactSales, primary: false, external: false },
  },
];

// ---------------------------------------------------------------------------------------------
// Part 2 data: the Act-layer content module, the multi-market rule, and the competitor comparison.
// Rendering is owned by Part 2 components; the values live here so this file stays the single
// source of truth. Part 3 (FAQ) is still stubbed below.
// ---------------------------------------------------------------------------------------------

// Content module. Framed as activating the Act layer, a capability, not "credits sold separately".
// Scale includes 10 credits and Enterprise 50, so the measure-improve loop runs as one product
// from the top; PAYG and packs simply top up execution capacity.
export interface ContentPack {
  name: string;
  credits: number;
  priceUsd: number;
  note?: string;
}
export interface ContentBundle {
  name: string;
  priceUsd: number;
  save: string;
}
export const CONTENT_MODULE = {
  payg: { credits: 5, priceUsd: 12 },
  packs: [
    { name: 'Content Lite', credits: 10, priceUsd: 29 },
    { name: 'Content Plus', credits: 30, priceUsd: 69 },
    { name: 'Content Pro', credits: 100, priceUsd: 199 },
  ] as ContentPack[],
  bundles: [
    { name: 'Growth + Content Plus', priceUsd: 239, save: 'save 11%' },
    { name: 'Scale + Content Pro', priceUsd: 569, save: 'save 12%' },
  ] as ContentBundle[],
  includedNote:
    'Scale includes 10 content credits and Enterprise includes 50, so the loop reads as one product from the top. Add capacity below only when you want to publish more.',
};
// Back-compat alias for any earlier reference to the packs list.
export const CONTENT_PACKS: ContentPack[] = CONTENT_MODULE.packs;

// Multi-market rule. Baseline for the entry tiers, multi-language and additional markets from Scale.
export interface MultiMarketTier {
  label: string;
  markets: string;
  languages: string;
}
export const MULTI_MARKET: MultiMarketTier[] = [
  { label: 'Starter and Growth', markets: '1 market (baseline)', languages: 'Core languages' },
  { label: 'Scale and above', markets: 'Additional markets (Scale includes 3)', languages: 'Multi-language' },
];
export const MULTI_MARKET_PACK = {
  approxPriceUsd: 29,
  unit: 'per market / month',
  note: 'Optional. Add markets beyond what your tier includes, from Scale upward.',
};

// Competitor comparison. Zicy is column 0 and is emphasised in the render. Values are aligned to
// COMPARISON_COLUMNS by index. Do not reorder without reordering every row.
export const COMPARISON_COLUMNS = ['Zicy', 'Otterly', 'Peec', 'Profound', 'Scrunch', 'Dageno'] as const;
export interface ComparisonRow {
  feature: string;
  /** Aligned to COMPARISON_COLUMNS; index 0 is Zicy. */
  values: string[];
}
export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Entry price / mo', values: ['$79 (free diagnostic above)', '$29', '~$95 (€89)', '$99', '$250', '$79'] },
  { feature: 'Engines at entry', values: ['5, flat', '4', 'Choose 3 of 7', '1 (3 on Growth)', '4 (9 on Enterprise)', 'Choose 3'] },
  { feature: 'Gemini and Google AI Mode', values: ['Yes, flat', 'Add-on', 'Within your 3', 'Enterprise', 'Enterprise', 'Within your 3'] },
  { feature: 'Per-engine add-on maths', values: ['None', 'Yes', 'Yes (4th+ engine)', 'Yes (tier-gated)', 'Yes (per-engine credits)', 'No'] },
  { feature: 'Multi-language / multi-country', values: ['Yes', 'Country-level', 'Yes', 'Enterprise', 'Enterprise', 'Yes'] },
  { feature: 'Brand Intelligence (perception vs reality)', values: ['Yes, core', 'Partial', 'Partial', 'Partial', 'Partial (Enterprise-only)', 'Partial'] },
  { feature: 'Content generation and optimisation', values: ['Module', 'No', 'No', 'Agents', 'Limited', 'Agents'] },
  { feature: 'Prove layer (GSC + GA4 + AEO attribution)', values: ['Yes, core', 'GA4 template', 'No', 'Yes (CDN-dependent)', 'Yes', 'Yes'] },
  { feature: 'Daily tracking', values: ['Yes', 'Yes', 'Yes', 'Yes', 'No (72h refresh)', 'Yes'] },
];
export const COMPARISON_FOOTNOTE =
  'Competitor data verified 3 July 2026 against live vendor pricing pages and current reviews. This category shifts monthly; re-verify before production.';

// FAQ. The same array feeds the visible accordion and the FAQPage JSON-LD, so the schema text
// mirrors the rendered answer verbatim. Sentence case, no em dashes, no banned vocab.
export interface PricingFaq {
  q: string;
  a: string;
}
export const PRICING_FAQS: PricingFaq[] = [
  {
    q: 'Which AI engines does Zicy track?',
    a: 'All five engines on every plan: ChatGPT, Gemini, Perplexity, Google AI Overviews and Google AI Mode, with no per-engine add-ons.',
  },
  {
    q: 'What counts as a prompt?',
    a: 'One tracked prompt is measured across all five engines every day. So 50 prompts is up to 7,500 AI answers a month.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes. Annual billing gives you 13 months for the price of 12.',
  },
  {
    q: 'Can Zicy track multiple markets and languages?',
    a: 'Yes. Starter and Growth include a multi-market baseline of one market plus core languages. Scale and above add multi-language and additional markets, with an optional additional-market pack.',
  },
  {
    q: 'How do content credits work?',
    a: 'Content is a separate module you can activate, the Act layer. Buy it pay as you go, in monthly packs, or as a discounted bundle. Scale and Enterprise include content credits.',
  },
];
