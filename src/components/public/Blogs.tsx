"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  readTime: string;
}

const fallbackPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Secure REST APIs with Spring Boot",
    content:
      "Learn how to implement JWT authentication, role-based authorization, secure cookies, and endpoint protection in Spring Boot applications to create production-ready backend systems.",
    date: "2026-05-09",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "Integrating Python Machine Learning Models with Spring Boot",
    content:
      "Explore how to connect Python-based AI/ML models with Spring Boot backend services using APIs, microservices, and automation for intelligent real-world applications.",
    date: "2026-05-08",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Optimizing Database Performance for Scalable Web Applications",
    content:
      "Discover best practices for query optimization, indexing, connection pooling, and database architecture to improve backend efficiency and scalability.",
    date: "2026-05-07",
    readTime: "5 min read",
  },
  {
    id: 4,
    title: "Deploying Full-Stack Applications Securely",
    content:
      "A complete guide to deploying frontend and backend systems with HTTPS, environment variables, secure authentication, server hardening, and production monitoring.",
    date: "2026-05-06",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "AI-Powered Career Guidance Systems for Students",
    content:
      "Understand how machine learning, recommendation engines, and predictive analytics can be used to build personalized career guidance platforms.",
    date: "2026-05-05",
    readTime: "6 min read",
  },
];

export function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blog`);
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setPosts(fallbackPosts);
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section
      id="blog"
      className="animate-reveal opacity-0"
      style={{ animationDelay: "0.6s" }}
    >
      <div className="space-y-12">
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">
            Insights
          </h2>
          <h3 className="text-2xl font-headline font-bold">
            Latest Articles
          </h3>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading blogs...</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground">No blogs available.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.id}`}
                className="block group"
              >
                <div className="glass-card p-6 border-white/5 group-hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h4 className="text-xl font-headline font-bold group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>

                    <p className="text-muted-foreground text-xs leading-relaxed max-w-xl">
                      {post.content.length > 120
                        ? `${post.content.substring(0, 120)}...`
                        : post.content}
                    </p>
                  </div>

                  <div className="hidden md:block group-hover:translate-x-2 transition-transform">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}