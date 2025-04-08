"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import type { DistributionEvent } from "@/lib/firebase/events";

interface EventCardProps {
  event: DistributionEvent;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-card rounded-lg overflow-hidden shadow-lg"
    >
      {event.imageUrl && (
        <div className="relative h-48">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.location}</span>
        </div>
        <div className="flex items-center text-muted-foreground mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <p className="text-muted-foreground mb-4">{event.description}</p>
      </div>
    </motion.div>
  );
}