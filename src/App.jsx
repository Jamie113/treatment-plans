import {
  Check,
  ClipboardList,
  Zap,
} from "lucide-react";

import { usePlanState } from "./hooks/usePlanState";
import { classNames } from "./utils/helpers";
import { PlanBasicsSection } from "./sections/PlanBasicsSection";
import { MedicationsSection } from "./sections/MedicationsSection";
import { AddOnsSection } from "./sections/AddOnsSection";
import { DispatchSection } from "./sections/DispatchSection";
import { PrescriptionRulesSection } from "./sections/PrescriptionRulesSection";
import { BillingSection } from "./sections/BillingSection";
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
  } = state;

  function onCreate() {
    alert("Plan created (PoC). Open the config preview panel to copy JSON.");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-blue-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-accent-blue-600 mb-3">
                <ClipboardList size={16} />
                Treatment Plans
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                Create Your Treatment Plan
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="badge badge-info gap-2">
                  <Zap size={14} className="animate-pulse" />
                  UK • Weight Loss (PoC)
                </span>
                <span className="badge badge-success gap-1.5">
                  ✓ Advanced Builder
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <button className="btn btn-outline">
                💾 Save Draft
              </button>
              <button
                onClick={onCreate}
                disabled={!validation.canCreate}
                className={classNames(
                  "btn btn-lg",
                  validation.canCreate
                    ? "btn-primary"
                    : "btn-disabled"
                )}
              >
                <Check size={18} />
                {validation.canCreate ? "Create Plan" : "Complete Form"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-12 gap-10">
          {/* Builder */}
          <div className="col-span-12 lg:col-span-8 space-y-10">
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


