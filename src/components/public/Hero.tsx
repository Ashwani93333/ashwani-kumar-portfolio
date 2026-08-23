"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight, ChevronRight, CornerDownLeft } from "lucide-react";
import { TerminalWindow } from "./TerminalWindow";

interface LogLine {
  id: number;
  text: string;
  kind?: "cmd" | "out" | "err" | "ok" | "comment";
}

const bootLines: LogLine[] = [
  { id: 1, text: "ashwani@kumar:~$ ./init --profile", kind: "cmd" },
  { id: 2, text: "loading modules... backend ✓ frontend ✓ ai ✓", kind: "comment" },
  { id: 3, text: "authenticating as ashwani@github:93333 ✓", kind: "ok" },
  { id: 4, text: "status: OPEN TO WORK", kind: "ok" },
  { id: 5, text: "", kind: "comment" },
  { id: 6, text: "type 'help' to see available commands", kind: "out" },
];

interface TerminalEntry extends LogLine {}

export function Hero() {
  const [fullName, setFullName] = useState("Ashwani Kumar");
  const [professionalRole, setProfessionalRole] = useState("Full Stack Engineer");
  const [professionalBio, setProfessionalBio] = useState(
    "Java + Spring Boot for production backend. Learning Go for systems. React / Next.js for interfaces."
  );
  const [booted, setBooted] = useState(false);

  // interactive terminal state
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState("");
  const [cmdCount, setCmdCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.fullName) setFullName(data.fullName);
        if (data.professionalRole) setProfessionalRole(data.professionalRole);
        if (data.professionalBio) setProfessionalBio(data.professionalBio);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // terminal boot: show all lines statically
  useEffect(() => {
    setHistory(bootLines);
    setBooted(true);
  }, []);

  // keep terminal scrolled to the bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, input]);

  const runCommand = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    const cmd = text.toLowerCase();

    const out: TerminalEntry[] = [{ id: Date.now(), text: `$ ${text}`, kind: "cmd" }];

    switch (cmd) {
      case "help":
        out.push(
          { id: Date.now() + 1, text: "available commands:", kind: "out" },
          { id: Date.now() + 2, text: "  help        → show this help", kind: "comment" },
          { id: Date.now() + 3, text: "  whoami      → about me", kind: "comment" },
          { id: Date.now() + 4, text: "  skills      → my tech stack", kind: "comment" },
          { id: Date.now() + 5, text: "  contact     → reach me", kind: "comment" },
          { id: Date.now() + 6, text: "  clear       → clear terminal", kind: "comment" }
        );
        break;
      case "whoami":
        out.push(
          { id: Date.now() + 1, text: fullName, kind: "ok" },
          { id: Date.now() + 2, text: professionalRole, kind: "out" },
          { id: Date.now() + 3, text: professionalBio, kind: "comment" }
        );
        break;
      case "skills":
        out.push(
          { id: Date.now() + 1, text: "java • spring boot • microservices • kafka", kind: "out" },
          { id: Date.now() + 2, text: "python • ml • flutter • postgresql • git", kind: "out" }
        );
        break;
      case "contact":
        out.push(
          { id: Date.now() + 1, text: "email    → ashwanikumar93333@gmail.com", kind: "ok" },
          { id: Date.now() + 2, text: "github   → github.com/Ashwani93333", kind: "ok" },
          { id: Date.now() + 3, text: "linkedin → /in/ashwani-kumar-128240383", kind: "ok" }
        );
        break;
      case "clear":
        setHistory([]);
        setCmdCount((c) => c + 1);
        return;
      case "resume":
        out.push({ id: Date.now() + 1, text: "download → /Ashwani-Kumar.Resume.pdf", kind: "ok" });
        window.open("/Ashwani-Kumar.Resume.pdf", "_blank");
        break;
      default:
        out.push({ id: Date.now() + 1, text: `command not found: ${text}`, kind: "err" });
        out.push({ id: Date.now() + 2, text: "type 'help' for available commands", kind: "comment" });
    }

    setHistory((h) => [...h, ...out]);
    setCmdCount((c) => c + 1);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  const cmdStyle = (kind?: string) => {
    switch (kind) {
      case "cmd":
        return "text-foreground";
      case "out":
        return "text-muted-foreground";
      case "err":
        return "text-destructive";
      case "ok":
        return "text-success";
      case "comment":
        return "text-muted-foreground/60";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <section className="pt-28 md:pt-36 pb-16">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
        {/* Left: headline */}
        <div className="space-y-7">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-success/30 bg-success/5 font-code text-[11px] font-bold text-success">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-success" />
              AVAILABLE FOR OPPORTUNITIES
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold font-code leading-[1.05]">
              <span className="syntax-variable select-none">const</span>{" "}
              <span className="syntax-type">dev</span>{" "}
              <span className="syntax-punct">=</span>{" "}
              <span className="syntax-punct">{"{"}</span>
              <br />
              <span className="syntax-property pl-4">name</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="syntax-string">"{fullName}"</span>
              <span className="syntax-punct">,</span>
              <br />
              <span className="syntax-property pl-4">role</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="syntax-string">"{professionalRole}"</span>
              <span className="syntax-punct">,</span>
              <br />
              <span className="syntax-variable pl-4"></span>
              <span className="syntax-property">hireable</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="syntax-keyword">true</span>
              <br />
              <span className="syntax-punct">{"};"}</span>
              <span className="cursor-blink" />
            </h1>
          </div>

          <p className="text-sm text-muted-foreground font-code leading-relaxed max-w-md">
            <span className="syntax-comment"># </span>
            {professionalBio}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded font-code text-[12px] font-bold bg-primary text-primary-foreground hover:brightness-110 transition-all border border-primary/50 shadow-[0_0_24px_rgba(250,178,131,0.3)]"
            >
              connect
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com/Ashwani93333", label: "github" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/ashwani-kumar-128240383/", label: "linkedin" },
                { icon: Mail, href: "mailto:ashwanikumar93333@gmail.com", label: "email" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded border border-white/10 bg-white/[0.02] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-[0_0_16px_rgba(250,178,131,0.2)] transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: interactive terminal */}
        <TerminalWindow
          title="ashwani@kumar: ~/portfolio"
          className="animate-float-y"
          bodyClassName="p-0"
        >
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
            <ChevronRight className="w-3 h-3 text-primary" />
            <span>zsh — interactive session ({cmdCount} commands)</span>
          </div>

          <div
            ref={scrollRef}
            className="h-[340px] overflow-y-auto px-4 py-4 font-code text-[12px] leading-relaxed space-y-1.5"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line) =>
              line.text ? (
                <div key={line.id} className={`whitespace-pre-wrap ${cmdStyle(line.kind)}`}>
                  {line.text}
                </div>
              ) : (
                <div key={line.id} className="h-2" />
              )
            )}

            <form onSubmit={submit} className="flex items-center gap-2">
              <span className="syntax-constant select-none">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                aria-label="terminal command input"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/40 caret-primary"
                placeholder={booted ? "try: help" : "loading..."}
                disabled={!booted}
              />
              <button type="submit" aria-label="run command" className="text-muted-foreground hover:text-primary transition-colors">
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 border-t border-white/[0.06] font-code text-[10px] text-muted-foreground/70">
            <span className="syntax-comment">bash</span>
            <span className="text-white/15 select-none">|</span>
            <span className="text-muted-foreground">{fullName} · {professionalRole}</span>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
