"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { CLOTHING_TYPES } from "@/lib/constants/clothing-types";

interface SelectionSummaryProps {
  quantities: Record<string, number>;
}

export function SelectionSummary({ quantities }: SelectionSummaryProps) {
  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const selectedItems = Object.entries(quantities)
    .filter(([_, value]) => value > 0)
    .map(([id, value]) => ({
      label: CLOTHING_TYPES.find(type => type.id === id)?.label || '',
      quantity: value
    }));

  if (totalItems === 0) return null;

  return (
    <motion.div
      className="mt-4 p-4 bg-secondary rounded-lg"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Package className="h-4 w-4" />
        <h4 className="font-medium">Selected Items ({totalItems})</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedItems.map(item => (
          <div
            key={item.label}
            className="bg-background px-2 py-1 rounded-md text-sm"
          >
            {item.label}: {item.quantity}
          </div>
        ))}
      </div>
    </motion.div>
  );
}