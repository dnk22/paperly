export type ScreenClass =
  | "classic" // no notch (older devices)
  | "notch" // iPhone X-style notch
  | "dynamic-island"; // Dynamic Island (newer Pro models)

export type ScaleFactor = 2 | 3;

/**
 * Logical screen key format.
 * Example: "430x932"
 */
export type ScreenProfileKey = `${number}x${number}`;

/**
 * Logical screen size in points (pt).
 * This is what iOS Shortcuts returns via Get Device Details -> Screen Width/Height.
 */
export interface LogicalScreenSize {
  width: number;
  height: number;
}

/**
 * Safe zone expressed as a percentage of the screen height.
 * This is applied to the REAL wallpaper render (output image) and optionally visualized in preview.
 */
export interface SafeZonePct {
  /**
   * Reserved area from the top as a fraction of screen height.
   * Example: 0.12 means 12% of height.
   */
  top: number;

  /**
   * Reserved area from the bottom as a fraction of screen height.
   */
  bottom: number;
}

export interface StatusBarOverlaySpec {
  /** Height as a fraction of screen height (preview only). */
  heightPct: number;
}

export interface NotchOverlaySpec {
  /** Width as a fraction of screen width. */
  widthPct: number;
  /** Height as a fraction of screen height. */
  heightPct: number;
  /** Distance from top as a fraction of screen height. */
  topPct: number;
  /** Corner radius as a fraction of screen width. */
  radiusPct: number;
}

export interface DynamicIslandOverlaySpec {
  widthPct: number;
  heightPct: number;
  topPct: number;
  radiusPct: number;
}

export interface ScreenFrameSpec {
  /**
   * Corner radius of the preview screen mask/frame,
   * as a fraction of screen width.
   */
  cornerRadiusPct: number;
}

export interface OverlaySpec {
  statusBar: StatusBarOverlaySpec;

  /**
   * Only one of notch/dynamicIsland should be present,
   * based on screenClass.
   */
  notch?: NotchOverlaySpec;
  dynamicIsland?: DynamicIslandOverlaySpec;

  frame: ScreenFrameSpec;
}

/**
 * Canonical, model-independent profile keyed by logical size (pt).
 * This is the source of truth for layout decisions.
 */
export interface ScreenProfile {
  /**
   * Key derived from logical size: `${width}x${height}`
   */
  key: ScreenProfileKey;

  /**
   * Logical size (pt), used in Shortcuts and UI layout logic.
   */
  logical: LogicalScreenSize;

  /**
   * Screen class used for preview overlays and safe-zone heuristics.
   */
  screenClass: ScreenClass;

  /**
   * Safe zone used by REAL wallpaper rendering and shown in preview guides.
   */
  safeZonePct: SafeZonePct;

  /**
   * Preview-only overlays (fake status bar / notch / island / frame rounding).
   */
  overlay: OverlaySpec;

  /**
   * Optional scale variants for this logical size.
   * Example: "414x896" exists as both 2x (XR/11) and 3x (XS Max).
   * If omitted, scale is typically inferred by heuristics (e.g., height >= 812 -> 3x).
   */
  scaleVariants?: ScaleFactor[];
}

/**
 * Model alias used for Web UX (device dropdown, etc.).
 * Model name is NOT used for core rendering; it maps back to ScreenProfileKey.
 */
export interface ModelAlias {
  model: string;

  profileKey: ScreenProfileKey;

  scale: ScaleFactor;
}

export type ScreenProfilesMap = Record<ScreenProfileKey, ScreenProfile>;
export type ModelAliasesMap = Record<string, ModelAlias>;

export interface RuntimeDeviceInfo {
  widthPt: number;
  heightPt: number;
}

export interface ResolvedScreenProfile {
  profile: ScreenProfile;
  scale: ScaleFactor;
}
