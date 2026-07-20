export type QualityTier = "low" | "high";

export interface Quality {
  tier: QualityTier;
  nodeCount: number;
  maxDpr: number;
}

// Heuristic device-capability tier. SSR-safe (defaults to high on the server;
// the real value is read on the client after mount to avoid hydration drift).
export function detectQuality(): Quality {
  if (typeof window === "undefined") {
    return { tier: "high", nodeCount: 92, maxDpr: 2 };
  }

  const nav = window.navigator as Navigator & { deviceMemory?: number };
  const memory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  const isLowPower = coarsePointer || memory <= 4 || cores <= 4;

  return isLowPower
    ? { tier: "low", nodeCount: 44, maxDpr: 1.5 }
    : { tier: "high", nodeCount: 92, maxDpr: 2 };
}
