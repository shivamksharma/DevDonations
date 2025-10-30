"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X, User, Briefcase, Calendar, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { VOLUNTEER_ROLES } from "@/shared/utils/constants/volunteer-types";
import { volunteerFormSchema, type VolunteerFormData } from "@/shared/utils/schemas/volunteer-form-schema";
import { RoleCard } from "@/frontend/components/volunteer/role-card";
import { AvailabilitySection } from "@/frontend/components/volunteer/availability-section";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Progress } from "@/shared/components/ui/progress";
import { useEffect, useState } from "react";
import { addVolunteer } from '@/shared/lib/firebase/volunteers';
import { toast } from "react-hot-toast";
import { useVolunteerModal } from "@/shared/lib/store/volunteer-modal-store";

const STEPS = [
  { number: 1, title: "Personal Info", icon: User },
  { number: 2, title: "Role Selection", icon: Briefcase },
  { number: 3, title: "Availability", icon: Calendar },
  { number: 4, title: "Experience", icon: MessageSquare },
] as const;

export function VolunteerModal() {
  const { isOpen, closeModal } = useVolunteerModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      availability: [],
      experience: "",
      motivation: "",
    },
  });

  // Load saved form data from localStorage
  useEffect(() => {
    if (isOpen) {
      const savedData = localStorage.getItem("volunteer-form-data");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          form.reset(parsed);
        } catch (e) {
          // Invalid data, ignore
        }
      }
    }
  }, [isOpen, form]);

  // Save form data to localStorage on change
  useEffect(() => {
    if (isOpen) {
      const subscription = form.watch((data) => {
        localStorage.setItem("volunteer-form-data", JSON.stringify(data));
      });
      return () => subscription.unsubscribe();
    }
  }, [isOpen, form]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setIsSuccess(false);
    }
  }, [isOpen]);

  async function onSubmit(data: VolunteerFormData) {
    setIsSubmitting(true);
    try {
      const { id, error } = await addVolunteer(data);
      if (error) {
        toast.error(error);
        return;
      }
      setIsSuccess(true);
      localStorage.removeItem("volunteer-form-data");
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof VolunteerFormData)[] = [];
    
    switch (step) {
      case 1:
        fieldsToValidate = ["name", "email", "phone"];
        break;
      case 2:
        fieldsToValidate = ["role"];
        break;
      case 3:
        fieldsToValidate = ["availability"];
        break;
      case 4:
        fieldsToValidate = ["motivation"];
        break;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 4) {
      const isValid = await validateStep(4);
      if (isValid) {
        form.handleSubmit(onSubmit)();
      }
    } else {
      handleNext();
    }
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setCurrentStep(1);
      setIsSuccess(false);
    }, 300);
  };

  const progress = (currentStep / 4) * 100;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-card border border-border rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Check className="w-10 h-10 text-green-500" strokeWidth={2.5} />
                  </motion.div>
                  
                  <h2 className="text-3xl font-medium mb-4">Thank You!</h2>
                  <p className="text-muted-foreground text-lg mb-8">
                    Your volunteer application has been submitted successfully. We'll review your application and get in touch with you soon.
                  </p>
                  
                  <Button onClick={handleClose} size="lg" className="w-full sm:w-auto">
                    Close
                  </Button>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-2">
                      Join Our <span className="font-medium">Team</span>
                    </h2>
                    <p className="text-muted-foreground">
                      Help us make a difference in the community
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Step {currentStep} of 4
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>

                  {/* Step Indicators */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {STEPS.map((step) => (
                      <div key={step.number} className="text-center">
                        <div className={`
                          w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-medium transition-all
                          ${currentStep === step.number 
                            ? 'bg-primary text-primary-foreground' 
                            : currentStep > step.number 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-muted text-muted-foreground'
                          }
                        `}>
                          {currentStep > step.number ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <step.icon className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Form */}
                  <Form {...form}>
                    <form onSubmit={handleStepSubmit}>
                      <AnimatePresence mode="wait">
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="mb-4">
                              <h3 className="text-xl font-medium mb-1">Personal Information</h3>
                              <p className="text-sm text-muted-foreground">
                                Let's start with your basic details
                              </p>
                            </div>

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
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="john@example.com" {...field} />
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
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+1234567890" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}

                        {/* Step 2: Role Selection */}
                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="mb-4">
                              <h3 className="text-xl font-medium mb-1">Choose Your Role</h3>
                              <p className="text-sm text-muted-foreground">
                                Select the position that interests you most
                              </p>
                            </div>

                            <FormField
                              control={form.control}
                              name="role"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="space-y-3">
                                      {VOLUNTEER_ROLES.map(role => (
                                        <RoleCard
                                          key={role.id}
                                          id={role.id}
                                          label={role.label}
                                          description={role.description}
                                          selected={field.value === role.id}
                                          onSelect={() => field.onChange(role.id)}
                                        />
                                      ))}
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}

                        {/* Step 3: Availability */}
                        {currentStep === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="mb-4">
                              <h3 className="text-xl font-medium mb-1">Your Availability</h3>
                              <p className="text-sm text-muted-foreground">
                                When can you volunteer? Select all that apply
                              </p>
                            </div>

                            <FormField
                              control={form.control}
                              name="availability"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <AvailabilitySection
                                      selected={field.value}
                                      onSelect={(id) => {
                                        const current = new Set(field.value);
                                        current.has(id) ? current.delete(id) : current.add(id);
                                        field.onChange(Array.from(current));
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}

                        {/* Step 4: Experience & Motivation */}
                        {currentStep === 4 && (
                          <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                          >
                            <div className="mb-4">
                              <h3 className="text-xl font-medium mb-1">Tell Us About Yourself</h3>
                              <p className="text-sm text-muted-foreground">
                                Share your experience and motivation
                              </p>
                            </div>

                            <FormField
                              control={form.control}
                              name="experience"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Relevant Experience (Optional)</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Tell us about any relevant experience..."
                                      className="resize-none min-h-[100px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="motivation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Why do you want to volunteer?</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Share your motivation..."
                                      className="resize-none min-h-[100px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Navigation Buttons */}
                      <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                        {currentStep > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={handleBack}
                            className="flex-1"
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                          </Button>
                        )}
                        
                        <Button
                          type="submit"
                          className="flex-1"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Submitting..."
                          ) : currentStep === 4 ? (
                            "Submit Application"
                          ) : (
                            <>
                              Next
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>

                  {/* Auto-save indicator */}
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Your progress is automatically saved
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
