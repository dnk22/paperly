// models/helpers/getWebDeviceFingerprint.ts
"use client";

import { DeviceFingerprint } from "@/types/deviceFingerprint";

export async function getWebDeviceFingerprint(): Promise<DeviceFingerprint> {
  const fp: DeviceFingerprint = {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: Intl.DateTimeFormat().resolvedOptions().locale,
    devicePixelRatio: window.devicePixelRatio,

    screen: {
      width: window.screen?.width,
      height: window.screen?.height,
      availWidth: window.screen?.availWidth,
      availHeight: window.screen?.availHeight,
      colorDepth: window.screen?.colorDepth,
      pixelDepth: window.screen?.pixelDepth,
    },

    viewport: {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      visualWidth: window.visualViewport?.width,
      visualHeight: window.visualViewport?.height,
      scale: window.visualViewport?.scale,
    },

    orientation: {
      type: window.screen?.orientation?.type,
      angle: window.screen?.orientation?.angle,
    },
  };
  return fp;
}
