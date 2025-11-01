import * as z from "zod";

export const volunteerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number (starting with 6-9)").length(10, "Phone number must be exactly 10 digits"),
  role: z.string().min(1, "Please select a role"),
  availability: z.array(z.string()).min(1, "Please select at least one availability option"),
  experience: z.string().optional(),
  motivation: z.string().min(10, "Please tell us why you want to volunteer"),
});

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;