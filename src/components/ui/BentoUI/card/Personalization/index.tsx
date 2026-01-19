import SpotlightCard from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/context/LanguageContext";
import { Zap } from "lucide-react";

interface PersonalizationProps {
  onWidgetClick: (widgetType: string) => void;
}

function Personalization({ onWidgetClick }: PersonalizationProps) {
  const { t } = useLanguage();

  return (
    <SpotlightCard className="flex flex-col justify-between" onClick={() => onWidgetClick("organizer")}> 
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-green-500/10 text-green-400 rounded-xl">
            <Zap size={20} />
          </div>
        </div>
        {/* Visual Dock */}
        <div className="flex justify-center gap-5 my-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 group-hover:border-green-500/50 transition-colors"
            />
          ))}
        </div>
        <div>
          <h4 className="text-lg font-bold">
            {t.bentoUI.personalization.title}
          </h4>
          <p className="text-xs text-neutral-500">
            {t.bentoUI.personalization.subTitle}
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default Personalization;
