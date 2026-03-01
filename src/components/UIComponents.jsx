import { Settings } from "lucide-react";

export function Card({ title, subtitle, icon, right, children }) {
  return (
    <div className="card bg-base-100 shadow-lg border border-base-300">
      <div className="card-body">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {icon && <div className="text-primary flex-shrink-0 mt-1">{icon}</div>}
            <div className="flex-1 min-w-0">
              <h2 className="card-title text-lg">{title}</h2>
            </div>
          </div>
          {right && <div className="flex-shrink-0">{right}</div>}
        </div>
        {subtitle && <p className="text-sm text-base-content/70 font-medium">{subtitle}</p>}
        <div className="divider my-0"></div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, error, children }) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-bold">{label}</span>
      </label>
      <div>{children}</div>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error font-semibold">{error}</span>
        </label>
      )}
    </div>
  );
}

export function RadioPill({ checked, label, onClick }) {
  return (
    <label className="btn btn-sm cursor-pointer" onClick={onClick}>
      <input type="radio" name="option" checked={checked} onChange={() => { }} className="radio" />
      <span>{label}</span>
    </label>
  );
}

export function Toggle({ label, checked, onChange, disabled }) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text font-semibold">{label}</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
      </label>
    </div>
  );
}

export function SummaryBlock({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-sm uppercase mb-3 text-base-content/60">{title}</h3>
      {children}
    </div>
  );
}
