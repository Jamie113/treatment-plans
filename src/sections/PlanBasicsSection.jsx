import { Settings, Calendar, AlertCircle, Clock, Zap } from "lucide-react";
import { Card, Field } from "../components/UIComponents";
import { DURATION_OPTIONS, CYCLE_OPTIONS } from "../constants/catalogues";

export function PlanBasicsSection(props) {
  return (
    <Card
      title="Plan details"
      icon={<Settings size={20} />}
    >
      <div className="space-y-6">
        {/* Step 1: Plan Name */}
        <div className="rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold">1</div>
            <label className="text-sm font-semibold text-gray-900">Plan name</label>
          </div>
          <input
            className={`w-full px-4 py-2 text-sm border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-gray-900/20 ${props.validation.errors.planName
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-gray-900/20'
              }`}
            placeholder="e.g. WL Starter Plan"
            value={props.planName}
            onChange={(e) => props.setPlanName(e.target.value)}
          />
          {props.validation.errors.planName && (
            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
              <AlertCircle size={14} />
              {props.validation.errors.planName}
            </p>
          )}
        </div>

        {/* Step 2: Duration & Cycle */}
        <div className="rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold">3</div>
                <label className="text-sm font-semibold text-gray-900">How long?</label>
              </div>
              {props.durationId !== "custom" ? (
                <select
                  value={props.durationId}
                  onChange={(e) => props.setDurationId(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                >
                  <option value="">Choose duration</option>
                  {DURATION_OPTIONS.map((d) => (
                    <option key={d.id} value={d.id}>{d.label}</option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center gap-2 bg-white rounded-xl p-4 border border-gray-200">
                  <input
                    type="number"
                    min={1}
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    value={props.customDurationMonths}
                    onChange={(e) => props.setCustomDurationMonths(Number(e.target.value || 1))}
                  />
                  <span className="text-sm font-medium text-gray-600">months</span>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold">4</div>
                <label className="text-sm font-semibold text-gray-900">Dispatch frequency</label>
              </div>
              {props.cycleId !== "custom" ? (
                <select
                  value={props.cycleId}
                  onChange={(e) => props.setCycleId(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                >
                  <option value="">Choose cycle</option>
                  {CYCLE_OPTIONS.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center gap-2 bg-white rounded-xl p-4 border border-gray-200">
                  <input
                    type="number"
                    min={7}
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    value={props.customCycleDays}
                    onChange={(e) => props.setCustomCycleDays(Number(e.target.value || 7))}
                  />
                  <span className="text-sm font-medium text-gray-600">days</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 5: Start Date */}
        <div className="rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold">5</div>
            <label className="text-sm font-semibold text-gray-900">Start date</label>
          </div>
          <div className="relative">
            <Calendar className="absolute left-4 top-3.5 text-gray-400 pointer-events-none" size={16} />
            <input
              type="date"
              className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20"
              value={props.startDate}
              onChange={(e) => props.setStartDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {
        props.validation.errors.medications && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4 flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 font-medium">{props.validation.errors.medications}</p>
            </div>
          </div>
        )
      }
    </Card >
  );
}
