// Glossary content: single source for the hub (index.astro) and the dynamic term pages
// ([term].astro). Underscore prefix keeps Astro from treating this as a route.
//
// House rules: sentence case; no em dashes (the locked one-sentence definitions have had em
// dashes replaced with house-style punctuation, meaning unchanged); engines named in fixed order
// (ChatGPT, Gemini, Perplexity, Google AI Overviews, Google AI Mode); no banned vocab; every
// definition is Zicy's own phrasing. Apostrophes are straight, matching the other data files.

export interface GlossaryFaq {
  q: string;
  a: string;
}

export interface GlossaryTerm {
  slug: string;
  term: string; // H1 / display name, sentence case
  short: string; // one-line preview for the hub
  definition: string; // the sharp one-sentence definition (also the DefinedTerm description)
  body: string[]; // extended explanation, 3 to 5 paragraphs
  example: string; // concrete, non-client illustration
  related: string[]; // 3 to 5 other glossary slugs
  zicy: string; // how Zicy measures or addresses it (may carry one inline <a>, rendered via set:html)
  faqs: GlossaryFaq[]; // 3 to 5
  sameAs?: string; // optional widely-used external reference
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: 'ai-visibility',
    term: 'AI visibility',
    short: 'How often, how accurately and how prominently a brand appears in AI answers about its category.',
    definition:
      'AI visibility is how often, how accurately and how prominently a brand appears when people ask AI platforms about its category, measured inside the answer the engine builds, not in a list of links.',
    body: [
      'AI visibility describes a brand’s standing inside AI-generated answers. When someone asks an AI platform a question about a category, the engine composes a single answer rather than returning a page of links. AI visibility is the measure of whether, and how well, a brand appears in that answer.',
      'It has two dimensions. The first is presence: is the brand named at all? The second is accuracy: when the brand is named, is it described correctly? A brand can be highly present and poorly described, which is why presence alone is an incomplete picture.',
      'AI visibility is measured per engine, because each platform builds answers from different sources. Zicy tracks it across five engines: ChatGPT, Gemini, Perplexity, Google AI Overviews and Google AI Mode.',
      'It is distinct from search ranking. A page can rank first in a traditional list of links and still be absent from the AI answer, because answer engines select and synthesise sources differently from how search engines rank pages.',
    ],
    example:
      'A buyer asks an AI platform to recommend project-management tools for small teams. If a given tool is named in that answer, described accurately, and placed early in the list, it has strong AI visibility for that prompt. If it is omitted, or named with a wrong feature, its AI visibility is weak even if its website ranks well in traditional search.',
    related: ['aeo', 'geo', 'ai-mention-coverage', 'ai-share-of-voice', 'ai-reality-score'],
    zicy:
      'Zicy measures AI visibility across the five engines as a set of metrics, mention coverage, citation coverage, share of voice and average ranking, tracked over time. See how it works on <a href="/platform">the platform</a>.',
    faqs: [
      {
        q: 'What is AI visibility?',
        a: 'AI visibility is how often, how accurately and how prominently a brand appears when people ask AI platforms about its category, measured inside the answer the engine builds, not in a list of links.',
      },
      {
        q: 'How is AI visibility different from SEO?',
        a: 'SEO measures where a page ranks in a list of links. AI visibility measures whether a brand is named and described accurately inside the synthesised answer an AI engine builds. A page can rank well and still be absent from the answer.',
      },
      {
        q: 'Which engines does AI visibility cover?',
        a: 'Zicy measures AI visibility across five engines: ChatGPT, Gemini, Perplexity, Google AI Overviews and Google AI Mode. Each builds answers from different sources, so coverage is measured per engine.',
      },
      {
        q: 'Is being mentioned the same as having good AI visibility?',
        a: 'No. Presence is only one dimension. A brand can be named frequently but described inaccurately, so AI visibility also accounts for whether the description is correct.',
      },
    ],
  },
  {
    slug: 'aeo',
    term: 'Answer engine optimisation (AEO)',
    short: 'Making a brand easy for AI answer engines to find, trust and cite in their responses.',
    definition:
      'Answer Engine Optimisation (AEO) is the practice of making a brand’s content, entity data and technical signals easy for AI answer engines to find, trust and cite in their responses.',
    body: [
      'Answer engine optimisation is the discipline of preparing a brand so that AI answer engines can find it, trust it and cite it. It works on three layers: the content itself, the structured entity data that describes the brand, and the technical signals that let engines access and parse a site.',
      'It differs from search engine optimisation in its goal. SEO aims to rank a page in a list of results. AEO aims to make a brand citable inside a synthesised answer, which depends less on ranking position and more on clarity, accuracy and machine-readability.',
      'Two components matter most. Content accuracy ensures that what an engine reads about the brand is correct and current. Entity clarity ensures the engine can tell what the brand is, what it does and who stands behind it, through consistent naming, schema and an llms.txt file.',
      'AEO covers the full set of answer engines, including AI Overviews and AI features inside traditional search, not only standalone generative chat platforms.',
    ],
    example:
      'A company with accurate, well-structured product pages, a clean schema definition and an llms.txt that states its facts plainly is easier for an answer engine to cite than a competitor with the same products but thin, inconsistent or unstructured information.',
    related: ['geo', 'ai-visibility', 'entity-gap', 'citation-coverage', 'ai-reality-score'],
    zicy:
      'Zicy supports AEO end to end: it audits technical readiness, diagnoses what to fix, and generates schema, llms.txt and citation-ready content in the <a href="/platform">Action Center</a>.',
    faqs: [
      {
        q: 'What is answer engine optimisation?',
        a: 'Answer Engine Optimisation (AEO) is the practice of making a brand’s content, entity data and technical signals easy for AI answer engines to find, trust and cite in their responses.',
      },
      {
        q: 'How is AEO different from SEO?',
        a: 'SEO optimises a page to rank in a list of links. AEO optimises a brand’s content, entity data and technical signals so an answer engine can cite it inside a synthesised answer. The goal is citability, not ranking position.',
      },
      {
        q: 'What are the main components of AEO?',
        a: 'The two that matter most are content accuracy, making sure what engines read is correct and current, and entity clarity, making sure engines can identify what the brand is through consistent naming, schema and an llms.txt file.',
      },
      {
        q: 'Is AEO the same as GEO?',
        a: 'They overlap. GEO focuses specifically on generative AI platforms such as ChatGPT, Gemini and Perplexity, while AEO covers the broader set of answer engines, including AI features inside traditional search.',
      },
    ],
  },
  {
    slug: 'geo',
    term: 'Generative engine optimisation (GEO)',
    short: 'Optimising content and brand signals for generative AI platforms so a brand appears accurately in their answers.',
    definition:
      'Generative Engine Optimisation (GEO) is the practice of optimising content and brand signals for generative AI platforms such as ChatGPT, Gemini and Perplexity, so the brand appears accurately in AI-generated answers.',
    body: [
      'Generative engine optimisation focuses on the platforms that generate answers from a language model, such as ChatGPT, Gemini and Perplexity. The aim is for the brand to appear, and appear accurately, in the text those platforms generate.',
      'GEO and AEO overlap heavily, and the industry uses the terms with some variation. The useful distinction is scope: GEO is usually applied to generative AI platforms specifically, while answer engine optimisation covers the broader set of answer surfaces, including AI Overviews and answer features inside traditional search.',
      'In practice the techniques are largely shared: accurate content, a clear entity definition, corroborating sources and machine-readable signals. GEO simply emphasises the generative-platform end of that spectrum.',
      'Because generative platforms compose answers probabilistically, GEO is measured over a set of prompts and across time rather than from a single response.',
    ],
    example:
      'A brand that wants to appear in ChatGPT and Perplexity answers for its category publishes accurate, well-sourced content and a clear entity definition, then tracks whether those platforms name and describe it correctly across a set of category prompts.',
    related: ['aeo', 'ai-visibility', 'prompt-tracking', 'ai-share-of-voice', 'ai-reality-score'],
    zicy:
      'Zicy tracks how generative platforms describe a brand across ChatGPT, Gemini, Perplexity, Google AI Overviews and Google AI Mode, and points to the fixes that improve it. See <a href="/platform">the platform</a>.',
    faqs: [
      {
        q: 'What is generative engine optimisation?',
        a: 'Generative Engine Optimisation (GEO) is the practice of optimising content and brand signals for generative AI platforms such as ChatGPT, Gemini and Perplexity, so the brand appears accurately in AI-generated answers.',
      },
      {
        q: 'What is the difference between GEO and AEO?',
        a: 'GEO is usually applied to generative AI platforms specifically, such as ChatGPT, Gemini and Perplexity. AEO covers the broader set of answer engines, including AI Overviews and answer features inside traditional search. The techniques overlap heavily.',
      },
      {
        q: 'Do GEO and AEO use different techniques?',
        a: 'Largely the same: accurate content, a clear entity definition, corroborating sources and machine-readable signals. GEO emphasises the generative-platform end of that spectrum.',
      },
      {
        q: 'Why is GEO measured over time?',
        a: 'Generative platforms compose answers probabilistically, so a single response is not representative. GEO is measured across a set of prompts and repeated over time to see a reliable pattern.',
      },
    ],
  },
  {
    slug: 'ai-mention-coverage',
    term: 'AI mention coverage',
    short: 'The percentage of tracked category prompts in which a brand is named by an AI engine.',
    definition:
      'AI mention coverage is the percentage of tracked category prompts in which a brand is named by an AI engine, the foundational presence metric for AI visibility.',
    body: [
      'AI mention coverage answers a simple question: across the prompts you track, how often does the AI name your brand at all? It is expressed as a percentage of the tracked prompt set, per engine.',
      'It is the foundational presence metric. Before accuracy, ranking or citations matter, a brand has to be named in the first place. Mention coverage measures that baseline.',
      'Presence is not the same as accuracy. A brand can have high mention coverage and still be described with outdated or incorrect claims, so mention coverage is read alongside an accuracy measure, not on its own.',
      'It is also distinct from citation coverage. A brand can be named in an answer without its website being cited as a source, and occasionally cited without being named in the prose. The two metrics measure different things.',
    ],
    example:
      'If you track 100 category prompts on one engine and your brand is named in 42 of the answers, your AI mention coverage on that engine is 42 percent.',
    related: ['citation-coverage', 'ai-share-of-voice', 'ai-visibility', 'prompt-tracking', 'average-ai-ranking'],
    zicy:
      'Zicy reports mention coverage per engine across your tracked prompt set, alongside citation rate, share of voice and ranking, in the AI Visibility module. See <a href="/platform">the platform</a>.',
    faqs: [
      {
        q: 'What is AI mention coverage?',
        a: 'AI mention coverage is the percentage of tracked category prompts in which a brand is named by an AI engine, the foundational presence metric for AI visibility.',
      },
      {
        q: 'How is mention coverage different from citation coverage?',
        a: 'Mention coverage counts how often a brand is named in the answer text. Citation coverage counts how often the engine links to or cites the brand’s website as a source. You can be mentioned without being cited, and vice versa.',
      },
      {
        q: 'Does high mention coverage mean AI describes me accurately?',
        a: 'No. Mention coverage measures presence, not accuracy. A brand can be named often and still be described with outdated or incorrect claims, so mention coverage is read alongside an accuracy measure.',
      },
      {
        q: 'Is mention coverage measured per engine?',
        a: 'Yes. Each engine builds answers from different sources, so mention coverage is calculated separately for each one across the same tracked prompt set.',
      },
    ],
  },
  {
    slug: 'citation-coverage',
    term: 'Citation coverage',
    short: 'The percentage of tracked prompts in which an AI engine cites or links to a brand’s website as a source.',
    definition:
      'Citation coverage (or website citation coverage) is the percentage of tracked prompts in which an AI engine links to or cites a brand’s website as a source, a measure of source authority, separate from brand mention.',
    body: [
      'Citation coverage measures how often an AI engine credits a brand’s website as a source in its answer, across the tracked prompt set. Where mention coverage counts being named, citation coverage counts being used as a source.',
      'It is a measure of source authority. An engine that cites a site is treating it as a trustworthy place the answer was built from, which is a stronger signal than a passing mention.',
      'Mention and citation can move independently. A brand can be named in an answer that cites no source, or that cites a third-party article about the brand rather than the brand’s own site. Less often, a site is cited as a source without the brand being named in the prose.',
      'As referral clicks from AI answers decline, citation becomes the more durable unit of value, because it is what a brand can measure, defend and, in some cases, license.',
    ],
    example:
      'You track 100 prompts on one engine. Your brand is named in 42 answers, but your website is cited as a source in only 11 of them. Your mention coverage is 42 percent and your citation coverage is 11 percent, which tells you the engine talks about you more than it relies on you.',
    related: ['ai-mention-coverage', 'ai-share-of-voice', 'entity-gap', 'ai-visibility', 'aeo'],
    zicy:
      'Zicy’s Citation Analysis shows which sources an engine cites about your brand, classified owned, earned, competitor or uncited, down to the URL. See <a href="/platform">the platform</a>.',
    faqs: [
      {
        q: 'What is citation coverage?',
        a: 'Citation coverage (or website citation coverage) is the percentage of tracked prompts in which an AI engine links to or cites a brand’s website as a source, a measure of source authority, separate from brand mention.',
      },
      {
        q: 'Can a brand be mentioned without being cited?',
        a: 'Yes. An engine can name a brand in its answer without citing the brand’s website as a source, often citing a third-party article instead. Mention and citation measure different things and can move independently.',
      },
      {
        q: 'Why does citation coverage matter?',
        a: 'It measures source authority: whether engines treat your site as a trustworthy place to build answers from. As referral clicks decline, citation becomes the more durable unit of value because it is what you can measure and defend.',
      },
      {
        q: 'Is citation coverage the same as a backlink?',
        a: 'No. A backlink is a link between web pages. Citation coverage measures how often an AI engine credits your site as a source inside its generated answers across a tracked prompt set.',
      },
    ],
  },
  {
    slug: 'ai-share-of-voice',
    term: 'AI share of voice',
    short: 'A brand’s share of all brand mentions in AI answers for a defined set of category prompts.',
    definition:
      'AI share of voice is the proportion of brand mentions in AI answers for a defined set of category prompts that belong to one brand, expressed as a percentage of all brand mentions in those answers, the competitive standing metric for AI visibility.',
    body: [
      'AI share of voice places a brand’s presence in a competitive context. Instead of asking how often you are named in absolute terms, it asks what proportion of all brand mentions in the answers, across a defined set of category prompts, belong to you.',
      'It is the competitive standing metric for AI visibility. A rising share of voice means you are winning a larger part of the category conversation in AI answers, relative to the rivals in your tracked set.',
      'It depends on the prompt set and the competitor set you define, so it is comparable over time when those are held stable, and is read against named rivals rather than as an absolute.',
      'It echoes the traditional marketing idea of share of voice, a brand’s share of total category advertising or media presence, but applied to mentions inside AI answers rather than ad spend or coverage volume.',
    ],
    example:
      'Across a category prompt set, AI answers name five brands a combined 200 times. Your brand accounts for 50 of those mentions, so your AI share of voice is 25 percent for that set.',
    related: ['ai-mention-coverage', 'average-ai-ranking', 'ai-visibility', 'prompt-tracking', 'citation-coverage'],
    zicy:
      'Zicy calculates AI share of voice against the competitor set you choose and tracks it over time in the AI Visibility and Competitive AI Performance views. See <a href="/platform">the platform</a>.',
    faqs: [
      {
        q: 'What is AI share of voice?',
        a: 'AI share of voice is the proportion of brand mentions in AI answers for a defined set of category prompts that belong to one brand, expressed as a percentage of all brand mentions in those answers, the competitive standing metric for AI visibility.',
      },
      {
        q: 'How is AI share of voice different from mention coverage?',
        a: 'Mention coverage is how often you are named, in absolute terms, across your tracked prompts. Share of voice is your portion of all brand mentions in those answers relative to competitors. One is absolute presence; the other is competitive standing.',
      },
      {
        q: 'How is it different from traditional share of voice?',
        a: 'Traditional share of voice measures a brand’s portion of total category advertising or media presence. AI share of voice applies the same idea to brand mentions inside AI answers rather than ad spend or coverage volume.',
      },
      {
        q: 'What affects my AI share of voice?',
        a: 'The prompt set and the competitor set you define, plus how often each brand is named in the answers. Holding the prompt and competitor sets stable makes the metric comparable over time.',
      },
    ],
  },
  {
    slug: 'average-ai-ranking',
    term: 'Average AI ranking',
    short: 'The mean position at which a brand appears when named in AI answers across a tracked set of prompts.',
    definition:
      'Average AI ranking is the mean position at which a brand appears when named in AI answers across a tracked set of prompts, where position 1 means the brand was named first in the answer.',
    body: [
      'Average AI ranking captures not just whether a brand is named, but where in the answer it appears. Position 1 means the brand was named first; higher numbers mean it appeared later, among other brands.',
      'Order carries weight in AI answers. The brand named first is often read as the primary recommendation, so moving from third-named to first-named can matter as much as being named more often.',
      'It is calculated only across answers where the brand is actually named, so it is read alongside mention coverage rather than instead of it. A brand can be named rarely but ranked first when it is, or named often but late.',
      'Extracting precise position from generative text is harder than from a ranked list of links, because answers are prose rather than a numbered ranking. Average AI ranking is therefore best read as a directional indicator tracked over time, not an exact league position.',
    ],
    example:
      'Across the answers where your brand is named, it appears first in some, second in others and fourth in a few. Average those positions and you might get an average AI ranking of 2.3 for that prompt set on that engine.',
    related: ['ai-mention-coverage', 'ai-share-of-voice', 'ai-visibility', 'prompt-tracking', 'answer-intent-query'],
    zicy:
      'Zicy estimates average AI ranking across your tracked prompts per engine and tracks the trend over time in the AI Visibility module. See <a href="/platform">the platform</a>.',
    faqs: [
      {
        q: 'What is average AI ranking?',
        a: 'Average AI ranking is the mean position at which a brand appears when named in AI answers across a tracked set of prompts, where position 1 means the brand was named first in the answer.',
      },
      {
        q: 'Why does the order of names in an answer matter?',
        a: 'The brand named first is often read as the primary recommendation. Moving earlier in the answer can matter as much as being named more often, because order signals emphasis in AI answers.',
      },
      {
        q: 'Is average AI ranking exact?',
        a: 'No. Answers are prose, not a numbered list, so extracting precise position is harder than in traditional search. It is best read as a directional indicator tracked over time rather than an exact league position.',
      },
      {
        q: 'Is ranking measured even when my brand is not named?',
        a: 'No. Average AI ranking is calculated only across answers where the brand is actually named, so it is read alongside mention coverage rather than on its own.',
      },
    ],
  },
  {
    slug: 'answer-intent-query',
    term: 'Answer-intent query',
    short: 'A prompt that seeks a recommendation, comparison or named solution rather than a definition.',
    definition:
      'An answer-intent query is a search or AI prompt phrased as a question that seeks a recommendation, comparison or named solution rather than a definition, the query type that generates brand mentions in AI answers.',
    body: [
      'An answer-intent query is the kind of question that pulls brand names into an AI answer. It asks for a recommendation, a comparison or a named solution, rather than a definition or a fact.',
      'It contrasts with two other query types. Informational queries ask for a definition or explanation, such as "what is answer engine optimisation", and rarely name brands. Branded queries already contain a brand name in the prompt, so the brand’s presence is given rather than earned.',
      'Answer-intent queries are where AI visibility is won or lost, because they are the moments when an engine decides which brands to name. Examples include "best X for Y", "top Z compared" and "which W should I use".',
      'Tracking these queries specifically is what makes AI visibility measurable. They are the prompts most likely to influence a buying decision, so they are the ones worth monitoring across engines and over time.',
    ],
    example:
      '"What is a CRM" is an informational query and names few brands. "Best CRM for a small sales team" is an answer-intent query: it asks the engine to recommend named products, which is exactly where a brand can win or lose a mention.',
    related: ['prompt-tracking', 'ai-mention-coverage', 'ai-share-of-voice', 'ai-visibility', 'average-ai-ranking'],
    zicy:
      'Zicy’s Prompt Manager lets you build and tag a set of answer-intent queries across segments, topics and languages, then run them across all five engines. See <a href="/platform">the platform</a>.',
    faqs: [
      {
        q: 'What is an answer-intent query?',
        a: 'An answer-intent query is a search or AI prompt phrased as a question that seeks a recommendation, comparison or named solution rather than a definition, the query type that generates brand mentions in AI answers.',
      },
      {
        q: 'How is it different from an informational query?',
        a: 'An informational query asks for a definition or explanation, such as "what is a CRM", and rarely names brands. An answer-intent query asks for a recommendation or comparison, such as "best CRM for a small team", which prompts the engine to name brands.',
      },
      {
        q: 'What is a branded query?',
        a: 'A branded query already contains a brand name in the prompt, so the brand’s presence is given rather than earned. Answer-intent queries do not name the brand; they ask the engine to choose which brands to name.',
      },
      {
        q: 'Why does Zicy track answer-intent queries specifically?',
        a: 'They are the prompts most likely to influence a buying decision and the moments when an engine decides which brands to name, so they are the ones worth monitoring across engines and over time.',
      },
    ],
  },
  {
    slug: 'prompt-tracking',
    term: 'Prompt tracking',
    short: 'Running a defined set of answer-intent queries across AI engines on a recurring schedule to measure visibility over time.',
    definition:
      'Prompt tracking is the practice of systematically running a defined set of answer-intent queries across AI engines on a recurring schedule to measure brand mention coverage, citation rate, share of voice and ranking over time.',
    body: [
      'Prompt tracking turns AI visibility from a one-off check into a measurement programme. You define a set of answer-intent queries, run them across the engines on a recurring schedule, and record how the brand performs each time.',
      'Repetition is essential because AI outputs are probabilistic. The same prompt can return slightly different answers depending on phrasing and the moment it is asked, so a single response is not reliable evidence. Tracking the same prompt set over time reveals the stable pattern beneath the variation.',
      'A prompt set differs from a single snapshot in the same way a time series differs from a single data point. A snapshot tells you what one answer said once; a tracked prompt set tells you the trend, and whether a change you made moved it.',
      'Tracking is usually run on a regular cadence, weekly for most programmes, because answer engines evolve gradually rather than by the hour, so weekly tracking surfaces meaningful shifts without reacting to noise.',
    ],
    example:
      'Rather than asking an AI "best running shoes for flat feet" once and drawing a conclusion, prompt tracking runs that prompt and dozens like it across the engines every week, so the brand can see whether its presence is rising, falling or holding.',
    related: ['answer-intent-query', 'ai-mention-coverage', 'ai-share-of-voice', 'average-ai-ranking', 'ai-visibility'],
    zicy:
      'Zicy runs your tracked prompt set across all five engines on a weekly cadence by default and records coverage, citations, share of voice and ranking each cycle. See <a href="/platform">the platform</a>.',
    faqs: [
      {
        q: 'What is prompt tracking?',
        a: 'Prompt tracking is the practice of systematically running a defined set of answer-intent queries across AI engines on a recurring schedule to measure brand mention coverage, citation rate, share of voice and ranking over time.',
      },
      {
        q: 'Why does prompt tracking have to be repeated?',
        a: 'AI outputs are probabilistic, so the same prompt can return slightly different answers depending on phrasing and timing. Running the same prompt set repeatedly reveals the stable pattern beneath that variation, which a single snapshot cannot.',
      },
      {
        q: 'How is a prompt set different from a single snapshot?',
        a: 'A snapshot tells you what one answer said once. A tracked prompt set tells you the trend across many prompts over time, and whether a change you made actually moved your visibility.',
      },
      {
        q: 'How often should prompts be tracked?',
        a: 'Most programmes track weekly, because answer engines evolve gradually rather than by the hour. Weekly tracking surfaces meaningful shifts without overreacting to short-term noise.',
      },
    ],
  },
  {
    slug: 'entity-gap',
    term: 'Entity gap',
    short: 'A fact or association a brand should be known for that AI engines consistently omit from their answers.',
    definition:
      'An entity gap is a fact, attribute or association that a brand should be known for but that AI engines consistently omit or fail to surface in their answers, a diagnostic signal that the brand’s entity definition is incomplete or under-corroborated.',
    body: [
      'An entity gap is something true and important about a brand that AI answers leave out. If a company is known in the market for a particular product line, capability or credential, but engines never attribute it to the brand, that missing association is an entity gap.',
      'It is a diagnostic signal rather than a metric. A persistent gap suggests the brand’s entity definition, the structured, corroborated picture of what it is and what it does, is incomplete or under-supported by the sources engines read.',
      'Entity gaps usually trace back to two causes: the fact is not stated clearly in machine-readable form on the brand’s own properties, or it is not corroborated by enough independent sources for an engine to surface it with confidence.',
      'Closing an entity gap is largely an engineering task. Stating the fact plainly in schema and an llms.txt, and ensuring credible sources corroborate it, gives engines what they need to include it.',
    ],
    example:
      'A manufacturer is one of the few in its region certified for a specific safety standard, but AI answers about that standard never mention the company. The missing association is an entity gap: the credential is real but not surfaced, usually because it is not stated in machine-readable form or corroborated widely enough.',
    related: ['hallucination', 'ai-mention-coverage', 'citation-coverage', 'aeo', 'ai-reality-score'],
    zicy:
      'Zicy’s Brand Intelligence surfaces entity gaps, and the Action Center generates the schema and llms.txt that help close them. See <a href="/platform">the platform</a>.',
    faqs: [
      {
        q: 'What is an entity gap?',
        a: 'An entity gap is a fact, attribute or association that a brand should be known for but that AI engines consistently omit or fail to surface in their answers, a diagnostic signal that the brand’s entity definition is incomplete or under-corroborated.',
      },
      {
        q: 'What causes an entity gap?',
        a: 'Usually one of two things: the fact is not stated clearly in machine-readable form on the brand’s own properties, or it is not corroborated by enough independent sources for an engine to surface it confidently.',
      },
      {
        q: 'How is an entity gap different from a hallucination?',
        a: 'An entity gap is something true that AI leaves out. A hallucination is something false that AI states as fact. One is an omission; the other is an invention.',
      },
      {
        q: 'How do you close an entity gap?',
        a: 'State the fact plainly in schema and an llms.txt, and make sure credible independent sources corroborate it, so engines have what they need to surface it with confidence.',
      },
    ],
  },
  {
    slug: 'hallucination',
    term: 'Hallucination',
    short: 'A false claim an AI engine makes about a brand that has no grounding in the brand’s published information.',
    definition:
      'A hallucination, in the context of AI brand descriptions, is a factual claim made by an AI engine about a brand that is false or has no grounding in the brand’s published information, distinct from an outdated claim, which was once true.',
    body: [
      'In the context of AI brand descriptions, a hallucination is a claim an engine states as fact that is simply not true, or that has no basis in anything the brand has published. The engine presents it with the same confidence as a correct fact, which is what makes it dangerous.',
      'It is distinct from an outdated claim. An outdated claim was true once and has since changed, such as a former price or a discontinued product. A hallucination was never true. Both hurt accuracy, but they have different causes and fixes.',
      'Common examples include a wrong founding year, product features the brand does not offer, or team members who do not exist. Because the claim is stated confidently, a buyer has no signal that it is wrong.',
      'Hallucinations are a buyer-decision risk, not just a data-quality issue. A confident, false claim read mid-decision can move a buyer away from a brand before anyone on the brand’s side is aware the claim exists.',
    ],
    example:
      'An AI answer states that a software company was founded in 2009 and offers a feature it has never built. Neither claim appears anywhere in the company’s published information. Both are hallucinations, distinct from an outdated claim such as citing a price the company charged last year.',
    related: ['entity-gap', 'ai-reality-score', 'ai-visibility', 'citation-coverage', 'aeo'],
    zicy:
      'Zicy’s AI Reality Score flags hallucinations and outdated claims per engine before a buyer sees them. Read how it works on the <a href="/platform/ai-reality-score">AI Reality Score</a> page.',
    sameAs: 'https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)',
    faqs: [
      {
        q: 'What is a hallucination in AI brand descriptions?',
        a: 'A hallucination, in the context of AI brand descriptions, is a factual claim made by an AI engine about a brand that is false or has no grounding in the brand’s published information, distinct from an outdated claim, which was once true.',
      },
      {
        q: 'How is a hallucination different from an outdated claim?',
        a: 'An outdated claim was true once and has since changed, such as a former price. A hallucination was never true. Both reduce accuracy, but they have different causes and fixes.',
      },
      {
        q: 'What are common examples of brand hallucinations?',
        a: 'A wrong founding year, product features the brand does not offer, or named team members who do not exist. Because the claim is stated confidently, a buyer has no signal that it is wrong.',
      },
      {
        q: 'Why are hallucinations a business risk?',
        a: 'They are a buyer-decision risk, not just a data-quality issue. A confident, false claim read mid-decision can move a buyer away from a brand before anyone on the brand’s side knows it exists.',
      },
    ],
  },
];

// AI Reality Score is canonical on /platform/ai-reality-score (owned by another page). In the
// glossary it is a short, noindex summary that defers to that page, and the hub lists it linking
// straight to the canonical page. Its DefinedTerm in the hub set references the canonical term id.
export const AI_REALITY_SCORE = {
  slug: 'ai-reality-score',
  term: 'AI Reality Score',
  short: 'Zicy’s per-engine accuracy score: the gap between what is true about a brand and what AI says.',
  definition:
    'The AI Reality Score is Zicy’s per-engine accuracy score: it measures the gap between what is true about a brand and what AI actually says about it, across the tracked prompt set.',
  canonicalPath: '/platform/ai-reality-score',
  related: ['hallucination', 'entity-gap', 'ai-visibility'],
};
