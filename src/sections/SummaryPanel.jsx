import { ClipboardList, Pill, DollarSign } from "lucide-react";
import { Card, SummaryBlock } from "../components/UIComponents";
import { ADDON_CATALOGUE, BILLING_OPTIONS, PRESCRIPTION_FREQ } from "../constants/catalogues";

export function SummaryPanel(props) {
  return (
    <div className="sticky top-24 space-y-8">
      <Card
        title="Summary"
        subtitle="Live configuration preview."
        icon={<ClipboardList size={24} />}
      >
        <div className="space-y-6">
          <SummaryBlock title="Lifecycle">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-gradient-blue border border-accent-blue-200 p-4 text-center hover:shadow-md transition-all">
                <div className="text-3xl font-black">3</div>
                <div className="text-xs font-bold text-accent-blue-600 mt-2 uppercase">months</div>
              </div>
              <div className="rounded-xl bg-gradient-green border border-accent-green-100 p-4 text-center hover:shadow-md transition-all">
                <div className="text-3xl font-black">{props.cycleDays}</div>
                <div className="text-xs font-bold text-accent-green-600 mt-2 uppercase">days</div>
              </div>
              <div className="rounded-xl bg-gradient-purple border border-accent-purple-100 p-4 text-center hover:shadow-md transition-all">
                <div className="text-3xl font-black">{props.ordersCount}</div>
                <div className="text-xs font-bold text-accent-purple-600 mt-2 uppercase">orders</div>
              </div>
            </div>
          </SummaryBlock>

          <div className="border-t-2 border-gray-200 pt-6">
            <SummaryBlock title="Medications">
              {props.selectedMedicationDetails
                .filter((x) => x.medicationId)
                .map((x) => (
                  <div key={x.key} className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 hover:shadow-lg transition-all hover:-translate-y-0.5">
                    <div className="font-bold text-gray-900 flex items-center gap-2 mb-3">
                      <Pill size={16} className="text-accent-blue-500" />
                      {x.med?.name}
                    </div>
                    <div className="text-sm font-mono text-gray-700 bg-white rounded-lg p-2.5 border border-slate-100 mb-2">
                      {x.variants.length
                        ? x.variants.join(" → ")
                        : <span className="italic text-gray-400">—</span>}
                    </div>
                    <div className="text-xs font-bold text-gray-600 uppercase">
                      Rx: {PRESCRIPTION_FREQ.find((p) => p.id === x.prescription.renewalFrequency)?.label ?? "—"}
                    </div>
                  </div>
                ))}
              {props.selectedMedicationDetails.every((x) => !x.medicationId) && (
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center text-gray-500 italic text-sm">
                  No medications yet
                </div>
              )}
            </SummaryBlock>
          </div>

          <div className="border-t-2 border-gray-200 pt-6">
            <SummaryBlock title="Add-ons">
              {Object.entries(props.addons).filter(([, v]) => v.selected).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(props.addons)
                    .filter(([, v]) => v.selected)
                    .map(([id, v]) => (
                      <div key={id} className="flex items-center justify-between bg-gradient-green border border-accent-green-200 rounded-lg p-3 hover:shadow-md transition-all">
                        <span className="text-sm font-bold text-gray-900">
                          {ADDON_CATALOGUE.find((a) => a.id === id)?.name}
                        </span>
                        <span className="text-xs font-black text-accent-green-700 uppercase bg-white px-3 py-1 rounded-full border border-accent-green-200">
                          {v.inclusion}
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center text-gray-500 italic text-sm">
                  No add-ons selected
                </div>
              )}
            </SummaryBlock>
          </div>

          <div className="border-t-2 border-gray-200 pt-6">
            <SummaryBlock title="Billing">
              <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 hover:shadow-md transition-all">
                <div className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign size={18} className="text-accent-orange-500" />
                  {BILLING_OPTIONS.find((b) => b.id === props.billingId)?.title ?? "—"}
                </div>
                <div className="space-y-2 text-xs font-bold text-gray-600 bg-white rounded-lg p-3 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={props.alignBillingWithDispatch ? "text-accent-green-600" : "text-gray-400"}>
                      {props.alignBillingWithDispatch ? "✓" : "○"}
                    </span>
                    <span>Align with dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={props.chargeOnApproval ? "text-accent-green-600" : "text-gray-400"}>
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
