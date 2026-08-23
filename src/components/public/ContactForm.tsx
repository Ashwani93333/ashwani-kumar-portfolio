"use client";

import { useState } from "react";
import { Send, Mail, MapPin, Linkedin, CornerDownLeft } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { TerminalWindow } from "./TerminalWindow";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const contactResponse = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!contactResponse.ok) throw new Error("Failed to save contact message");

      setSuccessMessage("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Contact Form Error:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[#0d0d0d] border border-white/10 rounded px-4 py-3 font-code text-[12px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_0_1px_rgba(250,178,131,0.2)] transition-all";

  return (
    <section id="contact" className="scroll-mt-24">
      <Reveal>
        <SectionHeading
          path="~/contact.sh"
          title="get in touch"
          subtitle="echo 'hello world' | nc ashwani.kumar --open"
        />
      </Reveal>

      <div className="mt-8 grid lg:grid-cols-[1fr_1.1fr] gap-8">
        {/* Left: contact info as terminal commands */}
        <Reveal direction="left">
          <div className="space-y-6">
            <TerminalWindow title="contacts.list" bodyClassName="p-6">
              <div className="font-code text-[12px] leading-relaxed space-y-4">
                <div className="flex gap-3">
                  <span className="syntax-constant select-none">$</span>
                  <span className="syntax-comment"># reach me via</span>
                </div>

                <a
                  href="mailto:ashwanikumar93333@gmail.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="p-2.5 rounded border border-white/10 bg-white/[0.03] text-[#7fd88f] group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground">email</p>
                    <p className="text-[12px] text-foreground group-hover:text-primary transition-colors truncate">
                      ashwanikumar93333@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3 group">
                  <div className="p-2.5 rounded border border-white/10 bg-white/[0.03] text-[#56b6c2] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground">location</p>
                    <p className="text-[12px] text-foreground">Remote / India</p>
                  </div>
                </div>

                <a
                  href="https://www.linkedin.com/in/ashwani-kumar-128240383"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="p-2.5 rounded border border-white/10 bg-white/[0.03] text-[#9d7cd8] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground">linkedin</p>
                    <p className="text-[12px] text-foreground group-hover:text-primary transition-colors truncate">
                      /in/ashwani-kumar-128240383
                    </p>
                  </div>
                </a>
              </div>
            </TerminalWindow>

            <div className="term-card p-5 font-code text-[12px] text-muted-foreground space-y-1.5">
              <div className="flex gap-2">
                <span className="syntax-constant select-none">$</span>
                <span className="syntax-keyword">response_time</span>
              </div>
              <div className="flex gap-2 pl-4">
                <span className="syntax-property">→</span>
                <span className="syntax-string">usually &lt; 24 hours</span>
              </div>
              <div className="flex gap-2 pl-4">
                <span className="syntax-property">→</span>
                <span className="syntax-string">open to internships · freelance · collabs</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right: the form */}
        <Reveal direction="right" delay={100}>
          <form onSubmit={handleSubmit} className="term-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-success" />
              <span>new-message.sh</span>
              <span className="ml-auto">{loading ? "sending..." : "— nano"}</span>
            </div>

            <div className="p-5 md:p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-code text-muted-foreground">
                    <span className="syntax-property select-none">$</span> name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="john doe"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-code text-muted-foreground">
                    <span className="syntax-property select-none">$</span> email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-code text-muted-foreground">
                  <span className="syntax-property select-none">$</span> subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="project inquiry / collaboration / freelance"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-code text-muted-foreground">
                  <span className="syntax-property select-none">$</span> message
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`${inputClass} resize-none`}
                  placeholder="// tell me about your project..."
                />
              </div>

              {successMessage && (
                <div className="flex items-start gap-2 font-code text-[12px] text-success border border-success/20 bg-success/5 rounded px-3 py-2.5">
                  <span className="select-none">✓</span>
                  <span>{successMessage}</span>
                </div>
              )}
              {errorMessage && (
                <div className="flex items-start gap-2 font-code text-[12px] text-destructive border border-destructive/20 bg-destructive/5 rounded px-3 py-2.5">
                  <span className="select-none">✗</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded font-code text-[12px] font-bold bg-primary text-primary-foreground hover:brightness-110 transition-all border border-primary/50 shadow-[0_0_24px_rgba(250,178,131,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    sending...
                  </>
                ) : (
                  <>
                    <CornerDownLeft className="w-4 h-4" />
                    ./send.sh --message
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
