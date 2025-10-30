"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useEventStore } from "@/shared/lib/store/events";
import type { DistributionEvent } from "@/shared/lib/firebase/events";
import { EventDetailModal } from "./event-detail-modal";

export function DistributionEventsSection() {
  const { events, fetchEvents } = useEventStore();
  const [selectedEvent, setSelectedEvent] = useState<DistributionEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleEventClick = (event: DistributionEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: DistributionEvent["status"]) => {
    switch (status) {
      case "upcoming":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950";
      case "ongoing":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950";
      case "completed":
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800";
      case "cancelled":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-950";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <section 
        id="distribution" 
        className="min-h-screen flex items-center justify-center py-32 px-6 bg-gradient-to-b from-background to-secondary/30"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
              Distribution & Events
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto mb-8" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Join us in making a difference through our ongoing and past donation drives
            </p>
          </motion.div>

          {events.length === 0 ? (
            <motion.div
              className="text-center text-muted-foreground py-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No events available at the moment.</p>
              <p className="text-sm mt-2">Check back soon for upcoming distribution drives!</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => handleEventClick(event)}
                >
                  <motion.div
                    className="bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Event Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                      {event.imageUrl ? (
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm">{formatDate(event.date)}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {event.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-border/50">
                        <span className="text-sm font-medium text-primary group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                          Learn More
                          <svg 
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
