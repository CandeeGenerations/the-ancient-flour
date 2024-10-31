"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOrder } from "@/lib/orders";
import Link from "next/link";
import { paymentMethods } from "@/lib/constants";
import { TagIcon, XIcon } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, discount, totalPrice, promotion, applyPromotion, removePromotion } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [applyingPromo, setApplyingPromo] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order = await createOrder({
        customerId: formData.email,
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        total: totalPrice,
        notes: formData.notes,
        customerDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          paymentMethod: formData.paymentMethod,
        },
      });

      router.push(`/checkout/success?orderId=${order.id}`);
      setTimeout(() => clearCart(), 500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem creating your order. Please try again.",
      });
      router.push("/checkout/error");
    } finally {
      setLoading(false);
    }
  };

  const handlePromoCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode) return;

    setPromoError("");
    setApplyingPromo(true);
    try {
      await applyPromotion(promoCode.toUpperCase());
      toast({
        title: "Promotion applied",
        description: "The discount has been applied to your order.",
      });
      setPromoCode("");
    } catch (error) {
      setPromoError(error instanceof Error ? error.message : "Failed to apply promotion code");
    } finally {
      setApplyingPromo(false);
    }
  };

  const handlePromoCodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePromoCodeSubmit(e);
    }
  };

  if (loading) {
    return (
      <div className="container py-16">
        <Card className="max-w-lg mx-auto p-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            <p className="text-lg font-medium">Processing your order...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <Card className="max-w-lg mx-auto p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add some items to your cart before checking out.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              {/* Promotion Code Input */}
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Promotion Code</h3>
                {promotion ? (
                  <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <TagIcon className="h-4 w-4 text-primary" />
                      <div className="flex flex-col">
                        <span className="font-medium">{promotion.code}</span>
                        <span className="text-sm text-muted-foreground">
                          {promotion.type === "percentage"
                            ? `${promotion.value}% off`
                            : `$${promotion.value.toFixed(2)} off`}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={removePromotion}
                      className="h-8 w-8"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <form onSubmit={handlePromoCodeSubmit} className="flex gap-2">
                      <Input
                        placeholder="Enter promotion code"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value.toUpperCase());
                          setPromoError("");
                        }}
                        onKeyDown={handlePromoCodeKeyDown}
                        className="uppercase"
                        aria-invalid={!!promoError}
                      />
                      <Button 
                        type="submit"
                        disabled={!promoCode || applyingPromo}
                      >
                        {applyingPromo ? "Applying..." : "Apply"}
                      </Button>
                    </form>
                    {promoError && (
                      <p className="text-sm text-destructive">{promoError}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
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
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Checkout Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Payment Method</Label>
              <RadioGroup
                required
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  setFormData({ ...formData, paymentMethod: value })
                }
                className="grid grid-cols-2 gap-4"
              >
                {paymentMethods.map((method) => (
                  <div key={method.id}>
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={method.id}
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <method.icon className="mb-2 h-6 w-6" />
                      {method.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="notes">Order Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Any special instructions or requests?"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}