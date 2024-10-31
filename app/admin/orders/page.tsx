"use client";

import { Card } from "@/components/ui/card";
import { orders } from "@/lib/db/orders";
import { formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const statusStyles = {
  new: "bg-blue-500/15 text-blue-700",
  confirmed: "bg-purple-500/15 text-purple-700",
  in_progress: "bg-yellow-500/15 text-yellow-700",
  completed: "bg-green-500/15 text-green-700",
  fulfilled: "bg-green-500/15 text-green-700",
  canceled: "bg-red-500/15 text-red-700",
  archived: "bg-gray-500/15 text-gray-700",
} as const;

export default function AdminOrders() {
  const orderList = Object.values(orders);

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage your orders</p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{parseInt(order.id) + 1173}</TableCell>
                <TableCell>{order.customerId}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusStyles[order.status]}
                  >
                    {order.status.replace("_", " ").toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}