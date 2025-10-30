"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/shared/utils/utils";

interface RoleCardProps {
  id: string;
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

export function RoleCard({ id, label, description, selected, onSelect }: RoleCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "cursor-pointer p-4 rounded-lg border-2 transition-colors",
        selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center",
          selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
        )}>
          {selected && <Check className="w-3 h-3" />}
        </div>
        <div>
          <h3 className="font-medium mb-1">{label}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}