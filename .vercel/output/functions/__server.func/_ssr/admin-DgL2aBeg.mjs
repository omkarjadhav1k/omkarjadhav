import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1Nu-Nt_u.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { n as useProjects, r as useSiteSettings } from "./portfolio-data-jNp13DUr.mjs";
import { F as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as ArrowLeft, c as Pencil, d as LogOut, i as Save, m as Inbox, n as Trash2, o as Plus, t as X, u as Mail, x as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DgL2aBeg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Admin() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const { data: settings } = useSiteSettings();
	const { data: projects = [] } = useProjects();
	const [tab, setTab] = (0, import_react.useState)("info");
	const unreadQ = useQuery({
		queryKey: ["contact_unread"],
		queryFn: async () => {
			const { count } = await supabase.from("contact_messages").select("id", {
				count: "exact",
				head: true
			}).eq("read", false);
			return count ?? 0;
		}
	});
	const roleQ = useQuery({
		queryKey: ["my_role"],
		queryFn: async () => {
			const { data: u } = await supabase.auth.getUser();
			if (!u.user) return null;
			const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id);
			return (data ?? []).map((r) => r.role);
		}
	});
	const isAdmin = (roleQ.data ?? []).includes("admin");
	async function signOut() {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-cream/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "bg-background border-b border-border sticky top-0 z-30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-5 h-16 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Site"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-px bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-display text-xl",
							children: ["Admin", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-signal",
								children: "."
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: signOut,
					className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-5 py-10",
			children: [
				!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 rounded-xl border border-signal/40 bg-signal-soft p-4 text-sm",
					children: [
						"Your account isn't an admin yet. Open the Cloud SQL console and run:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
							className: "font-mono-display bg-background px-1.5 py-0.5 rounded",
							children: [
								"INSERT INTO user_roles(user_id, role) VALUES ('",
								roleQ.data === null ? "<your-user-id>" : "auth.uid()",
								"', 'admin');"
							]
						}),
						" ",
						"Then refresh."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1 mb-8 p-1 bg-background rounded-full border border-border w-fit",
					children: [
						"info",
						"projects",
						"messages"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setTab(t),
						className: `text-sm px-4 py-2 rounded-full transition inline-flex items-center gap-2 ${tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`,
						children: t === "info" ? "Site Info" : t === "projects" ? "Projects" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Messages ", (unreadQ.data ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-signal text-primary-foreground text-[10px] rounded-full px-1.5 py-0.5",
							children: unreadQ.data
						})] })
					}, t))
				}),
				tab === "info" && settings && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteInfoForm, {
					settings,
					disabled: !isAdmin
				}),
				tab === "projects" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsManager, {
					projects,
					disabled: !isAdmin
				}),
				tab === "messages" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesManager, { disabled: !isAdmin })
			]
		})]
	});
}
function MessagesManager({ disabled }) {
	const qc = useQueryClient();
	const { data: messages = [], isLoading } = useQuery({
		queryKey: ["contact_messages"],
		queryFn: async () => {
			const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	async function markRead(id, read) {
		await supabase.from("contact_messages").update({ read }).eq("id", id);
		qc.invalidateQueries({ queryKey: ["contact_messages"] });
		qc.invalidateQueries({ queryKey: ["contact_unread"] });
	}
	async function remove(id) {
		if (!confirm("Delete this message?")) return;
		await supabase.from("contact_messages").delete().eq("id", id);
		qc.invalidateQueries({ queryKey: ["contact_messages"] });
		qc.invalidateQueries({ queryKey: ["contact_unread"] });
	}
	if (disabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-border bg-background p-8 text-sm text-muted-foreground",
		children: "Admin role required."
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-border bg-background p-8 text-sm text-muted-foreground",
		children: "Loading…"
	});
	if (!messages.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-background p-12 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "h-10 w-10 mx-auto text-muted-foreground mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "No messages yet."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `rounded-2xl border p-5 bg-background ${m.read ? "border-border" : "border-signal/40 bg-signal-soft/40"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: m.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${m.email}`,
									className: "text-sm text-signal hover:underline",
									children: m.email
								}),
								!m.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase tracking-wider bg-signal text-primary-foreground rounded-full px-2 py-0.5",
									children: "New"
								})
							]
						}),
						m.subject && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium mt-1",
							children: m.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground mt-1",
							children: new Date(m.created_at).toLocaleString()
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => markRead(m.id, !m.read),
							title: m.read ? "Mark unread" : "Mark read",
							className: "p-2 rounded-lg hover:bg-cream text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || "Your message")}`,
							title: "Reply",
							className: "p-2 rounded-lg hover:bg-cream text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => remove(m.id),
							title: "Delete",
							className: "p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm whitespace-pre-wrap text-foreground/90",
				children: m.message
			})]
		}, m.id))
	});
}
function SiteInfoForm({ settings, disabled }) {
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(settings);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [msg, setMsg] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => setForm(settings), [settings]);
	function up(k, v) {
		setForm((f) => ({
			...f,
			[k]: v
		}));
	}
	async function save() {
		setSaving(true);
		setMsg(null);
		const { id, ...patch } = form;
		const { error } = await supabase.from("site_settings").update(patch).eq("id", settings.id);
		setSaving(false);
		if (error) {
			setMsg("Error: " + error.message);
			return;
		}
		setMsg("Saved");
		qc.invalidateQueries({ queryKey: ["site_settings"] });
		setTimeout(() => setMsg(null), 2200);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-background p-6 sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-6 flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Site Information"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Edit your portfolio's public details."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					disabled: disabled || saving,
					onClick: save,
					className: "inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-medium hover:bg-signal transition disabled:opacity-50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
						" ",
						saving ? "Saving…" : "Save changes"
					]
				})]
			}),
			msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 text-sm text-signal",
				children: msg
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 gap-4",
				children: [
					[
						"full_name",
						"Full Name",
						"input"
					],
					[
						"title",
						"Professional Title",
						"input"
					],
					[
						"bio",
						"Short Bio",
						"textarea"
					],
					[
						"email",
						"Email",
						"input"
					],
					[
						"phone",
						"Phone",
						"input"
					],
					[
						"location",
						"Location",
						"input"
					],
					[
						"brand",
						"Brand",
						"input"
					],
					[
						"brand_url",
						"Brand URL",
						"input"
					],
					[
						"github_url",
						"GitHub URL",
						"input"
					],
					[
						"linkedin_url",
						"LinkedIn URL",
						"input"
					],
					[
						"instagram_url",
						"Instagram URL",
						"input"
					],
					[
						"resume_url",
						"Resume URL",
						"input"
					],
					[
						"availability",
						"Availability",
						"input"
					],
					[
						"projects_completed",
						"Projects Completed",
						"number"
					],
					[
						"active_projects",
						"Active Projects",
						"number"
					]
				].map(([k, label, type]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: type === "textarea" ? "sm:col-span-2" : "",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs text-muted-foreground mb-1.5 block",
						children: label
					}), type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						disabled,
						value: String(form[k] ?? ""),
						onChange: (e) => up(k, e.target.value),
						rows: 4,
						className: "w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-signal focus:ring-2 focus:ring-signal/20 transition"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						disabled,
						type: type === "number" ? "number" : "text",
						value: String(form[k] ?? ""),
						onChange: (e) => up(k, type === "number" ? Number(e.target.value) : e.target.value),
						className: "w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-signal focus:ring-2 focus:ring-signal/20 transition"
					})]
				}, k))
			})
		]
	});
}
var emptyProject = {
	title: "",
	subtitle: "",
	description: "",
	features: [],
	tags: [],
	status: "featured",
	link: "",
	display_order: 0
};
function ProjectsManager({ projects, disabled }) {
	const qc = useQueryClient();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	async function remove(id) {
		if (!confirm("Delete this project?")) return;
		const { error } = await supabase.from("projects").delete().eq("id", id);
		if (error) alert(error.message);
		else qc.invalidateQueries({ queryKey: ["projects"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Projects"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Manage what shows up in your portfolio."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				disabled,
				onClick: () => setCreating(true),
				className: "inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-medium hover:bg-signal transition disabled:opacity-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New Project"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid md:grid-cols-2 gap-3",
			children: projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-background p-5 flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-mono-display uppercase tracking-widest text-signal",
									children: p.status
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-xl truncate",
									children: p.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground truncate",
									children: p.subtitle
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled,
								onClick: () => setEditing(p),
								className: "p-2 hover:bg-cream rounded-lg disabled:opacity-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled,
								onClick: () => remove(p.id),
								className: "p-2 hover:bg-cream rounded-lg text-destructive disabled:opacity-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground line-clamp-2 mt-1",
						children: p.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1 mt-3",
						children: p.tags.slice(0, 5).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-mono-display bg-cream border border-border px-1.5 py-0.5 rounded",
							children: t
						}, t))
					})
				]
			}, p.id))
		}),
		(editing || creating) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectModal, {
			initial: editing ?? {
				...emptyProject,
				id: ""
			},
			isNew: creating,
			onClose: () => {
				setEditing(null);
				setCreating(false);
			},
			onSaved: () => {
				setEditing(null);
				setCreating(false);
				qc.invalidateQueries({ queryKey: ["projects"] });
			}
		})
	] });
}
function ProjectModal({ initial, isNew, onClose, onSaved }) {
	const [p, setP] = (0, import_react.useState)(initial);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	function up(k, v) {
		setP((x) => ({
			...x,
			[k]: v
		}));
	}
	async function save() {
		setSaving(true);
		setErr(null);
		const payload = {
			title: p.title,
			subtitle: p.subtitle,
			description: p.description,
			features: p.features,
			tags: p.tags,
			status: p.status,
			link: p.link,
			display_order: Number(p.display_order) || 0
		};
		const { error } = isNew ? await supabase.from("projects").insert(payload) : await supabase.from("projects").update(payload).eq("id", p.id);
		setSaving(false);
		if (error) {
			setErr(error.message);
			return;
		}
		onSaved();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-background rounded-2xl border border-border w-full max-w-2xl my-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-5 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl",
						children: isNew ? "New Project" : "Edit Project"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "p-2 hover:bg-cream rounded-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 space-y-4",
					children: [
						err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-destructive",
							children: err
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: p.title,
								onChange: (e) => up("title", e.target.value),
								className: inputCls
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Subtitle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: p.subtitle,
								onChange: (e) => up("subtitle", e.target.value),
								className: inputCls
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Description",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: p.description,
								onChange: (e) => up("description", e.target.value),
								className: inputCls
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Features (one per line)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 4,
								value: p.features.join("\n"),
								onChange: (e) => up("features", e.target.value.split("\n").filter(Boolean)),
								className: inputCls
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tags (comma separated)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: p.tags.join(", "),
								onChange: (e) => up("tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean)),
								className: inputCls
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Status",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: p.status,
										onChange: (e) => up("status", e.target.value),
										className: inputCls,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "featured",
												children: "Featured"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ongoing",
												children: "Ongoing"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "future",
												children: "Future"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Order",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: p.display_order,
										onChange: (e) => up("display_order", Number(e.target.value)),
										className: inputCls
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Link",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: p.link,
										onChange: (e) => up("link", e.target.value),
										className: inputCls
									})
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 border-t border-border flex items-center justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "text-sm px-4 py-2 rounded-full text-muted-foreground hover:text-foreground",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: saving,
						onClick: save,
						className: "inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-2.5 text-sm font-medium hover:bg-signal transition disabled:opacity-50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
							" ",
							saving ? "Saving…" : "Save"
						]
					})]
				})
			]
		})
	});
}
var inputCls = "w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-signal focus:ring-2 focus:ring-signal/20 transition";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "text-xs text-muted-foreground mb-1.5 block",
		children: label
	}), children] });
}
//#endregion
export { Admin as component };
