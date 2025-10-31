"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MapPin, Building2, Map, Navigation, Hash, FileText, Phone, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { locationFormSchema, type LocationFormData } from "@/shared/utils/schemas/location-form-schema";
import { DropoffLocation } from "@/shared/utils/types/admin";
import { createDropoffLocation, updateDropoffLocation } from "@/services/firebase/dropoff-locations";
import { toast } from "sonner";

interface LocationEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  location?: DropoffLocation | null;
  onSuccess: () => void;
}

export function LocationEditorDialog({
  isOpen,
  onClose,
  location,
  onSuccess,
}: LocationEditorDialogProps) {
  const isEditing = !!location;

  const form = useForm<LocationFormData>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      description: "",
      phone: "",
      hours: "",
    },
  });

  // Reset form when dialog opens/closes or location changes
  useEffect(() => {
    if (isOpen && location) {
      form.reset({
        name: location.name,
        address: location.address,
        city: location.city,
        state: location.state,
        pincode: location.pincode,
        description: location.description || "",
        phone: location.phone || "",
        hours: location.hours || "",
      });
    } else if (isOpen && !location) {
      form.reset({
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        description: "",
        phone: "",
        hours: "",
      });
    }
  }, [isOpen, location, form]);

  const onSubmit = async (values: LocationFormData) => {
    try {
      if (isEditing) {
        await updateDropoffLocation(location.id, values);
        toast.success("Location updated successfully");
      } else {
        await createDropoffLocation(values);
        toast.success("Location created successfully");
      }
      onSuccess();
      onClose();
      form.reset();
    } catch (error) {
      console.error("Error saving location:", error);
      toast.error(
        isEditing
          ? "Failed to update location"
          : "Failed to create location"
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MapPin className="h-5 w-5 text-orange-500" />
            {isEditing ? "Edit Drop-off Location" : "Add New Drop-off Location"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the details of this drop-off location."
              : "Add a new drop-off location where donors can bring their donations."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            {/* Location Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-orange-500" />
                    Location Name
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Downtown Collection Center"
                      {...field}
                      className="border-2 focus:border-orange-500"
                    />
                  </FormControl>
                  <FormDescription>
                    A clear and recognizable name for this location.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    Address
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the complete street address with landmark"
                      className="min-h-[80px] border-2 focus:border-orange-500 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City, State, and Pincode */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Map className="h-4 w-4 text-orange-500" />
                      City
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Mumbai"
                        {...field}
                        className="border-2 focus:border-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-orange-500" />
                      State
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Maharashtra"
                        {...field}
                        className="border-2 focus:border-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-orange-500" />
                      Pincode
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="400001"
                        {...field}
                        className="border-2 focus:border-orange-500"
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone and Hours */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-orange-500" />
                      Contact Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+91 1234567890"
                        {...field}
                        className="border-2 focus:border-orange-500"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Optional contact number for this location.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      Operating Hours
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mon-Fri: 9 AM - 6 PM"
                        {...field}
                        className="border-2 focus:border-orange-500"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      When is this location open for drop-offs?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-orange-500" />
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional information about this location (e.g., parking availability, nearby landmarks, special instructions)"
                      className="min-h-[100px] border-2 focus:border-orange-500 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional additional details to help donors find this location.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{isEditing ? "Update Location" : "Create Location"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
