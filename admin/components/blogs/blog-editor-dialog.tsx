"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { blogFormSchema, type BlogFormData } from "@/shared/utils/schemas/blog-form-schema";
import { createBlogPost, updateBlogPost, generateSlug } from "@/services/firebase/blogs";
import { toast } from "sonner";
import { useAuth } from "@/shared/lib/context/auth-context";
import type { BlogPost } from "@/shared/utils/types/admin";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface BlogEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog?: BlogPost | null;
  onSuccess?: () => void;
}

export function BlogEditorDialog({ open, onOpenChange, blog, onSuccess }: BlogEditorDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { user } = useAuth();

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      featuredImage: "",
      author: user?.email?.split("@")[0] || "Admin",
      status: "draft",
    },
  });

  // Update form when blog prop changes
  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        summary: blog.summary,
        content: blog.content,
        featuredImage: blog.featuredImage,
        author: blog.author,
        status: blog.status,
      });
      setImagePreview(blog.featuredImage);
    } else {
      form.reset({
        title: "",
        summary: "",
        content: "",
        featuredImage: "",
        author: user?.email?.split("@")[0] || "Admin",
        status: "draft",
      });
      setImagePreview("");
    }
  }, [blog, form, user]);

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      setUploadingImage(true);
      const storage = getStorage();
      const timestamp = Date.now();
      const filename = `blog-images/${timestamp}-${file.name}`;
      const storageRef = ref(storage, filename);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      form.setValue("featuredImage", downloadURL);
      setImagePreview(downloadURL);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    if (!user) {
      toast.error("You must be logged in to create a blog post");
      return;
    }

    try {
      setIsSubmitting(true);
      const slug = generateSlug(data.title);
      
      const blogData = {
        title: data.title,
        slug,
        summary: data.summary,
        content: data.content,
        featuredImage: data.featuredImage,
        author: data.author,
        authorId: user.uid,
        status: data.status,
      };

      if (blog) {
        // Update existing blog
        await updateBlogPost(blog.id, blogData);
        toast.success("Blog post updated successfully");
      } else {
        // Create new blog
        await createBlogPost(blogData);
        toast.success("Blog post created successfully");
      }

      form.reset();
      setImagePreview("");
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error("Failed to save blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{blog ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
          <DialogDescription>
            Fill in the details below to {blog ? "update" : "create"} a blog post.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief summary of the blog post (20-200 characters)"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed in the blog card on the homepage.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featuredImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {imagePreview && (
                        <div className="relative aspect-video overflow-hidden rounded-lg border">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="object-cover w-full h-full"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              field.onChange("");
                              setImagePreview("");
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Image URL"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setImagePreview(e.target.value);
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={uploadingImage}
                          onClick={() => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) handleImageUpload(file);
                            };
                            input.click();
                          }}
                        >
                          {uploadingImage ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Upload className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload an image or provide a URL
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog content here. You can use HTML for formatting."
                      className="min-h-[300px] font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can use HTML tags for formatting (e.g., &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || uploadingImage}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {blog ? "Update" : "Create"} Blog Post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
