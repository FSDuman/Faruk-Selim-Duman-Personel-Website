import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center gap-2 rounded-xl font-display text-small font-semibold " +
  "transition-[transform,background-color,border-color,color] duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary:
    "bg-mint text-bg px-6 py-3.5 shadow-glow hover:-translate-y-0.5 hover:bg-mint-hi",
  ghost:
    "border border-line px-6 py-3.5 text-text hover:border-mint hover:text-mint",
};

// Anchor-based button: next/link for internal (#/…) hrefs, plain anchor for
// mailto:/tel:/external targets.
export function Button({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(base, variants[variant], className);
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal && !external) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
