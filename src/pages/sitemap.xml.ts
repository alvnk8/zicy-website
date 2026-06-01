import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { ICPS } from '../data/icps';
import { CASES } from '../data/cases';

// Dynamic sitemap. Every public URL is derived from the same data the pages use,
// so it can't drift out of sync. lastmod = build date (updates on every deploy).
const LEGAL = ['terms', 'privacy', 'dpa', 'cookies'];

interface Entry {
  path: string;
  changefreq: string;
  priority: string;
}

const entries: Entry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/platform', changefreq: 'monthly', priority: '0.9' },
  ...ICPS.map((i) => ({ path: `/solutions/${i.slug}`, changefreq: 'monthly', priority: '0.9' })),
  { path: '/free-tools', changefreq: 'monthly', priority: '0.7' },
  { path: '/aeo-geo-consultant', changefreq: 'monthly', priority: '0.8' },
  { path: '/chrome-extension', changefreq: 'monthly', priority: '0.8' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.8' },
  { path: '/case-studies', changefreq: 'monthly', priority: '0.8' },
  ...CASES.map((c) => ({ path: `/case-studies/${c.slug}`, changefreq: 'yearly', priority: '0.6' })),
  { path: '/done-for-you', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/resources', changefreq: 'weekly', priority: '0.7' },
  ...LEGAL.map((d) => ({ path: `/legal/${d}`, changefreq: 'yearly', priority: '0.3' })),
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];
  const urls = entries
    .map((e) => {
      const loc = e.path === '/' ? `${SITE.url}/` : `${SITE.url}${e.path}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
