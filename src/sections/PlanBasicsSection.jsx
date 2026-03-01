import { Cog, CalendarMonth, ExclamationCircle } from "flowbite-react-icons/outline";
import { Card } from "../components/UIComponents";
import { DURATION_OPTIONS, CYCLE_OPTIONS } from "../constants/catalogues";

const INPUT_CLS =
  "w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition-colors";

const SELECT_CLS =
  "w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition-colors cursor-pointer";

export function PlanBasicsSection(props) {
  return (
    <Card title="Plan details" icon={<Cog size={18} />}>
      <div className="space-y-5">
        {/* Plan name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-700 text-white text-xs font-bold flex-shrink-0">1</span>
            Plan name
          </label>
          <input
            className={`${INPUT_CLS} ${
              props.validation.errors.planName
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : ""
            }`}
            placeholder="e.g. WL Starter Plan"
            value={props.planName}
            onChange={(e) => props.setPlanName(e.target.value)}
          />
          {props.validation.errors.planName && (
            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1.5">
              <ExclamationCircle size={13} />
              {props.validation.errors.planName}
            </p>
          )}
        </div>

        {/* Duration & Cycle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-700 text-white text-xs font-bold flex-shrink-0">2</span>
              Duration
            </label>
            {props.durationId !== "custom" ? (
              <select
                value={props.durationId}
                onChange={(e) => props.setDurationId(e.target.value)}
                className={SELECT_CLS}
              >
                <option value="">Choose duration</option>
                {DURATION_OPTIONS.map((d) => (
                  <option key={d.id} value={d.id}>{d.label}</option>
                ))}
              </select>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  className="w-20 px-3 py-2 text-sm text-center text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-colors"
                  value={props.customDurationMonths}
                  onChange={(e) => props.setCustomDurationMonths(Number(e.target.value || 1))}
                />
                <span className="text-sm text-gray-500">months</span>
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-700 text-white text-xs font-bold flex-shrink-0">3</span>
              Dispatch frequency
            </label>
            {props.cycleId !== "custom" ? (
              <select
                value={props.cycleId}
                onChange={(e) => props.setCycleId(e.target.value)}
                className={SELECT_CLS}
              >
                <option value="">Choose cycle</option>
                {CYCLE_OPTIONS.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={7}
                  className="w-20 px-3 py-2 text-sm text-center text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-colors"
                  value={props.customCycleDays}
                  onChange={(e) => props.setCustomCycleDays(Number(e.target.value || 7))}
                />
                <span className="text-sm text-gray-500">days</span>
              </div>
            )}
          </div>
        </div>

        {/* Start date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-700 text-white text-xs font-bold flex-shrink-0">4</span>
            Start date
          </label>
          <div className="relative">
            <CalendarMonth className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={15} />
            <input
              type="date"
              className={`${INPUT_CLS} pl-9`}
              value={props.startDate}
              onChange={(e) => props.setStartDate(e.target.value)}
            />
          </div>
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
