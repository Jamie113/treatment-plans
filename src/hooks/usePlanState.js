import { useMemo, useState } from "react";
import {
  MEDICATION_CATALOGUE,
  ADDON_CATALOGUE,
  INCLUSION_CATALOGUE,
  DURATION_OPTIONS,
  CYCLE_OPTIONS,
  INCLUSION_CYCLE_OPTIONS,
  OFFER_BILLING_CYCLE_OPTIONS,
} from "../constants/catalogues";
import { addDays, newMedicationItem, newInclusionItem, newUpsellItem, newOfferItem } from "../utils/helpers";

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
  const [upsells, setUpsells] = useState([]);
  const [allowPatientRescheduling, setAllowPatientRescheduling] = useState(true);
  const [rescheduleDaysEarlier, setRescheduleDaysEarlier] = useState(5);
  const [rescheduleDaysLater, setRescheduleDaysLater] = useState(10);

  const [inclusions, setInclusions] = useState([]);
  const [offers, setOffers] = useState([]);

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

  const clinicalProtocolItems = useMemo(() => {
    const items = [];

    // Medications from the medications section
    selectedMedicationDetails
      .filter((m) => m.medicationId)
      .forEach((m) => {
        items.push({
          key: m.key,
          type: "medication",
          name: m.med?.name ?? "Medication",
          prescription: m.prescription,
        });
      });

    // Medication-type inclusions
    inclusions
      .filter((i) => {
        if (!i.itemId) return false;
        return INCLUSION_CATALOGUE.find((c) => c.id === i.itemId)?.isMedication;
      })
      .forEach((i) => {
        const cat = INCLUSION_CATALOGUE.find((c) => c.id === i.itemId);
        items.push({
          key: i.key,
          type: "inclusion",
          name: cat?.name ?? "Medication",
          prescription: i.prescription ?? { renewalMonths: "3", approvalRequiredOnDoseChange: false },
        });
      });

    return items;
  }, [selectedMedicationDetails, inclusions]);

  const validation = useMemo(() => {
    const errors = {};
    if (!planName.trim()) errors.planName = "Plan name is required.";

    const anyMedicationSelected = medications.some((m) => m.medicationId);
    if (!anyMedicationSelected) errors.medications = "Add at least one medication.";

    const medicationVariantErrors = medications.map((m) => {
      if (!m.medicationId) return null;
      const hasVariant = (m.variants ?? []).some((v) => v.variantId);
      if (!hasVariant) return "Select at least one variant.";
      return null;
    });

    const hasVariantError = medicationVariantErrors.some(Boolean);

    const canCreate =
      !errors.planName &&
      !errors.medications &&
      !hasVariantError;

    return { errors, medicationTitrationErrors: medicationVariantErrors, canCreate };
  }, [planName, medications]);

  // Medication handlers
  function updateMedication(key, patch) {
    setMedications((prev) =>
      prev.map((m) => (m.key === key ? { ...m, ...patch } : m))
    );
  }

  function removeMedication(key) {
    setMedications((prev) => prev.filter((m) => m.key !== key));
  }

  function addVariant(medicationKey) {
    setMedications((prev) =>
      prev.map((m) =>
        m.key === medicationKey
          ? { ...m, variants: [...(m.variants ?? []), { key: crypto.randomUUID(), variantId: "", circuitBreaker: false }] }
          : m
      )
    );
  }

  function removeVariant(medicationKey, variantKey) {
    setMedications((prev) =>
      prev.map((m) =>
        m.key === medicationKey
          ? { ...m, variants: (m.variants ?? []).filter((v) => v.key !== variantKey) }
          : m
      )
    );
  }

  function updateVariant(medicationKey, variantKey, patch) {
    setMedications((prev) =>
      prev.map((m) =>
        m.key === medicationKey
          ? { ...m, variants: (m.variants ?? []).map((v) => (v.key === variantKey ? { ...v, ...patch } : v)) }
          : m
      )
    );
  }

  // Inclusions handlers
  function addInclusion() {
    setInclusions((prev) => [...prev, newInclusionItem()]);
  }

  function removeInclusion(key) {
    setInclusions((prev) => prev.filter((i) => i.key !== key));
  }

  function updateInclusion(key, patch) {
    setInclusions((prev) =>
      prev.map((i) => (i.key === key ? { ...i, ...patch } : i))
    );
  }

  function toggleInclusionOrder(key, orderNum) {
    setInclusions((prev) =>
      prev.map((i) => {
        if (i.key !== key) return i;
        const exists = i.orderNumbers.includes(orderNum);
        const next = exists
          ? i.orderNumbers.filter((n) => n !== orderNum)
          : [...i.orderNumbers, orderNum].sort((a, b) => a - b);
        return { ...i, orderNumbers: next };
      })
    );
  }

  // Upsell handlers
  function addUpsell() {
    setUpsells((prev) => [...prev, newUpsellItem()]);
  }

  function removeUpsell(key) {
    setUpsells((prev) => prev.filter((u) => u.key !== key));
  }

  function updateUpsell(key, patch) {
    setUpsells((prev) =>
      prev.map((u) => (u.key === key ? { ...u, ...patch } : u))
    );
  }

  function toggleUpsellOrder(key, orderNum) {
    setUpsells((prev) =>
      prev.map((u) => {
        if (u.key !== key) return u;
        const exists = u.orderNumbers.includes(orderNum);
        const next = exists
          ? u.orderNumbers.filter((n) => n !== orderNum)
          : [...u.orderNumbers, orderNum].sort((a, b) => a - b);
        return { ...u, orderNumbers: next };
      })
    );
  }

  // Offer handlers
  function addOffer() {
    setOffers((prev) => [...prev, newOfferItem()]);
  }

  function removeOffer(key) {
    setOffers((prev) => prev.filter((o) => o.key !== key));
  }

  function updateOffer(key, patch) {
    setOffers((prev) =>
      prev.map((o) => (o.key === key ? { ...o, ...patch } : o))
    );
  }

  const planConfigPreview = useMemo(() => {
    return {
      name: planName,
      duration_months: duration,
      cycle_days: cycleDays,
      start_behaviour: startBehaviour,
      start_date: startDate,
      allow_patient_rescheduling: allowPatientRescheduling,
      ...(allowPatientRescheduling && {
        reschedule_window: {
          days_earlier: rescheduleDaysEarlier,
          days_later: rescheduleDaysLater,
        },
      }),
      medications: medications
        .filter((m) => m.medicationId)
        .map((m) => ({
          medication_id: m.medicationId,
          variants: (m.variants ?? [])
            .filter((v) => v.variantId)
            .map((v) => ({
              variant_id: v.variantId,
              ...(m.titrationEnabled && { circuit_breaker: v.circuitBreaker }),
            })),
          titration_enabled: m.titrationEnabled,
          quantity_per_order: m.quantityPerOrder,
          prescription_rules: {
            renewal_months: Number(m.prescription.renewalMonths),
            approval_required_on_dose_change: m.prescription.approvalRequiredOnDoseChange,
          },
        })),
      upsells: upsells
        .filter((u) => u.itemId)
        .map((u) => {
          const catalogueItem = ADDON_CATALOGUE.find((a) => a.id === u.itemId);
          const cycleOption = INCLUSION_CYCLE_OPTIONS.find((o) => o.id === u.cycleId);
          return {
            item_id: u.itemId,
            schedule_type: u.scheduleType,
            ...(u.scheduleType === "specific_orders"
              ? { order_numbers: u.orderNumbers }
              : { cycle_days: u.cycleId === "custom" ? u.customCycleDays : cycleOption?.days }),
            pricing: {
              type: u.pricingType,
              price: u.pricingType === "custom" ? u.customPrice : (catalogueItem?.price ?? 0),
            },
          };
        }),
      inclusions: inclusions
        .filter((i) => i.itemId)
        .map((i) => {
          const cycleOption = INCLUSION_CYCLE_OPTIONS.find((o) => o.id === i.cycleId);
          return {
            item_id: i.itemId,
            schedule_type: i.scheduleType,
            ...(i.scheduleType === "specific_orders"
              ? { order_numbers: i.orderNumbers }
              : { cycle_days: i.cycleId === "custom" ? i.customCycleDays : cycleOption?.days }),
          };
        }),
      offers: offers.map((o) => {
        if (o.offerType === "basket_value") {
          return { type: "basket_value" };
        }
        const cycleOption = OFFER_BILLING_CYCLE_OPTIONS.find((c) => c.id === o.billingCycleId);
        return {
          type: "fixed_price",
          price: o.price,
          billing_cycle_days: o.billingCycleId === "custom" ? o.customBillingDays : cycleOption?.days,
        };
      }),
    };
  }, [
    planName,
    duration,
    cycleDays,
    startBehaviour,
    startDate,
    allowPatientRescheduling,
    rescheduleDaysEarlier,
    rescheduleDaysLater,
    medications,
    upsells,
    inclusions,
    offers,
  ]);

  return {
    // State
    inclusions,
    setInclusions,
    upsells,
    setUpsells,
    offers,
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
    allowPatientRescheduling,
    setAllowPatientRescheduling,
    rescheduleDaysEarlier,
    setRescheduleDaysEarlier,
    rescheduleDaysLater,
    setRescheduleDaysLater,

    // Computed values
    duration,
    cycleDays,
    ordersCount,
    orderPreview,
    selectedMedicationDetails,
    clinicalProtocolItems,
    validation,
    planConfigPreview,

    // Handlers
    updateMedication,
    removeMedication,
    addVariant,
    removeVariant,
    updateVariant,
    addUpsell,
    removeUpsell,
    updateUpsell,
    toggleUpsellOrder,
    addInclusion,
    removeInclusion,
    updateInclusion,
    toggleInclusionOrder,
    addOffer,
    removeOffer,
    updateOffer,
  };
}
