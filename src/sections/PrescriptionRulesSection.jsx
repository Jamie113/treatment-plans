import { ClipboardList, Pill } from "lucide-react";
import { Card, Field, Toggle } from "../components/UIComponents";
import { PRESCRIPTION_FREQ } from "../constants/catalogues";

export function PrescriptionRulesSection(props) {
  return (
    <Card
      title="Prescription rules"
      subtitle="Rule sets define how often a new prescription is required."
      icon={<ClipboardList size={20} />}
    >
      <div className="space-y-4">
        {props.selectedMedicationDetails
          .filter((x) => x.medicationId)
          .map((item) => (
            <div key={item.key} className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                <Pill size={16} className="text-gray-400" />
                {item.med?.name ?? "Medication"}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                    className="select select-bordered w-full"
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
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
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
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            Select medications above to configure prescription rules.
          </div>
        )}
      </div>
    </Card>
  );
}
