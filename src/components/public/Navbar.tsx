
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Rocket, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Stack", href: "#tech-stack" },
  { name: "Track Record", href: "#track-record" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 bg-white shadow-md",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-white/10 py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Rocket className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
          <span className="font-headline font-bold text-lg tracking-tight">Ashwani</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-8 text-[11px] uppercase tracking-tighter border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary font-bold"
          >
            <a href="/Ashwani-Kumar-Resume.pdf" download>
              <Download className="w-3 h-3 mr-2" />
              Resume
            </a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-muted-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-white/10 p-6 space-y-4 animate-reveal">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="outline" className="w-full justify-center">
            <a href="/Ashwani-Kumar-Resume.pdf" download>
              <Download className="w-3 h-3 mr-2" />
              Resume
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
