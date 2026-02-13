export default function QuarterWidget() {
  return (
    <div className="rounded-3xl border border-white/15 bg-black/30 backdrop-blur-md p-5">
      <p className="text-white text-lg font-semibold mb-3">Quarter Progress</p>
      <div className="grid grid-cols-2 gap-2">
        {["Q1", "Q2", "Q3", "Q4"].map((quarter) => (
          <div
            key={quarter}
            className="h-16 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/80 text-sm font-medium"
          >
            {quarter}
          </div>
        ))}
      </div>
    </div>
  );
}
