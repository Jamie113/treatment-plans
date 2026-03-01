import { Settings } from "lucide-react";

export function Card({ title, subtitle, icon, right, children }) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3 flex-1">
            {icon && <div className="text-gray-700 flex-shrink-0">{icon}</div>}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            </div>
          </div>
          {right && <div className="flex-shrink-0">{right}</div>}
        </div>
        {subtitle && <p className="text-sm text-gray-500 font-medium mb-4">{subtitle}</p>}
        <div className="border-t border-gray-200 my-4"></div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, error, children }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-gray-900 mb-2">{label}</label>
      <div>{children}</div>
      {error && (
        <p className="text-xs text-red-600 font-semibold mt-1.5">{error}</p>
      )}
    </div>
  );
}

export function RadioPill({ checked, label, onClick }) {
  return (
    <label 
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-all ${
        checked 
          ? 'bg-gray-900 text-white border border-gray-900' 
          : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
      }`}
      onClick={onClick}
    >
      <input 
        type="radio" 
        name="option" 
        checked={checked} 
        onChange={() => {}} 
        className="w-4 h-4 cursor-pointer"
      />
      <span>{label}</span>
    </label>
  );
}

export function Toggle({ label, checked, onChange, disabled }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-semibold text-gray-900">{label}</label>
      <button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
          checked ? 'bg-gray-900' : 'bg-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export function SummaryBlock({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-sm uppercase mb-3 text-gray-500">{title}</h3>
      {children}
    </div>
  );
}
