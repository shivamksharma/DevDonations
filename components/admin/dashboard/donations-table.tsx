"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Trash2, CheckCircle, Package, Eye } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useDonationStore } from "@/lib/store/donations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Donation } from "@/lib/store/donations";

export function DonationsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [donationToDelete, setDonationToDelete] = useState<string | null>(null);
  const donations = useDonationStore((state) => state.donations);
  const updateDonationStatus = useDonationStore((state) => state.updateDonationStatus);
  const deleteDonation = useDonationStore((state) => state.deleteDonation);
  const fetchDonations = useDonationStore((state) => state.fetchDonations);
  const [viewingDonation, setViewingDonation] = useState<Donation | null>(null);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const handleStatusUpdate = async (id: string) => {
    updateDonationStatus(id, "completed");
    toast.success('Donation status updated');
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDonation(id);
      toast.success('Donation deleted');
      setDonationToDelete(null);
    } catch (error) {
      toast.error('Failed to delete donation');
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.address?.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesStatus = true;
    if (statusFilter !== 'all') {
      matchesStatus = donation.status === statusFilter;
    }
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      className="bg-card rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search donations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-3 py-2 rounded-md border"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Pickup Type</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{donation.name}</TableCell>
                <TableCell>{donation.whatsappNumber}</TableCell>
                <TableCell className="capitalize">{donation.pickupType}</TableCell>
                <TableCell>{donation.address || 'Drop-off'}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Package className="w-4 h-4 mr-2" />
                        {donation.items.reduce((acc, item) => acc + item.quantity, 0)} items
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium mb-2">Donated Items</h4>
                        <div className="flex flex-wrap gap-2">
                          {donation.items.map((item, index) => (
                            <Badge key={index} variant="secondary">
                              {item.quantity}x {item.type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    donation.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {donation.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setViewingDonation(donation)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {donation.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(donation.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDonationToDelete(donation.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewingDonation} onOpenChange={() => setViewingDonation(null)}>
        <DialogContent className="max-w-md sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
          </DialogHeader>
          {viewingDonation && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Donor Name</p>
                  <p className="font-medium">{viewingDonation.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Number</p>
                  <p className="font-medium">{viewingDonation.whatsappNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Type</p>
                  <p className="font-medium capitalize">{viewingDonation.pickupType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{viewingDonation.status}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">
                  {viewingDonation.address || 'Drop-off Location'}
                </p>
              </div>
              {viewingDonation.preferredDate && (
                <div>
                  <p className="text-sm text-muted-foreground">Preferred Date</p>
                  <p className="font-medium">
                    {new Date(viewingDonation.preferredDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
              {viewingDonation.preferredTime && (
                <div>
                  <p className="text-sm text-muted-foreground">Preferred Time</p>
                  <p className="font-medium capitalize">{viewingDonation.preferredTime}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Donated Items</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {viewingDonation.items.map((item, index) => (
                    <Badge key={index} variant="secondary">
                      {item.quantity}x {item.type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!donationToDelete} onOpenChange={() => setDonationToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this donation?</p>
          </div>
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setDonationToDelete(null)}
            >
              No
            </Button>
            <Button
              variant="destructive"
              onClick={() => donationToDelete && handleDelete(donationToDelete)}
            >
              Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}