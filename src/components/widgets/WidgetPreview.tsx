import type { OptionsConfig } from "@/types/config";
import { SUB_PRODUCT_TYPE } from "@/utils/constants";
import LifeWidget from "./LifeWidget";
import MonthWidget from "./MonthWidget";
import QuarterWidget from "./QuarterWidget";
import RoutineWidget from "./RoutineWidget";
import VisionWidget from "./VisionWidget";
import YearWidget from "./YearWidget";

interface WidgetPreviewProps {
  template: keyof typeof SUB_PRODUCT_TYPE;
  options: Partial<OptionsConfig>;
}

export default function WidgetPreview({ template, options }: WidgetPreviewProps) {
  switch (template) {
    case SUB_PRODUCT_TYPE.MONTH:
      return <MonthWidget options={options} />;
    case SUB_PRODUCT_TYPE.QUARTER:
      return <QuarterWidget />;
    case SUB_PRODUCT_TYPE.YEAR:
      return <YearWidget />;
    case SUB_PRODUCT_TYPE.LIFE_TIME:
      return <LifeWidget options={options} />;
    case SUB_PRODUCT_TYPE.ROUTINE:
      return <RoutineWidget options={options} />;
    case SUB_PRODUCT_TYPE.VISION_BOARD:
    case SUB_PRODUCT_TYPE.OWNER_INFO:
      return <VisionWidget options={options} />;
    default:
      return <VisionWidget options={options} />;
  }
}
