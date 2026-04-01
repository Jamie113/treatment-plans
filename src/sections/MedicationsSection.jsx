import { DropletBottleAlt, Plus, TrashBin, Fire } from "flowbite-react-icons/outline";
import { Select } from "flowbite-react";
import { Card } from "../components/UIComponents";
import { MEDICATION_CATALOGUE } from "../constants/catalogues";
import { newMedicationItem } from "../utils/helpers";

export function MedicationsSection(props) {
  return (
    <Card
      title="Medications"
      subtitle="Add one or more medications, select variants, and optionally enable titration."
      icon={<DropletBottleAlt size={18} />}
    >
      <div className="space-y-4">
        {props.medications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
            <DropletBottleAlt size={28} className="text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-500">No medications added</p>
            <p className="text-xs text-gray-400 mt-0.5">Add the primary medication for this plan</p>
          </div>
        )}

        {props.selectedMedicationDetails.map((item) => (
          <MedicationItem
            key={item.key}
            item={item}
            medications={props.medications}
            removeMedication={props.removeMedication}
            updateMedication={props.updateMedication}
            addVariant={props.addVariant}
            removeVariant={props.removeVariant}
            updateVariant={props.updateVariant}
          />
        ))}

        <button
          type="button"
          onClick={() => props.setMedications((p) => [...p, newMedicationItem()])}
          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-blue-700 border border-dashed border-blue-300 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-colors"
        >
          <Plus size={15} />
          Add medication
        </button>
      </div>
    </Card>
  );
}

function MedicationItem({ item, medications, removeMedication, updateMedication, addVariant, removeVariant, updateVariant }) {
  const availableVariants = item.med?.variants ?? [];

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header: medication select + remove */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex-1 min-w-0">
          <Select
            sizing="sm"
            value={item.medicationId}
            onChange={(e) => {
              const nextId = e.target.value;
              updateMedication(item.key, {
                medicationId: nextId,
                variants: [{ key: crypto.randomUUID(), variantId: "", circuitBreaker: false }],
                titrationEnabled: false,
              });
            }}
          >
            <option value="">Select medication…</option>
            {MEDICATION_CATALOGUE.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </Select>
        </div>
        <button
          type="button"
          onClick={() => removeMedication(item.key)}
          disabled={medications.length === 1}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
          title={medications.length === 1 ? "Keep at least one medication" : "Remove medication"}
        >
          <TrashBin size={15} />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-3">
        {/* Variants */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Variants</p>

          {(item.variants ?? []).map((v) => (
            <div key={v.key} className="flex items-center gap-2">
              <div className="flex-1">
                <Select
                  sizing="sm"
                  value={v.variantId}
                  onChange={(e) => updateVariant(item.key, v.key, { variantId: e.target.value })}
                  disabled={!item.medicationId}
                >
                  <option value="">Select variant…</option>
                  {availableVariants.map((vv) => (
                    <option key={vv} value={vv}>{vv}</option>
                  ))}
                </Select>
              </div>

              {item.titrationEnabled && (
                <label className="flex items-center gap-1.5 flex-shrink-0 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={v.circuitBreaker}
                    onChange={(e) => updateVariant(item.key, v.key, { circuitBreaker: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 accent-amber-500 cursor-pointer"
                  />
                  <span className="text-xs text-gray-600 whitespace-nowrap">Circuit breaker</span>
                </label>
              )}

              <button
                type="button"
                onClick={() => removeVariant(item.key, v.key)}
                disabled={(item.variants ?? []).length === 1}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Remove variant"
              >
                <TrashBin size={14} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addVariant(item.key)}
            disabled={!item.medicationId}
            className="flex items-center gap-1.5 w-full px-3 py-1.5 text-xs font-medium text-blue-600 border border-dashed border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={12} />
            Add variant
          </button>
        </div>

        {/* Titration toggle */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <Fire size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Titration</span>
              <span className="text-xs text-gray-400">— variants above become the titration path</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={item.titrationEnabled}
              onClick={() => updateMedication(item.key, { titrationEnabled: !item.titrationEnabled })}
              className={`relative flex-shrink-0 inline-flex items-center h-6 w-11 rounded-full transition-colors cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 ${
                item.titrationEnabled ? "bg-blue-700" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  item.titrationEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
