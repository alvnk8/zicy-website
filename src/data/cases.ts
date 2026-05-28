// Case-study data. One template (case-studies/[slug].astro) renders all five
// details; the index reads the same array. Clients stay ANONYMISED pending
// naming permission (build brief compile flag + §A2).

export interface ResultStat {
  n: string;
  l: string;
}
export interface CaseStudy {
  slug: string;
  indexMeta: string; // index row eyebrow
  eyebrow: string; // detail hero eyebrow
  indexTitle: string; // index row bold line
  big: string; // index row headline stat
  indexSub: string; // index row sub
  h1: string;
  metaTitle: string;
  metaDescription: string;
  challenge: string;
  approach: string;
  results: ResultStat[];
  pullQuote: string;
}

export const CASES: CaseStudy[] = [
  {
    slug: 'b2b-services',
    indexMeta: 'B2B services · 90 days',
    eyebrow: 'B2B services · 90 days',
    indexTitle: 'Full programme, no prior AI strategy',
    big: '56.67%',
    indexSub: 'mention rate · 2,971 AI sessions',
    h1: 'From invisible to AI-cited in 90 days.',
    metaTitle: 'Case study — B2B services: from invisible to AI-cited in 90 days',
    metaDescription:
      'A B2B services brand with no prior AI visibility strategy reached a 56.67% AI mention rate and 2,971 AI-referred sessions in 90 days.',
    challenge:
      'A B2B services brand with strong traditional search performance but effectively no presence in AI answers. When buyers asked AI about the category, competitors were named and the brand was not.',
    approach:
      'A full programme across all four stages — entity foundations, citation-ready content, earned-source guidance, and continuous measurement — built on the brand’s genuine expertise, with no manipulation tactics.',
    results: [
      { n: '56.67%', l: 'AI brand mention rate across tracked category queries' },
      { n: '2,971', l: 'AI-referred sessions from platform recommendations' },
      { n: '3', l: 'engines simultaneously: ChatGPT, Gemini, Perplexity' },
    ],
    pullQuote:
      'From not appearing at all to being named in more than half of relevant answers — in a single quarter.',
  },
  {
    slug: 'professional-services',
    indexMeta: 'Professional services · campaign',
    eyebrow: 'Professional services · campaign window',
    indexTitle: 'Authority earned from a near-zero baseline',
    big: '90.61%',
    indexSub: 'mention · 55.92% citation',
    h1: 'Authority earned from a near-zero baseline.',
    metaTitle: 'Case study — professional services: authority earned from near-zero',
    metaDescription:
      'A professional-services brand reached a 90.61% AI mention rate and 55.92% citation rate from a near-zero baseline.',
    challenge:
      'A professional-services firm that barely registered in AI answers, in a category where trust and credibility decide the shortlist.',
    approach:
      'Entity foundations and authority work executed in tandem — a clear, consistent brand entity plus genuine, citable expertise across the sources AI reads.',
    results: [
      { n: '90.61%', l: 'AI brand mention rate (named in roughly nine of ten relevant answers)' },
      { n: '55.92%', l: 'explicit citation rate in AI-generated answers' },
    ],
    pullQuote: 'Nine in ten relevant answers now name the brand — from a standing start.',
  },
  {
    slug: 'multi-category-content',
    indexMeta: 'Multi-category · content',
    eyebrow: 'Multi-category · content campaign',
    indexTitle: 'Content-led AI visibility',
    big: '290%',
    indexSub: 'more clicks · 18.11% SOV',
    h1: 'Content-led AI visibility.',
    metaTitle: 'Case study — content-led AI visibility: 290% more clicks',
    metaDescription:
      'A content-led AI visibility programme delivered 290% more clicks, 457% more impressions and 18.11% share of voice in a competitive category.',
    challenge:
      'A competitive category where being mentioned wasn’t enough — the brand needed to be the answer buyers acted on.',
    approach:
      'A structured content programme architected for extractability — the shapes AI surfaces (direct answers, comparisons, named frameworks, sourced statistics) — built on real expertise, not volume.',
    results: [
      { n: '290%', l: 'increase in clicks from AI search platforms' },
      { n: '457%', l: 'increase in impressions in AI-generated responses' },
      { n: '18.11%', l: 'share of voice in AI search' },
    ],
    pullQuote: 'Structured for how AI actually reads — and it showed up in the numbers.',
  },
  {
    slug: 'healthcare-aesthetics',
    indexMeta: 'Healthcare / aesthetics',
    eyebrow: 'Healthcare / aesthetics · post-implementation',
    indexTitle: 'Local category leadership',
    big: '#1',
    indexSub: 'AI mention position',
    h1: 'Local category leadership.',
    metaTitle: 'Case study — healthcare / aesthetics: local category leadership',
    metaDescription:
      'An aesthetic clinic brand reached the #1 AI mention position across its primary category queries, with a dominant share of voice and new enquiries from AI referrals.',
    challenge:
      'A local aesthetics brand competing against established names, in a category where buyers increasingly ask AI for a recommendation before they ever book.',
    approach:
      'Entity accuracy, citation-ready content for the exact questions patients ask, and consistent representation across the sources AI reads in the local market.',
    results: [
      { n: '#1', l: 'AI mention position across primary category queries' },
      { n: 'Dominant', l: 'share of voice vs. established competitors' },
      { n: 'New', l: 'patient enquiries directly attributable to AI platform referrals' },
    ],
    pullQuote: 'First name out of the model, in the category that matters locally.',
  },
  {
    slug: 'retail-home-decor',
    indexMeta: 'Retail / home decor',
    eyebrow: 'Retail / home decor · post-implementation',
    indexTitle: 'Cross-platform citation growth',
    big: '66%',
    indexSub: 'mention · 47% citation',
    h1: 'Cross-platform citation growth.',
    metaTitle: 'Case study — retail / home decor: cross-platform citation growth',
    metaDescription:
      'A retail / home-decor brand reached a 66% AI mention rate and 47% citation rate across multiple AI platforms.',
    challenge:
      'A retail brand visible on one platform but absent on others — inconsistent presence across the engines its customers actually use.',
    approach:
      'Visibility and sustained-presence work in tandem — answer-clear content plus consistent, accurate representation maintained across platforms over time.',
    results: [
      { n: '66%', l: 'AI brand mention rate across tracked queries' },
      { n: '47%', l: 'explicit citation rate (cited in nearly half of answers)' },
      { n: 'Multi', l: 'citation presence across AI platforms simultaneously' },
    ],
    pullQuote: 'Cited in nearly half of relevant answers, on every platform that matters.',
  },
];
