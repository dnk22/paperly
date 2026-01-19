"use client";

import BentoUI from "@/components/ui/BentoUI";
import Title from "../../components/layout/Title";
import MobileCoverFlow from "@/components/ui/MobileCoverFlow";

import DrawerComponent from "@/components/ui/Drawer";
import { useState } from "react";

export default function LandingPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  const handleWidgetClick = (widgetType: string) => {
    setSelectedWidget(widgetType);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedWidget(null);
  };

  return (
    <div className="w-full mx-auto max-w-[1200px] px-4 md:px-8">
      <Title />
      <div className="hidden lg:block animate-in fade-in duration-500 md:px-8 sm:px-4">
        <BentoUI onWidgetClick={handleWidgetClick} />
      </div>

      <div className="block lg:hidden animate-in fade-in duration-500 md:px-8 sm:px-4">
        <MobileCoverFlow />
      </div>

      <DrawerComponent isOpen={drawerOpen} onClose={handleDrawerClose} title={selectedWidget || "Widget"}>
        <div className="text-white text-center py-8">
          {selectedWidget ? `Widget: ${selectedWidget}` : "No widget selected"}
        </div>
      </DrawerComponent>
    </div>
  );
}
