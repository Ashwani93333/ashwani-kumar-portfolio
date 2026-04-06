
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";

export function Hero() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'profile-pic');

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new projects
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight">
            Crafting Digital <br />
            <span className="text-gradient">Experiences</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
            Full-stack engineer and designer focused on building polished, scalable products with modern technologies.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium group">
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/10 hover:bg-white/5">
              Download Resume
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10">
            <Image
              src={heroImg?.imageUrl || "https://picsum.photos/seed/profile/800/800"}
              alt="Profile"
              fill
              className="object-cover"
              data-ai-hint="professional man portrait"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
