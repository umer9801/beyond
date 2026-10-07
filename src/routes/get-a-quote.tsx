import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Car, Home, Building2 } from "lucide-react";
import { PageHero } from "@/components/site/Chrome";
import { Field, SuccessMark, inputCls } from "@/components/site/Field";
import { SERVICE_OPTIONS, type Category } from "@/components/site/brand";
import { seo } from "@/components/site/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/get-a-quote")({
  head: () => seo("Get a Quote — Redline Clean", "Tell us what needs cleaning and we'll help you find the right service. Fast, five-step quote request."),
  component: Quote,
});

const STEP_NAMES = ["Category", "Service", "Details", "Contact", "Review"];
const ICONS = { Auto: Car, Home: Home, Business: Building2 };

type Data = { category?: Category; services?: string; name?: string; email?: string; phone?: string; address?: string; date?: string; time?: string; info?: string; size?: string; condition?: string; extra?: string };
type K = Exclude<keyof Data, "category">;

function Quote() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>({});
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const set = (k: K, v: string) => setD((p) => ({ ...p, [k]: v }));
  const selected = d.services ? d.services.split("|") : [];

  function next() {
    if (step === 0 && !d.category) return setErr("Choose a category to continue");
    if (step === 1 && !selected.length) return setErr("Pick at least one service");
    if (step === 3 && (!d.name?.trim() || !/^\S+@\S+\.\S+$/.test(d.email || ""))) return setErr("Name and a valid email are required");
    setErr("");
    if (step === 4) return setDone(true);
    setStep(step + 1);
  }

  if (done)
    return (
      <section className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-32 pb-20 animate-fade-up">
        <SuccessMark />
        <h1 className="display mt-10 text-5xl md:text-7xl">Quote requested.</h1>
        <p className="mt-6 max-w-md text-lg text-muted-foreground">Thanks, {d.name}. We'll review your {d.category?.toLowerCase()} request and get back to you soon.</p>
        <Link to="/" className="mt-10 font-semibold text-primary">Back to home</Link>
      </section>
    );

  return (
    <>
      <PageHero eyebrow="Get a quote" title={<>Get your<br /><span className="text-primary">quote.</span></>} intro="Tell us what needs cleaning and we'll help you find the right service." />
      <section className="container-x pb-32">
        {/* progress */}
        <ol className="flex items-center gap-2 md:gap-4">
          {STEP_NAMES.map((n, i) => (
            <li key={n} className="flex flex-1 items-center gap-2 md:gap-4">
              <span className={cn("text-sm font-bold tabular-nums transition-colors", i <= step ? "text-primary" : "text-muted-foreground/50")}>{String(i + 1).padStart(2, "0")}</span>
              <span className="hidden text-xs font-semibold uppercase tracking-widest text-muted-foreground lg:inline">{n}</span>
              <span className="relative h-0.5 flex-1 overflow-hidden rounded bg-border">
                <span className="absolute inset-0 origin-left bg-primary transition-transform duration-700" style={{ transform: `scaleX(${i < step ? 1 : 0})` }} />
              </span>
            </li>
          ))}
        </ol>

        <div key={step} className="mt-14 min-h-[360px] animate-fade-up">
          {step === 0 && (
            <>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">What do you need cleaned?</h2>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {(Object.keys(SERVICE_OPTIONS) as Category[]).map((c) => {
                  const I = ICONS[c];
                  const on = d.category === c;
                  return (
                    <button key={c} onClick={() => { setD((p) => ({ ...p, category: c, services: "" })); setErr(""); }}
                      className={cn("group flex items-center justify-between rounded-2xl border p-8 text-left transition-all", on ? "border-primary bg-primary-soft" : "border-border hover:border-foreground/30 hover:shadow-soft")}>
                      <span className="display text-4xl">{c}</span>
                      <I className={cn("h-7 w-7 transition-colors", on ? "text-primary" : "text-muted-foreground")} />
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {step === 1 && d.category && (
            <>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Choose your {d.category.toLowerCase()} services</h2>
              <div className="mt-10 flex flex-wrap gap-3">
                {SERVICE_OPTIONS[d.category].map((s) => {
                  const on = selected.includes(s);
                  return (
                    <button key={s} onClick={() => set("services", (on ? selected.filter((x) => x !== s) : [...selected, s]).join("|"))}
                      className={cn("rounded-full border px-5 py-3 text-sm font-semibold transition-all", on ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground/40")}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {step === 2 && (
            <div className="grid gap-x-5 md:grid-cols-2">
              <h2 className="md:col-span-2 mb-8 text-3xl md:text-4xl font-extrabold tracking-tight">Tell us about the job</h2>
              <Field label={d.category === "Auto" ? "Vehicle (make / model)" : "Property type"}><input value={d.info || ""} onChange={(e) => set("info", e.target.value)} className={inputCls} /></Field>
              <Field label="Size"><select value={d.size || ""} onChange={(e) => set("size", e.target.value)} className={inputCls}><option value="">Select</option><option>Small</option><option>Medium</option><option>Large</option></select></Field>
              <Field label="Current condition" className="md:col-span-2">
                <div className="flex flex-wrap gap-3">
                  {["Light", "Moderate", "Heavy"].map((c) => (
                    <button type="button" key={c} onClick={() => set("condition", c)} className={cn("rounded-full border px-5 py-2.5 text-sm font-semibold transition-all", d.condition === c ? "border-primary bg-primary-soft text-primary" : "border-border")}>{c}</button>
                  ))}
                </div>
              </Field>
              <Field label="Additional requirements" className="md:col-span-2"><textarea rows={4} value={d.extra || ""} onChange={(e) => set("extra", e.target.value)} className={inputCls} /></Field>
            </div>
          )}
          {step === 3 && (
            <div className="grid gap-x-5 md:grid-cols-2">
              <h2 className="md:col-span-2 mb-8 text-3xl md:text-4xl font-extrabold tracking-tight">Your details</h2>
              {([["name", "Name", "text"], ["email", "Email", "email"], ["phone", "Phone", "tel"], ["address", "Address", "text"], ["date", "Preferred date", "date"], ["time", "Preferred time", "time"]] as [K, string, string][]).map(([k, l, t]) => (
                <Field key={k} label={l}><input type={t} value={d[k] || ""} onChange={(e) => set(k, e.target.value)} className={inputCls} /></Field>
              ))}
            </div>
          )}
          {step === 4 && (
            <>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Review your request</h2>
              <dl className="mt-10 divide-y divide-border border-y border-border">
                {[["Category", d.category], ["Services", selected.join(", ")], ["Details", [d.info, d.size, d.condition].filter(Boolean).join(" · ")], ["Requirements", d.extra], ["Contact", [d.name, d.email, d.phone].filter(Boolean).join(" · ")], ["Address", d.address], ["When", [d.date, d.time].filter(Boolean).join(" at ")]].map(([k, v]) => (
                  <div key={k} className="grid gap-2 py-5 md:grid-cols-12">
                    <dt className="eyebrow md:col-span-3">{k}</dt>
                    <dd className="md:col-span-9 font-medium">{v || <span className="text-muted-foreground">—</span>}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>

        <p className={cn("mt-6 text-sm text-primary transition-opacity", err ? "opacity-100" : "opacity-0")}>{err || "\u00a0"}</p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-8">
          <button onClick={() => { setErr(""); setStep(Math.max(0, step - 1)); }} className={cn("inline-flex items-center gap-2 font-semibold transition-opacity", step === 0 && "pointer-events-none opacity-0")}>
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button onClick={next} className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition-all hover:bg-primary-deep hover:shadow-lift">
            {step === 4 ? "Request My Quote" : "Continue"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </>
  );
}
