"use client";

import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getDonations } from "@/lib/firebase/donations";
import { toast } from "@/hooks/use-toast";

export function StatsCards() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const { donations, error } = await getDonations();
        if (error) {
          toast.error(error);
          return;
        }
        
        setStats({
          total: donations.length,
          pending: donations.filter(d => d.status === 'pending').length,
          completed: donations.filter(d => d.status === 'completed').length
        });
      } catch (error) {
        toast.error("Failed to fetch statistics");
      }
    }

    fetchStats();
  }, []);

  const statsData = [
    {
      label: "Total Donations",
      value: stats.total,
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Pending Donations",
      value: stats.pending,
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      label: "Completed Donations",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-card p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}