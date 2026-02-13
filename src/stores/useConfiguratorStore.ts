import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { DeviceFingerprint } from "@/types/deviceFingerprint";
import type { ConfiguratorState } from "@/types/config";
import { SUB_PRODUCT_TYPE } from "@/utils/constants";
import { createDefaultWidgetConfig } from "@/utils/helper";

/**
 * Configurator Store Actions
 */
interface ConfiguratorActions {
  open: (widgetType?: string) => void;
  close: () => void;
  setDeviceInfo: (info: DeviceFingerprint) => void;
  updateConfigurator: (config: Partial<ConfiguratorState>) => void;
  updateOptions: (options: Partial<ConfiguratorState["options"]>) => void;
  updateCommon: (patch: Partial<ConfiguratorState["common"]>) => void;
  updateAddOns: (patch: Partial<ConfiguratorState["addOns"]>) => void;
  resetConfig: (target?: "options" | "common" | "addOns") => void;
}

interface ConfiguratorStoreState {
  isOpen: boolean;
  deviceInfo: DeviceFingerprint | null;
  configurator: ConfiguratorState;
}

type ConfiguratorStore = ConfiguratorStoreState & ConfiguratorActions;

/**
 * Configurator Store
 * Manages the state of the wallpaper configurator
 */
const initialConfiguratorState: ConfiguratorState = {
  modelName: "iPhone 17 Pro Max",
  screenSize: "440x956",
  template: SUB_PRODUCT_TYPE.MONTH,
  options: createDefaultWidgetConfig(SUB_PRODUCT_TYPE.MONTH),
  common: {
    theme: "auto",
    backgroundColor: "#0b1220",
  },
  addOns: {
    dock: false,
    statusBar: false,
    shelf: false,
  },
};

export const useConfiguratorStore = create<ConfiguratorStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      deviceInfo: null,
      configurator: initialConfiguratorState,

      // Actions
      open: (widgetType) =>
        set(
          (state) => ({
            isOpen: true,
            configurator: {
              ...state.configurator,
              template: (widgetType ??
                state.configurator
                  .template) as typeof state.configurator.template,
            },
          }),
          false,
          "configurator/open",
        ),

      close: () =>
        set(
          (state) => ({
            isOpen: false,
            configurator: {
              ...state.configurator,
            },
          }),
          false,
          "configurator/close",
        ),

      setDeviceInfo: (info) =>
        set(
          (state) => ({
            deviceInfo: info,
            configurator: state.configurator,
          }),
          false,
          "configurator/setDeviceInfo",
        ),

      updateConfigurator: (config) =>
        set(
          (state) => ({
            configurator: {
              ...state.configurator,
              ...config,
            },
          }),
          false,
          "configurator/updateConfigurator",
        ),

      updateOptions: (options) =>
        set(
          (state) => ({
            configurator: {
              ...state.configurator,
              options,
            },
          }),
          false,
          "configurator/updateOptions",
        ),

      updateCommon: (patch) =>
        set(
          (state) => ({
            configurator: {
              ...state.configurator,
              common: {
                ...state.configurator.common,
                ...patch,
                statusBar: patch.statusBar
                  ? {
                      ...(state.configurator.common.statusBar ?? {}),
                      ...patch.statusBar,
                    }
                  : state.configurator.common.statusBar,
              },
            },
          }),
          false,
          "configurator/updateCommon",
        ),

      updateAddOns: (patch) =>
        set(
          (state) => {
            return {
              configurator: {
                ...state.configurator,
                addOns: {
                  ...state.configurator.addOns,
                  ...patch,
                },
              },
            };
          },
          false,
          "configurator/updateAddOns",
        ),

      resetConfig: (target) =>
        set(
          (state) => {
            const nextConfigurator = { ...state.configurator };
            const shouldResetAll = !target;

            if (shouldResetAll || target === "options") {
              nextConfigurator.options = createDefaultWidgetConfig(
                state.configurator.options.type,
              );
            }

            if (shouldResetAll || target === "common") {
              nextConfigurator.common = { ...initialConfiguratorState.common };
            }

            if (shouldResetAll || target === "addOns") {
              nextConfigurator.addOns = { ...initialConfiguratorState.addOns };
            }

            return {
              configurator: nextConfigurator,
            };
          },
          false,
          "configurator/resetConfig",
        ),
    }),
    { name: "ConfiguratorStore" },
  ),
);

/**
 * Selectors for optimized re-renders
 */
export const selectIsOpen = (state: ConfiguratorStore) => state.isOpen;

export const selectOpen = (state: ConfiguratorStore) => state.open;

export const selectClose = (state: ConfiguratorStore) => state.close;

export const selectDeviceInfo = (state: ConfiguratorStore) => state.deviceInfo;

export const selectSetDeviceInfo = (state: ConfiguratorStore) =>
  state.setDeviceInfo;

export const selectConfigurator = (state: ConfiguratorStore) =>
  state.configurator;

export const selectModelName = (state: ConfiguratorStore) =>
  state.configurator.modelName;

export const selectScreenSize = (state: ConfiguratorStore) =>
  state.configurator.screenSize;

export const selectTemplate = (state: ConfiguratorStore) =>
  state.configurator.template;

export const selectOptions = (state: ConfiguratorStore) =>
  state.configurator.options;

export const selectCommon = (state: ConfiguratorStore) =>
  state.configurator.common;

export const selectAddOns = (state: ConfiguratorStore) =>
  state.configurator.addOns;

// actions selectors
export const selectUpdateConfigurator = (state: ConfiguratorStore) =>
  state.updateConfigurator;

export const selectUpdateOptions = (state: ConfiguratorStore) =>
  state.updateOptions;

export const selectUpdateCommon = (state: ConfiguratorStore) =>
  state.updateCommon;

export const selectUpdateAddOns = (state: ConfiguratorStore) =>
  state.updateAddOns;

export const selectResetConfig = (state: ConfiguratorStore) =>
  state.resetConfig;
