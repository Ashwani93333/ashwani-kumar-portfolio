"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  maximize?: boolean;
  footer?: ReactNode;
}

/**
 * Reusable terminal-window chrome: traffic lights, a title bar and a
 * code-pane body. Used everywhere across the site to keep the OpenCode
 * terminal look consistent.
 */
export function TerminalWindow({
  title,
  children,
  className,
  bodyClassName,
  maximize = true,
  footer,
}: TerminalWindowProps) {
  return (
    <div className={cn("terminal-window", className)}>
      <div className="terminal-header select-none">
        <div className="flex items-center gap-1.5">
          <span className="traffic-light traffic-red" />
          <span className="traffic-light traffic-yellow" />
          <span className="traffic-light traffic-green" />
        </div>
        {title && (
          <div className="flex-1 text-center">
            <span className="text-[10px] font-code text-muted-foreground/70 tracking-tight">
              {title}
            </span>
          </div>
        )}
        {maximize && (
          <div className="w-12" aria-hidden />
        )}
      </div>
      <div className={cn("p-5 md:p-6", bodyClassName)}>{children}</div>
      {footer}
    </div>
  );
}
