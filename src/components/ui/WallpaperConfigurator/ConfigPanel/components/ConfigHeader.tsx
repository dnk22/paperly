import { RotateCcw } from "lucide-react";
import Tooltip from "@/components/common/Tooltip";

export default function ConfigHeader({ onReset }: { onReset: () => void }) {
  return (
    <header className="sticky top-0 z-20 px-6 py-4 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur border-b border-border-light dark:border-border-dark">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-text-main-light dark:text-white">
          Create Your Wallpaper
        </h1>
        <div className="flex space-x-2">
          <Tooltip content="Reset" placement="left">
            <button
              type="button"
              onClick={onReset}
              className="p-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </Tooltip>
        </div>
      </div>
      <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed">
        Choose what to show and how it looks. Preview updates instantly.
      </p>
    </header>
  );
}
