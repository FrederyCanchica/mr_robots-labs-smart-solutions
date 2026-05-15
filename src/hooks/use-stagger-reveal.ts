import { useEffect, useRef } from "react";

/**
 * Reveals direct children of the container with a stagger as they enter
 * the viewport. Children should carry the `.reveal-item` class.
 * Default stagger: 80ms desktop, 40ms mobile.
 */
export const useStaggerReveal = <T extends HTMLElement = HTMLDivElement>(
  options: { stagger?: number; mobileStagger?: number } = {},
) => {
  const ref = useRef<T | null>(null);
  const { stagger = 80, mobileStagger = 40 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const step = isMobile ? mobileStagger : stagger;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          const items = entry.target.querySelectorAll<HTMLElement>(".reveal-item");
          items.forEach((item, i) => {
            item.style.transitionDelay = `${i * step}ms`;
            item.classList.add("in");
          });
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [stagger, mobileStagger]);

  return ref;
};
