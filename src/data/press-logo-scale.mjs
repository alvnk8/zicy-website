// Per-publisher optical-weight scale multiplier for press logos. A 900x900 square badge and a
// 964x70 wordmark can't both be sized by width or by height alone, so each publisher gets an
// explicit multiplier here instead. Shared by the tile generator (scripts/make-press-tiles.mjs)
// and the logo wall (src/pages/media.astro) so the two stay in sync — tune by eye, one place.
export const LOGO_SCALE = {
  'digital-news-asia': 1.0,
  'e27': 0.85,
  'malaysia-sme': 1.0,
  'biz-bio': 0.8,
  'bfm': 0.6,
};
