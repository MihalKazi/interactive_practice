# Inside the Network

Professional bilingual interactive investigative report foundation for “Propaganda: An Analysis of Extremist Campaigns Targeting the Bangladesh Armed Forces” by Hasan Al Mahmud.

## Overview

This project is a story-first scrollytelling website for a data-led investigation into extremist online narratives targeting the Bangladesh Armed Forces. The current build establishes the application shell, design system, typed starter data, homepage sections, accessibility patterns, and editorial safety documentation.

## Current Scope

- Next.js App Router with TypeScript, Tailwind CSS, and ESLint.
- Editorial homepage with hero, section navigation, reading progress, statistics, evidence placeholders, methodology, limitations, and recommendations.
- English-first bilingual architecture prepared for Bengali labels.
- No advanced charts, maps, network graph, CMS, database, or real evidence integration yet.

## Step 2 Visual Design Progress

- Redesigned the homepage into a premium editorial scrollytelling opening.
- Added a full-width animated hero with abstract CSS data-network artwork.
- Reworked opening statistics into an editorial data statement.
- Added chapter-style overview, dark triggering-event chapter, static timeline preview, CSS-only dataset previews, narrative sequence, expanded evidence cards, native methodology disclosures, editorial limitations, and structured recommendations.
- Implemented a working light/dark theme toggle with persisted preference and system preference fallback.

## Step 3 Dataset Interactives

- Replaced dataset placeholders with two production data views: an ideological classification bar chart and an interactive 61-profile identity grid.
- Both views use verified aggregate totals only. The grid uses synthetic labels such as `Profile 01`; these labels do not identify public accounts or reproduce source dataset order.
- Added a visible accessible data table fallback for the ideological chart and keyboard/touch interactions for the identity grid.
- Added follower-count context: 38 of 61 profiles had public follower information, with 815,000+ combined visible followers treated only as an aggregate count.
- Future row-level integration should replace generated grid cells with reviewed public records only after names, URLs, evidence IDs, dates, follower counts, and classifications have been verified and approved for release.

## Step 4 Scrollytelling System

- Added Reuters-inspired interaction principles without Reuters branding or assets: full-viewport editorial opening, sticky visual stages, progressive narrative steps, chapter transitions, and documentary evidence placeholders.
- Scrollytelling uses IntersectionObserver plus component-local active-step state. No scroll hijacking, snapping, GSAP, WebGL, video, or canvas effects.
- Desktop chapters use a narrative column beside a sticky visual stage. Mobile stacks each visual directly after its related step.
- Reduced-motion users receive static final-state visuals with readable prose preserved in document order.
- Evidence frames remain labelled placeholders: approved screenshots can be inserted later, but current visuals state `Verified evidence image pending editorial approval`.
- In development, append `?debugScrolly=1` to show scrollytelling boundaries and active-step status.

## Step 5 Evidence Workflow

- Added private DOCX image extraction into `private/evidence/originals/` with hashes and an extraction manifest.
- Added public evidence records in `src/data/evidence.ts`; all six default to `publicationApproved: false`.
- Added public-safe evidence placeholders, annotation overlays, metadata panels, and sensitive-content warning flow.
- Raw evidence and source documents must never be committed to a public repository.
- A private newsroom repository may store encrypted source material separately, but the public app should receive only reviewed derivatives and safe metadata.

Evidence commands:

```bash
npm run evidence:extract
npm run evidence:build
npm run evidence:validate
```

Development review page:

```text
http://127.0.0.1:3000/dev/evidence-review
```

This route is gated to development mode.

Local evidence studio:

```text
http://127.0.0.1:3000/dev/evidence-studio
http://127.0.0.1:3000/dev/evidence-studio?view=summary
```

Extra review commands:

```bash
npm run evidence:preview
npm run evidence:review-validate
npm run evidence:review-summary
```

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React
- clsx and tailwind-merge

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Quality checks:

```bash
npm run lint
npm run type-check
npm run build
```

## Responsive Review

Review the homepage at approximately `360px`, `390px`, `768px`, `1024px`, and `1440px`. Check hero wrapping, mobile menu, anchor navigation, statistics, timeline, evidence cards, methodology disclosures, dark/light theme, and Bengali label spacing.

For Step 3, also verify exactly 61 identity cells, correct identity counts, chart count/percentage switching, filter emphasis counts, selected-cell copy, table overflow, keyboard focus, reduced-motion behavior, and no horizontal page overflow.

For Step 4, review hero, opening data reveal, triggering-event scrolly, historical origins, dataset chapter, narrative chapters, evidence placeholders, anchors, dark/light themes, 200% zoom, reduced motion, and mobile stacked scenes.

If browser screenshot tooling is available, capture:

```text
docs/screenshots/homepage-mobile.png   390 x 844
docs/screenshots/homepage-tablet.png   768 x 1024
docs/screenshots/homepage-desktop.png  1440 x 1000
```

Screenshot files are review artifacts only and are not required for publication.

## Folder Structure

```text
src/
  app/
  components/
    layout/
    report/
    ui/
  data/
  lib/
  types/
docs/
```

## Data Handling Rules

Public data must be anonymised, typed, and reviewed before release. Do not publish direct links to extremist accounts or websites. Treat the 815,000+ follower figure only as an aggregated visible follower count across 38 accounts, not unique reach.

## Accessibility Principles

The interface uses semantic sections, one `h1`, skip navigation, keyboard-accessible menus, focus states, high-contrast colors, reduced-motion handling, and readable responsive typography.

## Editorial Safety Principles

The project separates documented findings, analysis, limitations, and recommendations. Sensitive excerpts require content warnings, short contextual use, redaction, and editorial/legal review.

## Planned Phases

1. Integrate approved editorial copy and redacted evidence.
2. Add accessible charts and timeline interactions.
3. Add account-grid and narrative exploration components.
4. Evaluate bilingual content workflow.
5. Consider CMS integration only after public/private evidence separation is final.

## Step 7 Evidence Release

Release infrastructure is present but defaults to zero publication. Use `npm run evidence:release-check`, `npm run evidence:release-summary`, `npm run evidence:release-simulate`, `npm run evidence:build`, and `npm run evidence:validate`. All six items remain blocked; mappings remain pending; `allowPublication` and `publicationApproved` remain false; `public/evidence/approved/` should contain only `.gitkeep`. See `docs/evidence-release-workflow.md`.
