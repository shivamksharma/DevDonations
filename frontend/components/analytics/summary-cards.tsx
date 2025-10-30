'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { DateRange } from 'react-day-picker';
import { DollarSign, Clock, CheckCircle, Users } from 'lucide-react';
import { format } from 'date-fns';
import { getDonations } from '@/services/firebase/donations';
import { LoadingState } from '@/shared/components/ui/loading-state';
import { ErrorState } from '@/shared/components/ui/data-states';

interface SummaryCardsProps {
  dateRange: DateRange | undefined;
}

interface SummaryData {
  total: {
    value: string;
    label: string;
    icon: any;
  };
  pending: {
    value: string;
    label: string;
    icon: any;
  };
  completed: {
    value: string;
    label: string;
    icon: any;
  };
  beneficiaries: {
    value: string;
    label: string;
    icon: any;
  };
}

export default function SummaryCards({ dateRange }: SummaryCardsProps) {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        const donations = await getDonations();

        // Filter by date range if provided
        let filteredDonations = donations;
        if (dateRange?.from && dateRange?.to) {
          filteredDonations = donations.filter(donation => {
            const donationDate = donation.createdAt;
            return donationDate && donationDate >= dateRange.from! && donationDate <= dateRange.to!;
          });
        }

        const totalValue = filteredDonations.reduce((sum, d) => sum + d.totalItems, 0);
        const pendingCount = filteredDonations.filter(d => d.status === 'pending').length;
        const completedCount = filteredDonations.filter(d => d.status === 'distributed').length;
        const beneficiariesCount = filteredDonations
          .filter(d => d.status === 'distributed')
          .reduce((sum, d) => sum + d.totalItems, 0);

        setSummaryData({
          total: {
            value: totalValue.toString(),
            label: 'Total Items Donated',
            icon: DollarSign,
          },
          pending: {
            value: pendingCount.toString(),
            label: 'Pending Donations',
            icon: Clock,
          },
          completed: {
            value: completedCount.toString(),
            label: 'Completed Donations',
            icon: CheckCircle,
          },
          beneficiaries: {
            value: beneficiariesCount.toString(),
            label: 'Items Distributed',
            icon: Users,
          },
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching summary data:', err);
        setError('Failed to load summary data');
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, [dateRange]);

  if (loading) {
    return <LoadingState label="Loading summary..." />;
  }

  if (error || !summaryData) {
    return <ErrorState description={error || 'Failed to load data'} />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
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
                  : 'All time'
                }
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 