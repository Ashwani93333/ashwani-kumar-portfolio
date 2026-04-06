"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold tracking-[0.2em] uppercase animate-reveal">
          <Sparkles className="w-3 h-3" />
          Full Stack Architect
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-[1.1] tracking-tighter animate-reveal delay-1">
          Crafting Digital <br /> 
          <span className="text-gradient">Experiences</span> With <br />
          Precision & Code.
        </h1>

        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed animate-reveal delay-2">
          I build scalable applications using modern stacks. Focused on performance, accessibility, and high-quality user interfaces.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal delay-3 pt-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 text-[12px] font-bold group">
            View My Work
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-[12px] font-bold">
            <Download className="mr-2 w-4 h-4" />
            Download Resume
          </Button>
        </div>

        <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-reveal delay-3">
          {[
            { label: "Completed Projects", value: "24+" },
            { label: "Years Experience", value: "06" },
            { label: "Open Source", value: "12" },
            { label: "Satisfied Clients", value: "100%" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-headline font-bold text-white">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
