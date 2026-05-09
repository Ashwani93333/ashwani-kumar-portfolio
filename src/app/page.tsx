
// import { Navbar } from "@/components/public/Navbar";
// import { Hero } from "@/components/public/Hero";
// import { Projects } from "@/components/public/Projects";
// import { GitHub } from "@/components/public/GitHub";
// import { TechStack } from "@/components/public/TechStack";
// import { Experience } from "@/components/public/Experience";
// import { CodingProfiles } from "@/components/public/CodingProfiles";
// import { Blogs } from "@/components/public/Blogs";
// import { ContactForm } from "@/components/public/ContactForm";
// import { Footer } from "@/components/public/Footer";
// import { TrackRecord } from "@/components/public/TrackRecord";
// import { About } from "@/components/public/About";
// import { Education } from "@/components/public/Education";

// export default function Home() {
//   return (
//     <main className="relative min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-5xl mx-auto px-6 space-y-32 pb-32">
//         <Hero />
//         <About/>
//         <GitHub />
//         <Projects />
//         <TechStack />
//         <Experience />
//         <CodingProfiles />
//         <TrackRecord/>
//         <Education/>
//         <Blogs />
//         <ContactForm />
//       </div>
//       <Footer />
//     </main>
//   );
// }


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

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 space-y-32 pb-32">
        <Hero />

        <section id="about" className="scroll-mt-24">
          <About />
        </section>

        <section id="github" className="scroll-mt-24">
          <GitHub />
        </section>

        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>

        <section id="tech-stack" className="scroll-mt-24">
          <TechStack />
        </section>

        <section id="experience" className="scroll-mt-24">
          <Experience />
        </section>

        <section id="coding-profiles" className="scroll-mt-24">
          <CodingProfiles />
        </section>

        <section id="track-record" className="scroll-mt-24">
          <TrackRecord />
        </section>

        <section id="education" className="scroll-mt-24">
          <Education />
        </section>

        <section id="blogs" className="scroll-mt-24">
          <Blogs />
        </section>

        <section id="contact" className="scroll-mt-24">
          <ContactForm />
        </section>
      </div>

      <Footer />
    </main>
  );
}