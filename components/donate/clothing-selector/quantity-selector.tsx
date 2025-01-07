"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
      className={`flex items-center justify-between p-3 bg-card rounded-lg border ${
        isFocused ? "border-primary" : value > 0 ? "border-primary/50" : "border-border"
      }`}
      whileHover={{ scale: 1.01 }}
    >
      <label htmlFor={id} className="text-sm font-medium flex-1">
        {label}
      </label>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={value === 0}
          className="h-7 w-7"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Input
          type="number"
          id={id}
          min="0"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-14 text-center h-7 px-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          className="h-7 w-7"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  );
}