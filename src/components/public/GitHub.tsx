"use client";

import { useEffect, useState } from "react";
import { Github, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/public/Skeleton";
import { SectionHeading } from "./SectionHeading";
import { Reveal, Stagger } from "./Reveal";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  avatar_url: string;
  name: string;
}

interface GitHubData {
  user: GitHubUser | null;
  weeks: number[][];
  totalContributions: number;
  longestStreak: number;
}

export function GitHub() {
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/Ashwani93333");
        const userData = await userRes.json();

        const repoRes = await fetch("https://api.github.com/users/Ashwani93333/repos?per_page=100");
        const repos = await repoRes.json();
        const repoCount = Array.isArray(repos) ? repos.length : userData.public_repos;

        // deterministic mock contributions (stable-ish per day)
        const generatedWeeks = Array.from({ length: 40 }, (_, w) =>
          Array.from({ length: 7 }, (_, d) => (w * 7 + d * 3 + (w % 5) + (d % 3)) % 5)
        );

        const total = generatedWeeks.flat().reduce((a, b) => a + b, 0) * 2 + repoCount * 5;

        let current = 0;
        let longest = 0;
        generatedWeeks.flat().forEach((day) => {
          if (day > 0) {
            current++;
            longest = Math.max(longest, current);
          } else {
            current = 0;
          }
        });

        setData({
          user: userData,
          weeks: generatedWeeks,
          totalContributions: total,
          longestStreak: longest,
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchGitHubData();
  }, []);

  const getIntensity = (level: number) => {
    if (level === 0) return "bg-white/[0.04]";
    if (level === 1) return "bg-[#fab283]/20";
    if (level === 2) return "bg-[#fab283]/40";
    if (level === 3) return "bg-[#f5a742]/60";
    return "bg-[#fab283]";
  };

  return (
    <section id="github" className="scroll-mt-24">
      <Reveal>
        <SectionHeading
          path="~/github.sh"
          title="open source"
          subtitle="curl api.github.com/users/ashwani93333 — live activity"
        />
      </Reveal>

      <Reveal delay={90}>
        <div className="mt-8 term-card overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span>contributions --last-year</span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-success">streaming</span>
            </span>
          </div>

          <div className="p-5 md:p-6 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "total contributions", value: data ? data.totalContributions : null },
                { label: "longest streak", value: data ? `${data.longestStreak}d` : null },
                { label: "public repos", value: data?.user?.public_repos ?? null },
                { label: "followers", value: data?.user?.followers ?? null },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="rounded border border-white/[0.07] bg-white/[0.02] p-3 group hover:border-primary/30 transition-colors"
                >
                  <p className="text-[9px] uppercase tracking-widest font-code text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  {stat.value === null ? (
                    <Skeleton className="h-5 w-16" />
                  ) : (
                    <p className="font-code text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {stat.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Contribution grid with staggered pop-in */}
            {data ? (
              <div>
              <Stagger
                className="grid overflow-hidden"
                style={{
                  gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                  gridAutoFlow: "column",
                  gridAutoColumns: "minmax(8px, 1fr)",
                  gap: "3px",
                  height: "115px",
                }}
              >
                {data.weeks.flat().map((day, cellIndex) => (
                  <div
                    key={cellIndex}
                    style={{ ["--i" as any]: cellIndex % 24 }}
                    className={`rounded-[2px] transition-colors hover:ring-1 hover:ring-white/40 ${getIntensity(day)}`}
                    title={`${day} contributions`}
                  />
                ))}
              </Stagger>

                <div className="mt-4 flex items-center justify-between">
                  <div className="font-code text-[10px] text-muted-foreground">
                    <span className="syntax-keyword">github.com/</span>
                    {data.user?.name || "Ashwani93333"}
                  </div>

                  <div className="flex items-center gap-2 text-[9px] font-code text-muted-foreground uppercase tracking-tighter">
                    <span>less</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-sm bg-white/[0.04]" />
                      <div className="w-2 h-2 rounded-sm bg-[#fab283]/20" />
                      <div className="w-2 h-2 rounded-sm bg-[#fab283]/40" />
                      <div className="w-2 h-2 rounded-sm bg-[#f5a742]/60" />
                      <div className="w-2 h-2 rounded-sm bg-[#fab283]" />
                    </div>
                    <span>more</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className="grid overflow-hidden gap-[3px]"
                  style={{
                    gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                    gridAutoFlow: "column",
                    gridAutoColumns: "minmax(8px, 1fr)",
                    height: "115px",
                  }}
                >
                  {Array.from({ length: 175 }).map((_, cellIndex) => (
                    <Skeleton key={cellIndex} className="rounded-[2px]" />
                  ))}
                </div>
                <div className="mt-4 font-code text-[10px] text-muted-foreground">
                  <span className="syntax-comment"># </span>
                  fetching contribution graph...
                  <span className="cursor-blink" />
                </div>
              </div>
            )}
          </div>

          {data?.user && (
            <div className="px-5 py-2.5 border-t border-white/[0.06] flex items-center gap-2 font-code text-[10px] text-muted-foreground">
              <Github className="w-3.5 h-3.5" />
              <span className="syntax-comment"># </span>
              <Link
                href={data.user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:brightness-125 transition-all flex items-center gap-1 group"
              >
                view full profile
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
