

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
  FolderKanban,
  ImageIcon,
} from "lucide-react";
import { AIGenerator } from "@/components/admin/AIGenerator";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  externalLink: string;
  imageUrl: string;
  createdAt: string;
}

export default function ManageProjects() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTechStack("");
    setExternalLink("");
    setImageUrl("");
  };

  const handleCreateProject = async () => {
    const token = localStorage.getItem("accessToken");

    const payload = {
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      description,
      techStack: techStack.split(",").map((item) => item.trim()),
      externalLink,
      imageUrl,
      featured: false,
      published: true,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      toast({
        title: "Project Saved",
        description: "Project created successfully",
      });

      resetForm();
      setIsAdding(false);
      fetchProjects();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      toast({
        title: "Project Deleted",
        description: "Project has been removed successfully.",
      });

      fetchProjects();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          List of all your showcased work
        </p>

        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl glass-card border-white/10 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-headline">
                Create New Project
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Cool SaaS Product"
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about the project..."
                  className="bg-white/5 border-white/10 min-h-[120px]"
                />
              </div>

              <AIGenerator type="project" onGenerated={setDescription} />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Tech Stack (comma separated)
                  </label>
                  <Input
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    placeholder="React, NextJS, Firebase"
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">External Link</label>
                  <Input
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    placeholder="https://example.com"
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image URL</label>
                <div className="flex gap-2">
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://picsum.photos/seed/id/600/400"
                    className="bg-white/5 border-white/10 flex-1"
                  />

                  <Button variant="outline" className="border-white/10">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>

                <Button className="bg-primary" onClick={handleCreateProject}>
                  Save Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card border-white/5 p-4">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-[100px]">Preview</TableHead>
              <TableHead>Project Title</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((p) => (
              <TableRow
                key={p.id}
                className="border-white/5 hover:bg-white/5 transition-colors"
              >
                <TableCell>
                  <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center overflow-hidden">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FolderKanban className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>

                <TableCell className="font-medium">{p.title}</TableCell>

                <TableCell className="text-xs text-muted-foreground">
                  {p.techStack?.join(", ")}
                </TableCell>

                <TableCell className="text-xs text-muted-foreground">
                  {new Date(p.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white/10"
                    >
                      <Pencil className="w-4 h-4 text-primary" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-destructive/10"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {loading && (
          <div className="py-6 text-center text-muted-foreground">
            Loading projects...
          </div>
        )}
      </Card>
    </div>
  );
}
