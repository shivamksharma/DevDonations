"use client";

import { useState, useEffect } from "react";
import { Plus, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { LocationsTable } from "@/admin/components/locations/locations-table";
import { LocationEditorDialog } from "@/admin/components/locations/location-editor-dialog";
import { DropoffLocation } from "@/shared/utils/types/admin";
import { subscribeToDropoffLocations } from "@/services/firebase/dropoff-locations";

export default function LocationsPage() {
  const [locations, setLocations] = useState<DropoffLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<DropoffLocation | null>(null);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = subscribeToDropoffLocations((updatedLocations) => {
      setLocations(updatedLocations);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddNew = () => {
    setSelectedLocation(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (location: DropoffLocation) => {
    setSelectedLocation(location);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedLocation(null);
  };

  const handleSuccess = () => {
    // No need to manually refresh - real-time subscription handles it
  };

  const handleDelete = () => {
    // No need to manually refresh - real-time subscription handles it
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Drop-off Locations</h1>
          <p className="text-muted-foreground">
            Manage drop-off centers where donors can bring their donations
          </p>
        </div>
        <Button
          onClick={handleAddNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}</div>
            <p className="text-xs text-muted-foreground">
              Active drop-off points
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cities</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(locations.map((l) => l.city)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Cities covered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active States</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(locations.map((l) => l.state)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              States with locations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Locations Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Locations</CardTitle>
          <CardDescription>
            View and manage all drop-off locations in your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
          ) : (
            <LocationsTable
              locations={locations}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </CardContent>
      </Card>

      {/* Editor Dialog */}
      <LocationEditorDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        location={selectedLocation}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
