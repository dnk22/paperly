"use client";

import BentoUI from "@/components/ui/BentoUI";
import Title from "../../components/layout/Title";
import MobileCoverFlow from "@/components/ui/MobileCoverFlow";
import WallpaperConfigurator from "@/components/ui/WallpaperConfigurator";

import { useEffect } from "react";
import {
  selectDeviceInfo,
  selectSetDeviceInfo,
  useConfiguratorStore,
} from "@/stores";
import { getWebDeviceFingerprint } from "@/models/helpers/getWebDeviceFingerprint";
import { DeviceFingerprint } from "@/types/deviceFingerprint";

export default function LandingPage() {
  const deviceInfo = useConfiguratorStore(selectDeviceInfo);
  const setDeviceInfo = useConfiguratorStore(selectSetDeviceInfo);

  useEffect(() => {
    if (!deviceInfo) {
      getWebDeviceFingerprint().then((info: DeviceFingerprint) => {
        setDeviceInfo(info);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceInfo]);

  return (
    <div className="w-full mx-auto max-w-[1200px] px-4 md:px-8">
      <Title />
      <div className="hidden lg:block animate-in fade-in duration-500 md:px-8 sm:px-4">
        <BentoUI />
      </div>

      <div className="block lg:hidden animate-in fade-in duration-500 md:px-8 sm:px-4">
        <MobileCoverFlow />
      </div>

      <WallpaperConfigurator />
    </div>
  );
}
