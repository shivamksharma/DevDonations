"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEventStore } from "@/lib/store/events";
import { EventsTable } from "@/components/admin/events/events-table";
import { CreateEventDialog } from "@/components/admin/events/create-event-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function EventsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { events, fetchEvents } = useEventStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setError(null);
        await fetchEvents();
      } catch (err) {
        console.error("Error loading events:", err);
        setError("Failed to load events. Please try again.");
      }
    };

    loadEvents();
  }, [fetchEvents]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Distribution Events</h1>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </motion.div>

      <EventsTable events={events} />

      <CreateEventDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
} 