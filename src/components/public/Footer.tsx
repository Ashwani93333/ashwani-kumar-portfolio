"use client";

import Link from "next/link";
import { Rocket, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            <span className="font-headline font-bold text-xl tracking-tighter">PortfoForge</span>
          </Link>
          <p className="text-muted-foreground text-[11px] max-w-xs text-center md:text-left leading-relaxed">
            Built with Next.js, Genkit, and Tailwind CSS. <br />
            Designed for high-performance digital showcases.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
        </div>

        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
          © {currentYear} All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
