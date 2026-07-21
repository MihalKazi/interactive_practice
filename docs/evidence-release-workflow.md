# Evidence Release Workflow

Step 7 adds a zero-publication release pipeline. Private originals and review previews remain private until each item has confirmed figure mapping, redaction configuration, caption and accessibility review, editorial/privacy/legal/translation/archive/right-of-reply decisions, and explicit release approval.

Review state lives in `private/evidence/review-state.json`. Release state lives in `private/evidence/release-state.json`. Review can prepare evidence; release controls public rendering. `allowPublication` and `publicationApproved` must both be true before any public image can render.

Evidence is associated only by explicit IDs: `extractionId`, `evidenceId`, `proposedFigureId`, `confirmedFigureId`, `derivativeId`, and `publicAssetVersion`. Array order is never authority. Duplicate confirmed figures block release.

Run `npm run evidence:release-check`. Current expected result is six blocked items. Blockers include pending figure match, missing redactions, missing caption/accessibility text, unresolved approvals, unsafe paths, missing derivatives, false publication flags, and withdrawn releases.

Future public derivatives use neutral versioned names such as `evidence-001-v1.webp` under `public/evidence/approved/`. The builder skips every blocked item and treats zero generated files as success.

`src/data/public-evidence.ts` exposes only sanitized fields. It never includes extraction IDs, private filenames, hashes, local paths, source account URLs, reviewer initials, or internal notes.

Public annotations require `publication-approved`. Draft, researcher-reviewed, editor-approved, rejected, private notes, raw OCR, and unapproved translations are excluded.

Blocked evidence preserves scroll position with accessible placeholders. Approved evidence later loads only the approved derivative and approved annotations. Diagrammatic reconstructions must be labelled as such.

FIG-006 requires `SensitiveEvidenceGate`, legal approval, translation review, privacy redaction, content warning, and 15-word excerpt limit. Reveal state is session-only and not persisted.

`/dev/evidence-release?simulate=1` is development-only and shows a clear simulation banner. It may reference private redacted previews in metadata but never creates public files and never affects the homepage.

Evidence may become active, corrected, replaced, withdrawn, or temporarily unavailable. Withdrawn evidence does not render an image; a public correction note may remain without exposing private dispute details.

`npm run evidence:validate` fails on dev URLs, localhost paths, private/source paths, Windows drive paths, missing derivative files, duplicate derivative paths, ambiguous mappings, renderable unapproved evidence, withdrawn renderable evidence, sensitive evidence without warning, and unapproved public annotations.

No current figure is confirmed. No current item has `allowPublication` or `publicationApproved`. Manual newsroom sign-off is required per item before release.
