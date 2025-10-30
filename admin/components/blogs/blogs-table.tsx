"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash2, Eye, FileText } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Badge } from "@/shared/components/ui/badge";
import { toast } from "@/shared/hooks/use-toast";
import type { BlogPost } from "@/shared/utils/types/admin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { deleteBlogPost } from "@/services/firebase/blogs";
import { format } from "date-fns";

interface BlogsTableProps {
  blogs: BlogPost[];
  loading?: boolean;
  onEdit?: (blog: BlogPost) => void;
  onRefresh?: () => void;
}

export function BlogsTable({ blogs, loading = false, onEdit, onRefresh }: BlogsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | BlogPost['status']>('all');
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null);
  const [viewingBlog, setViewingBlog] = useState<BlogPost | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteBlogPost(id);
      toast.success("Blog post deleted successfully");
      setBlogToDelete(null);
      onRefresh?.();
    } catch (error) {
      toast.error("Failed to delete blog post");
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: BlogPost['status']) => {
    switch (status) {
      case 'draft':
        return 'secondary';
      case 'published':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <motion.div
      className="bg-card rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value: 'all' | BlogPost['status']) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <FileText className="h-12 w-12 mb-2" />
            <p>No blog posts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      {blog.featuredImage && (
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-muted">
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium max-w-md">
                      <div className="truncate">{blog.title}</div>
                      <div className="text-xs text-muted-foreground truncate mt-1">
                        {blog.summary}
                      </div>
                    </TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(blog.status)}>
                        {blog.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {blog.createdAt && format(new Date(blog.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setViewingBlog(blog)}
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit?.(blog)}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setBlogToDelete(blog)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* View Blog Dialog */}
      <Dialog open={!!viewingBlog} onOpenChange={() => setViewingBlog(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Blog Preview</DialogTitle>
          </DialogHeader>
          {viewingBlog && (
            <div className="space-y-4">
              {viewingBlog.featuredImage && (
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <img
                    src={viewingBlog.featuredImage}
                    alt={viewingBlog.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{viewingBlog.title}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>By {viewingBlog.author}</span>
                  <span>•</span>
                  <span>{viewingBlog.createdAt && format(new Date(viewingBlog.createdAt), "MMMM d, yyyy")}</span>
                  <span>•</span>
                  <Badge variant={getStatusBadgeVariant(viewingBlog.status)}>
                    {viewingBlog.status}
                  </Badge>
                </div>
              </div>
              <div className="text-muted-foreground">
                {viewingBlog.summary}
              </div>
              <div 
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: viewingBlog.content }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!blogToDelete} onOpenChange={() => setBlogToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete &quot;{blogToDelete?.title}&quot;?</p>
            <p className="text-sm text-muted-foreground mt-2">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBlogToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => blogToDelete && handleDelete(blogToDelete.id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
