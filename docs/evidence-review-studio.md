# Evidence Review Studio

## Local-Only Security Model

The studio is available only at `/dev/evidence-studio` when `NODE_ENV === "development"` and the request host is `localhost`, `127.0.0.1`, or `::1`. This is a local development safeguard, not production-grade authentication.

Private originals are served only through `/api/dev/evidence-original/[extractionId]`. The route validates the extraction ID against the private manifest and never accepts arbitrary filesystem paths.

## Start

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:3000/dev/evidence-studio
http://127.0.0.1:3000/dev/evidence-studio?view=summary
```

## Figure Matching

Use the left list to select an extracted image. Compare the private local view with the expected figure description. Confirming a match requires reviewer initials, confidence, figure ID, and a short note.

## Region Drawing

Choose a tool, then drag on the image viewport. Regions are stored as percentages. Solid redaction is for account names, URLs, personal information, unrelated commenters, profile photos, and QR codes. Highlight is for approved evidentiary regions only.

## Caption And Status Review

Record public caption draft, accessibility description, privacy, legal, translation, archive, and right-of-reply decisions. These remain review metadata and do not publish evidence.

## FIG-006

FIG-006 opens in redaction-preview mode. The private original is covered until the reviewer deliberately chooses to view it. Legal and translation review remain required by default.

## Preview Generation

```bash
npm run evidence:preview
```

This creates private geometry-preview SVG files under `private/evidence/previews/`. No original pixels are included and nothing is written to `public/`.

## Export

Use Export private config to update `private/evidence/publication-config.json`. Export never sets `allowPublication` or `publicationApproved`.

## Audit History And Backups

Controlled writes create backups in `private/evidence/backups/` and append concise audit entries to `private/evidence/review-history.jsonl`.

## Screenshot Prohibition

Do not commit screenshots of private originals. Safe documentation screenshots may show the empty interface, redaction preview, summary table, or controls only.

## Known Limitations

The studio is a local review tool. It does not provide production authentication, server-side raster redaction, final public derivative generation, or publication approval.

The separate `/dev/evidence-release` route shows release blockers and simulation previews. It does not provide one-click final approval, and Step 7 keeps `allowPublication` and `publicationApproved` read-only and false.
