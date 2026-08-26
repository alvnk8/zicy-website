// Generates one 800x600 press-tile thumbnail per publisher into public/press/tiles/<slug>.webp.
// Run: node scripts/make-press-tiles.mjs (or: npm run press-tiles)
//
// Composes the tile as an SVG string (neutral --surface field + Article/Podcast glyph) and
// composites the publisher's greyscaled logo on top via sharp, piped to WebP. No browser
// involved — a flat tile doesn't need one.
//
// All five publishers now have a real logo (public/press/<slug>.{svg,png,webp}), so there is one
// template only: neutral field, no tint, logo greyscaled at render. Each publisher's logo is
// scaled by its entry in LOGO_SCALE (src/data/press-logo-scale.mjs, shared with the logo wall in
// media.astro) so a 900x900 square badge and a 964x70 wordmark read at comparable optical weight
// instead of being sized by raw width or height alone.
//
// Idempotent: re-running regenerates every tile from scratch.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOGO_SCALE } from '../src/data/press-logo-scale.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const PUBLIC_PRESS_DIR = path.join(REPO_ROOT, 'public', 'press');
const TILES_DIR = path.join(PUBLIC_PRESS_DIR, 'tiles');

const WIDTH = 800;
const HEIGHT = 600;

// Base logo bounding box before the per-publisher LOGO_SCALE multiplier is applied.
const BASE_LOGO_WIDTH = 520;
const BASE_LOGO_HEIGHT = 280;

const PUBLISHERS = [
  { name: 'Digital News Asia', slug: 'digital-news-asia', type: 'Article' },
  { name: 'Biz.bio',           slug: 'biz-bio',           type: 'Article' },
  { name: 'e27',               slug: 'e27',               type: 'Article' },
  { name: 'Malaysia SME+',     slug: 'malaysia-sme',      type: 'Article' },
  { name: 'BFM 89.9',          slug: 'bfm',               type: 'Podcast' },
];

// --ink, for the glyph only.
const TEXT_COLOR = '#15151F';

// --surface, the tile's neutral field. No tint.
const SURFACE_COLOR = '#FFFFFF';

const LOGO_EXTENSIONS = ['.svg', '.png', '.webp'];

function findLogoFile(slug) {
  for (const ext of LOGO_EXTENSIONS) {
    const candidate = path.join(PUBLIC_PRESS_DIR, `${slug}${ext}`);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

// Inner markup only (no outer <svg>/viewBox) — wrapped into a nested <svg width="56" height="56"
// viewBox="0 0 24 24"> at composition time below.
const GLYPHS = {
  Article: `<rect x="4" y="3" width="16" height="18" rx="2" stroke="${TEXT_COLOR}" stroke-width="1.6" fill="none"/><line x1="7.5" y1="8" x2="16.5" y2="8" stroke="${TEXT_COLOR}" stroke-width="1.6"/><line x1="7.5" y1="12" x2="16.5" y2="12" stroke="${TEXT_COLOR}" stroke-width="1.6"/><line x1="7.5" y1="16" x2="13" y2="16" stroke="${TEXT_COLOR}" stroke-width="1.6"/>`,
  Podcast: `<rect x="9" y="3" width="6" height="11" rx="3" stroke="${TEXT_COLOR}" stroke-width="1.6" fill="none"/><path d="M6 11a6 6 0 0 0 12 0" stroke="${TEXT_COLOR}" stroke-width="1.6" stroke-linecap="round" fill="none"/><line x1="12" y1="17" x2="12" y2="21" stroke="${TEXT_COLOR}" stroke-width="1.6"/><line x1="8.5" y1="21" x2="15.5" y2="21" stroke="${TEXT_COLOR}" stroke-width="1.6" stroke-linecap="round"/>`,
};

// Neutral field + glyph, as one SVG. The logo is composited on top afterwards via sharp.
function backgroundSvg(glyphMarkup) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${SURFACE_COLOR}"/>
  <svg x="${WIDTH - 88}" y="${HEIGHT - 88}" width="56" height="56" viewBox="0 0 24 24">${glyphMarkup}</svg>
</svg>`;
}

fs.mkdirSync(TILES_DIR, { recursive: true });
const report = [];

for (const pub of PUBLISHERS) {
  const logoPath = findLogoFile(pub.slug);
  if (!logoPath) {
    throw new Error(`No logo file found for ${pub.slug} (checked ${LOGO_EXTENSIONS.map((e) => pub.slug + e).join(', ')})`);
  }

  const scale = LOGO_SCALE[pub.slug] ?? 1.0;
  const logoBuffer = await sharp(logoPath)
    .resize(Math.round(BASE_LOGO_WIDTH * scale), Math.round(BASE_LOGO_HEIGHT * scale), { fit: 'inside' })
    .grayscale()
    .toBuffer();

  const bgSvg = backgroundSvg(GLYPHS[pub.type]);
  const pipeline = sharp(Buffer.from(bgSvg)).composite([{ input: logoBuffer, gravity: 'centre' }]);

  const outFile = path.join(TILES_DIR, `${pub.slug}.webp`);
  await pipeline.webp({ quality: 82 }).toFile(outFile);

  const size = fs.statSync(outFile).size;
  report.push({ ...pub, logoFile: path.relative(REPO_ROOT, logoPath), scale, outFile: path.relative(REPO_ROOT, outFile), size });
}

console.log('Tile generation report:');
let total = 0;
for (const r of report) {
  total += r.size;
  console.log(`  ${r.slug.padEnd(18)} scale ${r.scale.toFixed(2)}  ${r.logoFile.padEnd(28)}  ${r.outFile}  (${(r.size / 1024).toFixed(1)} KB)`);
}
console.log(`Total: ${(total / 1024).toFixed(1)} KB across ${report.length} tiles`);
