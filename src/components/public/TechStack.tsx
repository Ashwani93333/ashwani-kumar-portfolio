"use client";

import { useEffect, useState } from "react";
import { Layers, Database, Code2, Terminal, Brain } from "lucide-react";
import { Skeleton, SkeletonBars } from "@/components/public/Skeleton";
import { SectionHeading } from "./SectionHeading";
import { Reveal, Stagger } from "./Reveal";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  level: number;
}

interface Category {
  id: number;
  categoryName: string;
  displayOrder: number;
  skills: string[];
}

const fallbackTechStack: Category[] = [
  {
    id: 1,
    categoryName: "Backend Development",
    displayOrder: 1,
    skills: ["Java", "Spring Boot", "REST APIs", "Microservices", "Spring Data JPA", "Hibernate", "Apache Kafka", "System Design"],
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
    skills: ["Python", "Machine Learning", "AI API Integration", "Data Processing", "Automation Workflows"],
  },
  {
    id: 4,
    categoryName: "Frontend & Mobile",
    displayOrder: 4,
    skills: ["Flutter", "Dart", "GetX", "Responsive UI", "Firebase Auth", "REST Integration"],
  },
  {
    id: 5,
    categoryName: "Databases",
    displayOrder: 5,
    skills: ["PostgreSQL", "H2 Database", "MySQL", "SQL Optimization"],
  },
  {
    id: 6,
    categoryName: "Testing & Tools",
    displayOrder: 6,
    skills: ["JUnit", "Mockito", "Maven", "Git", "Postman", "IntelliJ", "VS Code"],
  },
];

const CATEGORY_STYLES: Record<string, { icon: any; color: string; bar: string }> = {
  backend: {
    icon: Database,
    color: "text-[#fab283]",
    bar: "bg-[#fab283]",
  },
  language: {
    icon: Code2,
    color: "text-[#9d7cd8]",
    bar: "bg-[#9d7cd8]",
  },
  ai: {
    icon: Brain,
    color: "text-[#7fd88f]",
    bar: "bg-[#7fd88f]",
  },
  frontend: {
    icon: Code2,
    color: "text-[#e5c07b]",
    bar: "bg-[#e5c07b]",
  },
  database: {
    icon: Database,
    color: "text-[#56b6c2]",
    bar: "bg-[#56b6c2]",
  },
  tool: {
    icon: Layers,
    color: "text-[#f5a742]",
    bar: "bg-[#f5a742]",
  },
};

function getCategoryKey(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("backend")) return "backend";
  if (lower.includes("programming")) return "language";
  if (lower.includes("ai") || lower.includes("ml")) return "ai";
  if (lower.includes("frontend") || lower.includes("mobile")) return "frontend";
  if (lower.includes("database")) return "database";
  if (lower.includes("tool") || lower.includes("testing")) return "tool";
  return "backend";
}

// Deterministic "proficiency" from skill name so bars look stable
function levelFor(skill: string): number {
  let hash = 0;
  for (let i = 0; i < skill.length; i++) {
    hash = (hash * 31 + skill.charCodeAt(i)) >>> 0;
  }
  const base = ["Spring Boot", "Java", "REST APIs", "Python", "Git", "PostgreSQL"].includes(skill) ? 15 : 8;
  return Math.min(96, Math.max(55, 60 + (hash % 36) + base));
}

/** Animated skill bar — fills when scrolled into view. */
function SkillBar({ skill, delay, bar }: { skill: string; delay: number; bar: string }) {
  const [visible, setVisible] = useState(false);
  const [level] = useState(() => levelFor(skill));

  useEffect(() => {
    const el = document.getElementById(`skill-${skill}`);
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [skill]);

  return (
    <div id={`skill-${skill}`} className="space-y-1">
      <div className="flex justify-between items-baseline">
        <span className="text-[11px] font-code text-muted-foreground">{skill}</span>
        <span className="text-[10px] font-code text-muted-foreground/60">
          {visible ? `${level}%` : ""}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.05] border border-white/5 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-[width] duration-1000 ease-out", bar)}
          style={{
            width: visible ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
            boxShadow: "0 0 12px rgba(255,255,255,0.15)",
          }}
        />
      </div>
    </div>
  );
}

export function TechStack() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStack = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const sorted = Array.isArray(data)
          ? [...data].sort((a: any, b: any) => (a.displayOrder || 999) - (b.displayOrder || 999))
          : fallbackTechStack;
        setCategories(sorted);
      } catch (err) {
        console.error("Using fallback tech stack:", err);
        setCategories([...fallbackTechStack].sort((a, b) => a.displayOrder - b.displayOrder));
      } finally {
        setLoading(false);
      }
    };
    fetchStack();
  }, []);

  if (loading) {
    return (
      <div className="space-y-10">
        <Reveal>
          <SectionHeading
            path="~/tech-stack.ts"
            title="skills"
            subtitle="npm run proficiency --all — animated, measurable, production-ready"
          />
        </Reveal>
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-3 w-32 mb-4" />
              <SkeletonBars count={4} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const allSkills = categories.flatMap((c) => c.skills);

  return (
    <section id="tech-stack" className="scroll-mt-24">
      <Reveal>
        <SectionHeading
          path="~/tech-stack.ts"
          title="skills"
          subtitle="npm run proficiency --all — animated, measurable, production-ready"
        />
      </Reveal>

      {/* Marquee of every skill */}
      <Reveal delay={80}>
        <div className="mt-8 marquee-paused overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-3 relative">
          <div className="animate-marquee flex w-max gap-8">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex gap-8 items-center">
                {allSkills.map((skill) => (
                  <span key={`${dup}-${skill}`} className="flex items-center gap-8 font-code text-[12px] text-muted-foreground whitespace-nowrap">
                    <span className="syntax-keyword select-none">✦</span>
                    {skill}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Category cards with animated bars */}
      <Stagger className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, catIdx) => {
          const style = CATEGORY_STYLES[getCategoryKey(category.categoryName)];
          const Icon = style.icon;

          return (
            <div
              key={category.id}
              style={{ ["--i" as any]: catIdx }}
              className="term-card term-card-hover p-5 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("p-2 rounded border border-white/10 bg-white/[0.03] transition-transform group-hover:scale-110 group-hover:rotate-3", style.color)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-code text-[11px] uppercase tracking-widest font-bold text-foreground truncate">
                    {category.categoryName}
                  </h4>
                  <p className="text-[10px] font-code text-muted-foreground/60">
                    {category.skills.length} modules
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, i) => (
                  <SkillBar key={skill} skill={skill} delay={i * 70} bar={style.bar} />
                ))}
              </div>
            </div>
          );
        })}
      </Stagger>
    </section>
  );
}
