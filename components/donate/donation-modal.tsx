"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ClothingFormSection } from "./clothing-form-section";
import { UserDetailsSection } from "./user-details-section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { donationFormSchema, type DonationFormData } from "@/lib/schemas/donation-form-schema";
import { addDonation } from "@/lib/firebase/donations";
import { toast } from "@/hooks/use-toast";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger?: React.ReactNode;
}

export function DonationModal({ isOpen, onClose, trigger }: DonationModalProps) {
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
    if (values.items.length === 0) {
      toast.error("Please select at least one clothing item");
      return;
    }

    setIsSubmitting(true);
    try {
      const { id, error } = await addDonation(values);
      if (error) {
        toast.error(error || "An error occurred while processing your donation");
        return;
      }
      toast.success("Thank you for your donation! We'll contact you shortly to arrange the pickup/drop-off.");
      form.reset();
      onClose();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {trigger}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold text-center">
            Make a Donation
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-1">
            <UserDetailsSection form={form} />
            <ClothingFormSection />
            
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit Donation"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
