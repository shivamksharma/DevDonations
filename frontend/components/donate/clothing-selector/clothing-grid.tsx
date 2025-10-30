"use client";

import { motion } from "framer-motion";
import { ClothingType } from "@/shared/utils/constants/clothing-types";
import { QuantitySelector } from "./quantity-selector";

interface ClothingGridProps {
  items: ClothingType[];
  quantities: Record<string, number>;
  onQuantityChange: (id: string, value: number) => void;
}

export function ClothingGrid({ items, quantities, onQuantityChange }: ClothingGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <QuantitySelector
            id={item.id}
            label={item.label}
            value={quantities[item.id] || 0}
            onChange={(value) => onQuantityChange(item.id, value)}
          />
        </motion.div>
      ))}
    </div>
  );
}