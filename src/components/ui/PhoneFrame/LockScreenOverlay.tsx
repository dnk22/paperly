import { DeviceSpec } from "@/types/devices";
import {
  BatteryFull,
  Camera,
  Flashlight,
  SignalMedium,
  Wifi,
} from "lucide-react";

const LockScreenOverlay = ({ spec }: { spec: DeviceSpec }) => {
  const formattedTime = new Date()
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(":", ":");

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <div
      className="ui-overlay absolute inset-0 z-20 pointer-events-none flex flex-col justify-between text-white pb-2"
      style={{ paddingTop: `${spec.statusBarTop}px` }}
    >
      <div>
        <div className="h-[44px] w-full flex justify-between items-center px-8 pb-1 text-[16px] font-medium">
          <div className="w-[100px] pl-2 flex items-center justify-start text-[17px] tracking-tight font-semibold">
            {formattedTime}
          </div>

          <div className="w-[100px] flex items-center justify-end gap-2 pr-1">
            <Wifi size={20} strokeWidth={2.5} />
            <div className="scale-90">
              <SignalMedium size={20} strokeWidth={2.5} />
            </div>
            <div className="relative ml-1">
              <BatteryFull size={26} strokeWidth={2} className="opacity-40" />
              <div className="absolute top-[35%] left-[3px] h-[30%] w-[12px] bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-8">
          <div className="text-[22px] font-semibold text-white/90 drop-shadow-md mb-[-5px]">
            {formattedDate}
          </div>
          <div className="text-[96px] font-bold leading-none tracking-tight text-white/95 drop-shadow-xl font-sans">
            {formattedTime}
          </div>
        </div>
      </div>

      <div className="w-full px-12">
        <div className="flex justify-between items-center mb-10">
          <div className="w-[50px] h-[50px] rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg">
            <Flashlight size={24} strokeWidth={1.5} className="text-white" />
          </div>
          <div className="w-[50px] h-[50px] rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg">
            <Camera size={24} strokeWidth={1.5} className="text-white" />
          </div>
        </div>

        <div className="w-full flex justify-center pb-2">
          <div className="w-[140px] h-[5px] bg-white rounded-full shadow-sm" />
        </div>
      </div>
    </div>
  );
};

export default LockScreenOverlay;
