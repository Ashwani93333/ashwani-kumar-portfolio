"use client";

import { useState, useEffect } from "react";
import {
  Layers,
  Database,
  Code2,
  Terminal,
  Loader2,
  Brain,
} from "lucide-react";

// Fallback tech stack data
const fallbackTechStack = [
  {
    id: 1,
    categoryName: "Backend Development",
    displayOrder: 1,
    skills: [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "REST APIs",
      "Microservices",
      "Spring Data JPA",
      "Hibernate",
      "Apache Kafka",
      "JWT Authentication",
      "System Design",
    ],
  },
  {
    id: 2,
    categoryName: "Programming Languages",
    displayOrder: 2,
    skills: ["Java", "Python", "Dart", "C", "SQL"],
  },
  {
    id: 3,
    categoryName: "AI / ML Integration",
    displayOrder: 3,
    skills: [
      "Python",
      "Machine Learning",
      "AI API Integration",
      "Data Processing",
      "Automation Workflows",
    ],
  },
  {
    id: 4,
    categoryName: "Frontend & Mobile Development",
    displayOrder: 4,
    skills: [
      "Flutter",
      "Dart",
      "GetX",
      "Responsive UI Design",
      "Firebase Authentication",
      "REST API Integration",
    ],
  },
  {
    id: 5,
    categoryName: "Databases",
    displayOrder: 5,
    skills: ["PostgreSQL", "H2 Database", "MySQL", "SQL Query Optimization"],
  },
  {
    id: 6,
    categoryName: "Testing & Tools",
    displayOrder: 6,
    skills: [
      "JUnit",
      "Mockito",
      "Maven",
      "Git",
      "GitHub",
      "Postman",
      "IntelliJ IDEA",
      "VS Code",
      "Figma",
    ],
  },
  {
    id: 7,
    categoryName: "Core Concepts",
    displayOrder: 7,
    skills: [
      "Data Structures & Algorithms",
      "OOP",
      "SDLC",
      "JSON Processing",
      "API Security",
      "Clean Architecture",
      "Scalable Systems",
    ],
  },
];

// Dynamic icon mapping
const getIconForCategory = (name: string) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("backend") || lowerName.includes("database"))
    return Database;

  if (lowerName.includes("frontend") || lowerName.includes("mobile"))
    return Code2;

  if (lowerName.includes("tool") || lowerName.includes("testing"))
    return Layers;

  if (lowerName.includes("ai") || lowerName.includes("ml"))
    return Brain;

  return Terminal;
};

// Dynamic color mapping
const getColorForCategory = (name: string) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("backend")) return "text-blue-400";
  if (lowerName.includes("frontend")) return "text-purple-400";
  if (lowerName.includes("tool")) return "text-orange-400";
  if (lowerName.includes("ai")) return "text-pink-400";
  if (lowerName.includes("database")) return "text-cyan-400";

  return "text-emerald-400";
};

export function TechStack() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStack = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        const sortedData = Array.isArray(data)
          ? data.sort(
              (a: any, b: any) =>
                (a.displayOrder || 999) - (b.displayOrder || 999)
            )
          : fallbackTechStack;

        setCategories(sortedData);
      } catch (err) {
        console.error("Using fallback tech stack:", err);

        const sortedFallback = fallbackTechStack.sort(
          (a, b) => a.displayOrder - b.displayOrder
        );

        setCategories(sortedFallback);
      } finally {
        setLoading(false);
      }
    };

    fetchStack();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="animate-reveal" style={{ opacity: 1 }}>
      <div className="space-y-12">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">
            Tech Stack
          </h2>

          <div className="space-y-2">
            <h3 className="text-2xl font-headline font-bold">
              What I reach for
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Core technologies, frameworks, and tools powering scalable backend,
              AI integration, and production-ready applications.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = getIconForCategory(category.categoryName);
            const colorClass = getColorForCategory(category.categoryName);

            return (
              <div
                key={category.id}
                className="glass-card p-6 border-white/5 hover:border-primary/20 group transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2 rounded-lg bg-white/5 ${colorClass} group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <h4 className="text-[10px] uppercase font-bold tracking-widest">
                    {category.categoryName}
                  </h4>
                </div>

                <ul className="space-y-2">
                  {category.skills.map((skill: string, i: number) => (
                    <li
                      key={i}
                      className="text-xs text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}