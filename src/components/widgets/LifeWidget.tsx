import type { OptionsConfig } from "@/types/config";

interface LifeWidgetProps {
  options: Partial<OptionsConfig>;
}

const DEFAULT_BIRTHDATE = new Date("1995-01-01T00:00:00");

function resolveBirthDate(value: unknown): Date {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? DEFAULT_BIRTHDATE : value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? DEFAULT_BIRTHDATE : parsed;
  }
  return DEFAULT_BIRTHDATE;
}

export default function LifeWidget({ options }: LifeWidgetProps) {
  const today = new Date();
  const birthDate = resolveBirthDate(options.birthDate);
  const expectancy = options.lifeExpectancy ?? 90;

  let age = today.getFullYear() - birthDate.getFullYear();
  const beforeBirthday =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());
  if (beforeBirthday) age -= 1;

  const progress = Math.max(0, Math.min(100, (age / expectancy) * 100));

  return (
    <div className="rounded-3xl border border-white/15 bg-black/30 backdrop-blur-md p-5">
      <p className="text-white text-lg font-semibold mb-3">Life Progress</p>
      <div className="space-y-2">
        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-white/80"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/80">
          <span>{Math.max(0, age)} years</span>
          <span>Goal {expectancy} years</span>
        </div>
      </div>
    </div>
  );
}
