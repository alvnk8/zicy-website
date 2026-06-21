// Single source of truth for site identity and navigation.
// URLs match the drop-in robots.txt / llms.txt / sitemap.xml (www.zicy.com).

export const SITE = {
  name: 'Zicy',
  url: 'https://www.zicy.com',
  tagline: 'The truth layer for AI visibility.',
  legalName: 'Growth Pro Sdn. Bhd.',
  description:
    "Zicy is the truth layer for AI visibility, see how every AI engine describes your brand, whether it's true, and how to fix it. All engines. All languages. All markets.",
  linkedin: 'https://www.linkedin.com/company/askzicy/',
} as const;

export const PROVENANCE =
  'Built by Growth.pro, the consultancy behind the PAVA framework for AI visibility.';

export const PROOF_ENGINES = 'ChatGPT · Gemini · Perplexity · Google AI Overviews · Copilot';
export const PROOF_TAG = 'All engines. All languages. All markets.';

export const SOLUTIONS = [
  { label: 'For brands', href: '/solutions/brands' },
  { label: 'For PR agencies', href: '/solutions/pr' },
  { label: 'For marketing & creative agencies', href: '/solutions/agencies' },
  { label: 'For publishers', href: '/solutions/publishers' },
] as const;

export const FREE_TOOLS = [
  { label: 'AEO/GEO Consultant', href: '/consultant' },
  { label: 'Chrome extension', href: '/chrome-extension' },
] as const;
