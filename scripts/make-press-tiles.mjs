// Generates one 800x600 press-tile thumbnail per publisher into public/press/tiles/<slug>.webp.
// Run: node scripts/make-press-tiles.mjs (or: npm run press-tiles)
//
// Composes the tile as an SVG string (background + publisher logo or wordmark + Article/Podcast
// glyph) and pipes it through sharp to WebP. No browser involved — a flat tile doesn't need one.
//
// Idempotent: re-running regenerates every tile from scratch. Drop a real logo at
// public/press/<slug>.svg and re-run to swap that one publisher from a text wordmark to its
// real logo — no other change, no code edit required for that.
//
// Adding a brand-new publisher (item 8+) is one manifest line below plus one command; the
// palette and layout are already built and never need touching again.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const PUBLIC_PRESS_DIR = path.join(REPO_ROOT, 'public', 'press');
const TILES_DIR = path.join(PUBLIC_PRESS_DIR, 'tiles');

const WIDTH = 800;
const HEIGHT = 600;

// Palette: all five tiles drawn from theme.css's -300 step (the only step where every available
// hue clears 4.5:1 against an existing dark token). theme.css has no --blue-300, so the step
// offers 3 hues, not 5 — two are repeated below, placed so no two grid-adjacent tiles (see
// .media-grid's 2-col layout in media.astro) share a color. Verified contrast of --ink on each:
// sky-300 12.87:1, violet-300 9.61:1, magenta-300 8.98:1 (all >> 4.5:1 AA).
const PUBLISHERS = [
  { name: 'Digital News Asia', slug: 'digital-news-asia', type: 'Article', color: '#B4E0F4' }, // --sky-300
  { name: 'Biz.bio',           slug: 'biz-bio',           type: 'Article', color: '#BEB9DA' }, // --violet-300
  { name: 'e27',               slug: 'e27',               type: 'Article', color: '#D6A8D3' }, // --magenta-300
  { name: 'Malaysia SME+',     slug: 'malaysia-sme',      type: 'Article', color: '#B4E0F4' }, // --sky-300
  { name: 'BFM 89.9',          slug: 'bfm',               type: 'Podcast', color: '#BEB9DA' }, // --violet-300
];

// --ink
const TEXT_COLOR = '#15151F';

// Inner markup only (no outer <svg>/viewBox) — wrapped into a nested <svg width="56" height="56"
// viewBox="0 0 24 24"> at composition time below.
const GLYPHS = {
  Article: `<rect x="4" y="3" width="16" height="18" rx="2" stroke="${TEXT_COLOR}" stroke-width="1.6" fill="none"/><line x1="7.5" y1="8" x2="16.5" y2="8" stroke="${TEXT_COLOR}" stroke-width="1.6"/><line x1="7.5" y1="12" x2="16.5" y2="12" stroke="${TEXT_COLOR}" stroke-width="1.6"/><line x1="7.5" y1="16" x2="13" y2="16" stroke="${TEXT_COLOR}" stroke-width="1.6"/>`,
  Podcast: `<rect x="9" y="3" width="6" height="11" rx="3" stroke="${TEXT_COLOR}" stroke-width="1.6" fill="none"/><path d="M6 11a6 6 0 0 0 12 0" stroke="${TEXT_COLOR}" stroke-width="1.6" stroke-linecap="round" fill="none"/><line x1="12" y1="17" x2="12" y2="21" stroke="${TEXT_COLOR}" stroke-width="1.6"/><line x1="8.5" y1="21" x2="15.5" y2="21" stroke="${TEXT_COLOR}" stroke-width="1.6" stroke-linecap="round"/>`,
};

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Background + optional wordmark + glyph, as one SVG. The publisher logo (when present) is
// composited on top afterwards via sharp, rather than embedded in this markup, since sharp can
// rasterize the source SVG logo directly and .composite() it cleanly.
function backgroundSvg({ color, wordmark, glyphMarkup }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${color}"/>
  ${wordmark ? `<text x="${WIDTH / 2}" y="${HEIGHT / 2}" text-anchor="middle" dominant-baseline="middle" font-family="'Fraunces Variable','Fraunces',Georgia,serif" font-size="56" font-weight="500" fill="${TEXT_COLOR}">${escapeXml(wordmark)}</text>` : ''}
  <svg x="${WIDTH - 88}" y="${HEIGHT - 88}" width="56" height="56" viewBox="0 0 24 24">${glyphMarkup}</svg>
</svg>`;
}

fs.mkdirSync(TILES_DIR, { recursive: true });
const report = [];

for (const pub of PUBLISHERS) {
  const svgLogoPath = path.join(PUBLIC_PRESS_DIR, `${pub.slug}.svg`);
  const hasLogo = fs.existsSync(svgLogoPath);

  const bgSvg = backgroundSvg({
    color: pub.color,
    wordmark: hasLogo ? null : pub.name,
    glyphMarkup: GLYPHS[pub.type],
  });

  let pipeline = sharp(Buffer.from(bgSvg));

  if (hasLogo) {
    const logoBuffer = await sharp(svgLogoPath).resize(520, 280, { fit: 'inside' }).toBuffer();
    pipeline = pipeline.composite([{ input: logoBuffer, gravity: 'centre' }]);
  }

  const outFile = path.join(TILES_DIR, `${pub.slug}.webp`);
  await pipeline.webp({ quality: 82 }).toFile(outFile);

  const size = fs.statSync(outFile).size;
  report.push({ ...pub, hasLogo, outFile: path.relative(REPO_ROOT, outFile), size });
}

console.log('Tile generation report:');
let total = 0;
for (const r of report) {
  total += r.size;
  console.log(`  ${r.slug.padEnd(18)} ${r.hasLogo ? 'real logo    ' : 'fallback text'}  ${r.outFile}  (${(r.size / 1024).toFixed(1)} KB)`);
}
console.log(`Total: ${(total / 1024).toFixed(1)} KB across ${report.length} tiles`);
