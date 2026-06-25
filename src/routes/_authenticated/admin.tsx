import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Save, Trash2, LogOut, ArrowLeft, Pencil, X, Mail, Check, Inbox } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings, useProjects, type Project, type SiteSettings } from "@/lib/portfolio-data";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

function Admin() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: settings } = useSiteSettings();
  const { data: projects = [] } = useProjects();
  const [tab, setTab] = useState<"info" | "projects" | "messages">("info");

  const unreadQ = useQuery({
    queryKey: ["contact_unread"],
    queryFn: async () => {
      const { count } = await supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("read", false);
      return count ?? 0;
    },
  });

  const roleQ = useQuery({
    queryKey: ["my_role"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id);
      return (data ?? []).map((r: any) => r.role);
    },
  });
  const isAdmin = (roleQ.data ?? []).includes("admin");

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-cream/50">
      <header className="bg-background border-b border-border sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm">
              <ArrowLeft className="h-4 w-4" /> Site
            </Link>
            <div className="h-5 w-px bg-border" />
            <div className="font-display text-xl">Admin<span className="text-signal">.</span></div>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        {!isAdmin && (
          <div className="mb-6 rounded-xl border border-signal/40 bg-signal-soft p-4 text-sm">
            Your account isn't an admin yet. Open the Cloud SQL console and run:{" "}
            <code className="font-mono-display bg-background px-1.5 py-0.5 rounded">INSERT INTO user_roles(user_id, role) VALUES ('{(roleQ.data === null) ? "<your-user-id>" : "auth.uid()"}', 'admin');</code>{" "}
            Then refresh.
          </div>
        )}

        <div className="flex items-center gap-1 mb-8 p-1 bg-background rounded-full border border-border w-fit">
          {(["info", "projects", "messages"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`text-sm px-4 py-2 rounded-full transition inline-flex items-center gap-2 ${tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
              {t === "info" ? "Site Info" : t === "projects" ? "Projects" : <>Messages {(unreadQ.data ?? 0) > 0 && <span className="bg-signal text-primary-foreground text-[10px] rounded-full px-1.5 py-0.5">{unreadQ.data}</span>}</>}
            </button>
          ))}
        </div>

        {tab === "info" && settings && <SiteInfoForm settings={settings} disabled={!isAdmin} />}
        {tab === "projects" && <ProjectsManager projects={projects} disabled={!isAdmin} />}
        {tab === "messages" && <MessagesManager disabled={!isAdmin} />}
      </main>
    </div>
  );
}

/* ------------- MESSAGES ------------- */
function MessagesManager({ disabled }: { disabled: boolean }) {
  const qc = useQueryClient();
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["contact_messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  async function markRead(id: string, read: boolean) {
    await supabase.from("contact_messages").update({ read }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["contact_messages"] });
    qc.invalidateQueries({ queryKey: ["contact_unread"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["contact_messages"] });
    qc.invalidateQueries({ queryKey: ["contact_unread"] });
  }

  if (disabled) return <div className="rounded-2xl border border-border bg-background p-8 text-sm text-muted-foreground">Admin role required.</div>;
  if (isLoading) return <div className="rounded-2xl border border-border bg-background p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!messages.length) return (
    <div className="rounded-2xl border border-border bg-background p-12 text-center">
      <Inbox className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
      <p className="text-sm text-muted-foreground">No messages yet.</p>
    </div>
  );

  return (
    <div className="space-y-3">
      {messages.map((m: any) => (
        <div key={m.id} className={`rounded-2xl border p-5 bg-background ${m.read ? "border-border" : "border-signal/40 bg-signal-soft/40"}`}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{m.name}</span>
                <a href={`mailto:${m.email}`} className="text-sm text-signal hover:underline">{m.email}</a>
                {!m.read && <span className="text-[10px] uppercase tracking-wider bg-signal text-primary-foreground rounded-full px-2 py-0.5">New</span>}
              </div>
              {m.subject && <div className="text-sm font-medium mt-1">{m.subject}</div>}
              <div className="text-xs text-muted-foreground mt-1">{new Date(m.created_at).toLocaleString()}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => markRead(m.id, !m.read)} title={m.read ? "Mark unread" : "Mark read"}
                className="p-2 rounded-lg hover:bg-cream text-muted-foreground hover:text-foreground">
                <Check className="h-4 w-4" />
              </button>
              <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || "Your message")}`} title="Reply"
                className="p-2 rounded-lg hover:bg-cream text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4" />
              </a>
              <button onClick={() => remove(m.id)} title="Delete"
                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm whitespace-pre-wrap text-foreground/90">{m.message}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------- SITE INFO ------------- */
function SiteInfoForm({ settings, disabled }: { settings: SiteSettings; disabled: boolean }) {
  const qc = useQueryClient();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => setForm(settings), [settings]);

  function up<K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) { setForm((f) => ({ ...f, [k]: v })); }

  async function save() {
    setSaving(true); setMsg(null);
    const { id, ...patch } = form as any;
    const { error } = await supabase.from("site_settings").update(patch).eq("id", settings.id);
    setSaving(false);
    if (error) { setMsg("Error: " + error.message); return; }
    setMsg("Saved");
    qc.invalidateQueries({ queryKey: ["site_settings"] });
    setTimeout(() => setMsg(null), 2200);
  }

  const fields: [keyof SiteSettings, string, "input" | "textarea" | "number"][] = [
    ["full_name", "Full Name", "input"],
    ["title", "Professional Title", "input"],
    ["bio", "Short Bio", "textarea"],
    ["email", "Email", "input"],
    ["phone", "Phone", "input"],
    ["location", "Location", "input"],
    ["brand", "Brand", "input"],
    ["brand_url", "Brand URL", "input"],
    ["github_url", "GitHub URL", "input"],
    ["linkedin_url", "LinkedIn URL", "input"],
    ["instagram_url", "Instagram URL", "input"],
    ["resume_url", "Resume URL", "input"],
    ["availability", "Availability", "input"],
    ["projects_completed", "Projects Completed", "number"],
    ["active_projects", "Active Projects", "number"],
  ];

  return (
    <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl">Site Information</h2>
          <p className="text-sm text-muted-foreground">Edit your portfolio's public details.</p>
        </div>
        <button disabled={disabled || saving} onClick={save}
          className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-medium hover:bg-signal transition disabled:opacity-50">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
      {msg && <div className="mb-4 text-sm text-signal">{msg}</div>}
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map(([k, label, type]) => (
          <div key={k} className={type === "textarea" ? "sm:col-span-2" : ""}>
            <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
            {type === "textarea" ? (
              <textarea disabled={disabled} value={String(form[k] ?? "")} onChange={(e) => up(k, e.target.value as any)}
                rows={4}
                className="w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-signal focus:ring-2 focus:ring-signal/20 transition" />
            ) : (
              <input disabled={disabled}
                type={type === "number" ? "number" : "text"}
                value={String(form[k] ?? "")}
                onChange={(e) => up(k, (type === "number" ? Number(e.target.value) : e.target.value) as any)}
                className="w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-signal focus:ring-2 focus:ring-signal/20 transition" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------- PROJECTS ------------- */
const emptyProject: Omit<Project, "id"> = {
  title: "", subtitle: "", description: "", features: [], tags: [],
  status: "featured", link: "", display_order: 0,
};

function ProjectsManager({ projects, disabled }: { projects: Project[]; disabled: boolean }) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) alert(error.message);
    else qc.invalidateQueries({ queryKey: ["projects"] });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl">Projects</h2>
          <p className="text-sm text-muted-foreground">Manage what shows up in your portfolio.</p>
        </div>
        <button disabled={disabled} onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-medium hover:bg-signal transition disabled:opacity-50">
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {projects.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-background p-5 flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <div className="text-[10px] font-mono-display uppercase tracking-widest text-signal">{p.status}</div>
                <div className="font-display text-xl truncate">{p.title}</div>
                <div className="text-xs text-muted-foreground truncate">{p.subtitle}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button disabled={disabled} onClick={() => setEditing(p)} className="p-2 hover:bg-cream rounded-lg disabled:opacity-50"><Pencil className="h-4 w-4" /></button>
                <button disabled={disabled} onClick={() => remove(p.id)} className="p-2 hover:bg-cream rounded-lg text-destructive disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{p.description}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {p.tags.slice(0, 5).map((t) => (
                <span key={t} className="text-[10px] font-mono-display bg-cream border border-border px-1.5 py-0.5 rounded">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {(editing || creating) && (
        <ProjectModal
          initial={editing ?? { ...emptyProject, id: "" } as Project}
          isNew={creating}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSaved={() => { setEditing(null); setCreating(false); qc.invalidateQueries({ queryKey: ["projects"] }); }}
        />
      )}
    </div>
  );
}

function ProjectModal({ initial, isNew, onClose, onSaved }: { initial: Project; isNew: boolean; onClose: () => void; onSaved: () => void }) {
  const [p, setP] = useState<Project>(initial);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function up<K extends keyof Project>(k: K, v: Project[K]) { setP((x) => ({ ...x, [k]: v })); }

  async function save() {
    setSaving(true); setErr(null);
    const payload = {
      title: p.title, subtitle: p.subtitle, description: p.description,
      features: p.features, tags: p.tags, status: p.status, link: p.link,
      display_order: Number(p.display_order) || 0,
    };
    const { error } = isNew
      ? await supabase.from("projects").insert(payload)
      : await supabase.from("projects").update(payload).eq("id", p.id);
    setSaving(false);
    if (error) { setErr(error.message); return; }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
      <div className="bg-background rounded-2xl border border-border w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="font-display text-2xl">{isNew ? "New Project" : "Edit Project"}</div>
          <button onClick={onClose} className="p-2 hover:bg-cream rounded-lg"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          {err && <div className="text-sm text-destructive">{err}</div>}
          <Field label="Title"><input value={p.title} onChange={(e) => up("title", e.target.value)} className={inputCls} /></Field>
          <Field label="Subtitle"><input value={p.subtitle} onChange={(e) => up("subtitle", e.target.value)} className={inputCls} /></Field>
          <Field label="Description"><textarea rows={3} value={p.description} onChange={(e) => up("description", e.target.value)} className={inputCls} /></Field>
          <Field label="Features (one per line)">
            <textarea rows={4} value={p.features.join("\n")} onChange={(e) => up("features", e.target.value.split("\n").filter(Boolean))} className={inputCls} />
          </Field>
          <Field label="Tags (comma separated)">
            <input value={p.tags.join(", ")} onChange={(e) => up("tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className={inputCls} />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Status">
              <select value={p.status} onChange={(e) => up("status", e.target.value)} className={inputCls}>
                <option value="featured">Featured</option>
                <option value="ongoing">Ongoing</option>
                <option value="future">Future</option>
              </select>
            </Field>
            <Field label="Order"><input type="number" value={p.display_order} onChange={(e) => up("display_order", Number(e.target.value))} className={inputCls} /></Field>
            <Field label="Link"><input value={p.link} onChange={(e) => up("link", e.target.value)} className={inputCls} /></Field>
          </div>
        </div>
        <div className="p-5 border-t border-border flex items-center justify-end gap-2">
          <button onClick={onClose} className="text-sm px-4 py-2 rounded-full text-muted-foreground hover:text-foreground">Cancel</button>
          <button disabled={saving} onClick={save} className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-medium hover:bg-signal transition disabled:opacity-50">
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-signal focus:ring-2 focus:ring-signal/20 transition";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
