
"use client";

import { Layers, Database, Code2, Terminal } from "lucide-react";

export function TechStack() {
  const stack = [
    {
      title: "Primary Backend",
      icon: Database,
      items: ["Java", "Spring Boot", "JPA / Hibernate", "REST APIs", "MySQL", "PostgreSQL"],
      color: "text-blue-400"
    },
    {
      title: "Systems (Learning)",
      icon: Terminal,
      items: ["Go", "Concurrency", "gRPC"],
      color: "text-emerald-400"
    },
    {
      title: "Frontend (Supporting)",
      icon: Code2,
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Recoil"],
      color: "text-purple-400"
    },
    {
      title: "Tooling",
      icon: Layers,
      items: ["Git", "GitHub", "Linux", "Docker"],
      color: "text-orange-400"
    }
  ];

  return (
    <section className="animate-reveal opacity-0" style={{ animationDelay: '0.3s' }}>
      <div className="space-y-12">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Tech Stack</h2>
          <div className="space-y-2">
            <h3 className="text-2xl font-headline font-bold">What I reach for</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Backend-first. Java/Spring for production. Go for systems. Frontend to ship interfaces.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stack.map((group, idx) => (
            <div key={idx} className="glass-card p-6 border-white/5 hover:border-primary/20 group transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-white/5 ${group.color} group-hover:scale-110 transition-transform`}>
                  <group.icon className="w-4 h-4" />
                </div>
                <h4 className="text-[10px] uppercase font-bold tracking-widest">{group.title}</h4>
              </div>
              <ul className="space-y-2">
                {group.items.map((item, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
