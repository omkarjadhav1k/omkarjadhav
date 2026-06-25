import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1Nu-Nt_u.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { F as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Lock, w as ArrowRight } from "../_libs/lucide-react.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DMDS2LHM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Auth() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const [msg, setMsg] = (0, import_react.useState)(null);
	async function onSubmit(e) {
		e.preventDefault();
		setErr(null);
		setMsg(null);
		setLoading(true);
		try {
			if (mode === "signin") {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				navigate({ to: "/admin" });
			} else {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: { emailRedirectTo: `${window.location.origin}/admin` }
				});
				if (error) throw error;
				setMsg("Account created. If your project requires email confirmation, check your inbox. Otherwise sign in now.");
				setMode("signin");
			}
		} catch (e) {
			setErr(e.message ?? "Something went wrong.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen grid lg:grid-cols-2 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden lg:flex relative overflow-hidden bg-foreground text-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 -left-20 h-96 w-96 bg-signal/40 blur-3xl rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative p-12 flex flex-col justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/",
						className: "font-display text-2xl",
						children: ["Omkar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-signal",
							children: "."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono-display text-xs uppercase tracking-widest text-background/60 mb-4",
							children: "Studio Console"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-5xl xl:text-6xl leading-[1.05]",
							children: ["Update your portfolio. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-signal",
								children: "In seconds."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-background/70 max-w-md",
							children: "Edit contact details, manage projects and keep everything fresh — without redeploying."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-background/40 font-mono-display",
						children: "Authorized access only."
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center p-6 sm:p-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .5 },
				onSubmit,
				className: "w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5 text-signal" }),
							" Admin ",
							mode === "signin" ? "Sign in" : "Sign up"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl tracking-tight",
						children: ["Welcome back", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-signal",
							children: "."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-2 text-sm",
						children: "Use your admin credentials to continue."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground mb-1.5 block",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true,
							type: "email",
							className: "w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:border-signal focus:ring-2 focus:ring-signal/20 transition"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground mb-1.5 block",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true,
							type: "password",
							minLength: 6,
							className: "w-full bg-background border border-border rounded-lg px-4 py-3 outline-none focus:border-signal focus:ring-2 focus:ring-signal/20 transition"
						})] })]
					}),
					err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-sm text-destructive",
						children: err
					}) : null,
					msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-sm text-foreground bg-signal-soft border border-signal/30 rounded-lg p-3",
						children: msg
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: loading,
						className: "mt-6 w-full inline-flex items-center justify-center gap-2 bg-foreground text-background rounded-full px-5 py-3.5 text-sm font-medium hover:bg-signal transition-colors disabled:opacity-60",
						children: [
							loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMode(mode === "signin" ? "signup" : "signin");
							setErr(null);
							setMsg(null);
						},
						className: "mt-4 text-sm text-muted-foreground hover:text-foreground w-full text-center",
						children: mode === "signin" ? "No account yet? Create one →" : "Already have an account? Sign in →"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-xs text-muted-foreground",
						children: [
							"First-time setup? Create your admin account, then run this in your project's database:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono-display bg-cream px-1.5 py-0.5 rounded",
								children: "INSERT INTO user_roles(user_id, role) VALUES (auth.uid(), 'admin')"
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { Auth as component };
