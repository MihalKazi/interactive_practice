# Evidence Workflow

## Source Ingestion

Source documents live under `source/` and raw extracted files live under `private/evidence/originals/`. Neither folder should be committed to a public repository.

Run:

```bash
npm run evidence:extract
```

The extractor reads `source/Propaganda_Analysis_Report.docx`, extracts `word/media/*`, calculates SHA-256 hashes, records MIME type, dimensions, byte size, and writes `private/evidence/extraction-manifest.json`.

## Figure Matching

The extraction manifest uses `MATCH_REVIEW_REQUIRED` by default. Editors must confirm each figure by checking caption, page location, appearance, and nearby report text before publication.

## Originals Versus Derivatives

Original files remain private. Public derivatives must use neutral names in `public/evidence/approved/`, such as `evidence-001-public.webp`. Do not use account names, handles, source URLs, archive IDs, or private filenames in public derivatives.

## Redaction Workflow

Use solid redaction for personal identifiers, profile URLs, account names, unrelated users, QR codes, and unapproved comments. Use pixelation for faces or profile photos only when approved. Use blur only where the remaining shape is safe. Crop only when context remains intact.

## Annotation Workflow

Annotations use percentage coordinates in `src/data/evidence.ts`. Desktop may show overlay regions. Mobile must also show the annotation list below the image.

## Translation Review

Original Bengali and English translations require review before publication. Until review, display `Working translation - not approved for publication` and avoid side-by-side long extremist passages.

## Approval Gates

Each item needs editorial, legal, privacy, translation, archive, and publication approval before `publicationApproved` can become `true`.

## Publication Checklist

- Figure matched to correct caption
- Source context confirmed
- Date confirmed
- Account identity decision recorded
- Profile image decision recorded
- Unrelated users redacted
- URLs redacted
- Personal information redacted
- Violent language minimised
- Original Bengali reviewed
- English translation reviewed
- Screenshot integrity confirmed
- Archive status recorded
- Caption approved
- Legal review completed
- Right-of-reply decision recorded
- Public derivative generated
- Accessibility checked
- Mobile readability checked
- `publicationApproved` explicitly enabled

## Corrections And Withdrawal

If evidence is challenged or approval changes, remove the public derivative, set `publicationApproved: false`, document the correction, and rebuild.

## Public Safety Checks

Run:

```bash
npm run evidence:validate
```

Validation checks IDs, figure numbers, unsafe public paths, public excerpts, sensitive warnings, annotation bounds, and direct platform URLs.

For local matching and redaction planning, use `docs/evidence-review-studio.md`. The studio exports only private review configuration and keeps publication disabled.

Step 7 separates review from release. Confirmed figure mapping, reviewed captions and accessibility text, privacy/legal/translation/archive/right-of-reply decisions, approved annotations, versioned derivative paths, and explicit release flags are required before public rendering.
