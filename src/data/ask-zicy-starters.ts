// Ask Zicy starter questions: the chips in AskZicyWidget.astro render from this list,
// and tapping one shows the prewritten answer at once (no API call). The backend
// (zicy-tools public_chat/starters.py) holds the identical text, so keep both in sync.
// Copy follows the house style: straight apostrophes, no em dashes.

export interface AskZicyStarter {
  id: string;
  question: string;
  answer: string;
}

export const ASK_ZICY_STARTERS: AskZicyStarter[] = [
  {
    id: "brand-not-in-chatgpt",
    question: "Why isn't my brand showing up in ChatGPT?",
    answer: "That's a common one, and it's fixable. ChatGPT may not have enough trusted, independent information about your brand, your site may not clearly explain what you offer, or competitors may be mentioned more often in the sources it relies on. Search rankings can help, but they do not automatically determine AI recommendations.\n\nStart by asking ChatGPT the questions your customers would ask without naming your brand, then note which businesses and sources it mentions. Check whether your business details and services are consistent across your site and important third-party listings. What category and market is your brand in?",
  },
  {
    id: "what-is-aeo",
    question: "What is AEO and do I need it?",
    answer: "AEO means Answer Engine Optimization. It is the work of making your brand more likely to be understood, mentioned, and cited in AI-generated answers from ChatGPT, Gemini, Perplexity, Google AI Overviews, and Google AI Mode.\n\nYou probably need it if customers now ask AI for recommendations, comparisons, or local providers. Traditional SEO still matters, but strong search rankings do not automatically mean an AI engine will recommend your brand. AI answers also weigh how clearly your business is described and what trusted, independent sources say about you.\n\nA simple test is to ask an AI engine the questions your customers ask, without naming your business, then check whether it mentions you, your competitors, and which sources it uses. What type of business or market are you asking about?",
  },
  {
    id: "how-zicy-tracks",
    question: "How does Zicy track AI visibility?",
    answer: "Zicy tracks AI visibility by running the questions your customers might ask across ChatGPT, Gemini, Perplexity, Google AI Overviews, and Google AI Mode. It then records whether your brand appears, whether your website is cited, how much of the conversation you own, and where you rank in recommendation lists.\n\nThe main measures are:\n\n- Brand Mention Coverage: how often AI mentions you.\n- Web Citation Rate: how often AI links to your site.\n- AI Share of Voice: your share of all brand mentions.\n- Average AI Ranking: your typical position when recommended.\n\nResults can be viewed over daily, weekly, or monthly trends, so you can see whether visibility changes after content or other marketing work. Is this for tracking your own brand or comparing several competitors?",
  },
]
