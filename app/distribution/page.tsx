"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/distribution/event-card";
import { motion } from "framer-motion";

const events = [
  {
    id: 1,
    title: "Winter Clothing Distribution",
    location: "Community Center, Downtown",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
    description: "Distributed warm clothing to 200+ families in need"
  },
  {
    id: 2,
    title: "Back to School Drive",
    location: "Local School District",
    date: "2024-02-20",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
    description: "Provided school uniforms to underprivileged students"
  },
  {
    id: 3,
    title: "Emergency Relief Distribution",
    location: "Shelter Home",
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80",
    description: "Emergency clothing distribution for disaster-affected families"
  }
];

export default function DistributionPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Distribution Events
        </motion.h1>

        <motion.div 
          className="max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search events by location or description..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}