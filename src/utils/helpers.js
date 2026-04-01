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

export function newOfferItem() {
  return {
    key: crypto.randomUUID(),
    offerType: "basket_value", // "basket_value" | "fixed_price"
    price: 0,
    billingCycleId: "monthly",
    customBillingDays: 30,
  };
}

export function newUpsellItem() {
  return {
    key: crypto.randomUUID(),
    itemId: "",
    scheduleType: "specific_orders", // "specific_orders" | "recurring_cycle"
    orderNumbers: [1],
    cycleId: "3m",
    customCycleDays: 90,
    pricingType: "catalogue",        // "catalogue" | "custom"
    customPrice: 0,
  };
}

export function newInclusionItem() {
  return {
    key: crypto.randomUUID(),
    itemId: "",
    scheduleType: "specific_orders", // "specific_orders" | "recurring_cycle"
    orderNumbers: [1],               // used when scheduleType === "specific_orders"
    cycleId: "3m",                   // used when scheduleType === "recurring_cycle"
    customCycleDays: 90,
    prescription: {
      renewalMonths: "3",
      approvalRequiredOnDoseChange: false,
    },
  };
}

export function newMedicationItem() {
  return {
    key: crypto.randomUUID(),
    medicationId: "",
    titrationEnabled: false,
    titrationPathId: "",
    circuitBreaker: false,
    quantityPerOrder: 1,
    prescription: {
      renewalMonths: "3",
      approvalRequiredOnDoseChange: true,
    },
  };
}
