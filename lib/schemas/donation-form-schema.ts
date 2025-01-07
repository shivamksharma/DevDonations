import * as z from "zod";

export const donationFormSchema = z.object({
  // User Details
  name: z.string().min(2, "Name must be at least 2 characters"),
  whatsappNumber: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid WhatsApp number")
    .min(10, "WhatsApp number must be at least 10 digits"),
  pickupType: z.enum(["pickup", "dropoff"], {
    required_error: "Please select a pickup type",
  }),
  address: z.string().min(10, "Please enter a complete address"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  message: z.string().optional(),
  
  // Donation Items
  items: z.array(z.object({
    type: z.string(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
  })).min(1, "Please select at least one item to donate"),
});

export type DonationFormData = z.infer<typeof donationFormSchema>;