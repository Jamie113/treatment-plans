import { Cog, ExclamationCircle } from "flowbite-react-icons/outline";
import { TextInput, Select } from "flowbite-react";
import { Card } from "../components/UIComponents";
import { DURATION_OPTIONS } from "../constants/catalogues";

export function PlanBasicsSection(props) {
  return (
    <Card title="Plan details" icon={<Cog size={18} />}>
      <div className="space-y-4">
        {/* Plan name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-700 text-white text-xs font-bold flex-shrink-0">1</span>
            Plan name
          </label>
          <TextInput
            sizing="sm"
            placeholder="e.g. WL Starter Plan"
            value={props.planName}
            onChange={(e) => props.setPlanName(e.target.value)}
            color={props.validation.errors.planName ? "failure" : "gray"}
          />
          {props.validation.errors.planName && (
            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1.5">
              <ExclamationCircle size={13} />
              {props.validation.errors.planName}
            </p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-700 text-white text-xs font-bold flex-shrink-0">2</span>
            Duration
          </label>
          {props.durationId !== "custom" ? (
            <Select
              sizing="sm"
              value={props.durationId}
              onChange={(e) => props.setDurationId(e.target.value)}
            >
              <option value="">Choose duration</option>
              {DURATION_OPTIONS.map((d) => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </Select>
          ) : (
            <div className="flex items-center gap-2">
              <TextInput
                type="number"
                min={1}
                sizing="sm"
                className="w-20"
                value={props.customDurationMonths}
                onChange={(e) => props.setCustomDurationMonths(Number(e.target.value || 1))}
              />
              <span className="text-sm text-gray-500">months</span>
            </div>
          )}
        </div>

        {props.validation.errors.medications && (
          <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4 mt-2">
            <ExclamationCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 font-medium">{props.validation.errors.medications}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
