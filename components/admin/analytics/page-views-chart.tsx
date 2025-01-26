import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { subDays, format } from "date-fns";

interface PageViewsChartProps {
  pageViews: any[];
}

export function PageViewsChart({ pageViews }: PageViewsChartProps) {
  const dailyData = pageViews.reduce((acc: any, view: any) => {
    const date = format(view.timestamp.toDate(), 'yyyy-MM-dd');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(dailyData).map(([date, count]) => ({
    date,
    views: count,
  }));

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
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
} 