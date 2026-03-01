import { Clock, Package, Info } from "lucide-react";
import { Card, Toggle } from "../components/UIComponents";
import { fmtDate } from "../utils/helpers";

export function DispatchSection(props) {
  return (
    <Card
      title="Dispatch schedule"
      subtitle="Preview the order timeline derived from duration and cycle."
      icon={<Clock size={18} />}
    >
      <div className="flex items-center justify-between gap-6 mb-6 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Approx orders:</span>
          <span className="text-2xl font-bold text-gray-900">{props.ordersCount}</span>
        </div>
        <Toggle
          label="Allow patient rescheduling"
          checked={props.allowPatientRescheduling}
          onChange={props.setAllowPatientRescheduling}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {props.orderPreview.map((o) => (
          <div
            key={o.index}
            className="rounded-xl border border-gray-200 bg-white p-3.5 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1.5">
              <Package size={12} />
              Order {o.index}
            </div>
            <div className="text-sm font-semibold text-gray-900">{fmtDate(o.date)}</div>
          </div>
        ))}
      </div>

      {props.ordersCount > 12 && (
        <div className="flex items-center gap-2 mt-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-700 font-medium">
          <Info size={14} className="text-blue-400 flex-shrink-0" />
          <span>Showing first 12 orders only (PoC).</span>
        </div>
      )}
    </Card>
  );
}
