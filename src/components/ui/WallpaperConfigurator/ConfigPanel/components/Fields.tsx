import { inputClassName, labelClassName } from "../styles";

export function BooleanField({
  label,
  checked,
  onChange,
  className = "",
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <label
      className={`cursor-pointer group relative flex items-center justify-between p-4 bg-white dark:bg-[#15171C] border border-border-light dark:border-border-dark rounded-xl hover:border-primary/50 transition-colors ${className}`}
    >
      <span className="text-sm font-medium text-text-main-light dark:text-gray-300">
        {label}
      </span>
      <span className="relative inline-flex h-5 w-10 mr-2 align-middle select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-gray-300 dark:bg-gray-700 peer-checked:bg-primary transition-colors duration-300" />
        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

export function ColorInput({
  label,
  value,
  onChange,
  variant = "inline",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  variant?: "inline" | "swatch";
}) {
  const safeColorValue = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)
    ? value
    : "#ffffff";

  if (variant === "swatch") {
    return (
      <div className="flex items-center gap-3 p-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-[#15171C] hover:border-primary/50 transition-colors">
        <div className="h-8 w-8 shrink-0 relative overflow-hidden rounded-full border border-border-light dark:border-border-dark ring-1 ring-white/10">
          <input
            type="color"
            value={safeColorValue}
            onChange={(event) => onChange(event.target.value)}
            className="absolute -top-2 -left-2 w-[150%] h-[150%] p-0 m-0 cursor-pointer"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] text-text-muted-light dark:text-text-muted-dark truncate">
            {label}
          </span>
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="text-xs font-mono text-text-main-light dark:text-gray-300 bg-transparent border-none p-0 focus:outline-none"
            aria-label={`${label} color hex`}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className={labelClassName}>{label}</label>
      <div className="flex gap-2">
        <div className="h-10 w-14 shrink-0 relative overflow-hidden rounded-lg border border-border-light dark:border-border-dark shadow-sm">
          <input
            type="color"
            value={safeColorValue}
            onChange={(event) => onChange(event.target.value)}
            className="absolute -top-2 -left-2 w-[150%] h-[150%] p-0 m-0 cursor-pointer"
          />
        </div>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClassName} font-mono`}
        />
      </div>
    </div>
  );
}

export function VisionConfigEditor({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (nextData: Record<string, unknown>) => void;
}) {
  const visionData: Record<string, unknown> =
    typeof value === "object" && value !== null
      ? (value as Record<string, unknown>)
      : {};

  return (
    <div className="space-y-3">
      <div>
        <label className={labelClassName}>Title</label>
        <input
          className={inputClassName}
          value={String(visionData.title ?? "")}
          placeholder="My vision board"
          onChange={(event) =>
            onChange({
              ...visionData,
              title: event.target.value,
            })
          }
        />
      </div>

      <div>
        <label className={labelClassName}>Note</label>
        <textarea
          className={`${inputClassName} min-h-[90px] resize-y`}
          value={String(visionData.note ?? "")}
          placeholder="Describe your focus"
          onChange={(event) =>
            onChange({
              ...visionData,
              note: event.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
