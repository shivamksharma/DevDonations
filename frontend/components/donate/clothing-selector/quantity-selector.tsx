"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useState } from "react";
import { cn } from "@/shared/utils/utils";

interface QuantitySelectorProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({ id, label, value, onChange }: QuantitySelectorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleIncrement = () => onChange(value + 1);
  const handleDecrement = () => value > 0 && onChange(value - 1);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      onChange(newValue);
    }
  };

  return (
    <motion.div 
      className={cn(
        "flex items-center justify-between p-3 bg-card rounded-lg border-2 transition-all",
        isFocused && "border-orange-500 shadow-sm",
        !isFocused && value > 0 && "border-orange-300 bg-orange-50/30 dark:bg-orange-950/10",
        !isFocused && value === 0 && "border-border hover:border-orange-200"
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <label htmlFor={id} className="text-sm font-medium flex-1">
        {label}
      </label>
      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={value === 0}
          className={cn(
            "h-8 w-8 rounded-md transition-colors",
            value > 0 && "hover:bg-orange-100 hover:text-orange-700 hover:border-orange-300 dark:hover:bg-orange-950/30"
          )}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <Input
          type="number"
          id={id}
          min="0"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-14 text-center h-8 px-1 font-semibold border-2",
            value > 0 && "text-orange-600 dark:text-orange-400"
          )}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          className="h-8 w-8 rounded-md hover:bg-orange-100 hover:text-orange-700 hover:border-orange-300 dark:hover:bg-orange-950/30 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}