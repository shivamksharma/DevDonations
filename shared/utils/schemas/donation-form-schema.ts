import * as z from "zod";

export const donationFormSchema = z.object({
  // User Details
  name: z.string().min(2, "Name must be at least 2 characters"),
  whatsappNumber: z.string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number (starting with 6-9)")
    .length(10, "Phone number must be exactly 10 digits"),
  pickupType: z.enum(["pickup", "dropoff"], {
    required_error: "Please select a pickup type",
  }),
  address: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  dropoffLocation: z.string().optional(),
  message: z.string().optional(),
  
  // Donation Items
  items: z.array(z.object({
    type: z.string(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
  })).min(1, "Please select at least one item to donate"),
}).refine(
  (data) => {
    // If pickup type is "pickup", validate that address, preferredDate, and preferredTime are provided
    if (data.pickupType === "pickup") {
      return (
        data.address && 
        data.address.length >= 10 &&
        data.preferredDate && 
        data.preferredDate.length > 0 &&
        data.preferredTime && 
        data.preferredTime.length > 0
      );
    }
    // If pickup type is "dropoff", validate that dropoffLocation is provided
    if (data.pickupType === "dropoff") {
      return data.dropoffLocation && data.dropoffLocation.length > 0;
    }
    return true;
  },
  {
    message: "Please complete all required fields for your selected donation method",
    path: ["pickupType"],
  }
);

export type DonationFormData = z.infer<typeof donationFormSchema>;