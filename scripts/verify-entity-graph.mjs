// One-off verification script for the 2026-09 entity-graph work. Reads the already-built
// dist/ HTML (SSG output = what a JS-disabled crawler sees) for a fixed list of URLs, extracts
// every application/ld+json block, flattens @graph arrays, and prints @type/@id per node plus a
// few pass/fail assertions. Not part of the build; run manually with `node scripts/verify-entity-graph.mjs`.
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(process.cwd(), 'dist');
const URLS = [
  '/', '/about', '/about/pava-framework', '/case-studies',
  '/case-studies/education-ai-share-of-voice', '/solutions/pr', '/pricing', '/media',
  '/resources/glossary', '/resources/glossary/ai-reality-score', '/legal/privacy', '/platform',
];

function htmlPathFor(url) {
  if (url === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, url.replace(/^\//, ''), 'index.html');
}

function extractNodes(html) {
  const nodes = [];
  const re = /<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs;
  let m;
  while ((m = re.exec(html))) {
    let json;
    try {
      json = JSON.parse(m[1]);
    } catch (e) {
      console.error('  !! JSON parse error in one block:', e.message);
      continue;
    }
    if (Array.isArray(json['@graph'])) nodes.push(...json['@graph']);
    else nodes.push(json);
  }
  return nodes;
}

const ORG_ID = 'https://www.zicy.com/#org';
let allOrgHasOrg = true;
let sameAsOk = true;
let glossary13 = null;

for (const url of URLS) {
  const p = htmlPathFor(url);
  console.log(`\n=== ${url}  (${p.replace(DIST, 'dist')}) ===`);
  if (!fs.existsSync(p)) {
    console.log('  MISSING FILE');
    continue;
  }
  const html = fs.readFileSync(p, 'utf-8');
  const nodes = extractNodes(html);
  const orgNode = nodes.find((n) => n['@id'] === ORG_ID);
  if (!orgNode) allOrgHasOrg = false;
  for (const n of nodes) {
    const t = Array.isArray(n['@type']) ? n['@type'].join(',') : n['@type'];
    console.log(`  ${t || '(no @type)'}${n['@id'] ? '  ' + n['@id'] : ''}`);
  }
  if (url === '/resources/glossary') {
    const set = nodes.find((n) => n['@type'] === 'DefinedTermSet');
    glossary13 = set ? set.hasDefinedTerm.length : 'NO SET FOUND';
  }
  if (orgNode) {
    const sameAs = orgNode.sameAs || [];
    if (sameAs.length !== 4 || sameAs.some((s) => s.includes('growth.pro') || s.includes('alvinkoay'))) {
      sameAsOk = false;
      console.log('  !! sameAs check failed:', JSON.stringify(sameAs));
    }
  }
}

console.log('\n=== ASSERTIONS ===');
console.log('#org present on all 12 pages:', allOrgHasOrg ? 'PASS' : 'FAIL');
console.log('#org.sameAs length 4, no growth.pro/alvinkoay (checked wherever #org appeared):', sameAsOk ? 'PASS' : 'FAIL');
console.log('glossary set hasDefinedTerm length (expect 13):', glossary13);
