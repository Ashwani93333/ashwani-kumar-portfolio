import { cn } from "@/lib/utils";

/**
 * Animated skeleton loading block. Use `shape` presets to mimic the data
 * structure being loaded so the UI feels alive while fetching.
 */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} aria-hidden />;
}

export function SkeletonCard({
  className,
  lines = 3,
}: {
  className?: string;
  lines?: number;
}) {
  return (
    <div className={cn("term-card p-5", className)} aria-hidden>
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-9 h-9 rounded-md" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-2.5 w-2/3" />
          <Skeleton className="h-2 w-1/3" />
        </div>
      </div>
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-2.5 w-full" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonBars({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex justify-between">
            <Skeleton className="h-2.5 w-24" />
            <Skeleton className="h-2 w-8" />
          </div>
          <Skeleton className="h-1.5 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonRows({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-start gap-3">
          <Skeleton className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-2.5 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTerminal({
  rows = 5,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn("term-card overflow-hidden", className)} aria-hidden>
      <div className="terminal-header">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-white/10" />
          <span className="w-3 h-3 rounded-full bg-white/10" />
          <span className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <Skeleton className="h-2.5 w-32 mx-auto" />
      </div>
      <div className="p-5 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 shrink-0" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
