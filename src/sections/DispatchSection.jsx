import { Clock, Inbox, ArrowLeft, ArrowRight } from "flowbite-react-icons/outline";
import { Select, TextInput } from "flowbite-react";
import { Card, Toggle } from "../components/UIComponents";
import { CYCLE_OPTIONS } from "../constants/catalogues";

export function DispatchSection(props) {
  const orderNumbers = Array.from({ length: props.ordersCount }, (_, i) => i + 1);

  return (
    <Card
      title="Dispatch schedule"
      subtitle="Set how often orders are sent and how many will be generated."
      icon={<Clock size={18} />}
    >
      {/* Dispatch frequency */}
      <div className="mb-5 pb-5 border-b border-gray-100">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
          Dispatch frequency
        </label>
        <div className="flex items-center gap-3">
          {props.cycleId !== "custom" ? (
            <Select
              sizing="sm"
              value={props.cycleId}
              onChange={(e) => props.setCycleId(e.target.value)}
            >
              <option value="">Choose frequency</option>
              {CYCLE_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </Select>
          ) : (
            <div className="flex items-center gap-2">
              <TextInput
                type="number"
                min={7}
                sizing="sm"
                className="w-20"
                value={props.customCycleDays}
                onChange={(e) => props.setCustomCycleDays(Number(e.target.value || 7))}
              />
              <span className="text-sm text-gray-500">days</span>
            </div>
          )}
        </div>
      </div>

      {/* Order count + rescheduling toggle */}
      <div className="flex items-center justify-between gap-6 mb-5 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Total orders:</span>
          <span className="text-2xl font-bold text-gray-900">{props.ordersCount}</span>
        </div>
        <Toggle
          label="Allow patient rescheduling"
          checked={props.allowPatientRescheduling}
          onChange={props.setAllowPatientRescheduling}
        />
      </div>

      {/* Rescheduling window — shown when toggle is on */}
      {props.allowPatientRescheduling && (
        <div className="mb-5 pb-5 border-b border-gray-100">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">
            Rescheduling window
          </label>
          <div className="flex items-center gap-3">
            {/* Earlier */}
            <div className="flex items-center gap-2 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3">
              <ArrowLeft size={14} className="text-amber-500 flex-shrink-0" />
              <input
                type="number"
                min={0}
                value={props.rescheduleDaysEarlier}
                onChange={(e) => props.setRescheduleDaysEarlier(Number(e.target.value || 0))}
                className="w-14 text-center text-sm font-semibold text-gray-900 bg-transparent border-none outline-none focus:ring-0"
              />
              <span className="text-sm text-gray-500">days earlier</span>
            </div>

            <span className="text-gray-300 text-sm font-light">or</span>

            {/* Later */}
            <div className="flex items-center gap-2 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3">
              <ArrowRight size={14} className="text-blue-500 flex-shrink-0" />
              <input
                type="number"
                min={0}
                value={props.rescheduleDaysLater}
                onChange={(e) => props.setRescheduleDaysLater(Number(e.target.value || 0))}
                className="w-14 text-center text-sm font-semibold text-gray-900 bg-transparent border-none outline-none focus:ring-0"
              />
              <span className="text-sm text-gray-500">days later</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2.5">
            Patients can move an order up to{" "}
            <span className="font-medium text-gray-600">{props.rescheduleDaysEarlier} day{props.rescheduleDaysEarlier !== 1 ? "s" : ""} earlier</span>
            {" "}or{" "}
            <span className="font-medium text-gray-600">{props.rescheduleDaysLater} day{props.rescheduleDaysLater !== 1 ? "s" : ""} later</span>.
          </p>
        </div>
      )}

      {/* Order pills — count only, no dates */}
      <div className="flex flex-wrap gap-1.5">
        {orderNumbers.map((n) => (
          <div
            key={n}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-500"
          >
            <Inbox size={11} className="text-gray-400" />
            {n}
          </div>
        ))}
      </div>
    </Card>
  );
}
