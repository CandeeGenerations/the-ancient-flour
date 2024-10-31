interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  formatter?: (value: number) => string;
}

export function ChartTooltip({ active, payload, formatter }: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const value = payload[0].value;
  const formattedValue = formatter ? formatter(value) : value;
  const label = payload[0].payload.name;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </span>
          <span className="font-bold text-muted-foreground">
            {formattedValue}
          </span>
        </div>
      </div>
    </div>
  );
}