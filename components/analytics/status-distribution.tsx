'use client';

import { DateRange } from 'react-day-picker';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface StatusDistributionProps {
  dateRange: DateRange | undefined;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function StatusDistribution({
  dateRange,
}: StatusDistributionProps) {
  // Mock data - replace with actual data fetching
  const data = [
    { name: 'Completed', value: 4000 },
    { name: 'Pending', value: 3000 },
    { name: 'Failed', value: 1000 },
    { name: 'Refunded', value: 500 },
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(Number(value))
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 