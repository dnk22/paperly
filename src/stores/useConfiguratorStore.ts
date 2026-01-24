import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { DeviceFingerprint } from "@/types/deviceFingerprint";

/**
 * Configurator Store State
 */
interface ConfiguratorState {
  isOpen: boolean;
  selectedWidget: string | null;
  deviceInfo: DeviceFingerprint | null;
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
}

/**
 * Configurator Store
 * Manages the state of the wallpaper configurator
 */
export const useConfiguratorStore = create<
  ConfiguratorState & ConfiguratorActions
>()(
  devtools(
    (set) => ({
      // State
      isOpen: false,
      selectedWidget: null,
      deviceInfo: null,

      // Actions
      open: (widgetType) =>
        set(
          (state) => ({
            isOpen: true,
            selectedWidget: widgetType ?? state.selectedWidget,
          }),
          false,
          "configurator/open"
        ),

      close: () =>
        set(
          { isOpen: false, selectedWidget: null },
          false,
          "configurator/close"
        ),

      toggle: () =>
        set((state) => ({ isOpen: !state.isOpen }), false, "configurator/toggle"),

      setWidget: (widgetType) =>
        set({ selectedWidget: widgetType }, false, "configurator/setWidget"),

      setDeviceInfo: (info) =>
        set({ deviceInfo: info }, false, "configurator/setDeviceInfo"),
    }),
    { name: "ConfiguratorStore" }
  )
);

/**
 * Selectors for optimized re-renders
 */
export const selectIsOpen = (state: ConfiguratorState & ConfiguratorActions) =>
  state.isOpen;

export const selectSelectedWidget = (
  state: ConfiguratorState & ConfiguratorActions
) => state.selectedWidget;

export const selectOpen = (state: ConfiguratorState & ConfiguratorActions) =>
  state.open;

export const selectClose = (state: ConfiguratorState & ConfiguratorActions) =>
  state.close;

export const selectDeviceInfo = (
  state: ConfiguratorState & ConfiguratorActions
) => state.deviceInfo;

export const selectSetDeviceInfo = (
  state: ConfiguratorState & ConfiguratorActions
) => state.setDeviceInfo;
