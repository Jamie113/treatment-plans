export const MEDICATION_CATALOGUE = [
  {
    id: "mounjaro",
    name: "Mounjaro",
    variants: ["2.5mg", "5mg", "7.5mg", "10mg", "12.5mg", "15mg"],
    requiresPrescriptionDefault: true,
  },
  {
    id: "wegovy",
    name: "Wegovy",
    variants: ["0.25mg", "0.5mg", "1mg", "1.7mg", "2.4mg"],
    requiresPrescriptionDefault: true,
  },
  {
    id: "metformin",
    name: "Metformin",
    variants: ["500mg", "850mg", "1000mg"],
    requiresPrescriptionDefault: false,
  },
];

export const ADDON_CATALOGUE = [
  { id: "anti_nausea", name: "Anti-nausea medication" },
  { id: "alcohol_wipes", name: "Alcohol wipes" },
  { id: "needles", name: "Needles" },
  { id: "constipation_support", name: "Constipation support" },
];

export const DURATION_OPTIONS = [
  { id: "3m", label: "3 months", months: 3 },
  { id: "6m", label: "6 months", months: 6 },
  { id: "12m", label: "12 months", months: 12 },
  { id: "custom", label: "Custom", months: null },
];

export const CYCLE_OPTIONS = [
  { id: "4w", label: "Every 4 weeks", days: 28 },
  { id: "2w", label: "Every 2 weeks", days: 14 },
  { id: "monthly", label: "Monthly", days: 30 },
  { id: "custom", label: "Custom", days: null },
];

export const PRESCRIPTION_FREQ = [
  { id: "every_order", label: "Every order" },
  { id: "every_2_orders", label: "Every 2 orders" },
  { id: "every_3_months", label: "Every 3 months" },
  { id: "custom", label: "Custom" },
];

export const BILLING_OPTIONS = [
  { id: "upfront", title: "Pay Upfront", subtitle: "One payment for full duration" },
  { id: "monthly", title: "Pay Monthly", subtitle: "Charge every month" },
  { id: "quarterly", title: "Pay Every 3 Months", subtitle: "Charge quarterly" },
  { id: "custom", title: "Custom Billing", subtitle: "Define a bespoke cadence" },
];
