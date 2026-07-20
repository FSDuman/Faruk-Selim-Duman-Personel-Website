import { cn } from "@/lib/cn";

// Surface card. `interactive` adds a quiet lift + mint hairline on hover —
// the only motion permitted after the hero.
export function Card({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface/60 p-8",
        interactive &&
          "transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-mint/40",
        className
      )}
    >
      {children}
    </div>
  );
}
