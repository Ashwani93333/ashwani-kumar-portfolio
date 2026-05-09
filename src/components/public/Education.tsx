"use client";

import { useEffect, useState } from "react";

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

        if (!response.ok) {
          throw new Error("Failed to fetch education data");
        }

        const data = await response.json();
        setEducation(data);
      } catch (error) {
        setEducation(fallbackEducation);
        console.error("Error fetching education data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) {
    return (
      <section className="animate-reveal space-y-10">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60 border-l-2 border-primary pl-4">
          Education
        </h2>
        <p className="text-xs text-muted-foreground ml-4">
          Loading education data...
        </p>
      </section>
    );
  }

  return (
    <section className="animate-reveal space-y-10">
      <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60 border-l-2 border-primary pl-4">
        Education
      </h2>

      <div className="space-y-8 ml-4">
        {education.map((edu) => (
          <div key={edu.id} className="space-y-2 group">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-headline font-bold text-sm group-hover:text-primary transition-colors">
                  {edu.degree}
                </h3>

                <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                  {edu.institution}
                </p>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground whitespace-nowrap pt-1">
                {edu.duration}
              </p>
            </div>

            <p className="text-xs font-mono text-primary/80">
              {edu.result}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}