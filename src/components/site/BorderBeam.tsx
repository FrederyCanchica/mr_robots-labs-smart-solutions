/**
 * Decorative border beam — a light traveling along the perimeter of its
 * positioned parent. Parent must have `position: relative` and a matching
 * border-radius. Pointer-events disabled, purely visual.
 */
export const BorderBeam = ({ className = "" }: { className?: string }) => {
  return <span aria-hidden className={`border-beam ${className}`} />;
};
