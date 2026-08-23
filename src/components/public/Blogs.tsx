"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Skeleton } from "@/components/public/Skeleton";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

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
    content: "Learn how to implement JWT authentication, role-based authorization, secure cookies, and endpoint protection in Spring Boot applications to create production-ready backend systems.",
    date: "2026-05-09",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "Integrating Python ML Models with Spring Boot",
    content: "Explore how to connect Python-based AI/ML models with Spring Boot backend services using APIs, microservices, and automation for intelligent real-world applications.",
    date: "2026-05-08",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Optimizing Database Performance for Scalable Apps",
    content: "Discover best practices for query optimization, indexing, connection pooling, and database architecture to improve backend efficiency and scalability.",
    date: "2026-05-07",
    readTime: "5 min read",
  },
  {
    id: 4,
    title: "Deploying Full-Stack Applications Securely",
    content: "A complete guide to deploying frontend and backend systems with HTTPS, environment variables, secure authentication, server hardening, and production monitoring.",
    date: "2026-05-06",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "AI-Powered Career Guidance Systems for Students",
    content: "Understand how machine learning, recommendation engines, and predictive analytics can be used to build personalized career guidance platforms.",
    date: "2026-05-05",
    readTime: "6 min read",
  },
];

export function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blog`);
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : fallbackPosts);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blogs" className="scroll-mt-24">
      <Reveal>
        <SectionHeading
          path="~/blog"
          title="latest articles"
          subtitle="ls -la posts/ — engineering notes"
        />
      </Reveal>

      {loading ? (
        <Reveal delay={80}>
          <div className="mt-8 term-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>find ./posts -type f -name "*.md"</span>
              <span className="ml-auto text-success">● scanning...</span>
            </div>
            <div className="p-5 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-2 w-8 shrink-0" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-2 w-16 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ) : (
        <div className="mt-8 term-card overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
            <FileText className="w-3.5 h-3.5 text-primary" />
            <span>find ./posts -type f -name "*.md"</span>
            <span className="ml-auto text-success">● {posts.length} files</span>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {posts.map((post, idx) => (
              <Reveal key={post.id} delay={idx * 60} as="div">
                <Link
                  href={`/blogs/${post.id}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 px-5 md:px-6 py-5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="font-code space-y-2 min-w-0">
                    <div className="flex items-center gap-4 text-[10px] font-code text-muted-foreground">
                      <span className="syntax-comment select-none">#</span>
                      <span className="syntax-property">{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h4 className="text-base font-code font-bold group-hover:text-primary transition-colors leading-snug">
                      <span className="syntax-keyword select-none">$</span>{" "}
                      cat {post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 28)}.md
                    </h4>

                    <p className="text-[12px] font-code text-muted-foreground leading-relaxed max-w-2xl line-clamp-2">
                      <span className="syntax-comment select-none"># </span>
                      {post.content.length > 140
                        ? `${post.content.slice(0, 140)}…`
                        : post.content}
                    </p>
                  </div>

                  <div className="shrink-0 md:translate-x-0 md:group-hover:translate-x-2 transition-transform flex items-center gap-2 font-code text-[11px] text-primary">
                    read
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
