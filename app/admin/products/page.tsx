"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ProductsTable } from "@/components/admin/products-table";
import { useRouter } from "next/navigation";

export default function AdminProducts() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Button onClick={() => router.push("/admin/products/new")}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductsTable onEdit={(product) => router.push(`/admin/products/${product.id}`)} />
    </div>
  );
}