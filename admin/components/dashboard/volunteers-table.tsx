"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Check, X, Users, Mail, Phone, UserCheck, Clock, UserX, Eye } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { useVolunteerStore } from "@/shared/lib/store/volunteers";
import { toast } from "@/shared/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export function VolunteersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [viewingVolunteer, setViewingVolunteer] = useState<any>(null);

  const volunteers = useVolunteerStore((state) => state.volunteers);
  const updateVolunteerStatus = useVolunteerStore((state) => state.updateVolunteerStatus);
  const fetchVolunteers = useVolunteerStore((state) => state.fetchVolunteers);

  useEffect(() => {
    fetchVolunteers();
  }, [fetchVolunteers]);

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateVolunteerStatus(id, status);
      toast.success(`Volunteer application ${status}`);
    } catch (error) {
      toast.error(`Failed to ${status} volunteer`);
    }
  };

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const searchMatch =
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch =
      statusFilter === "all" || volunteer.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'rejected':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return UserCheck;
      case 'pending':
        return Clock;
      case 'rejected':
        return UserX;
      default:
        return Users;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Volunteer Applications
        </CardTitle>
        <CardDescription>
          Review and manage volunteer applications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, email, or phone..."
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
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredVolunteers.length} volunteers
          </p>
          <div className="flex gap-2">
            <Badge variant="outline">
              {volunteers.filter(v => v.status === 'pending').length} pending
            </Badge>
            <Badge variant="outline">
              {volunteers.filter(v => v.status === 'approved').length} approved
            </Badge>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Volunteer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVolunteers.map((volunteer) => {
                const StatusIcon = getStatusIcon(volunteer.status);
                return (
                  <TableRow key={volunteer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{volunteer.name}</p>
                          <p className="text-sm text-muted-foreground">{volunteer.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{volunteer.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {volunteer.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StatusIcon className="h-4 w-4" />
                        <Badge 
                          variant={getStatusVariant(volunteer.status)}
                          className={`capitalize ${getStatusColor(volunteer.status)}`}
                        >
                          {volunteer.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {volunteer.appliedAt ? new Date(volunteer.appliedAt).toLocaleDateString() : 'N/A'}
                      </span>
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
                          <DropdownMenuItem onClick={() => setViewingVolunteer(volunteer)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {volunteer.status === 'pending' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-green-600"
                                onClick={() => handleStatusUpdate(volunteer.id, 'approved')}
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => handleStatusUpdate(volunteer.id, 'rejected')}
                              >
                                <X className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* View Volunteer Dialog */}
      <Dialog open={!!viewingVolunteer} onOpenChange={() => setViewingVolunteer(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Volunteer Application Details</DialogTitle>
          </DialogHeader>
          {viewingVolunteer && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p>{viewingVolunteer.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{viewingVolunteer.email}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{viewingVolunteer.phone}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <Badge variant="outline" className="capitalize w-fit">
                    {viewingVolunteer.role}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge 
                    variant={getStatusVariant(viewingVolunteer.status)}
                    className={`capitalize w-fit ${getStatusColor(viewingVolunteer.status)}`}
                  >
                    {viewingVolunteer.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Applied Date</p>
                  <p>
                    {viewingVolunteer.appliedAt 
                      ? new Date(viewingVolunteer.appliedAt).toLocaleDateString()
                      : 'N/A'
                    }
                  </p>
                </div>
              </div>
              
              {viewingVolunteer.message && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Message</p>
                  <p className="text-sm bg-muted p-3 rounded-md">
                    {viewingVolunteer.message}
                  </p>
                </div>
              )}

              {viewingVolunteer.status === 'pending' && (
                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={() => handleStatusUpdate(viewingVolunteer.id, 'approved')}
                    className="flex-1"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve Application
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleStatusUpdate(viewingVolunteer.id, 'rejected')}
                    className="flex-1"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject Application
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}