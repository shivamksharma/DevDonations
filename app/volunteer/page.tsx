"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Heart, User, Briefcase, Calendar, MessageSquare, Users, Clock, Handshake, Sparkles, TrendingUp, MapPin } from "lucide-react";
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
import { useEffect, useState, useRef } from "react";
import { addVolunteer } from '@/shared/lib/firebase/volunteers';
import { toast } from "react-hot-toast";

const STEPS = [
  { number: 1, title: "Personal Info", icon: User },
  { number: 2, title: "Role Selection", icon: Briefcase },
  { number: 3, title: "Availability", icon: Calendar },
  { number: 4, title: "Motivation", icon: MessageSquare },
] as const;

const WHY_VOLUNTEER = [
  {
    icon: Heart,
    title: "Make a Real Difference",
    description: "Help us collect, organize, and deliver donations to the people who need them most.",
    gradient: "from-red-500/20 to-pink-500/10",
    iconColor: "text-red-500",
  },
  {
    icon: Clock,
    title: "It's Free and Flexible",
    description: "There's no registration fee or commitment. Join when you have free time — even a few hours matter.",
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: Handshake,
    title: "Be Part of a Community",
    description: "Work with passionate volunteers, meet like-minded people, and grow together.",
    gradient: "from-purple-500/20 to-violet-500/10",
    iconColor: "text-purple-500",
  },
];

const IMPACT_STATS = [
  { number: "300+", label: "Active Volunteers", icon: Users },
  { number: "900+", label: "Lives Impacted", icon: Heart },
  { number: "12+", label: "Cities Connected", icon: MapPin },
];

export default function VolunteerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

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
    const savedData = localStorage.getItem("volunteer-form-data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        form.reset(parsed);
      } catch (e) {
        // Invalid data, ignore
      }
    }
  }, [form]);

  // Save form data to localStorage on change
  useEffect(() => {
    const subscription = form.watch((data) => {
      localStorage.setItem("volunteer-form-data", JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [form]);

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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="inline-block mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-tight">
              Become a Volunteer.
              <br />
              <span className="font-medium">Make an Impact.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light mb-12">
              At DevDonations, volunteering is simple, free, and flexible. Contribute whenever you have time — every small effort helps someone in need.
            </p>

            <Button 
              onClick={scrollToForm}
              size="lg"
              className="text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Start Volunteering
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Why <span className="font-medium">Volunteer?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a movement that's changing lives and building stronger communities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {WHY_VOLUNTEER.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 h-full group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <reason.icon className={`w-8 h-8 ${reason.iconColor}`} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-medium mb-4">
                    {reason.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Whether you're a student, professional, or retiree — everyone is welcome to contribute. There's always a way to help.
          </motion.p>
        </div>
      </section>

      {/* Volunteer Roles Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Find Your <span className="font-medium">Perfect Role</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the role that fits your interest and availability — we'll guide you through every step
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VOLUNTEER_ROLES.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 h-full hover:border-primary/50">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Briefcase className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{role.label}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section ref={formRef} className="py-32 px-6 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Ready to <span className="font-medium">Get Started?</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out this quick form and we'll be in touch with next steps
            </p>
          </motion.div>

          {isSuccess ? (
            <motion.div
              className="bg-card border border-border rounded-3xl p-12 text-center shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Check className="w-10 h-10 text-green-500" strokeWidth={2.5} />
              </motion.div>
              
              <h3 className="text-3xl font-medium mb-4">Thank You for Volunteering!</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Our team will reach out soon with the next steps. We're excited to have you join our mission!
              </p>
              
              <Button 
                onClick={() => {
                  setIsSuccess(false);
                  setCurrentStep(1);
                  form.reset();
                }}
                variant="outline"
              >
                Submit Another Application
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Step {currentStep} of 4
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Step Indicators */}
              <div className="grid grid-cols-4 gap-2 mb-8">
                {STEPS.map((step) => (
                  <div key={step.number} className="text-center">
                    <div className={`
                      w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-medium transition-all
                      ${currentStep === step.number 
                        ? 'bg-primary text-primary-foreground' 
                        : currentStep > step.number 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      {currentStep > step.number ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground hidden sm:block">{step.title}</p>
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
                        className="space-y-6"
                      >
                        <div className="mb-6">
                          <h3 className="text-2xl font-medium mb-2">Personal Information</h3>
                          <p className="text-muted-foreground">
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
                                <Input placeholder="9876543210" {...field} maxLength={10} />
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
                        className="space-y-6"
                      >
                        <div className="mb-6">
                          <h3 className="text-2xl font-medium mb-2">Choose Your Role</h3>
                          <p className="text-muted-foreground">
                            Select the volunteer position that interests you most
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
                        className="space-y-6"
                      >
                        <div className="mb-6">
                          <h3 className="text-2xl font-medium mb-2">Your Availability</h3>
                          <p className="text-muted-foreground">
                            When are you available to volunteer? Select all that apply
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

                    {/* Step 4: Motivation */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="mb-6">
                          <h3 className="text-2xl font-medium mb-2">Tell Us About Yourself</h3>
                          <p className="text-muted-foreground">
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
                                  placeholder="Tell us about any relevant volunteer or work experience..."
                                  className="resize-none min-h-[120px]"
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
                                  placeholder="Share your motivation for joining our volunteer team..."
                                  className="resize-none min-h-[120px]"
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
                  <div className="flex gap-4 mt-8 pt-6 border-t border-border">
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
            </motion.div>
          )}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Our <span className="font-medium">Impact</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              Every volunteer helps extend our reach — together, we're creating real change
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {IMPACT_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-card border border-border rounded-3xl p-10 hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  
                  <div className="text-5xl font-light mb-4 text-foreground">
                    {stat.number}
                  </div>
                  
                  <p className="text-muted-foreground text-lg">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-secondary/30">
        <motion.div
          className="container mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-muted-foreground">
            Have questions before joining? Reach out through our{" "}
            <a href="/about-us#contact" className="text-primary hover:underline font-medium">
              Contact section
            </a>
            {" "}— we'd love to hear from you.
          </p>
        </motion.div>
      </section>
    </div>
  );
}