import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { DeviceFingerprint } from "@/types/deviceFingerprint";
import type { AppConfig, GlobalConfig } from "@/types/config";
import {
  createDefaultAppConfig,
  createDefaultWidgetConfig,
  DEFAULT_DEVICE_MODEL,
  DEFAULT_PRODUCT_TYPE,
  getDefaultSubProduct,
  getProductFromWidget,
  resolveAutoDeviceModel,
  resolveWidgetTypeFromSelection,
  type DeviceModelId,
  type ProductType,
  type WidgetType,
} from "@/components/ui/WallpaperConfigurator/configuration";

interface AddOnConfig {
  dock: boolean;
  statusBar: boolean;
  shelf: boolean;
}

/**
 * Configurator Store State
 */
interface ConfiguratorState {
  isOpen: boolean;
  selectedWidget: string | null;
  deviceInfo: DeviceFingerprint | null;
  deviceModel: DeviceModelId;
  productType: ProductType;
  appConfig: AppConfig;
  addOns: AddOnConfig;
}

/**
 * Configurator Store Actions
 */
interface ConfiguratorActions {
  open: (widgetType?: string) => void;
  close: () => void;
  toggle: () => void;
  setWidget: (widgetType: string | null) => void;
  setDeviceInfo: (info: DeviceFingerprint) => void;
  setDeviceModel: (model: DeviceModelId) => void;
  setProductType: (productType: ProductType) => void;
  setSubProductType: (subProduct: WidgetType) => void;
  updateAppConfig: (config: AppConfig) => void;
  updateGlobalConfig: (patch: Partial<GlobalConfig>) => void;
  setAddOn: (key: keyof AddOnConfig, enabled: boolean) => void;
  resetConfig: () => void;
}

type ConfiguratorStore = ConfiguratorState & ConfiguratorActions;

const DEFAULT_ADD_ONS: AddOnConfig = {
  dock: true,
  statusBar: false,
  shelf: false,
};

/**
 * Configurator Store
 * Manages the state of the wallpaper configurator
 */
export const useConfiguratorStore = create<ConfiguratorStore>()(
  devtools(
    (set) => ({
      // State
      isOpen: false,
      selectedWidget: null,
      deviceInfo: null,
      deviceModel: DEFAULT_DEVICE_MODEL,
      productType: DEFAULT_PRODUCT_TYPE,
      appConfig: createDefaultAppConfig("month"),
      addOns: DEFAULT_ADD_ONS,

      // Actions
      open: (widgetType) =>
        set((state) => {
          const nextWidgetType = resolveWidgetTypeFromSelection(
            widgetType ?? state.selectedWidget
          );
          return {
            isOpen: true,
            selectedWidget: widgetType ?? state.selectedWidget,
            productType: getProductFromWidget(nextWidgetType),
            appConfig: {
              ...state.appConfig,
              widget: createDefaultWidgetConfig(nextWidgetType),
            },
          };
        }, false, "configurator/open"),

      close: () =>
        set(
          { isOpen: false, selectedWidget: null },
          false,
          "configurator/close"
        ),

      toggle: () =>
        set((state) => ({ isOpen: !state.isOpen }), false, "configurator/toggle"),

      setWidget: (widgetType) =>
        set((state) => {
          if (!widgetType) {
            return { selectedWidget: null };
          }
          const nextWidgetType = resolveWidgetTypeFromSelection(widgetType);
          return {
            selectedWidget: widgetType,
            productType: getProductFromWidget(nextWidgetType),
            appConfig: {
              ...state.appConfig,
              widget: createDefaultWidgetConfig(nextWidgetType),
            },
          };
        }, false, "configurator/setWidget"),

      setDeviceInfo: (info) =>
        set(
          {
            deviceInfo: info,
            deviceModel: resolveAutoDeviceModel(info),
          },
          false,
          "configurator/setDeviceInfo"
        ),

      setDeviceModel: (model) =>
        set({ deviceModel: model }, false, "configurator/setDeviceModel"),

      setProductType: (productType) =>
        set((state) => {
          const nextSubProduct = getDefaultSubProduct(productType);
          return {
            productType,
            appConfig: {
              ...state.appConfig,
              widget: createDefaultWidgetConfig(nextSubProduct),
            },
          };
        }, false, "configurator/setProductType"),

      setSubProductType: (subProduct) =>
        set((state) => ({
          productType: getProductFromWidget(subProduct),
          appConfig: {
            ...state.appConfig,
            widget: createDefaultWidgetConfig(subProduct),
          },
        }), false, "configurator/setSubProductType"),

      updateAppConfig: (config) =>
        set({ appConfig: config }, false, "configurator/updateAppConfig"),

      updateGlobalConfig: (patch) =>
        set((state) => ({
          appConfig: {
            ...state.appConfig,
            more: {
              ...state.appConfig.more,
              ...patch,
              statusBar: patch.statusBar
                ? {
                    ...state.appConfig.more.statusBar,
                    ...patch.statusBar,
                  }
                : state.appConfig.more.statusBar,
            },
          },
        }), false, "configurator/updateGlobalConfig"),

      setAddOn: (key, enabled) =>
        set(
          (state) => ({
            addOns: {
              ...state.addOns,
              [key]: enabled,
            },
          }),
          false,
          "configurator/setAddOn"
        ),

      resetConfig: () =>
        set((state) => {
          const currentWidgetType = state.appConfig.widget.type;
          return {
            productType: getProductFromWidget(currentWidgetType),
            appConfig: createDefaultAppConfig(currentWidgetType),
            addOns: DEFAULT_ADD_ONS,
          };
        }, false, "configurator/resetConfig"),
    }),
    { name: "ConfiguratorStore" }
  )
);

/**
 * Selectors for optimized re-renders
 */
export const selectIsOpen = (state: ConfiguratorStore) => state.isOpen;

export const selectSelectedWidget = (state: ConfiguratorStore) =>
  state.selectedWidget;

export const selectOpen = (state: ConfiguratorStore) => state.open;

export const selectClose = (state: ConfiguratorStore) => state.close;

export const selectDeviceInfo = (state: ConfiguratorStore) => state.deviceInfo;

export const selectSetDeviceInfo = (state: ConfiguratorStore) =>
  state.setDeviceInfo;

export const selectDeviceModel = (state: ConfiguratorStore) => state.deviceModel;

export const selectSetDeviceModel = (state: ConfiguratorStore) =>
  state.setDeviceModel;

export const selectProductType = (state: ConfiguratorStore) =>
  state.productType;

export const selectSetProductType = (state: ConfiguratorStore) =>
  state.setProductType;

export const selectSetSubProductType = (state: ConfiguratorStore) =>
  state.setSubProductType;

export const selectAppConfig = (state: ConfiguratorStore) => state.appConfig;

export const selectUpdateAppConfig = (state: ConfiguratorStore) =>
  state.updateAppConfig;

export const selectUpdateGlobalConfig = (state: ConfiguratorStore) =>
  state.updateGlobalConfig;

export const selectAddOns = (state: ConfiguratorStore) => state.addOns;

export const selectSetAddOn = (state: ConfiguratorStore) => state.setAddOn;

export const selectResetConfig = (state: ConfiguratorStore) => state.resetConfig;
