"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ClothingFormSection } from "@/components/donate/clothing-form-section";
import { UserDetailsSection } from "@/components/donate/user-details-section";
import { toast } from "@/hooks/use-toast";
import { donationFormSchema, type DonationFormData } from "@/lib/schemas/donation-form-schema";
import { addDonation } from "@/lib/firebase/donations";
import { useState } from "react";

export default function DonatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      name: "",
      whatsappNumber: "",
      pickupType: "pickup",
      address: "",
      preferredDate: "",
      preferredTime: "morning",
      message: "",
      items: [],
    },
  });

  async function onSubmit(values: DonationFormData) {
    setIsSubmitting(true);
    try {
      const { id, error } = await addDonation(values);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Donation submitted successfully!");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen py-12 bg-secondary/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Make a Donation</h1>
        
        <div className="bg-card rounded-lg shadow-lg p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <UserDetailsSection form={form} />
              <ClothingFormSection />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Donation"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}