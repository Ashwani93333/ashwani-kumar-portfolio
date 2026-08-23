"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Menu, X, GitBranch } from "lucide-react";
import { CoderLogo } from "@/components/public/CoderLogo";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "about", href: "#about" },
  { name: "stack", href: "#tech-stack" },
  { name: "projects", href: "#projects" },
  { name: "experience", href: "#experience" },
  { name: "track-record", href: "#track-record" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track the active section for the nav highlight
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
          : "bg-background/60 backdrop-blur-md border-b border-white/[0.05]"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Brand: coder logo + terminal prompt */}
          <Link href="/" className="flex items-center gap-2 group">
            <CoderLogo className="transition-transform group-hover:scale-110" />
            <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/[0.03] border border-white/10">
              <span className="font-code text-[12px]">
                <span className="syntax-constant select-none">ashwani</span>
                <span className="text-muted-foreground select-none">@</span>
                <span className="syntax-property select-none">kumar</span>
                <span className="text-muted-foreground select-none">:~$</span>
              </span>
            </span>
            <span className="hidden sm:inline font-code text-[12px] text-muted-foreground group-hover:text-primary transition-colors">
              ./portfolio
            </span>
          </Link>

          {/* Desktop nav: command style */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const active = activeSection === link.href.slice(1);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 rounded font-code text-[12px] transition-all",
                    active
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground border border-transparent hover:border-white/10"
                  )}
                >
                  {active ? `[ ${link.name} ]` : link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Status */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded border border-white/10 bg-white/[0.02]">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-success" />
              <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
                ready
              </span>
            </div>

            {/* Resume */}
            <a
              href="/Ashwani-Kumar.Resume.pdf"
              download
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded font-code text-[12px] font-semibold bg-primary text-primary-foreground hover:brightness-110 transition-all border border-primary/50 shadow-[0_0_20px_rgba(250,178,131,0.25)]"
            >
              <Download className="w-3.5 h-3.5" />
              resume.pdf
            </a>

            <button
              className="md:hidden text-muted-foreground hover:text-foreground p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.07] bg-background/95 backdrop-blur-xl animate-fade-up">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
            <div className="flex items-center gap-2 mb-3 font-code text-[11px] text-muted-foreground">
              <GitBranch className="w-3.5 h-3.5" />
              <span>master</span>
              <span className="text-white/20">|</span>
              <span>~/portfolio</span>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-2 py-2.5 rounded font-code text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
              >
                <span className="syntax-comment select-none">$</span>
                cd {link.name}
              </Link>
            ))}

            <a
              href="/Ashwani-Kumar.Resume.pdf"
              download
              className="mt-3 flex items-center justify-center gap-2 px-3 py-2.5 rounded font-code text-sm bg-primary text-primary-foreground hover:brightness-110 transition-all"
            >
              <Download className="w-4 h-4" />
              wget resume.pdf
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
