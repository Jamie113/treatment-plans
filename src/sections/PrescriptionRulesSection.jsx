import { ClipboardList, DropletBottleAlt } from "flowbite-react-icons/outline";
import { Card, Field, Toggle } from "../components/UIComponents";
import { PRESCRIPTION_RENEWAL_OPTIONS } from "../constants/catalogues";

const SELECT_CLS =
  "w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-500 transition-colors cursor-pointer";

export function PrescriptionRulesSection(props) {
  function updatePrescription(item, patch) {
    const next = { ...item.prescription, ...patch };
    if (item.type === "medication") {
      props.updateMedication(item.key, { prescription: next });
    } else {
      props.updateInclusion(item.key, { prescription: next });
    }
  }

  return (
    <Card
      title="Clinical protocols"
      subtitle="Set prescription renewal frequency and dose-change approval rules per medication."
      icon={<ClipboardList size={18} />}
    >
      <div className="space-y-4">
        {props.clinicalProtocolItems.map((item) => (
          <div key={item.key} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              <DropletBottleAlt size={15} className="text-gray-400" />
              {item.name}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <Field label="New prescription required every">
                <select
                  className={SELECT_CLS}
                  value={item.prescription.renewalMonths}
                  onChange={(e) =>
                    updatePrescription(item, { renewalMonths: e.target.value })
                  }
                >
                  {PRESCRIPTION_RENEWAL_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </Field>
              <Toggle
                label="Approval required on dose change"
                checked={item.prescription.approvalRequiredOnDoseChange}
                onChange={(v) =>
                  updatePrescription(item, { approvalRequiredOnDoseChange: v })
                }
              />
            </div>
          </div>
        ))}

        {props.clinicalProtocolItems.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 text-sm text-gray-400 text-center">
            Add medications or medication inclusions above to configure clinical protocols.
          </div>
        )}
      </div>
    </Card>
  );
}
