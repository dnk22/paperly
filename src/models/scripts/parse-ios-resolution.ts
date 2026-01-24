// models/scripts/parse-ios-resolution.ts

import fs from "node:fs";
import path from "node:path";

import type {
  ModelAliasesMap,
  ModelAlias,
  ScreenProfilesMap,
  ScaleFactor,
} from "@/types/models";

import { createScreenProfile, makeScreenProfileKey } from "./normalize";

/**
 * Default paths:
 * - input:  models/sources/ios-resolution.html
 * - output: models/generated/
 */

type ParsedRow = {
  model: string;
  logicalWidth: number;
  logicalHeight: number;
  scale: ScaleFactor;
};

/* ---------------------------------- utils --------------------------------- */

function parseArgs(argv: string[]) {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (!a?.startsWith("--")) continue;
    const key = a.slice(2);
    const val = argv[i + 1];
    if (!val || val.startsWith("--")) {
      args[key] = "true";
      i -= 1;
      continue;
    }
    args[key] = val;
    i += 1;
  }
  return args;
}

function stripTags(html: string): string {
  return (
    html
      // remove HTML comments FIRST (including nested ones)
      .replace(/<!--[\s\S]*?-->/g, "")
      // remove scripts & styles
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      // remove <span> tags but keep content
      .replace(/<span[^>]*>/gi, "")
      .replace(/<\/span>/gi, "")
      // remove links but keep text
      .replace(/<a[^>]*>/gi, "")
      .replace(/<\/a>/gi, "")
      // remove remaining tags
      .replace(/<[^>]+>/g, " ")
      // decode minimal entities
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      // normalize whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
}

function normalizeModelName(name: string): string {
  return name.replace(/\s+/g, " ").trim();
}

function shouldExcludeModel(model: string): boolean {
  const m = model.toLowerCase();
  
  // Exclude mini and SE models
  if (m.includes(" mini")) return true;
  if (m.includes("iphone se")) return true;
  if (/\bse\b/.test(m) && m.includes("iphone")) return true;
  
  // Exclude iPhone 4 and 5 (all variants)
  if (/iphone\s*4[s]?\b/.test(m)) return true;
  if (/iphone\s*5[cs]?\b/.test(m)) return true;
  
  // For iPhone 6, 7, 8: only keep Plus variants (including 6s, 6s Plus, etc.)
  if (/iphone\s*6[s]?\b/.test(m) && !m.includes("plus")) return true;
  if (/iphone\s*7[s]?\b/.test(m) && !m.includes("plus")) return true;
  if (/iphone\s*8[s]?\b/.test(m) && !m.includes("plus")) return true;
  
  return false;
}


/* ----------------------------- HTML PARSING -------------------------------- */

/**
 * Parse iOS-resolution HTML table (iPhone only).
 */
function parseIphoneRows(html: string): ParsedRow[] {
  const tableMatch = html.match(
    /<table[^>]*data-filter\s*=\s*"iPhone"[^>]*>([\s\S]*?)<\/table>/i,
  );
  if (!tableMatch) {
    throw new Error(
      'Cannot find <table data-filter="iPhone">. Check pasted HTML.',
    );
  }

  const tableHtml = tableMatch[1];
  const rows: ParsedRow[] = [];

  const trRe = /<tr[^>]*data-family\s*=\s*"iPhone"[^>]*>([\s\S]*?)<\/tr>/gi;

  let trMatch: RegExpExecArray | null;
  while ((trMatch = trRe.exec(tableHtml)) !== null) {
    let tr = trMatch[1];
    
    // Remove HTML comments from tr content to avoid matching commented <td> tags
    tr = tr.replace(/<!--[\s\S]*?-->/g, '');

    // Extract all <td> contents
    const tds: string[] = [];
    const tdRe = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    let tdMatch: RegExpExecArray | null;

    while ((tdMatch = tdRe.exec(tr)) !== null) {
      const rawContent = tdMatch[1] ?? "";
      const cleaned = stripTags(rawContent);
      tds.push(cleaned);
    }

    if (tds.length === 0) continue;

    // First td should be model name (after stripping link)
    const model = normalizeModelName(tds[0] ?? "");
    if (!model || shouldExcludeModel(model)) {
      continue;
    }

    // Find numeric values from tds[1] onwards (skip model name column)
    // Pattern seen: model variants, LogicalW, LogicalH, PhysicalW, PhysicalH, PPI, Scale, ...
    // Some rows have numbers in model name (17 Pro, 16e, etc)
    const numbers: number[] = [];
    for (let i = 1; i < tds.length; i++) {
      const td = tds[i] ?? "";
      const cleaned = td.replace(/[^\d.]/g, "");
      const n = Number(cleaned);
      if (Number.isFinite(n) && n > 0) {
        numbers.push(n);
      }
    }

    // Based on actual HTML structure and debug output:
    // Model variants may add 1-2 numbers at start
    // Then: LogicalW, LogicalH, PhysicalW, PhysicalH, PPI, Scale
    // We look for the pattern: values 200-500 range for logical, then higher physical, then 2 or 3 for scale
    
    // Find scale factor first (must be 1, 2, or 3)
    let scaleIdx = -1;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] === 1 || numbers[i] === 2 || numbers[i] === 3) {
        // Check if this could be scale (not too early in sequence)
        if (i >= 5) { // Need at least LogW, LogH, PhysW, PhysH, PPI before scale
          scaleIdx = i;
          break;
        }
      }
    }

    if (scaleIdx === -1 || scaleIdx < 5) {
      console.warn(`[warn] ${model}: cannot find valid scale factor (numbers found: ${numbers.join(', ')})`);
      continue;
    }

    // Work backwards from scale: scale is at scaleIdx, PPI at scaleIdx-1
    // PhysicalH at scaleIdx-2, PhysicalW at scaleIdx-3
    // LogicalH at scaleIdx-4, LogicalW at scaleIdx-5
    const logicalWidth = numbers[scaleIdx - 5];
    const logicalHeight = numbers[scaleIdx - 4];
    const scaleRaw = numbers[scaleIdx];

    if (scaleRaw !== 2 && scaleRaw !== 3) {
      console.warn(
        `[warn] unexpected scale (${scaleRaw}) for ${model}, skipped`,
      );
      continue;
    }

    rows.push({
      model,
      logicalWidth,
      logicalHeight,
      scale: scaleRaw as ScaleFactor,
    });
  }

  return rows;
}

/* ---------------------------- BUILD OUTPUT --------------------------------- */

function buildOutputs(rows: ParsedRow[]) {
  const modelAliases: ModelAliasesMap = {};
  const screenProfiles: ScreenProfilesMap = {};

  const scaleVariants = new Map<string, Set<ScaleFactor>>();

  for (const row of rows) {
    const key = makeScreenProfileKey(row.logicalWidth, row.logicalHeight);

    // Model alias (UX only)
    const alias: ModelAlias = {
      model: row.model,
      profileKey: key,
      scale: row.scale,
    };
    modelAliases[row.model] = alias;

    // Canonical screen profile
    if (!screenProfiles[key]) {
      screenProfiles[key] = createScreenProfile(key, {
        width: row.logicalWidth,
        height: row.logicalHeight,
      });
    }

    // Track scale variants (e.g. 414x896 → 2x & 3x)
    if (!scaleVariants.has(key)) {
      scaleVariants.set(key, new Set());
    }
    scaleVariants.get(key)!.add(row.scale);
  }

  // Attach scaleVariants only when needed
  for (const [key, set] of scaleVariants.entries()) {
    if (set.size > 1 && screenProfiles[key]) {
      screenProfiles[key].scaleVariants = Array.from(
        set,
      ).sort() as ScaleFactor[];
    }
  }

  return { modelAliases, screenProfiles };
}

/* --------------------------------- IO -------------------------------------- */

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath: string, data: unknown) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

/* --------------------------------- MAIN ------------------------------------ */

function main() {
  const args = parseArgs(process.argv.slice(2));

  const input =
    args.input ??
    path.resolve(process.cwd(), "src/models/sources/ios-resolution.html");

  const outDir =
    args.outDir ?? path.resolve(process.cwd(), "src/models/generated");
  if (!fs.existsSync(input)) {
    throw new Error(`Input HTML not found: ${input}`);
  }

  const html = fs.readFileSync(input, "utf8");
  const rows = parseIphoneRows(html);

  const { modelAliases, screenProfiles } = buildOutputs(rows);

  ensureDir(outDir);

  const aliasesPath = path.join(outDir, "modelAliases.json");
  const profilesPath = path.join(outDir, "screenProfiles.json");

  writeJson(aliasesPath, modelAliases);
  writeJson(profilesPath, screenProfiles);

  const multiScale = Object.values(screenProfiles).filter(
    (p) => p.scaleVariants && p.scaleVariants.length > 1,
  );

  console.log(`[devices] models parsed (excl. mini/SE): ${rows.length}`);
  console.log(
    `[devices] unique screen profiles: ${Object.keys(screenProfiles).length}`,
  );
  if (multiScale.length) {
    console.log(
      `[devices] profiles with multiple scales: ${multiScale
        .map((p) => `${p.key}=[${p.scaleVariants?.join(",")}]`)
        .join(", ")}`,
    );
  }
  console.log(`[devices] wrote ${aliasesPath}`);
  console.log(`[devices] wrote ${profilesPath}`);
}

main();
