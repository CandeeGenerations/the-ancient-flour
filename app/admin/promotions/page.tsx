"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { PromotionDialog } from "@/components/admin/promotions/promotion-dialog";
import { PromotionsTable } from "@/components/admin/promotions/promotions-table";
import { Promotion } from "@/lib/types";

export default function AdminPromotions() {
  const [open, setOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingPromotion(null);
    setOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Promotions</h2>
          <p className="text-muted-foreground">
            Manage your promotional codes and discounts
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Promotion
        </Button>
      </div>

      <PromotionsTable onEdit={handleEdit} />
      
      <PromotionDialog
        open={open}
        onOpenChange={setOpen}
        promotion={editingPromotion}
        onClose={handleClose}
      />
    </div>
  );
}