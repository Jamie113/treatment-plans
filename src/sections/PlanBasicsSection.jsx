import { Settings, Calendar, AlertCircle } from "lucide-react";
import { Card, Field, RadioPill } from "../components/UIComponents";
import { DURATION_OPTIONS, CYCLE_OPTIONS } from "../constants/catalogues";

export function PlanBasicsSection(props) {
  return (
    <Card
      title="Plan basics"
      subtitle="Defines lifecycle and order cadence."
      icon={<Settings size={20} />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Plan name" error={props.validation.errors.planName}>
          <input
            className="input input-bordered w-full"
            placeholder="e.g. WL Starter Plan"
            value={props.planName}
            onChange={(e) => props.setPlanName(e.target.value)}
          />
        </Field>

        <Field label="Start behaviour">
          <div className="flex gap-2">
            <RadioPill
              checked={props.startBehaviour === "immediately"}
              onClick={() => props.setStartBehaviour("immediately")}
              label="Start immediately"
            />
            <RadioPill
              checked={props.startBehaviour === "next_billing_date"}
              onClick={() => props.setStartBehaviour("next_billing_date")}
              label="Start on next billing date"
            />
          </div>
        </Field>

        <Field label="Plan duration">
          <div className="flex flex-wrap gap-3">
            {DURATION_OPTIONS.map((d) => (
              <RadioPill
                key={d.id}
                checked={props.durationId === d.id}
                onClick={() => props.setDurationId(d.id)}
                label={d.label}
              />
            ))}
          </div>
          {props.durationId === "custom" && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-blue-50 p-3 border border-blue-200">
              <input
                type="number"
                min={1}
                className="input input-bordered w-24"
                value={props.customDurationMonths}
                onChange={(e) => props.setCustomDurationMonths(Number(e.target.value || 1))}
              />
              <span className="text-sm font-medium text-slate-700">months</span>
            </div>
          )}
        </Field>

        <Field label="Dispatch cycle">
          <div className="flex flex-wrap gap-3">
            {CYCLE_OPTIONS.map((c) => (
              <RadioPill
                key={c.id}
                checked={props.cycleId === c.id}
                onClick={() => props.setCycleId(c.id)}
                label={c.label}
              />
            ))}
          </div>
          {props.cycleId === "custom" && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-blue-50 p-3 border border-blue-200">
              <input
                type="number"
                min={7}
                className="input input-bordered w-24"
                value={props.customCycleDays}
                onChange={(e) => props.setCustomCycleDays(Number(e.target.value || 7))}
              />
              <span className="text-sm font-medium text-slate-700">days</span>
            </div>
          )}
        </Field>

        <Field label="Start date">
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-slate-400" size={16} />
            <input
              type="date"
              className="input input-bordered w-full pl-9"
              value={props.startDate}
              onChange={(e) => props.setStartDate(e.target.value)}
            />
          </div>
        </Field>
      </div>
      {props.validation.errors.medications && (
        <div className="alert alert-warning mt-4">
          <AlertCircle size={16} />
          <p className="text-sm">{props.validation.errors.medications}</p>
        </div>
      )}
    </Card>
  );
}
