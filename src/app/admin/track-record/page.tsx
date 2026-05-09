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
import { Plus, Pencil, Trash2, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/track-records`;

interface TrackRecord {
  id: number;
  title: string;
  subtitle: string;
  label: string;
  description: string;
}

const emptyForm = {
  title: "",
  subtitle: "",
  label: "",
  description: "",
};

export default function ManageTrackRecord() {
  const { toast } = useToast();

  const [records, setRecords] = useState<TrackRecord[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TrackRecord | null>(
    null
  );

  const [formData, setFormData] = useState(emptyForm);

  // =========================
  // GET LOCAL TOKEN
  // =========================
  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  // =========================
  // COMMON AUTH HEADERS
  // =========================
  const getAuthHeaders = () => {
    const token = getToken();

    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Please login first.",
        variant: "destructive",
      });

      throw new Error("No token found");
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  // =========================
  // HANDLE API AUTH ERRORS
  // =========================
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

  // =========================
  // FETCH TRACK RECORDS
  // =========================
  const fetchTrackRecords = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });

      if (handleUnauthorized(res.status)) return;

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setRecords(data);
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to fetch track records.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTrackRecords();
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setFormData(emptyForm);
    setSelectedRecord(null);
  };

  // =========================
  // ADD TRACK RECORD (POST)
  // =========================
  const handleAdd = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      if (handleUnauthorized(res.status)) return;

      if (!res.ok) throw new Error("Save failed");

      const newRecord = await res.json();

      setRecords((prev) => [...prev, newRecord]);

      toast({
        title: "Achievement Saved",
        description: "Track record entry added successfully.",
      });

      setIsAdding(false);
      resetForm();
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to add track record.",
        variant: "destructive",
      });
    }
  };

  // =========================
  // OPEN EDIT DIALOG
  // =========================
  const handleEditClick = (record: TrackRecord) => {
    setSelectedRecord(record);

    setFormData({
      title: record.title,
      subtitle: record.subtitle,
      label: record.label,
      description: record.description,
    });

    setIsEditing(true);
  };

  // =========================
  // UPDATE TRACK RECORD (PUT)
  // =========================
  const handleUpdate = async () => {
    if (!selectedRecord) return;

    try {
      const res = await fetch(`${API_URL}?id=${selectedRecord.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      if (handleUnauthorized(res.status)) return;

      if (!res.ok) throw new Error("Update failed");

      const updatedRecord = await res.json();

      setRecords((prev) =>
        prev.map((record) =>
          record.id === updatedRecord.id ? updatedRecord : record
        )
      );

      toast({
        title: "Achievement Updated",
        description: "Track record updated successfully.",
      });

      setIsEditing(false);
      resetForm();
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to update track record.",
        variant: "destructive",
      });
    }
  };

  // =========================
  // DELETE TRACK RECORD
  // =========================
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (handleUnauthorized(res.status)) return;

      if (!res.ok) throw new Error("Delete failed");

      setRecords((prev) => prev.filter((record) => record.id !== id));

      toast({
        title: "Achievement Deleted",
        description: "Track record entry has been removed.",
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to delete track record.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-headline font-bold">Track Record</h2>
          <p className="text-xs text-muted-foreground">
            Evidence of depth: hackathons, contests, and awards
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
              <Plus className="w-3 h-3 mr-2" /> Add Achievement
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-xl glass-card border-white/10">
            <DialogHeader>
              <DialogTitle className="text-lg font-headline">
                Add Track Record Entry
              </DialogTitle>
            </DialogHeader>

            <TrackRecordForm
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
              Update Track Record
            </DialogTitle>
          </DialogHeader>

          <TrackRecordForm
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
              <TableHead className="text-xs">Achievement</TableHead>
              <TableHead className="text-xs">Label</TableHead>
              <TableHead className="text-right text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {records.map((record) => (
              <TableRow
                key={record.id}
                className="border-white/5 hover:bg-white/5 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                      <Award className="w-4 h-4 text-muted-foreground" />
                    </div>

                    <div>
                      <p className="text-xs font-medium">{record.title}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {record.subtitle}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-muted-foreground uppercase tracking-wider">
                    {record.label}
                  </span>
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

// ======================================
// FORM COMPONENT
// ======================================
function TrackRecordForm({
  formData,
  handleChange,
}: {
  formData: {
    title: string;
    subtitle: string;
    label: string;
    description: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium">Main Title</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="9th Position"
            className="bg-white/5 border-white/10 text-xs"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium">Label</label>
          <Input
            name="label"
            value={formData.label}
            onChange={handleChange}
            placeholder="Hackathon"
            className="bg-white/5 border-white/10 text-xs"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium">Subtitle / Event Name</label>
        <Input
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          placeholder="Google x PromptWars Hackathon"
          className="bg-white/5 border-white/10 text-xs"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium">Description</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell more about this achievement..."
          className="bg-white/5 border-white/10 min-h-[80px] text-xs"
        />
      </div>
    </div>
  );
}