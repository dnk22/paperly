"use client";

import * as React from "react";
import { Drawer } from "vaul";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function DrawerComponent({
  children,
  isOpen,
  onClose,
  title,
}: DrawerProps) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[95%] flex-col rounded-t-[24px] border-t border-white/10 bg-neutral-900">
          <div className="mx-auto mt-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-neutral-700" />

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
