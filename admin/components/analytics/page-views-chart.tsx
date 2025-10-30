import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";

interface PageViewsChartProps {
  pageViews: any[];
  loading?: boolean;
}

export function PageViewsChart({ pageViews, loading = false }: PageViewsChartProps) {
  // Log data for debugging
  console.log("PageViews data:", pageViews);

  // Handle empty data
  if (loading) {
    return (
      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">Daily Page Views</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading data...</p>
        </div>
      </motion.div>
    );
  }

  if (!pageViews || pageViews.length === 0) {
    return (
      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">Daily Page Views</h3>
        <Alert variant="default" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No data available</AlertTitle>
          <AlertDescription>
            There are no page views recorded for the selected date range.
          </AlertDescription>
        </Alert>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Try selecting a different date range</p>
        </div>
      </motion.div>
    );
  }

  // Process data for the chart
  const dailyData = pageViews.reduce((acc: any, view: any) => {
    // Check if timestamp exists and is a Firestore Timestamp
    if (!view.timestamp) {
      console.warn("Missing timestamp in page view:", view);
      return acc;
    }

    try {
      // Handle both Firestore Timestamp and regular Date objects
      const date = view.timestamp.toDate 
        ? format(view.timestamp.toDate(), 'yyyy-MM-dd')
        : format(new Date(view.timestamp), 'yyyy-MM-dd');
      
      acc[date] = (acc[date] || 0) + 1;
    } catch (error) {
      console.error("Error processing timestamp:", error, view);
    }
    return acc;
  }, {});

  // Sort dates chronologically
  const chartData = Object.entries(dailyData)
    .map(([date, count]) => ({
      date,
      views: count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  console.log("Processed chart data:", chartData);

  return (
    <motion.div
      className="bg-card p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold mb-4">Daily Page Views</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => format(parseISO(value), 'MMM d')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(label) => format(parseISO(label), 'MMMM d, yyyy')}
            />
            <Line 
              type="monotone" 
              dataKey="views" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
} 