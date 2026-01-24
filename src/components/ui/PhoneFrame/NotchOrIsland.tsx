import { DeviceSpec } from "@/types/devices";

const NotchOrIsland = ({
  spec,
  scale,
}: {
  spec: DeviceSpec;
  scale: number;
}) => {
  if (spec.type === "dynamic-island") {
    return (
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-neutral-700 rounded-full z-50 pointer-events-none"
        style={{
          top: `${11 * scale}px`,
          width: `${(spec.notchWidth || 120) * scale}px`,
          height: `${(spec.notchHeight || 35) * scale}px`,
        }}
      />
    );
  }

  if (spec.type === "notch") {
    return (
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 bg-neutral-700 z-50 pointer-events-none border-b border-l border-r border-neutral-900"
        style={{
          width: `${(spec.notchWidth || 160) * scale}px`,
          height: `${(spec.notchHeight || 30) * scale}px`,
          borderBottomLeftRadius: `${20 * scale}px`,
          borderBottomRightRadius: `${20 * scale}px`,
        }}
      />
    );
  }

  return null;
};
export default NotchOrIsland;
