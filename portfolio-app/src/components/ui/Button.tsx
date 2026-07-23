"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useMagneticHover } from "@/lib/useMagneticHover";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center gap-2 rounded-xl font-display text-small font-semibold " +
  "transition-[background-color,border-color,color] duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink px-6 py-3.5 shadow-glow hover:bg-accent-hi",
  ghost:
    "border border-line px-6 py-3.5 text-text hover:border-accent hover:text-accent",
};

// Anchor-based button: next/link for internal (#/…) hrefs, plain anchor for
// mailto:/tel:/external targets. Pulls slightly toward the cursor on hover.
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
  const { ref, style, handlers } = useMagneticHover();

  if (isInternal && !external) {
    return (
      <Link
        href={href}
        className={classes}
        ref={ref as React.Ref<HTMLAnchorElement>}
        style={style}
        {...handlers}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      ref={ref as React.Ref<HTMLAnchorElement>}
      style={style}
      {...handlers}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
