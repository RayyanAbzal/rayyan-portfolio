# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain static HTML/CSS/JS, no build step, hosted on Vercel. Confirmed by repo CLAUDE.md ("No frameworks or build tooling unless explicitly requested").

## What it is

rayyanabzal.com is the site for Rayyan Abzal's solo AI consulting practice in Auckland, New Zealand. It exists to turn a visitor (usually a founder or operator who found Rayyan via search, LinkedIn, or a referral) into a booked 30-minute intro call on Calendly.

## Primary user and job

- Founders and operators of startups and small businesses, mostly non-technical, in NZ and abroad (clients so far in NZ, Malta, US).
- Situation: they have a manual process eating their week, or want AI inside an existing product, or need a whole tool built. They are deciding whether to book a call.
- Job: understand in seconds what Rayyan does, see proof it works, and book.

## Mechanism and position

One operator, end to end. The person who scopes the project writes the code, ships it, and answers when it breaks. Fixed-price proposals within 48 hours of the call. Problem-first: replace manual work with the lightest system that solves it, AI only when it fits.

## Offers (product truth, keep exact)

1. Replace manual work: automation or AI workflow, 1-3 weeks.
2. AI in your product: LLM features, agents, pipelines added to an existing codebase, 2-4 weeks.
3. Full build: platform, dashboard, bot, or contracts end to end, 4-8 weeks.

Process: 30-min free call, written fixed-price plan within 48h (with a visual process map), build with weekly updates and a live staging link, handover with docs, walkthrough, 30 days post-launch support.

## Proof and assets

- Client builds (case studies at work/*.html): Influence (CRM), Influence v2 (roster dashboard, repeat client), FeedHack (Discord payout automation), pumpdat (token launchpad).
- Personal builds: FIOS, ARIA, NZ Job Finder.
- Three client testimonials (Agency Director, Malta, x2; Founder, pumpdat). Attribution is role-only until clients approve names (docs/clients/testimonial-permission-messages.md).
- No client screenshots may be shown (Ray, 2026-09-04). Product visuals are CSS-drawn schematics with synthetic data.
- Assets: favicons, og.png (1200x630). No photo of Rayyan in the repo.
- Booking: Calendly popup, every CTA carries `onclick="return bookCall('<source>')"` for Vercel Analytics.

## Constraints

- Copy: first person, plain language, outcome first, no em dashes, lists end explicitly.
- SEO: homepage targets "AI consultant Auckland"; keep title/description/JSON-LD (ProfessionalService, Person, FAQPage) and canonical URLs. Case study URLs must not change.
- Each HTML page under 800 lines.
- No-JS and reduced-motion visitors get the full static page.

## Brand commitments

- Visual direction pinned by Ray (2026-09-04): the calm, image-led structure of bencium.io (soft warm neutral ground, large rounded white surfaces, one loud accent, big tight grotesque headline, few elements per view) rendered in Rayyan's own colours, not bencium's. Pine green survives as the brand accent.
- Site splits into Home, Projects, About (2026-09-04). Principles and FAQ leave the homepage; they live on About.

## Open decisions

- Real client names in testimonials: pending client approval.
- Photo of Rayyan: none available; About page runs without one until supplied.
