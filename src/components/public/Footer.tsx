"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-background overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-12 opacity-0 animate-reveal">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Rocket className="w-5 h-5 text-primary" />
          </div>
          <span className="font-headline font-bold text-lg tracking-tighter">PORTFOFORGE</span>
        </div>

        <div className="flex gap-12 mb-16 opacity-0 animate-reveal delay-1">
          {["Work", "Writing", "About", "Twitter", "GitHub"].map((link) => (
            <Link 
              key={link} 
              href="#" 
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>

        <div className="w-full pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-0 animate-reveal delay-2">
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground">
            © {year} PORTFOFORGE. BUILT WITH PRECISION.
          </p>
          <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <span className="opacity-20">•</span>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
      
      {/* Huge subtle text decoration */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.02] whitespace-nowrap">
        <span className="text-[20rem] font-headline font-bold uppercase tracking-tighter">
          PORTFOFORGE
        </span>
      </div>
    </footer>
  );
}