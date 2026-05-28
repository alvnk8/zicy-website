// ICP solution-page data. One template (solutions/[icp].astro) renders all four.
// Copy is the source of truth from the copy deck §3–6.

export interface Module {
  name: string;
  desc: string;
}
export interface WhyItem {
  lead: string;
  desc: string;
}
/**
 * A screenshot slot — either a real embed (when src is set) or a placeholder labelled by desc.
 * Real embeds require alt text (AEO/AI-crawler signal per the brief Part 4).
 */
export interface ScreenshotRef {
  desc: string;
  src?: string;
  alt?: string;
  caption?: string;
}

export interface Icp {
  slug: 'brands' | 'pr' | 'agencies' | 'publishers';
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSub: string;
  heroCta: { label: string; href: string };
  sectionEyebrow: string; // "The risk" / "The opportunity"
  sectionH2: string;
  sectionSub: string;
  modules: Module[];
  screenshots: ScreenshotRef[];
  whyHeading: string;
  why: WhyItem[];
  band: { heading: string; ctaLabel: string; ctaHref: string };
}

export const ICPS: Icp[] = [
  {
    slug: 'brands',
    eyebrow: 'For brands',
    metaTitle: "Zicy for brands — AI is your brand's new first impression",
    metaDescription:
      "Every day, buyers ask AI about your category. Zicy shows what AI says about your brand, whether it's true, and how to fix what's wrong — across every engine.",
    h1: 'AI is your brand’s new first impression.',
    heroSub:
      'Is it the brand you built? Every day, buyers, partners and journalists ask AI about your category. Zicy shows what it says about you, whether it’s accurate, and how to fix what’s wrong.',
    heroCta: { label: 'Run a free audit', href: '/audit' },
    sectionEyebrow: 'The risk',
    sectionH2: 'You can’t manage what you can’t see.',
    sectionSub:
      'If AI misdescribes you — or names a competitor in your place — the decision is shaped before anyone reaches your site. You won’t see it in your analytics, because the conversation never touched them.',
    modules: [
      { name: 'Brand Intelligence', desc: 'How AI describes you across engines, where it’s wrong, and the entity gaps behind low confidence.' },
      { name: 'AI Visibility', desc: 'Your mention coverage, citation rate and share of voice against the competitors you actually worry about.' },
      { name: 'Brand Sentiment', desc: 'The language AI attaches to your brand, and the sources moving it.' },
    ],
    screenshots: [
      // Needs Brand Intelligence module capture (gap in brief Part 2) — placeholder for now.
      { desc: 'Brand Intelligence report — perception + AI Reality Score' },
      // #2 competitive-ai-performance.png — needs de-brand + mask rivals before embedding.
      { desc: 'Competitive AI Performance — vs. named rivals' },
    ],
    whyHeading: 'Why brands choose Zicy',
    why: [
      { lead: 'See the truth first', desc: 'Catch a hallucination or an outdated claim before it costs you a deal.' },
      { lead: 'Defend the category', desc: 'Know exactly where a competitor is winning the answer, and why.' },
      { lead: 'One number for the board', desc: 'Share of voice in AI search, tracked over time.' },
    ],
    band: { heading: 'See your brand the way AI describes it.', ctaLabel: 'Run a free audit', ctaHref: '/audit' },
  },
  {
    slug: 'pr',
    eyebrow: 'For PR agencies',
    metaTitle: 'Zicy for PR — reputation is now decided inside AI answers',
    metaDescription:
      'Measure how AI describes your client, move it with the coverage you earn, and prove that earned media changed the answer. Zicy for PR and communications teams.',
    h1: 'Reputation is now decided inside AI answers.',
    heroSub:
      'Measure it. Move it. Prove it. When a buyer asks AI about your client, the answer is built from the coverage and sources AI trusts. Zicy shows you what that answer is — and whether the work you do is changing it.',
    heroCta: { label: 'Run a free audit', href: '/audit' },
    sectionEyebrow: 'The risk',
    sectionH2: 'Coverage you can’t connect to an outcome is coverage you can’t defend.',
    sectionSub:
      'Clippings and impressions no longer tell the story. The question clients now ask is simpler and harder: did it change what AI says about us?',
    modules: [
      { name: 'Citation Analysis', desc: 'Which sources AI cites about your client, owned vs. earned vs. competitor — and where the narrative is being hijacked.' },
      { name: 'Brand & Competitor Sentiment', desc: 'The language AI attaches to your client and their rivals, tracked over time.' },
      { name: 'AI Visibility', desc: 'Mention coverage and share of voice, so you can show movement after a campaign lands.' },
    ],
    screenshots: [
      // #7 citation-analysis-overview.png — needs de-brand before embedding.
      { desc: 'Citation Analysis — owned / earned / hijacked split' },
      // #3 competitor-sentiment-profiles.png — needs de-brand + mask rivals.
      { desc: 'Competitor Sentiment Profiles' },
    ],
    whyHeading: 'Why PR teams choose Zicy',
    why: [
      { lead: 'Prove earned media works', desc: 'Connect the coverage you land to movement in AI answers.' },
      { lead: 'Catch a hijack early', desc: 'See when a competitor or a hostile source is owning your client’s narrative.' },
      { lead: 'Report with confidence', desc: 'A measurable reputation metric, not a clippings book.' },
    ],
    band: { heading: 'Show the coverage moved the answer.', ctaLabel: 'Run a free audit', ctaHref: '/audit' },
  },
  {
    slug: 'agencies',
    eyebrow: 'For marketing & creative agencies',
    metaTitle: 'Zicy for agencies — AI visibility, audited, fixed and proven. White-label.',
    metaDescription:
      'Add AI visibility to your service line. Audit a client, fix what’s broken, and prove the result — white-labelled under your brand. Zicy for marketing, creative and media agencies.',
    h1: 'AI visibility — audited, fixed and proven.',
    heroSub:
      'White-label it. Add a new, defensible service line to your agency: audit a client’s AI visibility, fix what’s broken, and prove the result — all under your brand.',
    heroCta: { label: 'Run a free audit', href: '/audit' },
    sectionEyebrow: 'The opportunity',
    sectionH2: 'Your clients are already asking about AI search. Have the answer.',
    sectionSub:
      'AEO/GEO is the brief no one on the roster owns yet. Zicy gives your team the intelligence, the remediation tooling and the reporting to own it — without building a platform.',
    modules: [
      { name: 'AI Visibility + Competitive Performance', desc: 'A clear scoreboard you can put in front of any client.' },
      { name: 'Visibility Gaps + Action Center', desc: 'The prioritised fix list, plus the schema, llms.txt and content tooling to close it.' },
      { name: 'White-label reporting', desc: 'Your brand on the dashboard and the deliverables.' },
    ],
    screenshots: [
      // #1 ai-visibility-dashboard.png — needs de-brand before embedding.
      { desc: 'AI Visibility dashboard' },
      // #16 visibility-gaps.png — needs crop URLs + de-brand.
      { desc: 'Visibility Gaps + Action Center' },
    ],
    whyHeading: 'Why agencies choose Zicy',
    why: [
      { lead: 'A new revenue line', desc: 'Productise AI visibility as a retainer or a one-off audit.' },
      { lead: 'No build cost', desc: 'The platform and the methodology already exist.' },
      { lead: 'Win the pitch', desc: 'Walk in with the client’s real AI visibility, not a generic deck.' },
    ],
    band: { heading: 'Make AI visibility your next service line.', ctaLabel: 'Talk to us about white-label', ctaHref: '/pricing' },
  },
  {
    slug: 'publishers',
    eyebrow: 'For publishers',
    metaTitle: "Zicy for publishers — if AI doesn't recognise your content, neither will your audience",
    metaDescription:
      'See whether AI attributes your journalism and content — or strips the credit. Zicy shows publishers how AI cites, paraphrases or ignores their work, and how to fix it.',
    h1: 'If AI doesn’t recognise your content, your audience won’t either.',
    heroSub:
      'AI answers are built on content — often yours. Zicy shows whether AI attributes your work, paraphrases it without credit, or ignores it entirely — and what to do about it.',
    heroCta: { label: 'Run a free audit', href: '/audit' },
    sectionEyebrow: 'The risk',
    sectionH2: 'Your work is in the answer. Your name might not be.',
    sectionSub:
      'When AI summarises your reporting without citing you, the audience and the authority both go elsewhere. You can’t fix what you can’t see.',
    modules: [
      { name: 'Citation Analysis', desc: 'Where your content is cited, paraphrased or stripped of credit, by source and by topic.' },
      { name: 'Key Topics Analysis', desc: 'The topics where you should own the answer — and whether you do.' },
      { name: 'Site Audit', desc: 'Whether your site is technically readable by AI crawlers: llms.txt, bot access, schema.' },
    ],
    screenshots: [
      // #9 citation-analysis-urls.png — verified safe (third-party domains only, no Prudential).
      {
        desc: 'Citation Analysis — domain / URL drill-down',
        src: 'citation-analysis-urls.png',
        alt: 'Zicy Citation Analysis drilling into the domains and individual URLs AI cites, classified as owned, earned or competitor.',
        caption: 'Citation Analysis — drill down to the exact URLs AI is citing.',
      },
      // #6 key-topics-leaders.png — needs de-brand + mask rivals.
      { desc: 'Key Topics — Leaders / Battlegrounds / Blind Spots' },
    ],
    whyHeading: 'Why publishers choose Zicy',
    why: [
      { lead: 'Defend attribution', desc: 'See exactly where your work is used without credit.' },
      { lead: 'Own your topics', desc: 'Know where you lead the answer and where you’ve been displaced.' },
      { lead: 'Be machine-readable', desc: 'Make sure AI can actually find and attribute you.' },
    ],
    band: { heading: 'See whether AI gives you the credit.', ctaLabel: 'Run a free audit', ctaHref: '/audit' },
  },
];
