
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminProfile() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ STATES
  const [fullName, setFullName] = useState("");
  const [professionalRole, setProfessionalRole] = useState("");
  const [location, setLocation] = useState("");
  const [professionalBio, setProfessionalBio] = useState("");
  const [skills, setSkills] = useState("");
  const [achievements, setAchievements] = useState("");

  // ✅ FETCH PROFILE (IMPORTANT 🔥)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`
        );

        if (!res.ok) return;

        const data = await res.json();

        // SET VALUES (DO NOT RESET ON REFRESH)
        setFullName(data.fullName || "");
        setProfessionalRole(data.professionalRole || "");
        setLocation(data.location || "");
        setProfessionalBio(data.professionalBio || "");
        setSkills((data.coreSkills || []).join(", "));
        setAchievements((data.engineeringPhilosophy || []).join("\n"));
      } catch (err) {
        console.error("Fetch profile error:", err);
      }
    };

    fetchProfile();
  }, []);

  // ✅ SAVE PROFILE
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName,
            professionalRole,
            location,
            professionalBio,
            coreSkills: skills.split(",").map((s) => s.trim()),
            engineeringPhilosophy: achievements.split("\n"),
            profileImageUrl:
              "https://picsum.photos/seed/profile/400/400",
            resumeUrl: "prince_pal_resume.pdf",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save");
      }

      toast({
        title: "Success",
        description: "Profile updated 🚀",
      });

      setIsEditing(false); // 🔥 disable editing after save
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      
    
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">

          {/* PERSONAL */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>Manage your info</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">

                <Input
                  placeholder="Full Name"
                  value={fullName}
                  disabled={!isEditing}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <Input
                  placeholder="Role"
                  value={professionalRole}
                  disabled={!isEditing}
                  onChange={(e) => setProfessionalRole(e.target.value)}
                />
              </div>

              <Input
                placeholder="Location"
                value={location}
                disabled={!isEditing}
                onChange={(e) => setLocation(e.target.value)}
              />

              <Textarea
                placeholder="Bio"
                value={professionalBio}
                disabled={!isEditing}
                onChange={(e) => setProfessionalBio(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* SKILLS */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Achievements</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input
                placeholder="Skills (comma separated)"
                value={skills}
                disabled={!isEditing}
                onChange={(e) => setSkills(e.target.value)}
              />

              <Textarea
                placeholder="Achievements (one per line)"
                value={achievements}
                disabled={!isEditing}
                onChange={(e) => setAchievements(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src="https://picsum.photos/seed/profile/400/400"
                className="w-32 h-32 rounded-xl"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs">prince_pal_resume.pdf</p>
            </CardContent>
          </Card>



          {/* 🔥 EDIT BUTTON */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      
          {/* SAVE BUTTON ONLY WHEN EDITING */}
          {isEditing && (
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Saving..." : "Save Profile"}
              <Save className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}


// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Image as ImageIcon, FileText, Upload, Save, CheckCircle2, MapPin } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// export default function AdminProfile() {
//   const { toast } = useToast();

//   const [loading, setLoading] = useState(false);

//   // ✅ STATES (IMPORTANT)
//   const [fullName, setFullName] = useState("");
//   const [professionalRole, setProfessionalRole] = useState("");
//   const [location, setLocation] = useState("");
//   const [professionalBio, setProfessionalBio] = useState("");
//   const [skills, setSkills] = useState("");
//   const [achievements, setAchievements] = useState("");

//   // ✅ API CALL
//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("accessToken");

//       console.log("Token:", token); // debug

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`, // 🔥 REQUIRED
//           },
//           body: JSON.stringify({
//             fullName,
//             professionalRole,
//             location,
//             professionalBio,
//             coreSkills: skills.split(",").map((s) => s.trim()),
//             engineeringPhilosophy: achievements.split("\n"),
//             profileImageUrl: "https://picsum.photos/seed/profile/400/400",
//             resumeUrl: "prince_pal_resume.pdf",
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to save profile");
//       }

//       toast({
//         title: "Profile Updated",
//         description: "Saved successfully 🚀",
//       });

//     } catch (err: any) {
//       console.error(err);

//       toast({
//         title: "Error",
//         description: err.message,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSave} className="space-y-8">
//       <div className="grid md:grid-cols-3 gap-8">
//         <div className="md:col-span-2 space-y-6">

//           {/* PERSONAL DETAILS */}
//           <Card className="glass-card border-white/5">
//             <CardHeader>
//               <CardTitle>Personal Details</CardTitle>
//               <CardDescription>Manage your info</CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">

//                 <div>
//                   <label>Display Name</label>
//                   <Input
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <label>Professional Role</label>
//                   <Input
//                     value={professionalRole}
//                     onChange={(e) => setProfessionalRole(e.target.value)}
//                   />
//                 </div>

//               </div>

//               <div>
//                 <label>Location</label>
//                 <Input
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label>Bio</label>
//                 <Textarea
//                   value={professionalBio}
//                   onChange={(e) => setProfessionalBio(e.target.value)}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* SKILLS */}
//           <Card className="glass-card border-white/5">
//             <CardHeader>
//               <CardTitle>Skills & Achievements</CardTitle>
//             </CardHeader>

//             <CardContent className="space-y-4">
//               <div>
//                 <label>Skills (comma separated)</label>
//                 <Input
//                   value={skills}
//                   onChange={(e) => setSkills(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label>Achievements (one per line)</label>
//                 <Textarea
//                   value={achievements}
//                   onChange={(e) => setAchievements(e.target.value)}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//         </div>

//         {/* RIGHT SIDE */}
//         <div className="space-y-6">

//           <Card>
//             <CardHeader>
//               <CardTitle>Profile Image</CardTitle>
//             </CardHeader>

//             <CardContent>
//               <img
//                 src="https://picsum.photos/seed/profile/400/400"
//                 className="w-32 h-32 rounded-xl"
//               />
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Resume</CardTitle>
//             </CardHeader>

//             <CardContent>
//               <p className="text-xs">prince_pal_resume.pdf</p>
//             </CardContent>
//           </Card>

//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? "Saving..." : "Save Profile"}
//             <Save className="ml-2 w-4 h-4" />
//           </Button>

//         </div>
//       </div>
//     </form>
//   );
// }


//RESUME UPLOAD UI


// "use client";

// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   FileText,
//   Upload,
//   Save,
//   CheckCircle2,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// export default function AdminProfile() {
//   const { toast } = useToast();

//   const [loading, setLoading] = useState(false);

//   // ✅ STATES
//   const [fullName, setFullName] = useState("");
//   const [professionalRole, setProfessionalRole] = useState("");
//   const [location, setLocation] = useState("");
//   const [professionalBio, setProfessionalBio] = useState("");
//   const [skills, setSkills] = useState("");
//   const [achievements, setAchievements] = useState("");

//   // ✅ FILE STATE
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // ✅ FILE HANDLERS
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setResumeFile(e.target.files[0]);
//     }
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };

//   // ✅ API CALL
//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("accessToken");

//       if (!token) {
//         throw new Error("No auth token found. Please login again.");
//       }

//       // 🔥 FORM DATA (IMPORTANT)
//       const formData = new FormData();

//       formData.append("fullName", fullName);
//       formData.append("professionalRole", professionalRole);
//       formData.append("location", location);
//       formData.append("professionalBio", professionalBio);

//       formData.append(
//         "coreSkills",
//         JSON.stringify(skills.split(",").map((s) => s.trim()))
//       );

//       formData.append(
//         "engineeringPhilosophy",
//         JSON.stringify(achievements.split("\n"))
//       );

//       formData.append(
//         "profileImageUrl",
//         "https://picsum.photos/seed/profile/400/400"
//       );

//       // ✅ FILE ATTACH
//       if (resumeFile) {
//         formData.append("resume", resumeFile);
//       }

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`, // ❗ DO NOT set Content-Type
//           },
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to save profile");
//       }

//       toast({
//         title: "Profile Updated",
//         description: "Saved successfully 🚀",
//       });

//     } catch (err: any) {
//       console.error(err);

//       toast({
//         title: "Error",
//         description: err.message,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSave} className="space-y-8">
//       <div className="grid md:grid-cols-3 gap-8">
//         <div className="md:col-span-2 space-y-6">

//           {/* PERSONAL DETAILS */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Personal Details</CardTitle>
//               <CardDescription>Manage your info</CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">

//                 <div>
//                   <label>Display Name</label>
//                   <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
//                 </div>

//                 <div>
//                   <label>Professional Role</label>
//                   <Input value={professionalRole} onChange={(e) => setProfessionalRole(e.target.value)} />
//                 </div>

//               </div>

//               <div>
//                 <label>Location</label>
//                 <Input value={location} onChange={(e) => setLocation(e.target.value)} />
//               </div>

//               <div>
//                 <label>Bio</label>
//                 <Textarea value={professionalBio} onChange={(e) => setProfessionalBio(e.target.value)} />
//               </div>
//             </CardContent>
//           </Card>

//           {/* SKILLS */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Skills & Achievements</CardTitle>
//             </CardHeader>

//             <CardContent className="space-y-4">
//               <div>
//                 <label>Skills (comma separated)</label>
//                 <Input value={skills} onChange={(e) => setSkills(e.target.value)} />
//               </div>

//               <div>
//                 <label>Achievements (one per line)</label>
//                 <Textarea value={achievements} onChange={(e) => setAchievements(e.target.value)} />
//               </div>
//             </CardContent>
//           </Card>

//         </div>

//         {/* RIGHT SIDE */}
//         <div className="space-y-6">

//           {/* RESUME UPLOAD */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-sm flex items-center gap-2">
//                 <FileText className="w-4 h-4" /> Resume PDF
//               </CardTitle>
//             </CardHeader>

//             <CardContent className="space-y-4">
//               <div className="p-3 rounded-xl border flex items-center gap-3">
//                 <CheckCircle2 className="w-4 h-4" />
//                 <div>
//                   <p className="text-xs font-semibold">
//                     {resumeFile ? resumeFile.name : "No file selected"}
//                   </p>
//                   {resumeFile && (
//                     <p className="text-xs">
//                       {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 className="hidden"
//                 accept=".pdf"
//               />

//               <Button type="button" onClick={handleUploadClick}>
//                 <Upload className="w-4 h-4 mr-2" />
//                 Upload Resume
//               </Button>
//             </CardContent>
//           </Card>

//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? "Saving..." : "Save Profile"}
//             <Save className="ml-2 w-4 h-4" />
//           </Button>

//         </div>
//       </div>
//     </form>
//   );
//}