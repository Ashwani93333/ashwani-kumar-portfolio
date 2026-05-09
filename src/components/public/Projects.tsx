


"use client";

import { ExternalLink, Github, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    description:
      "Built a scalable Spring Boot microservice for high-volume financial transaction processing using Apache Kafka, Spring Data JPA, REST APIs, and H2 database integration. Designed for distributed workflows, automated incentive processing, and secure balance management.",
    techStack: [
      "Java",
      "Spring Boot",
      "Apache Kafka",
      "Spring Data JPA",
      "REST APIs",
      "H2 Database",
      "Maven",
      "Microservices",
    ],
    externalLink: "https://github.com/Ashwani93333/Midas-Project",
    imageUrl: "/projects/transaction-microservice.jpg",
    createdAt: "2026-03-15",
  },
  {
    id: 2,
    title: "Employee Management REST Service",
    description:
      "Designed and developed a backend employee management system using Spring Boot with scalable RESTful APIs, JSON data handling, HTTP request processing, and unit-tested enterprise architecture.",
    techStack: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "JSON",
      "JUnit",
      "Mockito",
      "Maven",
    ],
    externalLink:
      "https://github.com/Ashwani93333/springboot-employee-rest-api",
    imageUrl: "/projects/employee-management.jpg",
    createdAt: "2026-03-01",
  },
  {
    id: 3,
    title: "Blinkit Clone Grocery Delivery App",
    description:
      "Developed a full-featured grocery delivery mobile app inspired by Blinkit using Flutter, Dart, GetX, Firebase Authentication, and responsive UI architecture with modular design.",
    techStack: [
      "Flutter",
      "Dart",
      "GetX",
      "Firebase",
      "REST APIs",
      "Responsive UI",
    ],
    externalLink: "https://github.com/Ashwani93333",
    imageUrl: "/projects/blinkit-clone.jpg",
    createdAt: "2025-12-10",
  },
  {
    id: 4,
    title: "AI-Powered Career Guidance Platform",
    description:
      "Designed an AI-integrated platform concept for personalized student career recommendations using machine learning models, backend architecture, predictive analytics, and scalable API integration.",
    techStack: [
      "Python",
      "Machine Learning",
      "Spring Boot",
      "REST APIs",
      "AI Integration",
      "PostgreSQL",
    ],
    externalLink: "https://github.com/Ashwani93333",
    imageUrl: "/projects/ai-career-platform.jpg",
    createdAt: "2026-04-10",
  },
  {
    id: 5,
    title: "Portfolio Website with Secure Admin Dashboard",
    description:
      "Built a production-grade developer portfolio featuring dynamic APIs, secure admin panel, blog management system, JWT authentication, fallback architecture, and responsive UI.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Spring Boot",
      "JWT",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    externalLink: "https://github.com/Ashwani93333",
    imageUrl: "/projects/portfolio-dashboard.jpg",
    createdAt: "2026-05-01",
  },
];

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

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

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <section
      id="projects"
      className="animate-reveal opacity-0"
      style={{ animationDelay: "0.1s" }}
    >
      <div className="space-y-12">
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">
            Portfolio
          </h2>
          <h3 className="text-2xl font-headline font-bold">
            Featured Projects
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card p-8 group border-white/5 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-primary/10 transition-colors">
                    <Folder className="w-6 h-6 text-primary" />
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href={project.externalLink}
                      target="_blank"
                      className="text-muted-foreground hover:text-white transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </Link>

                    <Link
                      href={project.imageUrl}
                      target="_blank"
                      className="text-muted-foreground hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-headline font-bold">
                    {project.title}
                  </h4>

                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.techStack.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] uppercase font-bold tracking-widest bg-white/5 border border-white/5 px-2 py-1 rounded-md text-muted-foreground"
                  >
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
