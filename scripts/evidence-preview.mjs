import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const outDir = "private/evidence/previews";
mkdirSync(outDir, { recursive: true });
const bundle = existsSync("private/evidence/review-state.json")
  ? JSON.parse(readFileSync("private/evidence/review-state.json", "utf8"))
  : { items: [] };

let count = 0;
for (const item of bundle.items) {
  const fig = item.proposedFigureId.replace("FIG-", "");
  const regions = [...(item.redactionRegions ?? []), ...(item.highlightRegions ?? []), ...(item.annotationRegions ?? [])];
  const rects = regions
    .map((region) => {
      const fill = region.type.includes("redaction") ? "#111" : region.type === "highlight" ? "rgba(109,31,45,.22)" : "rgba(77,116,117,.22)";
      return `<rect x="${region.x}%" y="${region.y}%" width="${region.width}%" height="${region.height}%" fill="${fill}" stroke="#6d1f2d" stroke-width="1"/>`;
    })
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750"><rect width="1200" height="750" fill="#f4efe6"/><text x="48" y="70" font-family="Arial" font-size="28" fill="#141311">Private review preview ${item.proposedFigureId}</text><text x="48" y="112" font-family="Arial" font-size="18" fill="#5d625f">No original pixels included. Redaction/annotation geometry preview only.</text>${rects}</svg>`;
  writeFileSync(`${outDir}/evidence-${fig}-review-preview.svg`, svg);
  item.previewGenerated = true;
  count += 1;
}
console.log(`Generated ${count} private geometry preview SVGs in ${outDir}`);
