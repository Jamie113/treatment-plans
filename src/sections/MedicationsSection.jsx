import { DropletBottleAlt, Plus, Fire, TrashBin, ExclamationCircle } from "flowbite-react-icons/outline";
import { Card, Field, Toggle } from "../components/UIComponents";
import { MEDICATION_CATALOGUE, TITRATION_CATALOGUE } from "../constants/catalogues";
import { newMedicationItem } from "../utils/helpers";

const SELECT_CLS =
  "w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition-colors cursor-pointer";

const INPUT_CLS =
  "w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition-colors";

export function MedicationsSection(props) {
  return (
    <Card
      title="Medications"
      subtitle="Add one or more medications and link the appropriate titration path."
      icon={<DropletBottleAlt size={18} />}
      right={
        <button
          type="button"
          onClick={() => props.setMedications((p) => [...p, newMedicationItem()])}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <Plus size={15} />
          Add medication
        </button>
      }
    >
      <div className="space-y-5">
        {props.selectedMedicationDetails.map((item, idx) => (
          <MedicationItem
            key={item.key}
            item={item}
            index={idx}
            medications={props.medications}
            medError={props.validation.medicationTitrationErrors[idx]}
            updateMedication={props.updateMedication}
            removeMedication={props.removeMedication}
          />
        ))}
      </div>
    </Card>
  );
}

function MedicationItem({ item, index, medications, medError, updateMedication, removeMedication }) {
  const availablePaths = TITRATION_CATALOGUE.filter(
    (t) => t.medicationId === item.medicationId
  );
  const selectedPath = TITRATION_CATALOGUE.find((t) => t.id === item.titrationPathId);

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 space-y-4 animate-slide-in">

      {/* Medication + quantity on one row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <DropletBottleAlt size={14} className="text-gray-400" />
            Medication
          </label>
          <select
            className={SELECT_CLS}
            value={item.medicationId}
            onChange={(e) => {
              const nextId = e.target.value;
              const med = MEDICATION_CATALOGUE.find((x) => x.id === nextId);
              updateMedication(item.key, {
                medicationId: nextId,
                titrationPathId: "",
                prescription: {
                  ...item.prescription,
                  required: med?.requiresPrescriptionDefault ?? true,
                },
              });
            }}
          >
            <option value="">Select medication…</option>
            {MEDICATION_CATALOGUE.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
        <Field label="Qty per order">
          <input
            type="number"
            min={1}
            className={INPUT_CLS}
            value={item.quantityPerOrder}
            onChange={(e) =>
              updateMedication(item.key, {
                quantityPerOrder: Number(e.target.value || 1),
              })
            }
          />
        </Field>
      </div>

      {/* Titration — only shown when enabled */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Fire size={14} className="text-gray-400" />
            Titration
          </label>
          <Toggle
            label="Enable"
            checked={item.titrationEnabled}
            onChange={(v) =>
              updateMedication(item.key, {
                titrationEnabled: v,
                titrationPathId: v ? item.titrationPathId : "",
                circuitBreaker: v ? item.circuitBreaker : false,
              })
            }
          />
        </div>

        {item.titrationEnabled && (
          <>
            {!item.medicationId ? (
              <p className="text-sm text-gray-400 italic">Select a medication first.</p>
            ) : (
              <>
                <select
                  className={SELECT_CLS}
                  value={item.titrationPathId}
                  onChange={(e) =>
                    updateMedication(item.key, { titrationPathId: e.target.value })
                  }
                >
                  <option value="">Choose titration path…</option>
                  {availablePaths.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>

                {selectedPath && (
                  <p className="text-xs text-gray-400">{selectedPath.description}</p>
                )}

                {medError && (
                  <div className="flex items-start gap-2 text-sm text-red-600">
                    <ExclamationCircle size={15} className="flex-shrink-0 mt-0.5" />
                    <span>{medError}</span>
                  </div>
                )}

                {/* Circuit breaker */}
                <div className="pt-2 border-t border-gray-100">
                  <Toggle
                    label="Circuit breaker — pause auto-titration at current dose"
                    checked={item.circuitBreaker}
                    onChange={(v) => updateMedication(item.key, { circuitBreaker: v })}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Remove */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 bg-white rounded-xl hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          onClick={() => removeMedication(item.key)}
          disabled={medications.length === 1}
          title={medications.length === 1 ? "Keep at least one row" : "Remove medication"}
        >
          <TrashBin size={15} />
          Remove
        </button>
      </div>
    </div>
  );
}
