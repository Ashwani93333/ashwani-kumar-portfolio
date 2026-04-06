"use client";

import { Project } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "1",
    title: "EcoSphere Analytics",
    description: "A real-time environmental monitoring dashboard with complex data visualizations using D3.js and Next.js.",
    imageUrl: PlaceHolderImages.find(img => img.id === "project-1")?.imageUrl || "",
    techStack: ["Next.js", "TypeScript", "D3.js", "Firebase"],
    link: "https://example.com",
    createdAt: Date.now()
  },
  {
    id: "2",
    title: "NovaFlow CRM",
    description: "Cloud-native customer relationship management tool designed for small startups and independent creators.",
    imageUrl: PlaceHolderImages.find(img => img.id === "project-2")?.imageUrl || "",
    techStack: ["React", "Node.js", "Tailwind", "PostgreSQL"],
    link: "https://example.com",
    createdAt: Date.now()
  }
];

export function Projects() {
  return (
    <section id="work" className="section-padding bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 text-center opacity-0 animate-reveal">
          <h2 className="text-3xl font-headline font-bold mb-4 tracking-tighter uppercase">Selected Work</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">A collection of projects I'm proud of</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {SAMPLE_PROJECTS.map((project, idx) => (
            <div 
              key={project.id} 
              className={`opacity-0 animate-reveal delay-${idx + 1}`}
            >
              <div className="group relative rounded-2xl overflow-hidden glass-card aspect-video mb-6">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="flex gap-4">
                    <Link href={project.link || "#"} className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
                      <Github className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 px-2">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[9px] uppercase tracking-widest font-semibold text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-headline font-bold tracking-tight">{project.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}