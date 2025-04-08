"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, RefreshCw } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { PageViewsChart } from "@/components/admin/analytics/page-views-chart";
import { TopDonors } from "@/components/admin/analytics/top-donors";
import { TopVolunteers } from "@/components/admin/analytics/top-volunteers";
import { useAnalyticsStore } from "@/lib/store/analytics";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { pageViews, loading, fetchAnalytics } = useAnalyticsStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        console.log("Fetching analytics data with date range:", dateRange);
        await fetchAnalytics(dateRange?.from || undefined, dateRange?.to || undefined);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("Failed to load analytics data. Please try again.");
      }
    };

    loadData();
  }, [dateRange, fetchAnalytics]);

  const handleRefresh = async () => {
    try {
      setError(null);
      console.log("Manually refreshing analytics data");
      await fetchAnalytics(dateRange?.from || undefined, dateRange?.to || undefined);
    } catch (err) {
      console.error("Error refreshing analytics:", err);
      setError("Failed to refresh analytics data. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
        <div className="flex items-center gap-4 mb-4">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground mb-4">
          {dateRange?.from && dateRange?.to ? (
            <p>Showing data from {dateRange.from.toLocaleDateString()} to {dateRange.to.toLocaleDateString()}</p>
          ) : (
            <p>Showing all available data</p>
          )}
        </div>
      </motion.div>

      <div className="grid gap-6">
        {/* Top Donors and Top Volunteers in a 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TopDonors />
          <TopVolunteers />
        </div>
        
        {/* Daily Page Views below */}
        <PageViewsChart pageViews={pageViews} loading={loading} />
      </div>
    </div>
  );
} 