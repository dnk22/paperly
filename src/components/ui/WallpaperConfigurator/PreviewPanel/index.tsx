"use client";

import type { CSSProperties } from "react";
import {
  selectAddOns,
  selectAppConfig,
  selectDeviceModel,
  useConfiguratorStore,
} from "@/stores/useConfiguratorStore";
import type { WidgetConfigData } from "@/types/config";
import PhoneFrame from "../../PhoneFrame";
import {
  DEFAULT_DEVICE_MODEL,
  DEVICE_LIBRARY,
  type DeviceModelId,
} from "../configuration";
import Download from "./Download";

export default function PreviewPanel({
  model = DEFAULT_DEVICE_MODEL,
}: {
  model?: DeviceModelId;
}) {
  const selectedModel = useConfiguratorStore(selectDeviceModel);
  const appConfig = useConfiguratorStore(selectAppConfig);
  const addOns = useConfiguratorStore(selectAddOns);

  const activeModel = selectedModel ?? model;
  const spec = DEVICE_LIBRARY[activeModel] ?? DEVICE_LIBRARY[DEFAULT_DEVICE_MODEL];
  const backgroundStyle: CSSProperties = {
    backgroundColor: appConfig.more.backgroundColor,
    backgroundImage: appConfig.more.backgroundImage
      ? `url(${appConfig.more.backgroundImage})`
      : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const themeOverlayClass =
    appConfig.more.theme === "light"
      ? "bg-white/10"
      : appConfig.more.theme === "dark"
        ? "bg-black/35"
        : "bg-black/15";

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <p className="text-neutral-500 text-xs">
        {spec.name} ({spec.width} x {spec.height} px)
      </p>
      <PhoneFrame spec={spec}>
        <div className="relative w-full h-full" style={backgroundStyle}>
          <div className={`absolute inset-0 ${themeOverlayClass}`} />

          <div
            className="absolute inset-[18px] rounded-[36px] border"
            style={{ borderColor: appConfig.more.borderColor, opacity: 0.45 }}
          />

          <div className="absolute left-8 right-8 top-[155px] flex items-center justify-between z-[1]">
            <div
              className="h-10 w-28 rounded-2xl border"
              style={{
                backgroundColor: appConfig.more.leftWidgetColor,
                borderColor: appConfig.more.islandBorderColor,
                opacity: 0.25,
              }}
            />
            <div
              className="h-10 w-28 rounded-2xl border"
              style={{
                backgroundColor: appConfig.more.rightWidgetColor,
                borderColor: appConfig.more.islandBorderColor,
                opacity: 0.25,
              }}
            />
          </div>

          <div className="absolute left-8 right-8 top-[240px] z-[1]">
            <WidgetPreview widget={appConfig.widget} />
          </div>

          {addOns.statusBar && (
            <div
              className="absolute top-[58px] left-8 right-8 h-[3px] rounded-full z-[1]"
              style={{
                backgroundColor: appConfig.more.statusBar.color,
                opacity: 0.7,
              }}
            />
          )}

          {addOns.shelf && (
            <div
              className="absolute bottom-[165px] left-10 right-10 h-20 rounded-3xl border backdrop-blur-xl z-[1]"
              style={{
                borderColor: appConfig.more.borderColor,
                backgroundColor: appConfig.more.rightWidgetColor,
                opacity: 0.2,
              }}
            />
          )}

          {addOns.dock && (
            <div
              className="absolute bottom-[90px] left-12 right-12 h-16 rounded-[26px] border backdrop-blur-xl z-[1]"
              style={{
                borderColor: appConfig.more.borderColor,
                backgroundColor: appConfig.more.dockColor,
                opacity: 0.22,
              }}
            />
          )}
        </div>
      </PhoneFrame>
      <Download spec={spec} fileName="wallpaper.png" />
    </div>
  );
}

function WidgetPreview({ widget }: { widget: WidgetConfigData }) {
  const now = new Date();

  if (widget.type === "month") {
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).getDay();
    const adjustedStart = widget.data.startWeekOnMonday
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
          {widget.data.showDot && (
            <div className="h-2.5 w-2.5 rounded-full bg-white/80" />
          )}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((day, index) => {
            const hideCell = !day.isCurrentMonth && !widget.data.showOtherMonthDays;
            return (
              <div
                key={index}
                className={`h-7 rounded-md border border-white/10 text-[11px] flex items-center justify-center ${
                  hideCell ? "opacity-0" : day.isCurrentMonth ? "text-white/90" : "text-white/30"
                } ${widget.data.showDot && day.dayNumber === now.getDate() ? "bg-white/20" : "bg-white/5"}`}
              >
                {!hideCell ? day.dayNumber : ""}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (widget.type === "quarter") {
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

  if (widget.type === "year") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonthIndex = now.getMonth();

    return (
      <div className="rounded-3xl border border-white/15 bg-black/30 backdrop-blur-md p-5">
        <p className="text-white text-lg font-semibold mb-3">Year {now.getFullYear()}</p>
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

  if (widget.type === "life") {
    const today = new Date();
    const birthDate = widget.data.birthDate;
    let age = today.getFullYear() - birthDate.getFullYear();
    const beforeBirthday =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate());
    if (beforeBirthday) age -= 1;

    const expectancy = widget.data.lifeExpectancy ?? 90;
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

  if (widget.type === "routine") {
    const routines = widget.data.routines.slice(0, 4);
    return (
      <div className="rounded-3xl border border-white/15 bg-black/30 backdrop-blur-md p-5">
        <p className="text-white text-lg font-semibold mb-3">Routine</p>
        <div className="space-y-2">
          {routines.map((routine) => (
            <div
              key={routine.id}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 flex items-center justify-between"
            >
              <span className="text-sm text-white/90">{routine.name}</span>
              <span className="text-xs text-white/70">{routine.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const visionData =
    typeof widget.data === "object" && widget.data !== null
      ? (widget.data as Record<string, unknown>)
      : {};

  return (
    <div className="rounded-3xl border border-white/15 bg-black/30 backdrop-blur-md p-5">
      <p className="text-white text-lg font-semibold mb-2">
        {String(visionData.title ?? "Vision Board")}
      </p>
      <p className="text-white/70 text-sm mb-4">
        {String(visionData.note ?? "Your future starts with today's focus.")}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-12 rounded-lg border border-white/10 bg-white/10"
          />
        ))}
      </div>
    </div>
  );
}
