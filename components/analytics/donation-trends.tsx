'use client';

import { DateRange } from 'react-day-picker';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DonationTrendsProps {
  dateRange: DateRange | undefined;
}

export default function DonationTrends({ dateRange }: DonationTrendsProps) {
  // Mock data - replace with actual data fetching
  const data = [
    { date: '2024-01-01', amount: 1000 },
    { date: '2024-01-02', amount: 1500 },
    { date: '2024-01-03', amount: 2000 },
    { date: '2024-01-04', amount: 1800 },
    { date: '2024-01-05', amount: 2500 },
    { date: '2024-01-06', amount: 3000 },
    { date: '2024-01-07', amount: 2800 },
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
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
            labelFormatter={(label) =>
              new Date(label).toLocaleDateString()
            }
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 