
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";

const BLOGS = [
  {
    title: "Mastering the Art of Modern Web Animation",
    summary: "Discover the best practices for implementing smooth, performant animations that enhance user experience without being a distraction.",
    date: "May 12, 2024",
    image: "https://picsum.photos/seed/b1/800/500",
    id: "1"
  },
  {
    title: "Why We Switched to Server-Side First Architecture",
    summary: "A deep dive into how shifting our application logic back to the server improved our Core Web Vitals and SEO rankings significantly.",
    date: "April 28, 2024",
    image: "https://picsum.photos/seed/b2/800/500",
    id: "2"
  }
];

export function Blogs() {
  return (
    <section id="blog" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Latest Writing</h2>
            <p className="text-muted-foreground">Thoughts on engineering, design, and productivity.</p>
          </div>
          <Link href="/blog" className="hidden md:flex items-center text-primary font-medium hover:underline">
            View All Posts <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {BLOGS.map((post) => (
            <Card key={post.id} className="glass-card overflow-hidden group">
              <CardHeader className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint="blog post tech"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <h3 className="text-2xl font-bold font-headline group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {post.summary}
                </p>
                <Link href={`/blog/${post.id}`} className="inline-flex items-center text-accent text-sm font-semibold hover:gap-2 transition-all">
                  Read More <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
