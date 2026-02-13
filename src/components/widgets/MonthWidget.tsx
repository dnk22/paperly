import type { OptionsConfig } from "@/types/config";

interface MonthWidgetProps {
  options: Partial<OptionsConfig>;
}

export default function MonthWidget({ options }: MonthWidgetProps) {
  const now = new Date();
  const startWeekOnMonday = options.startWeekOnMonday ?? true;
  const showDot = options.showDot ?? true;
  const showOtherMonthDays = options.showOtherMonthDays ?? false;

  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).getDay();
  const adjustedStart = startWeekOnMonday
    ? (firstDayOfMonth + 6) % 7
    : firstDayOfMonth;

  const totalCells = 42;
  const days = Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - adjustedStart + 1;
    const isCurrentMonth = dayNumber >= 1 && dayNumber <= daysInMonth;
    return { dayNumber, isCurrentMonth };
  });

  return (
    <div className="rounded-3xl border border-white/15 bg-black/30 backdrop-blur-md p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-white text-lg font-semibold">
          {now.toLocaleDateString("en-US", { month: "long" })}
        </p>
        {showDot && <div className="h-2.5 w-2.5 rounded-full bg-white/80" />}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day, index) => {
          const hideCell = !day.isCurrentMonth && !showOtherMonthDays;
          const isToday = showDot && day.dayNumber === now.getDate();
          return (
            <div
              key={index}
              className={`h-7 rounded-md border border-white/10 text-[11px] flex items-center justify-center ${
                hideCell
                  ? "opacity-0"
                  : day.isCurrentMonth
                    ? "text-white/90"
                    : "text-white/30"
              } ${isToday ? "bg-white/20" : "bg-white/5"}`}
            >
              {!hideCell ? day.dayNumber : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
