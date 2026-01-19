
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar } from "lucide-react";

interface CalendarCardProps {
  onWidgetClick: (widgetType: string) => void;
}

function CalendarCard({ onWidgetClick }: CalendarCardProps) {
  const { t } = useLanguage();

  return (
    <SpotlightCard
      onClick={() => onWidgetClick("month")}
      className="col-span-2 flex justify-between bg-neutral-900 border border-neutral-800"
      spotlightColor="#ff84572d"
    >
      <div className="z-10 flex flex-col justify-between h-full">
        <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center mb-4 text-orange-500">
          <Calendar size={24} />
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-1">
            {t.bentoUI.calendar.title}
          </h3>
          <p className="text-neutral-400">{t.bentoUI.calendar.subtitle}</p>
        </div>
      </div>

      {/* Visual: Lịch minh họa */}
      <div className="absolute right-[-20px] top-8 w-[300px] opacity-80 group-hover:scale-105 transition-transform duration-500">
        <div className="grid grid-cols-7 gap-2 text-center text-xs text-neutral-600 font-bold mb-2">
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
          <span>S</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(28)].map((_, i) => (
            <div
              key={i}
              className={`h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                i === 14
                  ? "bg-brand text-white shadow-lg shadow-orange-500/50"
                  : "bg-neutral-800 text-neutral-500"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}

export default CalendarCard;
