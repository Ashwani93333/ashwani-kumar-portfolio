"use client";

import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Skeleton } from "@/components/public/Skeleton";

interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  result: string;
}

const fallbackEducation: EducationItem[] = [
  {
    id: 1,
    institution: "G.L. Bajaj Institute of Technology and Management, Greater Noida",
    degree: "B.Tech in Computer Science & Engineering (Artificial Intelligence)",
    duration: "2025 - 2029",
    result: "CGPA: 8.14 / 10",
  },
  {
    id: 2,
    institution: "Senior Secondary Education",
    degree: "Class XII (Science Stream)",
    duration: "Completed 2025",
    result: "Strong foundation in Mathematics, Physics, and Computer Science",
  },
  {
    id: 3,
    institution: "Secondary Education",
    degree: "Class X",
    duration: "Completed 2023",
    result: "Core academic foundation with focus on analytical and technical growth",
  },
];

export function Education() {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/education`);
        if (!response.ok) throw new Error("Failed to fetch education data");
        const data = await response.json();
        setEducation(Array.isArray(data) ? data : fallbackEducation);
      } catch (error) {
        setEducation(fallbackEducation);
        console.error("Error fetching education data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  return (
    <section id="education" className="scroll-mt-24">
      <Reveal>
        <SectionHeading
          path="~/education"
          title="education"
          subtitle="tree ~/academics/ — degrees & scores"
        />
      </Reveal>

      {loading ? (
        <Reveal delay={80}>
          <div className="mt-8 term-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
              <GraduationCap className="w-3.5 h-3.5 text-[#9d7cd8]" />
              <span>tree -a --level 2</span>
              <span className="ml-auto text-success">● growing...</span>
            </div>
            <div className="p-5 md:p-6 space-y-2 font-code">
              <Skeleton className="h-3 w-24" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 pl-4">
                  <Skeleton className="h-3 w-3 mt-0.5 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-2.5 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ) : (
        <div className="mt-8 term-card overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
            <GraduationCap className="w-3.5 h-3.5 text-[#9d7cd8]" />
            <span>tree -a --level 2</span>
            <span className="ml-auto text-success">● {education.length} nodes</span>
          </div>

          <div className="p-5 md:p-6">
            <div className="font-code text-[12px] leading-relaxed space-y-1">
              <div className="syntax-keyword">~/academics</div>
              <div className="pl-4">
                {education.map((edu, idx) => (
                  <Reveal key={edu.id} delay={idx * 70} as="div">
                    <div className="py-2.5 group relative pl-4 border-l border-white/[0.07] group-hover:border-[#9d7cd8]/40 transition-colors">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="syntax-property select-none">
                          {idx === education.length - 1 ? "└──" : "├──"}
                        </span>
                        <span className="syntax-keyword">[</span>
                        <span className="text-foreground font-semibold group-hover:text-[#9d7cd8] transition-colors">
                          {edu.degree}
                        </span>
                        <span className="syntax-keyword">]</span>
                      </div>

                      <div className="pl-6 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-muted-foreground">
                        <span>
                          <span className="syntax-comment">dir:</span> {edu.institution}
                        </span>
                        <span>
                          <span className="syntax-comment">period:</span> {edu.duration}
                        </span>
                      </div>

                      <div className="pl-6 text-[11px]">
                        <span className="syntax-string">✓ {edu.result}</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
