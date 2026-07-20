"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export type TimelineMode = "resting" | "focus";

export interface EntryVisual {
  active: boolean;
  expanded: boolean;
  opacity: number;
  blur: number; // px, stepped: 0 / 2 / 4 / 6
  scale: number;
  elevated: boolean;
}

export interface FocusTimeline {
  active: number;
  mode: TimelineMode;
  translateY: number; // applied to the track only (0 unless capturing focus on desktop)
  reduced: boolean;
  passive: boolean; // touch OR reduced-motion → no wheel capture, natural scroll
  containerRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  registerEntry: (i: number) => (el: HTMLElement | null) => void;
  containerHandlers: {
    onPointerEnter: () => void;
    onPointerLeave: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
  entryHandlers: (i: number) => {
    onFocus: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    tabIndex: number;
  };
  getVisual: (i: number) => EntryVisual;
}

const STEP_LOCK_MS = 450;
const BLUR_STEPS = [0, 2, 4, 6];

export function useFocusTimeline(
  count: number,
  { capture = false }: { capture?: boolean } = {}
): FocusTimeline {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<TimelineMode>("resting");
  const modeRef = useRef<TimelineMode>("resting");
  const [translateY, setTranslateY] = useState(0);
  const [focused, setFocused] = useState<number | null>(null);

  // Capabilities are read after mount so the first client render matches the
  // SSR "resting" baseline (no hydration drift).
  const [reduced, setReduced] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const entryEls = useRef<(HTMLElement | null)[]>([]);
  const lockUntil = useRef(0);
  const activeRef = useRef(active);
  activeRef.current = active;
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const passive = isTouch || reduced;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const sync = () => {
      setReduced(mq.matches);
      setIsTouch(coarse.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
    };
  }, []);

  const registerEntry = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      entryEls.current[i] = el;
    },
    []
  );

  const enterFocus = useCallback(() => {
    modeRef.current = "focus";
    setMode("focus");
  }, []);
  const exitFocus = useCallback(() => {
    modeRef.current = "resting";
    setMode("resting");
    setTranslateY(0);
  }, []);

  // Passive mode (touch / reduced-motion): focus follows the entry nearest the
  // viewport centre. No wheel capture, no track translation — natural scroll.
  useEffect(() => {
    if (!passive) return;
    setMode("focus");
    setTranslateY(0);
    const els = entryEls.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      () => {
        const mid = window.innerHeight / 2;
        let best = 0;
        let bestD = Infinity;
        els.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - mid);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        setActive(best);
      },
      { threshold: [0, 0.5, 1], rootMargin: "-20% 0px -20% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [passive, count]);

  // Recompute the single track transform so the active entry lands on the focal
  // line (container centre). offsetTop is transform-independent, so this is stable.
  useLayoutEffect(() => {
    if (mode !== "focus" || passive) {
      setTranslateY(0);
      return;
    }
    const container = containerRef.current;
    const el = entryEls.current[active];
    if (!container || !el) return;
    const focal = container.clientHeight / 2;
    const center = el.offsetTop + el.offsetHeight / 2;
    setTranslateY(focal - center);
  }, [active, mode, passive, capture, count, reduced, isTouch]);

  // Wheel capture (opt-in, desktop, motion-ok). One gesture = one step, locked
  // during the transition. Releases immediately past either boundary.
  useEffect(() => {
    if (!capture || passive) return;
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (modeRef.current !== "focus") return;
      const dir = Math.sign(e.deltaY);
      if (dir === 0) return;
      const next = activeRef.current + dir;

      // Boundary: let the gesture pass through to the page, drop focus.
      if (next < 0 || next >= count) {
        exitFocus();
        return; // do NOT preventDefault — page scrolls naturally
      }
      e.preventDefault();
      if (performance.now() < lockUntil.current) return;
      lockUntil.current = performance.now() + STEP_LOCK_MS;
      setActive(next);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [capture, passive, count, exitFocus]);

  const move = useCallback(
    (dir: number) => {
      const next = Math.min(count - 1, Math.max(0, activeRef.current + dir));
      setActive(next);
      entryEls.current[next]?.focus();
    },
    [count]
  );

  const containerHandlers = {
    onPointerEnter: () => {
      // Cancel any pending leave timer so re-entering doesn't reset.
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
        leaveTimer.current = null;
      }
      if (!passive) enterFocus();
    },
    onPointerLeave: () => {
      if (!passive && focused === null) {
        // Wait 1 second before exiting — snaps back instantly once timer fires.
        leaveTimer.current = setTimeout(() => {
          exitFocus();
          setActive(0);
          leaveTimer.current = null;
        }, 1000);
      }
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        exitFocus();
        (document.activeElement as HTMLElement)?.blur();
      }
    },
  };

  const entryHandlers = (i: number) => ({
    tabIndex: 0,
    onPointerEnter: () => {
      // Debounce: only switch active after the mouse settles for 80ms.
      // This prevents jarring rapid-fire switches when sweeping across entries.
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      if (!passive) {
        hoverTimer.current = setTimeout(() => {
          setActive(i);
          hoverTimer.current = null;
        }, 80);
      }
    },
    onFocus: () => {
      setFocused(i);
      setActive(i);
      if (!passive) enterFocus();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        move(-1);
      }
    },
  });

  // Clear keyboard-focus state when focus leaves the timeline entirely.
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const c = containerRef.current;
      if (c && !c.contains(e.target as Node)) {
        setFocused(null);
        if (!passive) exitFocus();
      }
    };
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, [passive, exitFocus]);

  const getVisual = useCallback(
    (i: number): EntryVisual => {
      const keyboardFocused = focused === i;
      const isActive = i === active || keyboardFocused;

      // Resting = accessible baseline: everything equal, everything expanded.
      if (mode === "resting") {
        return { active: false, expanded: true, opacity: 1, blur: 0, scale: 1, elevated: false };
      }

      // Reduced motion: opacity only, no blur/scale/translate.
      if (reduced) {
        return {
          active: isActive,
          expanded: isActive,
          opacity: isActive ? 1 : 0.6,
          blur: 0,
          scale: 1,
          elevated: isActive,
        };
      }

      const dist = Math.abs(i - active);
      // Focused entries are never blurred (a11y).
      const blur = keyboardFocused || isTouch ? 0 : BLUR_STEPS[Math.min(dist, 3)];
      const opacity = isActive ? 1 : Math.max(0.35, 1 - dist * 0.22);
      const scale = isActive ? (isTouch ? 1.03 : 1.08) : 1;

      return { active: isActive, expanded: isActive, opacity, blur, scale, elevated: isActive };
    },
    [active, focused, mode, reduced, isTouch]
  );

  return {
    active,
    mode,
    translateY,
    reduced,
    passive,
    containerRef,
    trackRef,
    registerEntry,
    containerHandlers,
    entryHandlers,
    getVisual,
  };
}
