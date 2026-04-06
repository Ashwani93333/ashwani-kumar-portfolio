"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const blogs = [
  {
    title: "The Future of Web Rendering",
    summary: "Exploring the nuances between Server Components, Static Exporting, and Edge Computing.",
    date: "March 15, 2024",
    readTime: "6 min read",
    image: "https://picsum.photos/seed/b1/800/500"
  },
  {
    title: "Scaling Design Systems",
    summary: "How to maintain consistency across large-scale applications with Atomic Design principles.",
    date: "Feb 28, 2024",
    readTime: "8 min read",
    image: "https://picsum.photos/seed/b2/800/500"
  }
];

export function Blogs() {
  return (
    <section id="blog" className="section-padding bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <h2 className="text-3xl font-headline font-bold tracking-tighter">Insights</h2>
            <p className="text-muted-foreground text-sm max-w-lg">
              Thoughts on technology, engineering, and digital architecture.
            </p>
          </div>
          <Link href="#" className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:gap-3 transition-all">
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog, i) => (
            <Card key={i} className="glass-card flex flex-col md:flex-row border-white/5 overflow-hidden">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  data-ai-hint="blog tech"
                />
              </div>
              <div className="md:w-2/3 p-6 space-y-4 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blog.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime}</span>
                </div>
                <h3 className="font-headline font-bold text-xl group-hover:text-primary transition-colors">{blog.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{blog.summary}</p>
                <Link href="#" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-primary group">
                  Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
