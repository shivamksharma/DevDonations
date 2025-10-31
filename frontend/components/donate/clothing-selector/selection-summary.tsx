"use client";

import { motion } from "framer-motion";
import { Package, CheckCircle } from "lucide-react";
import { CLOTHING_TYPES } from "@/shared/utils/constants/clothing-types";

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
      className="mt-6 p-5 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg border-2 border-orange-200 dark:border-orange-800"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-orange-500 rounded-lg">
          <CheckCircle className="h-4 w-4 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-orange-600 dark:text-orange-400">
            Selection Summary
          </h4>
          <p className="text-sm text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedItems.map(item => (
          <div
            key={item.label}
            className="bg-background px-3 py-2 rounded-md text-sm font-medium border border-orange-200 dark:border-orange-800 flex items-center gap-2"
          >
            <Package className="h-3 w-3 text-orange-500" />
            <span>{item.label}</span>
            <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
              {item.quantity}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}