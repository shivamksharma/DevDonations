"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ClothingQuantityInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function ClothingQuantityInput({ 
  id, 
  label, 
  value, 
  onChange 
}: ClothingQuantityInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      onChange(newValue);
    }
  };

  return (
    <motion.div 
      className={`flex items-center justify-between p-4 bg-card rounded-lg border ${
        isFocused ? "border-primary" : "border-border"
      }`}
      whileHover={{ scale: 1.01 }}
      animate={{ borderColor: isFocused ? "hsl(var(--primary))" : "hsl(var(--border))" }}
    >
      <label htmlFor={id} className="text-sm font-medium flex-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={value === 0}
          className="h-8 w-8"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          id={id}
          min="0"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-16 text-center"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          className="h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
