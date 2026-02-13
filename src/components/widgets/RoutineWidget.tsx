import type { OptionsConfig } from "@/types/config";

interface RoutineWidgetProps {
  options: Partial<OptionsConfig>;
}

export default function RoutineWidget({ options }: RoutineWidgetProps) {
  const routines = Array.isArray(options.routines) ? options.routines : [];

  return (
    <div className="rounded-3xl border border-white/15 bg-black/30 backdrop-blur-md p-5">
      <p className="text-white text-lg font-semibold mb-3">Routine</p>
      <div className="space-y-2">
        {routines.slice(0, 4).map((routine, index) => (
          <div
            key={routine.id ?? `routine-${index}`}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 flex items-center justify-between"
          >
            <span className="text-sm text-white/90">
              {routine.name ?? "Routine"}
            </span>
            <span className="text-xs text-white/70">{routine.time ?? ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
