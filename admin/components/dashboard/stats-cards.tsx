"use client";

import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, Users, TrendingUp, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { getDonations } from "@/shared/lib/firebase/donations";
import { toast } from "@/shared/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

export function StatsCards() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    todayCount: 0,
    completionRate: 0
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const { donations, error } = await getDonations();
        if (error) {
          toast.error(error);
          return;
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const totalDonations = donations?.length || 0;
        const pendingDonations = donations?.filter((d: any) => d.status === 'pending').length || 0;
        const completedDonations = donations?.filter((d: any) => d.status === 'completed').length || 0;
        const todayDonations = donations?.filter((d: any) => {
          const donationDate = new Date(d.createdAt);
          donationDate.setHours(0, 0, 0, 0);
          return donationDate.getTime() === today.getTime();
        }).length || 0;
        
        const completionRate = totalDonations > 0 ? (completedDonations / totalDonations) * 100 : 0;
        
        setStats({
          total: totalDonations,
          pending: pendingDonations,
          completed: completedDonations,
          todayCount: todayDonations,
          completionRate: Math.round(completionRate)
        });
      } catch (error) {
        toast.error("Failed to fetch statistics");
      }
    }

    fetchStats();
  }, []);

  const statsData = [
    {
      title: "Total Donations",
      value: stats.total,
      description: "All donations received",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      trend: "+12% from last month"
    },
    {
      title: "Pending Donations",
      value: stats.pending,
      description: "Awaiting collection",
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      trend: `${stats.pending > 0 ? 'Action needed' : 'All caught up!'}`
    },
    {
      title: "Completed Donations",
      value: stats.completed,
      description: "Successfully collected",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      trend: `${stats.completionRate}% completion rate`
    },
    {
      title: "Today's Donations",
      value: stats.todayCount,
      description: "Received today",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      trend: "Real-time count"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`${stat.borderColor} border-l-4`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.trend}
                </Badge>
              </div>
              {stat.title === "Completed Donations" && stats.total > 0 && (
                <div className="mt-3">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${stats.completionRate}%` }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}