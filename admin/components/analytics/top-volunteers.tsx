"use client";

import { motion } from "framer-motion";
import { useVolunteerStore } from "@/shared/lib/store/volunteers";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";

interface TopVolunteer {
  name: string;
  email: string;
  role: string;
  tasksCompleted: number;
  status: string;
  appliedAt: string;
}

export function TopVolunteers() {
  const { volunteers, fetchVolunteers } = useVolunteerStore();
  const [topVolunteers, setTopVolunteers] = useState<TopVolunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        await fetchVolunteers();
      } catch (err) {
        console.error("Error fetching volunteers:", err);
        setError("Failed to load volunteer data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchVolunteers]);

  useEffect(() => {
    if (volunteers.length > 0) {
      // For now, we'll consider approved volunteers as those who have completed tasks
      // In a real application, you would track actual completed tasks
      const approvedVolunteers = volunteers
        .filter(volunteer => volunteer.status === 'approved')
        .map(volunteer => ({
          name: volunteer.name,
          email: volunteer.email,
          role: volunteer.role,
          tasksCompleted: 1, // This would be replaced with actual task count
          status: volunteer.status,
          appliedAt: volunteer.appliedAt
        }))
        .sort((a, b) => b.tasksCompleted - a.tasksCompleted)
        .slice(0, 10); // Get top 10 volunteers
      
      setTopVolunteers(approvedVolunteers);
    }
  }, [volunteers]);

  if (loading) {
    return (
      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">Top Volunteers</h3>
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
        <h3 className="text-lg font-semibold mb-4">Top Volunteers</h3>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  if (topVolunteers.length === 0) {
    return (
      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4">Top Volunteers</h3>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No data available</AlertTitle>
          <AlertDescription>
            There are no approved volunteers yet.
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
      <h3 className="text-lg font-semibold mb-4">Top Volunteers</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Tasks Completed</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topVolunteers.map((volunteer, index) => (
              <TableRow key={volunteer.email}>
                <TableCell>
                  <Badge variant={index < 3 ? "default" : "secondary"}>
                    #{index + 1}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{volunteer.name}</TableCell>
                <TableCell>{volunteer.role}</TableCell>
                <TableCell>{volunteer.tasksCompleted}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {volunteer.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
} 