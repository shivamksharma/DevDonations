"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { DROP_OFF_LOCATIONS } from "@/lib/constants/donation-constants";

export function DropOffLocations() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 space-y-4"
    >
      <div className="bg-primary/5 p-4 rounded-lg">
        <h4 className="font-medium text-sm text-primary mb-2">Drop-off Locations</h4>
        <div className="grid gap-4 md:grid-cols-2">
          {DROP_OFF_LOCATIONS.map((location) => (
            <div
              key={location.id}
              className="bg-background p-4 rounded-lg border"
            >
              <h5 className="font-medium mb-2">{location.name}</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 shrink-0" />
                  <span>{location.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-1 shrink-0" />
                  <span>{location.hours}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-1 shrink-0" />
                  <span>{location.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}