"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/shared/components/ui/form";
import { donationFormSchema, type DonationFormData } from "@/shared/utils/schemas/donation-form-schema";
import { addDonation } from "@/shared/lib/firebase/donations";
import { toast } from "sonner";
import { cn } from "@/shared/utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import { StepOneUserInfo } from "./steps/step-one-user-info";
import { StepTwoDonationMethod } from "./steps/step-two-donation-method";
import { StepThreeItems } from "./steps/step-three-items";
import { StepFourReview } from "./steps/step-four-review";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger?: React.ReactNode;
}

const steps = [
  { id: 1, name: "Your Info", description: "Basic information" },
  { id: 2, name: "Donation Method", description: "Pickup or drop-off" },
  { id: 3, name: "Select Items", description: "What you're donating" },
  { id: 4, name: "Review", description: "Confirm details" },
];

export function DonationModal({ isOpen, onClose, trigger }: DonationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      name: "",
      whatsappNumber: "",
      pickupType: "pickup",
      address: "",
      preferredDate: "",
      preferredTime: "",
      dropoffLocation: "",
      message: "",
      items: [],
    },
    mode: "onChange",
  });

  // Reset form and step when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentStep(0);
        form.reset();
      }, 200);
    }
  }, [isOpen, form]);

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof DonationFormData)[] = [];
    
    switch (step) {
      case 0:
        fieldsToValidate = ["name", "whatsappNumber"];
        break;
      case 1:
        fieldsToValidate = ["pickupType"];
        const pickupType = form.getValues("pickupType");
        if (pickupType === "pickup") {
          fieldsToValidate.push("address", "preferredDate", "preferredTime");
        } else if (pickupType === "dropoff") {
          fieldsToValidate.push("dropoffLocation");
        }
        break;
      case 2:
        fieldsToValidate = ["items"];
        break;
      default:
        return true;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (!isValid) {
      toast.error("Please fill in all required fields correctly");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  async function onSubmit(values: DonationFormData) {
    if (values.items.length === 0) {
      toast.error("Please select at least one clothing item");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting your donation...");
    
    try {
      const { id, error } = await addDonation(values);
      
      toast.dismiss(loadingToast);
      
      if (error) {
        toast.error(error || "An error occurred while processing your donation");
        return;
      }
      
      toast.success("Thank you for your donation!", {
        description: "We'll contact you shortly to arrange the pickup/drop-off.",
        duration: 5000,
      });
      
      form.reset();
      setCurrentStep(0);
      onClose();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong", {
        description: "Please try again later or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {trigger}
      <DialogContent className="max-h-[95vh] overflow-hidden sm:max-w-4xl p-0">
        <div className="flex flex-col h-full max-h-[95vh]">
          {/* Progress Bar */}
          <div className="px-6 pt-6 pb-4 border-b bg-muted/30">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                        index < currentStep
                          ? "bg-green-500 text-white"
                          : index === currentStep
                          ? "bg-orange-500 text-white ring-4 ring-orange-100 dark:ring-orange-950/30"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index < currentStep ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="mt-2 text-center hidden sm:block">
                      <p
                        className={cn(
                          "text-sm font-medium transition-colors",
                          index === currentStep
                            ? "text-orange-500"
                            : index < currentStep
                            ? "text-green-600 dark:text-green-400"
                            : "text-muted-foreground"
                        )}
                      >
                        {step.name}
                      </p>
                      <p className="text-xs text-muted-foreground hidden md:block">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-1 flex-1 mx-2 rounded-full transition-all duration-300",
                        index < currentStep
                          ? "bg-green-500"
                          : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
                <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <StepOneUserInfo key="step-1" form={form} />
                  )}
                  {currentStep === 1 && (
                    <StepTwoDonationMethod key="step-2" form={form} />
                  )}
                  {currentStep === 2 && (
                    <StepThreeItems key="step-3" />
                  )}
                  {currentStep === 3 && (
                    <StepFourReview key="step-4" form={form} onEdit={handleEdit} />
                  )}
                </AnimatePresence>
              </form>
            </Form>
          </div>

          {/* Navigation Footer */}
          <div className="px-6 py-4 border-t bg-muted/30">
            <div className="flex items-center justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={currentStep === 0 ? onClose : handleBack}
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {currentStep === 0 ? (
                  "Cancel"
                ) : (
                  <>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </>
                )}
              </Button>

              <div className="text-sm text-muted-foreground hidden sm:block">
                Step {currentStep + 1} of {steps.length}
              </div>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="min-w-[120px] bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="min-w-[120px] bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Submit
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
