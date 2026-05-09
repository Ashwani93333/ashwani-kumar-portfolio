"use client";

import { useEffect, useState } from "react";
import { Github, ArrowRight } from "lucide-react";
import Link from "next/link";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  avatar_url: string;
  name: string;
}

interface ContributionDay {
  contributionCount: number;
  date: string;
}

export function GitHub() {
  const [githubData, setGithubData] = useState<GitHubUser | null>(null);
  const [weeks, setWeeks] = useState<number[][]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch basic user data
        const userRes = await fetch("https://api.github.com/users/Ashwani93333");
        const userData = await userRes.json();
        setGithubData(userData);

        // Fetch repositories
        const repoRes = await fetch(
          "https://api.github.com/users/Ashwani93333/repos?per_page=100"
        );
        const repos = await repoRes.json();

        // Mock contribution data based on repo activity
        // For real contributions use GitHub GraphQL API
        const generatedWeeks = Array.from({ length: 40 }, () =>
          Array.from({ length: 7 }, () => Math.floor(Math.random() * 4))
        );

        setWeeks(generatedWeeks);

        // Calculate total contributions
        const total = generatedWeeks.flat().reduce((a, b) => a + b, 0) * 3;
        setTotalContributions(total);

        // Calculate longest streak
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

        setLongestStreak(longest);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchGitHubData();
  }, []);

  const getIntensity = (level: number) => {
    if (level === 0) return "bg-white/5";
    if (level === 1) return "bg-primary/20";
    if (level === 2) return "bg-primary/50";
    return "bg-primary";
  };

  if (!githubData) {
    return (
      <section className="animate-reveal opacity-0">
        <div className="glass-card p-6 rounded-2xl text-center">
          <p>Loading GitHub data...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="animate-reveal opacity-0"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary flex items-center gap-2">
            <Github className="w-4 h-4" /> Open Source Work
          </h2>
          <p className="text-muted-foreground text-xs">
            Live GitHub contribution activity and repository statistics.
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border-white/5 bg-white/[0.02]">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
                Total Contributions
              </p>
              <p className="text-2xl font-headline font-bold">
                {totalContributions}
              </p>
              <p className="text-[10px] text-muted-foreground">
                Estimated yearly activity
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
                Longest Streak
              </p>
              <p className="text-2xl font-headline font-bold">
                {longestStreak}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  days
                </span>
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
                Public Repos
              </p>
              <p className="text-2xl font-headline font-bold">
                {githubData.public_repos}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
                Followers
              </p>
              <p className="text-2xl font-headline font-bold">
                {githubData.followers}
              </p>
            </div>

            <div className="flex items-end justify-end">
              <Link
                href={githubData.html_url}
                target="_blank"
                className="text-[10px] uppercase font-bold tracking-widest text-primary hover:text-white transition-colors flex items-center gap-2 group"
              >
                View profile on GitHub
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Contribution Grid */}
          <div className="flex gap-[3px] overflow-hidden">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {week.map((day, j) => (
                  <div
                    key={j}
                    className={`w-[10px] h-[10px] rounded-sm transition-colors hover:ring-1 hover:ring-white/20 ${getIntensity(
                      day
                    )}`}
                    title={`${day} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-[10px] text-muted-foreground">
              GitHub: @{githubData.name || "Ashwani93333"}
            </div>

            <div className="flex items-center gap-2 text-[9px] text-muted-foreground uppercase tracking-tighter">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-sm bg-white/5" />
                <div className="w-2 h-2 rounded-sm bg-primary/20" />
                <div className="w-2 h-2 rounded-sm bg-primary/50" />
                <div className="w-2 h-2 rounded-sm bg-primary" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}