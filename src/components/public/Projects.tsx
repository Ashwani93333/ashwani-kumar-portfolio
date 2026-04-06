
"use client";

import { ExternalLink, Github, Folder } from "lucide-react";
import Link from "next/link";

export function Projects() {
  const projects = [
    {
      title: "EcoSphere Analytics",
      description: "A real-time environmental monitoring dashboard using Java backend and Next.js frontend.",
      tags: ["Java", "Spring Boot", "React", "D3.js"],
      github: "#",
      demo: "#"
    },
    {
      title: "NovaFlow CRM",
      description: "Enterprise customer relationship management system with complex role-based access control.",
      tags: ["Go", "gRPC", "Next.js", "PostgreSQL"],
      github: "#",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className="animate-reveal opacity-0" style={{ animationDelay: '0.1s' }}>
      <div className="space-y-12">
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Portfolio</h2>
          <h3 className="text-2xl font-headline font-bold">Featured Projects</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="glass-card p-8 group border-white/5 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-primary/10 transition-colors">
                    <Folder className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex gap-4">
                    <Link href={project.github} className="text-muted-foreground hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </Link>
                    <Link href={project.demo} className="text-muted-foreground hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-headline font-bold">{project.title}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[9px] uppercase font-bold tracking-widest bg-white/5 border border-white/5 px-2 py-1 rounded-md text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
