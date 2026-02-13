import { ScreenProfile } from "@/types/models";
import { STATUS_BAR_TYPES } from "@/utils/constants";

const NotchOrIsland = ({
  spec,
  scale,
  modelName,
}: {
  spec: ScreenProfile;
  scale: number;
  modelName?: string;
}) => {
  const normalizedModelName = modelName
    ?.replace(/^iPhone\s+/i, "")
    .trim();
  const statusBarType = normalizedModelName
    ? STATUS_BAR_TYPES.notch.includes(normalizedModelName)
      ? "notch"
      : STATUS_BAR_TYPES.normal.includes(normalizedModelName)
        ? "normal"
        : "dynamicIsland"
    : "auto";

  const dynamicIslandSpec = spec.overlay.dynamicIsland;
  const notchSpec = spec.overlay.notch;
  const shouldShowDynamicIsland =
    statusBarType === "dynamicIsland" ||
    (statusBarType === "auto" && !!dynamicIslandSpec);
  const shouldShowNotch =
    statusBarType === "notch" || (statusBarType === "auto" && !!notchSpec);

  if (shouldShowDynamicIsland && dynamicIslandSpec) {
    return (
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full z-50 pointer-events-none"
        style={{
          top: `${spec.logical.height * dynamicIslandSpec.topPct * scale}px`,
          width: `${spec.logical.width * dynamicIslandSpec.widthPct * scale}px`,
          height: `${spec.logical.height * dynamicIslandSpec.heightPct * scale}px`,
        }}
      />
    );
  }

  if (
    (shouldShowNotch || (shouldShowDynamicIsland && !dynamicIslandSpec)) &&
    notchSpec
  ) {
    return (
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 bg-black z-50 pointer-events-none border-b border-l border-r border-neutral-900"
        style={{
          width: `${spec.logical.width * notchSpec.widthPct * scale}px`,
          height: `${spec.logical.height * notchSpec.heightPct * scale}px`,
          borderBottomLeftRadius: `${20 * scale}px`,
          borderBottomRightRadius: `${20 * scale}px`,
        }}
      />
    );
  }

  return null;
};
export default NotchOrIsland;
