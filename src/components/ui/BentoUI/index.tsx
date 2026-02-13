/* ... imports ... */

import CalendarCard from "./card/CalendarCard";
import IdentityCard from "./card/IdentityCard";
import Personalization from "./card/Personalization";
import RoutineCard from "./card/RoutineCard";
import VisionBoardCard from "./card/VisionBoardCard";
import { SUB_PRODUCT_TYPE } from "@/utils/constants";
import {
  useConfiguratorStore,
  selectOpen,
} from "@/stores/useConfiguratorStore";

export default function BentoUI() {
  const openConfigurator = useConfiguratorStore(selectOpen);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
      <RoutineCard
        onWidgetClick={() => openConfigurator(SUB_PRODUCT_TYPE.ROUTINE)}
      />
      <CalendarCard
        onWidgetClick={() => openConfigurator(SUB_PRODUCT_TYPE.MONTH)}
      />
      <Personalization
        onWidgetClick={() => openConfigurator(SUB_PRODUCT_TYPE.ADD_ON)}
      />
      <VisionBoardCard
        onWidgetClick={() => openConfigurator(SUB_PRODUCT_TYPE.VISION_BOARD)}
      />
      <IdentityCard
        onWidgetClick={() => openConfigurator(SUB_PRODUCT_TYPE.OWNER_INFO)}
      />
    </div>
  );
}
