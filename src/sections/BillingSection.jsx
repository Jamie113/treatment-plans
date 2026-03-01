import { DollarSign, Check } from "lucide-react";
import { Card, Toggle } from "../components/UIComponents";
import { BILLING_OPTIONS } from "../constants/catalogues";
import { classNames } from "../utils/helpers";

export function BillingSection(props) {
  return (
    <Card
      title="Billing plan"
      subtitle="Choose how the plan is charged across the lifecycle."
      icon={<DollarSign size={20} />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {BILLING_OPTIONS.map((b) => (
          <button
            key={b.id}
            onClick={() => props.setBillingId(b.id)}
            className={classNames(
              "text-left rounded-xl border p-4 transition-all",
              props.billingId === b.id
                ? "border-slate-900 bg-slate-50 shadow-md"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-900">{b.title}</div>
                <div className="mt-1 text-sm text-slate-600">{b.subtitle}</div>
              </div>
              {props.billingId === b.id && (
                <div className="flex-shrink-0 mt-1">
                  <Check size={20} className="text-slate-900" />
                </div>
              )}
            </div>
            <div className="mt-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Example: {b.id === "monthly" ? "£149/mo" : b.id === "upfront" ? "£399 upfront" : "—"}
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Toggle
          label="Align billing with dispatch cycle"
          checked={props.alignBillingWithDispatch}
          onChange={props.setAlignBillingWithDispatch}
        />
        <Toggle
          label="Charge on approval"
          checked={props.chargeOnApproval}
          onChange={props.setChargeOnApproval}
        />
      </div>
    </Card>
  );
}
