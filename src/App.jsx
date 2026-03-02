import { Check, ClipboardList, Fire, FloppyDisk } from "flowbite-react-icons/outline";

import { usePlanState } from "./hooks/usePlanState";
import { classNames } from "./utils/helpers";
import { PlanBasicsSection } from "./sections/PlanBasicsSection";
import { MedicationsSection } from "./sections/MedicationsSection";
import { AddOnsSection } from "./sections/AddOnsSection";
import { DispatchSection } from "./sections/DispatchSection";
import { PrescriptionRulesSection } from "./sections/PrescriptionRulesSection";
import { BillingSection } from "./sections/BillingSection";
import { InclusionsSection } from "./sections/InclusionsSection";
import { ReviewSection } from "./sections/ReviewSection";
import { SummaryPanel } from "./sections/SummaryPanel";

export default function App() {
  const state = usePlanState();
  const {
    planName,
    setPlanName,
    durationId,
    setDurationId,
    customDurationMonths,
    setCustomDurationMonths,
    cycleId,
    setCycleId,
    customCycleDays,
    setCustomCycleDays,
    startBehaviour,
    setStartBehaviour,
    startDate,
    setStartDate,
    medications,
    setMedications,
    addons,
    allowPatientRescheduling,
    setAllowPatientRescheduling,
    billingId,
    setBillingId,
    alignBillingWithDispatch,
    setAlignBillingWithDispatch,
    chargeOnApproval,
    setChargeOnApproval,
    duration,
    cycleDays,
    ordersCount,
    orderPreview,
    selectedMedicationDetails,
    validation,
    planConfigPreview,
    updateMedication,
    removeMedication,
    moveVariant,
    toggleAddon,
    setAddonInclusion,
    inclusions,
    addInclusion,
    removeInclusion,
    updateInclusion,
    toggleInclusionOrder,
  } = state;

  function onCreate() {
    alert("Plan created (PoC). Open the config preview panel to copy JSON.");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-9 h-9 bg-blue-700 rounded-xl flex-shrink-0">
                <ClipboardList size={18} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-semibold text-gray-900 leading-none">
                    New Treatment Plan
                  </h1>
                  <span className="badge badge-blue gap-1.5">
                    <Fire size={11} className="animate-pulse" />
                    UK · Weight Loss
                  </span>
                  <span className="badge badge-green">PoC</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Configure your plan below, then create it.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors">
                <FloppyDisk size={15} />
                Save Draft
              </button>
              <button
                onClick={onCreate}
                disabled={!validation.canCreate}
                className={classNames(
                  "inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl transition-colors",
                  validation.canCreate
                    ? "bg-blue-700 text-white hover:bg-blue-800 shadow-sm"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
              >
                <Check size={15} />
                {validation.canCreate ? "Create Plan" : "Complete Form"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Builder */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <PlanBasicsSection
              planName={planName}
              setPlanName={setPlanName}
              startBehaviour={startBehaviour}
              setStartBehaviour={setStartBehaviour}
              durationId={durationId}
              setDurationId={setDurationId}
              customDurationMonths={customDurationMonths}
              setCustomDurationMonths={setCustomDurationMonths}
              cycleId={cycleId}
              setCycleId={setCycleId}
              customCycleDays={customCycleDays}
              setCustomCycleDays={setCustomCycleDays}
              startDate={startDate}
              setStartDate={setStartDate}
              validation={validation}
            />

            <MedicationsSection
              medications={medications}
              setMedications={setMedications}
              selectedMedicationDetails={selectedMedicationDetails}
              validation={validation}
              updateMedication={updateMedication}
              removeMedication={removeMedication}
              moveVariant={moveVariant}
            />

            <AddOnsSection
              addons={addons}
              toggleAddon={toggleAddon}
              setAddonInclusion={setAddonInclusion}
            />

            <InclusionsSection
              inclusions={inclusions}
              ordersCount={ordersCount}
              duration={duration}
              addInclusion={addInclusion}
              removeInclusion={removeInclusion}
              updateInclusion={updateInclusion}
              toggleInclusionOrder={toggleInclusionOrder}
            />

            <DispatchSection
              ordersCount={ordersCount}
              orderPreview={orderPreview}
              allowPatientRescheduling={allowPatientRescheduling}
              setAllowPatientRescheduling={setAllowPatientRescheduling}
            />

            <PrescriptionRulesSection
              selectedMedicationDetails={selectedMedicationDetails}
              updateMedication={updateMedication}
            />

            <BillingSection
              billingId={billingId}
              setBillingId={setBillingId}
              alignBillingWithDispatch={alignBillingWithDispatch}
              setAlignBillingWithDispatch={setAlignBillingWithDispatch}
              chargeOnApproval={chargeOnApproval}
              setChargeOnApproval={setChargeOnApproval}
            />

            <ReviewSection
              medications={medications}
              addons={addons}
              inclusions={inclusions}
              ordersCount={ordersCount}
              billingId={billingId}
              validation={validation}
              planConfigPreview={planConfigPreview}
            />
          </div>

          {/* Summary Panel */}
          <div className="col-span-12 lg:col-span-4">
            <SummaryPanel
              duration={duration}
              cycleDays={cycleDays}
              ordersCount={ordersCount}
              selectedMedicationDetails={selectedMedicationDetails}
              addons={addons}
              inclusions={inclusions}
              billingId={billingId}
              alignBillingWithDispatch={alignBillingWithDispatch}
              chargeOnApproval={chargeOnApproval}
              validation={validation}
              planConfigPreview={planConfigPreview}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
