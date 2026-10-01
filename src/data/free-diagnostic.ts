// Copy for the free-diagnostic vs full-report comparison section (FreeDiagnostic.astro).
// Rows are checked against the real product; see the spec's "What the full report adds" table
// (free-diagnostic-open-report.md) for the evidence behind each cell. Word for word: do not reword.
//
// House rules enforced here: sentence case, no em dashes, straight apostrophes, no banned
// vocabulary. The comparison must not claim more engines, Perplexity, scheduled runs or anything
// else not in the spec's table.

export const compareEyebrow = 'Free audit vs full report';
export const compareHeading = 'Free audit vs full brand intelligence report';
export const compareIntro =
  'The free audit is a snapshot of accuracy. The full report in the Zicy app goes further into how AI understands, describes and recommends your brand, what is missing, and what to fix.';

export const compareColumns = {
  what: 'What you get',
  free: 'Free audit',
  full: 'Full report',
} as const;

export interface CompareRow {
  what: string;
  free: string;
  full: string;
}

// The free "Questions asked" cell is filled at build/runtime from the live query count (n).
// Fallback used when no queryCount above 0 is available.
export const QUESTIONS_ROW_FALLBACK = 'A short set of questions and 1 fact check';

// Template for the live count: the page replaces "{n}" with the query count.
export const QUESTIONS_ROW_TEMPLATE = '{n} questions and 1 fact check';

export const compareRows: CompareRow[] = [
  {
    what: 'Questions asked',
    free: QUESTIONS_ROW_FALLBACK,
    full: '13 questions about your brand, plus questions about the problems you solve, plus a fact check',
  },
  {
    what: 'Scores',
    free: 'One AI Reality Score',
    full: 'Perception, coverage and alignment scores',
  },
  {
    what: 'How AI describes you',
    free: 'Not included',
    full: "What you're known for, what you want to be known for, and what's missing or wrong",
  },
  {
    what: 'When AI recommends you',
    free: 'Not included',
    full: 'The use cases AI suggests you for, and the ones it misses',
  },
  {
    what: 'Visibility without your name',
    free: 'Not included',
    full: 'Whether you come up when people ask about their problem, not your brand',
  },
  {
    what: 'What AI gets wrong',
    free: 'Top 3',
    full: 'Every error, which you can confirm or dismiss',
  },
  {
    what: 'What to fix',
    free: 'Top 3',
    full: 'A full action plan, ranked by priority and impact',
  },
  {
    what: 'Sources',
    free: 'Not included',
    full: 'The pages AI cites for each answer',
  },
  {
    what: 'Brand relationships',
    free: 'Not included',
    full: 'A map of the people, products and companies AI links to you',
  },
  {
    what: 'Tracking over time',
    free: 'One run',
    full: 'Score trends across every run, plus PDF export',
  },
];

// Copy for the sign-up section that follows the comparison. The heading is filled
// at runtime with the report's brand name (the page replaces "{brandName}").
export const signupHeadingTemplate = 'Get the full report for {brandName}';
export const signupBody =
  'Start your 7-day free trial and run the full brand intelligence report on the four engines above.';
export const signupButtonLabel = 'Start your 7-day free trial';
export const signupSmallPrint = 'No card required.';

// ---------------------------------------------------------------------------
// Page copy added for the free AI brand audit page (AEO rebuild).
// ---------------------------------------------------------------------------

// Engines the free audit checks, in house-style order. Single source for every sentence below
// that names them. TODO: the app's engine list is expected to change; edit here only.
export const ENGINES = ['ChatGPT', 'Gemini', 'Google AI Overviews', 'Google AI Mode'];
export const ENGINES_TEXT = ENGINES.slice(0, -1).join(', ') + ' and ' + ENGINES[ENGINES.length - 1];
const COUNT_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
export const ENGINE_COUNT_WORD = COUNT_WORDS[ENGINES.length] ?? String(ENGINES.length);

export const auditLede =
  `Zicy's free AI brand audit checks what ${ENGINES_TEXT} say about your brand, compares it with the facts on your website, and gives you an AI Reality Score in about five minutes. No account, no credit card.`;

export const knowEyebrow = 'Why run it';
export const knowHeading = 'Does AI know your brand, or just think it does?';
export const knowParagraphs = [
  'Your brand may already show up in AI answers. Visibility is not the same as understanding.',
  'An AI engine can know your name and still misdescribe what you do. It can miss important company facts, skip your brand in questions you should own, or hand a customer information that is out of date.',
];
export const knowListIntro = `The free audit is a quick reality check across ${ENGINE_COUNT_WORD} engines. You will see:`;
export const knowList = [
  'Your AI Reality Score, a single measure of how accurately AI understands your brand',
  'Accuracy by engine, so you know which platform has the clearest picture of your business',
  'Brand recognition: whether your brand appeared when we tested it',
  "Hallucination risk: where AI's understanding may be unreliable",
  'What AI gets wrong: the top three facts that are incorrect or missing',
];
export const knowCtaLabel = 'Run your free AI brand audit';

export const howEyebrow = 'How it works';
export const howHeading = 'How the free audit works';
export const howSteps = [
  'Enter your brand name and website. Category and market are optional and sharpen the questions.',
  'Zicy asks each engine a set of questions about your brand and runs one fact check, then compares every answer with what your website states.',
  'You get your AI Reality Score, accuracy by engine, the top three errors and the top three fixes. Results stay on this page; nothing is emailed.',
];

export const revealEyebrow = 'Your report';
export const revealHeading = 'What your report can reveal';
export const revealIntro = 'Your website tells one story. AI may be telling another. A free run can show:';
export const revealList = [
  'AI knows you. Your brand appears across several engines.',
  'AI misses you. An engine does not recognise your brand for the questions tested.',
  'AI gets something wrong. A company fact is incorrect or missing.',
  'Engines disagree. One platform understands your brand far better than another.',
];
export const revealClosing = 'Being visible in AI search is useful. Being visible for the wrong reasons is not.';
export const revealCtaLabel = 'See how AI sees my brand';

export const faqEyebrow = 'FAQ';
export const faqHeading = 'Frequently asked questions';

// TODO: the engine list is expected to change; edit ENGINES above and this note together.
// The full report does not include Perplexity either, per the owner's correction of the brief.
const engineAnswer = `The free audit checks ${ENGINES_TEXT}. Perplexity is not included in the free audit or the full report. Results are broken down by engine because the same brand is often understood differently on each one.`;

export interface FaqItem {
  q: string;
  a: string;
}

// Answers may carry inline <a> links (FaqAccordion renders via set:html). The FAQPage JSON-LD
// uses faqPlainText() so the markup text matches the visible text exactly.
export const faqs: FaqItem[] = [
  {
    q: 'What is an AI brand audit?',
    a: `An AI brand audit checks how AI engines understand and represent a brand. Zicy's free audit asks ${ENGINES_TEXT} about your brand, compares the answers with the facts on your website, and reports where AI is accurate, where it is wrong and where it does not recognise you. It is a point-in-time snapshot, not the full brand perception analysis in Zicy's brand intelligence report.`,
  },
  {
    q: 'Which AI engines does the free audit check?',
    a: engineAnswer,
  },
  {
    q: 'What is the AI Reality Score?',
    a: `The AI Reality Score is Zicy's per-engine accuracy metric, a score from 0 to 100 measuring how accurately AI engines describe a brand across its tracked prompt set, where 100 means every tracked response was factually correct. The free audit gives you one score from the questions it asked. The full definition and how to move it are on the <a href="/platform/ai-reality-score">AI Reality Score page</a>.`,
  },
  {
    q: 'Can I check what ChatGPT says about my company?',
    a: 'Yes. The audit includes ChatGPT and shows whether it recognised your brand in the questions tested and whether the facts it gave were accurate. This is a one-off check. Daily monitoring of how ChatGPT describes you needs the full Zicy platform.',
  },
  {
    q: 'What is the difference between AI visibility and AI accuracy?',
    a: 'AI visibility is whether your brand appears in AI answers. AI accuracy is whether what the engine says about you is true. A brand can have strong visibility and poor accuracy: the engine names the company and then gets the facts wrong. The free audit measures both, with the emphasis on accuracy, because a mention is only worth as much as the claim attached to it.',
  },
  {
    q: 'What is an AI brand hallucination?',
    a: 'An AI brand hallucination is when an engine states something about your brand that the facts do not support, such as a wrong founding year, a discontinued product or a price you never charged. It is different from a missing fact. The audit flags both, and separates them, so you know whether the problem is a gap or an error. See the glossary entry on <a href="/resources/glossary/hallucination">hallucination</a>.',
  },
  {
    q: 'How long does it take, what does it cost, and how often can I run it?',
    a: 'About five minutes. It is free with no account or credit card. Each domain can run one free audit every 30 days. Rerunning after you fix something shows you whether the engines picked up the change.',
  },
  {
    q: 'Is this an AI brand monitoring or tracking tool?',
    a: `No. Monitoring and tracking watch a brand across many prompts over time. The free audit answers a narrower question: what do these ${ENGINE_COUNT_WORD} engines understand about my brand today. Zicy's full platform does the daily tracking, the wider prompt set and the source analysis.`,
  },
];

export const faqPlainText = (html: string) => html.replace(/<[^>]+>/g, '');

export const closingHeading = 'Get the full report for your brand';
export const closingBody = 'Start your 7-day free trial and run the full brand intelligence report.';

// Build-time date for the freshness line and WebPage.dateModified.
const buildDate = new Date();
export const buildDateIso = buildDate.toISOString().slice(0, 10);
export const buildDateLabel = buildDate.toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});
