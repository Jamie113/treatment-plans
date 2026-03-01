import { ClipboardList, Check, AlertCircle, Settings, DollarSign } from "lucide-react";
import { Card } from "../components/UIComponents";
import { BILLING_OPTIONS } from "../constants/catalogues";

export function ReviewSection(props) {
  return (
    <Card
      title="Review"
      subtitle="Quick summary before creation."
      icon={<ClipboardList size={20} />}
    >
      <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
        <div className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Check size={18} className="text-green-600" />
          Plan includes:
        </div>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-slate-700">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-slate-900 text-white text-xs rounded-full font-bold">{props.medications.filter((m) => m.medicationId).length}</span>
            medication(s)
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-700">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-slate-900 text-white text-xs rounded-full font-bold">{props.medications.reduce((acc, m) => acc + (m.variants?.length ?? 0), 0)}</span>
            total variant selections
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-700">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-slate-900 text-white text-xs rounded-full font-bold">{Object.entries(props.addons).filter(([, v]) => v.selected).length}</span>
            add-on(s)
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-700">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-slate-900 text-white text-xs rounded-full font-bold">{props.ordersCount}</span>
            orders (approx)
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-700">
            <DollarSign size={16} className="text-slate-400" />
            Billing: <span className="font-medium">{BILLING_OPTIONS.find((b) => b.id === props.billingId)?.title ?? "—"}</span>
          </li>
        </ul>
      </div>

      <details className="rounded-xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition-all cursor-pointer group mt-6">
        <summary className="font-bold text-slate-900 p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors">
          <Settings size={18} className="text-accent-blue-500" />
          View Configuration
          <span className="ml-auto text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="border-t border-slate-200 p-4">
          <pre className="overflow-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100 font-mono max-h-96 text-left">
            {JSON.stringify(props.planConfigPreview, null, 2)}
          </pre>
        </div>
      </details>

      {!props.validation.canCreate && (
        <div className="card border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-sm hover:shadow-md transition-all mt-6">
          <div className="card-body gap-3">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="flex-shrink-0 text-amber-700 font-bold mt-0.5 animate-pulse" />
              <div>
                <p className="text-sm font-black text-amber-900">Complete the form</p>
                <p className="text-xs text-amber-800 mt-1 font-semibold">Add plan name, medications, and variants to create</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
