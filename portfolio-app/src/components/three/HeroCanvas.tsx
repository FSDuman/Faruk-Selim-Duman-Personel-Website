"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import { detectQuality } from "@/lib/device";
import { HeroScene } from "./HeroScene";

// Owns the WebGL surface: dpr clamp, manual frameloop (paused when the tab is
// hidden, the hero is off-screen, or reduced motion is set), no post-processing.
export function HeroCanvas({
  scrollRef,
  paused,
  frozen,
}: {
  scrollRef: React.MutableRefObject<number>;
  paused: boolean;
  frozen: boolean;
}) {
  const quality = useMemo(() => detectQuality(), []);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // "never" still renders one frame on mount → correct static image when frozen.
  const active = !paused && !frozen && !tabHidden;

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, quality.maxDpr]}
      camera={{ fov: 45, position: [0, 0, 7], near: 0.1, far: 100 }}
      gl={{
        antialias: quality.tier === "high",
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      <HeroScene
        nodeCount={quality.nodeCount}
        scrollRef={scrollRef}
        frozen={frozen}
      />
    </Canvas>
  );
}
