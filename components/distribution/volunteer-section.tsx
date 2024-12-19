"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VolunteerSection() {
  return (
    <motion.div 
      className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-lg text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="inline-block p-3 bg-primary/10 rounded-full mb-6"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Users className="h-8 w-8 text-primary" />
      </motion.div>
      <h2 className="text-2xl font-bold mb-4">Become a Volunteer</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Join our community of volunteers and help make a difference in people's lives. 
        We're always looking for passionate individuals to help with our distribution events.
      </p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button size="lg" className="font-semibold">
          Join as Volunteer
        </Button>
      </motion.div>
    </motion.div>
  );
}