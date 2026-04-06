"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

export function ContactForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding bg-card/20 border-t border-white/5">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-24">
        <div className="opacity-0 animate-reveal">
          <h2 className="text-3xl font-headline font-bold tracking-tighter uppercase mb-6">Let's connect</h2>
          <p className="text-xs text-muted-foreground leading-relaxed mb-8 max-w-sm uppercase tracking-widest">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div className="text-[11px] font-medium tracking-widest">
                HELLO@PORTFOFORGE.COM
              </div>
            </div>
          </div>
        </div>

        <div className="opacity-0 animate-reveal delay-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Name</label>
                <Input required className="bg-white/5 border-white/5 focus:border-primary/50 text-xs h-12 rounded-xl" placeholder="Your Name" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Email</label>
                <Input required type="email" className="bg-white/5 border-white/5 focus:border-primary/50 text-xs h-12 rounded-xl" placeholder="Email Address" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Message</label>
              <Textarea required className="bg-white/5 border-white/5 focus:border-primary/50 text-xs min-h-[150px] rounded-2xl p-4" placeholder="Tell me about your project..." />
            </div>
            <Button disabled={loading} className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 transition-all font-bold uppercase tracking-[0.2em] text-[10px]">
              {loading ? "Sending..." : "Send Message"}
              <Send className="ml-2 w-3 h-3" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}