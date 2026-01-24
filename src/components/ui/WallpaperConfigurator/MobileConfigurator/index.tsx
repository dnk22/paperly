"use client";

import MobileConfigBottomSheet from "./MobileConfigBottomSheet";
import PreviewPanel from "../PreviewPanel";

export default function MobileConfigurator() {
  return (
    // <Drawer.Root
    //   open={isOpen}
    //   onOpenChange={onOpenChange}
    //   modal={true} // Full modal experience - blocks app behind
    //   dismissible={true} // Allow swipe down to close
    // >
    //   {/* Overlay */}
    //   <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />

    //   {/* Content */}
    //   <Drawer.Portal>
    //     <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex flex-col h-[95vh] focus:outline-none">
    //       {/* Outer Drawer Container */}
    //       <div className="bg-neutral-950 rounded-t-[24px] border-t border-white/10 shadow-2xl flex flex-col h-full overflow-hidden">
    //         {/* Handle Bar */}
    //         <div className="flex justify-center py-3 border-b border-white/10">
    //           <div className="w-12 h-1.5 rounded-full bg-white/30" />
    //         </div>

    //         {/* Header with Close Button */}
    //         <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
    //           <h2 className="text-xl font-bold text-white">
    //             Wallpaper Configurator
    //           </h2>
    //           <button
    //             onClick={() => onOpenChange(false)}
    //             className="p-2 rounded-full hover:bg-white/10 transition-colors"
    //             aria-label="Close configurator"
    //           >
    //             <X size={20} className="text-white" />
    //           </button>
    //         </div>

    //         {/* Content Area - Contains Preview + Inner Sheet */}
    //         {/*
    //           IMPORTANT: This is where the layering happens
    //           - Preview is rendered as background (full height)
    //           - Inner bottom sheet is layered on top using absolute positioning via Vaul
    //           - Both exist in the same container but inner sheet has higher z-index
    //         */}

    //       </div>
    //     </Drawer.Content>
    //   </Drawer.Portal>
    // </Drawer.Root>

    <div className="flex-1 relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 flex items-center justify-center">
        <PreviewPanel />
      </div>
      <MobileConfigBottomSheet isOpen={true} onOpenChange={() => {}} />
    </div>
  );
}
