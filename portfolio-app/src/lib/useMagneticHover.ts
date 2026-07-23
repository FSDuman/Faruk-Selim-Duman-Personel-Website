"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SETTLE = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
const TRACK = "transform 0.1s ease-out";

// Pulls an element a fraction of the way toward the cursor while hovered,
// snapping back on leave. Disabled under reduced motion and touch pointers.
export function useMagneticHover(strength = 0.3, max = 12) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const [coarse, setCoarse] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const disabled = !!reduced || coarse;

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const x = Math.max(-max, Math.min(max, dx * strength));
      const y = Math.max(-max, Math.min(max, dy * strength));
      setStyle({
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: TRACK,
      });
    },
    [strength, max],
  );

  const onMouseLeave = useCallback(() => {
    setStyle({ transform: "translate3d(0, 0, 0)", transition: SETTLE });
  }, []);

  return {
    ref,
    style: disabled ? undefined : style,
    handlers: disabled ? {} : { onMouseMove, onMouseLeave },
  };
}
