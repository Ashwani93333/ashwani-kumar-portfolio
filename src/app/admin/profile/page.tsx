
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, FileText, Upload, Save, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminProfile() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your professional information has been saved successfully.",
      });
    }, 1200);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="font-headline">Personal Details</CardTitle>
              <CardDescription>Manage your name, bio, and professional role.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <Input defaultValue="Admin User" className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Professional Role</label>
                  <Input defaultValue="Full Stack Developer" className="bg-white/5 border-white/10" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Professional Bio</label>
                <Textarea 
                  defaultValue="I build scalable web applications with a focus on performance and user experience."
                  className="bg-white/5 border-white/10 min-h-[120px]" 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="font-headline">Skills & Achievements</CardTitle>
              <CardDescription>Add your core competencies and key career highlights.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Skills (comma separated)</label>
                <Input defaultValue="TypeScript, React, Next.js, Node.js, PostgreSQL, AWS" className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Achievements (one per line)</label>
                <Textarea 
                  defaultValue="Winner of Global Hackathon 2023\nFeatured in Tech Weekly\nArchitected systems for 1M+ users"
                  className="bg-white/5 border-white/10 min-h-[100px]" 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" /> Profile Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative group mx-auto w-32 h-32 rounded-3xl overflow-hidden border-2 border-primary/20 bg-secondary flex items-center justify-center">
                <img src="https://picsum.photos/seed/profile/400/400" alt="Avatar" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </div>
              <Button variant="outline" className="w-full border-white/10 text-xs">Update Avatar</Button>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" /> Resume PDF
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">resume_final_v2.pdf</p>
                  <p className="text-[10px] text-muted-foreground uppercase">PDF • 1.2 MB</p>
                </div>
              </div>
              <Button variant="outline" className="w-full border-white/10 text-xs">Upload New Resume</Button>
            </CardContent>
          </Card>

          <Button disabled={loading} className="w-full bg-primary hover:bg-primary/90 py-6 h-auto">
            {loading ? "Saving Changes..." : "Save Profile"}
            <Save className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
