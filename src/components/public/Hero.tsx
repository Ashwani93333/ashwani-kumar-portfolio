
"use client";

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-32 pb-16 animate-reveal opacity-0">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-bold uppercase tracking-widest text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Available for new opportunities
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold leading-[0.9] tracking-tight text-gradient">
            Prince Pal. <br />
            Backend Developer.
          </h1>
        </div>
        
        <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
          I build robust, scalable backends with Java and Spring Boot. Currently exploring systems engineering with Go and crafting clean, high-performance web experiences.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <Link href="#contact">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">
              Let's Connect <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Mail, href: "mailto:hello@example.com" }
            ].map((social, i) => (
              <Link 
                key={i} 
                href={social.href}
                className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/20 transition-all"
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
