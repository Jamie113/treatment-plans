import { Check, ClipboardList, FloppyDisk } from "flowbite-react-icons/outline";

import { usePlanState } from "./hooks/usePlanState";
import { classNames } from "./utils/helpers";
import { PlanBasicsSection } from "./sections/PlanBasicsSection";
import { MedicationsSection } from "./sections/MedicationsSection";
import { AddOnsSection } from "./sections/AddOnsSection";
import { DispatchSection } from "./sections/DispatchSection";
import { PrescriptionRulesSection } from "./sections/PrescriptionRulesSection";
import { OffersSection } from "./sections/OffersSection";
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
    upsells,
    allowPatientRescheduling,
    setAllowPatientRescheduling,
    rescheduleDaysEarlier,
    setRescheduleDaysEarlier,
    rescheduleDaysLater,
    setRescheduleDaysLater,
    offers,
    duration,
    cycleDays,
    ordersCount,
    orderPreview,
    selectedMedicationDetails,
    validation,
    planConfigPreview,
    updateMedication,
    removeMedication,
    addUpsell,
    removeUpsell,
    updateUpsell,
    toggleUpsellOrder,
    inclusions,
    addInclusion,
    removeInclusion,
    updateInclusion,
    toggleInclusionOrder,
    addOffer,
    removeOffer,
    updateOffer,
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
              cycleId={cycleId}
              setCycleId={setCycleId}
              customCycleDays={customCycleDays}
              setCustomCycleDays={setCustomCycleDays}
              ordersCount={ordersCount}
              allowPatientRescheduling={allowPatientRescheduling}
              setAllowPatientRescheduling={setAllowPatientRescheduling}
              rescheduleDaysEarlier={rescheduleDaysEarlier}
              setRescheduleDaysEarlier={setRescheduleDaysEarlier}
              rescheduleDaysLater={rescheduleDaysLater}
              setRescheduleDaysLater={setRescheduleDaysLater}
            />

            <PrescriptionRulesSection
              selectedMedicationDetails={selectedMedicationDetails}
              updateMedication={updateMedication}
            />

            <OffersSection
              offers={offers}
              addOffer={addOffer}
              removeOffer={removeOffer}
              updateOffer={updateOffer}
            />

            <AddOnsSection
              upsells={upsells}
              ordersCount={ordersCount}
              duration={duration}
              addUpsell={addUpsell}
              removeUpsell={removeUpsell}
              updateUpsell={updateUpsell}
              toggleUpsellOrder={toggleUpsellOrder}
            />

            <ReviewSection
              medications={medications}
              upsells={upsells}
              inclusions={inclusions}
              offers={offers}
              ordersCount={ordersCount}
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
              upsells={upsells}
              inclusions={inclusions}
              offers={offers}
              validation={validation}
              planConfigPreview={planConfigPreview}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
