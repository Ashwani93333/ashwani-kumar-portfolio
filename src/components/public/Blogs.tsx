
"use client";

import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export function Blogs() {
  const posts = [
    {
      title: "Mastering Spring Boot Concurrency",
      excerpt: "A deep dive into thread pools, futures, and optimizing throughput in Java applications.",
      date: "Oct 12, 2024",
      readTime: "8 min read"
    },
    {
      title: "Why Go is winning the systems game",
      excerpt: "Exploring the power of goroutines and static binaries for modern infrastructure.",
      date: "Sep 28, 2024",
      readTime: "5 min read"
    }
  ];

  return (
    <section id="blog" className="animate-reveal opacity-0" style={{ animationDelay: '0.6s' }}>
      <div className="space-y-12">
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Insights</h2>
          <h3 className="text-2xl font-headline font-bold">Latest Articles</h3>
        </div>

        <div className="space-y-4">
          {posts.map((post, idx) => (
            <Link key={idx} href="#" className="block group">
              <div className="glass-card p-6 border-white/5 group-hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h4 className="text-xl font-headline font-bold group-hover:text-primary transition-colors">{post.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed max-w-xl">
                    {post.excerpt}
                  </p>
                </div>
                <div className="hidden md:block group-hover:translate-x-2 transition-transform">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
