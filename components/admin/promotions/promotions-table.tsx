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
import { Promotion } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

const mockPromotions: Promotion[] = [
  {
    id: "1",
    code: "SUMMER2024",
    description: "Summer sale discount",
    type: "percentage",
    value: 20,
    minPurchase: 50,
    maxUses: 100,
    usedCount: 45,
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    code: "WELCOME10",
    description: "New customer discount",
    type: "fixed_amount",
    value: 10,
    minPurchase: 25,
    maxUses: 1000,
    usedCount: 234,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface PromotionsTableProps {
  onEdit: (promotion: Promotion) => void;
}

export function PromotionsTable({ onEdit }: PromotionsTableProps) {
  const [promotions, setPromotions] = useState(mockPromotions);

  const handleDelete = async (id: string) => {
    setPromotions(promotions.filter((p) => p.id !== id));
  };

  const formatValue = (promotion: Promotion) => {
    return promotion.type === "percentage"
      ? `${promotion.value}%`
      : `$${promotion.value.toFixed(2)}`;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Valid Period</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {promotions.map((promotion) => (
            <TableRow key={promotion.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{promotion.code}</span>
                  <span className="text-sm text-muted-foreground">
                    {promotion.description}
                  </span>
                </div>
              </TableCell>
              <TableCell className="capitalize">
                {promotion.type.replace("_", " ")}
              </TableCell>
              <TableCell>{formatValue(promotion)}</TableCell>
              <TableCell>
                {promotion.usedCount} / {promotion.maxUses}
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-sm">
                  <span>{formatDate(promotion.startDate)}</span>
                  <span>{formatDate(promotion.endDate)}</span>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    promotion.enabled
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {promotion.enabled ? "Active" : "Disabled"}
                </span>
              </TableCell>
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
                      onClick={() => onEdit(promotion)}
                      className="cursor-pointer"
                    >
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(promotion.id)}
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