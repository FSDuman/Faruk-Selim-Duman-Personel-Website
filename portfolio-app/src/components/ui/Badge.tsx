import { cn } from "@/lib/cn";

type Tone = "accent" | "coral" | "neutral";

const tones: Record<Tone, string> = {
  // accent = interactive/primary status; coral = emphasis only; neutral = quiet meta.
  accent: "border-accent/25 bg-accent/[0.08] text-accent",
  coral: "border-coral/25 bg-coral/[0.08] text-coral",
  neutral: "border-line bg-text/[0.03] text-text-secondary",
};

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-small font-medium",
        tones[tone],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            tone === "coral" ? "bg-coral" : "bg-accent"
          )}
        />
      )}
      {children}
    </span>
  );
}
