import { Pill, Plus, Zap, Eye, EyeOff, ChevronUp, ChevronDown, Trash2, AlertCircle } from "lucide-react";
import { Card, Field, Toggle } from "../components/UIComponents";
import { MEDICATION_CATALOGUE, PRESCRIPTION_FREQ } from "../constants/catalogues";
import { classNames, newMedicationItem } from "../utils/helpers";

export function MedicationsSection(props) {
  return (
    <Card
      title="Medications"
      subtitle="Add one or more medications and define the allowed variant ladder (dose path)."
      icon={<Pill size={20} />}
      right={
        <button
          onClick={() => props.setMedications((p) => [...p, newMedicationItem()])}
          className="btn btn-outline btn-sm gap-2"
        >
          <Plus size={16} />
          Add medication
        </button>
      }
    >
      <div className="space-y-6">
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

function MedicationItem(props) {
  const { item, index, medications, medError, updateMedication, removeMedication, moveVariant } = props;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Pill size={16} className="text-slate-400" />
            <div className="text-sm font-semibold text-slate-700">Medication</div>
          </div>
          <select
            className="mt-3 select select-bordered w-full"
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
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <div className="mt-5">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-slate-400" />
              <div className="text-sm font-semibold text-slate-700">Allowed dose path (variants)</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(item.med?.variants ?? []).map((v) => {
                const selected = item.variants.includes(v);
                return (
                  <button
                    key={v}
                    onClick={() => {
                      if (!item.medicationId) return;
                      const next = selected
                        ? item.variants.filter((x) => x !== v)
                        : [...item.variants, v];
                      updateMedication(item.key, { variants: next });
                    }}
                    className={classNames(
                      "btn btn-xs",
                      selected ? "btn-primary" : "btn-ghost"
                    )}
                  >
                    {v}
                  </button>
                );
              })}
              {!item.medicationId && (
                <div className="text-sm text-slate-500 italic">
                  Select a medication to choose variants.
                </div>
              )}
            </div>

            {item.variants.length > 0 && (
              <div className="mt-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 p-4 border border-slate-200">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Ordered ladder
                </div>
                <div className="mt-3 space-y-2">
                  {item.variants.map((v, i) => (
                    <div
                      key={`${v}-${i}`}
                      className="flex items-center justify-between rounded-lg bg-base-100 border border-base-300 px-3 py-2.5 transition-all hover:border-base-400 hover:shadow-sm"
                    >
                      <div className="text-sm font-medium text-slate-700">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-slate-900 text-white rounded-full text-xs font-bold mr-2">{i + 1}</span>
                        {v}
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          className="btn btn-xs btn-ghost gap-0"
                          onClick={() => moveVariant(item.key, i, -1)}
                          disabled={i === 0}
                          title="Move up"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          className="btn btn-xs btn-ghost gap-0"
                          onClick={() => moveVariant(item.key, i, 1)}
                          disabled={i === item.variants.length - 1}
                          title="Move down"
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {medError && (
              <div className="mt-3 flex items-start gap-2 text-sm text-red-600">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{medError}</span>
              </div>
            )}
          </div>

          <button
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            onClick={() =>
              updateMedication(item.key, {
                ui: { ...item.ui, showMovement: !item.ui.showMovement },
              })
            }
          >
            {item.ui.showMovement ? <EyeOff size={16} /> : <Eye size={16} />}
            {item.ui.showMovement ? "Hide" : "Show"} dose adjustment rules
          </button>

          {item.ui.showMovement && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
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
                  className="select select-bordered w-full"
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

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Field label="Quantity per order">
              <input
                type="number"
                min={1}
                className="input input-bordered w-full"
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
                className="select select-bordered w-full"
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
                className="btn btn-outline btn-error btn-sm gap-2 w-full"
                onClick={() => removeMedication(item.key)}
                disabled={medications.length === 1}
                title={medications.length === 1 ? "Keep at least one row for PoC" : "Remove medication"}
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
