import type { OptionsConfig } from "@/types/config";

interface VisionWidgetProps {
  options: Partial<OptionsConfig>;
}

export default function VisionWidget({ options }: VisionWidgetProps) {
  const title =
    typeof options.title === "string" ? options.title : "Vision Board";
  const note =
    typeof options.note === "string"
      ? options.note
      : "Your future starts with today's focus.";

  return (
    <div className="rounded-3xl border border-white/15 bg-black/30 backdrop-blur-md p-5">
      <p className="text-white text-lg font-semibold mb-2">{title}</p>
      <p className="text-white/70 text-sm mb-4">{note}</p>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-12 rounded-lg border border-white/10 bg-white/10"
          />
        ))}
      </div>
    </div>
  );
}
