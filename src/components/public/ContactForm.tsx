
"use client";

import { Send, Mail, MapPin, Linkedin } from "lucide-react";

export function ContactForm() {
  return (
    <section id="contact" className="animate-reveal opacity-0" style={{ animationDelay: '0.7s' }}>
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-bold text-primary">Contact</h2>
            <h3 className="text-4xl font-headline font-bold">Get in touch.</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-2xl bg-white/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Email Me</p>
                <p className="text-sm font-medium">hello@princepal.dev</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-2xl bg-white/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Location</p>
                <p className="text-sm font-medium">Remote / India</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-2xl bg-white/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Let's Connect</p>
                <p className="text-sm font-medium">linkedin.com/in/princepal</p>
              </div>
            </div>
          </div>
        </div>

        <form className="glass-card p-8 border-white/5 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Name</label>
                <input type="text" className="w-full bg-white/5 border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Email</label>
                <input type="email" className="w-full bg-white/5 border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Message</label>
              <textarea rows={4} className="w-full bg-white/5 border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none" placeholder="Tell me about your project..."></textarea>
            </div>
          </div>
          <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
            Send Message <Send className="w-3 h-3" />
          </button>
        </form>
      </div>
    </section>
  );
}
