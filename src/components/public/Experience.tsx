
"use client";

import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      period: "Feb 2025 – Apr 2025",
      role: "Software Developer Intern",
      company: "Viben",
      location: "Remote",
      points: [
        "Built backend services and APIs for a fashion recommendation application; deployed on AWS (EC2, S3).",
        "Integrated Python-based recommendation logic and coordinated data flow between backend and client with loosely coupled interfaces."
      ]
    },
    {
      period: "Mar 2023 – Jul 2023",
      role: "Front-End Developer Intern",
      company: "Career-Width",
      location: "Remote",
      points: [
        "Developed 20+ custom portfolio websites for students applying to foreign universities with a focus on responsive layouts and usability.",
        "Improved the company's marketing website performance by optimizing assets and reducing page load time, increasing Lighthouse score from 75 to 90."
      ]
    }
  ];

  return (
    <section className="animate-reveal opacity-0" style={{ animationDelay: '0.4s' }}>
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
                    <div className="flex items-center gap-4 text-xs text-primary font-medium">
                      <span>{exp.company}</span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {exp.points.map((point, i) => (
                      <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-3">
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
