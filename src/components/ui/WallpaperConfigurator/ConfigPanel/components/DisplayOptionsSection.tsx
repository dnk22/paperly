import { Boxes, Plus, Trash2 } from "lucide-react";
import {
  selectOptions,
  selectTemplate,
  selectUpdateOptions,
  useConfiguratorStore,
} from "@/stores/useConfiguratorStore";
import {
  inputClassName,
  labelClassName,
  sectionTitleClassName,
} from "../styles";
import { BooleanField, VisionConfigEditor } from "./Fields";
import { SUB_PRODUCT_TYPE } from "@/utils/constants";
import { OptionsConfig } from "@/types/config";
import { toDateInputValue } from "@/utils/helper";

export default function DisplayOptionsSection() {
  const template = useConfiguratorStore(selectTemplate);
  const options = useConfiguratorStore(selectOptions);

  const updateOptions = useConfiguratorStore(selectUpdateOptions);

  const updateWidget = (widget: Partial<OptionsConfig>) => {
    updateOptions(widget);
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Boxes className="h-4 w-4 text-primary" />
        <h2 className={sectionTitleClassName}>Display Options</h2>
      </div>

      <div className="space-y-6">
        {template === SUB_PRODUCT_TYPE.MONTH && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BooleanField
              label="Start week on Monday"
              checked={options.startWeekOnMonday}
              onChange={(checked) =>
                updateWidget({
                  startWeekOnMonday: checked,
                })
              }
            />
            <BooleanField
              label="Show day name"
              checked={options.showDayName}
              onChange={(checked) =>
                updateWidget({
                  showDayName: checked,
                })
              }
            />
            <BooleanField
              label="Show dot"
              checked={options.showDot}
              onChange={(checked) =>
                updateWidget({
                  showDot: checked,
                })
              }
            />
            <BooleanField
              label="Show other month days"
              checked={options.showOtherMonthDays}
              onChange={(checked) =>
                updateWidget({
                  showOtherMonthDays: checked,
                })
              }
            />
            <BooleanField
              label="Show moon phase"
              checked={options.showMoonPhase}
              onChange={(checked) =>
                updateWidget({
                  showMoonPhase: checked,
                })
              }
              className="md:col-span-2"
            />
          </div>
        )}

        {template === SUB_PRODUCT_TYPE.QUARTER && (
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
            Quarter currently has no extra schema fields (`data: undefined`).
          </p>
        )}

        {template === SUB_PRODUCT_TYPE.YEAR && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BooleanField
              label="Start week on Monday"
              checked={options.startWeekOnMonday}
              onChange={(checked) =>
                updateWidget({
                  startWeekOnMonday: checked,
                })
              }
            />
            <BooleanField
              label="Show day name"
              checked={options.showDayName}
              onChange={(checked) =>
                updateWidget({
                  showDayName: checked,
                })
              }
            />
          </div>
        )}

        {template === SUB_PRODUCT_TYPE.LIFE && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClassName}>Birth date</label>
              <input
                type="date"
                className={inputClassName}
                value={toDateInputValue(options.birthDate)}
                onChange={(event) =>
                  updateWidget({
                    birthDate: event.target.value
                      ? new Date(`${event.target.value}T00:00:00`)
                      : options.birthDate,
                  })
                }
              />
            </div>
            <div>
              <label className={labelClassName}>Life expectancy (years)</label>
              <input
                type="number"
                min="1"
                max="130"
                className={inputClassName}
                value={options.lifeExpectancy ?? ""}
                onChange={(event) =>
                  updateWidget({
                    lifeExpectancy: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  })
                }
              />
            </div>
          </div>
        )}

        {/* {template === SUB_PRODUCT_TYPE.ROUTINE && (
          <div className="space-y-3">
            {options.routines.map((routine, index) => (
              <div
                key={routine.id}
                className="rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-[#15171C] p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">
                    Routine #{index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const nextRoutines = options.routines.filter(
                        (_, routineIndex) => routineIndex !== index,
                      );
                      updateWidget({
                        routines: nextRoutines,
                      });
                    }}
                    className="rounded-lg p-1.5 text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary transition-colors"
                    aria-label={`Remove routine ${index + 1}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <input
                  className={inputClassName}
                  placeholder="Name"
                  value={routine.name}
                  onChange={(event) => {
                    const nextRoutines = [...options.routines];
                    nextRoutines[index] = {
                      ...nextRoutines[index],
                      name: event.target.value,
                    };
                    updateWidget({ routines: nextRoutines });
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    className={inputClassName}
                    type="time"
                    value={routine.time}
                    onChange={(event) => {
                      const nextRoutines = [...options.routines];
                      nextRoutines[index] = {
                        ...nextRoutines[index],
                        time: event.target.value,
                      };
                      updateWidget({ routines: nextRoutines });
                    }}
                  />
                  <input
                    className={inputClassName}
                    placeholder="Mon,Tue,Fri"
                    value={routine.days.join(",")}
                    onChange={(event) => {
                      const nextRoutines = [...options.routines];
                      nextRoutines[index] = {
                        ...nextRoutines[index],
                        days: event.target.value
                          .split(",")
                          .map((day) => day.trim())
                          .filter(Boolean),
                      };
                      updateWidget({ routines: nextRoutines });
                    }}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                updateWidget({
                  routines: [
                    ...options.routines,
                    {
                      id: `routine-${Date.now()}`,
                      name: "New Routine",
                      time: "09:00",
                      days: ["Mon"],
                    },
                  ],
                })
              }
              className="w-full rounded-xl border-2 border-dashed border-border-light dark:border-border-dark px-3 py-2 text-sm text-text-muted-light dark:text-text-muted-dark hover:border-primary transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={14} />
              Add routine
            </button>
          </div>
        )} */}

        {template === SUB_PRODUCT_TYPE.VISION_BOARD && (
          <VisionConfigEditor
            value={options}
            onChange={(nextVisionData) =>
              updateWidget({ vision: nextVisionData })
            }
          />
        )}
      </div>
    </section>
  );
}
