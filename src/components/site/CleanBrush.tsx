import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Clean image underneath, dirty image painted on a canvas on top.
 * Moving the pointer over the car erases the dirt like a brush with sparkle effects.
 * Listens on window so overlapping text doesn't block the brush.
 */
export function CleanBrush({
  cleanSrc,
  dirtySrc,
  alt,
  width,
  height,
  className,
  brush = 70,
}: {
  cleanSrc: string;
  dirtySrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  brush?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sparkles, setSparkles] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = dirtySrc;
    let last: { x: number; y: number } | null = null;

    const paint = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(img, 0, 0, r.width, r.height);
      last = null;
    };
    
    img.onerror = () => {
      console.error("Failed to load dirty image:", dirtySrc);
    };
    
    img.onload = () => {
      paint();
    };

    const dab = (x: number, y: number, size: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, size);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.55, "rgba(0,0,0,0.85)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    };

    const addSparkle = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      const id = Date.now() + Math.random();
      setSparkles(prev => [...prev, { x, y, id }]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== id));
      }, 600);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < -brush || y < -brush || x > r.width + brush || y > r.height + brush) {
        last = null;
        return;
      }
      const size = (brush * r.width) / 1000;
      ctx.globalCompositeOperation = "destination-out";
      if (last) {
        const dx = x - last.x, dy = y - last.y;
        const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / (size / 4)));
        for (let i = 1; i <= steps; i++) dab(last.x + (dx * i) / steps, last.y + (dy * i) / steps, size);
        
        // Add sparkle effect occasionally
        if (Math.random() > 0.7) {
          addSparkle(e.clientX, e.clientY);
        }
      } else dab(x, y, size);
      last = { x, y };
    };
    
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      last = { x, y };
      const size = (brush * r.width) / 1000;
      ctx.globalCompositeOperation = "destination-out";
      dab(x, y, size);
      addSparkle(e.clientX, e.clientY);
    };
    
    const onLeave = () => (last = null);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", paint);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", paint);
    };
  }, [dirtySrc, brush]);

  return (
    <div className={cn("relative select-none", className)} style={{ aspectRatio: `${width} / ${height}` }}>
      <img src={cleanSrc} alt={alt} width={width} height={height} draggable={false} className="absolute inset-0 h-full w-full object-contain" />
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      
      {/* Sparkle Effects */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: '8px',
            height: '8px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-2 h-2 bg-primary rounded-full opacity-75" />
        </div>
      ))}
    </div>
  );
}
