"use client";

import { useEffect, useState } from "react";
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
import { Plus, Pencil, Trash2, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/education`;

interface EducationRecord {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  result: string;
}

const emptyForm = {
  institution: "",
  degree: "",
  duration: "",
  result: "",
};

export default function ManageEducation() {
  const { toast } = useToast();

  const [educationRecords, setEducationRecords] = useState<EducationRecord[]>(
    []
  );
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEducation, setSelectedEducation] =
    useState<EducationRecord | null>(null);

  const [formData, setFormData] = useState(emptyForm);

  // ============================================
  // TOKEN HANDLING
  // ============================================
  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  const getAuthHeaders = () => {
    const token = getToken();

    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Please login as admin.",
        variant: "destructive",
      });

      throw new Error("No token found");
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const handleUnauthorized = (status: number) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");

      toast({
        title: "Session Expired",
        description: "Please login again.",
        variant: "destructive",
      });

      window.location.href = "/login";
      return true;
    }

    return false;
  };

  // ============================================
  // FETCH EDUCATION RECORDS
  // ============================================
  const fetchEducationRecords = async () => {
    try {
      const res = await fetch(API_URL);

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setEducationRecords(data);
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to fetch education records.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEducationRecords();
  }, []);

  // ============================================
  // HANDLE FORM INPUT
  // ============================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ============================================
  // RESET FORM
  // ============================================
  const resetForm = () => {
    setFormData(emptyForm);
    setSelectedEducation(null);
  };

  // ============================================
  // CREATE EDUCATION ENTRY (POST)
  // ============================================
  const handleAdd = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      if (handleUnauthorized(res.status)) return;

      if (!res.ok) throw new Error("Failed to create");

      const newRecord = await res.json();

      setEducationRecords((prev) => [...prev, newRecord]);

      toast({
        title: "Education Saved",
        description: "Education entry added successfully.",
      });

      setIsAdding(false);
      resetForm();
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to add education entry.",
        variant: "destructive",
      });
    }
  };

  // ============================================
  // OPEN EDIT DIALOG
  // ============================================
  const handleEditClick = (record: EducationRecord) => {
    setSelectedEducation(record);

    setFormData({
      institution: record.institution,
      degree: record.degree,
      duration: record.duration,
      result: record.result,
    });

    setIsEditing(true);
  };

  // ============================================
  // UPDATE EDUCATION ENTRY (PUT)
  // ============================================
  const handleUpdate = async () => {
    if (!selectedEducation) return;

    try {
      const res = await fetch(`${API_URL}?id=${selectedEducation.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      if (handleUnauthorized(res.status)) return;

      if (!res.ok) throw new Error("Update failed");

      const updatedRecord = await res.json();

      setEducationRecords((prev) =>
        prev.map((record) =>
          record.id === updatedRecord.id ? updatedRecord : record
        )
      );

      toast({
        title: "Education Updated",
        description: "Education entry updated successfully.",
      });

      setIsEditing(false);
      resetForm();
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to update education entry.",
        variant: "destructive",
      });
    }
  };

  // ============================================
  // DELETE EDUCATION ENTRY
  // ============================================
  const handleDelete = async (id: number) => {
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

      const res = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (handleUnauthorized(res.status)) return;

      if (!res.ok) throw new Error("Delete failed");

      setEducationRecords((prev) =>
        prev.filter((record) => record.id !== id)
      );

      toast({
        title: "Education Entry Deleted",
        description: "Academic record has been removed.",
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to delete education entry.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-headline font-bold">Education</h2>
          <p className="text-xs text-muted-foreground">
            Academic credentials and certifications
          </p>
        </div>

        {/* ADD DIALOG */}
        <Dialog
          open={isAdding}
          onOpenChange={(open) => {
            setIsAdding(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-xs">
              <Plus className="w-3 h-3 mr-2" /> Add Education
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-xl glass-card border-white/10">
            <DialogHeader>
              <DialogTitle className="text-lg font-headline">
                Add Education Entry
              </DialogTitle>
            </DialogHeader>

            <EducationForm
              formData={formData}
              handleChange={handleChange}
            />

            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAdding(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>

              <Button
                className="bg-primary text-xs"
                size="sm"
                onClick={handleAdd}
              >
                Save Entry
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* EDIT DIALOG */}
      <Dialog
        open={isEditing}
        onOpenChange={(open) => {
          setIsEditing(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent className="max-w-xl glass-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-lg font-headline">
              Update Education Entry
            </DialogTitle>
          </DialogHeader>

          <EducationForm
            formData={formData}
            handleChange={handleChange}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEditing(false);
                resetForm();
              }}
            >
              Cancel
            </Button>

            <Button
              className="bg-primary text-xs"
              size="sm"
              onClick={handleUpdate}
            >
              Update Entry
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* TABLE */}
      <Card className="glass-card border-white/5">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-xs">
                Institution & Degree
              </TableHead>
              <TableHead className="text-xs">Duration</TableHead>
              <TableHead className="text-xs">Result</TableHead>
              <TableHead className="text-right text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {educationRecords.map((record) => (
              <TableRow
                key={record.id}
                className="border-white/5 hover:bg-white/5 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    </div>

                    <div>
                      <p className="text-xs font-medium">
                        {record.degree}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {record.institution}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-[10px] text-muted-foreground">
                  {record.duration}
                </TableCell>

                <TableCell className="text-[10px] text-muted-foreground">
                  {record.result}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {/* EDIT */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-white/10"
                      onClick={() => handleEditClick(record)}
                    >
                      <Pencil className="w-3 h-3 text-primary" />
                    </Button>

                    {/* DELETE */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-destructive/10"
                      onClick={() => handleDelete(record.id)}
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

// ============================================
// FORM COMPONENT
// ============================================
function EducationForm({
  formData,
  handleChange,
}: {
  formData: {
    institution: string;
    degree: string;
    duration: string;
    result: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <label className="text-xs font-medium">Institution</label>
        <Input
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          placeholder="Maharaja Agrasen Institute of Technology"
          className="bg-white/5 border-white/10 text-xs"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium">Degree / Course</label>
        <Input
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          placeholder="B.Tech in Computer Science"
          className="bg-white/5 border-white/10 text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium">Duration</label>
          <Input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="2023 - 2027"
            className="bg-white/5 border-white/10 text-xs"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium">Result</label>
          <Input
            name="result"
            value={formData.result}
            onChange={handleChange}
            placeholder="CGPA: 8.78 / 10"
            className="bg-white/5 border-white/10 text-xs"
          />
        </div>
      </div>
    </div>
  );
}