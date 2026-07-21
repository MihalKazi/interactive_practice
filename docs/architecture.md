# Architecture

## Component Architecture

The application is split into layout components, report-specific components, and small UI primitives. Client components are limited to reading progress, active navigation, mobile navigation, and optional content-warning reveal behavior.

Step 2 added more report-level composition components:

- `DatasetPreview`
- `TimelinePreview`
- `NarrativeSequence`
- `MethodologySection`
- `RecommendationList`
- `EditorialStatus`

These keep the homepage readable while avoiding a single oversized page component.

Step 3 added `src/components/data/` for aggregate visualisations:

- `IdeologicalDistribution.tsx` renders the Recharts horizontal bar chart, count/percentage view state, tooltip, methodology caution, and accessible table.
- `ProfileIdentityGrid.tsx` renders deterministic aggregate grid cells, filter emphasis controls, selected-cell details, identity legend, and methodology warning.
- `FollowerContext.tsx` renders aggregate follower-count context without implying unique reach.

Step 4 added `src/components/scrolly/`:

- `ScrollyChapter` composes narrative steps, sticky visual stage, mobile stacked fallback, chapter progress, and debug mode.
- `ScrollyStep` keeps story text in document order with status labels.
- `StickyVisualStage` provides the reusable figure frame, caption, source label, and methodology shortcut.
- `ScrollyProgress`, `ChapterTransition`, and `VisualCaption` provide local pacing and transition primitives.
- `ScrollyVisuals` contains lightweight SVG/CSS visual states for aggregate markers, triggering-event reconstruction, timeline preview, and narrative motifs.

Active-step detection lives in `src/hooks/useActiveScrollStep.ts` and uses IntersectionObserver, not scroll-position polling. `useReducedMotionPreference` and `useStickySupport` provide progressive enhancement.

## Data Architecture

Typed starter data lives in `src/data/report.ts`, with shared types in `src/types/report.ts`. Interface labels live in `src/data/translations.ts` to prepare for bilingual expansion without introducing a full internationalisation library yet.

Dataset flow is typed as aggregate data:

- `IdeologicalCategory` and `IdentityCategory` store verified category totals and editorial descriptions.
- `ProfileGridCell` is generated in `src/lib/report-data.ts` from identity aggregates. It stores synthetic display labels only.
- Runtime development checks confirm ideological totals, identity totals, generated cells, and non-negative values.

## Future Visualisations

Planned visualisations include an ideological distribution chart, identity grid, interactive timeline, evidence explorer, and narrative comparison modules. Current CSS-only previews are placeholders and should be replaced only after editorial data and accessibility requirements are final. These should be accessible, keyboard usable, and accompanied by limitations.
The ideological chart derives its visible bars and table rows from the same typed category source. Small screens use an editorial CSS bar list to preserve label readability. The table remains visible in a disclosure as a non-hover fallback.

The identity grid intentionally does not create account-to-account links. Future row-level integration must add a reviewed public record type and replace generated cells only when account names, dates, URLs, follower values, evidence IDs, and classifications are safe to publish.

Evidence architecture lives in `src/components/evidence/`. `EvidenceFrame` stores metadata, frame placeholder, annotation region, status labels, and caption. `EvidenceSequence` demonstrates reveal states with placeholder frames only.

Step 5 extends evidence architecture:

- `src/data/evidence.ts` stores public-safe evidence metadata only.
- `src/types/evidence.ts` defines review-status enums, evidence records, and percentage-based annotations.
- `src/lib/evidence-validation.ts` enforces public safety rules at module load and in `npm run evidence:validate`.
- `EvidenceViewer`, `EvidenceImage`, `EvidenceOverlay`, `EvidenceMetadata`, `EvidenceStatusPanel`, `EvidenceCaption`, and `EvidenceContentWarning` render placeholders or approved derivatives without exposing private paths.
- `/dev/evidence-review` displays public metadata and previews only during development.
- Scripts under `scripts/` extract DOCX media privately and prepare reviewed derivative workflow manually.

Step 6 adds a local evidence review studio:

- `/dev/evidence-studio` is a development-only newsroom tool with local-host gating.
- `/api/dev/evidence-original/[extractionId]` serves private originals only by manifest ID.
- Controlled API routes update match, region, metadata, and export state in private JSON files with backups and audit history.
- `EvidenceStudio` provides the three-panel review UI, region drawing, redaction preview, public-layout simulation state, and summary table.

## Future CMS Option

A CMS should be considered only after the editorial model, evidence review states, and public/private data separation are stable.

## Future Bilingual Implementation

The current `Language` type supports `en` and `bn`. Future work can add route-level locale handling, translated report content, and Bengali typography QA.

## Public and Private Evidence Separation

Public components should consume sanitised records only. Raw screenshots, direct URLs, account handles, private notes, and internal archive references must remain outside the public bundle unless specifically approved.

Step 3 restrictions: no real account names, profile photographs, platform URLs, individual follower counts, ideological affiliation per grid cell, activity dates, or evidence IDs are stored in the public grid.

Step 7 adds explicit release records and the `canRenderPublicEvidence` guard. Public rendering cannot use private originals, dev APIs, extraction order, unapproved paths, or pending mappings. Sanitized manifest data lives in `src/data/public-evidence.ts`.
