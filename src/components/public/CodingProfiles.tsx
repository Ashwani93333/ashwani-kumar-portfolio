"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Award, Code2, Globe, Loader2 } from "lucide-react";
import Link from "next/link";

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/coding-profiles`;

// Demo fallback data
const fallbackProfiles = [
  {
    id: 1,
    name: "LeetCode",
    username: "AshwaniKumar93333",
    stats: "50+ Solved",
    link: "https://leetcode.com/u/AshwaniKumar93333/",
    description:
      "Consistent problem-solving in data structures, algorithms, and interview preparation.",
  },
  {
    id: 2,
    name: "GitHub",
    username: "Ashwani93333",
    stats: "Continued contributions",
    link: "https://www.github.com/Ashwani93333",
    description:
      "Competitive programming practice with strong performance in contests and challenges.",
  },
  {
    id: 3,
    name: "GeeksforGeeks",
    username: "ashwani_kumar",
    stats: "23+ Problems",
    link: "https://www.geeksforgeeks.org/profile/ashwanikup8by",
    description:
      "Hands-on coding practice focused on backend development, DSA, and technical growth.",
  },
 
];

// Helper to map platform names to icons and colors
const getPlatformStyles = (name: string) => {
  const platform = name.toLowerCase();
  if (platform.includes("leetcode"))
    return { icon: Code2, color: "text-orange-400" };
  if (platform.includes("codechef"))
    return { icon: Award, color: "text-amber-400" };
  if (platform.includes("geeksforgeeks"))
    return { icon: Code2, color: "text-green-400" };
  if (platform.includes("hackerrank"))
    return { icon: Award, color: "text-emerald-400" };

  return { icon: Code2, color: "text-blue-400" };
};

export function CodingProfiles() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get(API_BASE);
        setProfiles(res.data);
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
    <section
      className="animate-reveal"
      style={{ animationDelay: "0.5s" }}
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xs uppercase tracking-widest font-bold text-primary">
            Practice
          </h2>
          <h3 className="text-2xl font-headline font-bold">
            Coding profiles
          </h3>
          <p className="text-muted-foreground text-xs">
            Problem-solving practice.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-primary opacity-50" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profiles.map((profile: any) => {
              const { icon: Icon, color } = getPlatformStyles(profile.name);

              return (
                <Link
                  key={profile.id}
                  href={profile.link}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="glass-card p-6 border-white/5 hover:bg-white/[0.04] transition-all group block"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl bg-white/5 ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-headline font-bold flex items-center gap-2">
                      {profile.name}
                      <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-widest">
                        {profile.stats}
                      </span>
                    </h4>

                    <p className="text-xs text-primary font-bold">
                      {profile.username}
                    </p>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {profile.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {!loading && profiles.length === 0 && (
          <p className="text-xs text-muted-foreground italic text-center py-4">
            No coding profiles linked yet.
          </p>
        )}
      </div>
    </section>
  );
}