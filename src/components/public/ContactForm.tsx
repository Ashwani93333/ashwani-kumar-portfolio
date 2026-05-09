
"use client";

import { useState } from "react";
import { Send, Mail, MapPin, Linkedin } from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const adminToken = localStorage.getItem("accessToken") || "";

      /*
       * STEP 1: Save contact form in DB
       */
      const contactResponse = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!contactResponse.ok) {
        throw new Error("Failed to save contact message");
      }

      /*
       * STEP 2: Send email notification
       */
      const emailPayload = {
        recipient: formData.email,
        subject: formData.subject,
        msg: formData.message,
      };

      const emailResponse = await fetch(`${API_BASE_URL}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(emailPayload),
      });

      if (!emailResponse.ok) {
        throw new Error("Message saved but email failed");
      }

      setSuccessMessage(
        "Message sent successfully! I’ll get back to you soon."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="animate-reveal opacity-0"
      style={{ animationDelay: "0.7s" }}
    >
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-bold text-primary">
              Contact
            </h2>
            <h3 className="text-4xl font-headline font-bold">
              Get in touch.
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your visions.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-2xl bg-white/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                  Email Me
                </p>
                <p className="text-sm font-medium">
                  ashwanikumar93333@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-2xl bg-white/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                  Location
                </p>
                <p className="text-sm font-medium">Remote / India</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-2xl bg-white/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                  Let's Connect
                </p>
                <p className="text-sm font-medium break-all">
                  https://www.linkedin.com/in/ashwani-kumar-128240383
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 border-white/5 space-y-6"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                placeholder="Project Inquiry / Collaboration / Freelance"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
          </div>

          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>
    </section>
  );
}