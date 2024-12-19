"use client";

import { motion } from "framer-motion";
import { AVAILABILITY_OPTIONS } from "@/lib/constants/volunteer-types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AvailabilitySectionProps {
  selected: string[];
  onSelect: (id: string) => void;
}

export function AvailabilitySection({ selected, onSelect }: AvailabilitySectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {AVAILABILITY_OPTIONS.map((option, index) => (
        <motion.div
          key={option.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start",
              selected.includes(option.id) && "border-primary bg-primary/5"
            )}
            onClick={() => onSelect(option.id)}
          >
            {option.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}