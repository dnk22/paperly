// src/components/MobileCoverFlow.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight } from "lucide-react";
import { ITEMS } from "@/utils/data";
import { useConfiguratorStore, selectOpen } from "@/stores/useConfiguratorStore";

export default function MobileCoverFlow() {
  const openConfigurator = useConfiguratorStore(selectOpen);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full py-8 overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y touch-pinch-zoom">
          {ITEMS.map((item, index) => {
            // Logic Active: Kiểm tra xem item này có phải là item đang ở giữa không
            const isActive = index === selectedIndex;

            return (
              <div
                key={item.id}
                className="flex-[0_0_80%] min-w-0 pl-4 relative"
              >
                <div
                  onClick={() => openConfigurator(item.type)}
                  className={`
                    cursor-pointer relative h-[400px] rounded-[32px] p-6 flex flex-col justify-between border transition-all duration-300 ease-out
                    ${
                      isActive
                        ? "bg-surface-light dark:bg-surface-dark border-neutral-700 scale-100 opacity-100 shadow-2xl"
                        : "bg-surface-dark dark:bg-surface-light border-neutral-900 scale-90 opacity-40 blur-[1px]"
                    }
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div
                      className={`p-3 rounded-xl bg-${item.color}-500/10 text-${item.color}-500`}
                    >
                      {item.icon}
                    </div>
                    {isActive && (
                      <div className="bg-white/10 p-2 rounded-full animate-pulse">
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex items-center justify-center py-4">
                    <div
                      className={`w-full h-full rounded-2xl bg-gradient-to-br from-${item.color}-500/10 to-transparent border border-white/5`}
                    />
                  </div>

                  <div>
                    <h3
                      className={`text-2xl font-bold mb-1 ${isActive ? "text-white" : "text-neutral-500"}`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-500 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {ITEMS.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex ? "bg-white w-6" : "bg-neutral-800"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
