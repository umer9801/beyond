import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Draggable before/after reveal. "before" sits underneath; "after" is clipped from the left.
 * If `afterSrc` is omitted, the same image is used and the "before" gets a dirty filter.
 */
export function BeforeAfter({
  beforeSrc,
  afterSrc,
  alt,
  initial = 18,
  followMouse = false,
  labels = ["Before", "After"],
  className,
  imgClassName,
  width,
  height,
  priority,
}: {
  beforeSrc: string;
  afterSrc?: string;
  alt: string;
  initial?: number;
  followMouse?: boolean;
  labels?: [string, string];
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef(initial);
  const [pos, setPos] = useState(initial);
  const dragging = useRef(false);
  const raf = useRef<number>(0);

  // spring-ish easing toward target
  useEffect(() => {
    let current = initial;
    const tick = () => {
      current += (target.current - current) * 0.14;
      if (Math.abs(target.current - current) < 0.05) current = target.current;
      setPos(current);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [initial]);

  const setFromClient = useCallback((x: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    target.current = Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100));
  }, []);

  const same = !afterSrc;
  const dims = { width, height };

  return (
    <div
      ref={ref}
      className={cn("relative select-none overflow-hidden touch-pan-y", className)}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromClient(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current || (followMouse && e.pointerType === "mouse")) setFromClient(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      role="slider"
      aria-label={`${alt} comparison`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") target.current = Math.max(0, target.current - 5);
        if (e.key === "ArrowRight") target.current = Math.min(100, target.current + 5);
      }}
    >
      <img
        src={beforeSrc}
        alt={`${alt} before`}
        draggable={false}
        {...dims}
        loading={priority ? "eager" : "lazy"}
        className={cn("block h-full w-full object-cover", same && "dirty-filter", imgClassName)}
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={afterSrc ?? beforeSrc}
          alt={`${alt} after`}
          draggable={false}
          {...dims}
          loading={priority ? "eager" : "lazy"}
          className={cn("block h-full w-full object-cover", imgClassName)}
        />
      </div>
      {/* divider */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-background/90 shadow-lift" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-lift ring-1 ring-border">
          <span className="flex gap-1">
            <span className="h-3 w-0.5 rounded bg-primary" />
            <span className="h-3 w-0.5 rounded bg-primary" />
          </span>
        </div>
      </div>
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-foreground backdrop-blur" style={{ opacity: pos < 12 ? 0 : 1, transition: "opacity .3s" }}>
        {labels[1]}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-foreground/85 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-background backdrop-blur" style={{ opacity: pos > 88 ? 0 : 1, transition: "opacity .3s" }}>
        {labels[0]}
      </span>
    </div>
  );
}
