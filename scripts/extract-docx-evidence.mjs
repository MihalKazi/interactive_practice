import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { tmpdir } from "node:os";

const DOCX_PATH = "source/Propaganda_Analysis_Report.docx";
const OUT_DIR = "private/evidence/originals";
const MANIFEST_PATH = "private/evidence/extraction-manifest.json";

function mimeFromName(name) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".emf")) return "image/emf";
  if (lower.endsWith(".wmf")) return "image/wmf";
  return "application/octet-stream";
}

function dimensions(data, mimeType) {
  if (mimeType === "image/png" && data.length > 24) {
    return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  }
  if (mimeType === "image/jpeg" && data[0] === 0xff) {
    let offset = 2;
    while (offset < data.length - 9) {
      if (data[offset] !== 0xff) break;
      const marker = data[offset + 1];
      const length = data.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xc3) {
        return { height: data.readUInt16BE(offset + 5), width: data.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
  }
  return { width: null, height: null };
}

function probableFigure(index) {
  if (index >= 1 && index <= 6) {
    return {
      probableFigureId: `FIG-${String(index).padStart(3, "0")}`,
      matchingConfidence: "MATCH_REVIEW_REQUIRED",
      matchingNotes:
        "Initial extraction order only. Match against surrounding caption, page location, figure label, and image appearance before publication.",
    };
  }
  return {
    probableFigureId: "UNMATCHED",
    matchingConfidence: "MATCH_REVIEW_REQUIRED",
    matchingNotes: "Extra embedded image. Manual review required before use.",
  };
}

if (!existsSync(DOCX_PATH)) throw new Error(`Missing source document: ${DOCX_PATH}`);

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync("private/evidence", { recursive: true });

const temp = join(tmpdir(), `docx-evidence-${Date.now()}`);
mkdirSync(temp, { recursive: true });

try {
  const zipPath = join(temp, "source.zip");
  copyFileSync(DOCX_PATH, zipPath);
  execFileSync("powershell.exe", [
    "-NoProfile",
    "-Command",
    `Expand-Archive -LiteralPath '${zipPath.replaceAll("'", "''")}' -DestinationPath '${temp.replaceAll("'", "''")}' -Force`,
  ]);
  const mediaDir = join(temp, "word", "media");
  const files = existsSync(mediaDir) ? readdirSync(mediaDir).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })) : [];
  const extractedAt = new Date().toISOString();
  const images = files.map((file, index) => {
    const data = readFileSync(join(mediaDir, file));
    const extractedFilename = `${String(index + 1).padStart(3, "0")}-${basename(file)}`;
    const mimeType = mimeFromName(file);
    const dim = dimensions(data, mimeType);
    writeFileSync(join(OUT_DIR, extractedFilename), data);
    return {
      extractionId: `IMG-${String(index + 1).padStart(3, "0")}`,
      originalFilename: file,
      extractedFilename,
      mimeType,
      width: dim.width,
      height: dim.height,
      sizeBytes: data.length,
      sha256: createHash("sha256").update(data).digest("hex"),
      ...probableFigure(index + 1),
      extractedAt,
    };
  });

  writeFileSync(MANIFEST_PATH, JSON.stringify({ sourceDocument: DOCX_PATH, extractedAt, imageCount: images.length, images }, null, 2));
  console.log(`Extracted ${images.length} images to ${OUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
} finally {
  rmSync(temp, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
}
