# Data Safety

## Public Versus Private Data

Only reviewed, anonymised, public-facing data belongs in `src/data`. Private research notes, raw exports, and unredacted screenshots must stay outside the public application bundle.

## Personally Identifiable Information

Do not publish personal phone numbers, addresses, emails, family information, or identifiable account details without explicit editorial and legal approval.

## Screenshot Handling

Screenshots require redaction for handles, profile photos, comments that identify private people, and any unnecessary extremist slogans. Screenshot placeholders must not imply verification.

## Archive References

Archive identifiers should be stored privately until a publication decision is made. Public pages should avoid direct extremist links.

## Evidence Hashes

Future evidence records may include hashes or internal IDs for verification. Public hashes should be reviewed to ensure they do not expose private archive paths.

## No Direct Extremist Links

The public site must not link to extremist accounts, channels, or websites. Use neutral descriptions and internal evidence IDs instead.

## Public JSON Sanitisation

Before any data file is shipped, audit it for names, URLs, handles, raw notes, hidden metadata, and accidental long excerpts.

## Step 5 Evidence Controls

`source/` and `private/` are ignored by git. The browser must never receive private paths, original filenames containing identities, raw URLs, archive links, or private hashes.

Public derivatives belong only in `public/evidence/approved/` and must use neutral filenames. Non-approved evidence must render placeholders.

Run `npm run evidence:validate` before publication. Build should fail if approved evidence lacks a public derivative, annotations exceed bounds, sensitive evidence lacks a warning, or public data contains blocked private paths or platform URLs.

The local studio must not be used over a public network. It checks development mode and localhost, but it is not a replacement for authentication. Never save raw-original screenshots to `docs/` or `public/`.

Step 7 blocks public images unless they live under `/evidence/approved/`, match active release metadata, and pass safety validation. Private previews, source paths, local drive paths, hashes, reviewer identities, direct source links, and dev API URLs are never public manifest fields.
