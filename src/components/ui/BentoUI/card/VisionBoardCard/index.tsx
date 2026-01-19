"use client";

import SpotlightCard from "@/components/ui/SpotlightCard";
import VisionBoard from "@/components/common/VisionBoard";
import { useLanguage } from "@/context/LanguageContext";
import { LayoutDashboard, Sparkles } from "lucide-react";

interface VisionBoardCardProps {
  onWidgetClick: (widgetType: string) => void;
}

export default function VisionBoardCard({
  onWidgetClick,
}: VisionBoardCardProps) {
  const { t } = useLanguage();

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const formattedTime = new Date()
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(":", ":");

  return (
    <SpotlightCard
      onClick={() => onWidgetClick("vision")}
      className="cursor-pointer group row-span-2 p-6 flex flex-col relative overflow-hidden"
      spotlightColor="rgba(236, 72, 153, 0.2)"
    >
      <div className="flex justify-between items-start mb-6 z-20 relative">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-4 text-pink-500">
            <LayoutDashboard size={24} />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">
            {t.bentoUI.gallery.title}
          </h3>
          <p className="text-neutral-400 text-sm">
            {t.bentoUI.gallery.subTitle}
          </p>
        </div>

        <div className="bg-neutral-800/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/5">
          <Sparkles size={16} className="text-pink-400" />
        </div>
      </div>

      <div className="flex-1 relative h-full rounded-[24px] overflow-hidden border border-neutral-800 bg-neutral-900/50 group-hover:border-pink-500/30 transition-colors duration-500">
        <VisionBoard />

        <div className="absolute top-8 inset-x-0 flex flex-col items-center z-30 pointer-events-none">
          <div className="text-4xl font-bold text-white/90 drop-shadow-lg tracking-tight">
            {formattedTime}
          </div>
          <div className="text-[10px] font-medium text-white/80 drop-shadow-md mt-1">
            {formattedDate}
          </div>
        </div>

        <div className="absolute bottom-4 inset-x-4 flex justify-between z-30 pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
            <div className="w-4 h-4 rounded-full bg-white/20" />
          </div>
          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
            <div className="w-4 h-4 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
