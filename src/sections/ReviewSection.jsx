import { ClipboardList, Check, ExclamationCircle, Cog, Dollar } from "flowbite-react-icons/outline";
import { Card } from "../components/UIComponents";
import { BILLING_OPTIONS } from "../constants/catalogues";

export function ReviewSection(props) {
  return (
    <Card
      title="Review"
      subtitle="Quick summary before creation."
      icon={<ClipboardList size={18} />}
    >
      {/* Summary list */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 mb-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
          <Check size={16} className="text-green-600" />
          Plan includes:
        </div>
        <ul className="space-y-2.5">
          <li className="flex items-center gap-3 text-sm text-gray-700">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-700 text-white text-xs rounded-full font-bold flex-shrink-0">
              {props.medications.filter((m) => m.medicationId).length}
            </span>
            medication(s)
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-700">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-700 text-white text-xs rounded-full font-bold flex-shrink-0">
              {props.medications.reduce((acc, m) => acc + (m.variants?.length ?? 0), 0)}
            </span>
            total variant selections
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-700">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-700 text-white text-xs rounded-full font-bold flex-shrink-0">
              {Object.entries(props.addons).filter(([, v]) => v.selected).length}
            </span>
            add-on(s)
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-700">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-700 text-white text-xs rounded-full font-bold flex-shrink-0">
              {props.ordersCount}
            </span>
            orders (approx)
          </li>
          <li className="flex items-center gap-3 text-sm text-gray-700">
            <Dollar size={15} className="text-gray-400 flex-shrink-0" />
            Billing: <span className="font-medium">{BILLING_OPTIONS.find((b) => b.id === props.billingId)?.title ?? "Not selected"}</span>
          </li>
        </ul>
      </div>

      {/* JSON config preview */}
      <details className="rounded-xl border border-gray-200 bg-white overflow-hidden group cursor-pointer">
        <summary className="flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors list-none">
          <Cog size={16} className="text-blue-500 flex-shrink-0" />
          View Configuration
          <span className="ml-auto text-gray-400 text-xs group-open:rotate-180 transition-transform inline-block">▼</span>
        </summary>
        <div className="border-t border-gray-100">
          <pre className="overflow-auto bg-gray-950 p-4 text-xs text-slate-300 font-mono max-h-80 text-left leading-relaxed">
            {JSON.stringify(props.planConfigPreview, null, 2)}
          </pre>
        </div>
      </details>

      {/* Validation warning */}
      {!props.validation.canCreate && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 mt-5">
          <ExclamationCircle size={18} className="flex-shrink-0 text-amber-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Complete the form to continue</p>
            <p className="text-xs text-amber-700 mt-0.5">Add a plan name, medications, and dose variants to create.</p>
          </div>
        </div>
      )}
    </Card>
  );
}
