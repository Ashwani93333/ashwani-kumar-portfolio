
import { Navbar } from "@/components/public/Navbar";
import { Hero } from "@/components/public/Hero";
import { Projects } from "@/components/public/Projects";
import { Blogs } from "@/components/public/Blogs";
import { ContactForm } from "@/components/public/ContactForm";
import { Footer } from "@/components/public/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Projects />
      <Blogs />
      <ContactForm />
      <Footer />
    </main>
  );
}
