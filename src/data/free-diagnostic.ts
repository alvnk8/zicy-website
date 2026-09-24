// Copy for the free-diagnostic vs full-report comparison section (FreeDiagnostic.astro).
// Rows are checked against the real product; see the spec's "What the full report adds" table
// (free-diagnostic-open-report.md) for the evidence behind each cell. Word for word: do not reword.
//
// House rules enforced here: sentence case, no em dashes, straight apostrophes, no banned
// vocabulary. The comparison must not claim more engines, Perplexity, scheduled runs or anything
// else not in the spec's table.

export const compareEyebrow = 'Free report vs full report';
export const compareHeading = "This is the short version. Here's what the full report adds.";
export const compareIntro =
  'The full brand intelligence report in the Zicy app asks more questions and shows how AI describes you, not only whether it gets your facts right.';

export const compareColumns = {
  what: 'What you get',
  free: 'Free report',
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
    free: 'One reality score',
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
