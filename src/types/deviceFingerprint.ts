export type PlatformKind = "web" | "shortcuts";

export interface DeviceFingerprint {
  // Time/locale
  timezone?: string;
  locale?: string;
  calendar?: string;

  // Screen / viewport (logical pixels / CSS pixels for web, points for shortcuts)
  screen?: {
    width?: number;
    height?: number;
    availWidth?: number;
    availHeight?: number;
    colorDepth?: number;
    pixelDepth?: number;
  };

  viewport?: {
    innerWidth?: number;
    innerHeight?: number;
    outerWidth?: number;
    outerHeight?: number;
    visualWidth?: number;
    visualHeight?: number;
    scale?: number;
  };

  // - Shortcuts: widthPt/heightPt is the canonical value.
  logicalPt?: {
    widthPt?: number;
    heightPt?: number;
  };

  // Pixel ratio info (web only)
  devicePixelRatio?: number;

  // Orientation
  orientation?: {
    type?: string; // screen.orientation.type
    angle?: number; // screen.orientation.angle
  };
}
