import { ClipboardList, DropletBottleAlt } from "flowbite-react-icons/outline";
import { Card, Field, Toggle } from "../components/UIComponents";
import { PRESCRIPTION_FREQ } from "../constants/catalogues";

const SELECT_CLS =
  "w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

export function PrescriptionRulesSection(props) {
  return (
    <Card
      title="Prescription rules"
      subtitle="Define how often a new prescription is required per medication."
      icon={<ClipboardList size={18} />}
    >
      <div className="space-y-4">
        {props.selectedMedicationDetails
          .filter((x) => x.medicationId)
          .map((item) => (
            <div key={item.key} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                <DropletBottleAlt size={15} className="text-gray-400" />
                {item.med?.name ?? "Medication"}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Toggle
                  label="Prescription required"
                  checked={item.prescription.required}
                  onChange={(v) =>
                    props.updateMedication(item.key, {
                      prescription: { ...item.prescription, required: v },
                    })
                  }
                />
                <Field label="Renewal frequency">
                  <select
                    className={SELECT_CLS}
                    value={item.prescription.renewalFrequency}
                    onChange={(e) =>
                      props.updateMedication(item.key, {
                        prescription: {
                          ...item.prescription,
                          renewalFrequency: e.target.value,
                        },
                      })
                    }
                    disabled={!item.prescription.required}
                  >
                    {PRESCRIPTION_FREQ.map((p) => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </Field>
                <Toggle
                  label="Approval required on dose change"
                  checked={item.prescription.approvalRequiredOnDoseChange}
                  onChange={(v) =>
                    props.updateMedication(item.key, {
                      prescription: {
                        ...item.prescription,
                        approvalRequiredOnDoseChange: v,
                      },
                    })
                  }
                  disabled={!item.prescription.required}
                />
              </div>
            </div>
          ))}

        {props.selectedMedicationDetails.every((x) => !x.medicationId) && (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 text-sm text-gray-400 text-center">
            Select medications above to configure prescription rules.
          </div>
        )}
      </div>
    </Card>
  );
}
