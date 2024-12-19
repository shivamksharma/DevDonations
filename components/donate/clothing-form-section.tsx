"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CLOTHING_TYPES } from "@/lib/constants/clothing-types";
import { ClothingQuantityInput } from "./clothing-quantity-input";

interface ClothingQuantities {
  [key: string]: number;
}

export function ClothingFormSection() {
  const [quantities, setQuantities] = useState<ClothingQuantities>(
    Object.fromEntries(CLOTHING_TYPES.map(type => [type.id, 0]))
  );

  const handleQuantityChange = (id: string, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const categories = Array.from(
    new Set(CLOTHING_TYPES.map(type => type.category))
  );

  return (
    <div className="space-y-6">
      <motion.h3
        className="text-lg font-semibold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Select Clothing Items
      </motion.h3>
      
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
        >
          <h4 className="text-md font-medium capitalize mb-3">{category}</h4>
          <div className="space-y-2">
            {CLOTHING_TYPES
              .filter(type => type.category === category)
              .map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                >
                  <ClothingQuantityInput
                    id={type.id}
                    label={type.label}
                    value={quantities[type.id]}
                    onChange={(value) => handleQuantityChange(type.id, value)}
                  />
                </motion.div>
              ))}
          </div>
        </motion.div>
      ))}

      <motion.div
        className="mt-4 p-4 bg-secondary rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-medium mb-2">Summary</h4>
        <p className="text-sm text-muted-foreground">
          Total items: {Object.values(quantities).reduce((a, b) => a + b, 0)}
        </p>
        <div className="text-sm text-muted-foreground">
          {Object.entries(quantities)
            .filter(([_, value]) => value > 0)
            .map(([id, value]) => (
              <span key={id} className="inline-block mr-4">
                {CLOTHING_TYPES.find(type => type.id === id)?.label}: {value}
              </span>
            ))}
        </div>
      </motion.div>
    </div>
  );
}