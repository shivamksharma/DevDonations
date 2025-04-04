'use client';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangePicker } from '@/components/date-range-picker';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import SummaryCards from '@/components/analytics/summary-cards';
import DonationTrends from '@/components/analytics/donation-trends';
import CategoryComparison from '@/components/analytics/category-comparison';
import StatusDistribution from '@/components/analytics/status-distribution';
import DonationsTable from '@/components/analytics/donations-table';

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const handleRefresh = () => {
    // Implement refresh logic here
    console.log('Refreshing data...');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center gap-4">
          <DateRangePicker
            date={dateRange}
            onDateChange={setDateRange}
          />
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <SummaryCards dateRange={dateRange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Donation Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <DonationTrends dateRange={dateRange} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryComparison dateRange={dateRange} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <StatusDistribution dateRange={dateRange} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <DonationsTable dateRange={dateRange} />
        </CardContent>
      </Card>
    </div>
  );
} 