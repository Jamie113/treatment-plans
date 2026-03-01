import { useMemo, useState } from "react";
import {
  MEDICATION_CATALOGUE,
  ADDON_CATALOGUE,
  DURATION_OPTIONS,
  CYCLE_OPTIONS,
  PRESCRIPTION_FREQ,
  BILLING_OPTIONS,
} from "../constants/catalogues";
import { addDays, newMedicationItem } from "../utils/helpers";

export function usePlanState() {
  const [planName, setPlanName] = useState("");
  const [durationId, setDurationId] = useState("6m");
  const [customDurationMonths, setCustomDurationMonths] = useState(6);

  const [cycleId, setCycleId] = useState("4w");
  const [customCycleDays, setCustomCycleDays] = useState(28);

  const [startBehaviour, setStartBehaviour] = useState("immediately");
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().slice(0, 10);
  });

  const [medications, setMedications] = useState([newMedicationItem()]);
  const [addons, setAddons] = useState({});
  const [allowPatientRescheduling, setAllowPatientRescheduling] = useState(true);

  const [billingId, setBillingId] = useState("monthly");
  const [alignBillingWithDispatch, setAlignBillingWithDispatch] = useState(true);
  const [chargeOnApproval, setChargeOnApproval] = useState(true);

  // Computed values
  const duration = useMemo(() => {
    const chosen = DURATION_OPTIONS.find((d) => d.id === durationId);
    return durationId === "custom" ? customDurationMonths : chosen?.months ?? 6;
  }, [durationId, customDurationMonths]);

  const cycleDays = useMemo(() => {
    const chosen = CYCLE_OPTIONS.find((c) => c.id === cycleId);
    return cycleId === "custom" ? customCycleDays : chosen?.days ?? 28;
  }, [cycleId, customCycleDays]);

  const ordersCount = useMemo(() => {
    const totalDays = duration * 30;
    return Math.max(1, Math.round(totalDays / cycleDays));
  }, [duration, cycleDays]);

  const orderPreview = useMemo(() => {
    const base = new Date(startDate);
    const list = [];
    for (let i = 0; i < Math.min(ordersCount, 12); i++) {
      list.push({ index: i + 1, date: addDays(base, i * cycleDays) });
    }
    return list;
  }, [startDate, ordersCount, cycleDays]);

  const selectedMedicationDetails = useMemo(() => {
    return medications.map((m) => {
      const med = MEDICATION_CATALOGUE.find((x) => x.id === m.medicationId);
      return { ...m, med };
    });
  }, [medications]);

  const validation = useMemo(() => {
    const errors = {};
    if (!planName.trim()) errors.planName = "Plan name is required.";

    const anyMedicationSelected = medications.some((m) => m.medicationId);
    if (!anyMedicationSelected) errors.medications = "Add at least one medication.";

    const medicationVariantErrors = medications.map((m) => {
      if (!m.medicationId) return null;
      if (!m.variants?.length) return "Select at least one variant (dose) for this medication.";
      return null;
    });

    const hasVariantError = medicationVariantErrors.some(Boolean);

    const canCreate =
      !errors.planName &&
      !errors.medications &&
      !hasVariantError &&
      Boolean(billingId);

    return { errors, medicationVariantErrors, canCreate };
  }, [planName, medications, billingId]);

  // Handlers
  function updateMedication(key, patch) {
    setMedications((prev) =>
      prev.map((m) => (m.key === key ? { ...m, ...patch } : m))
    );
  }

  function removeMedication(key) {
    setMedications((prev) => prev.filter((m) => m.key !== key));
  }

  function moveVariant(itemKey, index, direction) {
    setMedications((prev) =>
      prev.map((m) => {
        if (m.key !== itemKey) return m;
        const arr = [...m.variants];
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= arr.length) return m;
        const tmp = arr[index];
        arr[index] = arr[newIndex];
        arr[newIndex] = tmp;
        return { ...m, variants: arr };
      })
    );
  }

  function toggleAddon(addonId, selected) {
    setAddons((prev) => ({
      ...prev,
      [addonId]: {
        selected,
        inclusion: prev[addonId]?.inclusion ?? "optional",
      },
    }));
  }

  function setAddonInclusion(addonId, inclusion) {
    setAddons((prev) => ({
      ...prev,
      [addonId]: {
        selected: prev[addonId]?.selected ?? false,
        inclusion,
      },
    }));
  }

  const planConfigPreview = useMemo(() => {
    const selectedAddons = Object.entries(addons)
      .filter(([, v]) => v.selected)
      .map(([id, v]) => ({ id, inclusion: v.inclusion }));

    return {
      name: planName,
      duration_months: duration,
      cycle_days: cycleDays,
      start_behaviour: startBehaviour,
      start_date: startDate,
      allow_patient_rescheduling: allowPatientRescheduling,
      medications: medications
        .filter((m) => m.medicationId)
        .map((m) => ({
          medication_id: m.medicationId,
          variants: m.variants,
          movement_rules: m.movement,
          quantity_per_order: m.quantityPerOrder,
          packaging: m.packaging,
          prescription_rules: m.prescription,
        })),
      addons: selectedAddons,
      billing_plan: {
        type: billingId,
        align_with_dispatch: alignBillingWithDispatch,
        charge_on_approval: chargeOnApproval,
      },
    };
  }, [
    planName,
    duration,
    cycleDays,
    startBehaviour,
    startDate,
    allowPatientRescheduling,
    medications,
    addons,
    billingId,
    alignBillingWithDispatch,
    chargeOnApproval,
  ]);

  return {
    // State
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
    setAddons,
    allowPatientRescheduling,
    setAllowPatientRescheduling,
    billingId,
    setBillingId,
    alignBillingWithDispatch,
    setAlignBillingWithDispatch,
    chargeOnApproval,
    setChargeOnApproval,

    // Computed values
    duration,
    cycleDays,
    ordersCount,
    orderPreview,
    selectedMedicationDetails,
    validation,
    planConfigPreview,

    // Handlers
    updateMedication,
    removeMedication,
    moveVariant,
    toggleAddon,
    setAddonInclusion,
  };
}
