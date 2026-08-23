import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  path: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  className?: string;
}

/**
 * Terminal-style section heading: `// ~/experience.md` path comment on top
 * of the actual heading, with a blinking cursor accent.
 */
export function SectionHeading({
  path,
  title,
  subtitle,
  right,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-3">
        <span className="syntax-comment font-code text-[11px] tracking-tight">
          // {path}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        {right}
      </div>

      <h2 className="text-2xl md:text-3xl font-code font-bold tracking-tight">
        <span className="syntax-keyword mr-2 select-none">{"{"}</span>
        <span className="text-gradient">{title}</span>
        <span className="syntax-keyword ml-2 select-none">{"}"}</span>
      </h2>

      {subtitle && (
        <p className="text-xs md:text-sm text-muted-foreground font-code leading-relaxed">
          <span className="syntax-comment select-none"># </span>
          {subtitle}
        </p>
      )}
    </div>
  );
}
