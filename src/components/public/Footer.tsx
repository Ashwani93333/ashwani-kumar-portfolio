
"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
        <div className="flex items-center justify-center gap-6">
          <Link href="#" className="text-muted-foreground hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="space-y-2">
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">
            Built with Next.js, Tailwind & Precision
          </p>
          <p className="text-[9px] text-muted-foreground/50">
            &copy; {currentYear} PortfoForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
