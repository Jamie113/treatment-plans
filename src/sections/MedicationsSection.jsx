import { Pill, Plus, Zap, Eye, EyeOff, ChevronUp, ChevronDown, Trash2, AlertCircle } from "lucide-react";
import { Card, Field, Toggle } from "../components/UIComponents";
import { MEDICATION_CATALOGUE, PRESCRIPTION_FREQ } from "../constants/catalogues";
import { classNames, newMedicationItem } from "../utils/helpers";

const SELECT_CLS =
  "w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition-colors cursor-pointer";

const INPUT_CLS =
  "w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition-colors";

export function MedicationsSection(props) {
  return (
    <Card
      title="Medications"
      subtitle="Add one or more medications and define the allowed dose path (variant ladder)."
      icon={<Pill size={18} />}
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
            medError={props.validation.medicationVariantErrors[idx]}
            updateMedication={props.updateMedication}
            removeMedication={props.removeMedication}
            moveVariant={props.moveVariant}
          />
        ))}
      </div>
    </Card>
  );
}

function MedicationItem({ item, index, medications, medError, updateMedication, removeMedication, moveVariant }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 space-y-5 animate-slide-in">
      {/* Medication select */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Pill size={14} className="text-gray-400" />
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
              variants: [],
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

      {/* Variant picker */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Zap size={14} className="text-gray-400" />
          Dose path (variants)
        </label>
        <div className="flex flex-wrap gap-2">
          {(item.med?.variants ?? []).map((v) => {
            const selected = item.variants.includes(v);
            return (
              <button
                key={v}
                type="button"
                onClick={() => {
                  if (!item.medicationId) return;
                  const next = selected
                    ? item.variants.filter((x) => x !== v)
                    : [...item.variants, v];
                  updateMedication(item.key, { variants: next });
                }}
                className={classNames(
                  "px-3 py-1 text-xs font-semibold rounded-full border transition-all",
                  selected
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                )}
              >
                {v}
              </button>
            );
          })}
          {!item.medicationId && (
            <span className="text-sm text-gray-400 italic">Select a medication first.</span>
          )}
        </div>

        {/* Dose ladder */}
        {item.variants.length > 0 && (
          <div className="mt-3 rounded-xl bg-white border border-gray-200 overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Ordered ladder</span>
            </div>
            <div className="divide-y divide-gray-100">
              {item.variants.map((v, i) => (
                <div
                  key={`${v}-${i}`}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-gray-900 text-white rounded-full text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-800">{v}</span>
                  </div>
                  <div className="flex gap-0.5">
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                      onClick={() => moveVariant(item.key, i, -1)}
                      disabled={i === 0}
                      title="Move up"
                    >
                      <ChevronUp size={15} />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                      onClick={() => moveVariant(item.key, i, 1)}
                      disabled={i === item.variants.length - 1}
                      title="Move down"
                    >
                      <ChevronDown size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {medError && (
          <div className="mt-2 flex items-start gap-2 text-sm text-red-600">
            <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
            <span>{medError}</span>
          </div>
        )}
      </div>

      {/* Dose adjustment rules toggle */}
      <div>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
          onClick={() =>
            updateMedication(item.key, {
              ui: { ...item.ui, showMovement: !item.ui.showMovement },
            })
          }
        >
          {item.ui.showMovement ? <EyeOff size={15} /> : <Eye size={15} />}
          {item.ui.showMovement ? "Hide" : "Show"} dose adjustment rules
        </button>

        {item.ui.showMovement && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 border border-blue-200 rounded-xl animate-slide-in">
            <Toggle
              label="Allow dose change"
              checked={item.movement.allowChange}
              onChange={(v) =>
                updateMedication(item.key, {
                  movement: { ...item.movement, allowChange: v },
                })
              }
            />
            <Field label="Max increase per cycle">
              <select
                className={SELECT_CLS}
                value={item.movement.maxIncreaseSteps}
                onChange={(e) =>
                  updateMedication(item.key, {
                    movement: {
                      ...item.movement,
                      maxIncreaseSteps: Number(e.target.value),
                    },
                  })
                }
              >
                <option value={1}>+1 step</option>
                <option value={2}>+2 steps</option>
              </select>
            </Field>
            <Toggle
              label="Allow decrease"
              checked={item.movement.allowDecrease}
              onChange={(v) =>
                updateMedication(item.key, {
                  movement: { ...item.movement, allowDecrease: v },
                })
              }
            />
          </div>
        )}
      </div>

      {/* Quantity, packaging, remove */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <Field label="Quantity per order">
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
        <Field label="Packaging">
          <select
            className={SELECT_CLS}
            value={item.packaging}
            onChange={(e) =>
              updateMedication(item.key, { packaging: e.target.value })
            }
          >
            <option>Standard</option>
            <option>Starter kit</option>
            <option>Clinic pack</option>
          </select>
        </Field>
        <div className="flex items-end">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-medium text-red-600 border border-red-200 bg-white rounded-xl hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            onClick={() => removeMedication(item.key)}
            disabled={medications.length === 1}
            title={medications.length === 1 ? "Keep at least one row" : "Remove medication"}
          >
            <Trash2 size={15} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
