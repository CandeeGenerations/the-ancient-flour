"use client";

import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export function CartSummary() {
  const { subtotal, discount, totalPrice } = useCart();

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-sm text-primary">
          <span>Discount</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span className={cn(discount > 0 && "text-primary")}>
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}