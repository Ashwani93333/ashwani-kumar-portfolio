"use client";

import {
  Github,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Heart,
  Code2,
  TerminalSquare,
} from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Ashwani93333",
      label: "GitHub",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/___ashwani01/",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ashwani-kumar-128240383",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="relative border-t border-white/5 pt-20 pb-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Brand Section */}
          <div className="space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <TerminalSquare className="w-5 h-5 text-primary" />
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  Ashwani Kumar
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
                  Backend Developer
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Engineering scalable backend systems, microservices, and AI-driven
              solutions with precision, performance, and innovation.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground">
              Connect
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  className="group relative p-3 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <ArrowUpRight className="w-3 h-3 absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-primary transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-5 text-center md:text-right">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground">
              Stack
            </p>

            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              {["Next.js", "Tailwind", "Spring Boot", "PostgreSQL"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="text-[10px] uppercase tracking-wider px-3 py-2 rounded-full border border-white/10 bg-white/[0.02] text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-primary" />
            Crafted for innovation & impact
          </p>

          <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
            © {currentYear} Ashwani Kumar • Built with code{" "}
            <Heart className="w-3 h-3 text-primary fill-primary/30" />
          </p>
        </div>
      </div>
    </footer>
  );
}