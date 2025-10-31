"use client";

import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Calendar, Clock, MessageSquare, Package, CheckCircle2, Edit, Building2 } from "lucide-react";
import { format } from "date-fns";
import { DonationFormData } from "@/shared/utils/schemas/donation-form-schema";
import { DROP_OFF_LOCATIONS } from "@/shared/utils/constants/donation-constants";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { Badge } from "@/shared/components/ui/badge";

interface StepFourProps {
  form: UseFormReturn<DonationFormData>;
  onEdit: (step: number) => void;
}

export function StepFourReview({ form, onEdit }: StepFourProps) {
  const formData = form.getValues();
  const totalItems = formData.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 py-4"
    >
      <div className="space-y-2 text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-green-100 dark:bg-green-950/30 rounded-full">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground">Review & Submit</h2>
        <p className="text-muted-foreground">
          Please review your donation details before submitting
        </p>
      </div>

      <div className="space-y-6 bg-muted/30 p-6 rounded-xl border">
        {/* Personal Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-orange-500" />
              Personal Information
            </h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onEdit(0)}
              className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="grid gap-3 pl-7">
            <div className="flex items-start gap-3">
              <User className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{formData.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp Number</p>
                <p className="font-medium">{formData.whatsappNumber}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Donation Method */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange-500" />
              Donation Method
            </h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onEdit(1)}
              className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="grid gap-3 pl-7">
            <div>
              <Badge variant={formData.pickupType === "pickup" ? "default" : "secondary"} className="mb-2">
                {formData.pickupType === "pickup" ? "Home Pickup" : "Drop-off at Center"}
              </Badge>
            </div>
            
            {formData.pickupType === "pickup" && formData.address && (
              <>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup Address</p>
                    <p className="font-medium whitespace-pre-wrap">{formData.address}</p>
                  </div>
                </div>
                {formData.preferredDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Preferred Date</p>
                      <p className="font-medium">
                        {format(new Date(formData.preferredDate), "PPP")}
                      </p>
                    </div>
                  </div>
                )}
                {formData.preferredTime && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time Slot</p>
                      <p className="font-medium capitalize">
                        {formData.preferredTime === "morning" && "Morning (9 AM - 12 PM)"}
                        {formData.preferredTime === "afternoon" && "Afternoon (12 PM - 4 PM)"}
                        {formData.preferredTime === "evening" && "Evening (4 PM - 7 PM)"}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {formData.pickupType === "dropoff" && formData.dropoffLocation && (
              <div className="flex items-start gap-3">
                <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Selected Location</p>
                  <p className="font-medium">
                    {DROP_OFF_LOCATIONS.find(loc => loc.id === formData.dropoffLocation)?.name || formData.dropoffLocation}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {DROP_OFF_LOCATIONS.find(loc => loc.id === formData.dropoffLocation)?.address}
                  </p>
                </div>
              </div>
            )}

            {formData.message && (
              <div className="flex items-start gap-3">
                <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Additional Notes</p>
                  <p className="font-medium whitespace-pre-wrap">{formData.message}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-500" />
              Donation Items
            </h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onEdit(2)}
              className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/20"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="pl-7">
            <div className="bg-background rounded-lg p-4 border">
              <p className="text-sm text-muted-foreground mb-3">
                Total Items: <span className="font-semibold text-orange-500">{totalItems}</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <span className="text-sm font-medium capitalize">{item.type.replace(/-/g, ' ')}</span>
                    <Badge variant="secondary">{item.quantity}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
        <p className="text-sm text-center text-muted-foreground">
          By submitting this form, you confirm that all the information provided is accurate and you agree to our donation terms.
        </p>
      </div>
    </motion.div>
  );
}
