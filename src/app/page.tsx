"use client";

import { useEffect, useState } from "react";

import { Navbar } from "@/components/public/Navbar";
import { Hero } from "@/components/public/Hero";
import { Projects } from "@/components/public/Projects";
import { GitHub } from "@/components/public/GitHub";
import { TechStack } from "@/components/public/TechStack";
import { Experience } from "@/components/public/Experience";
import { CodingProfiles } from "@/components/public/CodingProfiles";
import { Blogs } from "@/components/public/Blogs";
import { ContactForm } from "@/components/public/ContactForm";
import { Footer } from "@/components/public/Footer";
import { TrackRecord } from "@/components/public/TrackRecord";
import { About } from "@/components/public/About";
import { Education } from "@/components/public/Education";
import { TerminalBackground } from "@/components/public/TerminalBackground";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#fab283] via-[#f5a742] to-[#9d7cd8] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%`, boxShadow: "0 0 8px rgba(250,178,131,0.6)" }}
      />
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/feature/visitor`, {
      method: "POST",
    }).catch((err) => console.error("Visit tracking failed:", err));
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <TerminalBackground />
      <ScrollProgress />
      <Navbar />

      <div className="pt-14">
        <Hero />

        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-24 md:space-y-32">
          <About />
          <GitHub />
          <CodingProfiles />
          <Projects />
          <TechStack />
          <Experience />
          <TrackRecord />
          <Education />
          <Blogs />
        </div>

        <div className="mt-24 md:mt-32">
          <ContactForm />
          <Footer />
        </div>
      </div>
    </main>
  );
}
