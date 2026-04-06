"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageCircle, Send, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
  };

  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-headline font-bold tracking-tighter">Let's Connect</h2>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            {[
              { icon: Mail, label: "Email", value: "hello@portfoforge.com" },
              { icon: MessageCircle, label: "Telegram", value: "@developer_architect" },
              { icon: MapPin, label: "Location", value: "Remote / Worldwide" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{item.label}</div>
                  <div className="text-sm font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="glass-card border-white/5 bg-white/[0.02]">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                  <Input required placeholder="John Doe" className="bg-background/50 border-white/10 text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                  <Input required type="email" placeholder="john@example.com" className="bg-background/50 border-white/10 text-xs" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                <Input required placeholder="Project Collaboration" className="bg-background/50 border-white/10 text-xs" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                <Textarea required placeholder="Tell me more about your project..." className="bg-background/50 border-white/10 min-h-[120px] text-xs" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-xs font-bold uppercase tracking-[0.2em]">
                Send Message <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
