"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { DropoffLocation } from "@/shared/utils/types/admin";
import { subscribeToDropoffLocations } from "@/services/firebase/dropoff-locations";

interface DropOffLocationsProps {
  selectedLocation?: string;
  onLocationChange?: (locationId: string) => void;
}

export function DropOffLocations({ selectedLocation, onLocationChange }: DropOffLocationsProps) {
  const [locations, setLocations] = useState<DropoffLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to real-time updates from Firebase
    const unsubscribe = subscribeToDropoffLocations((updatedLocations) => {
      setLocations(updatedLocations);
      setIsLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-4">
        <div className="bg-orange-50/50 dark:bg-orange-950/20 p-8 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-center gap-3 text-orange-600 dark:text-orange-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="font-medium">Loading drop-off locations...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4">
        <div className="bg-red-50/50 dark:bg-red-950/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
            <AlertCircle className="h-5 w-5" />
            <div>
              <p className="font-medium">Failed to load locations</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="mt-4">
        <div className="bg-orange-50/50 dark:bg-orange-950/20 p-8 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="text-center">
            <MapPin className="mx-auto h-12 w-12 text-orange-300 dark:text-orange-700 mb-3" />
            <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
              No Drop-off Locations Available
            </h4>
            <p className="text-sm text-muted-foreground">
              Please contact us or choose the pickup option instead.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 space-y-4"
    >
      <div className="bg-orange-50/50 dark:bg-orange-950/20 p-5 rounded-lg border border-orange-200 dark:border-orange-800">
        <h4 className="font-semibold text-base text-orange-600 dark:text-orange-400 mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Select Your Preferred Drop-off Location
          <span className="text-destructive ml-1">*</span>
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          {locations.map((location) => (
            <motion.div
              key={location.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => onLocationChange?.(location.id)}
              className={cn(
                "bg-background p-5 rounded-lg border-2 cursor-pointer transition-all shadow-sm hover:shadow-md relative",
                selectedLocation === location.id 
                  ? "border-orange-500 bg-orange-50/30 dark:bg-orange-950/10 shadow-lg" 
                  : "border-border hover:border-orange-300"
              )}
            >
              {selectedLocation === location.id && (
                <div className="absolute top-3 right-3 bg-orange-500 rounded-full p-1">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              )}
              <h5 className="font-semibold mb-3 text-foreground pr-8">{location.name}</h5>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-orange-500" />
                  <div className="text-muted-foreground">
                    <div>{location.address}</div>
                    <div>{location.city}, {location.state} - {location.pincode}</div>
                  </div>
                </div>
                {location.hours && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 mt-0.5 shrink-0 text-orange-500" />
                    <span className="text-muted-foreground">{location.hours}</span>
                  </div>
                )}
                {location.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-0.5 shrink-0 text-orange-500" />
                    <span className="text-muted-foreground">{location.phone}</span>
                  </div>
                )}
                {location.description && (
                  <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                    {location.description}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground text-center bg-background/50 p-3 rounded-md">
          Click on a location to select it. You can visit during operating hours to drop off your donations.
        </p>
      </div>
    </motion.div>
  );
}