

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Binary, Loader2, ExternalLink, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/coding-profiles`;

export default function ManageCodingProfiles() {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    stats: "",
    description: "",
    link: ""
  });

  // --- AUTH HELPER ---
  // Retrieves the locally saved token
  const getAuthHeader = () => {
    const token = localStorage.getItem("accessToken"); 
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      // Public GET request usually doesn't need a token, but added just in case your API requires it
      const res = await axios.get(API_BASE);
      setProfiles(res.data);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load profiles", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfiles(); }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: "", username: "", stats: "", description: "", link: "" });
    setIsOpen(true);
  };

  const handleOpenEdit = (profile: any) => {
    setIsEditing(true);
    setCurrentId(profile.id);
    setFormData({
      name: profile.name,
      username: profile.username,
      stats: profile.stats,
      description: profile.description || "",
      link: profile.link || ""
    });
    setIsOpen(true);
  };

  // Inside your ManageCodingProfiles.tsx

const handleSave = async () => {
  const headers = getAuthHeader();
  try {
    if (isEditing && currentId) {
      // Note the change: added ?id= at the end of the URL
      await axios.put(`${API_BASE}?id=${currentId}`, formData, { headers });
      toast({ title: "Updated" });
    } else {
      await axios.post(API_BASE, formData, { headers });
      toast({ title: "Success" });
    }
    setIsOpen(false);
    fetchProfiles();
  } catch (error) {
    toast({ title: "Error", variant: "destructive" });
  }
};

const handleDelete = async (id: number) => {
  const headers = getAuthHeader();
  if (!confirm("Remove?")) return;
  try {
    // Note the change: added ?id= here too
    await axios.delete(`${API_BASE}?id=${id}`, { headers });
    toast({ title: "Deleted" });
    fetchProfiles();
  } catch (error) {
    toast({ title: "Error", variant: "destructive" });
  }
};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-headline font-bold">Coding Profiles</h2>
          <p className="text-xs text-muted-foreground">Showcase your DSA progress and platform handles</p>
        </div>
        
        <Button className="bg-primary hover:bg-primary/90 text-xs" onClick={handleOpenAdd}>
          <Plus className="w-3 h-3 mr-2" /> Add Profile
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-xl glass-card border-white/10 text-white bg-slate-900">
            <DialogHeader>
              <DialogTitle className="text-lg font-headline flex items-center gap-2">
                {isEditing ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {isEditing ? "Edit Coding Profile" : "Add Coding Profile"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Platform</label>
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/5 border-white/10 text-xs" placeholder="e.g. LeetCode" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Username</label>
                  <Input value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="bg-white/5 border-white/10 text-xs" placeholder="@username" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Stats Summary</label>
                <Input value={formData.stats} onChange={(e) => setFormData({...formData, stats: e.target.value})} className="bg-white/5 border-white/10 text-xs" placeholder="e.g. 500+ Solved, 5-Star" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Description</label>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  className="bg-white/5 border-white/10 text-xs min-h-[80px]" 
                  placeholder="Describe your focus on this platform..." 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Profile URL</label>
                <Input value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} className="bg-white/5 border-white/10 text-xs" placeholder="https://..." />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button className="bg-primary text-xs" size="sm" onClick={handleSave}>
                  {isEditing ? "Update Changes" : "Save Profile"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card border-white/5 bg-transparent overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-xs">Platform</TableHead>
              <TableHead className="text-xs">Username & Description</TableHead>
              <TableHead className="text-xs">Stats</TableHead>
              <TableHead className="text-right text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-10"><Loader2 className="animate-spin mx-auto opacity-50" /></TableCell></TableRow>
            ) : profiles.map((p: any) => (
              <TableRow key={p.id} className="border-white/5 hover:bg-white/5 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-primary/10">
                      <Binary className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-xs font-bold">{p.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                   <div className="space-y-1">
                      <p className="text-[10px] text-primary font-medium">{p.stats}</p>
                      <p className="text-[10px] text-muted-foreground line-clamp-1 max-w-[200px]">{p.description || "No description provided."}</p>
                   </div>
                </TableCell>
                <TableCell>
                   <span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10">{p.username}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => window.open(p.link, '_blank')}>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-white/10" onClick={() => handleOpenEdit(p)}>
                      <Pencil className="w-3 h-3 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/10" onClick={() => handleDelete(p.id)}>
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