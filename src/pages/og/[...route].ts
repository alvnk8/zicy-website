// Per-page Open Graph card generation (build-time, static PNGs at 1200x630).
// astro-og-canvas renders one branded card per key in ogPages -> dist/og/<key>.png.
// With output: 'static', this prerenders to static files (no runtime/SSR function).
//
// Frost-and-crystal tokens (locked): paper #F2F4F8 background with a faint violet frost
// gradient, ink #15151F title, ink-2 #515768 muted description (both AA on paper), Violet
// #6E63AC accent bar. Sky (#83C9EB) is NOT used for any text or meaningful icon. Fonts are the
// repo's brand families embedded from local buffers: Fraunces (title), Inter Tight (description).
import { OGImageRoute } from 'astro-og-canvas';
import { ogPages } from '../../data/og-pages';

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages: ogPages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    // The library template renders logo + title + description (no separate eyebrow row), so the
    // route's eyebrow leads the description with a middot to keep it on the card. No em dashes.
    description: `${page.eyebrow} · ${page.description}`,
    logo: { path: './public/zicy-logo.png', size: [260] },
    // Frost gradient: paper to a faint violet tint (decorative only).
    bgGradient: [
      [242, 244, 248],
      [228, 227, 240],
    ],
    // Violet brand accent bar on the leading edge.
    border: { color: [110, 99, 172], width: 16, side: 'inline-start' },
    padding: 72,
    fonts: [
      './og-assets/fonts/Fraunces.ttf',
      './og-assets/fonts/InterTight.ttf',
      './og-assets/fonts/JetBrainsMono.ttf',
    ],
    font: {
      title: {
        color: [21, 21, 31], // ink #15151F
        size: 60,
        lineHeight: 1.1,
        weight: 'SemiBold',
        families: ['Fraunces'],
      },
      description: {
        color: [81, 87, 104], // ink-2 #515768 (muted, AA on paper)
        size: 28,
        lineHeight: 1.4,
        weight: 'Normal',
        families: ['Inter Tight'],
      },
    },
    format: 'PNG',
  }),
});
