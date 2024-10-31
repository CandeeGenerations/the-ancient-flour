"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/hooks/use-cart";
import { TagIcon, XIcon } from "lucide-react";
import { useState } from "react";

export function CartPromotionInput() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { promotion, applyPromotion, removePromotion } = useCart();
  const { toast } = useToast();

  const handleApplyPromotion = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!code) return;
    
    setLoading(true);
    try {
      await applyPromotion(code.toUpperCase());
      toast({
        title: "Promotion applied",
        description: "The discount has been applied to your cart.",
      });
      setCode("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid promotion",
        description: error instanceof Error ? error.message : "Failed to apply promotion code",
      });
    } finally {
      setLoading(false);
    }
  };

  if (promotion) {
    return (
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
    );
  }

  return (
    <form onSubmit={handleApplyPromotion} className="flex gap-2">
      <Input
        placeholder="Enter promotion code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        className="uppercase"
        aria-label="Promotion code"
      />
      <Button
        type="submit"
        disabled={!code || loading}
      >
        {loading ? "Applying..." : "Apply"}
      </Button>
    </form>
  );
}