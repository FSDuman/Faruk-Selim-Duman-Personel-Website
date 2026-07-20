import { cn } from "@/lib/cn";

type Tone = "mint" | "coral" | "neutral";

const tones: Record<Tone, string> = {
  // mint = interactive/primary status; coral = emphasis only; neutral = quiet meta.
  mint: "border-mint/25 bg-mint/[0.08] text-mint",
  coral: "border-coral/25 bg-coral/[0.08] text-coral",
  neutral: "border-line bg-white/[0.03] text-text-secondary",
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
            tone === "coral" ? "bg-coral" : "bg-mint"
          )}
        />
      )}
      {children}
    </span>
  );
}
