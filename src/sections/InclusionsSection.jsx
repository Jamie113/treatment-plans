import { CalendarPlus, TrashBin, Plus, ExclamationCircle } from "flowbite-react-icons/outline";
import { Select } from "flowbite-react";
import { Card } from "../components/UIComponents";
import { INCLUSION_CATALOGUE, INCLUSION_CYCLE_OPTIONS } from "../constants/catalogues";

const SCHEDULE_TYPES = [
  { id: "specific_orders", label: "Specific orders" },
  { id: "recurring_cycle", label: "Recurring cycle" },
];

export function InclusionsSection(props) {
  const { inclusions, ordersCount } = props;
  const orderNumbers = Array.from({ length: Math.min(ordersCount, 24) }, (_, i) => i + 1);

  return (
    <Card
      title="Inclusions"
      subtitle="Add items to specific orders or on their own recurring schedule."
      icon={<CalendarPlus size={18} />}
    >
      <div className="space-y-4">
        {/* Empty state */}
        {inclusions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
            <CalendarPlus size={28} className="text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-500">No inclusions added</p>
            <p className="text-xs text-gray-400 mt-0.5">Add blood tests, reviews, or other scheduled items</p>
          </div>
        )}

        {/* Inclusion rows */}
        {inclusions.map((item) => {
          const cycleOption = INCLUSION_CYCLE_OPTIONS.find((o) => o.id === item.cycleId);

          return (
            <div
              key={item.key}
              className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Row header: item selector + schedule toggle + remove */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <div className="flex-1 min-w-0">
                  <Select
                    sizing="sm"
                    value={item.itemId}
                    onChange={(e) => props.updateInclusion(item.key, { itemId: e.target.value })}
                  >
                    <option value="">Choose item…</option>
                    {INCLUSION_CATALOGUE.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </Select>
                </div>

                {/* Schedule type toggle */}
                <div className="flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden flex-shrink-0">
                  {SCHEDULE_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => props.updateInclusion(item.key, { scheduleType: type.id })}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                        item.scheduleType === type.id
                          ? "bg-blue-700 text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => props.removeInclusion(item.key)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                  title="Remove inclusion"
                >
                  <TrashBin size={15} />
                </button>
              </div>

              {/* Schedule configuration */}
              <div className="px-4 py-3">
                {item.scheduleType === "specific_orders" ? (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2.5">
                      Include in order
                    </p>
                    {ordersCount === 0 ? (
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <ExclamationCircle size={13} />
                        Set plan duration and cycle first to see order numbers.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {orderNumbers.map((n) => {
                          const active = item.orderNumbers.includes(n);
                          return (
                            <button
                              key={n}
                              type="button"
                              onClick={() => props.toggleInclusionOrder(item.key, n)}
                              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                                active
                                  ? "bg-blue-700 text-white shadow-sm"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              {n}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {item.orderNumbers.length > 0 && (
                      <p className="text-xs text-gray-400 mt-2">
                        Included in order{item.orderNumbers.length > 1 ? "s" : ""}{" "}
                        <span className="font-medium text-gray-600">
                          {item.orderNumbers.join(", ")}
                        </span>
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2.5">
                        Repeat every
                      </p>
                      <Select
                        sizing="sm"
                        value={item.cycleId}
                        onChange={(e) => props.updateInclusion(item.key, { cycleId: e.target.value })}
                      >
                        {INCLUSION_CYCLE_OPTIONS.map((o) => (
                          <option key={o.id} value={o.id}>{o.label}</option>
                        ))}
                      </Select>
                    </div>

                    {item.cycleId === "custom" && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2.5">
                          Days
                        </p>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            value={item.customCycleDays}
                            onChange={(e) =>
                              props.updateInclusion(item.key, {
                                customCycleDays: Number(e.target.value || 1),
                              })
                            }
                            className="w-20 px-3 py-1.5 text-sm text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <span className="text-sm text-gray-500">days</span>
                        </div>
                      </div>
                    )}

                    {/* Summary */}
                    <div className="ml-auto text-right">
                      <p className="text-xs text-gray-400">Approx. occurrences</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {item.cycleId === "custom"
                          ? Math.max(1, Math.round((props.duration * 30) / (item.customCycleDays || 1)))
                          : Math.max(1, Math.round((props.duration * 30) / (cycleOption?.days ?? 90)))}
                        {" "}over plan
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Add button */}
        <button
          type="button"
          onClick={props.addInclusion}
          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-blue-700 border border-dashed border-blue-300 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-colors"
        >
          <Plus size={15} />
          Add inclusion
        </button>
      </div>
    </Card>
  );
}
