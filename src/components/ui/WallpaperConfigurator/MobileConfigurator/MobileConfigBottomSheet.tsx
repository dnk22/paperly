"use client";

import React, { useState } from "react";
import { Drawer } from "vaul";
import ConfigPanel from "../ConfigPanel";

interface MobileConfigBottomSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * MobileConfigBottomSheet - Inner bottom sheet with Apple Maps-style behavior
 * Uses Vaul drawer with snap points (50%, 70%, 90%)
 * Layered on top of the preview inside the outer drawer
 * modal={false} to keep preview visible behind
 */
export default function MobileConfigBottomSheet({
  isOpen,
  onOpenChange,
}: MobileConfigBottomSheetProps) {
  // Snap points: 50%, 70%, 90% of viewport height
  const snapPoints = [0.5, 0.7, 0.9];
  const [activeSnapPoint, setActiveSnapPoint] = useState<number | string | null>(0.7);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      activeSnapPoint={activeSnapPoint}
      setActiveSnapPoint={setActiveSnapPoint}
      modal={false} // Critical: allows preview behind to remain visible
      dismissible={false} // Prevent swipe-to-dismiss to avoid conflicts with outer drawer
    >
      {/* Overlay - subtle and absolute positioned within outer drawer content */}
      <Drawer.Overlay className="fixed inset-0 bg-black/10 z-[60]" />

      {/* Content */}
      <Drawer.Portal>
        <Drawer.Content
          className="fixed bottom-0 left-0 right-0 z-[70] flex flex-col"
          style={{
            // Important: use max-height to work with snap points
            maxHeight: "95%",
          }}
        >
          {/* Sheet Container */}
          <div className="bg-neutral-900/95 backdrop-blur-xl rounded-t-[20px] border-t border-white/10 shadow-2xl flex flex-col h-full">
            {/* Handle Bar */}
            <div className="flex justify-center py-3">
              <div className="w-10 h-1.5 rounded-full bg-white/30" />
            </div>

            {/* Header Row */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Settings</h3>
              <button
                onClick={() => {
                  // Option 1: Close the sheet entirely
                  // onOpenChange(false);
                  
                  // Option 2: Collapse to 50% snap point (chosen for better UX)
                  setActiveSnapPoint(0.5);
                }}
                className="text-purple-500 font-medium text-sm hover:text-purple-400 transition-colors"
                aria-label="Done with settings"
              >
                Done
              </button>
            </div>

            {/* Scrollable Config Content */}
            {/* 
              CRITICAL: This div handles scrolling of form content.
              - overflow-y-auto allows vertical scrolling
              - touch-pan-y ensures proper touch scrolling on iOS
              - flex-1 makes it fill available space
              - The preview behind will NOT scroll because it's in a separate layer
            */}
            <div className="flex-1 overflow-y-auto px-6 py-4 overscroll-contain touch-pan-y">
              <ConfigPanel />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
