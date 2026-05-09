
"use client";

import { useEffect, useState } from "react";

interface Achievement {
  id?: number;
  title: string;
  subtitle: string;
  label: string;
  description: string;
}

const fallbackAchievements: Achievement[] = [
  {
    id: 1,
    title: "Software Engineering Virtual Experience",
    subtitle: "JPMorgan Chase & Co. (Forage)",
    label: "Backend Development • Microservices • Apache Kafka",
    description:
      "Completed enterprise-level software engineering simulation focused on building transaction processing microservices using Java, Spring Boot, Apache Kafka, REST APIs, and Spring Data JPA.",
  },
  {
    id: 2,
    title: "Software Engineering Virtual Experience",
    subtitle: "Hewlett Packard Enterprise (Forage)",
    label: "REST APIs • Spring Boot • System Design",
    description:
      "Designed and developed scalable employee management REST services while gaining practical experience in backend architecture, HTTP request handling, JSON processing, and unit testing.",
  },
  {
    id: 3,
    title: "Hackathon Participation Certificate",
    subtitle: "Ajay Kumar Garg Engineering College",
    label: "AI/ML • Problem Solving • Innovation",
    description:
      "Participated in a competitive hackathon environment focused on solving impactful real-world challenges through AI/ML, backend engineering, and innovative software development strategies.",
  },
  {
    id: 4,
    title: "Advanced Java Skill Development",
    subtitle: "Professional Learning & Practice",
    label: "Java • OOP • Backend Systems",
    description:
      "Strengthened expertise in advanced Java concepts including object-oriented programming, backend application design, API development, and scalable enterprise-grade system building.",
  },
  {
    id: 5,
    title: "Portfolio & Full-Stack Project Development",
    subtitle: "Personal Technical Projects",
    label: "Spring Boot • Flutter • AI Integration",
    description:
      "Built multiple real-world projects including scalable backend services, REST APIs, mobile applications, and AI-powered systems to demonstrate production-level development capabilities.",
  },
];

export function TrackRecord() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAchievements = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/track-records`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch track records");
      }

      const data = await res.json();
      setAchievements(Array.isArray(data) ? data : fallbackAchievements);
    } catch (err) {
      console.error("Using fallback track records:", err);
      setAchievements(fallbackAchievements);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading track records...
      </p>
    );
  }

  return (
    <section className="space-y-12 animate-reveal delay-3">
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Track Record
        </h3>
        <h2 className="text-3xl font-headline font-bold">
          Evidence of depth
        </h2>
        <p className="text-xs text-muted-foreground">
          Professional milestones, certifications, hackathons, and technical growth.
        </p>
      </div>

      {achievements.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No achievements found.
        </p>
      ) : (
        <div className="space-y-8">
          {achievements.map((item, idx) => (
            <div
              key={item.id || idx}
              className="relative pl-8 group"
            >
              {/* Vertical timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5 group-hover:bg-primary/30 transition-colors" />

              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h4 className="text-xl font-bold text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(110,168,255,0.4)]">
                    {item.title}
                  </h4>

                  <span className="text-lg font-medium text-foreground/90 font-headline">
                    {item.subtitle}
                  </span>
                </div>

                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                  {item.label}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl font-medium">
                  {item.description}
                </p>

                {idx !== achievements.length - 1 && (
                  <div className="pt-6 flex justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 ring-4 ring-primary/10" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Manual refresh */}
      <div className="pt-4">
        <button
          onClick={fetchAchievements}
          className="text-xs text-primary underline hover:opacity-80 transition"
        >
          Refresh Records
        </button>
      </div>
    </section>
  );
}