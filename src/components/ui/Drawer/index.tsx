"use client";

import * as React from "react";
import { DialogProps, Drawer } from "vaul";

type DrawerProps = DialogProps & {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isShowHandle?: boolean;
};

export default function DrawerComponent({
  children,
  isOpen,
  onClose,
  modal,
  isShowHandle = true,
  ...rest
}: DrawerProps) {
  return (
    <Drawer.Root open={isOpen} onClose={onClose} modal={modal} {...rest}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Drawer.Content
          className={`fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-full md:h-[95%] flex-col border-t border-white/10 bg-surface-light dark:bg-surface-dark ${!modal ? "rounded-t-none" : "rounded-t-[24px]"}`}
        >
          {isShowHandle && (
            <div className="mx-auto mt-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-neutral-700" />
          )}
          <div className="relative flex-1 h-full overflow-hidden p-4 pr-0">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
