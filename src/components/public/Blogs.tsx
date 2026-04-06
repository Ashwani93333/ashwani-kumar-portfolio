"use client";

import { BlogPost } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const SAMPLE_POSTS: Partial<BlogPost>[] = [
  {
    id: "1",
    title: "The Art of Minimalist Web Design",
    summary: "Exploring why less is often more when it comes to user experience and interface design.",
    publishedAt: Date.now(),
  },
  {
    id: "2",
    title: "Optimizing Next.js for Performance",
    summary: "A deep dive into server components, streaming, and advanced caching strategies.",
    publishedAt: Date.now() - 86400000 * 7,
  }
];

export function Blogs() {
  return (
    <section id="writing" className="section-padding border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="opacity-0 animate-reveal">
            <h2 className="text-3xl font-headline font-bold tracking-tighter uppercase">Writing</h2>
            <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">Thoughts on design and code</p>
          </div>
          <Link href="#" className="text-[10px] uppercase tracking-widest font-bold hover:text-primary transition-colors flex items-center gap-2 opacity-0 animate-reveal delay-1">
            View All Posts <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-12">
          {SAMPLE_POSTS.map((post, idx) => (
            <Link 
              key={post.id} 
              href={`#`}
              className={`block group opacity-0 animate-reveal delay-${idx + 1}`}
            >
              <div className="grid md:grid-cols-[1fr_2fr] gap-8 py-8 border-b border-white/5 group-hover:border-white/20 transition-all">
                <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium py-1">
                  {new Date(post.publishedAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-headline font-bold group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                    {post.summary}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                    Read Story <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}