"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthlyData = [
  { name: "Jan", donations: 45 },
  { name: "Feb", donations: 52 },
  { name: "Mar", donations: 48 },
  { name: "Apr", donations: 61 },
  { name: "May", donations: 55 },
  { name: "Jun", donations: 67 },
];

const itemData = [
  { name: "Shirts", quantity: 89 },
  { name: "Pants", quantity: 63 },
  { name: "Dresses", quantity: 41 },
  { name: "Jackets", quantity: 37 },
  { name: "Others", quantity: 29 },
];

export function DonationCharts() {
  return (
    <>
      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">Monthly Donations</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="donations" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">Most Donated Items</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={itemData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="quantity" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </>
  );
}