// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));

// Real last-commit date for a repo-relative source file, or undefined if it can't be
// determined (uncommitted file, git unavailable, etc). Never falls back to the build date.
function lastCommitDate(relFile) {
  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', relFile],
      { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }
    ).toString().trim();
    return out || undefined;
  } catch {
    return undefined;
  }
}

// Maps a sitemap URL's pathname to the repo-relative source file whose commit history
// represents that page's real content. Dynamic routes resolve to the data file that
// actually drives their content, not the shared template (which would give every
// generated page the same date). Returns undefined when no source file can be resolved.
function sourceFileFor(pathname) {
  if (pathname === '/') return 'src/pages/index.astro';
  if (pathname.startsWith('/case-studies/')) return 'src/data/cases.ts';
  if (pathname.startsWith('/resources/glossary/') && pathname !== '/resources/glossary/ai-reality-score') {
    return 'src/pages/resources/glossary/_glossary-data.ts';
  }
  const direct = `src/pages${pathname}.astro`;
  const indexFile = `src/pages${pathname}/index.astro`;
  if (existsSync(path.join(ROOT, direct))) return direct;
  if (existsSync(path.join(ROOT, indexFile))) return indexFile;
  return undefined;
}

const EXCLUDED_PATHS = new Set(['/legal/terms', '/legal/dpa', '/legal/cookies']);

// Static output (SSG): every page is pre-rendered to HTML at build time, so all
// content is present in the initial HTML for AI crawlers (GPTBot, ClaudeBot,
// PerplexityBot, Google-Extended, etc.). See the build brief's crawlability spec.
export default defineConfig({
  site: 'https://www.zicy.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !EXCLUDED_PATHS.has(new URL(page).pathname),
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const file = sourceFileFor(pathname);
        const lastmod = file ? lastCommitDate(file) : undefined;
        delete item.changefreq;
        delete item.priority;
        if (lastmod) {
          item.lastmod = lastmod;
        } else {
          delete item.lastmod;
        }
        return item;
      },
    }),
  ],
});
