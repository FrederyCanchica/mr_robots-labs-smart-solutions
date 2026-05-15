import { useEffect, useRef } from "react";

/**
 * Reveals the container when it enters the viewport. If the container has
 * any `.reveal-item` descendants, they are staggered (80ms desktop / 40ms
 * mobile) for a natural, weighted entrance.
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;
    const step = isMobile ? 40 : 80;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          const items = (e.target as HTMLElement).querySelectorAll<HTMLElement>(
            ".reveal-item",
          );
          items.forEach((item, i) => {
            item.style.transitionDelay = `${i * step}ms`;
            item.classList.add("in");
          });
          io.unobserve(e.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
};
