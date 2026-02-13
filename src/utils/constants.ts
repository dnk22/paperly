export const BENTO_UI_WIDGET_TYPES: { [key: string]: string } = {
  ROUTINE: "ROUTINE",
  CALENDAR: "CALENDAR",
  IDENTITY: "IDENTITY",
  PERSONALIZATION: "PERSONALIZATION",
  VISION_BOARD: "VISION_BOARD",
};

export const PRODUCT_TYPE = {
  TIME_PROGRESS: "TIME_PROGRESS",
  MINDSET_VISION: "MINDSET_VISION",
  UTILITY_IDENTITY: "UTILITY_IDENTITY",
  ADD_ON: "ADD_ON",
};

export const SUB_PRODUCT_TYPE = {
  // TIME & PROGRESS
  YEAR: "YEAR",
  QUARTER: "QUARTER",
  MONTH: "MONTH",
  LIFE_TIME: "LIFE_TIME",
  ROUTINE: "ROUTINE",
  COUNTDOWN: "COUNTDOWN",

  // MINDSET & VISION
  QUOTE: "QUOTE",
  VISION_BOARD: "VISION_BOARD",

  // UTILITY & IDENTITY
  OWNER_INFO: "OWNER_INFO",
  QR_CODE: "QR_CODE",
  SCHEMATIC: "SCHEMATIC",

  // ADD-ON
  ADD_ON: "ADD_ON",
} as const;

export interface ProductConfig {
  id: string;
  type: string;
  category: string;
  name: string;
  description: string;
  icon?: string;
  defaultConfig?: { [key: string]: number | string | boolean | object | null };
}

export const PRODUCT_CONFIGS: ProductConfig[] = [
  // TIME & PROGRESS
  {
    id: "year",
    type: SUB_PRODUCT_TYPE.YEAR,
    category: PRODUCT_TYPE.TIME_PROGRESS,
    name: "Year Progress",
    description: "365-day grid visualization",
    defaultConfig: {
      totalDots: 365,
      gridColumns: 52, // weeks
      gridRows: 7, // days
      highlightToday: true,
      colorScheme: "gradient",
    },
  },
  {
    id: "quarter",
    type: SUB_PRODUCT_TYPE.QUARTER,
    category: PRODUCT_TYPE.TIME_PROGRESS,
    name: "Quarter Progress",
    description: "4x4 grid for quarterly tracking",
    defaultConfig: {
      gridColumns: 4,
      gridRows: 4,
      quarters: [
        { name: "Q1", months: ["Jan", "Feb", "Mar"] },
        { name: "Q2", months: ["Apr", "May", "Jun"] },
        { name: "Q3", months: ["Jul", "Aug", "Sep"] },
        { name: "Q4", months: ["Oct", "Nov", "Dec"] },
      ],
    },
  },
  {
    id: "month",
    type: SUB_PRODUCT_TYPE.MONTH,
    category: PRODUCT_TYPE.TIME_PROGRESS,
    name: "Month Progress",
    description: "Current month day tracker",
    defaultConfig: {
      dynamicDots: true, // based on current month days
      gridColumns: 7, // week days
      showWeekdays: true,
      highlightToday: true,
    },
  },
  {
    id: "lifetime",
    type: SUB_PRODUCT_TYPE.LIFE_TIME,
    category: PRODUCT_TYPE.TIME_PROGRESS,
    name: "Life Timeline",
    description: "Customizable life progress grid",
    defaultConfig: {
      totalDots: 100, // 100 years default
      gridColumns: 10,
      gridRows: 10,
      customizable: true,
      birthYear: null,
      currentAge: null,
    },
  },
  {
    id: "routine",
    type: SUB_PRODUCT_TYPE.ROUTINE,
    category: PRODUCT_TYPE.TIME_PROGRESS,
    name: "Daily Routine",
    description: "Upcoming schedule (max 5 items)",
    defaultConfig: {
      maxItems: 5,
      sources: ["calendar", "manual"], // try calendar first, fallback to manual
      timeRange: ["today", "week", "month"],
      showTime: true,
      items: [], // manual items if calendar unavailable
    },
  },
  {
    id: "countdown",
    type: SUB_PRODUCT_TYPE.COUNTDOWN,
    category: PRODUCT_TYPE.TIME_PROGRESS,
    name: "Countdown / Goal",
    description: "Days until target date",
    defaultConfig: {
      title: "",
      startDate: new Date().toISOString(),
      endDate: "",
      showProgress: true,
      unit: "days", // days, hours, weeks
    },
  },

  // MINDSET & VISION
  {
    id: "quote",
    type: SUB_PRODUCT_TYPE.QUOTE,
    category: PRODUCT_TYPE.MINDSET_VISION,
    name: "Quote / Mantra",
    description: "Inspirational text with custom positioning",
    defaultConfig: {
      text: "",
      position: { x: 50, y: 50 }, // percentage based
      fontSize: 24,
      fontFamily: "Inter",
      color: "#ffffff",
      align: "center",
      draggable: true,
    },
  },
  {
    id: "visionBoard",
    type: SUB_PRODUCT_TYPE.VISION_BOARD,
    category: PRODUCT_TYPE.MINDSET_VISION,
    name: "Vision Board",
    description: "Customizable image grid layout",
    defaultConfig: {
      gridColumns: 3,
      gridRows: 3,
      gap: 8,
      images: [], // array of image URLs
      cardSizes: [], // custom size for each card
      uploadEnabled: true, // requires BE upload logic
      bentoLayout: "auto", // or custom config
    },
  },

  // UTILITY & IDENTITY
  {
    id: "ownerInfo",
    type: SUB_PRODUCT_TYPE.OWNER_INFO,
    category: PRODUCT_TYPE.UTILITY_IDENTITY,
    name: "Owner Info",
    description: "Personal identification card",
    defaultConfig: {
      name: "",
      title: "",
      photo: "",
      contact: {
        email: "",
        phone: "",
        social: {},
      },
      layout: "card", // card, minimal, badge
    },
  },
  {
    id: "qrCode",
    type: SUB_PRODUCT_TYPE.QR_CODE,
    category: PRODUCT_TYPE.UTILITY_IDENTITY,
    name: "QR Code",
    description: "Scannable QR code",
    defaultConfig: {
      data: "",
      size: 200,
      errorCorrection: "M",
      foregroundColor: "#000000",
      backgroundColor: "#ffffff",
      includeMargin: true,
    },
  },
  {
    id: "schematic",
    type: SUB_PRODUCT_TYPE.SCHEMATIC,
    category: PRODUCT_TYPE.UTILITY_IDENTITY,
    name: "Schematic",
    description: "Custom diagram or layout",
    defaultConfig: {
      type: "custom", // flowchart, mindmap, custom
      elements: [],
      connections: [],
      editable: true,
    },
  },

  // // ADD-ON
  {
    id: "addOn",
    type: SUB_PRODUCT_TYPE.ADD_ON,
    category: PRODUCT_TYPE.ADD_ON,
    name: "Add-On",
    description: "Additional UI components",
    defaultConfig: {
      position: "bottom", // top, bottom, left, right
      apps: [],
      iconSize: 48,
      maxApps: 10,
    },
  },
];

export const getProductsByCategory = (category: string) => {
  return PRODUCT_CONFIGS.filter((product) => product.category === category);
};

export const getProductConfig = (type: string) => {
  return PRODUCT_CONFIGS.find((product) => product.type === type);
};

export const STATUS_BAR_TYPES = {
  notch: [
    "X",
    "XS",
    "XS Max",
    "XR",
    "11",
    "11 Pro",
    "11 Pro Max",
    "12",
    "12 Pro",
    "12 Pro Max",
    "13",
    "13 Pro",
    "13 Pro Max",
    "14",
    "14 Plus",
    "16e",
  ],
  normal: ["6 Plus", "6s Plus", "7 Plus", "8 Plus"],
};
