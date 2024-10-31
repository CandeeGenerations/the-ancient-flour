"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CategoryDialog } from "@/components/admin/categories/category-dialog";
import { CategoriesTable } from "@/components/admin/categories/categories-table";
import { Category } from "@/lib/types";

export default function AdminCategories() {
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingCategory(null);
    setOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage your product categories
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <CategoriesTable onEdit={handleEdit} />
      
      <CategoryDialog
        open={open}
        onOpenChange={setOpen}
        category={editingCategory}
        onClose={handleClose}
      />
    </div>
  );
}