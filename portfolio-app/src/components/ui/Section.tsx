import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Reveal } from "./Motion";

// Standard section rhythm: anchor id + scroll offset, optional kicker/title header.
// Typography + whitespace carry the hierarchy — no decorative dividers.
export function Section({
  id,
  kicker,
  title,
  lead,
  children,
  className,
}: {
  id?: string;
  kicker?: string;
  title?: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-24 sm:py-32", className)}>
      <Container>
        {(kicker || title || lead) && (
          <Reveal as="header" className="mb-14 max-w-prose">
            {kicker && (
              <p className="font-display font-medium uppercase text-kicker text-accent">
                {kicker}
              </p>
            )}
            {title && (
              <h2 className="mt-4 font-display font-bold text-title text-text">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-4 text-body text-text-secondary">{lead}</p>
            )}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
