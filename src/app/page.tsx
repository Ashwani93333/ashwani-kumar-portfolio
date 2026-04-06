
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

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 space-y-32 pb-32">
        <Hero />
        <Projects />
        <GitHub />
        <TechStack />
        <Experience />
        <CodingProfiles />
        <Blogs />
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
