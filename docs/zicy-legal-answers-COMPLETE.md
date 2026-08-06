# Zicy legal facts: completed answers

**Status of each answer is marked.** Three kinds:

- **OBSERVED** — I verified it directly in the live product on 6 August 2026. Publish it.
- **RESEARCHED** — the best-practice or legally-required answer, with the source named. Publish it.
- **VERIFY** — I could not reach it. Two items only, both listed at the end.

---

# Part 1. What Zicy actually runs — OBSERVED

Inspected live: www.zicy.com across five pages, and app.zicy.com signed in.

## Sub-processors, confirmed

| Provider | What it does | Evidence |
| :---- | :---- | :---- |
| **Google Firebase Authentication** | Sign-in and session tokens | `identitytoolkit.googleapis.com`, `securetoken.googleapis.com`, `firebase:authUser` in localStorage |
| **Stripe** | Payments | `js.stripe.com`, `__stripe_mid` and `__stripe_sid` cookies |
| **Sentry** | Error and crash monitoring | `o4510272266764288.ingest.**us**.sentry.io` — US ingest region |
| **Google Analytics 4 + Tag Manager** | Product and site analytics | `G-YEW4D13JKT` (marketing), `G-KV5E88LTXN` (app), `GTM-5WRRKR2J` |
| **Vercel** | Marketing site hosting and cookieless analytics | first-party `/d5bd96ff2b48adc8/script.js`, Vercel code confirmed |
| **OpenAI** | Ask Zicy, embeddings | Responses API and `text-embedding-3-large`, per Zicy's own capability report |
| **MongoDB Atlas** | Primary database and vector search | `$vectorSearch` over `knowledge_chunks`, same report |

## Answers this closes

**Payment processor: Stripe. Card data never touches Zicy systems.** Stripe.js collects card details in Stripe-hosted fields inside the browser and posts them to Stripe directly. Zicy never sees or stores a card number. This is exactly the sentence to publish, and it is a trust asset — say it plainly.

**Auth provider: Google Firebase Authentication.**

**Error monitoring: Sentry, US region.** This is a cross-border transfer and Sentry payloads can contain personal data in error context. It belongs in the sub-processor table and in §11.

**Two live GA4 properties, not one.** `G-YEW4D13JKT` on the marketing site, `G-KV5E88LTXN` on the app. This corrects my earlier note: `_ga_KV5E88LTXN` is **not** residue, it is the app's active property. Only `_ga_DEMO123` is a genuine orphan, registered in neither runtime.

## Two defects worth fixing separately

1. **Google Fonts is loaded from Google on app.zicy.com** (`fonts.googleapis.com`, `fonts.gstatic.com`), even though the marketing site correctly self-hosts. Serving Google Fonts from Google transmits every visitor's IP address to Google, which a German court found unlawful under GDPR in 2022. Self-host them on the app as you already did on the marketing site.
2. **GA4 collect returns 503 on every hit** — six for six across two sessions on the marketing property. Likely recording nothing.

---

# Part 2. Cross-border transfers, §11 — RESEARCHED

**The legal position changed in your favour.** The Personal Data Protection (Amendment) Act 2024 **removed the old whitelist regime**. Transfers are now assessed on a risk basis: permitted where the destination has law substantially similar to the PDPA or provides adequate protection, or under specified exceptions. The Commissioner's 2025 Cross-Border Personal Data Transfer Guidelines explicitly accept **contractual clauses, naming EU GDPR Standard Contractual Clauses as an example**, as a valid mechanism.

**So the answer to write is:** Zicy transfers personal data outside Malaysia to the providers listed above. Whether the page can also claim standard contractual clauses depends on the DPA status below.

**Status of the four DPAs, verified 6 August 2026.** Two are already in force without anyone signing anything. Two are not.

| Provider | Status | Evidence |
| :---- | :---- | :---- |
| **Stripe** | **Already in force** | "The Data Processing Agreement forms part of your Stripe Services Agreement." The 2021 EU SCCs are incorporated via Stripe's Data Transfers Addendum |
| **MongoDB Atlas** | **Already in force** | The DPA "is incorporated into and forms a part of the Cloud Subscription Agreement, Cloud Terms of Service". SCCs: "By entering into the MongoDB Agreement, Data Exporter is deemed to have signed the Standard Contractual Clauses" |
| **Sentry** | **Not in force** | Requires separate execution through Sentry's DPA request process. SCCs are deemed signed once that DPA is accepted, but not before |
| **OpenAI** | **Not in force** | Requires affirmative execution of OpenAI's Data Processing Addendum |

**So the honest position today is:** Zicy has standard contractual clauses in place with Stripe and MongoDB Atlas, and not with Sentry or OpenAI.

Two consequences:

1. A blanket sentence claiming SCCs with all providers must not be published. It is not true yet.
2. Sentry and OpenAI each take a few minutes through a self-serve form. Executing a contract is a legal act, so it needs a human. Once both are done, the blanket sentence becomes true and can be added in a one-line follow-up.

---

# Part 3. Retention schedule, §12 — RESEARCHED, adopt as written

GDPR Article 5(1)(e) and the PDPA Retention Principle both require that data is kept no longer than necessary, and both require you to state the period or the criteria. Neither prescribes numbers. The schedule below reflects standard B2B SaaS practice and is defensible on its face.

| Data | Retention | Reasoning |
| :---- | :---- | :---- |
| Account and profile records | Life of account, deleted 90 days after closure | Industry-standard grace period for accidental closure and reactivation |
| Brand profiles, tracked prompts, analysis history | Life of account, deleted 90 days after closure | One rule across product data is easier to honour than five |
| AI engine responses | Life of account, deleted 90 days after closure | This is the historical trend record the product exists to build |
| Connected Google and Bing data, after disconnect | 30 days | Deliberately short. Google's Limited Use terms push toward prompt deletion, and a short window is a selling point |
| Ask Zicy chat history, after account closure | 90 days | Matches the account rule |
| Generated content drafts | Life of account, deleted 90 days after closure | Matches the account rule |
| Billing and invoice records | **7 years** | Not discretionary. Malaysian tax law requires business records be kept 7 years |
| Security and access logs | 12 months | Long enough for incident forensics, proportionate under storage limitation |
| Data sent to OpenAI | Up to 30 days, held by OpenAI | OpenAI's published API retention for abuse monitoring, then deleted. Not used for training |
| Backups | Rolling cycle, see VERIFY below | |

**Include this sentence.** "Data deleted from live systems remains in encrypted backups until the backup cycle overwrites it." Every serious policy has it. Omitting it turns a deletion promise into a false statement.

**Each accepted row is a dev ticket.** A published retention period the product does not enforce is worse than publishing nothing.

---

# Part 4. Data protection officer — RESEARCHED

Since **1 June 2025** Malaysian law requires a DPO where processing involves **more than 20,000 data subjects**, or **sensitive personal data of more than 10,000**, or **regular monitoring of personal data**. Where triggered, the DPO's contact details must be filed with the Commissioner **within 21 days** of appointment.

**Assessment for Zicy:** almost certainly not triggered today. Your data subjects are the individual users inside customer accounts, a number far below 20,000. You process no sensitive personal data. And the monitoring Zicy performs is of *brands in AI answers*, not of individuals, so the third limb does not bite either.

**So publish a named privacy contact, not a DPO.** Claiming a DPO you have not registered is worse than not having one. Revisit if user count approaches 20,000.

**Also now in force, and worth knowing even though it is not policy copy:** breach notification to the Commissioner within **72 hours** where significant harm is likely, and to affected individuals within **7 days** of that notification. "Significant harm" includes a breach affecting more than 1,000 data subjects. You need an incident runbook, not just a policy page.

---

# Part 5. Two items I could not reach — VERIFY

Everything else above is answered. These two need a dashboard I have no access to.

1. **Hosting regions.** MongoDB Atlas cluster region, and the region your API and workers run in. CORS strips the headers that would reveal it, so it cannot be read from the browser. Two dashboard glances. Note that Sentry is confirmed **US**, so a cross-border transfer exists regardless of where the database sits.
2. **Backup retention cycle.** Read off Atlas backup settings. Typically 35 days on Atlas defaults, but publish the real number.

---

## Sources

- Mayer Brown, [Malaysia PDPA amendments and 2025 Cross-Border Transfer Guidelines](https://www.mayerbrown.com/en/insights/publications/2025/07/from-legislative-reform-to-practical-guidance-key-amendments-to-malaysias-pdpa-and-the-launch-of-cross-border-transfer-guidelines)
- Securiti, [Malaysia 2025 guidelines: DPO appointment and breach notification thresholds](https://securiti.ai/malaysia-data-protection-guidelines-dpo-appointment-and-breach-notification/)
- One Asia Lawyers, [New requirements effective 1 June 2025](https://oneasia.legal/en/6322)
- OpenAI, [Data controls in the OpenAI platform](https://developers.openai.com/api/docs/guides/your-data)
- Stripe, [Advanced fraud detection and Stripe.js](https://docs.stripe.com/disputes/prevention/advanced-fraud-detection)
- Malaysian 7-year record-keeping requirement, [Income Tax Act 1967 s.82](https://ancgroup.biz/keep-sufficient-records-for-7-years/)
