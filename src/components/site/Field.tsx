import { cn } from "@/lib/utils";

export const inputCls =
  "w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10";

export function Field({ label, error, children, className }: { label: string; error?: string | undefined; children: React.ReactNode; className?: string | undefined }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      {children}
      <span className={cn("mt-1.5 block text-xs text-primary transition-opacity", error ? "opacity-100" : "opacity-0")}>{error || "\u00a0"}</span>
    </label>
  );
}

export function SuccessMark() {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft animate-scale-in">
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" style={{ strokeDasharray: 24, strokeDashoffset: 0, animation: "fade-up .6s ease both .2s" }} />
      </svg>
    </div>
  );
}
