"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "QuantumFlow CRM",
    description: "Enterprise-grade customer relationship management system with real-time analytics and predictive lead scoring.",
    image: "https://picsum.photos/seed/p1/600/400",
    tags: ["Next.js", "PostgreSQL", "Tailwind"],
    link: "#",
    github: "#"
  },
  {
    title: "EcoSphere Dashboard",
    description: "Sustainability tracking platform for green-tech startups to monitor carbon footprint and energy efficiency.",
    image: "https://picsum.photos/seed/p2/600/400",
    tags: ["React", "D3.js", "Firebase"],
    link: "#",
    github: "#"
  },
  {
    title: "NovaPay System",
    description: "Secure payment gateway integration for global e-commerce, supporting 20+ currencies and instant settlement.",
    image: "https://picsum.photos/seed/p3/600/400",
    tags: ["Stripe", "TypeScript", "Node.js"],
    link: "#",
    github: "#"
  }
];

export function Projects() {
  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto space-y-16">
      <div className="space-y-4">
        <h2 className="text-3xl font-headline font-bold tracking-tighter">Featured Projects</h2>
        <p className="text-muted-foreground text-sm max-w-lg">
          A selection of recent works focusing on complex systems and elegant user experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <Card key={i} className="glass-card group overflow-hidden border-white/5 bg-transparent">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                data-ai-hint="software project"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Link href={project.github} className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors">
                  <Github className="w-5 h-5" />
                </Link>
                <Link href={project.link} className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-headline font-bold text-lg">{project.title}</h3>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map(tag => (
                  <span key={tag} className="badge-outline text-primary/80 border-primary/10 bg-primary/5">{tag}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
