
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

const PROJECTS = [
  {
    title: "EcoSphere Analytics",
    description: "Real-time environmental monitoring dashboard with AI-powered trend prediction and data visualization.",
    image: "https://picsum.photos/seed/p1/600/400",
    tags: ["Next.js", "TypeScript", "D3.js", "Firebase"],
    link: "#",
    github: "#"
  },
  {
    title: "NovaFlow CRM",
    description: "A streamlined customer relationship management tool designed for small creative agencies to manage leads.",
    image: "https://picsum.photos/seed/p2/600/400",
    tags: ["React", "Tailwind", "Node.js", "PostgreSQL"],
    link: "#",
    github: "#"
  },
  {
    title: "Zenith Commerce",
    description: "Modern headless e-commerce storefront with high performance scoring and seamless Stripe integration.",
    image: "https://picsum.photos/seed/p3/600/400",
    tags: ["Next.js", "Stripe", "Prismic", "Vercel"],
    link: "#",
    github: "#"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Selected Projects</h2>
            <p className="text-muted-foreground">A collection of things I've built recently.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <Card key={idx} className="glass-card group hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint="software project screenshot"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a href={project.github} className="p-2 bg-background/80 rounded-full hover:bg-primary transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={project.link} className="p-2 bg-background/80 rounded-full hover:bg-primary transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-white/5 font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
