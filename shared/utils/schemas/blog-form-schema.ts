import { z } from "zod";

export const blogFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  summary: z.string().min(20, "Summary must be at least 20 characters long").max(200, "Summary must not exceed 200 characters"),
  content: z.string().min(50, "Content must be at least 50 characters long"),
  featuredImage: z.string().url("Please enter a valid image URL"),
  author: z.string().min(2, "Author name is required"),
  status: z.enum(["draft", "published", "archived"], {
    required_error: "Please select a status",
  }),
});

export type BlogFormData = z.infer<typeof blogFormSchema>;
