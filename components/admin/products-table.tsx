"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { products } from "@/lib/db/products";
import { Badge } from "@/components/ui/badge";

interface ProductsTableProps {
  onEdit: (product: Product) => void;
}

export function ProductsTable({ onEdit }: ProductsTableProps) {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    setProductList(Object.values(products));
  }, []);

  const handleDelete = async (id: string) => {
    // In a real app, this would make an API call
    setProductList(productList.filter((p) => p.id !== id));
  };

  if (productList.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No products found
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock Status</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productList.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {product.images?.[0] && (
                    <div className="relative h-10 w-10">
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt}
                        fill
                        className="rounded object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {product.description.substring(0, 50)}...
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={product.inStock ? "default" : "secondary"}
                  className={product.inStock ? "bg-green-500/15 text-green-700 hover:bg-green-500/20" : "bg-red-500/15 text-red-700 hover:bg-red-500/20"}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={product.enabled ? "bg-green-500/15 text-green-700" : "bg-red-500/15 text-red-700"}
                >
                  {product.enabled ? "Active" : "Disabled"}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(product.updatedAt)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onEdit(product)}
                      className="cursor-pointer"
                    >
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(product.id)}
                      className="cursor-pointer text-red-600"
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}