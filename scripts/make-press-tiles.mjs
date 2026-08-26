// Generates one 800x600 press-tile thumbnail per publisher into public/press/tiles/<slug>.webp.
// Run: node scripts/make-press-tiles.mjs
//
// Idempotent: re-running regenerates every tile from scratch. Drop a real logo at
// public/press/<slug>.svg and re-run to swap that one publisher from a text wordmark to its
// real logo — no other change, no code edit required for that.
//
// Adding a brand-new publisher (item 8+) is one manifest line below plus one command; the
// template, palette and layout are already built and never need touching again.
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const TEMPLATE_PATH = path.join(__dirname, 'press-tile-template.html');
const PUBLIC_PRESS_DIR = path.join(REPO_ROOT, 'public', 'press');
const TILES_DIR = path.join(PUBLIC_PRESS_DIR, 'tiles');

// Fixed 5-value palette, one field colour per publisher, no invented hex values — every value
// below is copied verbatim from src/styles/theme.css's existing token list. Kept in sync with
// the `coverage` array in src/pages/media.astro (same publishers, same slugs as each item's
// `logo` field).
const PUBLISHERS = [
  { name: 'Digital News Asia', slug: 'digital-news-asia', type: 'Article', color: '#B4E0F4' }, // --sky-300
  { name: 'Biz.bio',           slug: 'biz-bio',           type: 'Article', color: '#BEB9DA' }, // --violet-300
  { name: 'e27',               slug: 'e27',               type: 'Article', color: '#D6A8D3' }, // --magenta-300
  { name: 'Malaysia SME+',     slug: 'malaysia-sme',      type: 'Article', color: '#F3F3F8' }, // --violet-50
  { name: 'BFM 89.9',          slug: 'bfm',               type: 'Podcast', color: '#83C9EB' }, // --sky
];

// --violet-900, dark enough for AA text/glyph contrast against every field colour above.
const TEXT_COLOR = '#2A2641';

const GLYPHS = {
  Article: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="18" rx="2" stroke="${TEXT_COLOR}" stroke-width="1.6"/><line x1="7.5" y1="8" x2="16.5" y2="8" stroke="${TEXT_COLOR}" stroke-width="1.6"/><line x1="7.5" y1="12" x2="16.5" y2="12" stroke="${TEXT_COLOR}" stroke-width="1.6"/><line x1="7.5" y1="16" x2="13" y2="16" stroke="${TEXT_COLOR}" stroke-width="1.6"/></svg>`,
  Podcast: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="3" width="6" height="11" rx="3" stroke="${TEXT_COLOR}" stroke-width="1.6"/><path d="M6 11a6 6 0 0 0 12 0" stroke="${TEXT_COLOR}" stroke-width="1.6" stroke-linecap="round"/><line x1="12" y1="17" x2="12" y2="21" stroke="${TEXT_COLOR}" stroke-width="1.6"/><line x1="8.5" y1="21" x2="15.5" y2="21" stroke="${TEXT_COLOR}" stroke-width="1.6" stroke-linecap="round"/></svg>`,
};

fs.mkdirSync(TILES_DIR, { recursive: true });
const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

const browser = await chromium.launch();
const report = [];

for (const pub of PUBLISHERS) {
  const svgPath = path.join(PUBLIC_PRESS_DIR, `${pub.slug}.svg`);
  const hasLogo = fs.existsSync(svgPath);
  const content = hasLogo
    ? `<img class="logo" src="file://${svgPath.replace(/\\/g, '/')}" alt="">`
    : `<span class="wordmark">${pub.name}</span>`;

  const html = template
    .replaceAll('__FIELD_COLOR__', pub.color)
    .replaceAll('__TEXT_COLOR__', TEXT_COLOR)
    .replaceAll('__CONTENT__', content)
    .replaceAll('__GLYPH__', GLYPHS[pub.type]);

  const tmpHtml = path.join(os.tmpdir(), `press-tile-${pub.slug}.html`);
  const tmpPng = path.join(os.tmpdir(), `press-tile-${pub.slug}.png`);
  fs.writeFileSync(tmpHtml, html, 'utf8');

  const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
  await page.goto(`file://${tmpHtml.replace(/\\/g, '/')}`);
  await page.waitForTimeout(100);
  await page.screenshot({ path: tmpPng });
  await page.close();

  const outFile = path.join(TILES_DIR, `${pub.slug}.webp`);
  await sharp(tmpPng).webp({ quality: 82 }).toFile(outFile);

  fs.unlinkSync(tmpHtml);
  fs.unlinkSync(tmpPng);

  const size = fs.statSync(outFile).size;
  report.push({ ...pub, hasLogo, outFile: path.relative(REPO_ROOT, outFile), size });
}

await browser.close();

console.log('Tile generation report:');
let total = 0;
for (const r of report) {
  total += r.size;
  console.log(`  ${r.slug.padEnd(18)} ${r.hasLogo ? 'real logo    ' : 'fallback text'}  ${r.outFile}  (${(r.size / 1024).toFixed(1)} KB)`);
}
console.log(`Total: ${(total / 1024).toFixed(1)} KB across ${report.length} tiles`);
