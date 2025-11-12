// src/utils/pricing.js
// Pricing for meals (per meal)
export const RATES = {
  breakfast: 80, // ₹80 per meal
  lunch: 120, // ₹120 per meal
  dinner: 150, // ₹150 per meal
};

export function calculatePrice(type, mealsCount) {
  const key = String(type).toLowerCase();
  const rate = RATES[key] || RATES.breakfast;
  const total = Number(rate) * Number(mealsCount || 0);
  return Number(Number(total).toFixed(2));
}
