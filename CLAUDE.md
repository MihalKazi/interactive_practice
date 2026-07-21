# CLAUDE.md

## Project

`Tech and Hate` is a Next.js App Router site for **Inside the Network**, an interactive investigative report adaptation of Hasan Al Mahmud's "Propaganda: An Analysis of Extremist Campaigns Targeting the Bangladesh Armed Forces" dated March 20, 2026.

The website is a story-first scrollytelling investigation. It explains triggering events, narrative origins, dataset classifications, evidence standards, limitations, and recommendations. It is not a generic marketing site.

## Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS v4 via `src/app/globals.css`
- Framer Motion, Recharts, Lucide React
- Path alias: `@/*` points to `src/*`

## Main Commands

```bash
npm run dev
npm run lint
npm run type-check
npm run build
npm run evidence:validate
npm run evidence:release-check
```

Local site:

```text
http://localhost:3000
```

Development-only evidence tools:

```text
http://localhost:3000/dev/evidence-review
http://localhost:3000/dev/evidence-studio
http://localhost:3000/dev/evidence-studio?view=summary
http://localhost:3000/dev/evidence-release?simulate=1
```

## App Shape

- `src/app/layout.tsx`: metadata, Bengali Google fonts, theme init script, root HTML/body.
- `src/app/page.tsx`: homepage composition. It imports report, layout, report, scrolly, data, and evidence components.
- `src/app/dev/*`: local development newsroom/evidence pages. These must stay development-gated.
- `src/app/api/dev/*`: local-only APIs for evidence review state, original access by manifest ID, metadata, regions, match, export, publish simulation, upload, and remove.

## Important Folders

- `src/components/layout`: header, footer, reading progress, nav, theme toggle.
- `src/components/report`: editorial sections, hero, dataset preview wrapper, timeline, methodology, recommendations, status UI.
- `src/components/data`: aggregate dataset views.
- `src/components/scrolly`: sticky scrollytelling system and visual states.
- `src/components/evidence`: public evidence frames, placeholders, overlays, metadata.
- `src/components/evidence-studio`: local review UI.
- `src/data`: public-safe typed report/evidence data only.
- `src/lib`: data generation, validation, dev evidence helpers.
- `src/types`: shared TypeScript shapes.
- `scripts`: evidence extraction, validation, preview, review, release utilities.
- `docs`: architecture, safety, workflow docs, safe screenshots.
- `source` and `private`: raw DOCX/evidence/private state. Treat as sensitive local material.

## Data Model

`src/data/report.ts` holds public report facts and labels:

- 61 profiles analysed.
- 42 fake or pseudonymous identities.
- 815,000+ combined visible followers across 38 accounts only.
- 4 recurring narrative categories.
- Ideological categories are aggregate totals only.
- Identity grid cells are generated synthetic labels like `Profile 01`, not real accounts.

Do not turn aggregate dataset UI into real account-level UI unless reviewed public records exist.


```text
public/evidence/approved/
```

Private originals, screenshots, hashes, source filenames, reviewer notes, archive references, direct platform URLs, account handles, and raw OCR must not enter public bundles.

Current Step 7 release state is intentionally zero-publication:

- No current figure is confirmed.
- `allowPublication` and `publicationApproved` remain false.
- Public evidence should render accessible placeholders, not raw images.
- `npm run evidence:release-check` is expected to show all six evidence items blocked.
- `npm run evidence:build` may succeed with zero generated public files.

Before publication-related changes, run:

```bash
npm run evidence:release-check
npm run evidence:validate
```


## UI/Design Intent

The homepage is premium editorial scrollytelling:

- Full editorial hero, not a landing-page sales hero.
- Chapter transitions and sticky visual stages.
- Dense, serious investigative tone.
- Light/dark theme supported by CSS variables.
- Bengali typography prepared via Noto Sans/Serif Bengali.
- Accessible disclosure controls, keyboard-friendly interactions, and reduced-motion fallback.

Avoid decorative-only visuals that weaken the investigative tone. Evidence visuals must reveal approved material or clearly state placeholder/reconstruction status.

## Scrollytelling Notes

`src/components/scrolly/ScrollyChapter.tsx` uses IntersectionObserver through `src/hooks/useActiveScrollStep.ts`.

Rules:

- No scroll hijacking or snap scrolling.
- Mobile stacks visuals with related steps.
- Reduced-motion users get static final-state visuals.
- Debug mode: append `?debugScrolly=1`.

## Validation Expectations

Use these checks after meaningful changes:

```bash
npm run lint
npm run type-check
npm run build
```

Use evidence checks after touching evidence, data safety, release code, public evidence data, or related scripts:

```bash
npm run evidence:validate
npm run evidence:release-check
```

Responsive QA targets:

- 360px / 390px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

Check no horizontal overflow, readable Bengali/English labels, usable nav, sticky scrolly behavior, table overflow, focus states, and reduced-motion behavior.

## Current Mental Model

The public website tells the story; the private workflow decides what evidence can safely support it.

Homepage = public investigative narrative.

Development tools = local newsroom workflow.

Release pipeline = safety gate that prevents raw or unapproved evidence from reaching public users.

When in doubt, keep public output anonymized, aggregate, cautious, and validated.
