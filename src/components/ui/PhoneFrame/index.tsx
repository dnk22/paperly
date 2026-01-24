"use client";

import React from "react";
import { DeviceSpec } from "@/types/devices";
import SideButtons from "./SideButtons";
import NotchOrIsland from "./NotchOrIsland";
import LockScreenOverlay from "./LockScreenOverlay";

interface PhoneFrameProps {
  children: React.ReactNode;
  spec: DeviceSpec;
  fileName?: string;
  showOverlay?: boolean;
}

const SCALE = 0.65;

export default function PhoneFrame({
  children,
  spec,
  showOverlay = true,
}: PhoneFrameProps) {
  const displayWidth = spec.width * SCALE;
  const displayHeight = spec.height * SCALE;
  const borderWidth = spec.frameBorder * SCALE;

  return (
    <div
      className="relative select-none"
      style={{ width: `${displayWidth}px`, height: `${displayHeight}px` }}
    >
      <SideButtons height={displayHeight} />
      <div
        className="relative w-full h-full bg-black shadow-2xl ring-1 ring-white/20 overflow-hidden z-10 border-neutral-700"
        style={{
          borderRadius: `${spec.borderRadius * SCALE}px`,
          borderWidth: `${borderWidth}px`,
        }}
      >
        <NotchOrIsland spec={spec} scale={SCALE} />

        <div
          style={{
            width: spec.width,
            height: spec.height,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
            top: `-${borderWidth}px`,
            left: `-${borderWidth}px`,
          }}
          className={`relative`}
        >
          {showOverlay && <LockScreenOverlay spec={spec} />}
          <div
            id="phone-frame"
            className="w-full h-full relative overflow-hidden"
          >
            <div className="w-full h-full absolute inset-0 z-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
