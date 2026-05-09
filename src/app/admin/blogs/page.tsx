

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Pencil,
  Trash2,
  FileText,
  ImageIcon,
} from "lucide-react";
import { AIGenerator } from "@/components/admin/AIGenerator";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;

interface Blog {
  id?: number;
  title: string;
  content: string;
  date: string;
  readTime: string;
}

export default function ManageBlogs() {
  const { toast } = useToast();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  const [formData, setFormData] = useState<Blog>({
    title: "",
    content: "",
    date: "",
    readTime: "",
  });

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog`);
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE Blog
  const handleCreate = async () => {
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Admin token missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create blog");

      toast({
        title: "Blog Published",
        description: "Blog created successfully.",
      });

      setIsAdding(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog.",
        variant: "destructive",
      });
    }
  };

  // UPDATE Blog
  const handleUpdate = async () => {
    if (!token || !selectedBlogId) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/blog/${selectedBlogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to update blog");

      toast({
        title: "Blog Updated",
        description: "Blog updated successfully.",
      });

      setIsEditing(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog.",
        variant: "destructive",
      });
    }
  };

  // DELETE Blog
  const handleDelete = async (id: number) => {
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Admin token missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Delete failed");

      toast({
        title: "Blog Deleted",
        description: "Post removed successfully.",
      });

      fetchBlogs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog.",
        variant: "destructive",
      });
    }
  };

  // Edit Blog
  const handleEdit = (blog: Blog) => {
    setSelectedBlogId(blog.id || null);
    setFormData(blog);
    setIsEditing(true);
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      date: "",
      readTime: "",
    });
    setSelectedBlogId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-headline font-bold">
            Blog Posts
          </h2>
          <p className="text-xs text-muted-foreground">
            Share your technical insights and articles
          </p>
        </div>

        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-xs">
              <Plus className="w-3 h-3 mr-2" />
              Write Post
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl glass-card border-white/10 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Input
                name="title"
                placeholder="Post Title"
                value={formData.title}
                onChange={handleChange}
              />

              <Textarea
                name="content"
                placeholder="Write content..."
                value={formData.content}
                onChange={handleChange}
              />

              <Input
                name="date"
                placeholder="2026-05-09"
                value={formData.date}
                onChange={handleChange}
              />

              <Input
                name="readTime"
                placeholder="5 min read"
                value={formData.readTime}
                onChange={handleChange}
              />

              <AIGenerator
                type="blog"
                onGenerated={(generated) =>
                  setFormData({
                    ...formData,
                    content: generated,
                  })
                }
              />

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>

                <Button onClick={handleCreate}>
                  Publish Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
            />

            <Input
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            <Input
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>

              <Button onClick={handleUpdate}>
                Update Blog
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Blog Table */}
      <Card className="glass-card border-white/5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Read Time</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </div>
                </TableCell>

                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.date}</TableCell>
                <TableCell>{blog.readTime}</TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(blog)}
                    >
                      <Pencil className="w-3 h-3 text-primary" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleDelete(blog.id!)
                      }
                    >
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}