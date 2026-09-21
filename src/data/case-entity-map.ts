// Entity-graph fix 2026-09: which /solutions/{icp} service each case study proves, and which
// glossary term its headline metric/strategy best illustrates. Picked by reading each study's
// bodyHtml, not by guessing from the slug — see docs/entity-graph/implementation-2026-09.md for
// the per-case justification. No case study is a natural fit for the agencies or publishers ICP
// (none of the clients is itself an agency or a publisher), so those two never appear as `icp`
// here. Single source of truth: case-studies/[slug].astro reads it to set each Article's `about`,
// and each /solutions/{icp} page reads it (via casesForIcp) to set that Service node's `subjectOf`.
export const CASE_ENTITY_MAP: Record<string, { icp: string; term: string }> = {
  'ecommerce-531-ai-citations': { icp: 'brands', term: 'citation-coverage' },
  'ecommerce-ai-referred-traffic': { icp: 'brands', term: 'ai-visibility' },
  'ecommerce-ai-ready-content': { icp: 'brands', term: 'aeo' },
  'architectural-services-ai-citations': { icp: 'smb', term: 'citation-coverage' },
  'ecommerce-product-pages-ai-visibility': { icp: 'brands', term: 'ai-mention-coverage' },
  'ecommerce-ai-mention-coverage': { icp: 'brands', term: 'ai-mention-coverage' },
  'education-ai-share-of-voice': { icp: 'brands', term: 'ai-share-of-voice' },
  'ecommerce-ai-visibility-growth': { icp: 'brands', term: 'average-ai-ranking' },
  'aesthetic-clinic-ai-visibility': { icp: 'smb', term: 'ai-mention-coverage' },
  'b2b-advisory-ai-visibility': { icp: 'brands', term: 'ai-mention-coverage' },
  'b2b-services-prompt-level-visibility': { icp: 'brands', term: 'answer-intent-query' },
  'education-owned-earned-citations': { icp: 'pr', term: 'citation-coverage' },
  'b2b-services-90-day-ai-visibility': { icp: 'smb', term: 'prompt-tracking' },
  'commercial-interiors-ai-visibility': { icp: 'brands', term: 'entity-gap' },
  'b2b-electronics-ai-visibility': { icp: 'brands', term: 'average-ai-ranking' },
  'b2b-logistics-ai-procurement-filter': { icp: 'brands', term: 'ai-mention-coverage' },
  'aesthetic-clinic-ai-referred-purchases': { icp: 'brands', term: 'ai-share-of-voice' },
};

// Slugs mapped to a given ICP, in CASE_ENTITY_MAP's own key order (stable, not CASES's order).
export function caseSlugsForIcp(icp: string): string[] {
  return Object.entries(CASE_ENTITY_MAP)
    .filter(([, v]) => v.icp === icp)
    .map(([slug]) => slug);
}
