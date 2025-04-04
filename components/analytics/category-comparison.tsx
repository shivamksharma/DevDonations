'use client';

import { DateRange } from 'react-day-picker';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface CategoryComparisonProps {
  dateRange: DateRange | undefined;
}

export default function CategoryComparison({
  dateRange,
}: CategoryComparisonProps) {
  // Mock data - replace with actual data fetching
  const data = [
    { category: 'Education', amount: 5000 },
    { category: 'Healthcare', amount: 3500 },
    { category: 'Environment', amount: 2800 },
    { category: 'Animal Welfare', amount: 2000 },
    { category: 'Human Rights', amount: 4500 },
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(value)
            }
          />
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(Number(value))
            }
          />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 