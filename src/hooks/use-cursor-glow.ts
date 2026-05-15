import { useEffect } from "react";

/**
 * Tracks the mouse globally and writes --cursor-x / --cursor-y on the
 * document root using requestAnimationFrame to avoid jank.
 * Disabled on coarse-pointer devices (touch).
 */
export const useCursorGlow = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let y = 0;
    let raf = 0;
    let pending = false;

    const root = document.documentElement;

    const flush = () => {
      pending = false;
      root.style.setProperty("--cursor-x", `${x}px`);
      root.style.setProperty("--cursor-y", `${y}px`);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(flush);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
};
