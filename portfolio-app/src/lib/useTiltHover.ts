"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SETTLE = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
const TRACK = "transform 0.12s ease-out";

// Pointer-driven 3D tilt + lift. Disabled under reduced motion and on
// coarse (touch) pointers, where hover has no meaning.
export function useTiltHover(maxTilt = 8, liftScale = 1.02) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const [coarse, setCoarse] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const disabled = !!reduced || coarse;

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setStyle({
        transform: `perspective(900px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) scale(${liftScale})`,
        transition: TRACK,
      });
    },
    [maxTilt, liftScale],
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: SETTLE,
    });
  }, []);

  return {
    ref,
    style: disabled ? undefined : style,
    handlers: disabled ? {} : { onMouseMove, onMouseLeave },
  };
}
