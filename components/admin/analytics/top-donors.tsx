"use client";

import { motion } from "framer-motion";
import { useDonationStore } from "@/lib/store/donations";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TopDonor {
  name: string;
  totalDonations: number;
  itemCount: number;
  lastDonation: string;
}

export function TopDonors() {
  const { donations, fetchDonations } = useDonationStore();
  const [topDonors, setTopDonors] = useState<TopDonor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        await fetchDonations();
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Failed to load donation data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchDonations]);

  useEffect(() => {
    if (donations.length > 0) {
      // Process donations to find top donors
      const donorMap = new Map<string, TopDonor>();
      
      donations.forEach(donation => {
        const donorName = donation.name;
        const itemCount = donation.items.reduce((acc, item) => acc + item.quantity, 0);
        
        if (donorMap.has(donorName)) {
          const existing = donorMap.get(donorName)!;
          donorMap.set(donorName, {
            ...existing,
            totalDonations: existing.totalDonations + 1,
            itemCount: existing.itemCount + itemCount,
            lastDonation: donation.createdAt > existing.lastDonation 
              ? donation.createdAt 
              : existing.lastDonation
          });
        } else {
          donorMap.set(donorName, {
            name: donorName,
            totalDonations: 1,
            itemCount,
            lastDonation: donation.createdAt
          });
        }
      });
      
      // Convert to array and sort by total donations
      const sortedDonors = Array.from(donorMap.values())
        .sort((a, b) => b.totalDonations - a.totalDonations)
        .slice(0, 10); // Get top 10 donors
      
      setTopDonors(sortedDonors);
    }
  }, [donations]);

  if (loading) {
    return (
      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">Top Donors</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading data...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">Top Donors</h3>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  if (topDonors.length === 0) {
    return (
      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">Top Donors</h3>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No data available</AlertTitle>
          <AlertDescription>
            There are no donations recorded yet.
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-card p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold mb-4">Top Donors</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Donor</TableHead>
              <TableHead>Total Donations</TableHead>
              <TableHead>Items Donated</TableHead>
              <TableHead>Last Donation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topDonors.map((donor, index) => (
              <TableRow key={donor.name}>
                <TableCell>
                  <Badge variant={index < 3 ? "default" : "secondary"}>
                    #{index + 1}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{donor.name}</TableCell>
                <TableCell>{donor.totalDonations}</TableCell>
                <TableCell>{donor.itemCount}</TableCell>
                <TableCell>
                  {new Date(donor.lastDonation).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
} 