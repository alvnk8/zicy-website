# Risk review: the live privacy and cookie policies

**Reviewed 6 August 2026** against the live pages at `/legal/privacy` and `/legal/cookies`, the behaviour observed in the product, and Malaysian, EU/UK and California requirements. I am not a lawyer and this is not legal advice; it is an engineering and evidence review of whether the pages match reality and whether anything on them creates exposure.

**Overall:** the pages are well above the standard for a company this size. Legal bases stated per data category, a real controller/processor split, a populated retention table, the Google Limited Use disclosure, and separate rights sections for three regimes. Nothing on either page is misleading in a way that would attract enforcement on its face.

The exposure is not in what the pages say. It is in **four promises that are not yet backed by anything**, plus **one Malaysian formality that is cheap to fix and easy to be caught out on**.

---

## HIGH — fix before this page is quoted at you

### 1. §13 publishes seven security controls that were never verified

The page states, as fact:

- encryption in transit using TLS, and encryption at rest
- role-based access control with staff access limited to those who need it
- password hashing
- logging and monitoring of access to production systems
- contractual security obligations on every sub-processor
- regular review of access rights

**None of these was ever confirmed.** "Every security control in section 13" was an open item on the facts sheet and was never answered. It survived into publication because it carried no token, so the deletion rule never caught it.

Why it matters more than the rest: after a breach, the regulator's first document is your published security statement, and the first question is whether it was true. A control you claimed and did not have is the difference between an incident and a misrepresentation.

**Action:** confirm each of the six line by line with whoever runs the infrastructure. Delete any that is not true today. "Encryption at rest" and "regular review of access rights" are the two most commonly claimed and least commonly implemented.

### 2. §10 claims every sub-processor is contractually bound, which is not established

The page says providers are "bound by contract to protect the data and to use it only on our instructions," and §13 repeats it as "contractual security obligations on every sub-processor."

That is true for Stripe and MongoDB Atlas, whose DPAs are automatically incorporated. **It is not true for OpenAI or Sentry** — neither DPA is executed. This is the same claim the standard contractual clauses sentence was deleted to avoid, re-entering the page in different words in two other sections.

**Action:** execute the OpenAI and Sentry DPAs. Both are self-serve and take minutes. That is a faster fix than rewording two sections, and it leaves the page stronger.

### 3. The retention table is a binding promise the product may not keep

Ten rows are now published, including deletion 90 days after account closure, 30-day deletion of disconnected Google and Bing data, and 12-month security log retention.

These were policy decisions, correctly made. But **publishing them makes them enforceable against you**, and there is no evidence the product implements any of them. A subject access or deletion request that the system cannot satisfy turns a good policy into a documented failure.

**Action:** raise one ticket per row and confirm each is enforced. Until then this is the largest gap between the page and reality.

### 4. §10 points to a data processing addendum that does not exist

The page says the sub-processor list "is also set out in our data processing addendum." `/legal/dpa` currently reads: *"This is placeholder copy. The final Data Processing Addendum will be published here by Zicy's legal team before launch."* `/legal/terms` says the same.

Two problems. The cross-reference is broken, which any enterprise buyer will find in the first five minutes of diligence. And a live privacy policy sitting beside a page announcing that legal has not finished yet undercuts the credibility of both.

**Action:** either publish a real DPA and terms, or remove the DPA cross-reference from §10 and drop both links until they exist. Removing is a ten-minute fix and stops the bleeding today.

---

## MEDIUM

### 5. The notice is English only, and Malaysian law requires both languages

A PDPA notice must be issued in **both English and Bahasa Malaysia**. This is one of the most commonly missed requirements for Malaysian companies, it is trivially checkable by a regulator or a competitor, and general PDPA non-compliance carries fines up to **RM300,000** or two years' imprisonment.

**Action:** publish a Bahasa Malaysia version at `/legal/privacy-bm` with a language switcher on both. This is the cheapest risk reduction on this list.

### 6. No EU or UK representative is named

Zicy sells into the EEA and UK. Where GDPR applies to a controller with no establishment there, Article 27 generally requires a designated representative in the EU, and the UK GDPR requires an equivalent, with the name published in the privacy notice. Neither appears.

**Action:** ask counsel whether the derogation for occasional, low-risk processing applies. If not, appoint one and name them in §17.

### 7. The "we do not sell or share" claim depends on a container you cannot see

§10 and §14 both state that Zicy does not sell personal information and does not share it for cross-context behavioural advertising. **I verified this is true today** — five pages with consent granted produced no advertising request of any kind.

The exposure is that this claim is only as stable as the GTM container `GTM-5WRRKR2J`, which is **not visible from your Google account**. Anyone with access can add a LinkedIn or Meta pixel and make a published CCPA statement false without touching your codebase. The stale `_ga_DEMO123` cookie proves unreviewed changes have already happened there.

**Action:** get ownership of that container. This is the single change that converts an ongoing risk into a controlled one.

---

## LOW, but worth a ticket

### 8. app.zicy.com loads Google Fonts from Google

This sends every app visitor's IP address to Google, which a German court found unlawful under GDPR in 2022. Your marketing site already self-hosts fonts correctly; the app does not. It is not disclosed on either page.

**Action:** self-host the fonts on the app, as you already do on the marketing site. Fixing it is easier than disclosing it.

### 9. Two cookie lifetimes are vendor-published rather than measured

`__stripe_mid` at 1 year and `__stripe_sid` at 30 minutes come from Stripe's documentation, not from observation. Low risk, correctly sourced, but if a regulator asks how you verified them the honest answer is that you did not.

### 10. `_ga_DEMO123` is in circulation and not listed

Correctly excluded from the table, since the table describes what Zicy sets now. But some returning visitors carry it, with a two-year life, and it is not disclosed anywhere. It resolves itself once the container is cleaned.

---

## What is genuinely strong, and worth using commercially

Do not lose these in the fix list. They are unusual and they are selling points:

- **§8 answers the question your buyers actually fear**, separating "data Zicy sends to OpenAI" from "prompts Zicy sends to the engines," and stating plainly that OpenAI does not train on it and Zicy has not opted in. Almost nobody in your category publishes this.
- **Consent Mode v2 is correctly implemented** — verified, not claimed. Analytics genuinely runs cookieless before consent.
- **The static-site statement is true and checkable**: the marketing site cannot set server-side cookies at all.
- **Breach notification commitments** name the 72-hour and 7-day PDPA timelines explicitly. Few Malaysian SaaS policies do.
- **The retention table gives reasons, not just periods.** That reads as competence to a procurement reviewer.

---

## Ordered fix list

| # | Fix | Effort | Risk removed |
| :-- | :---- | :---- | :---- |
| 1 | Verify or delete the §13 security controls | Hours | Misrepresentation after a breach |
| 2 | Execute the OpenAI and Sentry DPAs | Minutes | Two false contractual claims |
| 3 | Remove the DPA cross-reference, or publish the DPA | Minutes | Broken promise, visible in diligence |
| 4 | Ticket every retention row for enforcement | Days | Undeliverable deletion promises |
| 5 | Publish the Bahasa Malaysia version | Days | A specific Malaysian breach |
| 6 | Take ownership of the GTM container | Hours | Ongoing exposure on the no-sale claim |
| 7 | Ask counsel about the EU and UK representative | Ask | Article 27 gap |
| 8 | Self-host fonts on the app | Hours | Undisclosed transfer to Google |

Items 2 and 3 are the best value: both are minutes, and both remove a claim that is currently untrue.

---

**Sources**

- Malaysia, [PDPA notice requirements including the bilingual obligation](https://www.lawenco.com/post/5-key-elements-every-pdpa-notice-in-malaysia-must-have)
- [Malaysia DPO and breach notification requirements, effective 1 June 2025](https://oneasia.legal/en/6322)
- [Stripe DPA FAQs](https://stripe.com/legal/dpa/faqs) · [MongoDB DPA](https://www.mongodb.com/legal/data-processing-agreement) · [Sentry DPA](https://sentry.io/legal/dpa/) · [OpenAI DPA](https://openai.com/policies/data-processing-addendum/)
- Live page review and product inspection, 6 August 2026
