export function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function fmtDate(date) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(date);
}

export function newMedicationItem() {
  return {
    key: crypto.randomUUID(),
    medicationId: "",
    variants: [],
    movement: {
      allowChange: true,
      maxIncreaseSteps: 1,
      allowDecrease: true,
    },
    quantityPerOrder: 1,
    packaging: "Standard",
    prescription: {
      required: true,
      renewalFrequency: "every_3_months",
      approvalRequiredOnDoseChange: true,
    },
    ui: { showMovement: false },
  };
}
