// Single source of FAQ data for the four /solutions ICP pages (v4 model).
//
// Architecture:
//   - `universalFaqs`  — the segment-neutral questions every ICP asks with the same answer.
//                        Rendered on ALL four solution pages, BENEATH each page's specific block,
//                        and defined ONCE here (never copied per page).
//   - per-page arrays  — only that buyer's distinctive concerns (brands 6, pr 8, agencies 11,
//                        publishers 14). Rendered FIRST on each page.
//
// Each page's FAQPage JSON-LD = its specific Q&As + the universal Q&As, in that order, so the
// structured data always matches the answers visible on the page. Answers are static HTML
// (server-rendered by the shared FaqAccordion component) — never client-injected.
//
// House rules enforced here: sentence case, no exclamation marks, every statistic carries
// publisher + sample + year inline verbatim, five engines named consistently (ChatGPT, Gemini,
// Perplexity, Google AI Overview, Google AI Mode), no banned vocabulary (hijack / hijack rate /
// leaked rate / Answer Share / AI Butler / co-pilot / AEO Specialist / Citation Velocity /
// real-time), no Growth.pro IP names (PAVA, AICE, AI Visibility Operating System).

export interface Faq {
  q: string;
  a: string;
}

// ---------------------------------------------------------------------------------------------
// UNIVERSAL — heading on every page: "General questions about Zicy and AI visibility".
// Segment-neutral wording is intentional; do not rewrite to "your brand" / "your client".
//
// LIVE = 10 questions. The data-safety / DPA question is HELD (see the commented block below the
// array): it must not ship with the bracketed placeholder text. When a human resolves it against
// /legal/dpa, move that entry into this array (after the Penang question) → live becomes 11.
// ---------------------------------------------------------------------------------------------
export const universalFaqs: Faq[] = [
  {
    q: `What is AI visibility?`,
    a: `AI visibility is how often, how accurately, and how prominently a name appears in the answers AI engines give when people ask about its category — across ChatGPT, Gemini, Perplexity, Google AI Overview and Google AI Mode. It is distinct from search rankings: something can rank on Google's first page and still be absent from the AI answer.`,
  },
  {
    q: `What is AEO or GEO?`,
    a: `AEO (answer engine optimisation) and GEO (generative engine optimisation) are the practices of making a name accurately findable and citable in AI-generated answers, rather than ranked in a list of links. They address AI engines — ChatGPT, Gemini, Perplexity, Google AI Overview and Google AI Mode — where SEO addresses traditional search results.`,
  },
  {
    q: `How is AI visibility different from SEO?`,
    a: `SEO optimises where pages rank in a list of links; AI visibility determines whether a name is mentioned and cited in a synthesised answer. They run on different signals — only 12% of AI-cited links also rank in Google's top 10 (Ahrefs, 15,000 prompts, 2025) — so a strong SEO position does not guarantee a place in the answer.`,
  },
  {
    q: `What is AI Share of Voice?`,
    a: `AI Share of Voice is the percentage of AI answers in a category that mention a given name, measured against a tracked competitor set. It is the headline metric Zicy reports, because it reflects the answers people act on rather than the rankings or impressions older metrics counted.`,
  },
  {
    q: `Which AI engines does Zicy track?`,
    a: `Zicy tracks five engines: ChatGPT, Gemini, Perplexity, Google AI Overview and Google AI Mode. Each weights sources differently, so coverage across all five — rather than any single one — is what gives a defensible picture.`,
  },
  {
    q: `How does Zicy know what the AI said — does it scrape, and is it reliable week to week?`,
    a: `Measurement uses legitimate API access where available and respects platform terms of service — no machine-generated rank-checking traffic. Tracking is weekly by design, because answer engines evolve gradually; weekly surfaces meaningful shifts and filters out the noise daily tracking would invent.`,
  },
  {
    q: `How quickly does AI visibility change once you act?`,
    a: `AI visibility shifts gradually rather than overnight, because the engines rebuild entity understanding and retrieval over time rather than on a fixed schedule. Zicy tracks weekly so you can watch movement against a baseline as fixes, content and earned coverage take effect, rather than waiting for a single before-and-after snapshot.`,
  },
  {
    q: `Could using this get us penalised by Google?`,
    a: `No — the approach is the opposite of manipulation. Zicy's tooling is built to current best practice and aligned with Google's May 2026 spam-policy update covering AI Overview and AI Mode; the work is to make genuine expertise easier for AI to find, verify and trust, not to game it.`,
  },
  {
    q: `What does it cost, and what are we locked into?`,
    a: `Plans run from $129 a month (Starter) to $349 (Growth), with custom Enterprise; Starter and Growth include a 7-day trial, the annual plan gives thirteen months for twelve. The platform is self-serve with no lock-in.`,
  },
  {
    q: `Why a tool built in Penang rather than a US platform?`,
    a: `Because coverage in your markets and languages is the starting point here, not an afterthought. APAC-native coverage across all five engines and the languages your buyers actually use is built in, and Zicy operates under Malaysia Digital status.`,
  },
];

// HOLD: resolve DPA specifics before shipping.
// Do NOT add this to `universalFaqs` (live render or JSON-LD) until a human replaces the
// bracketed text with the actual OAuth scope, data residency and retention against /legal/dpa.
// This is a procurement gate for enterprise buyers and must not ship as a generic reassurance.
// When resolved, splice it in after the Penang question (live universal → 11).
// {
//   q: `Is our data safe if we connect GA4 and Search Console?`,
//   a: `The connections are read-only and used only to tie AI visibility to your own traffic. [TO CONFIRM against /legal/dpa — state the actual OAuth scope, data residency and retention rather than a generic reassurance; this is a procurement gate for enterprise buyers and must not ship as a generic line.]`,
// },

// ---------------------------------------------------------------------------------------------
// BRANDS — heading: "Questions brands ask" (6). Ahrefs figures are the 2026 revision; no
// "65% / 75,000+ queries / 2025" string anywhere.
// ---------------------------------------------------------------------------------------------
export const brandsFaqs: Faq[] = [
  {
    q: `How do I know what AI is saying about us right now?`,
    a: `You start a free trial and see it in minutes — where you're named, cited, described inaccurately, or replaced by a rival, across all five engines. It surfaces the conversation that never touches your analytics, because it happens before the buyer reaches your site.`,
  },
  {
    q: `Do our buyers really choose this way, or is this overstated?`,
    a: `The behaviour is already mainstream: 62% of consumers trust AI tools to guide brand decisions (Yext / Researchscape, n=2,237, 2025), 45% of B2B buyers used generative AI to research vendors and products in a recent purchase (Gartner, n=645 B2B buyers, 2025), and 65% of CMOs expect AI to dramatically change their role within two years (Gartner, n=402, 2025). The question has shifted from whether buyers ask AI to whether your brand is in the answer when they do.`,
  },
  {
    q: `Isn't our SEO team already handling this?`,
    a: `No, and that's the common trap. Only 12% of AI-cited links also rank in Google's top 10 (Ahrefs, 15,000 prompts, 2025), and just 38% of AI Overview citations now come from pages ranking in the top 10 — down from 76% a year earlier (Ahrefs, 863,000 keywords, 2026). A strong Google position no longer guarantees a place in the answer; AI visibility runs on different signals.`,
  },
  {
    q: `We already pay for a tracker or a mention monitor. What does Zicy add?`,
    a: `Most tools tell you whether you were named; Zicy tells you whether what AI said was true, why, and how to fix it — then connects the fix to demand. That's the full loop rather than a dashboard that stops at the scoreboard, and the truth layer is the part no measure-only tool runs.`,
  },
  {
    q: `What if the AI is simply wrong about us?`,
    a: `That's the problem Zicy was built for. The AI Reality Score flags hallucinations, outdated claims and wrong facts before a buyer sees them — a mention is worth little if the claim attached to it is false.`,
  },
  {
    q: `How do I justify this to my CFO?`,
    a: `You give them one board-ready number — your AI Share of Voice over time — and the proof layer that connects AI-referred sessions and branded-search behaviour back to the work, so AI visibility reads as a defensible line item rather than a vanity metric.`,
  },
];

// ---------------------------------------------------------------------------------------------
// PR — heading: "Questions PR teams ask" (8).
// ---------------------------------------------------------------------------------------------
export const prFaqs: Faq[] = [
  {
    q: `How is monitoring AI answers different from media monitoring or social listening?`,
    a: `Media monitoring tracks where you were published or mentioned; Zicy tracks whether that coverage changed what AI says about your client. Traditional tools stop at the clipping; Zicy connects the earned coverage to movement in the AI answer across all five engines.`,
  },
  {
    q: `Reputation is formed in coverage — why does the AI answer matter so much?`,
    a: `Because the coverage is increasingly read by a machine, then summarised to the buyer. More than 1 billion people use standalone generative AI tools every month (Meltwater & We Are Social, Digital 2026, via Similarweb), and the framing AI repeats is the framing that reaches the decision, not the original article.`,
  },
  {
    q: `My client has stopped caring about clippings and AVE. What do I report instead?`,
    a: `A reputation metric the C-suite already respects: AI Share of Voice, mention coverage, citation rate and sentiment, tracked weekly across five engines. It's defensible, comparable to competitors, and tied to the answers buyers act on.`,
  },
  {
    q: `Can I actually prove the coverage I earned moved the answer?`,
    a: `Yes — that's what Citation Analysis is for. It shows which sources AI cites about your client, classified as owned, earned or competitor, so you connect the placement you landed to movement in the answer rather than asserting a link.`,
  },
  {
    q: `Can Zicy show which sources AI trusts in my client's category?`,
    a: `Yes — Citation Analysis shows which sources AI draws on when it answers about your client's category, classified as owned, earned or competitor. That turns an earned-media plan from a guess into a targeted list of the outlets AI actually cites, by engine.`,
  },
  {
    q: `Does Zicy do the PR — and does that threaten my role?`,
    a: `No. Zicy measures and proves; it does not place coverage. Your team earns the media on its merits, and Zicy shows whether it moved the answer — it makes your work measurable, not redundant.`,
  },
  {
    q: `If AI hallucinates something damaging about my client, what can we actually do?`,
    a: `First you see it early through the Reality Score and sentiment surveillance; then you act through legitimate channels — if the framing is inaccurate, you guide a correction with the publication or platform; if it's accurate criticism, it goes back to the client as an operational issue. The one thing Zicy will not do is manufacture or suppress sentiment.`,
  },
  {
    q: `When a rival or a hostile source starts owning the story, will I know in time?`,
    a: `Yes — Competitor Sentiment Profiles and Citation Analysis flag when a competitor or an unfavourable source is shaping how AI frames your client, and which sources are driving it, while there's still room to respond.`,
  },
];

// ---------------------------------------------------------------------------------------------
// AGENCIES — heading: "Questions agencies ask" (11).
// ---------------------------------------------------------------------------------------------
export const agenciesFaqs: Faq[] = [
  {
    q: `Can we resell Zicy under our own brand?`,
    a: `Yes — the Scale tier provides white-label dashboards under your own name, so the audit, reporting and fixes are presented as your agency's service. The platform and methodology sit behind your brand, with no build cost and no specialist hire.`,
  },
  {
    q: `Clients are raising AI search in reviews and we're improvising — how do we have the answer?`,
    a: `You walk into the room with the client's live AI visibility, not a generic deck — show a prospect exactly how AI describes them today, where it's wrong, and your plan to fix it, before anything is signed. The agency that answers first takes the budget.`,
  },
  {
    q: `Is there genuine budget in this, or is it noise?`,
    a: `The category is funding and forming now: more than $300M was raised across AI-visibility tools between mid-2025 and spring 2026 (Surmado, 2026), and the GEO services market was valued at US$886M in 2024, projected to reach US$7.3B by 2031 (Valuates Reports, 2025). The service line is open before it's crowded.`,
  },
  {
    q: `How do we explain AI visibility to a client who has never heard of it?`,
    a: `You show them rather than explain it — present how AI describes them today across five engines, where it is wrong, and which rivals appear in their place. A live result lands faster than a definition, and it reframes the conversation from "what is this" to "how do we fix it".`,
  },
  {
    q: `Do we have to build a platform or hire specialists?`,
    a: `No — the platform and the methodology already exist, so you productise AI visibility as a retainer or a one-off audit under your own brand, with no build cost and no specialist hire.`,
  },
  {
    q: `Most AI tools only measure — what do we actually deliver?`,
    a: `Zicy measures and remediates in one place: the audit, the prioritised fix list, and the schema, llms.txt and content tooling to close it. That's the category's weakness and your opening — you sell the fix and show the result, not just the problem.`,
  },
  {
    q: `How do agencies usually package this for clients?`,
    a: `Agencies typically package it three ways: a quick AI visibility baseline as a new-business wedge, a monthly retainer reporting AI Share of Voice and the fixes shipped against it, or a one-off audit-and-remediation engagement. The same Zicy loop — measure, diagnose, act, prove — supports all three without separate tooling.`,
  },
  {
    q: `How do we run our whole client roster from one place?`,
    a: `Every plan includes unlimited projects and brands, and the Scale tier adds multi-brand management built for a portfolio, so each client is tracked and reported separately from a single login with your agency's brand on every report.`,
  },
  {
    q: `Will this actually help us keep clients?`,
    a: `It gives you a recurring metric clients want reported every month and a visible stream of fixes shipped and gains shown. Retention follows proof, and the loop — measure, diagnose, act, prove — is built to produce it.`,
  },
  {
    q: `How steep is the learning curve for my team?`,
    a: `The workflow is productised: audit, prioritised fix list, then the tooling to execute, so a generalist team can deliver without an in-house AEO specialist.`,
  },
  {
    q: `If we put our name on this, is the methodology safe under Google's policies?`,
    a: `Yes, and that protects your agency, not just the client. The tooling is aligned with Google's May 2026 spam-policy guidance, so you're reselling the endorsed side — clarity, accuracy and demonstrable expertise — rather than tactics that could later be flagged.`,
  },
];

// ---------------------------------------------------------------------------------------------
// PUBLISHERS — heading: "Questions publishers ask" (14). Order matters: the media-sales motion
// leads, attribution/licensing follows. The rel="sponsored"/nofollow + disclosure language and
// the "measured correlation, not a guaranteed citation" line in Q4 are load-bearing — verbatim.
// ---------------------------------------------------------------------------------------------
export const publishersFaqs: Faq[] = [
  {
    q: `What does AI citation mean for a publisher?`,
    a: `AI citation is when an engine attributes and links your journalism as a source in its answer, rather than paraphrasing it without credit or ignoring it. As referral clicks fall, citation is becoming the unit of value publishers measure, defend and license.`,
  },
  {
    q: `What is an uncited rate?`,
    a: `An uncited rate is the share of cases where an AI engine draws on your reporting without attributing or linking it. Zicy measures it down to the individual URL across five engines, giving your commercial team an evidence base for licensing conversations rather than an anecdote.`,
  },
  {
    q: `We sell advertising — how does Zicy help us sell more of it?`,
    a: `It lets you sell advertising as measurable AI-visibility uplift, not just impressions. Zicy tracks an advertiser's visibility across all five engines and their branded-search movement from public search data, so your sales team can show the lift a campaign produced — the demand signals independent research ties to AI citation (Growth Memo, Kevin Indig, 2025).`,
  },
  {
    q: `Are we promising advertisers that paying us gets them cited by AI?`,
    a: `No, and that distinction is the whole point. AI engines don't read the ad — they read the branded search and web mentions it creates (Brafton, 2026), and those signals are stronger predictors of AI citation than backlinks (Growth Memo, Kevin Indig, 2025; Digital Bloom, 2026); Zicy measures the movement. It is a measured correlation, not a guaranteed citation, and it stays on the endorsed side of Google's May 2026 spam-policy guidance — paid placements carry rel="sponsored" or rel="nofollow", sponsored editorial is disclosed, and no paid link passes ranking signal.`,
  },
  {
    q: `Why is editorial a stronger sell than display for this?`,
    a: `Because editorial creates the signal AI weights most. Web mentions are the single strongest predictor of AI citation, at about 0.66 — roughly three times backlinks (Digital Bloom, 2026) — and on a cited title genuine editorial can become a source in its own right, while display advertising mainly lifts the weaker branded-search signal (Brafton, 2026). You can price and position the two tiers accordingly.`,
  },
  {
    q: `Is AI actually using our journalism — and can we put a number on it?`,
    a: `Yes, and that's precisely what Citation Analysis does. It shows whether AI attributes your work, paraphrases it without credit, or ignores it entirely across five engines, down to the domain and URL — so you can track attribution the way you already track traffic.`,
  },
  {
    q: `Referral traffic is collapsing — why does attribution matter if the clicks are gone?`,
    a: `Because attribution is the new referral. News leaders expect to lose significant search-referral traffic within three years (Reuters Institute, Journalism, Media & Technology Trends and Predictions 2026), and the click-through to an AI Overview's own citation links sits around 1% when present (Pew Research, 2025); the publishers who measure attribution now are the ones positioned to license and defend it later.`,
  },
  {
    q: `How do we measure whether AI is citing our competitors instead of us?`,
    a: `Competitive AI Performance shows, query by query, which outlets AI credits across all five engines — so you see where a rival title is taking the citation and where you still hold it, rather than guessing at your standing.`,
  },
  {
    q: `What can we actually do about uncited use — isn't it out of our hands?`,
    a: `Part of it is squarely in your hands — being machine-readable. The Site Audit checks whether AI crawlers can read and attribute you (llms.txt, bot access, schema, page health), so credit isn't lost to a technical gap, and the uncited rate gives you the evidence base for everything that isn't technical.`,
  },
  {
    q: `Where do we still own the answer, and where have we lost it?`,
    a: `Key Topics Analysis shows it directly — Leaders, Battlegrounds and Blind Spots — across the topics that define your title, turning "AI is taking our work" into a commissioning and attribution plan.`,
  },
  {
    q: `Can this support our AI-licensing negotiations?`,
    a: `Yes — this is one of its strongest uses. A documented uncited rate and source-level attribution data give your commercial team an evidence base for licensing conversations and the boardroom, rather than an anecdote, at a moment when publishers from the Associated Press to USA Today are signing AI content deals while others litigate over uncited use (Digiday; Press Gazette, 2025–26).`,
  },
  {
    q: `Should we block AI crawlers or feed them?`,
    a: `That's a real strategic choice, and Zicy lets you make it with data instead of a guess — it shows the trade-off between being cited and attributed versus scraped without credit, by engine and by topic, so the decision is measured.`,
  },
  {
    q: `Is this built for marketers, or for us?`,
    a: `It reads the same signals, but the lens for you is attribution, topic authority and commercial opportunity, not lead generation — Citation Analysis, Key Topics and the Site Audit are framed around who's using your work, where, and with what credit, alongside the media-sales tracking above.`,
  },
  {
    q: `How do we handle a large archive without a huge project?`,
    a: `The Site Audit inventories and checks the archive, and audit-boost add-ons scale to large sites, so you can assess attribution and machine-readability across thousands of pages without a rebuild.`,
  },
];

// Build the FAQPage JSON-LD mainEntity from a specific block + the universal block, in that
// order. One FAQPage object per page; the structured data matches the rendered answers.
export function faqPageJsonLd(specific: Faq[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [...specific, ...universalFaqs].map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
