// Dependency-free className joiner (no clsx/tailwind-merge — keeps the lib count honest).
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
