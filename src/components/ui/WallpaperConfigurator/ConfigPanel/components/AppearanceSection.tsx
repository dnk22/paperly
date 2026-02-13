import { useEffect, useState } from "react";
import { ChevronDown, Palette } from "lucide-react";
import {
  selectCommon,
  selectUpdateCommon,
  useConfiguratorStore,
} from "@/stores/useConfiguratorStore";
import {
  inputClassName,
  labelClassName,
  sectionTitleClassName,
} from "../styles";
import { ColorInput } from "./Fields";

export default function AppearanceSection() {
  const common = useConfiguratorStore(selectCommon);
  const updateCommon = useConfiguratorStore(selectUpdateCommon);
  const [isOpen, setIsOpen] = useState(true);
  const [backgroundMode, setBackgroundMode] = useState<"color" | "image">(
    "color",
  );

  useEffect(() => {
    setBackgroundMode(common.backgroundImage ? "image" : "color");
  }, [common.backgroundImage]);

  return (
    <section>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between mb-6 cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" />
          <h2
            className={`${sectionTitleClassName} group-hover:text-text-main-light dark:group-hover:text-white transition-colors`}
          >
            Appearance & Add-ons
          </h2>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-text-muted-light dark:text-text-muted-dark transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark tracking-wide uppercase">
                Background
              </h3>
              <div className="flex bg-gray-200 dark:bg-surface-dark p-1 rounded-lg border border-border-light dark:border-border-dark">
                <button
                  type="button"
                  onClick={() => setBackgroundMode("color")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    backgroundMode === "color"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-text-main-light dark:text-white"
                      : "text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white"
                  }`}
                >
                  Color
                </button>
                <button
                  type="button"
                  onClick={() => setBackgroundMode("image")}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    backgroundMode === "image"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-text-main-light dark:text-white"
                      : "text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white"
                  }`}
                >
                  Image
                </button>
              </div>
            </div>

            {backgroundMode === "color" ? (
              <ColorInput
                label="Solid Color"
                value={common.backgroundColor ?? ""}
                onChange={(value) => updateCommon({ backgroundColor: value })}
              />
            ) : (
              <div>
                <label className={labelClassName}>Background image URL</label>
                <input
                  className={inputClassName}
                  placeholder="https://example.com/image.jpg"
                  value={common.backgroundImage ?? ""}
                  onChange={(event) =>
                    updateCommon({
                      backgroundImage: event.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark tracking-wide uppercase mb-3">
              Theme / Colors
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 dark:bg-[#15171C] rounded-xl border border-border-light dark:border-border-dark">
                {(["auto", "light", "dark"] as const).map((theme) => {
                  const isActive = common.theme === theme;
                  return (
                    <button
                      key={theme}
                      type="button"
                      onClick={() =>
                        updateCommon({
                          theme,
                        })
                      }
                      className={`py-2 text-xs font-medium rounded-lg transition-all ${
                        isActive
                          ? "bg-white dark:bg-gray-700 text-text-main-light dark:text-white shadow-sm"
                          : "text-text-muted-light dark:text-text-muted-dark hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm"
                      }`}
                    >
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ColorInput
                  label="Border"
                  value={common.borderColor ?? ""}
                  onChange={(value) => updateCommon({ borderColor: value })}
                  variant="swatch"
                />
                <ColorInput
                  label="Dock"
                  value={common.dockColor ?? ""}
                  onChange={(value) => updateCommon({ dockColor: value })}
                  variant="swatch"
                />
                <ColorInput
                  label="Status Bar"
                  value={common.statusBar?.color ?? ""}
                  onChange={(value) =>
                    updateCommon({
                      statusBar: {
                        ...common.statusBar,
                        color: value,
                      },
                    })
                  }
                  variant="swatch"
                />
                <ColorInput
                  label="Island"
                  value={common.islandBorderColor ?? ""}
                  onChange={(value) =>
                    updateCommon({ islandBorderColor: value })
                  }
                  variant="swatch"
                />
                <ColorInput
                  label="Left Widget"
                  value={common.leftWidgetColor ?? ""}
                  onChange={(value) => updateCommon({ leftWidgetColor: value })}
                  variant="swatch"
                />
                <ColorInput
                  label="Right Widget"
                  value={common.rightWidgetColor ?? ""}
                  onChange={(value) =>
                    updateCommon({ rightWidgetColor: value })
                  }
                  variant="swatch"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
