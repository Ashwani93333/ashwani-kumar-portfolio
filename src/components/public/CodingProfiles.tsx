
"use client";

import { Award, Code2, Globe } from "lucide-react";
import Link from "next/link";

export function CodingProfiles() {
  const profiles = [
    {
      name: "LeetCode",
      username: "@princepal-dev",
      stats: "300+ problems",
      description: "Steady practice on DS & algorithms.",
      link: "https://leetcode.com/princepal-dev",
      icon: Code2,
      color: "text-orange-400"
    },
    {
      name: "CodeChef",
      username: "@princepal_dev",
      stats: "2★ · Max 1416",
      description: "Occasional contests.",
      link: "https://codechef.com/users/princepal_dev",
      icon: Award,
      color: "text-amber-400"
    }
  ];

  return (
    <section className="animate-reveal opacity-0" style={{ animationDelay: '0.5s' }}>
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Practice</h2>
          <h3 className="text-2xl font-headline font-bold">Coding profiles</h3>
          <p className="text-muted-foreground text-xs">Problem-solving practice.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profiles.map((profile, idx) => (
            <Link 
              key={idx}
              href={profile.link}
              target="_blank"
              className="glass-card p-6 border-white/5 hover:bg-white/[0.04] transition-all group block"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-white/5 ${profile.color}`}>
                  <profile.icon className="w-5 h-5" />
                </div>
                <div className="p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-lg font-headline font-bold flex items-center gap-2">
                  {profile.name}
                  <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-widest">{profile.username}</span>
                </h4>
                <p className="text-xs text-primary font-bold">{profile.stats}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{profile.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
