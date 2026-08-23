import { cn } from "@/lib/utils";

interface CoderLogoProps {
  className?: string;
  glow?: boolean;
}

/**
 * Coder logo mark — `</>` inside a terminal chip.
 */
export function CoderLogo({ className, glow = true }: CoderLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-primary/40 bg-primary/10 px-2 py-1 font-code text-[13px] font-extrabold leading-none text-primary select-none",
        glow && "shadow-[0_0_14px_rgba(250,178,131,0.25)]",
        className
      )}
      aria-label="coder logo"
    >
      &lt;/&gt;
    </span>
  );
}
