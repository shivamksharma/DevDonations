"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVolunteerStore } from "@/lib/store/volunteers";
import { toast } from "@/hooks/use-toast";

export function VolunteersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const volunteers = useVolunteerStore((state) => state.volunteers);
  const updateVolunteerStatus = useVolunteerStore((state) => state.updateVolunteerStatus);
  const fetchVolunteers = useVolunteerStore((state) => state.fetchVolunteers);

  useEffect(() => {
    fetchVolunteers();
  }, [fetchVolunteers]);


  const filteredVolunteers = volunteers.filter((volunteer) => {
    const searchMatch =
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch =
      statusFilter === "all" || volunteer.status === statusFilter;

    return searchMatch && statusMatch;
  });

  return (
    <motion.div
      className="bg-card p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Volunteer Applications</h2>
        <Input
          type="text"
          placeholder="Search volunteers..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVolunteers.map((volunteer) => (
              <TableRow key={volunteer.id}>
                <TableCell>{volunteer.name}</TableCell>
                <TableCell>{volunteer.email}</TableCell>
                <TableCell>{volunteer.phone}</TableCell>
                <TableCell>{volunteer.role}</TableCell>
                <TableCell>{volunteer.status}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {volunteer.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            updateVolunteerStatus(volunteer.id, 'approved');
                            toast.success('Volunteer application approved');
                          }}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            updateVolunteerStatus(volunteer.id, 'rejected');
                            toast.success('Volunteer application rejected');
                          }}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}