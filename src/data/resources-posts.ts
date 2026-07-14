// Single source of truth for the /resources post listing and the Blog node's blogPost
// members. Generated from the 19 migrated post pages under src/pages/resources/*.astro.
// resources.astro asserts at build time that this list matches the actual page files
// (import.meta.glob), so it cannot silently drift. One entry per live post.
export interface ResourcePost {
  slug: string;
  title: string;
  description: string;
  articleSection: 'Guides' | 'Research' | 'Updates';
  datePublished: string;
  authorName: string;
}

export const RESOURCE_POSTS: ResourcePost[] = [
  {
    "slug": "measuring-ai-visibility-sub-entity-halo",
    "title": "Measuring AI visibility: the sub-entity halo, a strategic prioritisation layer",
    "description": "The sub-entity halo is the third layer of AI visibility attribution: whether AI surfaces a brand's specific named products and services in the queries where they are most relevant.",
    "articleSection": "Research",
    "datePublished": "2026-04-28",
    "authorName": "April Cheong"
  },
  {
    "slug": "benchmark-aeo-readiness",
    "title": "How to benchmark your AEO readiness against competitors",
    "description": "AEO benchmarking measures your relative inclusion in AI answers against competitors, not your rankings, scoring readiness across accessibility, structure, authority and trust.",
    "articleSection": "Guides",
    "datePublished": "2026-04-23",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "present-aeo-geo-performance",
    "title": "How to present AEO and GEO performance in C-suite marketing reports",
    "description": "Presenting AEO and GEO performance to the C-suite means translating AI visibility into influence and revenue: citations, share of voice, entity accuracy and lead impact, not activity metrics.",
    "articleSection": "Guides",
    "datePublished": "2026-04-22",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "track-ai-citations",
    "title": "How to track AI citations and measure their impact on leads and sales",
    "description": "An AI citation is when a generative engine references your brand or content in an answer. Because these rarely produce a click, you track them with recurring prompts, dashboards and correlation to leads.",
    "articleSection": "Guides",
    "datePublished": "2026-04-21",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "ai-search-kpis",
    "title": "What new KPIs replace traditional SEO metrics in the age of AI search?",
    "description": "In AI search, click-based SEO metrics no longer capture performance. The new KPIs measure influence at the answer level: citations, mention share, entity accuracy, positioning and lead correlation.",
    "articleSection": "Guides",
    "datePublished": "2026-04-21",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "pr-wikidata-ai-visibility",
    "title": "Can PR, news releases and Wikidata entries improve AI visibility?",
    "description": "PR and Wikidata improve AI visibility as external validation: AI engines confirm a brand's claims by cross-referencing independent, high-authority sources, so widely acknowledged facts are more likely to be cited.",
    "articleSection": "Guides",
    "datePublished": "2026-04-20",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "bilingual-websites-ai-citations",
    "title": "How to optimise bilingual websites for AI citations",
    "description": "Optimising a bilingual website for AI citations is about structure, not just translation: consistent entity names, correct hreflang, parallel schema and clearly segmented URLs.",
    "articleSection": "Guides",
    "datePublished": "2026-04-19",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "prepare-for-google-ai-overviews",
    "title": "How to prepare your website for Google AI Overviews (step by step)",
    "description": "Google AI Overviews summarise answers from a small pool of high-confidence sources, so inclusion depends on readiness, not ranking: crawlability, front-loaded answers, accurate schema and trust signals.",
    "articleSection": "Guides",
    "datePublished": "2026-04-19",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "ai-trust-signals",
    "title": "How can you build digital trust signals that AI engines recognise?",
    "description": "Trust signals are the machine-readable cues, verified authorship, transparent sources, consistent facts and secure infrastructure, that tell AI a brand is real, reliable and worth citing.",
    "articleSection": "Guides",
    "datePublished": "2026-04-18",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "aeo-geo-examples",
    "title": "What are examples of companies already succeeding with AEO and GEO?",
    "description": "Early AEO and GEO winners are not the biggest publishers but the clearest ones: knowledge-driven firms, consumer innovators and data publishers whose structured, well-sourced content AI can extract and trust.",
    "articleSection": "Guides",
    "datePublished": "2026-04-18",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "authoritative-entity",
    "title": "What does it mean to become an authoritative entity for AI engines?",
    "description": "An authoritative entity is a brand AI engines recognise as a uniquely identifiable, verified part of the knowledge graph, not just a set of pages, reinforced by consistent, corroborated facts.",
    "articleSection": "Guides",
    "datePublished": "2026-04-18",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "content-ai-prefers-to-cite",
    "title": "What kind of content does AI prefer to cite: blogs, FAQs or structured data?",
    "description": "AI engines cite content that is clear, factual and self-contained. FAQs have the highest direct citation potential, blogs build context and authority, and structured data lets AI verify what is true.",
    "articleSection": "Guides",
    "datePublished": "2026-04-18",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "ai-product-recommendations",
    "title": "Can AI engines like Copilot or Gemini recommend your products to users?",
    "description": "AI assistants increasingly recommend specific products, not just answer questions. Whether yours is recommended depends on structured, complete product data and brand authority AI can trust.",
    "articleSection": "Guides",
    "datePublished": "2026-04-17",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "investing-in-aeo-geo",
    "title": "Should your marketing team start investing in AEO and GEO now or wait?",
    "description": "AI citation patterns are stickier than search rankings: once an engine settles on the sources it trusts for a topic, early-cited brands become the default references and compound that advantage.",
    "articleSection": "Guides",
    "datePublished": "2026-04-17",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "ai-overviews-chatgpt-seo",
    "title": "How will Google AI Overviews and ChatGPT change SEO for your business?",
    "description": "Google AI Overviews and ChatGPT move discovery from ranked links to synthesised answers, so SEO shifts from ranking to being cited in a limited answer set, where clarity beats domain size.",
    "articleSection": "Guides",
    "datePublished": "2026-04-16",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "what-is-answer-engine-optimization",
    "title": "What exactly is answer engine optimisation, and why does it matter for brands?",
    "description": "Answer engine optimisation (AEO) is the practice of structuring a brand's content, entity data and technical signals so AI systems can understand, extract and cite it in their answers.",
    "articleSection": "Guides",
    "datePublished": "2026-04-16",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "measuring-ai-visibility-search-halo",
    "title": "Measuring AI visibility: why the search halo is the second layer to understand",
    "description": "The search halo is the second layer of AI visibility attribution: the lift in branded search and direct visits that follows after users discover a brand in AI answers.",
    "articleSection": "Research",
    "datePublished": "2026-04-14",
    "authorName": "April Cheong"
  },
  {
    "slug": "measuring-ai-visibility-direct-roi",
    "title": "Measuring AI visibility: why direct ROI is the first layer to understand",
    "description": "Direct ROI is the first and most measurable layer of AI visibility attribution: the conversions that arrive when AI platforms send users straight to your site.",
    "articleSection": "Research",
    "datePublished": "2026-04-13",
    "authorName": "April Cheong"
  },
  {
    "slug": "brand-audits-ai-search",
    "title": "Why brand audits matter in the AI search era",
    "description": "A brand audit in the AI search era measures how AI systems interpret and restate a brand: whether it appears, what facts AI attaches to it, the sentiment, and where AI is confidently wrong.",
    "articleSection": "Research",
    "datePublished": "2026-03-26",
    "authorName": "April Cheong"
  },
  {
    "slug": "effective-prompts-ai-tracking",
    "title": "How to add effective prompts to your AI tracking",
    "description": "Effective prompt tracking means choosing questions where AI actually has to name brands: buying-intent queries with a clear product, store or service, and a location for local businesses.",
    "articleSection": "Guides",
    "datePublished": "2026-02-04",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "cloudflare-bot-management",
    "title": "Cloudflare bot management: check and manage AI bot access for brand discoverability",
    "description": "Cloudflare bot management can decide whether AI answer engines ever see your site. This guide shows how to check your Cloudflare, robots.txt and WAF settings and stay discoverable in AI answers.",
    "articleSection": "Guides",
    "datePublished": "2025-12-12",
    "authorName": "Alvin Koay"
  },
  {
    "slug": "get-cited-chatgpt-perplexity",
    "title": "How to get your brand mentioned or cited in ChatGPT and Perplexity answers?",
    "description": "To get cited in ChatGPT and Perplexity, your brand must be understandable, verifiable and consistent: clear entity definitions, structured data, and facts that match across independent sources.",
    "articleSection": "Guides",
    "datePublished": "2025-10-06",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "critical-schemas-entity-markup",
    "title": "Which schema and entity markup are most critical for brands?",
    "description": "For AI, the most critical schema are Organization, Article, Product, FAQPage and Author. They make a brand machine-readable, reducing ambiguity so AI can correctly associate and cite it.",
    "articleSection": "Guides",
    "datePublished": "2025-04-19",
    "authorName": "Ritu Khanna"
  },
  {
    "slug": "generative-search-industries",
    "title": "Which industries will be most affected by generative search?",
    "description": "The industries most affected by generative search are those built on informational discovery, healthcare, finance, education, technology and travel, where users seek expert answers before acting.",
    "articleSection": "Guides",
    "datePublished": "2025-04-17",
    "authorName": "Ritu Khanna"
  }
];
