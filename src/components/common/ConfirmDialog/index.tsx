"use client";

import { useEffect } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onCancel]);

  if (!open) {
    return null;
  }

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-8"
    >
      <div className="w-full max-w-sm rounded-3xl border border-border-light bg-surface-light p-6 shadow-2xl dark:border-border-dark dark:bg-surface-dark">
        <h3 className="text-lg font-semibold text-text-main-light dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-text-muted-light dark:text-text-muted-dark">
            {description}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-border-light px-4 py-2 text-sm font-semibold text-text-muted-light transition-colors hover:border-primary/50 hover:text-text-main-light dark:border-border-dark dark:text-text-muted-dark dark:hover:text-white"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-2xl bg-primary px-6 py-2 text-sm font-semibold text-white transition dark:bg-brand"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
