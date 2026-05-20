"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { formatMoney } from "@/lib/format";
import { calculateTotal, product } from "@/lib/product";
import { OrderButton } from "@/components/OrderButtons";

export function QuantityOrderPanel() {
  const [quantity, setQuantity] = useState(product.offerQuantity);
  const total = calculateTotal(quantity);

  return (
    <div className="rounded-lg border border-shell/10 bg-shell/8 p-5">
      <div className="mb-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md bg-coal/70 p-3">
          <p className="text-shell/55">Regular</p>
          <p className="mt-1 font-bold text-shell">{formatMoney(product.regularPrice)} / crate</p>
        </div>
        <div className="rounded-md bg-yolk p-3 text-coal">
          <p className="font-semibold">Best offer</p>
          <p className="mt-1 font-extrabold">2 crates at {formatMoney(product.offerPrice)}</p>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-4 rounded-md border border-shell/10 p-3">
        <span className="text-sm font-semibold text-shell/80">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            aria-label="Decrease quantity"
            className="grid h-9 w-9 place-items-center rounded-md bg-shell/10 transition hover:bg-shell/18"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            type="button"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-lg font-extrabold">{quantity}</span>
          <button
            aria-label="Increase quantity"
            className="grid h-9 w-9 place-items-center rounded-md bg-shell/10 transition hover:bg-shell/18"
            onClick={() => setQuantity((value) => value + 1)}
            type="button"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-5 rounded-md bg-coal/80 p-4">
        <div className="flex justify-between text-sm text-shell/65">
          <span>Delivery fee</span>
          <span>{product.deliveryFee === 0 ? "Free" : formatMoney(product.deliveryFee)}</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="font-semibold">Total price</span>
          <span className="text-3xl font-black text-yolk">{formatMoney(total)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <OrderButton label="Purchase Now" quantity={quantity} />
        <OrderButton label="Buy Now" quantity={quantity} variant="secondary" />
      </div>
    </div>
  );
}
