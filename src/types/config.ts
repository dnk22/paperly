import { SUB_PRODUCT_TYPE } from "@/utils/constants";

export interface GlobalConfig {
  theme?: "light" | "dark" | "auto";
  backgroundColor?: string;
  backgroundImage?: string;
  borderColor?: string;
  dockColor?: string;
  statusBar?: {
    type: "hidden";
    color: string;
  };
  islandBorderColor?: string;
  leftWidgetColor?: string;
  rightWidgetColor?: string;
}

export interface AddOnConfig {
  dock?: boolean;
  statusBar?: boolean;
  shelf?: boolean;
}

export interface TimeMetaData {
  showStats?: boolean;
  showWeekOnTopDetails?: boolean;
  dotHighlightColor?: string;
}

export interface MonthConfig extends TimeMetaData {
  startWeekOnMonday: boolean;
  showDayName: boolean;
  showDot: boolean;
  showOtherMonthDays: boolean;
  showMoonPhase: boolean;
}

export interface YearConfig extends TimeMetaData {
  startWeekOnMonday: boolean;
  showDayName: boolean;
}

export interface LifeConfig extends TimeMetaData {
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

export interface VisionConfig {
  showBoundingBoxes: boolean;
  boxColor: string;
  showLabels: boolean;
  labelFontSize: number;
}

export interface OwnerInfoConfig {
  title: string;
  note: string;
}

// Union Type cho Widget Data
export type OptionsConfig = MonthConfig &
  YearConfig &
  LifeConfig &
  RoutineConfig &
  CountdownConfig &
  VisionConfig &
  OwnerInfoConfig;

// STATE TỔNG CỦA ỨNG DỤNG
export interface ConfiguratorState {
  screenSize: string;
  modelName: string;
  template: keyof typeof SUB_PRODUCT_TYPE;
  options: Partial<OptionsConfig>;
  common: GlobalConfig;
  addOns: AddOnConfig;
}
