import { Clock, Package, Info } from "lucide-react";
import { Card, Toggle } from "../components/UIComponents";
import { fmtDate } from "../utils/helpers";

export function DispatchSection(props) {
  return (
    <Card
      title="Dispatch schedule"
      subtitle="Preview the order timeline derived from duration and cycle."
      icon={<Clock size={20} />}
    >
      <div className="flex items-start justify-between gap-6 mb-6 pb-6 border-b border-slate-200">
        <div className="text-sm text-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-slate-500">Orders (approx):</span>
            <span className="font-bold text-lg text-slate-900">{props.ordersCount}</span>
          </div>
        </div>
        <Toggle
          label="Allow patient rescheduling"
          checked={props.allowPatientRescheduling}
          onChange={props.setAllowPatientRescheduling}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {props.orderPreview.map((o) => (
          <div key={o.index} className="rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 transition-all hover:border-slate-300 hover:shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
              <Package size={14} />
              Order {o.index}
            </div>
            <div className="text-base font-bold text-slate-900">{fmtDate(o.date)}</div>
          </div>
        ))}
      </div>
      {props.ordersCount > 12 && (
        <div className="alert alert-info mt-4">
          <Info size={16} />
          <span className="text-xs">Showing first 12 orders (PoC).</span>
        </div>
      )}
    </Card>
  );
}
