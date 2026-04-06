"use client";

import Link from "next/link";
import { Rocket, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <div className="flex items-center justify-between w-full max-w-5xl px-4 py-3 border rounded-full glass-card pointer-events-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-8 h-8 transition-transform rounded-full bg-primary/10 group-hover:rotate-12">
            <Rocket className="w-4 h-4 text-primary" />
          </div>
          <span className="font-headline font-bold text-sm tracking-tighter">PORTFOFORGE</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {["Work", "Writing", "Contact"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8" asChild>
            <Link href="https://github.com" target="_blank">
              <Github className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8" asChild>
            <Link href="https://linkedin.com" target="_blank">
              <Linkedin className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}