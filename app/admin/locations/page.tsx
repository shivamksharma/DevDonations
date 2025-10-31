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
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <MapPin className="h-8 w-8 text-orange-500" />
            Drop-off Locations
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage drop-off centers where donors can bring their donations
          </p>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>

      {/* Stats Card */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg">Overview</CardTitle>
          <CardDescription>
            Quick statistics about your drop-off locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <p className="text-sm font-medium text-muted-foreground">
                  Total Locations
                </p>
              </div>
              <p className="mt-2 text-3xl font-bold">{locations.length}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <p className="text-sm font-medium text-muted-foreground">
                  Active Cities
                </p>
              </div>
              <p className="mt-2 text-3xl font-bold">
                {new Set(locations.map((l) => l.city)).size}
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <p className="text-sm font-medium text-muted-foreground">
                  Active States
                </p>
              </div>
              <p className="mt-2 text-3xl font-bold">
                {new Set(locations.map((l) => l.state)).size}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Locations Table */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg">All Locations</CardTitle>
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
