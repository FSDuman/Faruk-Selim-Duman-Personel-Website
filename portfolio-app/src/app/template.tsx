import { PageTransition } from "@/components/ui/Motion";

// App Router remounts template.tsx on every navigation — the right place to
// run a route-entrance transition without wrapping the persistent layout.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
