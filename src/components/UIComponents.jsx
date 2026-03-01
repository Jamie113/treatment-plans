export function Card({ title, subtitle, icon, right, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 flex items-start justify-between gap-4 border-b border-gray-100">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {icon && (
            <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-gray-50 rounded-xl text-gray-500 mt-0.5">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0 pt-0.5">
            <h2 className="text-base font-semibold text-gray-900 leading-snug">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {right && <div className="flex-shrink-0 mt-0.5">{right}</div>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

export function Field({ label, error, children }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div>{children}</div>
      {error && (
        <p className="text-xs text-red-600 mt-1.5">{error}</p>
      )}
    </div>
  );
}

export function RadioPill({ checked, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border transition-all ${
        checked
          ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
      }`}
    >
      {checked && (
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
      <span>{label}</span>
    </button>
  );
}

export function Toggle({ label, checked, onChange, disabled }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-gray-700 leading-snug">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative flex-shrink-0 inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 ${
          checked ? 'bg-blue-700' : 'bg-gray-200'
        } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export function SummaryBlock({ title, children }) {
  return (
    <div className="mb-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{title}</h3>
      {children}
    </div>
  );
}
