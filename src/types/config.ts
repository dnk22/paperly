export type WidgetType =
  | "year"
  | "month"
  | "life"
  | "routine"
  | "vision"
  | "identity";

export interface GlobalConfig {
  theme: "light" | "dark" | "auto";
  backgroundColor: string;
  backgroundImage?: string;
  borderColor: string;
  dockColor: string;
  statusBar: {
    type: "hidden";
    color: string;
  };
  islandColor: string;
  leftWidgetColor: string;
  rightWidgetColor: string;
}

export interface TimeMetaData {
  showStats?: boolean;
  showWeekOnTopDetails?: boolean;
  dotHighlightColor?: string;
}

export interface MonthConfig {
  startWeekOnMonday: boolean;
  showDayName: boolean;
  showDot: boolean;
  showOtherMonthDays: boolean;
  showMoonPhase: boolean;
}

export interface YearConfig {
  startWeekOnMonday: boolean;
  showDayName: boolean;
}

export interface LifeConfig {
  birthDate: Date;
  lifeExpectancy?: number; // optional, in years
}

export interface CountdownConfig {
  targetDate: Date;
  eventName?: string;
}

export interface RoutineConfig {
  routines: Array<{
    id: string;
    name: string;
    time: string; // e.g., "08:00 AM"
    days: string[]; // e.g., ["Mon", "Wed", "Fri"]
  }>;
}

// Union Type cho Widget Data
export type WidgetConfigData =
  | { type: "date"; data: undefined }
  | { type: "month"; data: MonthConfig }
  | { type: "quarter"; data: undefined }
  | { type: "year"; data: YearConfig }
  | { type: "life"; data: LifeConfig }
  | { type: "routine"; data: RoutineConfig }
  | { type: "vision"; data: any };

// STATE TỔNG CỦA ỨNG DỤNG
export interface AppConfig {
  widget: WidgetConfigData;
  more: GlobalConfig;
}
