
"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

export function About() {
  // ✅ STATES
  const [fullName, setFullName] = useState("Ashwani Kumar");
  const [professionalBio, setProfessionalBio] = useState("Backend Developer skilled in building secure and scalable applications using Spring Boot, integrating Machine Learning and AI-powered solutions with Python. Experienced in developing RESTful APIs, database management, authentication systems, and connecting intelligent models with production-grade backend architectures. Passionate about creating efficient, data-driven applications that combine robust server-side engineering with modern AI capabilities.");
  const [engineeringPhilosophy, setengineeringPhilosophy] = useState<string[]>(["Clear APIs and testable code over clever one-offs.",
    "Data modeling that stays understandable as requirements change.",
    "Ship incrementally—small, working pieces beat big plans.",
    "Learn in public: side projects over only coursework."]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH PROFILE DATA
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        // ✅ SET DATA FROM API
        setFullName(data.fullName || "Ashwani Kumar");
        setProfessionalBio(
          data.professionalBio ||
          "Java + Spring Boot for production backend. Learning Go for systems. React / Next.js for interfaces."
        );
        setengineeringPhilosophy(
          data.engineeringPhilosophy || [
            "Clear APIs and testable code over clever one-offs.",
            "Data modeling that stays understandable as requirements change.",
            "Ship incrementally—small, working pieces beat big plans.",
            "Learn in public: side projects over only coursework.",
          ]
        );
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section
      id="about"
      className="animate-reveal opacity-0 [animation-fill-mode:forwards]"
    >
      <div className="grid md:grid-cols-[1fr_2fr] gap-12">
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-primary/80">
            About
          </h2>

          <div className="space-y-6">
            <h3 className="text-xl font-headline font-bold leading-tight">
              {loading ? "Loading..." : fullName}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {loading
                ? "Fetching data..."
                : professionalBio}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Static paragraphs (you can also make these dynamic later) */}
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
            <p>
              B.Tech in Computer Science and Specialization in Artificial Intelligence (expected May 2029). I’ve worked as a Software Developer Intern at{" "}
              <span className="text-foreground font-medium">JPMorgan Chase & Co.</span> as a Backend Developer Intern Through Virtual Internship Program.{" "}
              {/* <span className="text-foreground font-medium"></span>. */}
            </p>
          </div>

          {/* 🔥 PHILOSOPHY (DYNAMIC) */}
          <div className="p-6 rounded-2xl bg-secondary/30 border border-white/5 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/40 group-hover:bg-primary transition-colors" />

            <div className="flex items-center gap-2 text-[10px] font-mono text-primary/60 uppercase tracking-widest mb-2">
              <Terminal className="w-3 h-3" />
              <span>Philosophy</span>
            </div>

            <div className="font-mono text-xs space-y-3">
              <div className="flex gap-2 text-primary/80">
                <span>$</span>
                <span className="text-foreground">philosophy</span>
              </div>

              {loading ? (
                <p className="text-muted-foreground">Loading...</p>
              ) : (
                engineeringPhilosophy.map((item, idx) => (
                  <div key={idx} className="flex gap-3 pl-2">
                    <span className="text-primary/40">›</span>
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}