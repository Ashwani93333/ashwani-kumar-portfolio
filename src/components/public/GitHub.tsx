
"use client";

import { Github, ArrowRight } from "lucide-react";
import Link from "next/link";

export function GitHub() {
  // Mock contribution grid data
  const weeks = Array.from({ length: 40 }, () => 
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 4))
  );

  const getIntensity = (level: number) => {
    if (level === 0) return "bg-white/5";
    if (level === 1) return "bg-primary/20";
    if (level === 2) return "bg-primary/50";
    return "bg-primary";
  };

  return (
    <section className="animate-reveal opacity-0" style={{ animationDelay: '0.2s' }}>
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary flex items-center gap-2">
            <Github className="w-4 h-4" /> Open Source Work
          </h2>
          <p className="text-muted-foreground text-xs">
            Contribution activity from the last year. Click a day for details.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/[0.02]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">Total Contributions</p>
              <p className="text-2xl font-headline font-bold">610</p>
              <p className="text-[10px] text-muted-foreground">In the last year</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">Longest Streak</p>
              <p className="text-2xl font-headline font-bold">10 <span className="text-xs font-normal text-muted-foreground">days</span></p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">Public Repos</p>
              <p className="text-2xl font-headline font-bold">45</p>
            </div>
            <div className="flex items-end justify-end">
              <Link 
                href="https://github.com" 
                target="_blank"
                className="text-[10px] uppercase font-bold tracking-widest text-primary hover:text-white transition-colors flex items-center gap-2 group"
              >
                View profile on GitHub 
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="flex gap-[3px] overflow-hidden">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {week.map((day, j) => (
                  <div 
                    key={j} 
                    className={`w-[10px] h-[10px] rounded-sm transition-colors hover:ring-1 hover:ring-white/20 ${getIntensity(day)}`} 
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-[9px] text-muted-foreground uppercase tracking-tighter">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-sm bg-white/5" />
              <div className="w-2 h-2 rounded-sm bg-primary/20" />
              <div className="w-2 h-2 rounded-sm bg-primary/50" />
              <div className="w-2 h-2 rounded-sm bg-primary" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
