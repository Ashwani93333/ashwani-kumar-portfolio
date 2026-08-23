"use client";

import { useEffect, useState } from "react";
import { MapPin, GitCommitHorizontal } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Skeleton } from "@/components/public/Skeleton";

interface ExperienceDTO {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  point: string[];
  employeeType: string;
}

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  points: string[];
}

const fallbackExperience: ExperienceItem[] = [
  {
    period: "Oct 2025 - Mar 2026",
    role: "Software Engineering Virtual Intern",
    company: "JPMorgan Chase & Co. (Forage)",
    location: "Remote",
    points: [
      "Developed a transaction processing microservice using Spring Boot and Apache Kafka.",
      "Implemented transaction validation, database persistence, and external REST API integrations.",
      "Built RESTful services for financial workflows and JSON data processing.",
      "Strengthened backend engineering, distributed systems, and clean architecture skills.",
    ],
  },
  {
    period: "Feb 2026 - Mar 2026",
    role: "Software Engineering Virtual Intern",
    company: "Hewlett Packard Enterprise (Forage)",
    location: "Remote",
    points: [
      "Designed employee management REST service architecture using Java and Spring Boot.",
      "Built scalable HTTP endpoints for employee data management and JSON processing.",
      "Performed backend testing, system analysis, and architecture planning.",
      "Enhanced expertise in enterprise backend systems and API design.",
    ],
  },
  {
    period: "Sep 2025 - Dec 2025",
    role: "Full-Stack & Mobile App Developer",
    company: "Independent Projects",
    location: "India",
    points: [
      "Developed Blinkit-inspired grocery delivery mobile app using Flutter, Dart, GetX, and Firebase.",
      "Built responsive UI systems, authentication flows, and modular app architecture.",
      "Created portfolio-grade full-stack projects integrating backend, frontend, and AI technologies.",
      "Maintained GitHub repositories showcasing production-ready technical capabilities.",
    ],
  },
];

const GIT_HASHES = ["a1b2c3d", "e4f5a6b", "7c8d9e0", "f0e1d2c"];

export function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experience`);
        if (!response.ok) throw new Error("Failed to fetch experience data");
        const data: ExperienceDTO[] = await response.json();

        const formatted = data.map((exp) => ({
          period: `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : "Present"}`,
          role: exp.role,
          company: exp.company,
          location: exp.location,
          points: exp.point || [],
        }));

        setExperiences(Array.isArray(formatted) ? formatted : fallbackExperience);
      } catch (err) {
        console.error(err);
        setExperiences(fallbackExperience);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <section id="experience" className="scroll-mt-24">
      <Reveal>
        <SectionHeading
          path="~/experience.git"
          title="experience"
          subtitle="git log --oneline --career"
        />
      </Reveal>

      {loading ? (
        <Reveal delay={80}>
          <div className="mt-8 term-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
              <GitCommitHorizontal className="w-3.5 h-3.5 text-primary" />
              <span>git log --oneline --all --career</span>
              <span className="ml-auto text-success">● fetching...</span>
            </div>
            <div className="p-6 space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-2 w-20" />
                      <Skeleton className="h-2.5 w-1/3" />
                    </div>
                    <Skeleton className="h-2.5 w-full" />
                    <Skeleton className="h-2.5 w-4/5" />
                    <div className="flex gap-2 pt-1">
                      <Skeleton className="h-4 w-16 rounded-full" />
                      <Skeleton className="h-4 w-12 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ) : (
        <div className="mt-8 term-card overflow-hidden">
          {/* terminal status bar */}
          <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
            <GitCommitHorizontal className="w-3.5 h-3.5 text-primary" />
            <span>git log --oneline --all --career</span>
            <span className="ml-auto text-success">● {experiences.length} commits</span>
          </div>

          <div className="p-5 md:p-6 space-y-6">
            {experiences.map((exp, idx) => {
              const hash = GIT_HASHES[idx % GIT_HASHES.length];
              return (
                <Reveal key={idx} delay={idx * 90}>
                  <div className="group relative pl-5">
                    {/* vertical line */}
                    <div className="absolute left-0 top-1.5 bottom-0 w-px bg-white/[0.08] group-hover:bg-primary/40 transition-colors" />

                    <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full border-2 border-[#fab283] bg-background group-hover:shadow-[0_0_10px_rgba(250,178,131,0.7)] transition-shadow" />

                    <div className="font-code text-[12px] leading-relaxed">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                        <span className="syntax-keyword select-none">commit</span>
                        <span className="syntax-constant">{hash}</span>
                        <span className="text-muted-foreground/60 select-none">
                          ({idx === 0 ? "HEAD" : "HEAD~" + idx})
                        </span>
                        <span className="syntax-comment select-none">--</span>
                        <span className="syntax-comment">{exp.period}</span>
                        <span className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>

                      <div className="text-foreground font-semibold text-sm">
                        <span className="syntax-keyword">feat:</span> {exp.role}
                      </div>
                      <div className="text-primary text-[12px] mb-3">{exp.company}</div>

                      <ul className="space-y-2 mt-2">
                        {exp.points.map((point, i) => (
                          <li key={i} className="flex gap-2.5 text-muted-foreground text-[12px]">
                            <span className="syntax-property select-none shrink-0">+</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="px-5 py-2.5 border-t border-white/[0.06] font-code text-[10px] text-muted-foreground/70">
            <span className="syntax-comment"># on branch</span>{" "}
            <span className="syntax-constant">growth</span>
            <span className="text-white/15 select-none"> · </span>
            <span className="syntax-comment">your branch is up to date with 'origin/ashwani'</span>
          </div>
        </div>
      )}
    </section>
  );
}
