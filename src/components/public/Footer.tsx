"use client";

import {
  Github,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Heart,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { CoderLogo } from "@/components/public/CoderLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/Ashwani93333", label: "github" },
    { icon: Instagram, href: "https://www.instagram.com/___ashwani01/", label: "instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ashwani-kumar-128240383", label: "linkedin" },
  ];

  return (
    <footer className="relative border-t border-white/[0.07] pt-16 pb-10 overflow-hidden">
      {/* glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* terminal window footer */}
        <div className="term-card overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
            <CoderLogo glow={false} />
            <span className="syntax-constant select-none">ashwani@kumar</span>
            <span className="text-muted-foreground select-none">:~$</span>
            <span className="text-muted-foreground">whoami --full</span>
          </div>

          <div className="grid md:grid-cols-3 gap-10 p-6 md:p-8">
            {/* brand */}
            <div className="space-y-4">
              <div className="font-code">
                <span className="syntax-property">const</span>{" "}
                <span className="syntax-type">developer</span>{" "}
                <span className="text-muted-foreground">=</span>{" "}
                <span className="syntax-string">"{'Ashwani Kumar'}"</span>
                <span className="syntax-keyword">;</span>
                <br />
                <span className="syntax-property">const</span>{" "}
                <span className="syntax-type">role</span>{" "}
                <span className="text-muted-foreground">=</span>{" "}
                <span className="syntax-string">"{'Backend Engineer'}"</span>
                <span className="syntax-keyword">;</span>
              </div>
              <p className="text-[12px] font-code text-muted-foreground leading-relaxed">
                <span className="syntax-comment"># </span>
                Engineering scalable backend systems, microservices, and AI-driven
                solutions with precision, performance, and innovation.
              </p>
            </div>

            {/* social */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-[10px] uppercase tracking-[0.3em] font-code text-muted-foreground">
                <span className="syntax-keyword select-none">$</span> git connect
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded border border-white/10 bg-white/[0.02] hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <ArrowUpRight className="w-3 h-3 absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 text-primary transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* stack */}
            <div className="space-y-4 text-center md:text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] font-code text-muted-foreground">
                <span className="syntax-keyword select-none">$</span> cat stack.txt
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-2">
                {["Next.js", "Tailwind", "Spring Boot", "PostgreSQL", "Kafka", "Flutter"].map((tech) => (
                  <span
                    key={tech}
                    className="chip hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-6 py-3.5 border-t border-white/[0.06]">
            <p className="text-[10px] font-code text-muted-foreground flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-primary" />
              <span className="syntax-comment">//</span>
              crafted with precision for innovation
            </p>

            <p className="text-[10px] font-code text-muted-foreground/70 flex items-center gap-1.5">
              <span className="syntax-keyword select-none">©</span>
              <span>{currentYear}</span>
              <span className="syntax-keyword">ashwani</span>
              <span className="text-white/20 select-none">·</span>
              <span className="flex items-center gap-1">
                built with <Heart className="w-3 h-3 text-[#e06c75] fill-[#e06c75]/30" />
              </span>
            </p>
          </div>
        </div>

        {/* EOF */}
        <div className="mt-6 flex items-center gap-3 font-code text-[10px] text-muted-foreground/50">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="syntax-comment select-none">-- EOF --</span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </footer>
  );
}
