export default function YearWidget() {
  const now = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonthIndex = now.getMonth();

  return (
    <div className="rounded-3xl border border-white/15 bg-black/30 backdrop-blur-md p-5">
      <p className="text-white text-lg font-semibold mb-3">
        Year {now.getFullYear()}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {months.map((month, index) => (
          <div
            key={month}
            className={`h-12 rounded-lg border text-xs font-medium flex items-center justify-center ${
              index <= currentMonthIndex
                ? "border-white/20 bg-white/15 text-white"
                : "border-white/10 bg-white/5 text-white/60"
            }`}
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
}
