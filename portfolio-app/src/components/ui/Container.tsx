import { cn } from "@/lib/cn";

// Centered page shell at the shared max width. `bleed` drops horizontal padding
// for full-width children.
export function Container({
  children,
  className,
  bleed = false,
}: {
  children: React.ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-shell",
        !bleed && "px-6 sm:px-8 lg:px-12",
        className
      )}
    >
      {children}
    </div>
  );
}
