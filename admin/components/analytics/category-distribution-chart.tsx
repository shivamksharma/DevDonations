'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface CategoryDistributionChartProps {
  data: any[];
}

export function CategoryDistributionChart({ data }: CategoryDistributionChartProps) {
  const chartData = data;

  return (
    <Card className="border-muted/40">
      <CardHeader>
        <CardTitle>Donation Categories</CardTitle>
        <CardDescription>Distribution of donations across different categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis
                type="number"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                dataKey="category"
                type="category"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                width={80}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-lg">
                        <div className="grid gap-2">
                          <div className="font-semibold">{payload[0].payload.category}</div>
                          <div className="flex items-center justify-between gap-8">
                            <span className="text-xs text-muted-foreground">Total:</span>
                            <span className="text-sm font-bold">{payload[0].value} items</span>
                          </div>
                          <div className="flex items-center justify-between gap-8">
                            <span className="text-xs text-muted-foreground">Percentage:</span>
                            <span className="text-sm font-bold">
                              {payload[0].payload.percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="count"
                fill="hsl(var(--primary))"
                radius={[0, 8, 8, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
