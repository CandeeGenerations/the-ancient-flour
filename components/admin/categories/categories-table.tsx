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
import { Category } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Bread",
    slug: "bread",
    description: "Fresh baked breads",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73",
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Pastries",
    slug: "pastries",
    description: "Sweet and savory pastries",
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd",
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface CategoriesTableProps {
  onEdit: (category: Category) => void;
}

export function CategoriesTable({ onEdit }: CategoriesTableProps) {
  const [categories, setCategories] = useState(mockCategories);

  const handleDelete = async (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {category.image && (
                    <div className="relative h-10 w-10">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="rounded object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.description}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    category.enabled
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {category.enabled ? "Active" : "Disabled"}
                </span>
              </TableCell>
              <TableCell>{formatDate(category.updatedAt)}</TableCell>
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
                      onClick={() => onEdit(category)}
                      className="cursor-pointer"
                    >
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(category.id)}
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