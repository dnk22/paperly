"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import DrawerComponent from "../Drawer";
import {
  useConfiguratorStore,
  selectIsOpen,
  selectClose,
} from "@/stores/useConfiguratorStore";
import DesktopConfigurator from "./DesktopConfigurator";
import MobileConfigurator from "./MobileConfigurator";

/**
 * RESPONSIVE BEHAVIOR:
 * - Desktop (>= 768px): Drawer with desktop-optimized layout
 * - Mobile (< 768px): Drawer-based UI with bottom sheet
 */
export default function ConfiguratorShell() {
  const isOpen = useConfiguratorStore(selectIsOpen);
  const closeConfigurator = useConfiguratorStore(selectClose);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const renderContent = () => {
    if (isDesktop) {
      return <DesktopConfigurator />;
    } else {
      return <MobileConfigurator />;
    }
  };

  return (
    <DrawerComponent
      isOpen={isOpen}
      onClose={closeConfigurator}
      modal={isDesktop}
    >
      {renderContent()}
    </DrawerComponent>
  );
}
