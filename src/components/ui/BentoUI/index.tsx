/* ... imports ... */

import CalendarCard from "./card/CalendarCard";
import IdentityCard from "./card/IdentityCard";
import Personalization from "./card/Personalization";
import RoutineCard from "./card/RoutineCard";
import VisionBoardCard from "./card/VisionBoardCard";
import { BENTO_UI_WIDGET_TYPES } from "@/utils/constants";
import { useConfiguratorStore, selectOpen } from "@/stores/useConfiguratorStore";

export default function BentoUI() {
  const openConfigurator = useConfiguratorStore(selectOpen);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
      <RoutineCard
        onWidgetClick={() => openConfigurator(BENTO_UI_WIDGET_TYPES.ROUTINE)}
      />
      <CalendarCard
        onWidgetClick={() => openConfigurator(BENTO_UI_WIDGET_TYPES.CALENDAR)}
      />
      <Personalization
        onWidgetClick={() => openConfigurator(BENTO_UI_WIDGET_TYPES.PERSONALIZATION)}
      />
      <VisionBoardCard
        onWidgetClick={() => openConfigurator(BENTO_UI_WIDGET_TYPES.VISION_BOARD)}
      />
      <IdentityCard
        onWidgetClick={() => openConfigurator(BENTO_UI_WIDGET_TYPES.IDENTITY)}
      />
    </div>
  );
}
