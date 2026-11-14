"use client";

import {
  Activity,
  ArrowDown,
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Bot,
  Code2,
  Command,
  Copy,
  Crosshair,
  Database,
  Download,
  ExternalLink,
  FileDown,
  FlaskConical,
  GitBranch,
  Globe2,
  Info,
  Layers3,
  Mail,
  Menu,
  Palette,
  Play,
  Radio,
  Radar,
  Search,
  Send,
  Terminal,
  User,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import ScrollEngine from "./scroll-engine";
import HeroScroll from "./hero-scroll";
import RouteScroll from "./route-scroll";
import LogFocus from "./log-focus";
import StickyCta from "./sticky-cta";

type ProjectStatus = "SHIPPED" | "PROTOTYPE" | "IN PROGRESS" | "COLLABORATION";
type ProjectCategory = "MOBILE" | "FRONTEND" | "BACKEND" | "DATA / AI" | "DESIGN" | "UI/UX";

type Project = {
  id: string;
  signal: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  position: { left: string; top: string };
  featured?: boolean;
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
};

// Featured signals — synced to the final CV (Nov 2026), order fixed by plan.
const projects: Project[] = [
  {
    id: "worthbang-android",
    signal: "SIG.001",
    title: "WORTHBANG ANDROID",
    category: "MOBILE",
    status: "SHIPPED",
    year: "2026",
    role: "MOBILE DEVELOPER",
    summary: "Android app that judges whether a PC component is worth buying — Flutter & Dart client, FastAPI + Supabase backend, and a catalogue of 4,500+ components.",
    problem: "PC builders in Indonesia struggle to judge fair component prices against fragmented marketplace listings, risking overpaying for underpowered hardware.",
    solution: "Built a Flutter & Dart Android app backed by FastAPI and Supabase: catalogue of 4,500+ components, worth-it evaluation flow, and AI-assisted guidance scoped to build decisions.",
    result: "Shipped as a complete Android product — catalogue, evaluation, and assistant in one app — serving as the primary featured build of this portfolio.",
    stack: ["FLUTTER", "DART", "FASTAPI", "SUPABASE"],
    position: { left: "32%", top: "42%" },
    featured: true,
    repoUrl: "https://github.com/WildaGhoniyuJiddan/WorthGaBang-AndroidVer",
    image: "/sites/worthbang-repo.png",
  },
  {
    id: "tembusin-landing",
    signal: "SIG.002",
    title: "LANDING PAGE KOMPETISI TEMBUSIN",
    category: "FRONTEND",
    status: "SHIPPED",
    year: "2026",
    role: "SOFTWARE ENGINEER (MAGANG)",
    summary: "Competition landing page for TEMBUSIN (CV Prestasi Anak Bangsa) — PageSpeed 95+ and 1,000+ prospective participants reached.",
    problem: "TEMBUSIN needed a competition landing page that loads instantly for campaign traffic while staying easy for non-technical staff to update.",
    solution: "Built the page with PHP, JavaScript, HTML5, and CSS3, tuned assets and rendering until it passed PageSpeed 95+, and shipped it inside the business-unit CMS workflow.",
    result: "PageSpeed 95+ in production, 1,000+ prospective participants reached, and publication time cut significantly for the campaign team.",
    stack: ["PHP", "JAVASCRIPT", "HTML5", "CSS3"],
    position: { left: "68%", top: "42%" },
    featured: true,
  },
  {
    id: "tembusin-utm",
    signal: "SIG.003",
    title: "DASHBOARD ANALITIK & PELACAKAN UTM",
    category: "DATA / AI",
    status: "SHIPPED",
    year: "2026",
    role: "SOFTWARE ENGINEER (MAGANG)",
    summary: "Analytics dashboard with UTM tracking for TEMBUSIN — campaign traffic and participant sources in one operational view.",
    problem: "Campaign results were scattered across links and platforms, so the team could not tell which channels actually delivered participants.",
    solution: "Built an analytics dashboard fed by UTM-tagged links: traffic sources, campaign performance, and participant flow consolidated into a single view for the team.",
    result: "Channel performance became visible at a glance, letting the team shift effort to the sources that actually convert.",
    stack: ["PHP", "JAVASCRIPT", "UTM TRACKING", "DATA VISUALIZATION"],
    position: { left: "50%", top: "68%" },
    featured: true,
  },
  {
    id: "tembusin-websites",
    signal: "SIG.004",
    title: "WEBSITE RESMI TEMBUSIN",
    category: "FRONTEND",
    status: "SHIPPED",
    year: "2026",
    role: "SOFTWARE ENGINEER (MAGANG)",
    summary: "Official company websites for TEMBUSIN business units — yapresindo.com and braindicator.com, both live in production.",
    problem: "Business units under CV Prestasi Anak Bangsa needed official, trustworthy web presences instead of scattered social profiles.",
    solution: "Designed and shipped the official websites for the units — yapresindo.com and braindicator.com — as production sites maintained through the shared CMS covering 4 business units.",
    result: "Two official websites live in production (yapresindo.com, braindicator.com), giving each business unit a credible public home.",
    stack: ["PHP", "JAVASCRIPT", "HTML5", "CSS3"],
    position: { left: "18%", top: "66%" },
    featured: true,
    demoUrl: "https://braindicator.com",
    image: "/sites/yapresindo.jpg",
  },
];

// Campus work — deliberately kept apart from the featured/professional signals.
const campusProjects: Project[] = [
  {
    id: "pramana",
    signal: "KUL.001",
    title: "PRAMANA",
    category: "DATA / AI",
    status: "COLLABORATION",
    year: "2026",
    role: "FULL-STACK & AI ARCHITECTURE",
    summary: "AI platform for Bali tourism legal-compliance guidance — a strict grounded-RAG system over verified Balinese regulations, built for Bali DigiFest 2026.",
    problem: "Tourism actors in Bali face scattered, hard-to-read regulations, while generic AI answers risk inventing legal claims.",
    solution: "Built a Svelte + FastAPI platform on Gemini with a verified JDIH Bali corpus and tiered epistemic routing: the model may speak, but claims and citations stay locked to verified evidence.",
    result: "Entered for Bali DigiFest 2026 with a working grounded-RAG prototype — legal answers cite real regulations or abstain.",
    stack: ["SVELTE", "FASTAPI", "GEMINI", "RAG"],
    position: { left: "82%", top: "66%" },
    repoUrl: "https://github.com/WildaGhoniyuJiddan/pramana1",
    demoUrl: "https://pramana1.vercel.app",
    image: "/sites/pramana.jpg",
  },
  {
    id: "mamas",
    signal: "KUL.002",
    title: "MAMAS",
    category: "UI/UX",
    status: "PROTOTYPE",
    year: "2026",
    role: "UI/UX DESIGNER",
    summary: "UI/UX concept for an app that entrusts pickup of new-student attributes — queue, verification codes, and hand-over flow designed end to end.",
    problem: "New students queue chaotically to collect their attributes in person, with no way to safely delegate pickup to someone else.",
    solution: "Designed the full flow as a course final project (Desain Pengalaman Pengguna): entrusted pickup requests, meeting points, verification codes, and hand-over confirmation in a high-fidelity prototype.",
    result: "Complete UI/UX case study — research, flows, and interactive high-fidelity prototype delivered as the course final project.",
    stack: ["FIGMA", "UX RESEARCH", "PROTOTYPING"],
    position: { left: "64%", top: "20%" },
  },
];

const allProjects: Project[] = [...projects, ...campusProjects];

const experience = [
  { year: "JUL–AGU 2026", code: "LOG.001", title: "SOFTWARE ENGINEER (MAGANG)", role: "CV PRESTASI ANAK BANGSA (TEMBUSIN) — BANJARNEGARA", copy: "Built and maintained web systems across 4 business units through one CMS: the competition landing page (PageSpeed 95+, 1,000+ prospective participants), an analytics & UTM tracking dashboard, and the official unit websites yapresindo.com and braindicator.com.", tag: "MAGANG" },
  { year: "2025", code: "LOG.002", title: "STAFF PDD — PKK-SI 2025", role: "UPN \"VETERAN\" YOGYAKARTA", copy: "Publication, decoration, and documentation staff for the Sistem Informasi student orientation (PKK-SI 2025).", tag: "ORGANISASI" },
  { year: "2026", code: "LOG.003", title: "PESERTA NASIONAL DATATHON", role: "RISTEK FASILKOM UI X OPENAI", copy: "Competed at national level in the Datathon organised by RISTEK Fasilkom UI with OpenAI (2026).", tag: "KOMPETISI" },
  { year: "2024", code: "LOG.004", title: "FIRST SIGNAL DETECTED", role: "DEVELOPER", copy: "Started the journey — learning to build for the web and turning curiosity into shipped products.", tag: "ARCHIVE" },
];

const skillGroups = [
  { id: "frontend", title: "FRONTEND SYSTEMS", icon: Code2, color: "cyan", skills: ["HTML5 / CSS3", "JavaScript / TypeScript", "Next.js", "Responsive UI"] },
  { id: "mobile", title: "MOBILE DEVELOPMENT", icon: Zap, color: "cyan", skills: ["Flutter", "Dart", "Android", "Material UI"] },
  { id: "data", title: "DATA & BACKEND", icon: Database, color: "cyan", skills: ["Python / FastAPI", "PHP / MySQL", "Supabase / PostgreSQL", "REST APIs"] },
  { id: "tools", title: "TOOLS & METODE", icon: Palette, color: "cyan", skills: ["Git / GitHub", "Figma", "UTM Analytics", "Design Systems"] },
  { id: "agents", title: "AI AGENTS & SKILLS", icon: Bot, color: "cyan", skills: ["AI Agent Setup", "Hermes Orchestration", "Custom Skill Engineering", "Prompt & Workflow Design"] },
];

const archiveItems = [
  { index: "01", type: "PROTOTYPE", title: "JALURAI", copy: "Pre-dispatch decision support for Indonesian logistics distributors and operators — delay risk, estimated lateness, the factors behind the call, and recommended actions before an order ships.", meta: "DECISION SUPPORT / LOGISTICS", color: "cyan", url: "https://github.com/WildaGhoniyuJiddan/JalurAI" },
  { index: "02", type: "WEB APP", title: "WARUNGKU INSIGHT", copy: "Small-shop (warung) web app — cashier with receipts, automatic stock tracking, and an analytics dashboard with automatic insights. Built as the IBM Data Fundamentals capstone.", meta: "CAPSTONE / JAVASCRIPT", color: "cyan", url: "https://github.com/WildaGhoniyuJiddan/Capstone-Project" },
  { index: "03", type: "EXPERIMENT", title: "TAP2KNOW", copy: "A web tool that makes building a portfolio website easy — pick, fill, and publish without starting from a blank page.", meta: "NEXT.JS / WEB TOOL", color: "cyan", url: "https://github.com/WildaGhoniyuJiddan/Tap2Know" },
  { index: "04", type: "CREDENTIAL", title: "DATATHON RISTEK FASILKOM UI x OPENAI", copy: "National-level datathon participant — data, models, and a ticking clock, against teams from across Indonesia.", meta: "NATIONAL PARTICIPANT / 2026", color: "cyan" },
  { index: "05", type: "CREDENTIAL", title: "GEMINI CERTIFIED EDUCATOR", copy: "Google for Education certification for applied AI in learning — Gemini, verified and on record.", meta: "GOOGLE FOR EDUCATION / THRU 2029", color: "cyan" },
];

const navItems = [
  { id: "command-center", label: "HOME", icon: Crosshair },
  { id: "identity", label: "ABOUT", icon: User },
  { id: "project-network", label: "PROJECTS", icon: BriefcaseBusiness },
  { id: "skills", label: "SKILLS", icon: Layers3 },
  { id: "experience", label: "LOG", icon: Activity },
  { id: "lab", label: "LAB", icon: FlaskConical },
  { id: "contact", label: "CONTACT", icon: Radio },
];

const categories = ["ALL", "MOBILE", "FRONTEND", "DATA / AI"] as const;

function MaskIcon({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`mask-icon ${compact ? "mask-icon--compact" : ""}`} aria-hidden="true">
      <span className="mask-web" />
      <i className="mask-eye mask-eye--left" />
      <i className="mask-eye mask-eye--right" />
    </span>
  );
}

function WebLoader({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <div className={`web-loader ${compact ? "web-loader--compact" : ""}`}>
      <div className="web-spinner" aria-hidden="true">
        <span className="web-spinner__radials" />
        <span className="web-spinner__rings" />
        <span className="web-spinner__sweep" />
        <span className="web-spinner__node web-spinner__node--one" />
        <span className="web-spinner__node web-spinner__node--two" />
        <span className="web-spinner__node web-spinner__node--three" />
        <MaskIcon compact={compact} />
      </div>
      <div className="web-loader__copy">
        <span>PORTFOLIO-NET // WEB PROTOCOL</span>
        <b>{label}</b>
        <small>STABILIZING SIGNAL NODES...</small>
      </div>
      <div className="web-loader__track" aria-hidden="true"><i /></div>
    </div>
  );
}

function AmbientNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    const points = Array.from({ length: 28 }, (_, index) => ({
      x: ((index * 173) % 997) / 997,
      y: ((index * 271) % 991) / 991,
      vx: ((index % 3) - 1) * 0.00008,
      vy: ((index % 5) - 2) * 0.000045,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      points.forEach((point, index) => {
        if (!reduced) {
          point.x = (point.x + point.vx + 1) % 1;
          point.y = (point.y + point.vy + 1) % 1;
        }
        const x = point.x * width;
        const y = point.y * height;
        context.fillStyle = index % 7 === 0 ? "rgba(230,57,70,.7)" : "rgba(82,191,216,.42)";
        context.fillRect(x, y, index % 7 === 0 ? 3 : 2, index % 7 === 0 ? 3 : 2);
        points.slice(index + 1).forEach((other) => {
          const ox = other.x * width;
          const oy = other.y * height;
          const distance = Math.hypot(x - ox, y - oy);
          if (distance < 140) {
            context.strokeStyle = `rgba(82,191,216,${(1 - distance / 140) * 0.12})`;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(ox, oy);
            context.stroke();
          }
        });
      });
      if (shouldRun()) raf = requestAnimationFrame(draw);
      else raf = 0;
    };

    // Fase 4 audit: pause the loop while the canvas is off-screen or the
    // tab is hidden. The canvas is position:fixed (always intersecting),
    // so the visibilitychange half is what actually saves cycles today.
    let inView = true;
    let tabVisible = !document.hidden;
    const shouldRun = () => !reduced && inView && tabVisible;
    const wake = () => {
      if (shouldRun() && !raf) raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) wake();
      else stop();
    });
    viewObserver.observe(canvas);
    const onVisibility = () => {
      tabVisible = !document.hidden;
      if (tabVisible) wake();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-network" aria-hidden="true" />;
}

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [bootFull, setBootFull] = useState(true);
  const [bootLeaving, setBootLeaving] = useState(false);
  const [briefing, setBriefing] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [activeSection, setActiveSection] = useState("command-center");
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [drawerList, setDrawerList] = useState<Project[]>(projects);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<(typeof categories)[number]>("ALL");
  const [skillGroup, setSkillGroup] = useState(skillGroups[0].id);
  const [logQuery, setLogQuery] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "PORTFOLIO-NET CONSOLE v1.0.0",
    "NETWORK READY. TYPE 'help' FOR AVAILABLE COMMANDS.",
  ]);
  const [contactStatus, setContactStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [fannedArchive, setFannedArchive] = useState<string | null>(null);
  const [slinger, setSlinger] = useState<"full" | "label" | null>(null);
  const [clock, setClock] = useState("00:00:00");
  const [loadingLabel, setLoadingLabel] = useState("");
  const audioContext = useRef<AudioContext | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const terminalField = useRef<HTMLInputElement>(null);
  const loadingTimer = useRef<number | null>(null);
  const slingerTimer = useRef<number | null>(null);
  const railRef = useRef<HTMLElement | null>(null);
  const railButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [railMark, setRailMark] = useState({ top: 0, height: 0, ready: false });

  const filteredProjects = useMemo(
    () => projectFilter === "ALL" ? projects : projects.filter((project) => project.category === projectFilter),
    [projectFilter],
  );

  const filteredLogs = useMemo(() => {
    const query = logQuery.trim().toLowerCase();
    if (!query) return experience;
    return experience.filter((item) => `${item.year} ${item.title} ${item.role} ${item.copy} ${item.tag}`.toLowerCase().includes(query));
  }, [logQuery]);

  // Fase 2 boot: full fade-from-black with a thin cyan progress line only on
  // the first visit of a session; later visits in the same session get a
  // short fade. Always skippable with any click/tap/key.
  useEffect(() => {
    let finished = false;
    let doneTimer = 0;
    let holdTimer = 0;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.sessionStorage.setItem("portfolio_boot_seen", "true");
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
      setBootLeaving(true);
      doneTimer = window.setTimeout(() => setBooting(false), 380);
    };
    const startTimer = window.setTimeout(() => {
      const full = window.sessionStorage.getItem("portfolio_boot_seen") !== "true";
      setBootFull(full);
      holdTimer = window.setTimeout(finish, full ? 1450 : 300);
    }, 0);
    window.addEventListener("pointerdown", finish);
    window.addEventListener("keydown", finish);
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(holdTimer);
      window.clearTimeout(doneTimer);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
    };
  }, []);

  useEffect(() => {
    const preferenceTimer = window.setTimeout(() => {
      setSoundEnabled(window.localStorage.getItem("portfolio_sound_enabled") === "true");
      setBriefing(window.sessionStorage.getItem("portfolio_briefing_seen") !== "true");
    }, 0);
    const tick = () => setClock(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(preferenceTimer);
      window.clearInterval(timer);
      if (loadingTimer.current !== null) window.clearTimeout(loadingTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!terminalOpen) return;
    const focusTimer = window.setTimeout(() => terminalField.current?.focus(), 0);
    return () => window.clearTimeout(focusTimer);
  }, [terminalOpen]);

  useEffect(() => {
    const rootSelector = booting ? null : briefing ? ".briefing-panel" : terminalOpen ? ".terminal-window" : drawerOpen ? ".project-drawer" : null;
    if (!rootSelector) return;
    const root = document.querySelector<HTMLElement>(rootSelector);
    if (!root) return;
    const focusables = () => Array.from(root.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]"));
    const firstFocusTimer = window.setTimeout(() => focusables()[0]?.focus(), terminalOpen ? 40 : 0);
    const trapFocus = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    root.addEventListener("keydown", trapFocus);
    return () => {
      window.clearTimeout(firstFocusTimer);
      root.removeEventListener("keydown", trapFocus);
    };
  }, [booting, briefing, drawerOpen, terminalOpen]);

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { root: document.querySelector(".page-scroll"), threshold: [0.25, 0.5, 0.7] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Fase 2: moving rail indicator — measures the active rail button and lets
  // the cyan marker glide to it (CSS transition on transform/height).
  useEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      const button = railButtonRefs.current[activeSection];
      if (!rail || !button) {
        setRailMark((mark) => ({ ...mark, ready: false }));
        return;
      }
      const railBox = rail.getBoundingClientRect();
      const buttonBox = button.getBoundingClientRect();
      setRailMark({ top: buttonBox.top - railBox.top, height: buttonBox.height, ready: true });
    };
    const frame = window.requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [activeSection, mobileNav, booting]);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        if (drawerOpen) setDrawerOpen(false);
        if (terminalOpen) setTerminalOpen(false);
        if (mobileNav) setMobileNav(false);
      }
      if (event.key === "`" && !briefing && !booting) {
        event.preventDefault();
        setTerminalOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [booting, briefing, drawerOpen, mobileNav, terminalOpen]);

  const ensureAudio = async () => {
    if (!audioContext.current) audioContext.current = new AudioContext();
    if (audioContext.current.state === "suspended") await audioContext.current.resume();
    return audioContext.current;
  };

  const playCue = async (cue: "click" | "ping" | "success" | "error" | "chime", force = false) => {
    if (!soundEnabled && !force) return;
    const context = await ensureAudio();
    const now = context.currentTime;
    const createTone = (type: OscillatorType, start: number, end: number, at: number, duration: number, volume = 0.08) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(start, now + at);
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(end, 1), now + at + duration);
      gain.gain.setValueAtTime(volume, now + at);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + at + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(now + at);
      oscillator.stop(now + at + duration);
    };

    if (cue === "click") createTone("square", 440, 880, 0, 0.05, 0.035);
    if (cue === "ping") createTone("sine", 1200, 300, 0, 0.35, 0.055);
    if (cue === "error") createTone("sawtooth", 140, 90, 0, 0.22, 0.055);
    if (cue === "chime") {
      createTone("sine", 600, 600, 0, 0.12, 0.07);
      createTone("sine", 900, 900, 0.08, 0.12, 0.06);
    }
    if (cue === "success") [330, 440, 550, 660, 880].forEach((note, index) => createTone("square", note, note, index * 0.05, 0.09, 0.035));
  };

  const toggleSound = async () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    window.localStorage.setItem("portfolio_sound_enabled", String(next));
    if (next) await playCue("chime", true);
  };

  const dismissBriefing = async (withSound: boolean) => {
    window.sessionStorage.setItem("portfolio_briefing_seen", "true");
    if (withSound) {
      setSoundEnabled(true);
      window.localStorage.setItem("portfolio_sound_enabled", "true");
      await playCue("chime", true);
    }
    setBriefing(false);
  };

  const runLoading = (label: string, action: () => void, duration = 520) => {
    if (loadingTimer.current !== null) window.clearTimeout(loadingTimer.current);
    setLoadingLabel(label);
    loadingTimer.current = window.setTimeout(() => {
      action();
      setLoadingLabel("");
      loadingTimer.current = null;
    }, duration);
  };

  // Fase 4 easter egg (Keputusan 8): one ~1.6s web-slinger burst on the
  // operator portrait. Re-clicks while active are ignored (no stacking);
  // under reduced motion only the label shows, no web sweep.
  const triggerSlinger = () => {
    if (slinger) return;
    playCue("ping");
    setSlinger(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "label" : "full");
    if (slingerTimer.current !== null) window.clearTimeout(slingerTimer.current);
    slingerTimer.current = window.setTimeout(() => {
      setSlinger(null);
      slingerTimer.current = null;
    }, 1600);
  };

  const navigateTo = (id: string) => {
    playCue("click");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setMobileNav(false);
  };

  const openProject = (project: Project, list: Project[]) => {
    lastFocus.current = document.activeElement as HTMLElement;
    runLoading("DECODING PROJECT SIGNAL", () => {
      setDrawerList(list);
      setSelectedProject(project);
      setDrawerOpen(true);
      playCue("ping");
      window.history.replaceState(null, "", `#project/${project.id}`);
    }, 480);
  };

  const scanProjects = () => {
    playCue("click");
    runLoading("SCANNING PROJECT NETWORK", () => navigateTo("project-network"), 680);
  };

  const applyProjectFilter = (category: (typeof categories)[number]) => {
    playCue("click");
    runLoading("REWEAVING PROJECT GRID", () => setProjectFilter(category), 340);
  };

  const closeProject = () => {
    setDrawerOpen(false);
    window.history.replaceState(null, "", "#project-network");
    window.setTimeout(() => lastFocus.current?.focus(), 50);
  };

  const nextProject = () => {
    const currentIndex = drawerList.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % drawerList.length;
    setSelectedProject(drawerList[nextIndex]);
    playCue("ping");
  };

  const prevProject = () => {
    const currentIndex = drawerList.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + drawerList.length) % drawerList.length;
    setSelectedProject(drawerList[prevIndex]);
    playCue("ping");
  };

  const submitTerminal = (event: FormEvent) => {
    event.preventDefault();
    const raw = terminalInput.trim();
    if (!raw) return;
    const [command, ...args] = raw.toLowerCase().split(/\s+/);
    const responses: Record<string, string> = {
      help: "COMMANDS: scan, list, open <id>, filter <category>, about, contact, sound on|off, clear, exit",
      scan: `${allProjects.length} PROJECT SIGNALS DETECTED. ${projects.filter((project) => project.status === "SHIPPED").length} FEATURED SHIPPED. ${campusProjects.length} PROYEK KULIAH.`,
      list: allProjects.map((project) => `${project.signal}:${project.title}`).join(" // "),
      about: "OPERATOR PROFILE AVAILABLE AT PANEL: IDENTITY SIGNAL.",
      contact: "OPENING SECURE CONTACT CHANNEL...",
    };
    let response = responses[command] ?? `UNKNOWN COMMAND '${command}'. TYPE 'help'.`;

    if (command === "clear") {
      setTerminalLines([]);
      setTerminalInput("");
      return;
    }
    if (command === "exit") {
      setTerminalOpen(false);
      setTerminalInput("");
      return;
    }
    if (command === "contact" || command === "about") navigateTo(command === "contact" ? "contact" : "identity");
    if (command === "sound") {
      const wanted = args[0] === "on";
      setSoundEnabled(wanted);
      window.localStorage.setItem("portfolio_sound_enabled", String(wanted));
      response = `SOUND ${wanted ? "ENABLED" : "DISABLED"}.`;
      if (wanted) playCue("chime", true);
    }
    if (command === "filter") {
      const wanted = args.join(" ").toUpperCase();
      const matched = categories.find((category) => category === wanted);
      if (matched) {
        setProjectFilter(matched);
        navigateTo("project-network");
        response = `PROJECT FILTER SET TO ${matched}.`;
      } else response = `FILTER NOT FOUND. USE: ${categories.join(", ")}.`;
    }
    if (command === "open") {
      const project = allProjects.find((item) => item.id.includes(args[0] ?? ""));
      if (project && args[0]) {
        openProject(project, allProjects);
        response = `OPENING ${project.title}.`;
      } else response = "PROJECT NOT FOUND. USE 'list' TO VIEW SIGNALS.";
    }

    setTerminalLines((lines) => [...lines, `> ${raw}`, response]);
    setTerminalInput("");
    playCue(response.startsWith("UNKNOWN") || response.includes("NOT FOUND") ? "error" : "click");
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    playCue("click");
    runLoading("TRANSMITTING SECURE SIGNAL", () => {
      setContactStatus("DEMO MODE — CONNECT A REAL EMAIL OR FORM ENDPOINT BEFORE LAUNCH.");
      playCue("success");
    }, 900);
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText("ezajidan@gmail.com");
    setCopied(true);
    playCue("success");
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="app-shell" aria-busy={booting || Boolean(loadingLabel)}>
      <ScrollEngine />
      <HeroScroll />
      <RouteScroll />
      <LogFocus />
      <AmbientNetwork />
      <div className="ambient-grid" aria-hidden="true" />

      {booting && (
        <section className={`boot-loader ${bootLeaving ? "is-leaving" : ""}`} role="status" aria-live="polite" aria-label="Loading portfolio network">
          <div className="boot-loader__inner">
            <span className="boot-loader__kicker">PORTFOLIO // SIGNAL NETWORK</span>
            <b className="boot-loader__label">{bootFull ? "ESTABLISHING UPLINK" : "RESUMING SESSION"}</b>
            <div className="boot-loader__bar" aria-hidden="true"><i style={{ animationDuration: bootFull ? "1.45s" : "0.3s" }} /></div>
            <small className="boot-loader__hint">CLICK / TAP / ANY KEY TO SKIP</small>
          </div>
        </section>
      )}

      {!booting && loadingLabel && (
        <div className="signal-loading" role="status" aria-live="polite">
          <WebLoader label={loadingLabel} compact />
        </div>
      )}

      <section className="control-room" aria-label="Portfolio Signal Network">
        <header className="topbar">
          <button className="icon-button mobile-only" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu /></button>
          <button className="brand-mark" onClick={() => navigateTo("command-center")} aria-label="Go to command center">
            <MaskIcon compact />
            <span>PORTFOLIO<br /><b>SIGNAL NETWORK</b></span>
          </button>
          <div className="ruler" aria-hidden="true"><i>10</i><i>20</i><i>30</i><i>40</i></div>
          <div className="system-status"><i /> NETWORK READY <span>SYS.08</span></div>
          <button className="icon-button terminal-trigger" aria-label="Open terminal" onClick={() => setTerminalOpen(true)}><Terminal /></button>
          <button className="icon-button" aria-label={soundEnabled ? "Mute sound" : "Enable sound"} onClick={toggleSound}>{soundEnabled ? <Volume2 /> : <VolumeX />}</button>
        </header>

        <div className="workspace">
          <nav ref={railRef} className={`command-rail ${mobileNav ? "is-open" : ""}`} aria-label="Primary navigation">
            {railMark.ready && (
              <span className="rail-indicator" style={{ transform: `translateY(${railMark.top}px)`, height: railMark.height }} aria-hidden="true" />
            )}
            <button className="rail-close mobile-only" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X /></button>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.id} ref={(el) => { railButtonRefs.current[item.id] = el; }} className={`rail-button ${activeSection === item.id ? "is-active" : ""}`} onClick={() => navigateTo(item.id)} aria-label={item.label} aria-current={activeSection === item.id ? "page" : undefined}>
                  <Icon /><span>{item.label}</span>
                </button>
              );
            })}
            <button className="rail-button rail-button--terminal" onClick={() => setTerminalOpen(true)} aria-label="Open terminal"><Terminal /><span>TERM</span></button>
          </nav>

          <div className="page-scroll">
            <section id="command-center" className="page-section command-center" aria-labelledby="home-title">
              <div className="hero-stage">
                <div className="hero-layer hero-layer--sky" aria-hidden="true" />
                <div className="hero-layer hero-layer--skyline" aria-hidden="true" />
                <div className="map-copy reveal">
                  <div className="hero-drift">
                    <span className="eyebrow">OPERATOR ID // PORTFOLIO SIGNAL NETWORK</span>
                    <h1 id="home-title">WILDA GHONIYU JIDDAN<br /><em>IT SPECIALIST</em></h1>
                    <p>Building expressive interfaces and dependable digital systems — from Android apps to production websites for real business units.</p>
                    <div className="hero-scan" aria-hidden="true">
                      <span className="hero-scan__line hero-scan__line--scanning">SCANNING SIGNAL FIELD…</span>
                      <span className="hero-scan__line hero-scan__line--locked">SIGNAL LOCKED // OPERATOR IDENTIFIED</span>
                      <span className="hero-scan__bar"><i className="hero-scan__fill" /></span>
                    </div>
                    <div className="hero-actions">
                      <button className="pixel-button pixel-button--red" onClick={() => openProject(projects[0], projects)}>VIEW FEATURED BUILD</button>
                      <button className="pixel-button" onClick={scanProjects}>SCAN PROJECTS</button>
                    </div>
                    <button className="scroll-hint" onClick={() => navigateTo("identity")}><ArrowDown /> SCROLL TO DECODE</button>
                  </div>
                </div>

              <div className="map-field" aria-label="Project signal map">
                <div className="radar-sweep" aria-hidden="true" />
                <div className="web-lines" aria-hidden="true" />
                {projects.map((project) => (
                  <button
                    key={project.id}
                    className={`signal ${selectedProject.id === project.id ? "is-selected" : ""}`}
                    style={project.position}
                    onMouseEnter={() => setSelectedProject(project)}
                    onFocus={() => setSelectedProject(project)}
                    onClick={() => openProject(project, projects)}
                    aria-label={`Open ${project.title}`}
                  ><span /><b>{project.title}</b></button>
                ))}
              </div>

                <aside className="signal-card reveal reveal--delay" aria-live="polite">
                  <div className="hero-drift">
                    <div className="signal-card__top"><span className="card-index">{selectedProject.signal}</span><span className="status-dot">{selectedProject.status}</span></div>
                    <h2>{selectedProject.title}</h2>
                    <p>{selectedProject.summary}</p>
                    <div className="tag-row">{selectedProject.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="signal-card__bottom">
                      <button className="text-link" onClick={() => openProject(selectedProject, allProjects)}>OPEN CASE FILE <ExternalLink /></button>
                      <div className="signal-cycler">
                        <button type="button" onClick={prevProject} aria-label="Previous project signal" title="Previous signal">◀</button>
                        <span>{projects.findIndex((p) => p.id === selectedProject.id) + 1} / {projects.length}</span>
                        <button type="button" onClick={nextProject} aria-label="Next project signal" title="Next signal">▶</button>
                      </div>
                    </div>
                  </div>
                </aside>

                <div className="map-coordinates" aria-hidden="true"><span>X −7.7956</span><span>Y 110.3695</span><span>ZOOM 04</span></div>
              </div>
            </section>

            <section id="identity" className="page-section identity-section" aria-labelledby="identity-title">
              <div className="section-heading">
                <span className="section-code">ID.01 / IDENTITY SIGNAL</span>
                <h2 id="identity-title">THE OPERATOR<br /><em>BEHIND THE SYSTEM.</em></h2>
                <p>Web systems, interaction, and AI — built with clean architecture, measurable results, and a bit of motion.</p>
              </div>
              <div className="identity-grid">
                <article className="operator-card">
                  <div className="operator-visual" aria-label="Wilda Ghoniyu Jiddan operator portrait">
                    <div className="portrait-scan" aria-hidden="true" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/aku.jpg"
                      alt="Wilda Ghoniyu Jiddan"
                      className="operator-photo"
                      width={310}
                      height={340}
                      loading="lazy"
                    />
                    <div className="operator-photo-overlay" aria-hidden="true" />
                    {slinger === "full" && <div className="slinger-web" aria-hidden="true" />}
                    {slinger && <span className="slinger-tag" aria-hidden="true">WEB-SLINGER MODE</span>}
                    <button type="button" className="operator-hit" aria-label="Aktifkan efek web pada foto" onClick={triggerSlinger} />
                    <span className="operator-tag">SIGNAL LOCKED // OPERATOR IDENTIFIED</span>
                  </div>
                  <div className="operator-id"><span>OPERATOR</span><b>WILDA GHONIYU JIDDAN</b><small>FULL-STACK IT SPECIALIST</small></div>
                </article>
                <div className="identity-copy">
                  <div className="data-stripe"><span>LOCATION</span><b>YOGYAKARTA, INDONESIA</b></div>
                  <div className="data-stripe"><span>EDUCATION</span><b>S1 SISTEM INFORMASI — UPN &quot;VETERAN&quot; YOGYAKARTA • IPK 3,81</b></div>
                  <div className="data-stripe"><span>BASE</span><b className="online-copy">YOGYAKARTA, INDONESIA</b></div>
                  <div className="data-stripe"><span>FOCUS</span><b>WEB SYSTEMS / MOBILE / INTERACTION</b></div>
                  <p>IT Specialist &amp; Developer yang membangun sistem nyata — aplikasi Android, CMS untuk 4 unit bisnis, dan website produksi. Fokus pada arsitektur bersih, performa, dan hasil terukur.</p>
                  <div className="principles">
                    <div><b>01</b><span>CLARITY FIRST</span></div>
                    <div><b>02</b><span>BUILD WITH EVIDENCE</span></div>
                    <div><b>03</b><span>MAKE IT MEMORABLE</span></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="page-section featured-section" aria-labelledby="featured-title">
              <div className="section-heading section-heading--row">
                <div><span className="section-code">CASE.01 / FEATURED BUILD</span><h2 id="featured-title">PRIMARY<br /><em>SIGNAL LOCKED.</em></h2></div>
                <p>{projects[0].summary}</p>
              </div>
              <article className="featured-build">
                <div className="featured-media">
                  <div className="featured-split">
                    <figure className="featured-shot">
                      <img src="/sites/yapresindo.jpg" alt="yapresindo.com — official website of a TEMBUSIN business unit" />
                      <span className="featured-shot__chip">yapresindo.com</span>
                    </figure>
                    <figure className="featured-shot">
                      <img src="/sites/braindicator.jpg" alt="braindicator.com — official website of a TEMBUSIN business unit" />
                      <span className="featured-shot__chip">braindicator.com</span>
                    </figure>
                  </div>
                  <div className="media-caption"><span>FIELD CAPTURE // TEMBUSIN OFFICIAL WEBSITES</span><b>yapresindo.com × braindicator.com</b></div>
                </div>
                <div className="featured-data">
                  <div className="featured-meta"><span>{projects[0].year}</span><span>{projects[0].role}</span><span>{projects[0].status}</span></div>
                  <h3>{projects[0].title}</h3>
                  <p>{projects[0].problem}</p>
                  <ul>{projects[0].stack.map((item) => <li key={item}><Check /> {item}</li>)}</ul>
                  <div className="featured-actions">
                    <button className="pixel-button pixel-button--red" onClick={() => openProject(projects[0], projects)}>READ CASE STUDY</button>
                    {projects[0].demoUrl ? (
                      <a href={projects[0].demoUrl} target="_blank" rel="noopener noreferrer" className="pixel-button" style={{ display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none" }} onClick={() => playCue("click")}>
                        LIVE DEMO <ExternalLink size={14} />
                      </a>
                    ) : (
                      <button className="pixel-button" onClick={() => openProject(projects[0], projects)}>INSPECT SIGNAL <Crosshair size={14} /></button>
                    )}
                  </div>
                </div>
              </article>
            </section>

            <section id="project-network" className="page-section projects-section" aria-labelledby="projects-title">
              <div className="route-stage">
              <div className="section-heading section-heading--row">
                <div><span className="section-code">NET.02 / PROJECT NETWORK</span><h2 id="projects-title">SIGNALS ACROSS<br /><em>THE GRID.</em></h2></div>
                <p>Select a transmission to inspect its role, system, and outcome.</p>
              </div>
              <div className="filter-bar" role="group" aria-label="Filter projects">
                {categories.map((category) => <button key={category} className={projectFilter === category ? "is-active" : ""} onClick={() => applyProjectFilter(category)}>{category}<span>{category === "ALL" ? projects.length : projects.filter((project) => project.category === category).length}</span></button>)}
              </div>
              <div className="route-viewport">
              <div className="project-grid route-track">
                {filteredProjects.map((project, index) => (
                  <article key={project.id} className="project-card">
                    <button className="project-card__hit" onClick={() => openProject(project, projects)} aria-label={`Open case study ${project.title}`} />
                    <div className="project-card__visual">
                      {project.image && <img className="project-card__img" src={project.image} alt={project.title} loading="lazy" />}
                      <div className="mini-radar"><Radar /><i /></div>
                      <span className="project-number">0{index + 1}</span>
                      <div className="project-node" />
                    </div>
                    <div className="project-card__body">
                      <div><span>{project.signal}</span><span>{project.year}</span></div>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                      <div className="tag-row">{project.stack.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
                      <span className="project-open">OPEN SIGNAL <ChevronRight /></span>
                    </div>
                  </article>
                ))}
              </div>
              </div>
              {filteredProjects.length === 0 && <div className="empty-state"><Radar /><h3>NO SIGNAL DETECTED</h3><button onClick={() => setProjectFilter("ALL")}>CLEAR FILTER</button></div>}
              <div className="route-progress" aria-hidden="true"><i className="route-progress__fill" /></div>
              </div>
              <div className="campus-block">
                <div className="campus-head">
                  <span className="section-code">KUL.03 / PROYEK KULIAH</span>
                  <h3>PROYEK KULIAH <em>— COURSEWORK SIGNALS</em></h3>
                  <p>Academic projects from university courses — deliberately kept separate from the professional work above.</p>
                </div>
                <div className="project-grid">
                  {campusProjects.map((project, index) => (
                    <article key={project.id} className="project-card">
                      <button className="project-card__hit" onClick={() => openProject(project, campusProjects)} aria-label={`Open case study ${project.title}`} />
                      <div className="project-card__visual">
                        {project.image && <img className="project-card__img" src={project.image} alt={project.title} loading="lazy" />}
                        <div className="mini-radar"><Radar /><i /></div>
                        <span className="project-number">0{index + 1}</span>
                        <div className="project-node" />
                      </div>
                      <div className="project-card__body">
                        <div><span>{project.signal}</span><span>{project.year}</span></div>
                        <h3>{project.title}</h3>
                        <p>{project.summary}</p>
                        <div className="tag-row">{project.stack.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
                        <span className="project-open">OPEN SIGNAL <ChevronRight /></span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="skills" className="page-section skills-section" aria-labelledby="skills-title">
              <div className="section-heading">
                <span className="section-code">TEL.03 / SKILLS TELEMETRY</span>
                <h2 id="skills-title">CAPABILITY<br /><em>SCAN RESULTS.</em></h2>
                <p>Every capability is backed by a real project signal — from a Flutter Android app to production CMS work across 4 business units.</p>
              </div>
              <div className="skills-layout">
                <div className="telemetry-radar" aria-hidden="true">
                  <div className="telemetry-sweep" />
                  <span className="axis axis--x" /><span className="axis axis--y" />
                  {skillGroups.map((group, index) => <button key={group.id} className={`telemetry-node telemetry-node--${index + 1} ${skillGroup === group.id ? "is-active" : ""}`} onClick={() => setSkillGroup(group.id)} tabIndex={-1}><i /><span>{group.title}</span></button>)}
                  <div className="radar-center"><Crosshair /><span>SKILL CORE</span></div>
                </div>
                <div className="skill-panels">
                  {skillGroups.map((group) => {
                    const Icon = group.icon;
                    return (
                      <button key={group.id} className={`skill-panel skill-panel--${group.color} ${skillGroup === group.id ? "is-active" : ""}`} onClick={() => { setSkillGroup(group.id); playCue("click"); }}>
                        <span className="skill-icon"><Icon /></span>
                        <span className="skill-copy"><small>{group.id.toUpperCase()} / {String(skillGroups.length).padStart(2, "0")}</small><b>{group.title}</b><em>{group.skills.join(" // ")}</em></span>
                        <ChevronRight />
                      </button>
                    );
                  })}
                  <div className="skill-evidence">
                    <span>EVIDENCE LINK</span>
                    <p>{skillGroups.find((group) => group.id === skillGroup)?.skills.join(" • ")}</p>
                    <button onClick={() => navigateTo("project-network")}>VIEW RELATED PROJECTS <ExternalLink /></button>
                  </div>
                </div>
              </div>
            </section>

            <section id="experience" className="page-section experience-section" aria-labelledby="experience-title">
              <div className="section-heading section-heading--row">
                <div><span className="section-code">LOG.04 / EXPERIENCE ACTIVITY</span><h2 id="experience-title">TRANSMISSION<br /><em>HISTORY.</em></h2></div>
                <div className="log-search"><Search /><label className="sr-only" htmlFor="log-query">Search experience log</label><input id="log-query" value={logQuery} onChange={(event) => setLogQuery(event.target.value)} placeholder="SEARCH LOG..." /></div>
              </div>
              <div className="activity-log">
                <div className="activity-log__head"><span>TIME</span><span>ACTIVITY</span><span>STATUS</span></div>
                {filteredLogs.map((item) => (
                  <article className="log-row" key={item.code}>
                    <div className="log-time"><b>{item.year}</b><span>{item.code}</span></div>
                    <div className="log-node"><i /></div>
                    <div className="log-copy"><span>{item.role}</span><h3>{item.title}</h3><p>{item.copy}</p></div>
                    <span className="log-tag">{item.tag}</span>
                  </article>
                ))}
                {filteredLogs.length === 0 && <div className="empty-state"><Search /><h3>NO LOG MATCH</h3><button onClick={() => setLogQuery("")}>CLEAR SEARCH</button></div>}
              </div>
            </section>

            <section id="lab" className="page-section lab-section" aria-labelledby="lab-title">
              <div className="section-heading section-heading--row">
                <div><span className="section-code">LAB.05 / ARCHIVE</span><h2 id="lab-title">SIDE QUESTS &<br /><em>EXPERIMENTS.</em></h2></div>
                <p>Small transmissions where curiosity becomes a working prototype — experiments in motion, audio, and interfaces.</p>
              </div>
              <div className="archive-grid">
                {archiveItems.map((item) => (
                  <article
                    key={item.index}
                    className={`archive-card archive-card--${item.color} ${fannedArchive === item.index ? "is-fanned" : ""}`}
                  >
                    <button
                      type="button"
                      className="archive-visual"
                      aria-pressed={fannedArchive === item.index}
                      aria-label={`Buka kipas arsip ${item.title}`}
                      onClick={() => setFannedArchive((current) => (current === item.index ? null : item.index))}
                    ><span>{item.index}</span><div className="archive-orbit"><i /><i /><i /></div><Play /></button>
                    <div className="archive-copy"><small>{item.type}</small><h3>{item.title}</h3><p>{item.copy}</p><span>{item.meta}</span>{"url" in item && item.url ? <a className="archive-open" href={item.url} target="_blank" rel="noopener noreferrer" onClick={() => playCue("click")}>OPEN ARCHIVE <ExternalLink /></a> : <button onClick={() => playCue("click")}>OPEN ARCHIVE <ExternalLink /></button>}</div>
                  </article>
                ))}
              </div>
            </section>

            <section id="contact" className="page-section contact-section" aria-labelledby="contact-title">
              <div className="contact-intro">
                <span className="section-code">COM.06 / OPEN CHANNEL</span>
                <h2 id="contact-title">LET&apos;S BUILD<br /><em>THE NEXT SIGNAL.</em></h2>
                <p>Have a role, project, or strange web idea? Open a channel.</p>
                <div className="contact-status"><i /><span>SIGNAL CHANNEL</span><b>DIRECT MESSAGE & EMAIL</b></div>
                <button className="email-copy" onClick={copyEmail}><Mail /><span>ezajidan@gmail.com</span>{copied ? <Check /> : <Copy />}</button>
                <div className="social-row">
                  <button aria-label="GitHub" onClick={() => window.open("https://github.com/WildaGhoniyuJiddan", "_blank")}><GitBranch /> GITHUB <ExternalLink /></button>
                  <button aria-label="LinkedIn" onClick={() => window.open("https://www.linkedin.com/in/wilda-ghoniyu-jiddan/", "_blank")}><Globe2 /> LINKEDIN <ExternalLink /></button>
                </div>
                <div className="download-card">
                  <FileDown />
                  <div>
                    <span>RESUME / CV (PDF)</span>
                    <b>WILDA-GHONIYU-JIDDAN-CV.PDF</b>
                    <small>VERIFIED OPERATOR CREDENTIALS</small>
                  </div>
                  <a
                    href="/cv.pdf"
                    download="Wilda-Ghoniyu-Jiddan-CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download Wilda Ghoniyu Jiddan CV"
                    onClick={() => playCue("click")}
                  >
                    <Download />
                  </a>
                </div>
              </div>
              <form className="contact-form" onSubmit={submitContact}>
                <div className="form-head"><Radio /><div><span>SECURE TRANSMISSION</span><b>NEW INQUIRY</b></div><i>ENCRYPTED*</i></div>
                <label>YOUR NAME<input required name="name" placeholder="ENTER IDENTIFIER" /></label>
                <label>EMAIL CHANNEL<input required type="email" name="email" placeholder="name@example.com" /></label>
                <label>CONTEXT<select name="context" defaultValue=""><option value="" disabled>SELECT SIGNAL TYPE</option><option>PROJECT COLLABORATION</option><option>FULL-TIME ROLE</option><option>FREELANCE INQUIRY</option><option>OTHER</option></select></label>
                <label>MESSAGE<textarea required name="message" rows={5} placeholder="LOREM IPSUM DOLOR SIT AMET..." /></label>
                <button className="pixel-button pixel-button--red" type="submit">TRANSMIT MESSAGE <Send /></button>
                {contactStatus && <p className="form-status" role="status"><Info /> {contactStatus}</p>}
                <small>*Visual label only. Connect a secure endpoint before production.</small>
              </form>
            </section>

            <footer className="site-footer">
              <div className="footer-brand"><MaskIcon /><div><b>PORTFOLIO SIGNAL NETWORK</b><span>BUILT WITH INTENTION, MOTION &amp; COFFEE.</span></div></div>
              <div className="footer-links"><button onClick={() => navigateTo("command-center")}>BACK TO TOP ↑</button><button onClick={() => setBriefing(true)}>REPLAY BRIEFING</button><button onClick={() => setTerminalOpen(true)}>OPEN TERMINAL `</button></div>
              <span>© 2026 WILDA GHONIYU JIDDAN // ALL SIGNALS RESERVED</span>
            </footer>
          </div>
        </div>

        <StickyCta />

        <footer className="ticker" aria-label="System status ticker">
          <div className="ticker__badge">
            <span className="ticker__badge-dot" aria-hidden="true" />
            <span>LIVE SIGNAL</span>
          </div>
          <div className="ticker__track">
            <div className="ticker__content">
              <span><b>01</b> PROJECT NETWORK ONLINE</span>
              <span className="ticker__sep">{"///"}</span>
              <span><b>02</b> OPEN FOR COLLABORATION</span>
              <span className="ticker__sep">{"///"}</span>
              <span><b>03</b> SYSTEM STATUS: STABLE</span>
              <span className="ticker__sep">{"///"}</span>
              <span><b>04</b> PRESS ` TO OPEN TERMINAL</span>
              <span className="ticker__sep">{"///"}</span>
              <span><b>01</b> PROJECT NETWORK ONLINE</span>
              <span className="ticker__sep">{"///"}</span>
              <span><b>02</b> OPEN FOR COLLABORATION</span>
              <span className="ticker__sep">{"///"}</span>
              <span><b>03</b> SYSTEM STATUS: STABLE</span>
              <span className="ticker__sep">{"///"}</span>
              <span><b>04</b> PRESS ` TO OPEN TERMINAL</span>
              <span className="ticker__sep">{"///"}</span>
            </div>
          </div>
          <time className="ticker__clock">{clock}</time>
        </footer>

        <nav className="mobile-bottom-nav" aria-label="Mobile primary navigation">
          {navItems.filter((item) => ["command-center", "project-network", "skills", "experience", "contact"].includes(item.id)).map((item) => {
            const Icon = item.icon;
            return <button key={item.id} className={activeSection === item.id ? "is-active" : ""} onClick={() => navigateTo(item.id)} aria-label={item.label}><Icon /><span>{item.label}</span></button>;
          })}
        </nav>
      </section>

      {!booting && briefing && (
        <section className="briefing" role="dialog" aria-modal="true" aria-labelledby="briefing-title">
          <div className="briefing-scan" aria-hidden="true" />
          <div className="briefing-panel">
            <span className="eyebrow">PORTFOLIO-NET // ACCESS POINT</span>
            <div className="briefing-radar"><MaskIcon /><i /><i /><i /></div>
            <div className="boot-lines"><span>SCANNING IDENTITY</span><span>PROJECT DATA: READY</span><span>CHANNEL: OPEN</span></div>
            <h2 id="briefing-title">SIGNAL FOUND.</h2>
            <p>Enter the network to explore selected work, systems, and experiments.</p>
            <div className="briefing-tabs"><span>01 SCAN</span><span>02 FILTER</span><span>03 DECODE</span></div>
            <div className="briefing-actions">
              <button className="pixel-button pixel-button--red" onClick={() => dismissBriefing(true)}>OPEN + SOUND</button>
              <button className="pixel-button" onClick={() => dismissBriefing(false)}>CONTINUE MUTED</button>
            </div>
            <button className="skip-link" onClick={() => dismissBriefing(false)}>SKIP BRIEFING →</button>
          </div>
        </section>
      )}

      {drawerOpen && (
        <div className="drawer-backdrop">
          <button className="drawer-dismiss-layer" onClick={closeProject} aria-label="Close project detail" />
          <aside className="project-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
            <div className="drawer-top"><button onClick={closeProject}><ArrowLeft /> BACK TO NETWORK</button><span>{selectedProject.signal}</span><button onClick={closeProject} aria-label="Close project detail"><X /></button></div>
            <div className="drawer-hero">
              <div className="drawer-radar"><Radar /><i /></div>
              <span>{selectedProject.category}</span><h2 id="drawer-title">{selectedProject.title}</h2><div><b>{selectedProject.status}</b><b>{selectedProject.year}</b></div>
            </div>
            <div className="drawer-content">
              <div className="drawer-meta"><div><span>ROLE</span><b>{selectedProject.role}</b></div><div><span>SIGNAL TYPE</span><b>{selectedProject.category}</b></div></div>
              <section><span>01 / THE SIGNAL</span><p>{selectedProject.problem}</p></section>
              <section><span>02 / THE RESPONSE</span><p>{selectedProject.solution}</p></section>
              <section><span>03 / THE OUTCOME</span><p>{selectedProject.result}</p></section>
              <div className="drawer-stack">{selectedProject.stack.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="drawer-actions">
                {selectedProject.demoUrl ? (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-button pixel-button--red"
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none" }}
                    onClick={() => playCue("click")}
                  >
                    LIVE DEMO <ExternalLink size={14} />
                  </a>
                ) : (
                  <button className="pixel-button" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
                    INTERNAL SYSTEM
                  </button>
                )}
                {selectedProject.repoUrl ? (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-button"
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none" }}
                    onClick={() => playCue("click")}
                  >
                    SOURCE <GitBranch size={14} />
                  </a>
                ) : (
                  <button className="pixel-button" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
                    PRIVATE REPO
                  </button>
                )}
              </div>
              <small>
                {selectedProject.demoUrl || selectedProject.repoUrl
                  ? "Direct project links verified and active."
                  : "Enterprise internal system or private source repository."}
              </small>
            </div>
          </aside>
        </div>
      )}

      {terminalOpen && (
        <div className="terminal-backdrop">
          <section className="terminal-window" role="dialog" aria-modal="true" aria-labelledby="terminal-title">
            <header><span><Command /> <b id="terminal-title">PORTFOLIO-NET // CONSOLE</b></span><span>v1.0.0</span><button onClick={() => setTerminalOpen(false)} aria-label="Close terminal"><X /></button></header>
            <div className="terminal-output" aria-live="polite">{terminalLines.map((line, index) => <p key={`${line}-${index}`} className={line.startsWith(">") ? "terminal-command" : ""}>{line}</p>)}</div>
            <form onSubmit={submitTerminal}><span>operator@portfolio:~$</span><input ref={terminalField} value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => { if (event.key === "Escape") setTerminalOpen(false); }} aria-label="Terminal command" autoComplete="off" /><button type="submit">RUN</button></form>
          </section>
        </div>
      )}
    </main>
  );
}
