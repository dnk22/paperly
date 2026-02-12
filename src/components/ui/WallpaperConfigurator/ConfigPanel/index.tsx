"use client";

import {
  Boxes,
  CheckCircle2,
  ChevronDown,
  Palette,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Tooltip from "@/components/common/Tooltip";
import type { WidgetConfigData } from "@/types/config";
import {
  selectAddOns,
  selectAppConfig,
  selectDeviceInfo,
  selectDeviceModel,
  selectProductType,
  selectResetConfig,
  selectSetAddOn,
  selectSetDeviceModel,
  selectSetProductType,
  selectSetSubProductType,
  selectUpdateAppConfig,
  selectUpdateGlobalConfig,
  useConfiguratorStore,
} from "@/stores/useConfiguratorStore";
import {
  DEVICE_LIBRARY,
  PRODUCT_OPTIONS,
  PRODUCT_TO_SUB_PRODUCTS,
  SUB_PRODUCT_LABELS,
  resolveAutoDeviceModel,
  toDateInputValue,
  type DeviceModelId,
  type ProductType,
  type WidgetType,
} from "../configuration";

interface ConfigPanelProps {
  className?: string;
  variant?: "aside" | "embedded";
}

const selectClassName =
  "w-full pl-4 pr-10 py-3 bg-white dark:bg-[#15171C] border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-primary appearance-none transition-shadow shadow-sm text-sm text-text-main-light dark:text-gray-100";

const inputClassName =
  "w-full px-4 py-2.5 bg-white dark:bg-[#15171C] border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm text-text-main-light dark:text-gray-100 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark transition-shadow shadow-sm";

const labelClassName =
  "block text-sm font-medium mb-2 text-text-main-light dark:text-gray-300";

const sectionTitleClassName =
  "text-xs font-bold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark";

export default function ConfigPanel({
  className = "",
  variant = "aside",
}: ConfigPanelProps) {
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(true);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [backgroundMode, setBackgroundMode] = useState<"color" | "image">(
    "color",
  );

  const appConfig = useConfiguratorStore(selectAppConfig);
  const productType = useConfiguratorStore(selectProductType);
  const deviceModel = useConfiguratorStore(selectDeviceModel);
  const deviceInfo = useConfiguratorStore(selectDeviceInfo);
  const addOns = useConfiguratorStore(selectAddOns);

  const setDeviceModel = useConfiguratorStore(selectSetDeviceModel);
  const setProductType = useConfiguratorStore(selectSetProductType);
  const setSubProductType = useConfiguratorStore(selectSetSubProductType);
  const updateAppConfig = useConfiguratorStore(selectUpdateAppConfig);
  const updateGlobalConfig = useConfiguratorStore(selectUpdateGlobalConfig);
  const setAddOn = useConfiguratorStore(selectSetAddOn);
  const resetConfig = useConfiguratorStore(selectResetConfig);

  const detectedModel = useMemo(
    () => resolveAutoDeviceModel(deviceInfo),
    [deviceInfo],
  );

  const subProductOptions = PRODUCT_TO_SUB_PRODUCTS[productType];
  const currentWidget = appConfig.widget;

  useEffect(() => {
    setBackgroundMode(appConfig.more.backgroundImage ? "image" : "color");
  }, [appConfig.more.backgroundImage]);

  const updateWidget = (widget: WidgetConfigData) => {
    updateAppConfig({
      ...appConfig,
      widget,
    });
  };

  const isAside = variant === "aside";

  return (
    <aside
      className={`flex w-full flex-col ${
        isAside
          ? "h-full flex-shrink-0 lg:w-[480px] xl:w-[520px] border-l border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-y-auto shadow-lg"
          : ""
      } ${className}`}
    >
      {isAside && (
        <header className="sticky top-0 z-20 px-6 py-4 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur border-b border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold tracking-tight text-text-main-light dark:text-white">
              Create Your Wallpaper
            </h1>
            <div className="flex space-x-2">
              <Tooltip content="Reset" placement="left">
                <button
                  type="button"
                  onClick={() => setIsConfirmOpen(true)}
                  className="p-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              </Tooltip>
            </div>
          </div>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed">
            Choose what to show and how it looks. Preview updates instantly.
          </p>
        </header>
      )}

      <div className={`${isAside ? "p-6" : ""} space-y-10`}>
        <section>
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <h2 className={sectionTitleClassName}>What to Show</h2>
          </div>
          <div className="space-y-6">
            <div className="group">
              <label className={labelClassName}>Your Device</label>
              <div className="relative">
                <select
                  className={selectClassName}
                  value={deviceModel}
                  onChange={(event) =>
                    setDeviceModel(event.target.value as DeviceModelId)
                  }
                >
                  {(Object.keys(DEVICE_LIBRARY) as DeviceModelId[]).map(
                    (modelId) => {
                      const device = DEVICE_LIBRARY[modelId];
                      return (
                        <option
                          key={modelId}
                          value={modelId}
                          className="bg-white dark:bg-[#15171C]"
                        >
                          {device.name} ({device.width} x {device.height})
                        </option>
                      );
                    },
                  )}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted-light dark:text-text-muted-dark h-4 w-4" />
              </div>
            </div>

            <div>
              <label className={labelClassName}>Category</label>
              <div className="relative">
                <select
                  className={selectClassName}
                  value={productType}
                  onChange={(event) =>
                    setProductType(event.target.value as ProductType)
                  }
                >
                  {PRODUCT_OPTIONS.map((product) => (
                    <option
                      key={product.id}
                      value={product.id}
                      className="bg-white dark:bg-[#15171C]"
                    >
                      {product.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted-light dark:text-text-muted-dark h-4 w-4" />
              </div>
            </div>

            <div>
              <label className={labelClassName}>Choose a layout</label>
              <div className="relative">
                <select
                  className={selectClassName}
                  value={currentWidget.type}
                  onChange={(event) =>
                    setSubProductType(event.target.value as WidgetType)
                  }
                >
                  {subProductOptions.map((subProduct) => (
                    <option
                      key={subProduct}
                      value={subProduct}
                      className="bg-white dark:bg-[#15171C]"
                    >
                      {SUB_PRODUCT_LABELS[subProduct]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted-light dark:text-text-muted-dark h-4 w-4" />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border-light dark:border-border-dark" />

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Boxes className="h-4 w-4 text-primary" />
            <h2 className={sectionTitleClassName}>Display Options</h2>
          </div>

          <div className="space-y-6">
            {currentWidget.type === "month" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BooleanField
                  label="Start week on Monday"
                  checked={currentWidget.data.startWeekOnMonday}
                  onChange={(checked) =>
                    updateWidget({
                      type: "month",
                      data: {
                        ...currentWidget.data,
                        startWeekOnMonday: checked,
                      },
                    })
                  }
                />
                <BooleanField
                  label="Show day name"
                  checked={currentWidget.data.showDayName}
                  onChange={(checked) =>
                    updateWidget({
                      type: "month",
                      data: {
                        ...currentWidget.data,
                        showDayName: checked,
                      },
                    })
                  }
                />
                <BooleanField
                  label="Show dot"
                  checked={currentWidget.data.showDot}
                  onChange={(checked) =>
                    updateWidget({
                      type: "month",
                      data: {
                        ...currentWidget.data,
                        showDot: checked,
                      },
                    })
                  }
                />
                <BooleanField
                  label="Show other month days"
                  checked={currentWidget.data.showOtherMonthDays}
                  onChange={(checked) =>
                    updateWidget({
                      type: "month",
                      data: {
                        ...currentWidget.data,
                        showOtherMonthDays: checked,
                      },
                    })
                  }
                />
                <BooleanField
                  label="Show moon phase"
                  checked={currentWidget.data.showMoonPhase}
                  onChange={(checked) =>
                    updateWidget({
                      type: "month",
                      data: {
                        ...currentWidget.data,
                        showMoonPhase: checked,
                      },
                    })
                  }
                  className="md:col-span-2"
                />
              </div>
            )}

            {currentWidget.type === "quarter" && (
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                Quarter currently has no extra schema fields (`data:
                undefined`).
              </p>
            )}

            {currentWidget.type === "year" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BooleanField
                  label="Start week on Monday"
                  checked={currentWidget.data.startWeekOnMonday}
                  onChange={(checked) =>
                    updateWidget({
                      type: "year",
                      data: {
                        ...currentWidget.data,
                        startWeekOnMonday: checked,
                      },
                    })
                  }
                />
                <BooleanField
                  label="Show day name"
                  checked={currentWidget.data.showDayName}
                  onChange={(checked) =>
                    updateWidget({
                      type: "year",
                      data: {
                        ...currentWidget.data,
                        showDayName: checked,
                      },
                    })
                  }
                />
              </div>
            )}

            {currentWidget.type === "life" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClassName}>Birth date</label>
                  <input
                    type="date"
                    className={inputClassName}
                    value={toDateInputValue(currentWidget.data.birthDate)}
                    onChange={(event) =>
                      updateWidget({
                        type: "life",
                        data: {
                          ...currentWidget.data,
                          birthDate: event.target.value
                            ? new Date(`${event.target.value}T00:00:00`)
                            : currentWidget.data.birthDate,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label className={labelClassName}>
                    Life expectancy (years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="130"
                    className={inputClassName}
                    value={currentWidget.data.lifeExpectancy ?? ""}
                    onChange={(event) =>
                      updateWidget({
                        type: "life",
                        data: {
                          ...currentWidget.data,
                          lifeExpectancy: event.target.value
                            ? Number(event.target.value)
                            : undefined,
                        },
                      })
                    }
                  />
                </div>
              </div>
            )}

            {currentWidget.type === "routine" && (
              <div className="space-y-3">
                {currentWidget.data.routines.map((routine, index) => (
                  <div
                    key={routine.id}
                    className="rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-[#15171C] p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">
                        Routine #{index + 1}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          const nextRoutines =
                            currentWidget.data.routines.filter(
                              (_, routineIndex) => routineIndex !== index,
                            );
                          updateWidget({
                            type: "routine",
                            data: {
                              routines: nextRoutines,
                            },
                          });
                        }}
                        className="rounded-lg p-1.5 text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors"
                        aria-label={`Remove routine ${index + 1}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <input
                      className={inputClassName}
                      placeholder="Name"
                      value={routine.name}
                      onChange={(event) => {
                        const nextRoutines = [...currentWidget.data.routines];
                        nextRoutines[index] = {
                          ...nextRoutines[index],
                          name: event.target.value,
                        };
                        updateWidget({
                          type: "routine",
                          data: {
                            routines: nextRoutines,
                          },
                        });
                      }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        className={inputClassName}
                        type="time"
                        value={routine.time}
                        onChange={(event) => {
                          const nextRoutines = [...currentWidget.data.routines];
                          nextRoutines[index] = {
                            ...nextRoutines[index],
                            time: event.target.value,
                          };
                          updateWidget({
                            type: "routine",
                            data: {
                              routines: nextRoutines,
                            },
                          });
                        }}
                      />
                      <input
                        className={inputClassName}
                        placeholder="Mon,Tue,Fri"
                        value={routine.days.join(",")}
                        onChange={(event) => {
                          const nextRoutines = [...currentWidget.data.routines];
                          nextRoutines[index] = {
                            ...nextRoutines[index],
                            days: event.target.value
                              .split(",")
                              .map((day) => day.trim())
                              .filter(Boolean),
                          };
                          updateWidget({
                            type: "routine",
                            data: {
                              routines: nextRoutines,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    updateWidget({
                      type: "routine",
                      data: {
                        routines: [
                          ...currentWidget.data.routines,
                          {
                            id: `routine-${Date.now()}`,
                            name: "New Routine",
                            time: "09:00",
                            days: ["Mon"],
                          },
                        ],
                      },
                    })
                  }
                  className="w-full rounded-xl border-2 border-dashed border-border-light dark:border-border-dark px-3 py-2 text-sm text-text-muted-light dark:text-text-muted-dark hover:border-primary transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={14} />
                  Add routine
                </button>
              </div>
            )}

            {currentWidget.type === "vision" && (
              <VisionConfigEditor
                value={currentWidget.data}
                onChange={(nextVisionData) =>
                  updateWidget({ type: "vision", data: nextVisionData })
                }
              />
            )}
          </div>
        </section>

        <hr className="border-border-light dark:border-border-dark" />

        <section>
          <button
            type="button"
            onClick={() => setIsAppearanceOpen((open) => !open)}
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
                isAppearanceOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isAppearanceOpen && (
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
                    value={appConfig.more.backgroundColor}
                    onChange={(value) =>
                      updateGlobalConfig({ backgroundColor: value })
                    }
                  />
                ) : (
                  <div>
                    <label className={labelClassName}>
                      Background image URL
                    </label>
                    <input
                      className={inputClassName}
                      placeholder="https://example.com/image.jpg"
                      value={appConfig.more.backgroundImage ?? ""}
                      onChange={(event) =>
                        updateGlobalConfig({
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
                      const isActive = appConfig.more.theme === theme;
                      return (
                        <button
                          key={theme}
                          type="button"
                          onClick={() =>
                            updateGlobalConfig({
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
                      value={appConfig.more.borderColor}
                      onChange={(value) =>
                        updateGlobalConfig({ borderColor: value })
                      }
                      variant="swatch"
                    />
                    <ColorInput
                      label="Dock"
                      value={appConfig.more.dockColor}
                      onChange={(value) =>
                        updateGlobalConfig({ dockColor: value })
                      }
                      variant="swatch"
                    />
                    <ColorInput
                      label="Status Bar"
                      value={appConfig.more.statusBar.color}
                      onChange={(value) =>
                        updateGlobalConfig({
                          statusBar: {
                            ...appConfig.more.statusBar,
                            color: value,
                          },
                        })
                      }
                      variant="swatch"
                    />
                    <ColorInput
                      label="Island"
                      value={appConfig.more.islandBorderColor}
                      onChange={(value) =>
                        updateGlobalConfig({ islandBorderColor: value })
                      }
                      variant="swatch"
                    />
                    <ColorInput
                      label="Left Widget"
                      value={appConfig.more.leftWidgetColor}
                      onChange={(value) =>
                        updateGlobalConfig({ leftWidgetColor: value })
                      }
                      variant="swatch"
                    />
                    <ColorInput
                      label="Right Widget"
                      value={appConfig.more.rightWidgetColor}
                      onChange={(value) =>
                        updateGlobalConfig({ rightWidgetColor: value })
                      }
                      variant="swatch"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark tracking-wide uppercase">
                  Add-ons (optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <BooleanField
                    label="Dock"
                    checked={addOns.dock}
                    onChange={(checked) => setAddOn("dock", checked)}
                  />
                  <BooleanField
                    label="Status bar helper"
                    checked={addOns.statusBar}
                    onChange={(checked) => setAddOn("statusBar", checked)}
                  />
                  <BooleanField
                    label="Shelf"
                    checked={addOns.shelf}
                    onChange={(checked) => setAddOn("shelf", checked)}
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="pt-2">
          <button
            type="button"
            onClick={resetConfig}
            className="w-full py-4 bg-primary hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-primary/30 flex justify-center items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset current sub-product
          </button>
        </div>
      </div>

      {isAside && (
        <div className="mt-auto px-8 py-6 border-t border-border-light dark:border-border-dark text-xs text-text-muted-light dark:text-text-muted-dark flex justify-between">
          <span>v2.4.0-beta</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            System Online
          </span>
        </div>
      )}
      <ConfirmDialog
        open={isConfirmOpen}
        title="Reset current sub-product?"
        description="This will revert only the currently selected sub-product without touching other widgets."
        confirmLabel="Reset"
        cancelLabel="Cancel"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          resetConfig();
        }}
      />
    </aside>
  );
}

function BooleanField({
  label,
  checked,
  onChange,
  className = "",
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <label
      className={`cursor-pointer group relative flex items-center justify-between p-4 bg-white dark:bg-[#15171C] border border-border-light dark:border-border-dark rounded-xl hover:border-primary/50 transition-colors ${className}`}
    >
      <span className="text-sm font-medium text-text-main-light dark:text-gray-300">
        {label}
      </span>
      <span className="relative inline-flex h-5 w-10 mr-2 align-middle select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-gray-300 dark:bg-gray-700 peer-checked:bg-primary transition-colors duration-300" />
        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

function ColorInput({
  label,
  value,
  onChange,
  variant = "inline",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  variant?: "inline" | "swatch";
}) {
  const safeColorValue = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)
    ? value
    : "#ffffff";

  if (variant === "swatch") {
    return (
      <div className="flex items-center gap-3 p-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-[#15171C] hover:border-primary/50 transition-colors">
        <div className="h-8 w-8 shrink-0 relative overflow-hidden rounded-full border border-border-light dark:border-border-dark ring-1 ring-white/10">
          <input
            type="color"
            value={safeColorValue}
            onChange={(event) => onChange(event.target.value)}
            className="absolute -top-2 -left-2 w-[150%] h-[150%] p-0 m-0 cursor-pointer"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] text-text-muted-light dark:text-text-muted-dark truncate">
            {label}
          </span>
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="text-xs font-mono text-text-main-light dark:text-gray-300 bg-transparent border-none p-0 focus:outline-none"
            aria-label={`${label} color hex`}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className={labelClassName}>{label}</label>
      <div className="flex gap-2">
        <div className="h-10 w-14 shrink-0 relative overflow-hidden rounded-lg border border-border-light dark:border-border-dark shadow-sm">
          <input
            type="color"
            value={safeColorValue}
            onChange={(event) => onChange(event.target.value)}
            className="absolute -top-2 -left-2 w-[150%] h-[150%] p-0 m-0 cursor-pointer"
          />
        </div>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClassName} font-mono`}
        />
      </div>
    </div>
  );
}

function VisionConfigEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (nextData: Record<string, unknown>) => void;
}) {
  const visionData: Record<string, unknown> =
    typeof value === "object" && value !== null
      ? (value as Record<string, unknown>)
      : {};

  return (
    <div className="space-y-3">
      <div>
        <label className={labelClassName}>Title</label>
        <input
          className={inputClassName}
          value={String(visionData.title ?? "")}
          placeholder="My vision board"
          onChange={(event) =>
            onChange({
              ...visionData,
              title: event.target.value,
            })
          }
        />
      </div>

      <div>
        <label className={labelClassName}>Note</label>
        <textarea
          className={`${inputClassName} min-h-[90px] resize-y`}
          value={String(visionData.note ?? "")}
          placeholder="Describe your focus"
          onChange={(event) =>
            onChange({
              ...visionData,
              note: event.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
