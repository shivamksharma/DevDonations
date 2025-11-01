"use client";

import { UseFormReturn } from "react-hook-form";
import { User, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { DonationFormData } from "@/shared/utils/schemas/donation-form-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

interface StepOneProps {
  form: UseFormReturn<DonationFormData>;
}

export function StepOneUserInfo({ form }: StepOneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 py-4"
    >
      <div className="space-y-2 text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Welcome!</h2>
        <p className="text-muted-foreground">
          Let's start with your basic information
        </p>
      </div>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground/80 flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-orange-500" />
              Full Name
              <span className="text-destructive ml-1">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="John Doe" 
                  {...field} 
                  className="pl-10 h-12 text-base border-2 focus:border-orange-500 focus-visible:ring-orange-500"
                />
              </div>
            </FormControl>
            <FormMessage className="mt-1.5" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="whatsappNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground/80 flex items-center gap-2 text-base">
              <Phone className="h-4 w-4 text-orange-500" />
              WhatsApp Number
              <span className="text-destructive ml-1">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="9876543210" 
                  {...field} 
                  className="pl-10 h-12 text-base border-2 focus:border-orange-500 focus-visible:ring-orange-500"
                  maxLength={10}
                />
              </div>
            </FormControl>
            <FormMessage className="mt-1.5" />
            <p className="text-sm text-muted-foreground mt-2">
              We'll use this to coordinate the donation pickup or confirm drop-off
            </p>
          </FormItem>
        )}
      />
    </motion.div>
  );
}
