'use client';

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface VolunteerActivityChartProps {
  data: any[];
}

export function VolunteerActivityChart({ data }: VolunteerActivityChartProps) {
  const chartData = data;

  return (
    <Card className="border-muted/40">
      <CardHeader>
        <CardTitle>Volunteer Activity</CardTitle>
        <CardDescription>Active volunteers and total hours contributed per month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                yAxisId="left"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-lg">
                        <div className="grid gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold">
                              {payload[0].payload.month}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-8">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                              <span className="text-xs">Active:</span>
                            </div>
                            <span className="text-sm font-bold">{payload[0].value}</span>
                          </div>
                          <div className="flex items-center justify-between gap-8">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-purple-500" />
                              <span className="text-xs">New:</span>
                            </div>
                            <span className="text-sm font-bold">{payload[1]?.value}</span>
                          </div>
                          <div className="flex items-center justify-between gap-8">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span className="text-xs">Hours:</span>
                            </div>
                            <span className="text-sm font-bold">{payload[2]?.value}h</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="active"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Active Volunteers"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="new"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="New Volunteers"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="hours"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Hours Contributed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
