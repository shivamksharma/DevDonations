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
  const { events, loading, error, fetchEvents, subscribeToEvents } = useEventStore();

  useEffect(() => {
    // Initial fetch
    fetchEvents();
    
    // Set up real-time subscription
    const unsubscribe = subscribeToEvents();
    
    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [fetchEvents, subscribeToEvents]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Distribution Events</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <EventsTable events={events} loading={loading} />

      <CreateEventDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </motion.div>
  );
} 