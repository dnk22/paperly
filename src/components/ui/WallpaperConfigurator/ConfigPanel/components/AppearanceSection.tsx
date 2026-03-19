import { useEffect, useState } from "react";
import { ChevronDown, Palette } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
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
  const { t } = useLanguage();
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
            {t.configPanel.appearance.title}
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
                {t.configPanel.appearance.backgroundTitle}
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
                  {t.configPanel.appearance.modeColor}
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
                  {t.configPanel.appearance.modeImage}
                </button>
              </div>
            </div>

            {backgroundMode === "color" ? (
              <ColorInput
                label={t.configPanel.appearance.solidColor}
                value={common.backgroundColor ?? ""}
                onChange={(value) => updateCommon({ backgroundColor: value })}
              />
            ) : (
              <div>
                <label className={labelClassName}>
                  {t.configPanel.appearance.backgroundImageUrl}
                </label>
                <input
                  className={inputClassName}
                  placeholder={t.configPanel.appearance.backgroundImagePlaceholder}
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
              {t.configPanel.appearance.themeTitle}
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
                      {theme === "auto"
                        ? t.configPanel.appearance.themeAuto
                        : theme === "light"
                          ? t.configPanel.appearance.themeLight
                          : t.configPanel.appearance.themeDark}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ColorInput
                  label={t.configPanel.appearance.border}
                  value={common.borderColor ?? ""}
                  onChange={(value) => updateCommon({ borderColor: value })}
                  variant="swatch"
                />
                <ColorInput
                  label={t.configPanel.appearance.dock}
                  value={common.dockColor ?? ""}
                  onChange={(value) => updateCommon({ dockColor: value })}
                  variant="swatch"
                />
                <ColorInput
                  label={t.configPanel.appearance.statusBar}
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
                  label={t.configPanel.appearance.island}
                  value={common.islandBorderColor ?? ""}
                  onChange={(value) =>
                    updateCommon({ islandBorderColor: value })
                  }
                  variant="swatch"
                />
                <ColorInput
                  label={t.configPanel.appearance.leftWidget}
                  value={common.leftWidgetColor ?? ""}
                  onChange={(value) => updateCommon({ leftWidgetColor: value })}
                  variant="swatch"
                />
                <ColorInput
                  label={t.configPanel.appearance.rightWidget}
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
