// Machine-readable pricing feed, published at https://www.zicy.com/pricing.json for other
// consumers.
//
// This is no longer the chatbots' pricing source: zicy-tools PR #1232 moved `get_pricing` to
// render from the backend's own plan config instead. The shape should still stay
// backwards-compatible for whoever else reads this feed: add fields, never rename or remove one,
// and only bump `version` on a breaking change.
//
// Built entirely from src/data/pricing.ts, src/data/faqs.ts and (site URL only) src/data/site.ts,
// the same data src/pages/pricing.astro and its components (TierCard.astro, AgencyBlock.astro,
// ContentModule.astro, MultiMarket.astro, PricingFAQ.astro) render from. No figure is duplicated
// or hand-typed here; every price, count and feature line comes from those files at build time.
//
// Field notes:
// - annualBilling: annual billing is arranged through sales on request; checkout is monthly, so
//   no annual prices are published here.
// - cta.ctaUrl: an absolute URL built from cta.href + SITE.url, added only when href is relative
//   (site-internal, e.g. "/contact"); href itself is left untouched for compatibility, and ctaUrl
//   is null when href is already absolute (external register links).
// - Content-credit packs/payg and the multi-market pack carry a `per` field only where the pricing
//   page actually renders a billing period next to that price (ContentModule.astro shows "/mo" on
//   bundles only; packs and payg show a price with no period; MultiMarket.astro's pack line shows
//   "per market / month"). Nothing here invents a period the page doesn't show.
import type { APIRoute } from 'astro';
import { ANNUAL, CORE_TIERS, AGENCY_TIERS, CONTENT_MODULE, MULTI_MARKET, MULTI_MARKET_PACK, PRICING_FAQS, type Tier } from '../data/pricing';
import { universalFaqs, brandsFaqs, prFaqs, agenciesFaqs, publishersFaqs, type Faq } from '../data/faqs';
import { SITE } from '../data/site';

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

// cta.href is relative (site-internal, e.g. "/contact") for some tiers and already absolute
// (external register links) for others; only the relative case needs an absolute URL added.
function absoluteCtaUrl(href: string): string | null {
  return href.startsWith('/') ? `${SITE.url}${href}` : null;
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
    priceDisplay: tier.priceDisplay ?? null,
    badge: tier.badge ?? null,
    default: tier.default ?? false,
    // Headline counts (tracked prompts, audit pages, brands, seats where a tier states them, etc),
    // exactly as shown on the pricing page's spec list for this tier.
    specs: tier.specs,
    features: tier.features,
    cta: { label: tier.cta.label, href: tier.cta.href, ctaUrl: absoluteCtaUrl(tier.cta.href) },
    trialEligible: tier.cta.label === 'Try for free',
  };
}

// FAQ lines that mention the trial, from every FAQ array faqs.ts exports (universal + the four
// ICP-specific blocks), deduplicated by question text since the same question can recur across
// arrays. Answers are stripped of HTML/entities (see stripHtml) before being read into JSON.
// Word-boundary match so this never fires on an unrelated word that merely contains "trial".
const allFaqs: Faq[] = [universalFaqs, brandsFaqs, prFaqs, agenciesFaqs, publishersFaqs].flat();
const seenTrialFaqQuestions = new Set<string>();
const trialFaqs = allFaqs
  .filter((f) => /\btrial\b/i.test(f.q) || /\btrial\b/i.test(f.a))
  .filter((f) => (seenTrialFaqQuestions.has(f.q) ? false : (seenTrialFaqQuestions.add(f.q), true)))
  .map((f) => ({ q: stripHtml(f.q), a: stripHtml(f.a) }));

// The /pricing page's own FAQ block (PricingFAQ.astro), same array its FAQPage JSON-LD mirrors.
const pricingFaqs = PRICING_FAQS.map((f) => ({ q: stripHtml(f.q), a: stripHtml(f.a) }));

export const GET: APIRoute = () => {
  const body = {
    version: 1,
    generatedAt: new Date().toISOString(),
    currency: 'USD',
    annualBilling: { note: ANNUAL.note, checkout: 'monthly' },
    plans: {
      core: CORE_TIERS.map((t) => tierToJson(t)),
      agency: AGENCY_TIERS.map((t) => tierToJson(t)),
    },
    contentCredits: {
      includedNote: CONTENT_MODULE.includedNote,
      // Pay-as-you-go and packs: ContentModule.astro shows a price with no billing period.
      payg: { ...CONTENT_MODULE.payg, per: null },
      packs: CONTENT_MODULE.packs.map((p) => ({ ...p, per: null })),
      // Bundles: ContentModule.astro shows "/mo" next to the price.
      bundles: CONTENT_MODULE.bundles.map((b) => ({ ...b, per: 'month' })),
    },
    markets: {
      tiers: MULTI_MARKET,
      // MultiMarket.astro shows the pack price as "per market / month".
      pack: { ...MULTI_MARKET_PACK, per: 'month' },
    },
    pricingFaqs,
    trialFaqs,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
