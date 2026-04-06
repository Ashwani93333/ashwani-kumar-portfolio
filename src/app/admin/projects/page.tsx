
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, FolderKanban, ImageIcon } from "lucide-react";
import { AIGenerator } from "@/components/admin/AIGenerator";
import { useToast } from "@/hooks/use-toast";

export default function ManageProjects() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [description, setDescription] = useState("");

  const handleDelete = (id: string) => {
    toast({
      title: "Project Deleted",
      description: `Project has been removed successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">List of all your showcased work</p>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl glass-card border-white/10 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-headline">Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Title</label>
                <Input placeholder="Cool SaaS Product" className="bg-white/5 border-white/10" />
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
                  <label className="text-sm font-medium">Tech Stack (comma separated)</label>
                  <Input placeholder="React, NextJS, Firebase" className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">External Link</label>
                  <Input placeholder="https://example.com" className="bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image URL</label>
                <div className="flex gap-2">
                  <Input placeholder="https://picsum.photos/seed/id/600/400" className="bg-white/5 border-white/10 flex-1" />
                  <Button variant="outline" className="border-white/10">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button className="bg-primary" onClick={() => {
                  toast({ title: "Project Saved" });
                  setIsAdding(false);
                }}>Save Project</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card border-white/5">
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
            {[
              { id: '1', title: "EcoSphere Analytics", stack: "NextJS, D3.js", date: "Jan 12, 2024" },
              { id: '2', title: "NovaFlow CRM", stack: "React, Node.js", date: "Feb 05, 2024" },
              { id: '3', title: "Zenith Commerce", stack: "NextJS, Stripe", date: "Mar 20, 2024" },
            ].map((p) => (
              <TableRow key={p.id} className="border-white/5 hover:bg-white/5 transition-colors">
                <TableCell>
                  <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center">
                    <FolderKanban className="w-6 h-6 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{p.stack}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{p.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                      <Pencil className="w-4 h-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10" onClick={() => handleDelete(p.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
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
