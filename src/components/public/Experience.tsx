"use client";
import { useEffect, useState } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

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

export function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experience`);

        if (!response.ok) {
          throw new Error("Failed to fetch experience data");
        }

        const data: ExperienceDTO[] = await response.json();


        const formattedData = data.map((exp) => ({
          period: `${formatDate(exp.startDate)} – ${exp.endDate ? formatDate(exp.endDate) : "Present"}`,
          role: exp.role,
          company: exp.company,
          location: exp.location,
          points: exp.point || [],
        }));

        setExperiences(Array.isArray(formattedData) ? formattedData : fallbackExperience);
      } catch (err) {
        console.error(err);
        setExperiences(fallbackExperience);
        // setError("Unable to load experience data.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="animate-reveal opacity-0" style={{ animationDelay: "0.4s" }}>
        <div className="space-y-12">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Experience</h2>
          <p className="text-sm text-muted-foreground">Loading experience...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="animate-reveal opacity-0" style={{ animationDelay: "0.4s" }}>
        <div className="space-y-12">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Experience</h2>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="animate-reveal opacity-0" style={{ animationDelay: "0.4s" }}>
      <div className="space-y-12">
        <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Experience</h2>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative pl-8 border-l border-white/5 group">
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background group-hover:scale-125 transition-transform" />

              <div className="grid md:grid-cols-4 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </div>
                </div>

                <div className="md:col-span-3 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-headline font-bold">{exp.role}</h3>
                    <div className="flex items-center gap-4 text-xs text-primary font-medium flex-wrap">
                      <span>{exp.company}</span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.points.map((point, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-3"
                      >
                        <span className="text-primary mt-1.5 shrink-0">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
