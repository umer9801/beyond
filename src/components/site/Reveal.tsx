import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "reveal",
}: {
  children?: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  variant?: "reveal" | "clip-reveal" | "red-line";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={cn(variant, className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
