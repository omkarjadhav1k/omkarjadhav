import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, Mail, Phone, MapPin, Github, Linkedin, Instagram,
  Download, Sparkles, Code2, Smartphone, Database, Cpu, Cloud,
  GraduationCap, Briefcase, Rocket, Check, ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import portrait from "@/assets/omkar-portrait.jpg";
import { useSiteSettings, useProjects, defaultSettings, type Project } from "@/lib/portfolio-data";
import { sendContactEmailFn } from "@/lib/email-server";
import { ThreeCanvas } from "@/components/ThreeCanvas";

export const Route = createFileRoute("/")({
  head: () => {
    // Resolve absolute URL for OpenGraph and Twitter images
    const ogImageUrl = portrait.startsWith("http") 
      ? portrait 
      : `https://codewithomkar.vercel.app${portrait}`;

    return {
      meta: [
        { title: "Omkar Jadhav — Full-Stack & Flutter Developer | ByTech" },
        { name: "description", content: "Developer portfolio of Omkar Jadhav — Computer Science student, Full-Stack developer, Flutter app developer, and founder of ByTech. Specializing in high-performance web applications, iOS/Android mobile apps, and custom AI agents." },
        { name: "keywords", content: "Omkar Jadhav, CodeWithOmkar, ByTech, ByTech Softwares, Flutter Developer, Full Stack Developer, AI Agent Developer, Software Engineer, Mobile App Development, Pune, India, React Developer, Node.js" },
        { name: "author", content: "Omkar Jadhav" },
        { name: "robots", content: "index, follow" },
        // Open Graph / Facebook
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://codewithomkar.vercel.app/" },
        { property: "og:title", content: "Omkar Jadhav — Full-Stack & Flutter Developer | ByTech" },
        { property: "og:description", content: "Explore the developer portfolio of Omkar Jadhav, Founder of ByTech. Crafting clean web platforms, production-ready Flutter mobile apps, and intelligent AI integrations." },
        { property: "og:image", content: ogImageUrl },
        { property: "og:site_name", content: "Omkar Jadhav Portfolio" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@omkarjadhav1k" },
        { name: "twitter:creator", content: "@omkarjadhav1k" },
        { name: "twitter:title", content: "Omkar Jadhav — Full-Stack & Flutter Developer | ByTech" },
        { name: "twitter:description", content: "Explore the developer portfolio of Omkar Jadhav, Founder of ByTech. Crafting clean web platforms, production-ready Flutter mobile apps, and intelligent AI integrations." },
        { name: "twitter:image", content: ogImageUrl },
      ],
      links: [
        { rel: "canonical", href: "https://codewithomkar.vercel.app/" },
      ],
    };
  },
  component: Portfolio,
});

const ROLES = [
  "Full Stack Developer",
  "Flutter Developer",
  "AI Developer",
  "Computer Science Student",
  "Startup Builder",
  "UI/UX Enthusiast",
];

function Portfolio() {
  const { data: settings = defaultSettings, isLoading: settingsLoading } = useSiteSettings();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();


  // Main portfolio layout (open directly)
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Scroll-animated 3D Background Canvas */}
      <ThreeCanvas />

      <Nav settings={settings} />
      
      <AnimatePresence mode="popLayout">
        <Hero settings={settings} />
      </AnimatePresence>
      
      <Marquee />
      <About settings={settings} />
      <Founder settings={settings} />
      <Skills />
      <Services />
      <Projects projects={projects} />
      <Stats settings={settings} />
      <Certifications />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ settings }: { settings: typeof defaultSettings }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const items = [
    ["About", "#about"],
    ["Founder", "#founder"],
    ["Skills", "#skills"],
    ["Work", "#work"],
    ["Services", "#services"],
    ["Contact", "#contact"],
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-6xl px-5 transition-all ${scrolled ? "bg-background/80 backdrop-blur-md border border-border rounded-full shadow-sm" : ""}`}>
        <div className="flex items-center justify-between gap-4 py-2">
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-2 group">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-signal text-primary-foreground font-display text-lg shrink-0">O</span>
            <span className="font-display text-lg leading-none">Omkar<span className="text-signal">.</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {items.map(([label, href]) => (
              <a key={href} href={href} onClick={(e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); }} className="text-muted-foreground hover:text-foreground transition-colors story-link">{label}</a>
            ))}
          </nav>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium bg-foreground text-background rounded-full px-4 py-2 hover:bg-signal transition-colors">
            Hire me <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ settings }: { settings: typeof defaultSettings }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="top" ref={ref} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* floating 3D-ish blob */}
      <motion.div
        style={{ y: blobY }}
        className="absolute -right-32 top-24 h-[28rem] w-[28rem] bg-gradient-to-br from-signal via-signal/70 to-orange-300 blob-anim opacity-90 blur-2xl"
        aria-hidden
      />
      <motion.div
        style={{ y: blobY }}
        className="absolute -left-20 -bottom-20 h-72 w-72 bg-signal-soft blob-anim opacity-70 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-end">
        <motion.div style={{ y }} className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground border border-border bg-card rounded-full px-3 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            {settings.availability}
          </motion.div>

          <h1 className="mt-7 font-display text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.2rem] leading-[0.95] tracking-tight">
            <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.7 }} className="block">
              Hi, I'm <span className="italic text-signal">{settings.full_name.split(" ")[0]}</span>
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="block">
              {settings.full_name.split(" ").slice(1).join(" ")}<span className="text-signal">.</span>
            </motion.span>
          </h1>

          <div className="mt-6 flex items-center gap-2 text-base sm:text-lg text-muted-foreground">
            <span className="font-mono-display text-xs uppercase tracking-widest text-signal">→ I'm a</span>
            <motion.span
              key={ROLES[idx]}
              initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="font-medium text-foreground"
            >
              {ROLES[idx]}
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            I build high-quality websites, mobile apps, AI-powered software and digital products with a focus on performance, craft and solving real problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#work" onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-5 py-3 text-sm font-medium hover:bg-signal transition-colors signal-glow">
              View Projects <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 border border-foreground rounded-full px-5 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors">
              Hire Me
            </a>
            {settings.resume_url ? (
              <a href={settings.resume_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                <Download className="h-4 w-4" /> Resume
              </a>
            ) : null}
          </motion.div>
        </motion.div>

        <motion.div
          layoutId="developer-portrait-container"
          className="relative mx-auto w-full max-w-sm float-y"
        >
          <motion.div 
            layoutId="developer-portrait"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-cream signal-glow border border-border"
          >
            <img src={portrait} alt={`Portrait of ${settings.full_name}`} className="h-full w-full object-cover" width={896} height={1216} />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-primary-foreground">
              <div className="font-mono-display text-[10px] uppercase tracking-widest opacity-90">est. 2024</div>
              <div className="font-mono-display text-[10px] uppercase tracking-widest opacity-90">{settings.brand}</div>
            </div>
          </motion.div>
          <motion.div 
            layoutId="bytech-badge"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-5 -left-5 rotate-[-6deg] bg-signal text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium shadow-lg z-10 cursor-default select-none animate-pulse-slow"
          >
            Founder · ByTech
          </motion.div>
          <div className="absolute -top-4 -right-4 rotate-[8deg] bg-card border border-border px-3 py-1.5 rounded-full text-xs font-medium">
            <Sparkles className="inline h-3 w-3 text-signal mr-1" /> AI · Flutter · Web
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const tech = [
    "Flutter", "React", "Next.js", "PHP", "Firebase", "MySQL", "PostgreSQL",
    "Java", "Kotlin", "Dart", "JavaScript", "TypeScript", "AI Agents", "Tailwind",
    "Figma", "Git", "REST APIs", "Cloud",
  ];
  const row = [...tech, ...tech];
  return (
    <section aria-hidden className="border-y border-border bg-cream py-5 overflow-hidden">
      <div className="marquee-track gap-10 px-5 font-display text-2xl sm:text-3xl text-muted-foreground/80">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-10">
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- SECTION HEADER ---------------- */
function SectionLabel({ no, label }: { no: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8">
      <span className="font-mono-display text-signal">{no}</span>
      <span className="h-px w-10 bg-border" />
      <span>{label}</span>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- ABOUT ---------------- */
function About({ settings }: { settings: typeof defaultSettings }) {
  const info: [string, string][] = [
    ["Name", settings.full_name],
    ["Brand", settings.brand],
    ["Location", settings.location],
    ["University", "Savitribai Phule Pune University"],
    ["Languages", "English · Hindi · Marathi"],
    ["Availability", settings.availability],
  ];
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionLabel no="01" label="About" />
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              A Computer Science student building software with{" "}
              <span className="italic text-signal">conviction</span> — and a brand to match.
            </h2>
            <div className="mt-8 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              <p>{settings.bio}</p>
              <p>
                I specialise in responsive websites, cross-platform mobile apps with Flutter, backend systems and AI-powered software. Beyond client work, I run{" "}
                <a href={settings.brand_url} target="_blank" rel="noreferrer" className="text-foreground font-medium underline decoration-signal underline-offset-4">
                  {settings.brand}
                </a>{" "}— a software studio shipping products for education, productivity and business automation.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Real-world problem solving", "AI & automation", "Full-stack craft", "Clean UI/UX", "Entrepreneurial mindset"].map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 text-sm border border-border bg-card rounded-full px-3 py-1.5">
                  <Check className="h-3.5 w-3.5 text-signal" /> {s}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border bg-card p-7 signal-glow">
              <div className="flex items-center gap-3 mb-5">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-signal-soft text-signal">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-xl leading-none">Personal Card</div>
                  <div className="text-xs text-muted-foreground mt-1">Quick facts</div>
                </div>
              </div>
              <dl className="divide-y divide-border">
                {info.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3 text-sm">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 pt-5 border-t border-border">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Interests</div>
                <div className="flex flex-wrap gap-1.5">
                  {["AI", "Mobile", "Web", "Startups", "UI/UX", "Cloud", "Open Source"].map((i) => (
                    <span key={i} className="text-xs font-mono-display text-foreground/80 bg-cream px-2 py-1 rounded-md">{i}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOUNDER & BRAND (BYTECH) ---------------- */
function Founder({ settings }: { settings: typeof defaultSettings }) {
  return (
    <section id="founder" className="relative py-24 md:py-32 bg-ink text-background overflow-hidden">
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40" />
      
      {/* Glowing Spot Highlights */}
      <div className="absolute top-0 right-1/4 w-[35rem] h-[35rem] bg-signal/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl px-5 relative z-10">
        {/* Custom Section Label for dark contrast layout */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-background/60 mb-8">
          <span className="font-mono-display text-signal">02</span>
          <span className="h-px w-10 bg-background/20" />
          <span>Founder & Brand</span>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <Reveal>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-signal-soft/10 border border-signal/30 rounded-full px-3 py-1 text-signal text-xs font-semibold uppercase tracking-wider animate-pulse-slow">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                Active Venture
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
                Founder of <span className="bg-linear-to-r from-signal to-orange-400 bg-clip-text text-transparent font-extrabold">{settings.brand}</span>
              </h2>
              <p className="text-base sm:text-lg text-background/85 leading-relaxed">
                Building innovative software products, cross-platform mobile apps, modern web platforms, and AI-powered automation tools. Under the brand <strong className="text-white font-semibold">ByTech</strong>, my focus is on crafting scalable digital products that simplify operations, streamline education, and drive business productivity.
              </p>
              <p className="text-sm text-background/60 leading-relaxed">
                I lead the end-to-end design, implementation, and deployment of systems, ensuring high performance, clean architectures, and modern user experiences.
              </p>
              <div className="pt-4">
                <a 
                  href={settings.brand_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 bg-signal text-white rounded-full px-6 py-3.5 text-sm font-semibold hover:bg-white hover:text-ink transition-all duration-300 shadow-[0_0_30px_rgba(240,61,29,0.35)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-0.5"
                >
                  Visit ByTech Portfolio <ArrowUpRight className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 sm:p-10 shadow-[0_0_50px_-12px_rgba(240,61,29,0.25)] backdrop-blur-md relative overflow-hidden flex flex-col justify-between min-h-[350px]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-signal/15 rounded-full blur-xl -mr-6 -mt-6" />
              
              <div className="space-y-6">
                <h3 className="font-display text-2xl font-bold tracking-tight text-white pb-4 border-b border-white/10">
                  Core Operations
                </h3>
                
                <ul className="space-y-6">
                  {[
                    { title: "Cross-Platform Mobile Apps", desc: "Crafting beautiful, native-performance Android and iOS builds with Flutter & Dart.", icon: Smartphone },
                    { title: "Full-Stack Web Platforms", desc: "Deploying high-performance websites, backend dashboards, and responsive frontends.", icon: Code2 },
                    { title: "AI Agent Integrations", desc: "Automating workflows and implementing smart features powered by large language models.", icon: Cpu },
                    { title: "Database Architecture", desc: "Designing structured relational databases and Firestore NoSQL environments.", icon: Database },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-4 group">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/5 border border-white/10 text-signal group-hover:bg-signal group-hover:text-white transition-colors duration-300">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-signal transition-colors duration-300">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-background/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SKILLS ---------------- */
function Skills() {
  const groups: { icon: any; title: string; items: string[] }[] = [
    { icon: Smartphone, title: "Mobile", items: ["Flutter", "Android (Kotlin)", "Dart"] },
    { icon: Code2, title: "Web", items: ["HTML5", "CSS3", "JavaScript", "PHP", "React"] },
    { icon: Cpu, title: "Backend & AI", items: ["PHP", "REST APIs", "Firebase", "AI Agents"] },
    { icon: Database, title: "Database", items: ["MySQL", "Firestore", "PostgreSQL"] },
    { icon: Cloud, title: "Tools", items: ["Git", "GitHub", "Android Studio", "VS Code", "Figma", "cPanel"] },
    { icon: Sparkles, title: "Learning", items: ["Multi-Agent Systems", "Advanced Flutter", "Cloud", "Scalable Backends"] },
  ];
  return (
    <section id="skills" className="py-24 md:py-32 bg-cream/60">
      <div className="mx-auto max-w-6xl px-5">
        <SectionLabel no="03" label="Skills" />
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-2xl">
            Tools I use to ship <span className="italic text-signal">real products</span>.
          </h2>
          <p className="text-muted-foreground max-w-sm">From idea to deployment — across mobile, web, backend and AI.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05}>
              <div className="group relative rounded-2xl border border-border bg-background p-6 h-full hover:border-signal/50 transition-colors">
                <div className="flex items-center gap-3 mb-5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-signal-soft text-signal group-hover:bg-signal group-hover:text-primary-foreground transition-colors">
                    <g.icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-xl">{g.title}</div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <span key={it} className="text-xs font-mono-display text-foreground/80 bg-cream border border-border px-2.5 py-1 rounded-md">{it}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services() {
  const services = [
    { t: "Mobile App Development", d: "Cross-platform mobile applications using Flutter — fast, responsive, production-ready." },
    { t: "Website Development", d: "Modern responsive websites built for performance, SEO and conversion." },
    { t: "Backend Development", d: "Secure backend systems with PHP, MySQL and Firebase. APIs that scale." },
    { t: "Firebase Integration", d: "Auth, Firestore, Cloud Storage and Push Notifications wired end-to-end." },
    { t: "Database Design", d: "Efficient relational and NoSQL data models, indexed and migration-safe." },
    { t: "AI Integration", d: "AI features and agents embedded directly into your product workflows." },
  ];
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionLabel no="04" label="Services" />
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 mb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            What I help <span className="italic text-signal">clients</span> build.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl lg:pt-4">
            End-to-end product development — from a Figma sketch to a deployed app on the App Store, Play Store or Vercel.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 0.05}>
              <div className="group relative border-r border-b border-border p-7 bg-background hover:bg-cream/60 transition-colors h-full">
                <div className="font-mono-display text-xs text-signal mb-3">0{i + 1}</div>
                <h3 className="font-display text-2xl mb-3">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                <ArrowUpRight className="absolute top-6 right-6 h-5 w-5 text-muted-foreground group-hover:text-signal group-hover:rotate-45 transition-all" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.status === "featured");
  const ongoing = projects.filter((p) => p.status === "ongoing");
  const future = projects.filter((p) => p.status === "future");

  return (
    <section id="work" className="py-24 md:py-32 bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-background/60 mb-8">
          <span className="font-mono-display text-signal">05</span>
          <span className="h-px w-10 bg-background/20" />
          <span>Selected Work</span>
        </div>
        <div className="flex items-end justify-between gap-6 flex-wrap mb-14">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl tracking-tight max-w-3xl">
            Projects that ship, <span className="italic text-signal">solve</span>, and scale.
          </h2>
          <div className="text-background/60 max-w-xs text-sm">
            A selection from {projects.length || "34"}+ shipped builds across mobile, web, AI and full-stack systems.
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.05}>
              <article className={`group relative rounded-2xl border border-background/10 bg-background/5 p-7 h-full hover:bg-background/10 transition-all ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="min-w-0">
                    <div className="font-mono-display text-xs text-signal mb-2">FEATURED · 0{i + 1}</div>
                    <h3 className={`font-display tracking-tight ${i === 0 ? "text-4xl sm:text-5xl" : "text-3xl"}`}>{p.title}</h3>
                    <p className="text-background/60 mt-1 text-sm">{p.subtitle}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-background/20 group-hover:bg-signal group-hover:border-signal transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="text-sm text-background/70 leading-relaxed mb-5">{p.description}</p>
                {p.features?.length ? (
                  <ul className="grid grid-cols-2 gap-1.5 mb-5">
                    {p.features.slice(0, i === 0 ? 8 : 4).map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-xs text-background/70">
                        <span className="text-signal mt-0.5">•</span> {f}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-background/10">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] font-mono-display text-background/80 bg-background/10 px-2 py-1 rounded">{t}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Ongoing + Future */}
        <div className="grid md:grid-cols-2 gap-10 mt-20">
          <Reveal>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Rocket className="h-4 w-4 text-signal" />
                <div className="font-mono-display text-xs uppercase tracking-widest text-background/60">In Progress</div>
              </div>
              <div className="space-y-3">
                {ongoing.map((p) => (
                  <div key={p.id} className="flex items-start justify-between gap-4 p-5 rounded-xl border border-background/10 hover:border-signal/50 transition-colors">
                    <div>
                      <div className="font-display text-xl">{p.title}</div>
                      <div className="text-sm text-background/60 mt-1">{p.description}</div>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-signal animate-pulse mt-2 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="h-4 w-4 text-signal" />
                <div className="font-mono-display text-xs uppercase tracking-widest text-background/60">Coming Soon</div>
              </div>
              <div className="space-y-3">
                {future.map((p) => (
                  <div key={p.id} className="p-5 rounded-xl border border-background/10 hover:border-signal/50 transition-colors">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="font-display text-xl">{p.title}</div>
                      <span className="text-[10px] font-mono-display uppercase tracking-widest text-signal border border-signal/40 px-2 py-0.5 rounded-full">Planned</span>
                    </div>
                    <div className="text-sm text-background/60">{p.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function Stats({ settings }: { settings: typeof defaultSettings }) {
  const stats = [
    { v: `${settings.projects_completed}+`, l: "Projects Completed" },
    { v: `${settings.active_projects}+`, l: "Active Projects" },
    { v: "3+", l: "Years Coding" },
    { v: "1", l: "Software Brand · ByTech" },
  ];
  return (
    <section className="py-20 border-y border-border">
      <div className="mx-auto max-w-6xl px-5 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-5">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.05}>
            <div>
              <div className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight">
                {s.v.slice(0, -1)}<span className="text-signal">{s.v.slice(-1)}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-2">{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- CERTIFICATIONS ---------------- */
function Certifications() {
  const items = [
    "Google AI Agent Development", "Flutter Development", "Firebase Development",
    "Google Cloud", "AWS Fundamentals", "Git & GitHub", "Android Development",
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionLabel no="06" label="Certifications & Experience" />
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight">
              Always <span className="italic text-signal">learning</span>, always shipping.
            </h2>
            <div className="mt-8 p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-signal text-primary-foreground">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-xl">Founder</div>
                  <div className="text-sm text-muted-foreground">ByTech Softwares · Present</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Building innovative software products, mobile apps, websites, AI-powered tools and digital solutions for clients across India.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid sm:grid-cols-2 gap-3">
              {items.map((c) => (
                <li key={c} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-background hover:border-signal/50 transition-colors">
                  <Check className="h-4 w-4 text-signal mt-0.5 shrink-0" />
                  <span className="text-sm font-medium">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact({ settings }: { settings: typeof defaultSettings }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sentAt, setSentAt] = useState(0);
  const startedAt = useRef(Date.now());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    // Spam protection: honeypot + time-trap + cooldown
    if (form.website.trim()) return; // bot filled hidden field
    if (Date.now() - startedAt.current < 2500) {
      toast.error("Please take a moment to fill the form."); return;
    }
    if (Date.now() - sentAt < 30_000) {
      toast.error("Please wait a moment before sending again."); return;
    }
    const schema = {
      name: form.name.trim(), email: form.email.trim(),
      subject: form.subject.trim(), message: form.message.trim(),
    };
    if (schema.name.length < 2 || schema.name.length > 100) return toast.error("Enter a valid name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(schema.email) || schema.email.length > 255) return toast.error("Enter a valid email.");
    if (schema.message.length < 10 || schema.message.length > 2000) return toast.error("Message must be 10–2000 characters.");
    if (schema.subject.length > 200) return toast.error("Subject is too long.");

    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert(schema);
    
    if (error) {
      setSubmitting(false);
      toast.error("Could not send. Please try again.");
      return;
    }

    // Trigger email notification via server function
    try {
      await sendContactEmailFn({
        data: {
          name: schema.name,
          email: schema.email,
          subject: schema.subject,
          message: schema.message,
          recipientEmail: settings.email,
        }
      });
    } catch (emailErr) {
      console.error("Failed to send email notification:", emailErr);
    }

    setSubmitting(false);
    setSentAt(Date.now());
    setForm({ name: "", email: "", subject: "", message: "", website: "" });
    toast.success("Message sent! I'll reply within 24 hours.");
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-cream overflow-hidden">
      <div className="absolute -top-32 right-0 h-96 w-96 bg-signal/30 blur-3xl rounded-full" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionLabel no="07" label="Let's work together" />
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
          <Reveal>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Have a project in mind? <span className="italic text-signal">Let's talk.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              I'm currently {settings.availability.toLowerCase()}. Send a message — I reply within 24 hours.
            </p>
            <div className="mt-8 space-y-3">
              <SocialRow icon={Mail} label="Email" value={settings.email} href={`mailto:${settings.email}`} />
              <SocialRow icon={Phone} label="Phone" value={settings.phone} href={`tel:${settings.phone}`} />
              <SocialRow icon={Github} label="GitHub" value="@omkarjadhav1k" href={settings.github_url} />
              <SocialRow icon={Linkedin} label="LinkedIn" value="omkarjadhav1k" href={settings.linkedin_url} />
              <SocialRow icon={MapPin} label="Based in" value={settings.location} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-background p-7 signal-glow space-y-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Send a message</div>
              {/* Honeypot — invisible to humans */}
              <input
                type="text" tabIndex={-1} autoComplete="off"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />
              <FormField label="Your name">
                <input required maxLength={100} value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal" />
              </FormField>
              <FormField label="Email">
                <input required type="email" maxLength={255} value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal" />
              </FormField>
              <FormField label="Subject">
                <input maxLength={200} value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Project, collaboration, hire…"
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal" />
              </FormField>
              <FormField label="Message">
                <textarea required rows={5} maxLength={2000} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal resize-none" />
              </FormField>
              <button type="submit" disabled={submitting}
                className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3.5 text-sm font-medium hover:bg-signal transition-colors signal-glow disabled:opacity-60">
                {submitting ? "Sending…" : <>Send message <ArrowUpRight className="h-4 w-4" /></>}
              </button>
              <p className="text-[11px] text-muted-foreground">Protected by spam filtering. Your details are never shared.</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

function SocialRow({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0 group">
      <div className="flex items-center gap-3 min-w-0">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cream group-hover:bg-signal group-hover:text-primary-foreground transition-colors">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="font-medium truncate">{value}</div>
        </div>
      </div>
      {href ? <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-signal shrink-0" /> : null}
    </div>
  );
  if (!href) return inner;
  return <a href={href} target="_blank" rel="noreferrer">{inner}</a>;
}

/* ---------------- FOOTER ---------------- */
function Footer({ settings }: { settings: typeof defaultSettings }) {
  return (
    <footer className="py-10 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>
          {/* Hidden admin entry: clicking the © dot navigates to /auth */}
          <Link to="/auth" aria-label="Admin" title="" className="select-none cursor-default">©</Link>
          {" "}{new Date().getFullYear()} {settings.full_name} · {settings.brand}
        </div>
        <div className="flex items-center gap-5">
          <a href={settings.github_url} target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          <a href={settings.linkedin_url} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href={settings.brand_url} target="_blank" rel="noreferrer" className="hover:text-foreground">ByTech</a>
        </div>
      </div>
    </footer>
  );
}
