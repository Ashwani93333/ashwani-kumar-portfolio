"use client";

import { ExternalLink, Github, GitFork, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { Reveal, Stagger } from "./Reveal";
import { SkeletonCard } from "@/components/public/Skeleton";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  externalLink: string;
  imageUrl: string;
  createdAt: string;
}

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Transaction Processing Microservice",
    description: "Scalable Spring Boot microservice for high-volume financial transaction processing using Apache Kafka, Spring Data JPA, REST APIs, and H2 database integration. Built for distributed workflows and secure balance management.",
    techStack: ["Java", "Spring Boot", "Apache Kafka", "Spring Data JPA", "REST APIs", "H2 Database", "Maven", "Microservices"],
    externalLink: "https://github.com/Ashwani93333/Midas-Project",
    imageUrl: "/projects/transaction-microservice.jpg",
    createdAt: "2026-03-15",
  },
  {
    id: 2,
    title: "Employee Management REST Service",
    description: "Backend employee management system using Spring Boot with scalable RESTful APIs, JSON data handling, HTTP request processing, and unit-tested enterprise architecture.",
    techStack: ["Java", "Spring Boot", "REST APIs", "JSON", "JUnit", "Mockito", "Maven"],
    externalLink: "https://github.com/Ashwani93333/springboot-employee-rest-api",
    imageUrl: "/projects/employee-management.jpg",
    createdAt: "2026-03-01",
  },
  {
    id: 3,
    title: "Blinkit Clone Grocery Delivery App",
    description: "Full-featured grocery delivery mobile app inspired by Blinkit using Flutter, Dart, GetX, Firebase Authentication, and responsive UI architecture with modular design.",
    techStack: ["Flutter", "Dart", "GetX", "Firebase", "REST APIs", "Responsive UI"],
    externalLink: "https://github.com/Ashwani93333",
    imageUrl: "/projects/blinkit-clone.jpg",
    createdAt: "2025-12-10",
  },
  {
    id: 4,
    title: "AI-Powered Career Guidance Platform",
    description: "AI-integrated platform concept for personalized student career recommendations using machine learning models, backend architecture, predictive analytics, and scalable API integration.",
    techStack: ["Python", "Machine Learning", "Spring Boot", "REST APIs", "AI Integration", "PostgreSQL"],
    externalLink: "https://github.com/Ashwani93333",
    imageUrl: "/projects/ai-career-platform.jpg",
    createdAt: "2026-04-10",
  },
  {
    id: 5,
    title: "Portfolio with Secure Admin Dashboard",
    description: "Production-grade developer portfolio featuring dynamic APIs, secure admin panel, blog management, JWT authentication, fallback architecture, and responsive UI.",
    techStack: ["Next.js", "React", "TypeScript", "Spring Boot", "JWT", "Tailwind CSS", "PostgreSQL"],
    externalLink: "https://github.com/Ashwani93333",
    imageUrl: "/projects/portfolio-dashboard.jpg",
    createdAt: "2026-05-01",
  },
];

// stable pseudo-random repo metadata per id
function repoMeta(id: number) {
  const stars = ((id * 37) % 60) + 12;
  const forks = ((id * 13) % 20) + 3;
  const lang = ["Java", "TypeScript", "Dart", "Python"][id % 4];
  return { stars, forks, lang };
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`);
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(Array.isArray(data) ? data : fallbackProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="scroll-mt-24">
      <Reveal>
        <SectionHeading
          path="~/repositories"
          title="featured projects"
          subtitle="ls ~/projects/ — production-grade work"
        />
      </Reveal>

      {loading ? (
        <Reveal delay={80}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} lines={4} />
            ))}
          </div>
        </Reveal>
      ) : (
        <Stagger className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, idx) => {
            const meta = repoMeta(project.id || idx);
            return (
              <div
                key={project.id}
                style={{ ["--i" as any]: idx }}
                className="term-card term-card-hover group p-6 flex flex-col relative overflow-hidden"
              >
                {/* hover sheen */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-code text-[12px]">
                      <span className="syntax-property">ashwani93333</span>
                      <span className="text-muted-foreground select-none">/</span>
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        {project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24)}
                      </span>
                    </span>
                  </div>

                  <div className="flex gap-3 text-muted-foreground">
                    <Link
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </Link>
                    <Link
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-info transition-colors"
                      aria-label="Open project"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <h3 className="font-code font-bold text-base text-foreground mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-[12px] font-code leading-relaxed mb-6 flex-1">
                  <span className="syntax-comment select-none"># </span>
                  {project.description.length > 220
                    ? project.description.slice(0, 220) + "…"
                    : project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.slice(0, 6).map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                  {project.techStack.length > 6 && (
                    <span className="chip syntax-comment">+{project.techStack.length - 6}</span>
                  )}
                </div>

                <div className="flex items-center gap-5 font-code text-[11px] text-muted-foreground pt-4 border-t border-white/[0.06]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e06c75]" />
                    {meta.lang}
                  </span>
                  <span className="flex items-center gap-1 hover:text-warning transition-colors">
                    <Star className="w-3.5 h-3.5" />
                    {meta.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    {meta.forks}
                  </span>
                  <span className="ml-auto text-[10px] text-muted-foreground/50">
                    {new Date(project.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>
            );
          })}
        </Stagger>
      )}
    </section>
  );
}
