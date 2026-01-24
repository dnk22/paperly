// models/scripts/normalize.ts
// Normalization & heuristics for screen profiles.
// This file intentionally contains NO HTML parsing logic.
// It defines how logical screen sizes are classified and how preview overlays are derived.

import type {
  ScreenClass,
  ScreenProfile,
  ScreenProfileKey,
  LogicalScreenSize,
  SafeZonePct,
  OverlaySpec,
} from "@/types/models";

/**
 * Infer screen class from logical height (pt).
 * This heuristic is intentionally simple and stable.
 */
export function inferScreenClass(heightPt: number): ScreenClass {
  if (heightPt >= 852) return "dynamic-island";
  if (heightPt >= 812) return "notch";
  return "classic";
}

/**
 * Default safe-zone percentages by screen class.
 * These values MUST be used consistently by:
 * - Backend wallpaper rendering
 * - Web preview (guide overlays)
 */
export function getSafeZonePct(screenClass: ScreenClass): SafeZonePct {
  switch (screenClass) {
    case "dynamic-island":
      return { top: 0.12, bottom: 0.08 };
    case "notch":
      return { top: 0.1, bottom: 0.08 };
    case "classic":
    default:
      return { top: 0.06, bottom: 0.06 };
  }
}

/**
 * Preview-only overlay spec.
 * These values are heuristics to give users a realistic sense of layout.
 * They are NOT extracted from real devices and MUST NOT be rendered into the final wallpaper image.
 */
export function getOverlaySpec(screenClass: ScreenClass): OverlaySpec {
  const base = {
    statusBar: {
      heightPct:
        screenClass === "classic"
          ? 0.045
          : screenClass === "notch"
            ? 0.055
            : 0.06,
    },
    frame: {
      cornerRadiusPct: 0.06,
    },
  };

  if (screenClass === "dynamic-island") {
    return {
      ...base,
      dynamicIsland: {
        widthPct: 0.28,
        heightPct: 0.035,
        topPct: 0.018,
        radiusPct: 0.02,
      },
    };
  }

  if (screenClass === "notch") {
    return {
      ...base,
      notch: {
        widthPct: 0.45,
        heightPct: 0.045,
        topPct: 0.015,
        radiusPct: 0.02,
      },
    };
  }

  return base;
}

/**
 * Create a canonical ScreenProfile from a logical screen size.
 * This is the ONLY place where a ScreenProfile should be constructed.
 */
export function createScreenProfile(
  key: ScreenProfileKey,
  logical: LogicalScreenSize,
): ScreenProfile {
  const screenClass = inferScreenClass(logical.height);

  return {
    key,
    logical,
    screenClass,
    safeZonePct: getSafeZonePct(screenClass),
    overlay: getOverlaySpec(screenClass),
  };
}

/**
 * Helper to generate ScreenProfileKey from logical size.
 */
export function makeScreenProfileKey(
  widthPt: number,
  heightPt: number,
): ScreenProfileKey {
  return `${widthPt}x${heightPt}` as ScreenProfileKey;
}

/**
 * Utility: derive a fallback ScreenProfile when a logical size
 * is not found in generated data (e.g. future iPhone).
 *
 * This ensures forward compatibility.
 */
export function createFallbackProfile(
  widthPt: number,
  heightPt: number,
): ScreenProfile {
  const key = makeScreenProfileKey(widthPt, heightPt);
  const logical = { width: widthPt, height: heightPt };
  return createScreenProfile(key, logical);
}
