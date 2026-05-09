
"use client";

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

export function Hero() {

  // ✅ STATES
    const [fullName, setFullName] = useState("Ashwani Kumar");
    const [professionalBio, setProfessionalBio] = useState("");
    const[professionalRole,setProfessionalRole] = useState("Backend Engineer");
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
          setProfessionalRole(
            data.professionalRole ||
              "Backend Engineer"
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
    <section className="pt-32 pb-16 animate-reveal opacity-0">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-bold uppercase tracking-widest text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Available for new opportunities
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {loading ? "Ashwani Kumar" : fullName}.<br />
            {loading ? "Backend Engineer" : professionalRole}.
          </h1>
        </div>
        
        <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
          {loading ? "fetching data..." : professionalBio}
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <Link href="#contact">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">
              Let's Connect <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com/Ashwani93333" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/ashwani-kumar-128240383/" },
              { icon: Mail, href: "mailto:ashwanikumar93333@gmail.com" }
            ].map((social, i) => (
              <Link 
                key={i} 
                href={social.href}
                className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/20 transition-all"
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
