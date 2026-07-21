import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { releaseResults, readReleaseBundle } from "./evidence-release-utils.mjs";

const CONFIG_PATH = "private/evidence/publication-config.json";
const PUBLIC_DIR = "public/evidence/approved";

mkdirSync(PUBLIC_DIR, { recursive: true });

if (!existsSync(CONFIG_PATH)) {
  const starter = {
    note: "Only set allowPublication true after editorial, legal, privacy, translation, and redaction review.",
    items: [
      "001",
      "002",
      "003",
      "004",
      "005",
      "006",
    ].map((id) => ({
      evidenceId: `EV-${id}`,
      sourceFilename: "",
      outputFilename: `evidence-${id}-public.webp`,
      resize: null,
      crop: null,
      blurRegions: [],
      pixelateRegions: [],
      solidRedactionRegions: [],
      highlightRegions: [],
      annotationRegions: [],
      outputFormat: "webp",
      outputQuality: 82,
      allowPublication: false,
    })),
  };
  mkdirSync("private/evidence", { recursive: true });
  writeFileSync(CONFIG_PATH, JSON.stringify(starter, null, 2));
  console.log(`Created starter config at ${CONFIG_PATH}; no derivatives generated.`);
  process.exit(0);
}

const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
const releaseBundle = readReleaseBundle();
const results = releaseResults();
let generated = 0;

for (const item of config.items ?? []) {
  const release = releaseBundle.items.find((entry) => entry.evidenceId === item.evidenceId);
  const result = results.find((entry) => entry.evidenceId === item.evidenceId);
  const blockers = [...(result?.blockingIssues ?? [])];
  if (!release?.allowPublication) blockers.push("allowPublication false");
  if (!release?.publicationApproved) blockers.push("publicationApproved false");
  if (blockers.length) {
    console.log(`${item.evidenceId}: skipped (${[...new Set(blockers)].join("; ")})`);
    continue;
  }
  if (!item.sourceFilename || !item.outputFilename) {
    throw new Error(`${item.evidenceId}: approved build item requires sourceFilename and outputFilename`);
  }
  if (!/^evidence-\d{3}-v\d+\.(webp)$/i.test(item.outputFilename)) {
    throw new Error(`${item.evidenceId}: output filename must be neutral evidence-###-v#.webp`);
  }
  if ((item.solidRedactionRegions ?? []).length === 0 && (item.blurRegions ?? []).length === 0 && (item.pixelateRegions ?? []).length === 0) {
    throw new Error(`${item.evidenceId}: allowPublication requires explicit redaction regions, even if reviewed as none-needed`);
  }
  throw new Error(
    `${item.evidenceId}: image raster redaction backend is intentionally not enabled yet. Configure a reviewed processor before publishing derivatives.`,
  );
}

console.log(`Generated ${generated} public derivatives in ${PUBLIC_DIR}`);
