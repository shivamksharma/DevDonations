"use client";

import { UseFormReturn } from "react-hook-form";
import { MapPin, Calendar, Clock as ClockIcon, MessageSquare, Home, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/shared/utils/utils";
import { DonationFormData } from "@/shared/utils/schemas/donation-form-schema";
import { PICKUP_TYPES, TIME_SLOTS } from "@/shared/utils/constants/donation-constants";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Calendar as CalendarComponent } from "@/shared/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { DropOffLocations } from "../drop-off-locations";

interface StepTwoProps {
  form: UseFormReturn<DonationFormData>;
}

export function StepTwoDonationMethod({ form }: StepTwoProps) {
  const pickupType = form.watch("pickupType");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 py-4"
    >
      <div className="space-y-2 text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">Donation Method</h2>
        <p className="text-muted-foreground">
          How would you like to donate your items?
        </p>
      </div>

      <FormField
        control={form.control}
        name="pickupType"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid gap-4"
              >
                {PICKUP_TYPES.map((type) => (
                  <FormItem key={type.id} className="relative">
                    <FormControl>
                      <RadioGroupItem 
                        value={type.id} 
                        className="sr-only peer" 
                        id={`pickup-${type.id}`}
                      />
                    </FormControl>
                    <FormLabel 
                      htmlFor={`pickup-${type.id}`}
                      className={cn(
                        "flex items-center gap-4 p-6 rounded-xl border-2 cursor-pointer transition-all",
                        "hover:border-orange-300 hover:shadow-md",
                        "peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-50/50 peer-data-[state=checked]:shadow-lg",
                        "dark:peer-data-[state=checked]:bg-orange-950/20"
                      )}
                    >
                      <div className={cn(
                        "p-3 rounded-lg transition-colors",
                        field.value === type.id 
                          ? "bg-orange-500 text-white" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        {type.id === "pickup" ? (
                          <Home className="h-6 w-6" />
                        ) : (
                          <Building2 className="h-6 w-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-lg block mb-1">
                          {type.label}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {type.id === "pickup" 
                            ? "We'll collect items from your doorstep" 
                            : "Drop off at our nearest center"}
                        </span>
                      </div>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <AnimatePresence mode="wait">
        {pickupType === "pickup" && (
          <motion.div
            key="pickup-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-6 overflow-hidden"
          >
            <div className="bg-orange-50/50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <h3 className="text-lg font-semibold text-foreground/90 flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-orange-500" />
                Pickup Details
              </h3>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-orange-500" />
                        Pickup Address
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your complete address with landmark"
                          className="min-h-[100px] text-base border-2 focus:border-orange-500 focus-visible:ring-orange-500 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="mt-1.5" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-foreground/80 flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-orange-500" />
                          Preferred Date
                          <span className="text-destructive ml-1">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "text-left font-normal h-12 text-base justify-start w-full border-2",
                                  "hover:border-orange-300 focus:border-orange-500",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={(date) => {
                                if (date) {
                                  field.onChange(date.toISOString());
                                }
                              }}
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                const checkDate = new Date(date);
                                checkDate.setHours(0, 0, 0, 0);
                                return checkDate < today || checkDate > new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="mt-1.5" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-foreground/80 flex items-center gap-2 mb-2">
                          <ClockIcon className="h-4 w-4 text-orange-500" />
                          Time Slot
                          <span className="text-destructive ml-1">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-base border-2 hover:border-orange-300 focus:border-orange-500">
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TIME_SLOTS.map((slot) => (
                              <SelectItem key={slot.id} value={slot.id} className="text-base py-3">
                                <div className="flex items-center gap-2">
                                  <ClockIcon className="h-4 w-4 text-orange-500" />
                                  {slot.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="mt-1.5" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {pickupType === "dropoff" && (
          <motion.div
            key="dropoff-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <FormField
              control={form.control}
              name="dropoffLocation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DropOffLocations 
                      selectedLocation={field.value}
                      onLocationChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground/80 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-orange-500" />
              Additional Notes (Optional)
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any special instructions or notes..."
                className="min-h-[100px] text-base border-2 focus:border-orange-500 focus-visible:ring-orange-500 resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage className="mt-1.5" />
          </FormItem>
        )}
      />
    </motion.div>
  );
}
