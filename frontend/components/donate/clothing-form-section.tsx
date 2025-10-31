"use client";

import { useFormContext } from "react-hook-form";
import { CategoryAccordion } from "./clothing-selector/category-accordion";
import { SelectionSummary } from "./clothing-selector/selection-summary";
import { useState, useEffect } from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Package } from "lucide-react";

interface ClothingQuantities {
  [key: string]: number;
}

export function ClothingFormSection() {
  const { setValue, formState: { errors }, watch } = useFormContext();
  const [quantities, setQuantities] = useState<ClothingQuantities>({});

  // Watch for form reset by monitoring the items field
  const items = watch('items');
  useEffect(() => {
    if (items.length === 0) {
      setQuantities({});
    }
  }, [items]);

  const handleQuantityChange = (id: string, value: number) => {
    setQuantities(prev => {
      const newQuantities = {
        ...prev,
        [id]: value
      };
      
      // Convert quantities to items array for form submission
      const items = Object.entries(newQuantities)
        .filter(([_, qty]) => qty > 0)
        .map(([type, quantity]) => ({ type, quantity }));
      
      setValue('items', items);
      return newQuantities;
    });
  };

  return (
    <FormField
      name="items"
      render={() => (
        <FormItem className="space-y-4">
          <FormLabel className="text-lg font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-orange-500" />
            Select Clothing Items
            <span className="text-destructive ml-1">*</span>
          </FormLabel>
          <p className="text-sm text-muted-foreground -mt-2">
            Choose the items you'd like to donate and specify quantities
          </p>
          <CategoryAccordion
            quantities={quantities}
            onQuantityChange={handleQuantityChange}
          />
          <SelectionSummary quantities={quantities} />
          {errors.items && (
            <FormMessage className="mt-2 bg-destructive/10 p-3 rounded-md">
              Please select at least one item to donate
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}