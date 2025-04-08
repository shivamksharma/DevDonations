import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  location: z.string().min(5, "Location must be at least 5 characters long"),
  date: z.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date!",
  }).refine((date) => date > new Date(), {
    message: "Event date must be in the future",
  }),
  imageUrl: z.string().url("Please enter a valid URL").optional(),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  status: z.enum(["upcoming", "ongoing", "completed", "cancelled"], {
    required_error: "Please select a status",
  }),
});

export type EventFormData = z.infer<typeof eventFormSchema>; 