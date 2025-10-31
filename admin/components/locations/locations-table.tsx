"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Edit2, Trash2, MapPin, Phone, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
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
import { DropoffLocation } from "@/shared/utils/types/admin";
import { deleteDropoffLocation } from "@/services/firebase/dropoff-locations";
import { toast } from "sonner";

interface LocationsTableProps {
  locations: DropoffLocation[];
  onEdit: (location: DropoffLocation) => void;
  onDelete: () => void;
}

export function LocationsTable({ locations, onEdit, onDelete }: LocationsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<DropoffLocation | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (location: DropoffLocation) => {
    setLocationToDelete(location);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!locationToDelete) return;

    setIsDeleting(true);
    try {
      await deleteDropoffLocation(locationToDelete.id);
      toast.success("Location deleted successfully");
      onDelete();
    } catch (error) {
      console.error("Error deleting location:", error);
      toast.error("Failed to delete location");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setLocationToDelete(null);
    }
  };

  if (locations.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <MapPin className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-semibold">No locations found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Get started by adding your first drop-off location.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Location Name</TableHead>
              <TableHead className="font-semibold">Address</TableHead>
              <TableHead className="font-semibold">City</TableHead>
              <TableHead className="font-semibold">State</TableHead>
              <TableHead className="font-semibold">Pincode</TableHead>
              <TableHead className="font-semibold">Contact</TableHead>
              <TableHead className="font-semibold">Last Updated</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    {location.name}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="truncate text-sm text-muted-foreground">
                    {location.address}
                  </div>
                </TableCell>
                <TableCell>{location.city}</TableCell>
                <TableCell>{location.state}</TableCell>
                <TableCell>
                  <Badge variant="outline">{location.pincode}</Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-xs">
                    {location.phone && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {location.phone}
                      </div>
                    )}
                    {location.hours && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {location.hours}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {location.updatedAt
                      ? format(new Date(location.updatedAt), "MMM dd, yyyy")
                      : "N/A"}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(location)}
                      className="hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/20"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(location)}
                      className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the location{" "}
              <span className="font-semibold">{locationToDelete?.name}</span>. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
