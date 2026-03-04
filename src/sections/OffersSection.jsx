import { Dollar, TrashBin, Plus, ShoppingBag, Tag } from "flowbite-react-icons/outline";
import { Select } from "flowbite-react";
import { Card } from "../components/UIComponents";
import { OFFER_BILLING_CYCLE_OPTIONS } from "../constants/catalogues";

const OFFER_TYPES = [
  { id: "basket_value", label: "Basket value" },
  { id: "fixed_price",  label: "Fixed price"  },
];

export function OffersSection(props) {
  const { offers } = props;

  return (
    <Card
      title="Offers"
      subtitle="Define how the plan is priced and billed to the patient."
      icon={<Dollar size={18} />}
    >
      <div className="space-y-4">
        {/* Empty state */}
        {offers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50">
            <Tag size={28} className="text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-500">No offers added</p>
            <p className="text-xs text-gray-400 mt-0.5">Add a basket value or fixed price offer</p>
          </div>
        )}

        {/* Offer rows */}
        {offers.map((offer) => {
          const cycleOption = OFFER_BILLING_CYCLE_OPTIONS.find((o) => o.id === offer.billingCycleId);

          return (
            <div
              key={offer.key}
              className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Header: type toggle + remove */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                {/* Offer type toggle */}
                <div className="flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden flex-shrink-0">
                  {OFFER_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => props.updateOffer(offer.key, { offerType: type.id })}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                        offer.offerType === type.id
                          ? "bg-blue-700 text-white"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => props.removeOffer(offer.key)}
                  className="ml-auto p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                  title="Remove offer"
                >
                  <TrashBin size={15} />
                </button>
              </div>

              {/* Body */}
              {offer.offerType === "basket_value" ? (
                <div className="px-4 py-4 flex items-start gap-3">
                  <ShoppingBag size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-500">
                    The patient is billed the <span className="font-medium text-gray-700">total value of goods</span> in each order at the point of dispatch.
                  </p>
                </div>
              ) : (
                <div className="px-4 py-4 space-y-3">
                  <div className="flex items-end gap-4 flex-wrap">
                    {/* Price */}
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Price</p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-gray-600">£</span>
                        <input
                          type="number"
                          min={0}
                          step={0.01}
                          value={offer.price}
                          onChange={(e) =>
                            props.updateOffer(offer.key, { price: parseFloat(e.target.value || 0) })
                          }
                          className="w-28 px-3 py-1.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Billing cycle */}
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Billed every</p>
                      <Select
                        sizing="sm"
                        value={offer.billingCycleId}
                        onChange={(e) => props.updateOffer(offer.key, { billingCycleId: e.target.value })}
                      >
                        {OFFER_BILLING_CYCLE_OPTIONS.map((o) => (
                          <option key={o.id} value={o.id}>{o.label}</option>
                        ))}
                      </Select>
                    </div>

                    {/* Custom days — shown only for "custom" cycle */}
                    {offer.billingCycleId === "custom" && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Days</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            value={offer.customBillingDays}
                            onChange={(e) =>
                              props.updateOffer(offer.key, { customBillingDays: Number(e.target.value || 1) })
                            }
                            className="w-20 px-3 py-1.5 text-sm text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <span className="text-sm text-gray-500">days</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Summary line */}
                  {offer.price > 0 && (
                    <p className="text-xs text-gray-400">
                      Patient charged{" "}
                      <span className="font-semibold text-emerald-600">£{offer.price.toFixed(2)}</span>
                      {" "}
                      {offer.billingCycleId === "custom"
                        ? `every ${offer.customBillingDays} days`
                        : cycleOption?.label?.toLowerCase()}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Add button */}
        <button
          type="button"
          onClick={props.addOffer}
          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-blue-700 border border-dashed border-blue-300 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-colors"
        >
          <Plus size={15} />
          Add offer
        </button>
      </div>
    </Card>
  );
}
