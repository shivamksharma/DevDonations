"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { BlogsTable } from "@/admin/components/blogs/blogs-table";
import { BlogEditorDialog } from "@/admin/components/blogs/blog-editor-dialog";
import { subscribeToBlogPosts } from "@/services/firebase/blogs";
import type { BlogPost } from "@/shared/utils/types/admin";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Subscribe to real-time blog updates
    const unsubscribe = subscribeToBlogPosts((posts) => {
      setBlogs(posts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setIsEditorOpen(true);
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setIsEditorOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    setIsEditorOpen(open);
    if (!open) {
      setEditingBlog(null);
    }
  };

  const stats = {
    total: blogs.length,
    published: blogs.filter(b => b.status === 'published').length,
    draft: blogs.filter(b => b.status === 'draft').length,
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blog Management</h2>
          <p className="text-muted-foreground">
            Create and manage blog posts for your website
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Create Blog Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          className="rounded-lg border bg-card p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">Total Posts</h3>
          </div>
          <p className="mt-2 text-3xl font-bold">{stats.total}</p>
        </motion.div>

        <motion.div
          className="rounded-lg border bg-card p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-green-500" />
            <h3 className="text-sm font-medium text-muted-foreground">Published</h3>
          </div>
          <p className="mt-2 text-3xl font-bold">{stats.published}</p>
        </motion.div>

        <motion.div
          className="rounded-lg border bg-card p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-yellow-500" />
            <h3 className="text-sm font-medium text-muted-foreground">Drafts</h3>
          </div>
          <p className="mt-2 text-3xl font-bold">{stats.draft}</p>
        </motion.div>
      </div>

      {/* Blogs Table */}
      <BlogsTable
        blogs={blogs}
        loading={loading}
        onEdit={handleEdit}
      />

      {/* Blog Editor Dialog */}
      <BlogEditorDialog
        open={isEditorOpen}
        onOpenChange={handleDialogClose}
        blog={editingBlog}
      />
    </div>
  );
}
