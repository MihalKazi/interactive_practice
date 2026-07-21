import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { readReleaseBundle, releaseResults, publicPathSafe } from "./evidence-release-utils.mjs";

const evidenceSource = readFileSync("src/data/evidence.ts", "utf8");

const requiredIds = ["EV-001", "EV-002", "EV-003", "EV-004", "EV-005", "EV-006"];
for (const id of requiredIds) {
  if (!evidenceSource.includes(`id: "${id}"`)) {
    throw new Error(`Missing public evidence record ${id}`);
  }
}

if (/publicImagePath:\s*["']\/private/i.test(evidenceSource) || /[A-Z]:\\\\/.test(evidenceSource)) {
  throw new Error("Public evidence data appears to contain a private path.");
}

if (/publicationApproved:\s*true/.test(evidenceSource) && !/publicImagePath:\s*["']\/evidence\/approved\//.test(evidenceSource)) {
  throw new Error("Approved evidence requires approved public image path.");
}

if (/facebook\.com|telegram\.|twitter\.com|\bx\.com\b/i.test(evidenceSource)) {
  throw new Error("Public evidence data contains direct platform URL.");
}

const release = readReleaseBundle();
const results = releaseResults();
const paths = new Map();
for (const item of release.items) {
  if (item.publicImagePath) {
    if (!publicPathSafe(item.publicImagePath)) throw new Error(`${item.evidenceId}: unsafe public image path`);
    if (paths.has(item.publicImagePath)) throw new Error(`${item.evidenceId}: duplicate public derivative path`);
    paths.set(item.publicImagePath, item.evidenceId);
    if (!existsSync(join(process.cwd(), "public", item.publicImagePath.slice(1)))) throw new Error(`${item.evidenceId}: public derivative file missing`);
  }
  if (!item.publicationApproved && item.publicImagePath) throw new Error(`${item.evidenceId}: unpublished item exposes image path`);
  if (!item.allowPublication && item.publicImagePath) throw new Error(`${item.evidenceId}: disallowed item exposes image path`);
  if (item.withdrawn && item.publicImagePath) throw new Error(`${item.evidenceId}: withdrawn item exposes image path`);
  if (item.evidenceId === "EV-006" && !item.contentWarning) throw new Error("FIG-006 lacks content warning");
  if (item.approvedAnnotations.some((annotation) => annotation.approvalStatus !== "publication-approved")) throw new Error(`${item.evidenceId}: approved annotations contain unapproved entry`);
}
const approvedFiles = readdirSync("public/evidence/approved", { withFileTypes: true }).filter((entry) => entry.isFile()).map((entry) => entry.name);
if (approvedFiles.some((name) => name !== ".gitkeep")) throw new Error("public/evidence/approved contains generated files while release is blocked");
if (results.some((result) => result.eligible)) throw new Error("Current Step 7 state unexpectedly has eligible release items");

console.log("Evidence validation passed.");
