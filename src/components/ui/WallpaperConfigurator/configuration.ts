import type { AppConfig, WidgetConfigData } from "@/types/config";
import type { DeviceFingerprint } from "@/types/deviceFingerprint";

export type WidgetType = WidgetConfigData["type"];

export const PRODUCT_OPTIONS = [
  { id: "time-progress", label: "Time & Progress" },
  { id: "mindset-vision", label: "Mindset & Vision" },
] as const;

export type ProductType = (typeof PRODUCT_OPTIONS)[number]["id"];

export const SUB_PRODUCT_LABELS: Record<WidgetType, string> = {
  month: "Month",
  quarter: "Quarter",
  year: "Year",
  life: "Life",
  routine: "Routine",
  vision: "Vision",
};

export const PRODUCT_TO_SUB_PRODUCTS: Record<ProductType, WidgetType[]> = {
  "time-progress": ["month", "quarter", "year", "life", "routine"],
  "mindset-vision": ["vision"],
};

export interface DevicePreviewSpec {
  name: string;
  width: number;
  height: number;
  frameBorder: number;
  borderRadius: number;
  type: "dynamic-island" | "notch";
  notchWidth: number;
  notchHeight: number;
  statusBarTop: number;
}

export type DeviceModelId = "iphone-15-pro" | "iphone-14";

export const DEVICE_LIBRARY: Record<DeviceModelId, DevicePreviewSpec> = {
  "iphone-15-pro": {
    name: "iPhone 15/16 Pro Max",
    width: 430,
    height: 932,
    frameBorder: 8,
    borderRadius: 50,
    type: "dynamic-island",
    notchWidth: 120,
    notchHeight: 35,
    statusBarTop: 18,
  },
  "iphone-14": {
    name: "iPhone 13/14",
    width: 390,
    height: 844,
    frameBorder: 7,
    borderRadius: 40,
    type: "notch",
    notchWidth: 160,
    notchHeight: 30,
    statusBarTop: 14,
  },
};

export const DEFAULT_DEVICE_MODEL: DeviceModelId = "iphone-15-pro";
export const DEFAULT_PRODUCT_TYPE: ProductType = "time-progress";

const WIDGET_SELECTION_MAP: Record<string, WidgetType> = {
  ROUTINE: "routine",
  CALENDAR: "month",
  MONTH: "month",
  YEAR: "year",
  QUARTER: "quarter",
  LIFE: "life",
  LIFETIME: "life",
  VISION: "vision",
  VISION_BOARD: "vision",
  PERSONALIZATION: "quarter",
  IDENTITY: "year",
  TALL: "year",
  SQUARE: "life",
  WIDE: "vision",
};

export function resolveWidgetTypeFromSelection(
  selection?: string | null
): WidgetType {
  if (!selection) return "month";

  const normalized = selection.trim().replace(/[\s-]+/g, "_").toUpperCase();
  return WIDGET_SELECTION_MAP[normalized] ?? "month";
}

export function getProductFromWidget(widgetType: WidgetType): ProductType {
  if (widgetType === "vision") {
    return "mindset-vision";
  }
  return "time-progress";
}

export function getDefaultSubProduct(productType: ProductType): WidgetType {
  const subProducts = PRODUCT_TO_SUB_PRODUCTS[productType];
  return subProducts[0] ?? "month";
}

export function createDefaultWidgetConfig(widgetType: WidgetType): WidgetConfigData {
  switch (widgetType) {
    case "month":
      return {
        type: "month",
        data: {
          startWeekOnMonday: true,
          showDayName: true,
          showDot: true,
          showOtherMonthDays: false,
          showMoonPhase: false,
        },
      };
    case "quarter":
      return { type: "quarter", data: undefined };
    case "year":
      return {
        type: "year",
        data: {
          startWeekOnMonday: true,
          showDayName: false,
        },
      };
    case "life":
      return {
        type: "life",
        data: {
          birthDate: new Date("1995-01-01T00:00:00"),
          lifeExpectancy: 90,
        },
      };
    case "routine":
      return {
        type: "routine",
        data: {
          routines: [
            {
              id: "routine-1",
              name: "Deep Work",
              time: "08:00",
              days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            },
          ],
        },
      };
    case "vision":
      return {
        type: "vision",
        data: {
          title: "Build with clarity",
          note: "Keep your long-term goal in sight.",
        },
      };
    default:
      return { type: "month", data: createDefaultWidgetConfig("month").data };
  }
}

export function createDefaultAppConfig(widgetType: WidgetType = "month"): AppConfig {
  return {
    widget: createDefaultWidgetConfig(widgetType),
    more: {
      theme: "auto",
      backgroundColor: "#0b1220",
      backgroundImage: "",
      borderColor: "#ffffff",
      dockColor: "#ffffff",
      statusBar: {
        type: "hidden",
        color: "#ffffff",
      },
      islandBorderColor: "#ffffff",
      leftWidgetColor: "#b8d9ff",
      rightWidgetColor: "#f9d7ff",
    },
  };
}

export function resolveAutoDeviceModel(
  deviceInfo: DeviceFingerprint | null
): DeviceModelId {
  const width =
    deviceInfo?.logicalPt?.widthPt ??
    deviceInfo?.screen?.width ??
    deviceInfo?.viewport?.innerWidth;
  const height =
    deviceInfo?.logicalPt?.heightPt ??
    deviceInfo?.screen?.height ??
    deviceInfo?.viewport?.innerHeight;

  if (!width || !height) return DEFAULT_DEVICE_MODEL;

  const portraitWidth = Math.min(width, height);
  const portraitHeight = Math.max(width, height);

  if (portraitWidth > 700 || portraitHeight > 1400) {
    return DEFAULT_DEVICE_MODEL;
  }

  let bestModel: DeviceModelId = DEFAULT_DEVICE_MODEL;
  let bestScore = Number.POSITIVE_INFINITY;
  const targetRatio = portraitWidth / portraitHeight;

  (Object.keys(DEVICE_LIBRARY) as DeviceModelId[]).forEach((modelId) => {
    const spec = DEVICE_LIBRARY[modelId];
    const score =
      Math.abs(spec.width - portraitWidth) +
      Math.abs(spec.height - portraitHeight) +
      Math.abs(spec.width / spec.height - targetRatio) * 500;

    if (score < bestScore) {
      bestScore = score;
      bestModel = modelId;
    }
  });

  return bestModel;
}

export function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}
