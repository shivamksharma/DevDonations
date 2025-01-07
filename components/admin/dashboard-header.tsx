"use client";

import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

export function DashboardHeader() {
  return (
    <motion.div 
      className="flex items-center gap-4 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-3 bg-primary/10 rounded-full">
        <ClipboardList className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage donations and track impact</p>
      </div>
    </motion.div>
  );
}