import { Dollar, Check } from "flowbite-react-icons/outline";
import { Card, Toggle } from "../components/UIComponents";
import { BILLING_OPTIONS } from "../constants/catalogues";
import { classNames } from "../utils/helpers";

export function BillingSection(props) {
  return (
    <Card
      title="Billing plan"
      subtitle="Choose how the plan is charged across the lifecycle."
      icon={<Dollar size={18} />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {BILLING_OPTIONS.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => props.setBillingId(b.id)}
            className={classNames(
              "text-left rounded-xl border p-4 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300",
              props.billingId === b.id
                ? "border-blue-700 bg-blue-700 shadow-sm"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className={`text-sm font-semibold ${props.billingId === b.id ? "text-white" : "text-gray-900"}`}>
                  {b.title}
                </div>
                <div className={`mt-0.5 text-sm ${props.billingId === b.id ? "text-gray-300" : "text-gray-500"}`}>
                  {b.subtitle}
                </div>
              </div>
              {props.billingId === b.id && (
                <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </div>
            <div className={`mt-3 text-xs font-semibold uppercase tracking-wide ${
              props.billingId === b.id ? "text-gray-400" : "text-gray-400"
            }`}>
              {b.id === "monthly" ? "e.g. £149/mo" : b.id === "upfront" ? "e.g. £399 upfront" : "Custom"}
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
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
