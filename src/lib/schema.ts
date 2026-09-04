// Single source of truth for the canonical Zicy Organization entity and the per-page WebPage
// node shape. Schema.astro renders `orgNode` on every page (entity-graph fix 2026-09: repeating
// the same @id/content on every page is the documented pattern for a sitewide entity, not
// fragmentation — omitting it left pages like /legal/privacy with zero JSON-LD at all).
import { SITE } from '../data/site';

export const ORG_ID = `${SITE.url}/#org`;
export const BRAND_ID = `${SITE.url}/#brand`;
const GROWTH_PRO_ORG_ID = 'https://www.growth.pro/#org';

export const PERSON_IDS = {
  alvin: `${SITE.url}/about/alvin-koay#alvin-koay`,
  ritu: `${SITE.url}/about#ritu-khanna`,
  peter: `${SITE.url}/about#peter-kua`,
} as const;

// Byte-identical everywhere it appears. Do not fork a per-page copy.
// Entity-graph fix 2026-09: dropped the three Growth.pro/Alvin-personal links (growth.pro
// homepage, Alvin's personal LinkedIn, Alvin's Growth.pro Person @id) per the 2026-09 entity graph
// review — sameAs should carry the entity's OWN verified profiles, not its parent's or a person's.
// The relationship to Growth.pro is still expressed structurally via parentOrganization below.
export const ORG_SAME_AS = [
  SITE.linkedin,
  'https://www.facebook.com/askzicy',
  'https://www.instagram.com/askzicy/',
  'https://www.youtube.com/@askzicy',
] as const;

// Entity finding f-003 (2026-08-25): plain strings only, no Wikipedia/Wikidata URLs (unverified).
// Site spelling is British ("optimisation"), confirmed against the glossary's canonical AEO/GEO
// term format (src/pages/resources/glossary/_glossary-data.ts) — do not switch to "optimization".
export const ORG_KNOWS_ABOUT = [
  'Answer engine optimisation (AEO)',
  'Generative engine optimisation (GEO)',
  'AI visibility tracking',
  'AI citation monitoring',
  'Brand visibility in AI answers (ChatGPT, Gemini, Perplexity, Google AI Overviews, Google AI Mode)',
  'Share of voice in AI answers',
  'AI crawler access management',
] as const;

// Confirmed by the owner (2026-06-17): foundingDate 2026 (Zicy the brand); Alvin Koay LinkedIn.
// Entity-graph fix 2026-09: legalName removed from THIS node. SITE.legalName ('Growth Pro Sdn.
// Bhd.') is the parent's registered name, not a separate Zicy registration — Zicy has no legal
// name of its own (see parentOrganization below, and /about's own copy: "Growth Pro Sdn. Bhd.
// operates under Malaysia Digital (MD) status"). A legalName here would misstate Zicy as its own
// registered entity. If Zicy is ever separately incorporated, add the real legalName then.
export const orgNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  url: `${SITE.url}/`,
  foundingDate: '2026',
  logo: `${SITE.url}/zicy-logo.png`,
  description:
    'Zicy is the truth layer for AI visibility, showing how AI engines describe your brand, whether it is accurate, and how to improve it.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '60 Persiaran Midlands',
    postalCode: '10250',
    addressLocality: 'Penang',
    addressCountry: 'MY',
  },
  parentOrganization: {
    '@type': 'Organization',
    '@id': GROWTH_PRO_ORG_ID,
    name: 'Growth.pro',
    url: 'https://www.growth.pro/',
  },
  brand: { '@id': BRAND_ID },
  sameAs: ORG_SAME_AS,
  knowsAbout: ORG_KNOWS_ABOUT,
  founder: { '@id': PERSON_IDS.alvin },
  employee: [
    { '@id': PERSON_IDS.alvin },
    { '@id': PERSON_IDS.ritu },
    { '@id': PERSON_IDS.peter },
  ],
};

// Entity-graph fix 2026-09: Brand node distinct from the Organization, so "Zicy" the product/
// brand can be referenced independently of "Zicy" the operating entity. Rendered on every page
// alongside orgNode (Schema.astro), same rationale.
export const brandNode = {
  '@type': 'Brand',
  '@id': BRAND_ID,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/zicy-logo.png`,
  parentOrganization: { '@id': ORG_ID },
};

// path must match the site's actually-served URL: trailingSlash:'never' (astro.config.mjs) means
// no trailing slash except '/' itself. aboutId defaults to the Organization but a page whose
// primary subject is a specific entity (e.g. the Alvin Koay founder page) can point elsewhere.
// mentionsId is optional: a secondary entity the page discusses without being primarily about it
// (e.g. /media is about the Organization but mentions the founder Person by reference only).
export function webPageSchema(path: string, name: string, aboutId: string = ORG_ID, mentionsId?: string) {
  const url = path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    about: { '@id': aboutId },
    ...(mentionsId ? { mentions: { '@id': mentionsId } } : {}),
    publisher: { '@id': ORG_ID },
  };
}

// Entity finding (2026-08-26): dedicated founder entity page. Emitted in full ONLY on
// /about/alvin-koay (see Schema.astro's isAlvinPage gate) so Alvin resolves to exactly one
// canonical URL; every other page references him by @id only (PERSON_IDS.alvin), the same
// pattern orgNode uses for the Organization. description/jobTitle verbatim from the visible
// /about team card. sameAs: Zicy LinkedIn plus Alvin's canonical Person node on Growth.pro
// (@id verified live at https://www.growth.pro/#alvin-koay) — no new URLs added.
export const alvinPersonNode = {
  '@type': 'Person',
  '@id': PERSON_IDS.alvin,
  name: 'Alvin Koay',
  jobTitle: 'Founder and CEO',
  description:
    "Started Growth.pro before the pandemic and saw an SEO industry riddled with broken promises. Built Zicy to clone Growth.pro's ethos, empathy, trust, accountability, transparency and integrity, into AI, so even the smallest businesses get fair access to world-class strategies.",
  url: `${SITE.url}/about/alvin-koay`,
  worksFor: { '@id': ORG_ID },
  sameAs: [
    'https://www.linkedin.com/in/alvinkoay/',
    'https://www.growth.pro/#alvin-koay',
  ],
};

// Entity-graph fix 2026-09: Ritu and Peter have no dedicated bio page (about.astro leaves their
// `link` null), so unlike Alvin they resolve to their #fragment on /about itself. Emitted in full
// on /about (see about.astro) and on any resources article that names them as byline author (see
// each article's own `author` reference to PERSON_IDS.ritu/.peter) — @id only everywhere else.
// name/jobTitle/description verbatim from the visible /about team card.
export const rituPersonNode = {
  '@type': 'Person',
  '@id': PERSON_IDS.ritu,
  name: 'Ritu Khanna',
  jobTitle: 'Co-founder',
  description:
    'Over 15 years in the corporate sector leading environmental-industry projects, plus a decade in SEO strategy and content planning. At Zicy, Ritu applies that experience to develop practical AI-first optimisation methods that help businesses become visible in AI-generated answers.',
  url: `${SITE.url}/about#ritu-khanna`,
  worksFor: { '@id': ORG_ID },
};

export const peterPersonNode = {
  '@type': 'Person',
  '@id': PERSON_IDS.peter,
  name: 'Peter Kua',
  jobTitle: 'Chief Data Officer',
  description:
    "A distinguished data science strategist who led Data Science & Analytics at REV Media Group and drove Malaysia's National Big Data Analytics Initiative under MDEC, developing the country's first National BDA Framework. Has trained senior teams at Citibank, Intel, Dell, NTT Data, Maxis and Johnson & Johnson.",
  url: `${SITE.url}/about#peter-kua`,
  worksFor: { '@id': ORG_ID },
};

// Entity finding f-006 (2026-08-25): a generic FAQPage builder for pages whose visible Q&A pairs
// live in structured page data rather than a hand-authored Faq[] (see faqPageJsonLd in
// data/faqs.ts for the sibling pattern used by /solutions/*). Callers must pass the exact same
// question/answer strings already used to render the page's visible copy, never a re-typed copy,
// so schema and visible copy cannot drift apart.
export function faqPageSchema(id: string, questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

// Entity finding f-005 (2026-08-25): one Service node per client-confirmed offering (Alvin,
// 2026-08-25). name/description/serviceType must be lifted verbatim from that page's own visible
// copy by the caller, never invented here. No areaServed/offers/prices — not confirmed.
export function serviceSchema(
  path: string,
  name: string,
  description: string,
  serviceType: string
) {
  const url = `${SITE.url}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    serviceType,
    provider: { '@id': ORG_ID },
    url,
  };
}
