'use client';

import { useState, useEffect } from 'react';
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
import { getCategoryDistribution } from '@/services/firebase/analytics';

interface CategoryComparisonProps {
  dateRange: DateRange | undefined;
}

export default function CategoryComparison({
  dateRange,
}: CategoryComparisonProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categories = await getCategoryDistribution();
        // Transform data for bar chart
        const chartData = categories.map(({ category, count }) => ({
          category: category,
          amount: count,
        }));
        setData(chartData);
      } catch (error) {
        console.error('Error fetching category comparison:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [dateRange]);

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading categories...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">No category data available</p>
      </div>
    );
  }

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
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 