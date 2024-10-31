"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentOrders } from "@/components/admin/recent-orders";
import { 
  DollarSignIcon, 
  PackageIcon, 
  ShoppingCartIcon, 
  UsersIcon 
} from "lucide-react";

const stats = [
  {
    name: "Total Revenue",
    value: "$1,234.56",
    icon: DollarSignIcon,
    description: "Revenue this month",
  },
  {
    name: "Orders",
    value: "12",
    icon: ShoppingCartIcon,
    description: "Orders this month",
  },
  {
    name: "Products",
    value: "24",
    icon: PackageIcon,
    description: "Active products",
  },
  {
    name: "Customers",
    value: "48",
    icon: UsersIcon,
    description: "Total customers",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your store's performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentOrders />
        </CardContent>
      </Card>
    </div>
  );
}