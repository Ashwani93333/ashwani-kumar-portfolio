"use client";

import { useEffect, useState } from "react";
import { TerminalWindow } from "./TerminalWindow";
import { SectionHeading } from "./SectionHeading";
import { Skeleton } from "@/components/public/Skeleton";

export function About() {
  const [fullName, setFullName] = useState("Ashwani Kumar");
  const [professionalBio, setProfessionalBio] = useState(
    "Backend Developer skilled in building secure and scalable applications using Spring Boot, integrating Machine Learning and AI-powered solutions with Python."
  );
  const [philosophy, setPhilosophy] = useState<string[]>([
    "Clear APIs and testable code over clever one-offs.",
    "Data modeling that stays understandable as requirements change.",
    "Ship incrementally — small, working pieces beat big plans.",
    "Learn in public: side projects over only coursework.",
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.fullName) setFullName(data.fullName);
        if (data.professionalBio) setProfessionalBio(data.professionalBio);
        if (data.engineeringPhilosophy) setPhilosophy(data.engineeringPhilosophy);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <section id="about" className="scroll-mt-24">
      <SectionHeading
        path="~/about.md"
        title="whoami"
        subtitle={`$ cat about.md — ${fullName}`}
      />

      <div className="mt-8 grid lg:grid-cols-[1.1fr_1fr] gap-8">
        {/* Biography as markdown */}
        <TerminalWindow title="about.md — markdown" bodyClassName="p-6">
            <div className="font-code text-[13px] leading-relaxed space-y-4">
              <div className="flex gap-3">
                <span className="syntax-constant shrink-0 select-none">$</span>
                <span className="syntax-comment"># whoami</span>
              </div>

              <div className="space-y-3 text-muted-foreground">
                <p>
                  <span className="syntax-keyword">### </span>
                  <span className="text-foreground font-semibold">{fullName}</span>
                  <span className="syntax-keyword"> ()</span>
                </p>

                <p className="whitespace-pre-line">
                  {loading ? (
                    <span className="inline-flex flex-col gap-1.5 w-full">
                      <Skeleton className="h-3 w-11/12" />
                      <Skeleton className="h-3 w-3/4" />
                    </span>
                  ) : (
                    <span className="syntax-string">{professionalBio}</span>
                  )}
                </p>

                <div className="pt-2 space-y-1.5">
                  <div className="flex gap-2">
                    <span className="syntax-property">education</span>
                    <span className="syntax-punct">:</span>
                    <span className="syntax-string">B.Tech CSE (AI) — GL Bajaj</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="syntax-property">internships</span>
                    <span className="syntax-punct">:</span>
                    <span className="syntax-string">JPMorgan Chase & Co. · HPE</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="syntax-property">focus</span>
                    <span className="syntax-punct">:</span>
                    <span className="syntax-string">scalable backends · AI integration</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="syntax-property">location</span>
                    <span className="syntax-punct">:</span>
                    <span className="syntax-string">Remote / India</span>
                  </div>
                </div>
              </div>
            </div>
          </TerminalWindow>

        {/* Engineering philosophy as comments */}
        <TerminalWindow title="philosophy.js" bodyClassName="p-6">
            <div className="font-code text-[12px] leading-relaxed space-y-2.5">
              <div className="flex gap-3">
                <span className="syntax-constant shrink-0 select-none">$</span>
                <span className="syntax-keyword">philosophy</span>
                <span className="text-muted-foreground">() {"{"}</span>
              </div>

              {loading ? (
                <div className="space-y-2.5 pl-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-3 w-full max-w-[70%]" />
                  ))}
                </div>
              ) : (
                philosophy.map((item, idx) => (
                  <div key={idx} className="flex gap-3 pl-6">
                    <span className="syntax-comment shrink-0 select-none">//</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))
              )}

              <div className="flex gap-3">
                <span className="text-muted-foreground pl-6 select-none">{"}"}</span>
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-success">
                  <span className="live-dot w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="syntax-keyword">OK</span>
                  <span className="text-muted-foreground/70">
                    — 4 principles loaded
                  </span>
                </div>
              </div>
            </div>
          </TerminalWindow>
      </div>
    </section>
  );
}
