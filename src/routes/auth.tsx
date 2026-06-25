import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin · Sign in" }, { name: "robots", content: "noindex" }] }),
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/admin" });
  },
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setMsg(null); setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setMsg("Account created. If your project requires email confirmation, check your inbox. Otherwise sign in now.");
        setMode("signin");
      }
    } catch (e: any) {
      setErr(e.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative overflow-hidden bg-foreground text-background">
        <div className="absolute -top-32 -left-20 h-96 w-96 bg-signal/40 blur-3xl rounded-full" />
        <div className="relative p-12 flex flex-col justify-between">
          <a href="/" className="font-display text-2xl">Omkar<span className="text-signal">.</span></a>
          <div>
            <div className="font-mono-display text-xs uppercase tracking-widest text-background/60 mb-4">Studio Console</div>
            <h1 className="font-display text-5xl xl:text-6xl leading-[1.05]">
              Update your portfolio. <span className="italic text-signal">In seconds.</span>
            </h1>
            <p className="mt-4 text-background/70 max-w-md">
              Edit contact details, manage projects and keep everything fresh — without redeploying.
            </p>
          </div>
          <div className="text-xs text-background/40 font-mono-display">Authorized access only.</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.form
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          onSubmit={onSubmit} className="w-full max-w-sm"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
            <Lock className="h-3.5 w-3.5 text-signal" /> Admin {mode === "signin" ? "Sign in" : "Sign up"}
          </div>
          <h2 className="font-display text-4xl tracking-tight">Welcome back<span className="text-signal">.</span></h2>
          <p className="text-muted-foreground mt-2 text-sm">Use your admin credentials to continue.</p>

          <div className="mt-7 space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:border-signal focus:ring-2 focus:ring-signal/20 transition" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" minLength={6}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:border-signal focus:ring-2 focus:ring-signal/20 transition" />
            </div>
          </div>

          {err ? <div className="mt-4 text-sm text-destructive">{err}</div> : null}
          {msg ? <div className="mt-4 text-sm text-foreground bg-signal-soft border border-signal/30 rounded-lg p-3">{msg}</div> : null}

          <button disabled={loading} className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-foreground text-background rounded-full px-5 py-3.5 text-sm font-medium hover:bg-signal transition-colors disabled:opacity-60">
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" />
          </button>

          <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setErr(null); setMsg(null); }}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground w-full text-center">
            {mode === "signin" ? "No account yet? Create one →" : "Already have an account? Sign in →"}
          </button>

          <p className="mt-8 text-xs text-muted-foreground">
            First-time setup? Create your admin account, then run this in your project's database:{" "}
            <code className="font-mono-display bg-cream px-1.5 py-0.5 rounded">INSERT INTO user_roles(user_id, role) VALUES (auth.uid(), 'admin')</code>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
