"use client";

import SpotlightCard from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/context/LanguageContext";
import { ListTodo, CheckCircle2 } from "lucide-react";

interface RoutineCardProps {
  onWidgetClick: (widgetType: string) => void;
}

export default function RoutineCard({ onWidgetClick }: RoutineCardProps) {
  const { t } = useLanguage();

  const tasks = [
    { time: "06:30", title: "Morning Run", status: "done" },
    { time: "08:00", title: "Deep Work", status: "active" },
    { time: "12:00", title: "Lunch Break", status: "pending" },
    { time: "14:00", title: "Talk with Paperly", status: "pending" },
    { time: "18:30", title: "Gym session", status: "pending" },
  ];

  return (
    <SpotlightCard
      onClick={() => onWidgetClick("routine")}
      className="cursor-pointer group row-span-2 p-6 flex flex-col relative overflow-hidden"
      spotlightColor="rgba(168, 85, 247, 0.2)"
    >
      <div className="flex flex-col justify-between h-full">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500">
          <ListTodo size={24} />
        </div>
        <div className="flex flex-col justify-between items-start gap-6 z-10 relative">
          <div>
            <h3 className="text-3xl font-bold text-white mb-1">
              {t.bentoUI.routine.title}
            </h3>
            <p className="text-neutral-400 text-sm">
              {t.bentoUI.routine.subtitle1}
              <br /> {t.bentoUI.routine.subtitle2}
            </p>
          </div>

          <div className="flex-1 relative z-10 pl-2">
            <div className="absolute left-[19px] top-2 bottom-4 w-[2px] bg-neutral-800" />

            <div className="space-y-5">
              {tasks.map((task, index) => {
                const isDone = task.status === "done";
                const isActive = task.status === "active";

                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 relative group/item"
                  >
                    <div
                      className={`
                  relative z-10 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-neutral-900
                  ${isDone ? "border-purple-500 bg-purple-500" : ""}
                  ${
                    isActive
                      ? "border-purple-400 animate-pulse"
                      : "border-neutral-700"
                  }
                `}
                    >
                      {isDone && (
                        <CheckCircle2 size={10} className="text-white" />
                      )}
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      )}
                    </div>

                    <div
                      className={`flex-1 transition-all duration-300 ${
                        isActive ? "translate-x-1" : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-xs font-mono ${
                            isActive
                              ? "text-purple-400 font-bold"
                              : "text-neutral-500"
                          }`}
                        >
                          {task.time}
                        </span>
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          isDone
                            ? "text-neutral-600 line-through"
                            : isActive
                              ? "text-white"
                              : "text-neutral-400"
                        }`}
                      >
                        {task.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
