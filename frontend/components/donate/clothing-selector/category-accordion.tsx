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
    <Accordion type="single" collapsible className="w-full border rounded-lg">
      {categories.map((category, index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AccordionItem value={category} className="border-b last:border-b-0">
            <AccordionTrigger className="px-4 hover:bg-orange-50/50 dark:hover:bg-orange-950/10 transition-colors">
              <div className="flex items-center justify-between w-full pr-4">
                <span className="capitalize font-semibold">{category}</span>
                {getCategoryTotal(category) > 0 && (
                  <Badge className="ml-2 bg-orange-500 hover:bg-orange-600 text-white">
                    {getCategoryTotal(category)} items
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
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