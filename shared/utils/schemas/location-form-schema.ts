import * as z from "zod";

export const locationFormSchema = z.object({
  name: z.string().min(3, "Location name must be at least 3 characters"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City name must be at least 2 characters"),
  state: z.string().min(2, "State name must be at least 2 characters"),
  pincode: z.string()
    .regex(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .min(6, "Pincode must be 6 digits")
    .max(6, "Pincode must be 6 digits"),
  description: z.string().optional(),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .optional()
    .or(z.literal("")),
  hours: z.string()
    .min(5, "Operating hours must be at least 5 characters")
    .optional()
    .or(z.literal("")),
});

export type LocationFormData = z.infer<typeof locationFormSchema>;
