
"use client";

import { Rocket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/5" : "py-8 bg-transparent"}`}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Rocket className="w-4 h-4 text-primary" />
          </div>
          <span className="font-headline font-bold text-lg tracking-tight">Prince<span className="text-primary">.</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Projects", href: "#projects" },
            { label: "Experience", href: "#experience" },
            { label: "Blog", href: "#blog" },
            { label: "Contact", href: "#contact" }
          ].map(item => (
            <Link 
              key={item.label} 
              href={item.href}
              className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/login">
            <button className="text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full border border-white/10 hover:border-primary/50 transition-all">
              Admin
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
