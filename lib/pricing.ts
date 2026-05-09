export type PricingContext = { basePrice: number; citySurcharge?: number; materialSurcharge?: number; emergency?: boolean; rentalDays: number; partnerCost?: number; };
export function calculateEstimate(ctx: PricingContext) {
  const extDays = Math.max(0, ctx.rentalDays - 7);
  const extendedFee = extDays * 25;
  const emergency = ctx.emergency ? 75 : 0;
  const subtotal = ctx.basePrice + (ctx.citySurcharge || 0) + (ctx.materialSurcharge || 0) + extendedFee + emergency;
  const margin = ctx.partnerCost ? subtotal - ctx.partnerCost : undefined;
  return { subtotal, min: subtotal - 40, max: subtotal + 60, extendedFee, emergency, margin };
}
