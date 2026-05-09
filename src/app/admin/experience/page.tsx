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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experience`;

interface Experience {
  id?: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  point: string[];
  employeeType: string;
}

const emptyForm: Experience = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  location: "",
  point: [],
  employeeType: "",
};

export default function ManageExperience() {
  const { toast } = useToast();

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Experience>(emptyForm);

  const getToken = () => localStorage.getItem("accessToken");

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });

  const fetchExperiences = async () => {
    try {
      const token = getToken();
      if (!token) {
        toast({
          title: "Unauthorized",
          description: "Please login first.",
          variant: "destructive",
        });
        return;
      }

      const res = await fetch(API_URL, {
        headers: authHeaders(),
      });

      if (!res.ok) throw new Error("Failed to fetch experiences");

      const data = await res.json();
      setExperiences(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load experiences.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleInputChange = (field: keyof Experience, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "point" ? value.split("\n") : value,
    }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      const token = getToken();
      if (!token) {
        toast({
          title: "Unauthorized",
          description: "Login required.",
          variant: "destructive",
        });
        return;
      }

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Save failed");

      toast({
        title: editingId ? "Experience Updated" : "Experience Added",
      });

      resetForm();
      setIsAdding(false);
      setIsEditing(false);
      fetchExperiences();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save experience.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (exp: Experience) => {
    setFormData(exp);
    setEditingId(exp.id || null);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = getToken();
      if (!token) {
        toast({
          title: "Unauthorized",
          description: "Login required.",
          variant: "destructive",
        });
        return;
      }

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (!res.ok) throw new Error("Delete failed");

      toast({
        title: "Experience Deleted",
        description: "Work history item removed successfully.",
      });

      fetchExperiences();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete experience.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-headline font-bold">Experience</h2>
          <p className="text-xs text-muted-foreground">
            Your professional journey and work history
          </p>
        </div>

        <Dialog
          open={isAdding || isEditing}
          onOpenChange={(open) => {
            if (!open) {
              setIsAdding(false);
              setIsEditing(false);
              resetForm();
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              className="bg-primary hover:bg-primary/90 text-xs"
              onClick={() => {
                resetForm();
                setIsAdding(true);
              }}
            >
              <Plus className="w-3 h-3 mr-2" /> Add Experience
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-xl glass-card border-white/10">
            <DialogHeader>
              <DialogTitle className="text-lg font-headline">
                {editingId ? "Update Work Experience" : "Add Work Experience"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
                <Input
                  placeholder="Job Title"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Start Date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
                <Input
                  placeholder="End Date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />

                <Select
                  value={formData.employeeType}
                  onValueChange={(value) =>
                    handleInputChange("employeeType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Employment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                    <SelectItem value="INTERNSHIP">Internship</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="Description points (one per line)"
                value={formData.point.join("\n")}
                onChange={(e) => handleInputChange("point", e.target.value)}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingId ? "Update Entry" : "Save Entry"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card border-white/5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role & Company</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {experiences.map((e) => (
              <TableRow key={e.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4" />
                    <div>
                      <p>{e.role}</p>
                      <p className="text-xs text-muted-foreground">
                        {e.company}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {e.startDate} - {e.endDate}
                </TableCell>

                <TableCell>{e.employeeType}</TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(e)}
                  >
                    <Pencil className="w-4 h-4 text-primary" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(e.id!)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
