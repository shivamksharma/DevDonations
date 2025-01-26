"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { PageViewsChart } from "@/components/admin/analytics/page-views-chart";
import { useAnalyticsStore } from "@/lib/store/analytics";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const { pageViews, loading, fetchAnalytics } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics(dateRange?.from || undefined, dateRange?.to || undefined);
  }, [dateRange, fetchAnalytics]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
        <div className="flex items-center gap-4">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
          <Button
            variant="outline"
            onClick={() => fetchAnalytics()}
            disabled={loading}
          >
            Refresh Data
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6">
        <PageViewsChart pageViews={pageViews} />
        {/* Add more analytics components here */}
      </div>
    </div>
  );
} 