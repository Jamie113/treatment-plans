import { Package } from "lucide-react";
import { Card } from "../components/UIComponents";
import { ADDON_CATALOGUE } from "../constants/catalogues";

export function AddOnsSection(props) {
  return (
    <Card
      title="Add-on items"
      subtitle="Include extras automatically or offer as optional items."
      icon={<Package size={20} />}
    >
      <div className="space-y-4">
        {ADDON_CATALOGUE.map((a) => {
          const selected = props.addons[a.id]?.selected ?? false;
          const inclusion = props.addons[a.id]?.inclusion ?? "optional";
          return (
            <div key={a.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-sm">
              <label className="flex items-center gap-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={(e) => props.toggleAddon(a.id, e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <div className="text-sm font-medium text-slate-900">{a.name}</div>
              </label>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Inclusion</span>
                <select
                  className="select select-bordered select-sm"
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
