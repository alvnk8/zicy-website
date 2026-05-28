// @ts-check
import { defineConfig } from 'astro/config';

// Static output (SSG): every page is pre-rendered to HTML at build time, so all
// content is present in the initial HTML for AI crawlers (GPTBot, ClaudeBot,
// PerplexityBot, Google-Extended, etc.). See the build brief's crawlability spec.
export default defineConfig({
  site: 'https://www.zicy.com',
  output: 'static',
  trailingSlash: 'never',
});
