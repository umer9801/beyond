import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/Chrome";
import { Field, SuccessMark, inputCls } from "@/components/site/Field";
import { BRAND } from "@/components/site/brand";
import { seo } from "@/components/site/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact — Redline Clean", "Get in touch about auto, home or business cleaning. Phone, email and contact form."),
  component: Contact,
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const er: Record<string, string> = {};
    if (!String(f.get("name")).trim()) er["name"] = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(String(f.get("email")))) er["email"] = "Enter a valid email";
    if (String(f.get("message")).trim().length < 5) er["message"] = "Tell us a little more";
    setErrors(er);
    if (!Object.keys(er).length) setSent(true);
  }

  return (
    <>
      <PageHero eyebrow="Contact" title={<>Let's talk about<br />your next <span className="text-primary">clean.</span></>} />
      <section className="container-x grid gap-16 pb-32 md:grid-cols-12">
        <dl className="md:col-span-4 space-y-8">
          {[["Phone", BRAND.phone], ["Email", BRAND.email], ["Service area", BRAND.area], ["Hours", BRAND.hours]].map(([k, v]) => (
            <div key={k} className="border-t border-border pt-5">
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-2 text-xl font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="md:col-span-7 md:col-start-6 rounded-3xl border border-border bg-surface p-6 md:p-10 shadow-soft">
          {sent ? (
            <div className="flex min-h-[420px] flex-col items-start justify-center animate-fade-up">
              <SuccessMark />
              <h2 className="mt-8 text-4xl font-extrabold tracking-tight">Message received.</h2>
              <p className="mt-3 text-muted-foreground">Thanks for reaching out — we'll be in touch shortly.</p>
              <button onClick={() => setSent(false)} className="mt-8 text-sm font-semibold text-primary">Send another message</button>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="grid gap-x-5 md:grid-cols-2">
              <Field label="Full name" error={errors["name"]}><input name="name" className={inputCls} /></Field>
              <Field label="Email" error={errors["email"]}><input name="email" type="email" className={inputCls} /></Field>
              <Field label="Phone"><input name="phone" type="tel" className={inputCls} /></Field>
              <Field label="Service type">
                <select name="type" className={inputCls}><option>Auto</option><option>Home</option><option>Business</option><option>Not sure yet</option></select>
              </Field>
              <Field label="Preferred date" className="md:col-span-2"><input name="date" type="date" className={inputCls} /></Field>
              <Field label="Message" error={errors["message"]} className="md:col-span-2"><textarea name="message" rows={5} className={inputCls} /></Field>
              <button className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition-all hover:bg-primary-deep hover:shadow-lift">
                Send Message <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
