import { ClipboardList, DropletBottleAlt, Dollar, CalendarPlus } from "flowbite-react-icons/outline";
import { Card, SummaryBlock } from "../components/UIComponents";
import { ADDON_CATALOGUE, BILLING_OPTIONS, PRESCRIPTION_FREQ, INCLUSION_CATALOGUE, INCLUSION_CYCLE_OPTIONS } from "../constants/catalogues";

function formatPrice(price) {
  return `£${price.toFixed(2)}`;
}

export function SummaryPanel(props) {
  return (
    <div className="sticky top-20 space-y-4">
      <Card
        title="Summary"
        subtitle="Live configuration preview."
        icon={<ClipboardList size={18} />}
      >
        <div className="space-y-6">
          {/* Lifecycle stats */}
          <SummaryBlock title="Lifecycle">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-3.5 text-center">
                <div className="text-2xl font-black text-gray-900">{props.duration}</div>
                <div className="text-xs font-semibold text-blue-600 mt-1 uppercase tracking-wide">months</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-green-100 border border-green-200 p-3.5 text-center">
                <div className="text-2xl font-black text-gray-900">{props.cycleDays}</div>
                <div className="text-xs font-semibold text-green-600 mt-1 uppercase tracking-wide">days</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 p-3.5 text-center">
                <div className="text-2xl font-black text-gray-900">{props.ordersCount}</div>
                <div className="text-xs font-semibold text-purple-600 mt-1 uppercase tracking-wide">orders</div>
              </div>
            </div>
          </SummaryBlock>

          {/* Medications */}
          <div className="border-t border-gray-100 pt-5">
            <SummaryBlock title="Medications">
              <div className="space-y-2">
                {props.selectedMedicationDetails
                  .filter((x) => x.medicationId)
                  .map((x) => (
                    <div key={x.key} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <div className="font-semibold text-sm text-gray-900 flex items-center gap-2 mb-2">
                        <DropletBottleAlt size={13} className="text-blue-500 flex-shrink-0" />
                        {x.med?.name}
                      </div>
                      <div className="text-xs font-mono text-gray-600 bg-white rounded-lg px-2.5 py-1.5 border border-gray-100 mb-1.5 leading-relaxed">
                        {x.variants.length
                          ? x.variants.join(" → ")
                          : <span className="italic text-gray-400">No variants selected</span>}
                      </div>
                      <div className="text-xs text-gray-400 font-medium">
                        Rx: {PRESCRIPTION_FREQ.find((p) => p.id === x.prescription.renewalFrequency)?.label ?? "—"}
                      </div>
                    </div>
                  ))}
                {props.selectedMedicationDetails.every((x) => !x.medicationId) && (
                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-400">
                    No medications yet
                  </div>
                )}
              </div>
            </SummaryBlock>
          </div>

          {/* Upsells */}
          <div className="border-t border-gray-100 pt-5">
            <SummaryBlock title="Upsells">
              {(props.upsells ?? []).filter((u) => u.itemId).length > 0 ? (
                <div className="space-y-1.5">
                  {(props.upsells ?? []).filter((u) => u.itemId).map((u) => {
                    const catalogueItem = ADDON_CATALOGUE.find((a) => a.id === u.itemId);
                    const price = u.pricingType === "custom" ? u.customPrice : (catalogueItem?.price ?? 0);
                    return (
                      <div key={u.key} className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">{catalogueItem?.name}</span>
                        <span className="text-xs font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">
                          £{price.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-400">
                  No upsells added
                </div>
              )}
            </SummaryBlock>
          </div>

          {/* Inclusions */}
          <div className="border-t border-gray-100 pt-5">
            <SummaryBlock title="Inclusions">
              {props.inclusions?.filter((i) => i.itemId).length > 0 ? (
                <div className="space-y-1.5">
                  {props.inclusions.filter((i) => i.itemId).map((i) => {
                    const item = INCLUSION_CATALOGUE.find((c) => c.id === i.itemId);
                    const cycleOpt = INCLUSION_CYCLE_OPTIONS.find((o) => o.id === i.cycleId);
                    return (
                      <div key={i.key} className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">{item?.name}</span>
                        <span className="text-xs font-semibold text-blue-700 uppercase bg-white px-2 py-0.5 rounded-full border border-blue-200 flex-shrink-0">
                          {i.scheduleType === "specific_orders"
                            ? `Order${i.orderNumbers.length > 1 ? "s" : ""} ${i.orderNumbers.join(", ")}`
                            : i.cycleId === "custom"
                              ? `Every ${i.customCycleDays}d`
                              : cycleOpt?.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-400">
                  No inclusions added
                </div>
              )}
            </SummaryBlock>
          </div>

          {/* Billing */}
          <div className="border-t border-gray-100 pt-5">
            <SummaryBlock title="Billing">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <div className="font-semibold text-sm text-gray-900 mb-2.5 flex items-center gap-2">
                  <Dollar size={15} className="text-orange-500" />
                  {BILLING_OPTIONS.find((b) => b.id === props.billingId)?.title ?? "Not selected"}
                </div>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${props.alignBillingWithDispatch ? "text-green-600" : "text-gray-300"}`}>
                      {props.alignBillingWithDispatch ? "✓" : "○"}
                    </span>
                    <span>Align with dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${props.chargeOnApproval ? "text-green-600" : "text-gray-300"}`}>
                      {props.chargeOnApproval ? "✓" : "○"}
                    </span>
                    <span>Charge on approval</span>
                  </div>
                </div>
              </div>
            </SummaryBlock>
          </div>
        </div>
      </Card>
    </div>
  );
}
