"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ClothingFormSection } from "@/components/donate/clothing-form-section";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  donationType: z.string(),
  address: z.string().min(10, "Please enter a complete address"),
  message: z.string().optional(),
});

export default function DonatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      donationType: "",
      address: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    form.reset();
  }

  return (
    <div className="min-h-screen py-12 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg">
          <motion.h1 
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Donate Clothes
          </motion.h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="donationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Donation Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select donation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pickup">Pick-up</SelectItem>
                        <SelectItem value="dropoff">Drop-off</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ClothingFormSection />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Message (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional information you'd like to share"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Donation <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        <div className="max-w-2xl mx-auto mt-8 p-6 bg-card rounded-lg shadow-lg">
          <div className="flex items-center gap-2 text-primary mb-4">
            <MapPin className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Drop-off Locations</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-md">
              <h3 className="font-semibold">Main Collection Center</h3>
              <p className="text-muted-foreground">123 Donation Street, City, State 12345</p>
              <p className="text-sm text-muted-foreground">Open Monday-Friday: 9 AM - 5 PM</p>
            </div>
            <div className="p-4 bg-secondary rounded-md">
              <h3 className="font-semibold">Community Center</h3>
              <p className="text-muted-foreground">456 Helper Avenue, City, State 12345</p>
              <p className="text-sm text-muted-foreground">Open Saturday-Sunday: 10 AM - 4 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}