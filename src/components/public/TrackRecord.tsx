"use client";

import { useEffect, useState } from "react";
import { Trophy, RotateCw } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Skeleton } from "@/components/public/Skeleton";

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
    description: "Completed enterprise-level software engineering simulation focused on building transaction processing microservices using Java, Spring Boot, Apache Kafka, REST APIs, and Spring Data JPA.",
  },
  {
    id: 2,
    title: "Software Engineering Virtual Experience",
    subtitle: "Hewlett Packard Enterprise (Forage)",
    label: "REST APIs • Spring Boot • System Design",
    description: "Designed and developed scalable employee management REST services while gaining practical experience in backend architecture, HTTP request handling, JSON processing, and unit testing.",
  },
  {
    id: 3,
    title: "Hackathon Participation Certificate",
    subtitle: "Ajay Kumar Garg Engineering College",
    label: "AI/ML • Problem Solving • Innovation",
    description: "Participated in a competitive hackathon environment focused on solving impactful real-world challenges through AI/ML, backend engineering, and innovative software development strategies.",
  },
  {
    id: 4,
    title: "Advanced Java Skill Development",
    subtitle: "Professional Learning & Practice",
    label: "Java • OOP • Backend Systems",
    description: "Strengthened expertise in advanced Java concepts including object-oriented programming, backend application design, API development, and scalable enterprise-grade system building.",
  },
];

export function TrackRecord() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/track-records`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch track records");
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

  return (
    <section id="track-record" className="scroll-mt-24">
      <Reveal>
        <SectionHeading
          path="~/achievements.log"
          title="track record"
          subtitle="git log --trophies --oneline"
          right={
            <button
              onClick={fetchAchievements}
              className="flex items-center gap-1.5 chip hover:border-primary/40 hover:text-primary transition-colors"
              aria-label="Refresh achievements"
            >
              <RotateCw className="w-3 h-3" />
              refresh
            </button>
          }
        />
      </Reveal>

      {loading ? (
        <Reveal delay={80}>
          <div className="mt-8 term-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
              <Trophy className="w-3.5 h-3.5 text-[#f5a742]" />
              <span>achievements --verified</span>
              <span className="ml-auto text-success">● syncing...</span>
            </div>
            <div className="p-5 md:p-6 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="w-4 h-4 rounded mt-1 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-3 w-2/3" />
                    <Skeleton className="h-2.5 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ) : (
        <div className="mt-8 term-card overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
            <Trophy className="w-3.5 h-3.5 text-[#f5a742]" />
            <span>achievements --verified</span>
            <span className="ml-auto text-success">● {achievements.length} unlocked</span>
          </div>

          <div className="p-5 md:p-6 space-y-6">
            {achievements.map((item, idx) => (
              <Reveal key={item.id || idx} delay={idx * 80}>
                <div className="group relative pl-5">
                  <div className="absolute left-0 top-1.5 bottom-0 w-px bg-white/[0.08] group-hover:bg-[#f5a742]/40 transition-colors" />
                  <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full border-2 border-[#f5a742] bg-background group-hover:shadow-[0_0_10px_rgba(245,167,66,0.7)] transition-shadow" />

                  <div className="font-code space-y-1.5">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h4 className="text-sm font-bold text-foreground group-hover:text-[#f5a742] transition-colors">
                        {item.title}
                      </h4>
                      <span className="syntax-comment text-[11px]">{item.subtitle}</span>
                    </div>

                    <div className="text-[10px] font-code uppercase tracking-widest text-muted-foreground/60">
                      {item.label}
                    </div>

                    <p className="text-[12px] font-code text-muted-foreground leading-relaxed max-w-2xl">
                      <span className="syntax-comment select-none"># </span>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
