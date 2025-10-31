"use client";

import { motion } from "framer-motion";
import { Shirt } from "lucide-react";
import { ClothingFormSection } from "../clothing-form-section";

export function StepThreeItems() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 py-4"
    >
      <div className="space-y-2 text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-orange-100 dark:bg-orange-950/30 rounded-full">
            <Shirt className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground">Select Items</h2>
        <p className="text-muted-foreground">
          Choose the clothing items you'd like to donate
        </p>
      </div>

      <ClothingFormSection />
    </motion.div>
  );
}
