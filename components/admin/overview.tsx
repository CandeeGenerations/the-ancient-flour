"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesChart } from "./charts/sales-chart";

const data = [
  { name: "Jan", total: 1234 },
  { name: "Feb", total: 2345 },
  { name: "Mar", total: 3456 },
  { name: "Apr", total: 4567 },
  { name: "May", total: 5678 },
  { name: "Jun", total: 6789 },
];

export function Overview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <SalesChart data={data} />
      </CardContent>
    </Card>
  );
}