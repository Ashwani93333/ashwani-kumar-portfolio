"use client";

import { useState, useEffect } from "react";
import { Award, Code2, Globe } from "lucide-react";
import { SkeletonCard } from "@/components/public/Skeleton";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { Reveal, Stagger } from "./Reveal";

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/coding-profiles`;

const fallbackProfiles = [
  {
    id: 1,
    name: "LeetCode",
    username: "AshwaniKumar93333",
    stats: "50+ Solved",
    link: "https://leetcode.com/u/AshwaniKumar93333/",
    description: "Consistent problem-solving in data structures, algorithms, and interview preparation.",
  },
  {
    id: 2,
    name: "GitHub",
    username: "Ashwani93333",
    stats: "Continued contributions",
    link: "https://www.github.com/Ashwani93333",
    description: "Competitive programming practice with strong performance in contests and challenges.",
  },
  {
    id: 3,
    name: "GeeksforGeeks",
    username: "ashwani_kumar",
    stats: "23+ Problems",
    link: "https://www.geeksforgeeks.org/profile/ashwanikup8by",
    description: "Hands-on coding practice focused on backend development, DSA, and technical growth.",
  },
];

const PLATFORM_STYLES: Record<string, { icon: any; color: string }> = {
  leetcode: { icon: Code2, color: "#f5a742" },
  codechef: { icon: Award, color: "#7fd88f" },
  geeksforgeeks: { icon: Code2, color: "#7fd88f" },
  hackerrank: { icon: Award, color: "#56b6c2" },
};

function platformStyle(name: string) {
  const lower = name.toLowerCase();
  for (const [key, style] of Object.entries(PLATFORM_STYLES)) {
    if (lower.includes(key)) return style;
  }
  return { icon: Code2, color: "#fab283" };
}

export function CodingProfiles() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProfiles(Array.isArray(data) ? data : fallbackProfiles);
      } catch (error) {
        console.error("Failed to fetch coding profiles, using fallback:", error);
        setProfiles(fallbackProfiles);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <section id="coding-profiles" className="scroll-mt-24">
      <Reveal>
        <SectionHeading
          path="~/practice.sh"
          title="coding profiles"
          subtitle="ssh @platform --practice — daily reps"
        />
      </Reveal>

      {loading ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} lines={2} />
          ))}
        </div>
      ) : (
        <Stagger className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {profiles.map((profile, idx) => {
            const style = platformStyle(profile.name);
            const Icon = style.icon;

            return (
              <Link
                key={profile.id}
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ["--i" as any]: idx }}
                className="term-card term-card-hover group p-5 block relative overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                <div className="flex items-start justify-between mb-5">
                  <div
                    className="p-2.5 rounded border border-white/10 bg-white/[0.03] transition-transform group-hover:scale-110 group-hover:-rotate-3"
                    style={{ color: style.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <Globe className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="font-code space-y-1.5">
                  <div className="flex gap-2 text-[12px]">
                    <span className="syntax-constant select-none">$</span>
                    <span className="text-muted-foreground">connect</span>
                    <span className="text-foreground font-semibold group-hover:text-primary transition-colors">
                      {profile.name}
                    </span>
                  </div>
                  <div className="flex gap-2 text-[12px]">
                    <span className="syntax-property select-none">→</span>
                    <span className="syntax-string">{profile.username}</span>
                  </div>
                  <div className="flex gap-2 text-[10px]">
                    <span className="syntax-keyword select-none">[ </span>
                    <span className="text-muted-foreground">{profile.stats}</span>
                    <span className="syntax-keyword select-none"> ]</span>
                  </div>
                </div>

                <p className="mt-4 text-[11px] font-code text-muted-foreground leading-relaxed border-t border-white/[0.06] pt-3">
                  <span className="syntax-comment select-none"># </span>
                  {profile.description}
                </p>
              </Link>
            );
          })}
        </Stagger>
      )}
    </section>
  );
}
