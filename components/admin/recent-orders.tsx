import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const recentOrders = [
  {
    id: "1",
    customer: "John Doe",
    email: "john@example.com",
    amount: "$123.45",
    status: "completed",
  },
  {
    id: "2",
    customer: "Jane Smith",
    email: "jane@example.com",
    amount: "$234.56",
    status: "processing",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    email: "bob@example.com",
    amount: "$345.67",
    status: "pending",
  },
];

const statusStyles = {
  completed: "bg-green-500/15 text-green-700 dark:bg-green-500/25 dark:text-green-300",
  processing: "bg-blue-500/15 text-blue-700 dark:bg-blue-500/25 dark:text-blue-300",
  pending: "bg-yellow-500/15 text-yellow-700 dark:bg-yellow-500/25 dark:text-yellow-300",
  cancelled: "bg-red-500/15 text-red-700 dark:bg-red-500/25 dark:text-red-300",
} as const;

export function RecentOrders() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.map((order) => {
            const status = statusStyles[order.status as keyof typeof statusStyles];
            return (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{order.customer}</span>
                    <span className="text-sm text-muted-foreground">
                      {order.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={status}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}