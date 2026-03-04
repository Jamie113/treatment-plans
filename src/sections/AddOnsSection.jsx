import { Cart, TrashBin, Plus, ExclamationCircle } from "flowbite-react-icons/outline";
import { Select } from "flowbite-react";
import { Card } from "../components/UIComponents";
import { ADDON_CATALOGUE, INCLUSION_CYCLE_OPTIONS } from "../constants/catalogues";

const SCHEDULE_TYPES = [
  { id: "specific_orders", label: "Specific orders" },
  { id: "recurring_cycle", label: "Recurring cycle" },
];

export function AddOnsSection(props) {
  const { upsells, ordersCount, duration } = props;
  const orderNumbers = Array.from({ length: Math.min(ordersCount, 24) }, (_, i) => i + 1);

  return (
    <Card
      title="Upsells"
      subtitle="Add products patients can purchase alongside their treatment plan."
      icon={<Cart size={18} />}
    >
      <div className="space-y-4">
        {/* Empty state */}
        {upsells.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
            <Cart size={28} className="text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-500">No upsells added</p>
            <p className="text-xs text-gray-400 mt-0.5">Add vitamins, medications or supplements patients can buy</p>
          </div>
        )}

        {/* Upsell rows */}
        {upsells.map((item) => {
          const catalogueItem = ADDON_CATALOGUE.find((a) => a.id === item.itemId);
          const cycleOption = INCLUSION_CYCLE_OPTIONS.find((o) => o.id === item.cycleId);
          const cataloguePrice = catalogueItem?.price ?? 0;

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
                    onChange={(e) => props.updateUpsell(item.key, { itemId: e.target.value })}
                  >
                    <option value="">Choose product…</option>
                    {ADDON_CATALOGUE.map((a) => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </Select>
                </div>

                {/* Schedule type toggle */}
                <div className="flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden flex-shrink-0">
                  {SCHEDULE_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => props.updateUpsell(item.key, { scheduleType: type.id })}
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
                  onClick={() => props.removeUpsell(item.key)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                  title="Remove upsell"
                >
                  <TrashBin size={15} />
                </button>
              </div>

              {/* Schedule configuration */}
              <div className="px-4 py-3 border-b border-gray-100">
                {item.scheduleType === "specific_orders" ? (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2.5">
                      Offer in order
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
                              onClick={() => props.toggleUpsellOrder(item.key, n)}
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
                        Offered in order{item.orderNumbers.length > 1 ? "s" : ""}{" "}
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
                        onChange={(e) => props.updateUpsell(item.key, { cycleId: e.target.value })}
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
                              props.updateUpsell(item.key, {
                                customCycleDays: Number(e.target.value || 1),
                              })
                            }
                            className="w-20 px-3 py-1.5 text-sm text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <span className="text-sm text-gray-500">days</span>
                        </div>
                      </div>
                    )}

                    <div className="ml-auto text-right">
                      <p className="text-xs text-gray-400">Approx. occurrences</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {item.cycleId === "custom"
                          ? Math.max(1, Math.round((duration * 30) / (item.customCycleDays || 1)))
                          : Math.max(1, Math.round((duration * 30) / (cycleOption?.days ?? 90)))}
                        {" "}over plan
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="px-4 py-3 bg-gray-50/30">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Price</p>
                    {catalogueItem && (
                      <span className="text-xs text-gray-400">
                        Catalogue: <span className="font-semibold text-gray-600">£{cataloguePrice.toFixed(2)}</span>
                      </span>
                    )}
                  </div>

                  {/* Pricing type toggle */}
                  <div className="flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => props.updateUpsell(item.key, { pricingType: "catalogue" })}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                        item.pricingType === "catalogue"
                          ? "bg-blue-700 text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      Use catalogue price
                    </button>
                    <button
                      type="button"
                      onClick={() => props.updateUpsell(item.key, { pricingType: "custom" })}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                        item.pricingType === "custom"
                          ? "bg-blue-700 text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      Custom price
                    </button>
                  </div>
                </div>

                {/* Custom price input */}
                {item.pricingType === "custom" && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">£</span>
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={item.customPrice}
                      onChange={(e) =>
                        props.updateUpsell(item.key, {
                          customPrice: parseFloat(e.target.value || 0),
                        })
                      }
                      className="w-28 px-3 py-1.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                    <span className="text-xs text-gray-400">per occurrence</span>
                  </div>
                )}

                {catalogueItem && item.pricingType === "catalogue" && (
                  <p className="mt-2 text-xs text-gray-400">
                    Patient will be charged{" "}
                    <span className="font-semibold text-emerald-600">£{cataloguePrice.toFixed(2)}</span>
                    {" "}per occurrence
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Add button */}
        <button
          type="button"
          onClick={props.addUpsell}
          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-blue-700 border border-dashed border-blue-300 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-colors"
        >
          <Plus size={15} />
          Add upsell
        </button>
      </div>
    </Card>
  );
}
