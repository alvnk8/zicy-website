// Single source of truth for the canonical Zicy Organization entity and the per-page WebPage
// node shape. Schema.astro renders `orgNode` once, homepage only; every other page wires in via
// webPageSchema(), which references the org by @id instead of repeating it. Duplicating the org
// node's literal JSON per page is the fragmentation this module exists to prevent.
import { SITE } from '../data/site';

export const ORG_ID = `${SITE.url}/#org`;
const GROWTH_PRO_ORG_ID = 'https://www.growth.pro/#org';

export const PERSON_IDS = {
  alvin: `${SITE.url}/about#alvin-koay`,
  ritu: `${SITE.url}/about#ritu-khanna`,
  peter: `${SITE.url}/about#peter-kua`,
} as const;

// Byte-identical everywhere it appears. Do not fork a per-page copy.
export const ORG_SAME_AS = [
  SITE.linkedin,
  'https://www.facebook.com/askzicy',
  'https://www.instagram.com/askzicy/',
  'https://www.youtube.com/@askzicy',
  'https://www.growth.pro/',
  'https://www.linkedin.com/in/alvinkoay/',
  'https://www.growth.pro/#alvin-koay',
] as const;

// Confirmed by the owner (2026-06-17): foundingDate 2026 (Zicy the brand); Alvin Koay LinkedIn.
// legalName and the registration number are the owner-supplied legal identity; do not alter.
export const orgNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
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
  sameAs: ORG_SAME_AS,
  founder: { '@id': PERSON_IDS.alvin },
  employee: [
    { '@id': PERSON_IDS.alvin },
    { '@id': PERSON_IDS.ritu },
    { '@id': PERSON_IDS.peter },
  ],
};

// path must match the site's actually-served URL: trailingSlash:'never' (astro.config.mjs) means
// no trailing slash except '/' itself.
export function webPageSchema(path: string, name: string) {
  const url = path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    about: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}
