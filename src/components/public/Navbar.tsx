"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Rocket className="w-4 h-4 text-primary" />
          </div>
          <span className="font-headline font-bold text-lg tracking-tighter">PortfoForge</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[12px] font-medium text-muted-foreground uppercase tracking-widest">
          <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
          <Link href="#blog" className="hover:text-primary transition-colors">Insights</Link>
          <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 mr-4 border-r border-white/10 pr-4">
            <Link href="#" className="text-muted-foreground hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>
          <Button asChild variant="outline" size="sm" className="text-[11px] font-semibold border-white/10 hover:bg-primary/10">
            <Link href="/login">Admin Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
