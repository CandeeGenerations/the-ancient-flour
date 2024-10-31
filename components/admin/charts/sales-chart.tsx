"use client";

import { Card } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "Jan", sales: 4000 },
  { date: "Feb", sales: 3000 },
  { date: "Mar", sales: 2000 },
  { date: "Apr", sales: 2780 },
  { date: "May", sales: 1890 },
  { date: "Jun", sales: 2390 },
];

export function SalesChart() {
  return (
    <Card className="p-6">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--muted-foreground))" }}
              padding={{ left: 20, right: 20 }}
              style={{ fontSize: "12px" }}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--muted-foreground))" }}
              style={{ fontSize: "12px" }}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
              labelStyle={{ color: "hsl(var(--muted-foreground))" }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#salesGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}