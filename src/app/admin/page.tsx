

"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  TrendingUp,
  Loader2,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
// import AIGenerator from "@/components/admin/AIGenerator";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function AdminDashboard() {
  const { toast } = useToast();

  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [messageCount, setMessageCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
    const [totalVisitors, setTotalVisitors] = useState(0);
      const [uniqueVisitors, setUniqueVisitors] = useState(0);


  const [blogCount, setBlogCount] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);


  const [loading, setLoading] = useState(true);

  // PROJECT DIALOG STATE
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const CONTACT_API = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`;
  const PROJECT_API = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`;
  const BLOG_API = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog`;

  //Blog Post
  // ADD THESE STATES near your other useState hooks
const [isAddingBlog, setIsAddingBlog] = useState(false);
const [blogTitle, setBlogTitle] = useState("");
const [blogContent, setBlogContent] = useState("");
const [blogDate, setBlogDate] = useState("");
const [blogReadTime, setBlogReadTime] = useState("");

  /**
   * GET TOKEN
   */
  const getToken = () => localStorage.getItem("accessToken");

  /**
   * AUTH HEADERS
   */
  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  });


    
  /**
 * CREATE BLOG
 */
const handleCreateBlog = async () => {
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

    const blogPayload = {
      title: blogTitle,
      content: blogContent,
      date: blogDate,
      readTime: blogReadTime,
    };

    const response = await fetch(BLOG_API, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(blogPayload),
    });

    if (!response.ok) {
      throw new Error("Failed to create blog");
    }

    toast({
      title: "Blog Published",
      description: "New blog added successfully.",
    });

    // RESET
    setBlogTitle("");
    setBlogContent("");
    setBlogDate("");
    setBlogReadTime("");
    setIsAddingBlog(false);

    fetchBlog();
  } catch (error) {
    toast({
      title: "Error",
      description: "Unable to publish blog.",
      variant: "destructive",
    });
  }
};


  // TRACK VISITOR

  const fetchVisitors = async () => {
    try {
      const response = await fetch(VISITOR_API, {
        method: "GET",
      });

      const data = await response.json();
      setTotalVisitors(data.totalVisits);
      setUniqueVisitors(data.uniqueVisitors);

      if (!response.ok) {
        throw new Error("Failed to track visitor");
      }
    } catch (error) {
      console.error("Error tracking visitor:", error);
    }
  };


  /**
   * FETCH CONTACT MESSAGES
   */
  const fetchDashboardMessages = async () => {
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

      const response = await fetch(CONTACT_API, {
        method: "GET",
        headers: authHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data: ContactMessage[] = await response.json();

      setMessageCount(data.length);

      const sorted = data
        .sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        )
        .slice(0, 3);

      setRecentMessages(sorted);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard messages.",
        variant: "destructive",
      });
    }
  };


  // fetch visitor stats
  const fetchVisitor = async () => {
    try {
    
      const response = await fetch(VISITOR_API, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch visitor stats");
      }

      const data = await response.json();
      setTotalVisitors(data.totalVisits);
      setUniqueVisitors(data.uniqueVisitors);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load projects.",
        variant: "destructive",
      });
    }
  };

  /**
   * FETCH PROJECTS
   */
  const fetchProjects = async () => {
    try {
      const token = getToken();

      if (!token) return;

      const response = await fetch(PROJECT_API, {
        method: "GET",
        headers: authHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjectCount(data.length);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load projects.",
        variant: "destructive",
      });
    }
  };

  const fetchBlog = async () => {
    try {
      const token = getToken();

      if (!token) return;

      const response = await fetch(BLOG_API, {
        method: "GET",
        headers: authHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      setBlogCount(data.length);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load blogs.",
        variant: "destructive",
      });
    }
  };

  /**
   * CREATE PROJECT
   */
  const handleCreateProject = async () => {
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

      const projectPayload = {
        title,
        description,
        techStack: techStack.split(",").map((t) => t.trim()),
        externalLink,
        imageUrl,
      };

      const response = await fetch(PROJECT_API, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(projectPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      toast({
        title: "Project Created",
        description: "New project added successfully.",
      });

      // RESET FORM
      setTitle("");
      setDescription("");
      setTechStack("");
      setExternalLink("");
      setImageUrl("");
      setIsAdding(false);

      fetchProjects();
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to create project.",
        variant: "destructive",
      });
    }
  };

  /**
   * INITIALIZE DASHBOARD
   */
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await Promise.all([
        fetchDashboardMessages(),
        fetchProjects(),
        fetchBlog(),
        
      ]);
      setLoading(false);
    };

    initialize();
  }, []);

  /**
   * DASHBOARD STATS
   */
  const stats = [
    {
      label: "Total Projects",
      value: projectCount.toString(),
      icon: FolderKanban,
      color: "text-blue-400",
    },
    {
      label: "Blog Posts",
      value: blogCount.toString() || "2",
      icon: FileText,
      color: "text-purple-400",
    },
    {
      label: "Messages",
      value: messageCount.toString(),
      icon: MessageSquare,
      color: "text-emerald-400",
    },
    {
      label: "Site Visitors",
      value: "55",
      icon: TrendingUp,
      color: "text-orange-400",
    },
      {
      label: "Unique Visitors",
      value: uniqueVisitors.toString(),
      icon: TrendingUp,
      color: "text-cyan-400",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* DASHBOARD STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="glass-card border-white/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-400">
                  +12%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* RECENT MESSAGES */}
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline">
              Recent Messages
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {recentMessages.length > 0 ? (
                recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                      {msg.name.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {msg.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {msg.message}
                      </p>
                    </div>

                    <p className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {new Date(
                        msg.date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  No recent messages available.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* QUICK ACTIONS */}
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline">
              Quick Actions
            </CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4">
            {/* NEW PROJECT */}
            <Dialog
              open={isAdding}
              onOpenChange={setIsAdding}
            >
              <DialogTrigger asChild>
                <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all gap-2 group">
                  <FolderKanban className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">
                    New Project
                  </span>
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl glass-card border-white/10 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-headline">
                    Create New Project
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* TITLE */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Project Title
                    </label>
                    <Input
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                      placeholder="Cool SaaS Product"
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Description
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }
                      placeholder="Tell us about the project..."
                      className="bg-white/5 border-white/10 min-h-[120px]"
                    />
                  </div>

                  {/* AI DESCRIPTION */}
                  {/* <AIGenerator
                    type="project"
                    onGenerated={setDescription}
                  /> */}

                  {/* TECH + LINK */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Tech Stack
                      </label>
                      <Input
                        value={techStack}
                        onChange={(e) =>
                          setTechStack(
                            e.target.value
                          )
                        }
                        placeholder="React, NextJS, Firebase"
                        className="bg-white/5 border-white/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        External Link
                      </label>
                      <Input
                        value={externalLink}
                        onChange={(e) =>
                          setExternalLink(
                            e.target.value
                          )
                        }
                        placeholder="https://example.com"
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Cover Image URL
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={imageUrl}
                        onChange={(e) =>
                          setImageUrl(
                            e.target.value
                          )
                        }
                        placeholder="https://..."
                        className="bg-white/5 border-white/10 flex-1"
                      />

                      <Button
                        variant="outline"
                        className="border-white/10"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setIsAdding(false)
                      }
                    >
                      Cancel
                    </Button>

                    <Button
                      className="bg-primary"
                      onClick={
                        handleCreateProject
                      }
                    >
                      Save Project
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* BLOG */}
            <Dialog open={isAddingBlog} onOpenChange={setIsAddingBlog}>
  <DialogTrigger asChild>
    <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-all gap-2 group">
      <FileText className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
      <span className="text-xs font-semibold">
        Write Post
      </span>
    </button>
  </DialogTrigger>

  <DialogContent className="max-w-2xl glass-card border-white/10 max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="text-2xl font-headline">
        Create New Blog Post
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-6 py-4">
      {/* BLOG TITLE */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Blog Title
        </label>
        <Input
          value={blogTitle}
          onChange={(e) =>
            setBlogTitle(e.target.value)
          }
          placeholder="Enter blog title..."
          className="bg-white/5 border-white/10"
        />
      </div>

      {/* BLOG CONTENT */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Blog Content
        </label>
        <Textarea
          value={blogContent}
          onChange={(e) =>
            setBlogContent(e.target.value)
          }
          placeholder="Write your technical article..."
          className="bg-white/5 border-white/10 min-h-[200px]"
        />
      </div>

      {/* OPTIONAL AI */}
      {/* 
      <AIGenerator
        type="blog"
        onGenerated={setBlogContent}
      />
      */}

      {/* DATE + READ TIME */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Publish Date
          </label>
          <Input
            value={blogDate}
            onChange={(e) =>
              setBlogDate(e.target.value)
            }
            placeholder="2026-05-09"
            className="bg-white/5 border-white/10"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Read Time
          </label>
          <Input
            value={blogReadTime}
            onChange={(e) =>
              setBlogReadTime(e.target.value)
            }
            placeholder="5 min read"
            className="bg-white/5 border-white/10"
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
        <Button
          variant="outline"
          onClick={() =>
            setIsAddingBlog(false)
          }
        >
          Cancel
        </Button>

        <Button
          className="bg-accent"
          onClick={handleCreateBlog}
        >
          Publish Blog
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}