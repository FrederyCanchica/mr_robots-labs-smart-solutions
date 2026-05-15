import { useEffect, type RefObject } from "react";

/**
 * Applies a soft magnetic pull toward the cursor when within `radius` px.
 * Disabled on touch / reduced-motion.
 */
export const useMagneticEffect = <T extends HTMLElement>(
  ref: RefObject<T>,
  options: { strength?: number; radius?: number; maxX?: number; maxY?: number } = {},
) => {
  const { strength = 0.3, radius = 60, maxX = 8, maxY = 5 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      const trigger = Math.max(rect.width, rect.height) / 2 + radius;
      if (dist < trigger) {
        active = true;
        const tx = Math.max(-maxX, Math.min(maxX, dx * strength));
        const ty = Math.max(-maxY, Math.min(maxY, dy * strength));
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
          el.style.transition = "transform 120ms linear";
        });
      } else if (active) {
        active = false;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = "translate3d(0, 0, 0)";
          el.style.transition = "transform 500ms cubic-bezier(0.23, 1, 0.32, 1)";
        });
      }
    };

    const onLeave = () => {
      active = false;
      el.style.transform = "translate3d(0, 0, 0)";
      el.style.transition = "transform 500ms cubic-bezier(0.23, 1, 0.32, 1)";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [ref, strength, radius, maxX, maxY]);
};
