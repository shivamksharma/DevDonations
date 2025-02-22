"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PICKUP_TYPES, TIME_SLOTS } from "@/lib/constants/donation-constants";
import { DropOffLocations } from "./drop-off-locations";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useWatch } from "react-hook-form";
import { UseFormReturn } from "react-hook-form";
import { DonationFormData } from "@/lib/schemas/donation-form-schema";

interface UserDetailsSectionProps {
  form: UseFormReturn<DonationFormData>;
}

export function UserDetailsSection({ form }: UserDetailsSectionProps) {
  const pickupType = useWatch({
    control: form.control,
    name: "pickupType",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Full Name
              <span className="text-destructive ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="whatsappNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              WhatsApp Number
              <span className="text-destructive ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="+1234567890" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pickupType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Pickup Type
              <span className="text-destructive ml-1">*</span>
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {PICKUP_TYPES.map((type) => (
                  <FormItem
                    key={type.id}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={type.id} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {type.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <AnimatePresence>
        {pickupType === "dropoff" && <DropOffLocations />}
      </AnimatePresence>

      {pickupType === "pickup" && (
        <>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Address
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your complete address"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Preferred Date
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Preferred Time
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot.id} value={slot.id}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Message (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any special instructions or notes..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
}