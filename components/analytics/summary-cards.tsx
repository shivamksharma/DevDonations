'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRange } from 'react-day-picker';
import { DollarSign, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface SummaryCardsProps {
  dateRange: DateRange | undefined;
}

export default function SummaryCards({ dateRange }: SummaryCardsProps) {
  // Mock data - replace with actual data fetching
  const summaryData = {
    total: {
      value: '$12,345',
      label: 'Total Donations',
      icon: DollarSign,
    },
    pending: {
      value: '$3,456',
      label: 'Pending Donations',
      icon: Clock,
    },
    completed: {
      value: '$8,889',
      label: 'Completed Donations',
      icon: CheckCircle,
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Object.entries(summaryData).map(([key, data]) => {
        const Icon = data.icon;
        return (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {data.label}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.value}</div>
              <p className="text-xs text-muted-foreground">
                {dateRange?.from && dateRange?.to
                  ? `${format(dateRange.from, 'MMM d')} - ${format(
                      dateRange.to,
                      'MMM d'
                    )}`
                  : 'All time'}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 