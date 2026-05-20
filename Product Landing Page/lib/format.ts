import { product } from "@/lib/product";

export function formatMoney(amount: number) {
  return `${product.currency} ${Number(amount || 0).toLocaleString("en-NP")}`;
}

export function parsePositiveInt(value: string | null, fallback = 1) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
