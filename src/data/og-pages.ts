// Single source of truth for per-page Open Graph / social-share cards.
// Each route maps to { eyebrow, title, description, alt }. The generation endpoint
// (src/pages/og/[...route].ts) renders one branded PNG per key here, and the shared
// <head> in BaseLayout derives each page's og:image URL from its pathname via ogImageMeta(),
// so the URL the page advertises and the PNG that is generated can never drift.
//
// House style (hard rules): sentence case; no em dashes (commas, colons, periods, or a middot
// are used instead); AI platforms named in the fixed order and full form (ChatGPT, Gemini,
// Perplexity, Google AI Overviews, Google AI Mode); no hardcoded counts; no rival names or
// demo-brand data (these are brand-level marketing cards).

import { SITE } from './site';
import { CASES } from './cases';

export interface OgPage {
  eyebrow: string;
  title: string;
  description: string;
  alt: string;
}

// pathname -> og slug. '/' -> 'index'; '/solutions/brands' -> 'solutions/brands'.
// Shared by the endpoint (keys below) and the head component, so they stay in lockstep.
export function ogSlug(pathname: string): string {
  const p = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  return p === '' ? 'index' : p;
}

const pages: Record<string, OgPage> = {
  index: {
    eyebrow: 'AI visibility measurement',
    title: 'See how AI describes your brand',
    description:
      'Track brand mentions, citations, and share of voice across ChatGPT, Gemini, Perplexity, Google AI Overviews, and Google AI Mode.',
    alt: 'Zicy · AI visibility measurement',
  },
  platform: {
    eyebrow: 'Platform',
    title: 'Measure, prove, improve',
    description:
      'One platform to measure your AI visibility, prove what is working, and improve where you appear.',
    alt: 'Zicy · the platform',
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Plans that scale with your visibility',
    description:
      'Self-serve plans with a free trial, priced per tracked prompt across every major AI engine.',
    alt: 'Zicy · pricing',
  },
  'case-studies': {
    eyebrow: 'Case studies',
    title: 'Documented AI visibility outcomes',
    description: 'Measured results across major AI engines, with full measurement disclosure.',
    alt: 'Zicy · case studies',
  },
  about: {
    eyebrow: 'About',
    title: 'The truth layer for AI visibility',
    description: 'An AI visibility consultancy, turned into a platform. Built by Growth.pro.',
    alt: 'Zicy · about',
  },
  'done-for-you': {
    eyebrow: 'Done-for-you',
    title: 'AI visibility, run for you',
    description:
      'A selective managed programme run by Growth.pro, the consultancy that built Zicy.',
    alt: 'Zicy · done-for-you',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Talk to the Zicy team',
    description: 'Questions about AI visibility, plans, or the managed service. We are happy to help.',
    alt: 'Zicy · contact',
  },
  'free-tools': {
    eyebrow: 'Free tools',
    title: 'See how AI reads your brand',
    description:
      'Free ways to check your AI visibility: the AEO and GEO consultant and the Chrome extension.',
    alt: 'Zicy · free tools',
  },
  consultant: {
    eyebrow: 'AEO and GEO consultant',
    title: 'Free guidance on AI search visibility',
    description: 'Ask anything about getting found and cited across major AI engines.',
    alt: 'Zicy · AEO and GEO consultant',
  },
  'chrome-extension': {
    eyebrow: 'Chrome extension',
    title: 'Check AI answers from your browser',
    description: 'An on-page AI-readiness check, a bot-access checker, and a one-click schema generator.',
    alt: 'Zicy · Chrome extension',
  },
  resources: {
    eyebrow: 'Resources',
    title: 'Guides and research on AI visibility',
    description: 'Practical AEO and GEO guidance, and how AI search is changing brand discovery.',
    alt: 'Zicy · resources',
  },
  'solutions/brands': {
    eyebrow: 'For brands',
    title: 'Own your answer in AI search',
    description: 'See where AI recommends you, and where it recommends a competitor instead.',
    alt: 'Zicy · for brands',
  },
  'solutions/pr': {
    eyebrow: 'For PR and comms',
    title: 'Prove your coverage reaches AI',
    description: 'Connect earned media to brand mentions and citations in AI answers.',
    alt: 'Zicy · for PR and comms',
  },
  'solutions/agencies': {
    eyebrow: 'For agencies',
    title: 'AI visibility your clients can see',
    description:
      'Report brand mentions, citations, and share of voice across every major AI engine.',
    alt: 'Zicy · for agencies',
  },
  'solutions/publishers': {
    eyebrow: 'For publishers',
    title: 'Measure how AI cites your content',
    description: 'Track which pages AI engines cite, and how often.',
    alt: 'Zicy · for publishers',
  },
  'legal/terms': {
    eyebrow: 'Legal',
    title: 'Terms of service',
    description: 'The terms that govern use of Zicy.',
    alt: 'Zicy · terms of service',
  },
  'legal/privacy': {
    eyebrow: 'Legal',
    title: 'Privacy policy',
    description: 'How Zicy handles your data.',
    alt: 'Zicy · privacy policy',
  },
  'legal/dpa': {
    eyebrow: 'Legal',
    title: 'Data processing addendum',
    description: 'How Zicy processes data on your behalf.',
    alt: 'Zicy · data processing addendum',
  },
  'legal/cookies': {
    eyebrow: 'Legal',
    title: 'Cookie policy',
    description: 'How Zicy uses cookies.',
    alt: 'Zicy · cookie policy',
  },
  // Default / fallback card for any route not explicitly listed above.
  fallback: {
    eyebrow: 'Zicy',
    title: 'Be the brand AI gets right',
    description: 'The truth layer for AI visibility, across every major AI engine.',
    alt: 'Zicy · the platform',
  },
};

// Case-study detail pages, derived from the same data the routes and sitemap use, so coverage
// stays in sync. Titles are the studies' qualitative angle (anonymised, no client/demo brand).
for (const c of CASES) {
  pages[`case-studies/${c.slug}`] = {
    eyebrow: 'Case study',
    title: c.indexTitle,
    description: 'A documented AI visibility outcome, measured across major AI engines.',
    alt: 'Zicy · case study',
  };
}

export const ogPages = pages;

// The slug that actually has a generated PNG: the raw slug if listed, otherwise the fallback.
function imageSlug(pathname: string): string {
  const s = ogSlug(pathname);
  return s in pages ? s : 'fallback';
}

// Used by BaseLayout's <head>: absolute https URL on the canonical host + alt text.
export function ogImageMeta(pathname: string): { image: string; alt: string } {
  const slug = imageSlug(pathname);
  return { image: `${SITE.url}/og/${slug}.png`, alt: pages[slug].alt };
}
