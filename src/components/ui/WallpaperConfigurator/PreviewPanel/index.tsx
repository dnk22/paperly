import {
  selectDeviceInfo,
  useConfiguratorStore,
} from "@/stores/useConfiguratorStore";
import PhoneFrame from "../../PhoneFrame";
import Download from "./Download";

const DEVICE_LIBRARY: Record<string, any> = {
  "iphone-15-pro": {
    name: "iPhone 15/16 Pro Max",
    width: 430,
    height: 932,
    frameBorder: 8,
    borderRadius: 50,
    type: "dynamic-island",
    notchWidth: 120,
    notchHeight: 35,
    statusBarTop: 18,
  },
  "iphone-14": {
    name: "iPhone 13/14",
    width: 390,
    height: 844,
    frameBorder: 7,
    borderRadius: 40,
    type: "notch",
    notchWidth: 160,
    notchHeight: 30,
    statusBarTop: 14,
  },
  // Bạn có thể thêm iphone-se, iphone-11... vào đây
};

export default function PreviewPanel({
  model = "iphone-15-pro",
}: {
  model?: keyof typeof DEVICE_LIBRARY;
}) {
  const deviceInfo = useConfiguratorStore(selectDeviceInfo);

  const spec = DEVICE_LIBRARY[model];

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <p className="text-neutral-500 text-xs">
        {spec.name} ({spec.width} x {spec.height} px)
      </p>
      <PhoneFrame spec={spec}>
        <></>
      </PhoneFrame>
      <Download spec={spec} fileName="wallpaper.png" />
    </div>
  );
}
