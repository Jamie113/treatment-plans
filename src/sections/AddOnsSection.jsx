import { Package } from "lucide-react";
import { Card } from "../components/UIComponents";
import { ADDON_CATALOGUE } from "../constants/catalogues";

export function AddOnsSection(props) {
  return (
    <Card
      title="Add-on items"
      subtitle="Include extras automatically or offer as optional items."
      icon={<Package size={18} />}
    >
      <div className="space-y-3">
        {ADDON_CATALOGUE.map((a) => {
          const selected = props.addons[a.id]?.selected ?? false;
          const inclusion = props.addons[a.id]?.inclusion ?? "optional";
          return (
            <div
              key={a.id}
              className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                selected
                  ? "border-gray-300 bg-white shadow-sm"
                  : "border-gray-200 bg-gray-50/50 hover:border-gray-300"
              }`}
            >
              <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={(e) => props.toggleAddon(a.id, e.target.checked)}
                    className="sr-only peer"
                    id={`addon-${a.id}`}
                  />
                  <div
                    onClick={() => props.toggleAddon(a.id, !selected)}
                    className={`w-4.5 h-4.5 w-[18px] h-[18px] rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                      selected
                        ? "bg-gray-900 border-gray-900"
                        : "bg-white border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {selected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span
                  className={`text-sm font-medium truncate ${selected ? "text-gray-900" : "text-gray-600"}`}
                  onClick={() => props.toggleAddon(a.id, !selected)}
                >
                  {a.name}
                </span>
              </label>

              <div className="flex items-center gap-2.5 flex-shrink-0 ml-4">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Inclusion</span>
                <select
                  className={`px-2.5 py-1.5 text-xs font-medium bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-colors cursor-pointer ${
                    selected ? "border-gray-200 text-gray-700" : "border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  value={inclusion}
                  onChange={(e) => props.setAddonInclusion(a.id, e.target.value)}
                  disabled={!selected}
                >
                  <option value="required">Required</option>
                  <option value="optional">Optional</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
