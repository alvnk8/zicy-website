# Build the Zicy website with Claude Code — START HERE

This is your step-by-step. You don't write any code — Claude Code builds; you run it and answer its questions. Work through it **one prompt at a time** and preview after each.

**Non-negotiable for this build:** the finished site must be fully **indexable and crawlable by all AI/search agents** (Google, Bing, GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) for SEO/AEO/GEO. Zicy sells AI visibility — the site has to pass its own test. This requirement is baked into the prompts and the checklist below; don't skip the verification step.

---

## What's in this folder
- `zicy-website-wireframe.html` — the clickable visual spec (the look to match)
- `zicy-website-copy-deck.md` — final copy for every page (titles + meta included)
- `zicy-website-build-brief.md` — architecture, brand tokens, **AI-crawlability spec**, prompts
- `zicy-brand-assets.md` — colours + fonts (Option B: Schibsted Grotesk · Inter · Space Mono)
- `robots.txt`, `llms.txt`, `sitemap.xml` — drop-in crawlability files (welcome AI bots)

---

## Step 1 — Install the tools (one-time, ~15 min)
1. **Node.js 18+** — download the "LTS" build from nodejs.org and install.
2. **Claude Code** — open Terminal (Mac: Cmd+Space → "Terminal"). Follow the current install steps at **docs.claude.com → Claude Code → Setup** (one command, then log in with your Anthropic account).
3. **VS Code** (optional) from code.visualstudio.com — to see the files.

## Step 2 — Open the project
1. Put all the files above into one empty folder, e.g. `zicy-website`.
2. In Terminal: type `cd ` (with a space), drag the folder onto the window, press Enter.
3. Type `claude` and press Enter to start Claude Code in that folder.

---

## Step 3 — Run these prompts in order

### Prompt 1 — scaffold + homepage (crawlable from line one)
> I'm building a website and you'll do the coding. In this folder are a clickable HTML wireframe (zicy-website-wireframe.html), a build brief, a copy deck, and brand assets. Read all of them first, especially the build brief's "AI crawlability & AEO build spec" — that part is critical.
>
> Scaffold an **Astro** static site that reproduces the wireframe's design exactly. Hard requirements:
> - **Every page is a real, server-rendered route with ALL content in the initial HTML.** Do NOT copy the wireframe's client-side show/hide — that was prototype-only. AI crawlers must read everything without running JavaScript.
> - Navigation and CTAs are real `<a href>` links, not JS onclick.
> - Extract styles into a shared theme using the CSS variables and Option B fonts (Schibsted Grotesk, Inter, Space Mono) from the brief.
> - Split header and footer into shared components.
> - Add the `robots.txt`, `llms.txt` and `sitemap.xml` from this folder to the site's public root, and add the JSON-LD structured data from the crawlability spec.
> - Use semantic HTML (one h1 per page, real header/nav/main/section/footer) and a unique title + meta description per page from the copy deck.
>
> Build the homepage first using the copy deck. Explain what you're doing as you go, then tell me how to preview it.

When it's done it'll say to run `npm run dev` and open a link. Look at the homepage.

### Prompt 2 — all remaining pages
> Now build all remaining pages from the copy deck and wireframe, each as its own crawlable route with unique title/meta and JSON-LD: Platform; the four Solutions pages (use For Brands as the template); the Free tools hub plus the AEO/GEO Consultant and Chrome extension pages; Pricing; the Case studies index plus all five case detail pages; Done-for-you; About; and Resources. Keep the §A2 guardrails: Growth.pro's IP appears only on Done-for-you, About, the provenance line, and the attributed mention on the Consultant page. Keep all five case studies anonymised.

### Prompt 3 — AI crawlability verification (do not skip)
> Now verify the whole site is fully indexable and crawlable for SEO/AEO/GEO. Check and fix:
> - Every page renders its full content in the initial HTML with JavaScript disabled (no content hidden behind JS).
> - `robots.txt` is served at the root and explicitly allows AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended and the rest); only app/auth pages are disallowed.
> - `llms.txt` is served at the root and lists every public page.
> - `sitemap.xml` is generated dynamically with accurate lastmod dates, lists every public URL, and is referenced in robots.txt.
> - Valid JSON-LD on every page (Organization + WebSite sitewide; SoftwareApplication on Platform/Pricing; FAQPage where FAQs exist; Article on case studies and resources).
> - One h1 per page, logical headings, canonical tags, Open Graph tags, descriptive alt text on every image, and `<html lang>` set.
> - Fast load and mobile-friendly.
> Then show me how to test it: how to view a page with JS disabled, and how to validate the structured data.

### Prompt 4 — mobile menu + polish
> Build a proper mobile navigation menu (the wireframe just hides the desktop nav). Then do a visual polish pass: orange used only for actions, every metric in Space Mono, sections alternating white/lavender. Finally, list everything that still needs a human (logo, screenshots, form wiring, pricing confirmation).

---

## Step 4 — The human bits (Claude Code will remind you)
- Drop in the real **Zicy logo** (+ a reversed/white version for the indigo bands) and favicon.
- Add the **dashboard screenshots** (hold back the two flagged ones — the negative-correlation chart and the display-only entity graph).
- Wire the **free-audit form** and embed the **AEO/GEO Consultant** app.
- Confirm **pricing** tiers against live.
- Keep **case studies anonymised** until you have naming permission.
- **§A2 sign-off:** confirm you're happy with the attributed Growth.pro mention on the Consultant page (it's a 4th IP surface).

## Step 5 — Deploy
Easiest is **Vercel** or **Netlify** (free to start). Just ask Claude Code:
> How do I deploy this Astro site to Vercel, and how do I point my domain at it?

After it's live, ask Claude Code to confirm the live URLs of `robots.txt`, `llms.txt` and `sitemap.xml` resolve, then submit the sitemap in **Google Search Console** and **Bing Webmaster Tools**.

---

## Launch checklist
- [ ] Server-side rendered — full content in initial HTML, real URL per page (NOT the SPA wireframe pattern)
- [ ] **AI crawlability verified (Prompt 3 passed): robots.txt welcomes AI bots · llms.txt live · sitemap.xml live + referenced · JSON-LD on every page · tested with JS disabled**
- [ ] Unique title + meta description per page; canonical + OG tags; alt text on images
- [ ] All pages built; ICP + case pages populated; cases anonymised
- [ ] §A2 guardrails hold (Growth.pro IP only on Done-for-you, About, provenance line, attributed Consultant mention)
- [ ] Mobile menu works; orange = action only; metrics in Space Mono
- [ ] Real logo + favicon; screenshots in (flagged ones excluded)
- [ ] Free-audit form + Consultant embed wired; pricing confirmed
- [ ] Finished site passes Zicy's own Site Audit (eat the dog food)
- [ ] Deployed; sitemap submitted to Google Search Console + Bing

---

## Tips
- One prompt at a time, preview after each.
- Talk to Claude Code in plain English — "make the hero bigger", "that blue's wrong", "this page isn't rendering its text without JS — fix it."
- If anything breaks, paste the error back to it.
- The wireframe is the look; the copy deck is the words; the build brief is the rules. When in doubt, point Claude Code at the relevant file.
