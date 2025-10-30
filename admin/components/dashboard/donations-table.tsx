"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Trash2, CheckCircle, Package, Eye, Filter, MoreHorizontal, Calendar } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { toast } from "@/shared/hooks/use-toast";
import { Badge } from "@/shared/components/ui/badge";
import { useDonationStore } from "@/shared/lib/store/donations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Donation } from "@/shared/lib/store/donations";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/shared/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

export function DonationsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [pickupTypeFilter, setPickupTypeFilter] = useState<'all' | 'pickup' | 'drop-off'>('all');
  const [donationToDelete, setDonationToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const donations = useDonationStore((state) => state.donations);
  const updateDonationStatus = useDonationStore((state) => state.updateDonationStatus);
  const deleteDonation = useDonationStore((state) => state.deleteDonation);
  const fetchDonations = useDonationStore((state) => state.fetchDonations);
  const [viewingDonation, setViewingDonation] = useState<Donation | null>(null);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const handleStatusUpdate = async (id: string) => {
    try {
      await updateDonationStatus(id, "completed");
      toast.success('Donation marked as completed');
    } catch (error) {
      toast.error('Failed to update donation status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDonation(id);
      toast.success('Donation deleted successfully');
      setDonationToDelete(null);
    } catch (error) {
      toast.error('Failed to delete donation');
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.whatsappNumber.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    const matchesPickupType = pickupTypeFilter === 'all' || donation.pickupType === pickupTypeFilter;
    
    return matchesSearch && matchesStatus && matchesPickupType;
  });

  const totalPages = Math.ceil(filteredDonations.length / ITEMS_PER_PAGE);
  const paginatedDonations = filteredDonations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Donations Management
        </CardTitle>
        <CardDescription>
          Manage and track all donation requests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, address, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={pickupTypeFilter} onValueChange={(value: any) => setPickupTypeFilter(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Pickup Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pickup">Pickup</SelectItem>
              <SelectItem value="drop-off">Drop-off</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedDonations.length} of {filteredDonations.length} donations
          </p>
          <Badge variant="outline">
            {donations.filter(d => d.status === 'pending').length} pending
          </Badge>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{donation.name}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-32">
                        {donation.address || 'Drop-off location'}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{donation.whatsappNumber}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {donation.pickupType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {donation.items.reduce((acc, item) => acc + item.quantity, 0)} items
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getStatusVariant(donation.status)}
                      className={`capitalize ${getStatusColor(donation.status)}`}
                    >
                      {donation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {donation.createdAt ? new Date(donation.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setViewingDonation(donation)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {donation.status === 'pending' && (
                          <DropdownMenuItem onClick={() => handleStatusUpdate(donation.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Complete
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => setDonationToDelete(donation.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>

      {/* View Donation Dialog */}
      <Dialog open={!!viewingDonation} onOpenChange={() => setViewingDonation(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
          </DialogHeader>
          {viewingDonation && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Donor Name</p>
                  <p>{viewingDonation.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Contact Number</p>
                  <p>{viewingDonation.whatsappNumber}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Pickup Type</p>
                  <Badge variant="outline" className="capitalize w-fit">
                    {viewingDonation.pickupType}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge 
                    variant={getStatusVariant(viewingDonation.status)}
                    className={`capitalize w-fit ${getStatusColor(viewingDonation.status)}`}
                  >
                    {viewingDonation.status}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                <p className="text-sm bg-muted p-3 rounded-md">
                  {viewingDonation.address || 'Drop-off Location'}
                </p>
              </div>

              {viewingDonation.preferredDate && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Preferred Date</p>
                    <p>
                      {new Date(viewingDonation.preferredDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  {viewingDonation.preferredTime && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Preferred Time</p>
                      <p className="capitalize">{viewingDonation.preferredTime}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Donated Items</p>
                <div className="flex flex-wrap gap-2">
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!donationToDelete} onOpenChange={() => setDonationToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the donation record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => donationToDelete && handleDelete(donationToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}