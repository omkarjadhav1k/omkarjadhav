import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-1Nu-Nt_u.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as useProjects, r as useSiteSettings, t as defaultSettings } from "./portfolio-data-jNp13DUr.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ArrowUpRight, D as CodeXml, E as Sparkles, S as Briefcase, _ as Download, a as Rocket, b as Cloud, g as Github, h as GraduationCap, l as MapPin, p as Linkedin, r as Smartphone, s as Phone, u as Mail, v as Database, x as Check, y as Cpu } from "../_libs/lucide-react.mjs";
import { i as AnimatePresence, n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as omkar_portrait_default } from "./omkar-portrait-DrM4uecD.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CKnlJ6i5.mjs";
import { a as IcosahedronGeometry, c as OctahedronGeometry, d as PointsMaterial, f as Scene, i as CanvasTexture, l as PerspectiveCamera, n as BufferAttribute, o as Mesh, p as TorusKnotGeometry, r as BufferGeometry, s as MeshBasicMaterial, t as WebGLRenderer, u as Points } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BV9f7D9C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
if (typeof process !== "undefined" && typeof process.loadEnvFile === "function") try {
	process.loadEnvFile();
} catch (e) {}
var sendContactEmailFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("ed2b1ee67756e5419ef921e73a3919bd00e9f16fc672b55175005116126c2d96"));
var ThreeCanvas = () => {
	const containerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!containerRef.current) return;
		const container = containerRef.current;
		const width = window.innerWidth;
		const height = window.innerHeight;
		const scene = new Scene();
		const camera = new PerspectiveCamera(60, width / height, .1, 100);
		camera.position.z = 20;
		const renderer = new WebGLRenderer({
			antialias: true,
			alpha: true
		});
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);
		const particleCount = 150;
		const particleGeometry = new BufferGeometry();
		const particlePositions = new Float32Array(particleCount * 3);
		for (let i = 0; i < particleCount; i++) {
			particlePositions[i * 3] = (Math.random() - .5) * 45;
			particlePositions[i * 3 + 1] = (Math.random() - .5) * 45;
			particlePositions[i * 3 + 2] = (Math.random() - .5) * 30;
		}
		particleGeometry.setAttribute("position", new BufferAttribute(particlePositions, 3));
		const pCanvas = document.createElement("canvas");
		pCanvas.width = 16;
		pCanvas.height = 16;
		const pCtx = pCanvas.getContext("2d");
		if (pCtx) {
			const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
			grad.addColorStop(0, "rgba(249, 115, 22, 0.6)");
			grad.addColorStop(.3, "rgba(249, 115, 22, 0.3)");
			grad.addColorStop(1, "rgba(249, 115, 22, 0)");
			pCtx.fillStyle = grad;
			pCtx.fillRect(0, 0, 16, 16);
		}
		const particleTexture = new CanvasTexture(pCanvas);
		const particleMaterial = new PointsMaterial({
			size: .35,
			map: particleTexture,
			transparent: true,
			blending: 2,
			depthWrite: false
		});
		const particles = new Points(particleGeometry, particleMaterial);
		scene.add(particles);
		const shape1Geo = new TorusKnotGeometry(2.5, .7, 100, 16);
		const shape1Mat = new MeshBasicMaterial({
			color: 16347926,
			wireframe: true,
			transparent: true,
			opacity: .14
		});
		const shape1 = new Mesh(shape1Geo, shape1Mat);
		shape1.position.set(7, 4, -5);
		scene.add(shape1);
		const shape2Geo = new OctahedronGeometry(2.2, 2);
		const shape2Mat = new MeshBasicMaterial({
			color: 889992,
			wireframe: true,
			transparent: true,
			opacity: .16
		});
		const shape2 = new Mesh(shape2Geo, shape2Mat);
		shape2.position.set(-8, -6, -2);
		scene.add(shape2);
		const shape3Geo = new IcosahedronGeometry(2.4, 1);
		const shape3Mat = new MeshBasicMaterial({
			color: 16347926,
			wireframe: true,
			transparent: true,
			opacity: .15
		});
		const shape3 = new Mesh(shape3Geo, shape3Mat);
		shape3.position.set(6, -18, -4);
		scene.add(shape3);
		const tracker = {
			mouseY: 0,
			mouseX: 0,
			targetMouseY: 0,
			targetMouseX: 0,
			scrollY: window.scrollY,
			targetScrollY: window.scrollY,
			scrollVelocity: 0
		};
		const handleMouseMove = (e) => {
			tracker.targetMouseX = (e.clientX / window.innerWidth - .5) * 5;
			tracker.targetMouseY = -(e.clientY / window.innerHeight - .5) * 5;
		};
		const handleScroll = () => {
			const newScrollY = window.scrollY;
			tracker.scrollVelocity = Math.abs(newScrollY - tracker.targetScrollY);
			tracker.targetScrollY = newScrollY;
		};
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("scroll", handleScroll);
		const handleResize = () => {
			const w = window.innerWidth;
			const h = window.innerHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};
		window.addEventListener("resize", handleResize);
		let animFrameId;
		const tick = () => {
			animFrameId = requestAnimationFrame(tick);
			tracker.mouseX += (tracker.targetMouseX - tracker.mouseX) * .05;
			tracker.mouseY += (tracker.targetMouseY - tracker.mouseY) * .05;
			tracker.scrollY += (tracker.targetScrollY - tracker.scrollY) * .06;
			tracker.scrollVelocity *= .95;
			camera.position.x = tracker.mouseX * .8;
			camera.position.y = tracker.mouseY * .8;
			camera.lookAt(0, 0, 0);
			shape1.position.y = 4 + tracker.scrollY * .015;
			shape2.position.y = -6 + tracker.scrollY * .012;
			shape3.position.y = -18 + tracker.scrollY * .014;
			const speedMult = 1 + tracker.scrollVelocity * .1;
			shape1.rotation.y += .003 * speedMult;
			shape1.rotation.x += .002 * speedMult;
			shape2.rotation.y += .004 * speedMult;
			shape2.rotation.z += .002 * speedMult;
			shape3.rotation.x += .003 * speedMult;
			shape3.rotation.y += .001 * speedMult;
			particles.rotation.y += 3e-4;
			particles.rotation.x += 1e-4;
			renderer.render(scene, camera);
		};
		tick();
		return () => {
			cancelAnimationFrame(animFrameId);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
			container.removeChild(renderer.domElement);
			shape1Geo.dispose();
			shape1Mat.dispose();
			shape2Geo.dispose();
			shape2Mat.dispose();
			shape3Geo.dispose();
			shape3Mat.dispose();
			particleGeometry.dispose();
			particleMaterial.dispose();
			particleTexture.dispose();
			renderer.dispose();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: "fixed inset-0 pointer-events-none -z-10 bg-transparent opacity-75"
	});
};
var ROLES = [
	"Full Stack Developer",
	"Flutter Developer",
	"AI Developer",
	"Computer Science Student",
	"Startup Builder",
	"UI/UX Enthusiast"
];
function Portfolio() {
	const { data: settings = defaultSettings, isLoading: settingsLoading } = useSiteSettings();
	const { data: projects = [], isLoading: projectsLoading } = useProjects();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreeCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { settings }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "popLayout",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { settings })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, { settings }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Founder, { settings }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skills, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, { projects }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, { settings }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Certifications, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, { settings }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { settings })
		]
	});
}
function Nav({ settings }) {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const on = () => setScrolled(window.scrollY > 20);
		on();
		window.addEventListener("scroll", on);
		return () => window.removeEventListener("scroll", on);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mx-auto max-w-6xl px-5 transition-all ${scrolled ? "bg-background/80 backdrop-blur-md border border-border rounded-full shadow-sm" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#top",
						onClick: (e) => {
							e.preventDefault();
							window.scrollTo({
								top: 0,
								behavior: "smooth"
							});
						},
						className: "flex items-center gap-2 group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-8 w-8 place-items-center rounded-full bg-signal text-primary-foreground font-display text-lg shrink-0",
							children: "O"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-lg leading-none",
							children: ["Omkar", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-signal",
								children: "."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden md:flex items-center gap-7 text-sm",
						children: [
							["About", "#about"],
							["Founder", "#founder"],
							["Skills", "#skills"],
							["Work", "#work"],
							["Services", "#services"],
							["Contact", "#contact"]
						].map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href,
							onClick: (e) => {
								e.preventDefault();
								document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
							},
							className: "text-muted-foreground hover:text-foreground transition-colors story-link",
							children: label
						}, href))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#contact",
						onClick: (e) => {
							e.preventDefault();
							document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
						},
						className: "hidden sm:inline-flex items-center gap-1.5 text-sm font-medium bg-foreground text-background rounded-full px-4 py-2 hover:bg-signal transition-colors",
						children: ["Hire me ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
					})
				]
			})
		})
	});
}
function Hero({ settings }) {
	const [idx, setIdx] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2200);
		return () => clearInterval(t);
	}, []);
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
	const blobY = useTransform(scrollYProgress, [0, 1], [0, -80]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		ref,
		className: "relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: { y: blobY },
				className: "absolute -right-32 top-24 h-[28rem] w-[28rem] bg-gradient-to-br from-signal via-signal/70 to-orange-300 blob-anim opacity-90 blur-2xl",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: { y: blobY },
				className: "absolute -left-20 -bottom-20 h-72 w-72 bg-signal-soft blob-anim opacity-70 blur-3xl",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-6xl px-5 grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					style: { y },
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 14
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .6 },
							className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground border border-border bg-card rounded-full px-3 py-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-signal animate-pulse" }), settings.availability]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-7 font-display text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.2rem] leading-[0.95] tracking-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
								initial: {
									opacity: 0,
									y: 24
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									delay: .05,
									duration: .7
								},
								className: "block",
								children: ["Hi, I'm ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-signal",
									children: settings.full_name.split(" ")[0]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
								initial: {
									opacity: 0,
									y: 24
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									delay: .15,
									duration: .7
								},
								className: "block",
								children: [settings.full_name.split(" ").slice(1).join(" "), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-signal",
									children: "."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center gap-2 text-base sm:text-lg text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono-display text-xs uppercase tracking-widest text-signal",
								children: "→ I'm a"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								initial: {
									y: 12,
									opacity: 0
								},
								animate: {
									y: 0,
									opacity: 1
								},
								exit: {
									y: -12,
									opacity: 0
								},
								transition: { duration: .4 },
								className: "font-medium text-foreground",
								children: ROLES[idx]
							}, ROLES[idx])]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: {
								delay: .35,
								duration: .8
							},
							className: "mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed",
							children: "I build high-quality websites, mobile apps, AI-powered software and digital products with a focus on performance, craft and solving real problems."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								delay: .5,
								duration: .6
							},
							className: "mt-9 flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#work",
									onClick: (e) => {
										e.preventDefault();
										document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
									},
									className: "inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-3 text-sm font-medium hover:bg-signal transition-colors signal-glow",
									children: ["View Projects ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#contact",
									onClick: (e) => {
										e.preventDefault();
										document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
									},
									className: "inline-flex items-center gap-2 border border-foreground rounded-full px-5 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors",
									children: "Hire Me"
								}),
								settings.resume_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: settings.resume_url,
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Resume"]
								}) : null
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					layoutId: "developer-portrait-container",
					className: "relative mx-auto w-full max-w-sm float-y",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							layoutId: "developer-portrait",
							transition: {
								duration: .8,
								ease: [
									.16,
									1,
									.3,
									1
								]
							},
							className: "relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-cream signal-glow border border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: omkar_portrait_default,
									alt: `Portrait of ${settings.full_name}`,
									className: "h-full w-full object-cover",
									width: 896,
									height: 1216
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-4 left-4 right-4 flex items-center justify-between text-primary-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono-display text-[10px] uppercase tracking-widest opacity-90",
										children: "est. 2024"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono-display text-[10px] uppercase tracking-widest opacity-90",
										children: settings.brand
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							layoutId: "bytech-badge",
							transition: {
								duration: .8,
								ease: [
									.16,
									1,
									.3,
									1
								]
							},
							className: "absolute -bottom-5 -left-5 rotate-[-6deg] bg-signal text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium shadow-lg z-10 cursor-default select-none animate-pulse-slow",
							children: "Founder · ByTech"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -top-4 -right-4 rotate-[8deg] bg-card border border-border px-3 py-1.5 rounded-full text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "inline h-3 w-3 text-signal mr-1" }), " AI · Flutter · Web"]
						})
					]
				})]
			})
		]
	});
}
function Marquee() {
	const tech = [
		"Flutter",
		"React",
		"Next.js",
		"PHP",
		"Firebase",
		"MySQL",
		"PostgreSQL",
		"Java",
		"Kotlin",
		"Dart",
		"JavaScript",
		"TypeScript",
		"AI Agents",
		"Tailwind",
		"Figma",
		"Git",
		"REST APIs",
		"Cloud"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"aria-hidden": true,
		className: "border-y border-border bg-cream py-5 overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "marquee-track gap-10 px-5 font-display text-2xl sm:text-3xl text-muted-foreground/80",
			children: [...tech, ...tech].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-10",
				children: [t, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-signal" })]
			}, i))
		})
	});
}
function SectionLabel({ no, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono-display text-signal",
				children: no
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })
		]
	});
}
function Reveal({ children, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 28
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .7,
			delay
		},
		children
	});
}
function About({ settings }) {
	const info = [
		["Name", settings.full_name],
		["Brand", settings.brand],
		["Location", settings.location],
		["University", "Savitribai Phule Pune University"],
		["Languages", "English · Hindi · Marathi"],
		["Availability", settings.availability]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "relative py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				no: "01",
				label: "About"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight",
						children: [
							"A Computer Science student building software with",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-signal",
								children: "conviction"
							}),
							" — and a brand to match."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: settings.bio }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"I specialise in responsive websites, cross-platform mobile apps with Flutter, backend systems and AI-powered software. Beyond client work, I run",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: settings.brand_url,
								target: "_blank",
								rel: "noreferrer",
								className: "text-foreground font-medium underline decoration-signal underline-offset-4",
								children: settings.brand
							}),
							" ",
							"— a software studio shipping products for education, productivity and business automation."
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-wrap gap-2",
						children: [
							"Real-world problem solving",
							"AI & automation",
							"Full-stack craft",
							"Clean UI/UX",
							"Entrepreneurial mindset"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 text-sm border border-border bg-card rounded-full px-3 py-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-signal" }),
								" ",
								s
							]
						}, s))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-7 signal-glow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-11 w-11 place-items-center rounded-2xl bg-signal-soft text-signal",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-xl leading-none",
									children: "Personal Card"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground mt-1",
									children: "Quick facts"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
								className: "divide-y divide-border",
								children: info.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-4 py-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: k
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-medium text-right",
										children: v
									})]
								}, k))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 pt-5 border-t border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-widest text-muted-foreground mb-2",
									children: "Interests"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: [
										"AI",
										"Mobile",
										"Web",
										"Startups",
										"UI/UX",
										"Cloud",
										"Open Source"
									].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-mono-display text-foreground/80 bg-cream px-2 py-1 rounded-md",
										children: i
									}, i))
								})]
							})
						]
					})
				})]
			})]
		})
	});
}
function Founder({ settings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "founder",
		className: "relative py-24 md:py-32 bg-ink text-background overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-1/4 w-[35rem] h-[35rem] bg-signal/10 rounded-full blur-[100px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-5 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-background/60 mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono-display text-signal",
							children: "02"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-background/20" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Founder & Brand" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 bg-signal-soft/10 border border-signal/30 rounded-full px-3 py-1 text-signal text-xs font-semibold uppercase tracking-wider animate-pulse-slow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-signal" }), "Active Venture"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white",
								children: ["Founder of ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-linear-to-r from-signal to-orange-400 bg-clip-text text-transparent font-extrabold",
									children: settings.brand
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-base sm:text-lg text-background/85 leading-relaxed",
								children: [
									"Building innovative software products, cross-platform mobile apps, modern web platforms, and AI-powered automation tools. Under the brand ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white font-semibold",
										children: "ByTech"
									}),
									", my focus is on crafting scalable digital products that simplify operations, streamline education, and drive business productivity."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-background/60 leading-relaxed",
								children: "I lead the end-to-end design, implementation, and deployment of systems, ensuring high performance, clean architectures, and modern user experiences."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: settings.brand_url,
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-2 bg-signal text-white rounded-full px-6 py-3.5 text-sm font-semibold hover:bg-white hover:text-ink transition-all duration-300 shadow-[0_0_30px_rgba(240,61,29,0.35)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-0.5",
									children: ["Visit ByTech Portfolio ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4.5 w-4.5" })]
								})
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[2.5rem] border border-white/10 bg-white/5 p-8 sm:p-10 shadow-[0_0_50px_-12px_rgba(240,61,29,0.25)] backdrop-blur-md relative overflow-hidden flex flex-col justify-between min-h-[350px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-24 h-24 bg-signal/15 rounded-full blur-xl -mr-6 -mt-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl font-bold tracking-tight text-white pb-4 border-b border-white/10",
									children: "Core Operations"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-6",
									children: [
										{
											title: "Cross-Platform Mobile Apps",
											desc: "Crafting beautiful, native-performance Android and iOS builds with Flutter & Dart.",
											icon: Smartphone
										},
										{
											title: "Full-Stack Web Platforms",
											desc: "Deploying high-performance websites, backend dashboards, and responsive frontends.",
											icon: CodeXml
										},
										{
											title: "AI Agent Integrations",
											desc: "Automating workflows and implementing smart features powered by large language models.",
											icon: Cpu
										},
										{
											title: "Database Architecture",
											desc: "Designing structured relational databases and Firestore NoSQL environments.",
											icon: Database
										}
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-4 group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/5 border border-white/10 text-signal group-hover:bg-signal group-hover:text-white transition-colors duration-300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-5 w-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-bold text-sm sm:text-base text-white group-hover:text-signal transition-colors duration-300",
												children: item.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs sm:text-sm text-background/60 leading-relaxed",
												children: item.desc
											})]
										})]
									}, item.title))
								})]
							})]
						})
					})]
				})]
			})
		]
	});
}
function Skills() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "skills",
		className: "py-24 md:py-32 bg-cream/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					no: "03",
					label: "Skills"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-6 flex-wrap mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-2xl",
						children: [
							"Tools I use to ship ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-signal",
								children: "real products"
							}),
							"."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground max-w-sm",
						children: "From idea to deployment — across mobile, web, backend and AI."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
					children: [
						{
							icon: Smartphone,
							title: "Mobile",
							items: [
								"Flutter",
								"Android (Kotlin)",
								"Dart"
							]
						},
						{
							icon: CodeXml,
							title: "Web",
							items: [
								"HTML5",
								"CSS3",
								"JavaScript",
								"PHP",
								"React"
							]
						},
						{
							icon: Cpu,
							title: "Backend & AI",
							items: [
								"PHP",
								"REST APIs",
								"Firebase",
								"AI Agents"
							]
						},
						{
							icon: Database,
							title: "Database",
							items: [
								"MySQL",
								"Firestore",
								"PostgreSQL"
							]
						},
						{
							icon: Cloud,
							title: "Tools",
							items: [
								"Git",
								"GitHub",
								"Android Studio",
								"VS Code",
								"Figma",
								"cPanel"
							]
						},
						{
							icon: Sparkles,
							title: "Learning",
							items: [
								"Multi-Agent Systems",
								"Advanced Flutter",
								"Cloud",
								"Scalable Backends"
							]
						}
					].map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .05,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative rounded-2xl border border-border bg-background p-6 h-full hover:border-signal/50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-10 w-10 place-items-center rounded-xl bg-signal-soft text-signal group-hover:bg-signal group-hover:text-primary-foreground transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(g.icon, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-xl",
									children: g.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: g.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-mono-display text-foreground/80 bg-cream border border-border px-2.5 py-1 rounded-md",
									children: it
								}, it))
							})]
						})
					}, g.title))
				})
			]
		})
	});
}
function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					no: "04",
					label: "Services"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-[1fr_2fr] gap-12 mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight",
						children: [
							"What I help ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-signal",
								children: "clients"
							}),
							" build."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-muted-foreground max-w-xl lg:pt-4",
						children: "End-to-end product development — from a Figma sketch to a deployed app on the App Store, Play Store or Vercel."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border",
					children: [
						{
							t: "Mobile App Development",
							d: "Cross-platform mobile applications using Flutter — fast, responsive, production-ready."
						},
						{
							t: "Website Development",
							d: "Modern responsive websites built for performance, SEO and conversion."
						},
						{
							t: "Backend Development",
							d: "Secure backend systems with PHP, MySQL and Firebase. APIs that scale."
						},
						{
							t: "Firebase Integration",
							d: "Auth, Firestore, Cloud Storage and Push Notifications wired end-to-end."
						},
						{
							t: "Database Design",
							d: "Efficient relational and NoSQL data models, indexed and migration-safe."
						},
						{
							t: "AI Integration",
							d: "AI features and agents embedded directly into your product workflows."
						}
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i % 3 * .05,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative border-r border-b border-border p-7 bg-background hover:bg-cream/60 transition-colors h-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono-display text-xs text-signal mb-3",
									children: ["0", i + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl mb-3",
									children: s.t
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: s.d
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "absolute top-6 right-6 h-5 w-5 text-muted-foreground group-hover:text-signal group-hover:rotate-45 transition-all" })
							]
						})
					}, s.t))
				})
			]
		})
	});
}
function Projects({ projects }) {
	const featured = projects.filter((p) => p.status === "featured");
	const ongoing = projects.filter((p) => p.status === "ongoing");
	const future = projects.filter((p) => p.status === "future");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "work",
		className: "py-24 md:py-32 bg-foreground text-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-background/60 mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono-display text-signal",
							children: "05"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-background/20" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Selected Work" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-6 flex-wrap mb-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl sm:text-5xl lg:text-7xl tracking-tight max-w-3xl",
						children: [
							"Projects that ship, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-signal",
								children: "solve"
							}),
							", and scale."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-background/60 max-w-xs text-sm",
						children: [
							"A selection from ",
							projects.length || "34",
							"+ shipped builds across mobile, web, AI and full-stack systems."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5",
					children: featured.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i % 3 * .05,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: `group relative rounded-2xl border border-background/10 bg-background/5 p-7 h-full hover:bg-background/10 transition-all ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-4 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-mono-display text-xs text-signal mb-2",
												children: ["FEATURED · 0", i + 1]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: `font-display tracking-tight ${i === 0 ? "text-4xl sm:text-5xl" : "text-3xl"}`,
												children: p.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-background/60 mt-1 text-sm",
												children: p.subtitle
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-background/20 group-hover:bg-signal group-hover:border-signal transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-background/70 leading-relaxed mb-5",
									children: p.description
								}),
								p.features?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "grid grid-cols-2 gap-1.5 mb-5",
									children: p.features.slice(0, i === 0 ? 8 : 4).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-1.5 text-xs text-background/70",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-signal mt-0.5",
												children: "•"
											}),
											" ",
											f
										]
									}, f))
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5 pt-4 border-t border-background/10",
									children: p.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-mono-display text-background/80 bg-background/10 px-2 py-1 rounded",
										children: t
									}, t))
								})
							]
						})
					}, p.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-10 mt-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-4 w-4 text-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono-display text-xs uppercase tracking-widest text-background/60",
							children: "In Progress"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: ongoing.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4 p-5 rounded-xl border border-background/10 hover:border-signal/50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-xl",
								children: p.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-background/60 mt-1",
								children: p.description
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-signal animate-pulse mt-2 shrink-0" })]
						}, p.id))
					})] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono-display text-xs uppercase tracking-widest text-background/60",
								children: "Coming Soon"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: future.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 rounded-xl border border-background/10 hover:border-signal/50 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-xl",
										children: p.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono-display uppercase tracking-widest text-signal border border-signal/40 px-2 py-0.5 rounded-full",
										children: "Planned"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-background/60",
									children: p.description
								})]
							}, p.id))
						})] })
					})]
				})
			]
		})
	});
}
function Stats({ settings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20 border-y border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-5 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-5",
			children: [
				{
					v: `${settings.projects_completed}+`,
					l: "Projects Completed"
				},
				{
					v: `${settings.active_projects}+`,
					l: "Active Projects"
				},
				{
					v: "3+",
					l: "Years Coding"
				},
				{
					v: "1",
					l: "Software Brand · ByTech"
				}
			].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .05,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight",
					children: [s.v.slice(0, -1), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-signal",
						children: s.v.slice(-1)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground mt-2",
					children: s.l
				})] })
			}, s.l))
		})
	});
}
function Certifications() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				no: "06",
				label: "Certifications & Experience"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[1fr_1.2fr] gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-4xl sm:text-5xl tracking-tight",
					children: [
						"Always ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-signal",
							children: "learning"
						}),
						", always shipping."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 p-6 rounded-2xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-11 w-11 place-items-center rounded-2xl bg-signal text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-xl",
							children: "Founder"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: "ByTech Softwares · Present"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground leading-relaxed",
						children: "Building innovative software products, mobile apps, websites, AI-powered tools and digital solutions for clients across India."
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid sm:grid-cols-2 gap-3",
						children: [
							"Google AI Agent Development",
							"Flutter Development",
							"Firebase Development",
							"Google Cloud",
							"AWS Fundamentals",
							"Git & GitHub",
							"Android Development"
						].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3 p-4 rounded-xl border border-border bg-background hover:border-signal/50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-signal mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: c
							})]
						}, c))
					})
				})]
			})]
		})
	});
}
function Contact({ settings }) {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		subject: "",
		message: "",
		website: ""
	});
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [sentAt, setSentAt] = (0, import_react.useState)(0);
	const startedAt = (0, import_react.useRef)(Date.now());
	async function handleSubmit(e) {
		e.preventDefault();
		if (submitting) return;
		if (form.website.trim()) return;
		if (Date.now() - startedAt.current < 2500) {
			toast.error("Please take a moment to fill the form.");
			return;
		}
		if (Date.now() - sentAt < 3e4) {
			toast.error("Please wait a moment before sending again.");
			return;
		}
		const schema = {
			name: form.name.trim(),
			email: form.email.trim(),
			subject: form.subject.trim(),
			message: form.message.trim()
		};
		if (schema.name.length < 2 || schema.name.length > 100) return toast.error("Enter a valid name.");
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(schema.email) || schema.email.length > 255) return toast.error("Enter a valid email.");
		if (schema.message.length < 10 || schema.message.length > 2e3) return toast.error("Message must be 10–2000 characters.");
		if (schema.subject.length > 200) return toast.error("Subject is too long.");
		setSubmitting(true);
		const { error } = await supabase.from("contact_messages").insert(schema);
		if (error) {
			setSubmitting(false);
			toast.error("Could not send. Please try again.");
			return;
		}
		try {
			await sendContactEmailFn({ data: {
				name: schema.name,
				email: schema.email,
				subject: schema.subject,
				message: schema.message,
				recipientEmail: settings.email
			} });
		} catch (emailErr) {
			console.error("Failed to send email notification:", emailErr);
		}
		setSubmitting(false);
		setSentAt(Date.now());
		setForm({
			name: "",
			email: "",
			subject: "",
			message: "",
			website: ""
		});
		toast.success("Message sent! I'll reply within 24 hours.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "contact",
		className: "relative py-24 md:py-32 bg-cream overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute -top-32 right-0 h-96 w-96 bg-signal/30 blur-3xl rounded-full",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-6xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				no: "07",
				label: "Let's work together"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[1.1fr_1fr] gap-14 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight",
						children: ["Have a project in mind? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-signal",
							children: "Let's talk."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-lg text-muted-foreground max-w-xl",
						children: [
							"I'm currently ",
							settings.availability.toLowerCase(),
							". Send a message — I reply within 24 hours."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialRow, {
								icon: Mail,
								label: "Email",
								value: settings.email,
								href: `mailto:${settings.email}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialRow, {
								icon: Phone,
								label: "Phone",
								value: settings.phone,
								href: `tel:${settings.phone}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialRow, {
								icon: Github,
								label: "GitHub",
								value: "@omkarjadhav1k",
								href: settings.github_url
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialRow, {
								icon: Linkedin,
								label: "LinkedIn",
								value: "omkarjadhav1k",
								href: settings.linkedin_url
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialRow, {
								icon: MapPin,
								label: "Based in",
								value: settings.location
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "rounded-3xl border border-border bg-background p-7 signal-glow space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-muted-foreground",
								children: "Send a message"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								tabIndex: -1,
								autoComplete: "off",
								value: form.website,
								onChange: (e) => setForm({
									...form,
									website: e.target.value
								}),
								className: "absolute left-[-9999px] h-0 w-0 opacity-0",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Your name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									maxLength: 100,
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									type: "email",
									maxLength: 255,
									value: form.email,
									onChange: (e) => setForm({
										...form,
										email: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Subject",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									maxLength: 200,
									value: form.subject,
									onChange: (e) => setForm({
										...form,
										subject: e.target.value
									}),
									placeholder: "Project, collaboration, hire…",
									className: "w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Message",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									required: true,
									rows: 5,
									maxLength: 2e3,
									value: form.message,
									onChange: (e) => setForm({
										...form,
										message: e.target.value
									}),
									className: "w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal resize-none"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: submitting,
								className: "inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3.5 text-sm font-medium hover:bg-signal transition-colors signal-glow disabled:opacity-60",
								children: submitting ? "Sending…" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Send message ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Protected by spam filtering. Your details are never shared."
							})
						]
					})
				})]
			})]
		})]
	});
}
function FormField({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium text-muted-foreground mb-1.5 block",
			children: label
		}), children]
	});
}
function SocialRow({ icon: Icon, label, value, href }) {
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 py-3 border-b border-border last:border-0 group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cream group-hover:bg-signal group-hover:text-primary-foreground transition-colors",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium truncate",
					children: value
				})]
			})]
		}), href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-signal shrink-0" }) : null]
	});
	if (!href) return inner;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		children: inner
	});
}
function Footer({ settings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "py-10 border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					"aria-label": "Admin",
					title: "",
					className: "select-none cursor-default",
					children: "©"
				}),
				" ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" ",
				settings.full_name,
				" · ",
				settings.brand
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: settings.github_url,
						target: "_blank",
						rel: "noreferrer",
						className: "hover:text-foreground",
						children: "GitHub"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: settings.linkedin_url,
						target: "_blank",
						rel: "noreferrer",
						className: "hover:text-foreground",
						children: "LinkedIn"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: settings.brand_url,
						target: "_blank",
						rel: "noreferrer",
						className: "hover:text-foreground",
						children: "ByTech"
					})
				]
			})]
		})
	});
}
//#endregion
export { Portfolio as component };
