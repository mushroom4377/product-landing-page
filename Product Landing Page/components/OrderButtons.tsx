"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { calculateTotal, product } from "@/lib/product";

type Props = {
  quantity: number;
  label?: string;
  variant?: "primary" | "secondary";
};

export function OrderButton({ quantity, label = "Order Now", variant = "primary" }: Props) {
  const router = useRouter();

  function goToCheckout() {
    const params = new URLSearchParams({
      product: product.name,
      quantity: String(quantity),
      price: String(product.regularPrice),
      total: String(calculateTotal(quantity))
    });
    router.push(`/checkout?${params.toString()}`);
  }

  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition";
  const styles =
    variant === "primary"
      ? "bg-yolk text-coal hover:bg-shell"
      : "border border-shell/25 bg-shell/8 text-shell hover:bg-shell/14";

  return (
    <button className={`${base} ${styles}`} onClick={goToCheckout} type="button">
      <ShoppingBag className="h-4 w-4" />
      {label}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
