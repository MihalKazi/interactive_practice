import { existsSync, readFileSync } from "node:fs";

const manifest = existsSync("private/evidence/extraction-manifest.json")
  ? JSON.parse(readFileSync("private/evidence/extraction-manifest.json", "utf8"))
  : { images: [] };
const bundle = existsSync("private/evidence/review-state.json")
  ? JSON.parse(readFileSync("private/evidence/review-state.json", "utf8"))
  : { items: [] };

const extractionIds = new Set(manifest.images.map((item) => item.extractionId));
const confirmed = new Map();
const errors = [];
for (const item of bundle.items) {
  if (!extractionIds.has(item.extractionId)) errors.push(`${item.extractionId}: missing extraction ID`);
  if (item.confirmedFigureId && item.matchDecision === "confirmed") {
    if (confirmed.has(item.confirmedFigureId) && item.matchDecision !== "duplicate") errors.push(`${item.extractionId}: duplicate confirmed figure`);
    confirmed.set(item.confirmedFigureId, item.extractionId);
  }
  for (const group of ["redactionRegions", "highlightRegions", "annotationRegions"]) {
    for (const region of item[group] ?? []) {
      if (region.x < 0 || region.y < 0 || region.width <= 0 || region.height <= 0 || region.x + region.width > 100 || region.y + region.height > 100) {
        errors.push(`${item.extractionId}: invalid region ${region.id}`);
      }
    }
  }
  if (item.cropRegion && (item.cropRegion.x + item.cropRegion.width > 100 || item.cropRegion.y + item.cropRegion.height > 100)) errors.push(`${item.extractionId}: invalid crop`);
  if (/allowPublication":\s*true/.test(JSON.stringify(item))) errors.push(`${item.extractionId}: allowPublication must remain false`);
}

const publicData = readFileSync("src/data/evidence.ts", "utf8");
if (/publicationApproved:\s*true/.test(publicData)) errors.push("publicationApproved must remain false");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Evidence review validation passed.");
