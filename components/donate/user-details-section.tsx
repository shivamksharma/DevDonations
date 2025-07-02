"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Phone, MapPin, Clock as ClockIcon, MessageSquare } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { DonationFormData } from "@/lib/schemas/donation-form-schema";
import { PICKUP_TYPES, TIME_SLOTS } from "@/lib/constants/donation-constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DropOffLocations } from "./drop-off-locations";

interface UserDetailsSectionProps {
  form: UseFormReturn<DonationFormData>;
}

export function UserDetailsSection({ form }: UserDetailsSectionProps) {
  const pickupType = form.watch("pickupType");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold mb-6 text-foreground/90 flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        Your Information
      </h3>
      
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="mb-5">
            <FormLabel className="text-foreground/80 flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
              <span className="text-destructive ml-1">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="John Doe" 
                  {...field} 
                  className="pl-10 h-12 text-base"
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
          <FormItem className="mb-5">
            <FormLabel className="text-foreground/80 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              WhatsApp Number
              <span className="text-destructive ml-1">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="+91 98765 43210" 
                  {...field} 
                  className="pl-10 h-12 text-base"
                />
              </div>
            </FormControl>
            <FormMessage className="mt-1.5" />
          </FormItem>
        )}
      />

      <div className="bg-muted/30 p-6 rounded-xl mb-6">
        <h3 className="text-lg font-semibold mb-6 text-foreground/90 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Donation Method
        </h3>
        
        <FormField
          control={form.control}
          name="pickupType"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-medium text-foreground/80">
                How would you like to donate?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid gap-4 md:grid-cols-2"
                >
                  {PICKUP_TYPES.map((type) => (
                    <FormItem key={type.id} className="relative">
                      <FormControl>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <RadioGroupItem value={type.id} className="h-5 w-5" />
                        </div>
                      </FormControl>
                      <FormLabel 
                        className={cn(
                          "flex flex-col p-4 pl-12 rounded-lg border-2 border-muted-foreground/20 hover:border-primary/50 transition-colors cursor-pointer",
                          field.value === type.id && "border-primary bg-primary/5"
                        )}
                      >
                        <span className="font-medium text-foreground">
                          {type.label}
                        </span>
                        {type.id === "pickup" && (
                          <span className="text-sm text-muted-foreground mt-1">
                            We'll pick up from your location
                          </span>
                        )}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <AnimatePresence mode="wait">
        {pickupType === "pickup" && (
          <motion.div
            key="pickup"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 overflow-hidden"
          >
            <h3 className="text-lg font-semibold text-foreground/90 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Pickup Details
            </h3>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        placeholder="Enter your complete address with landmark"
                        className="min-h-[120px] pl-10 pt-3 text-base"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1.5" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-foreground/80 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Preferred Date
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-10 text-left font-normal h-12 text-base justify-start w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="absolute left-3 h-4 w-4 opacity-80" />
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => date && field.onChange(date.toISOString())}
                          disabled={(date) =>
                            date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                          }
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
                  <FormItem>
                    <FormLabel className="text-foreground/80 flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" />
                      Preferred Time Slot
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <div className="relative">
                          <ClockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <SelectTrigger className="pl-10 h-12 text-base">
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot.id} value={slot.id} className="text-base py-3">
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="mt-1.5" />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        )}

        {pickupType === "dropoff" && (
          <motion.div
            key="dropoff"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 overflow-hidden"
          >
            <h3 className="text-lg font-semibold text-foreground/90 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Drop-off Locations
            </h3>
            <DropOffLocations />
          </motion.div>
        )}
      </AnimatePresence>

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-foreground/80 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Additional Notes (Optional)
            </FormLabel>
            <FormControl>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                <Textarea
                  placeholder="Any special instructions or notes..."
                  className="min-h-[120px] pl-10 pt-3 text-base"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage className="mt-1.5" />
          </FormItem>
        )}
      />
    </motion.div>
  );
}