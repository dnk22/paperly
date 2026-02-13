import { RotateCcw } from "lucide-react";
import {
  selectResetConfig,
  useConfiguratorStore,
} from "@/stores/useConfiguratorStore";

export default function ResetSection() {
  const resetConfig = useConfiguratorStore(selectResetConfig);

  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={resetConfig}
        className="w-full py-4 bg-primary hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-primary/30 flex justify-center items-center gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Reset current sub-product
      </button>
    </div>
  );
}
