// Per-publisher optical-weight scale multiplier for press logos. A 900x900 square badge and a
// 964x70 wordmark can't both be sized by width or by height alone, so each publisher gets an
// explicit multiplier here instead. Shared by the tile generator (scripts/make-press-tiles.mjs)
// and the logo wall (src/pages/media.astro) — tune by eye, one place per context.
export const LOGO_SCALE = {
  'digital-news-asia': 1.0,
  'e27': 0.85,
  'malaysia-sme': 1.0,
  'biz-bio': 0.8,
  'bfm': 0.6,
};

// Wall-specific override. The tile sizes a logo into a bounding box (width AND height), which
// tames an extreme aspect ratio on its own; the wall sizes by height only, so malaysia-sme's very
// wide/short wordmark read oversized there at LOGO_SCALE's 1.0. Falls back to LOGO_SCALE for any
// publisher not listed here.
export const LOGO_SCALE_WALL = {
  ...LOGO_SCALE,
  'malaysia-sme': 0.5,
};
