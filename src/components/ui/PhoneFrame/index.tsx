"use client";

import React from "react";
import SideButtons from "./SideButtons";
import NotchOrIsland from "./NotchOrIsland";
import LockScreenOverlay from "./LockScreenOverlay";
import { ScreenProfile } from "@/types/models";

interface PhoneFrameProps {
  children: React.ReactNode;
  spec: ScreenProfile;
  fileName?: string;
  showOverlay?: boolean;
  modelName?: string;
}

const SCALE = 0.8;

export default function PhoneFrame({
  children,
  spec,
  showOverlay = true,
  modelName,
}: PhoneFrameProps) {
  const borderWidth = 8;
  const displayWidth = spec.logical.width * SCALE + borderWidth * 2;
  const displayHeight = spec.logical.height * SCALE + borderWidth * 2;

  return (
    <div
      id="phone-frame-container"
      className="relative select-none"
      style={{ width: `${displayWidth}px`, height: `${displayHeight}px` }}
    >
      <SideButtons height={displayHeight} />
      <div
        className="relative w-full h-full bg-transparent overflow-hidden z-10 border-black dark:border-neutral-800"
        style={{
          borderRadius: "3rem",
          borderWidth: `${borderWidth}px`,
        }}
      >
        <NotchOrIsland spec={spec} scale={SCALE} modelName={modelName} />

        <div
          style={{
            width: spec.logical.width,
            height: spec.logical.height,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
          }}
          className={`relative`}
        >
          {showOverlay && <LockScreenOverlay spec={spec} scale={SCALE} />}
          <div
            id="phone-frame-content"
            className="w-full h-full relative overflow-hidden"
          >
            <div className="w-full h-full absolute inset-0 z-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
