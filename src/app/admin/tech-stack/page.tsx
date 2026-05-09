
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Plus, Pencil, Trash2, Code2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ManageTechStack() {
  const { toast } = useToast();

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const [formData, setFormData] = useState({
    categoryName: "",
    skills: "",
    displayOrder: 1,
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      toast({ title: "Failed to fetch data", variant: "destructive" });
    }
  };

  // 🔥 HANDLERS
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Create failed");
      }

      toast({ title: "Category Added" });
      setIsAdding(false);
      setFormData({ categoryName: "", skills: "", displayOrder: 1 });
      fetchCategories();
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/${selectedCategory.id}`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Update failed on server");

      toast({ title: "Updated Successfully" });
      setIsEditing(false);
      fetchCategories();
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Delete failed");

      toast({ title: "Deleted Successfully" });
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      toast({ title: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-headline font-bold">Tech Stack</h2>
          <p className="text-xs text-muted-foreground">Categorized skills and tools</p>
        </div>

        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-xs">
              <Plus className="w-3 h-3 mr-2" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader><DialogTitle>Add Skill Category</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Category Name"
                value={formData.categoryName}
                onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
              />
              <Input
                placeholder="Skills (comma separated)"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
              <Input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={loading}>
                   {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((s: any) => (
              <TableRow key={s.id}>
                <TableCell className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> {s.categoryName}
                </TableCell>
                <TableCell>
                  {Array.isArray(s.skills) ? s.skills.join(", ") : s.skills}
                </TableCell>
                <TableCell>{s.displayOrder}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedCategory(s);
                        setFormData({
                          categoryName: s.categoryName,
                          skills: Array.isArray(s.skills) ? s.skills.join(", ") : s.skills,
                          displayOrder: s.displayOrder,
                        });
                        setIsEditing(true);
                      }}
                    >
                      <Pencil className="w-3 h-3 text-primary" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(s.id)}>
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-xl">
          <DialogHeader><DialogTitle>Update Category</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input
              value={formData.categoryName}
              onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
            />
            <Input
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
            <Input
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleUpdate} disabled={loading}>
                 {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}