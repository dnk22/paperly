import { SlidersHorizontal } from "lucide-react";
import Select from "@/components/common/Select";
import {
  selectModelName,
  selectScreenSize,
  selectTemplate,
  selectUpdateConfigurator,
  useConfiguratorStore,
} from "@/stores/useConfiguratorStore";
import { sectionTitleClassName } from "../styles";

import MODEL_ALIASES from "@/models/generated/modelAliases.json";
import { PRODUCT_CONFIGS } from "@/utils/constants";

export default function MainContentSection() {
  const modelName = useConfiguratorStore(selectModelName);
  const screenSize = useConfiguratorStore(selectScreenSize);
  const template = useConfiguratorStore(selectTemplate);
  const updateConfigurator = useConfiguratorStore(selectUpdateConfigurator);

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        <h2 className={sectionTitleClassName}>What to Show</h2>
      </div>
      <div className="space-y-6">
        <Select
          label="Your Device"
          value={`${screenSize}${modelName.replaceAll(" ", "-").toLowerCase()}`}
          onChange={({ screenSize, label }) => {
            updateConfigurator({
              screenSize,
              modelName: label,
            });
          }}
          options={Object.values(MODEL_ALIASES).map((item) => ({
            screenSize: item.profileKey,
            value: `${item.profileKey}${item.model.replaceAll(" ", "-").toLowerCase()}`,
            label: item.model,
          }))}
        />
        <Select
          label="Choose a layout"
          value={template}
          onChange={({ type }) =>
            updateConfigurator({
              template: type,
            })
          }
          options={PRODUCT_CONFIGS}
          fieldValue="type"
          fieldLabel="name"
        />
      </div>
    </section>
  );
}
