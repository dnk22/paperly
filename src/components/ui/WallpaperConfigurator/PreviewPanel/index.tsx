"use client";

import type { CSSProperties } from "react";
import {
  selectConfigurator,
  useConfiguratorStore,
} from "@/stores/useConfiguratorStore";
import PhoneFrame from "../../PhoneFrame";
import Download from "./Download";
import DeviceLibrary from "@/models/generated/screenProfiles.json";
import { ScreenProfile } from "@/types/models";
import WidgetPreview from "@/components/widgets/WidgetPreview";

export default function PreviewPanel() {
  const configurator = useConfiguratorStore(selectConfigurator);
  const { screenSize, modelName, template, common, options, addOns } =
    configurator;

  console.log(configurator, "configurator");

  const spec: ScreenProfile = DeviceLibrary[
    screenSize as keyof typeof DeviceLibrary
  ] as unknown as ScreenProfile;
  console.log(spec, "spec");

  const backgroundStyle: CSSProperties = {
    backgroundColor: common.backgroundColor,
    backgroundImage: common.backgroundImage
      ? `url(${common.backgroundImage})`
      : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const themeOverlayClass =
    common.theme === "light"
      ? "bg-white/10"
      : common.theme === "dark"
        ? "bg-black/35"
        : "bg-black/15";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-neutral-500 text-xs">
        {modelName} ({spec.logical.width} x {spec.logical.height} px)
      </p>
      <PhoneFrame spec={spec} modelName={modelName}>
        <div className="relative w-full h-full" style={backgroundStyle}>
          <div className={`absolute inset-0 ${themeOverlayClass}`} />

          {common.borderColor && (
            <div
              className="absolute inset-[18px] rounded-[36px] border"
              style={{ borderColor: common.borderColor, opacity: 0.45 }}
            />
          )}

          <div className="absolute left-8 right-8 top-[240px] z-[1]">
            <WidgetPreview template={template} options={options} />
          </div>

          {addOns.statusBar && (
            <div
              className="absolute top-[58px] left-8 right-8 h-[3px] rounded-full z-[1]"
              style={{
                backgroundColor: common.statusBar?.color,
                opacity: 0.7,
              }}
            />
          )}

          {addOns.shelf && (
            <div
              className="absolute bottom-[165px] left-10 right-10 h-20 rounded-3xl border backdrop-blur-xl z-[1]"
              style={{
                borderColor: common.borderColor,
                backgroundColor: common.rightWidgetColor,
                opacity: 0.2,
              }}
            />
          )}

          {addOns.dock && (
            <div
              className="absolute bottom-[90px] left-12 right-12 h-16 rounded-[26px] border backdrop-blur-xl z-[1]"
              style={{
                borderColor: common.borderColor,
                backgroundColor: common.dockColor,
                opacity: 0.22,
              }}
            />
          )}
        </div>
      </PhoneFrame>
      <Download
        spec={{
          width: spec.logical.width,
          height: spec.logical.height,
        }}
        fileName="wallpaper.png"
      />
    </div>
  );
}
