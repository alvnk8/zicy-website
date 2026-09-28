// Machine-readable pricing feed, served at https://www.zicy.com/pricing.json.
//
// Both Zicy chatbots read this file: the public Ask Zicy widget (site) and the in-app Ask Zicy,
// each through a shared `get_pricing` tool (see specs/active/public-ask-zicy.md, R6). It is the
// only source either bot uses for prices, plans, seats, trials or billing, so treat the shape as
// an API contract: add fields, never rename or remove one, and only bump `version` on a breaking
// change.
//
// Built entirely from src/data/pricing.ts and src/data/faqs.ts, the same data src/pages/pricing.astro
// and its components (TierCard.astro etc.) render from. No figure is duplicated or hand-typed here;
// every price, count and feature line comes from those two files at build time.
import type { APIRoute } from 'astro';
import { annualMonthly, ANNUAL, CORE_TIERS, AGENCY_TIERS, CONTENT_MODULE, type Tier } from '../data/pricing';
import { universalFaqs, brandsFaqs, prFaqs, agenciesFaqs, publishersFaqs, type Faq } from '../data/faqs';

export const prerender = true;

// FAQ answers are static HTML (rendered via set:html in FaqAccordion.astro); strip tags and
// decode the entities the copy could plausibly contain so this plain-text JSON feed stays clean.
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// A tier's own cta.label is the data that drives whether TierCard shows a trial note at all
// ("Try for free" vs "Contact sales"); trialEligible mirrors that same check rather than hard-coding
// which tier names get a trial.
function tierToJson(tier: Tier) {
  return {
    id: tier.id,
    name: tier.name,
    label: tier.label ?? null,
    priceMonthlyUsd: tier.priceMonthly,
    priceAnnualMonthlyUsd: tier.priceMonthly !== null ? annualMonthly(tier.priceMonthly) : null,
    priceDisplay: tier.priceDisplay ?? null,
    badge: tier.badge ?? null,
    default: tier.default ?? false,
    // Headline counts (tracked prompts, audit pages, brands, seats where a tier states them, etc),
    // exactly as shown on the pricing page's spec list for this tier.
    specs: tier.specs,
    features: tier.features,
    cta: { label: tier.cta.label, href: tier.cta.href },
    trialEligible: tier.cta.label === 'Try for free',
  };
}

// FAQ lines that mention the trial, from every FAQ array faqs.ts exports (universal + the four
// ICP-specific blocks), deduplicated by question text since the same question can recur across
// arrays. Answers are stripped of HTML/entities (see stripHtml) before being read into JSON.
const allFaqs: Faq[] = [universalFaqs, brandsFaqs, prFaqs, agenciesFaqs, publishersFaqs].flat();
const seenTrialFaqQuestions = new Set<string>();
const trialFaqs = allFaqs
  .filter((f) => /trial/i.test(f.q) || /trial/i.test(f.a))
  .filter((f) => (seenTrialFaqQuestions.has(f.q) ? false : (seenTrialFaqQuestions.add(f.q), true)))
  .map((f) => ({ q: stripHtml(f.q), a: stripHtml(f.a) }));

export const GET: APIRoute = () => {
  const body = {
    version: 1,
    generatedAt: new Date().toISOString(),
    currency: 'USD',
    annualBilling: {
      monthsBilled: ANNUAL.monthsBilled,
      monthsGranted: ANNUAL.monthsGranted,
      factor: ANNUAL.factor,
      note: ANNUAL.note,
    },
    plans: {
      core: CORE_TIERS.map(tierToJson),
      agency: AGENCY_TIERS.map(tierToJson),
    },
    contentCredits: {
      includedNote: CONTENT_MODULE.includedNote,
      payg: CONTENT_MODULE.payg,
      packs: CONTENT_MODULE.packs,
      bundles: CONTENT_MODULE.bundles,
    },
    trialFaqs,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
