"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center section-padding overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.15),transparent_70%)]" />
      
      <div className="relative z-10 text-center max-w-4xl opacity-0 animate-reveal">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border rounded-full border-white/5 bg-white/5 text-[10px] uppercase tracking-[0.2em] font-medium text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available for new opportunities
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold mb-8 leading-[1.1] tracking-tighter text-gradient">
          Crafting digital experiences <br /> with precision & purpose.
        </h1>
        
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Full-stack developer focused on building minimalist, performant, and accessible web applications that solve real-world problems.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="rounded-full px-8 py-6 h-auto bg-foreground text-background hover:bg-foreground/90 transition-all group">
            Explore My Work
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="rounded-full px-8 py-6 h-auto border-white/10 hover:bg-white/5">
            Download Resume
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}