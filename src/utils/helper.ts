import { OptionsConfig } from "@/types/config";
import { SUB_PRODUCT_TYPE } from "./constants";

export function createDefaultWidgetConfig(
  template: keyof typeof SUB_PRODUCT_TYPE,
): Partial<OptionsConfig> {
  switch (template) {
    case SUB_PRODUCT_TYPE.MONTH:
      return {
        startWeekOnMonday: true,
        showDayName: true,
        showDot: true,
        showOtherMonthDays: false,
        showMoonPhase: false,
      };
    case SUB_PRODUCT_TYPE.QUARTER:
      return {};
    case SUB_PRODUCT_TYPE.YEAR:
      return {
        startWeekOnMonday: true,
        showDayName: false,
      };
    case SUB_PRODUCT_TYPE.LIFE_TIME:
      return {
        birthDate: new Date("1995-01-01T00:00:00"),
        lifeExpectancy: 100,
      };
    case SUB_PRODUCT_TYPE.ROUTINE:
      return {
        routines: [
          {
            id: "routine-1",
            name: "Do exercise",
            time: "08:00",
            days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          },
        ],
      };
    case SUB_PRODUCT_TYPE.OWNER_INFO:
      return {
        title: "Build with clarity",
        note: "Keep your long-term goal in sight.",
      };
    default:
      return {};
  }
}

export function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}
