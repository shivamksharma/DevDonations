"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Badge } from "@/shared/components/ui/badge";
import { ClothingGrid } from "./clothing-grid";
import { CLOTHING_TYPES } from "@/shared/utils/constants/clothing-types";

interface CategoryAccordionProps {
  quantities: Record<string, number>;
  onQuantityChange: (id: string, value: number) => void;
}

export function CategoryAccordion({ quantities, onQuantityChange }: CategoryAccordionProps) {
  const categories = Array.from(new Set(CLOTHING_TYPES.map(type => type.category)));
  
  const getCategoryTotal = (category: string) => {
    return CLOTHING_TYPES
      .filter(type => type.category === category)
      .reduce((total, type) => total + (quantities[type.id] || 0), 0);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {categories.map((category, index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AccordionItem value={category}>
            <AccordionTrigger className="flex items-center justify-between">
              <span className="capitalize">{category}</span>
              {getCategoryTotal(category) > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getCategoryTotal(category)} items
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <ClothingGrid
                items={CLOTHING_TYPES.filter(type => type.category === category)}
                quantities={quantities}
                onQuantityChange={onQuantityChange}
              />
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
}