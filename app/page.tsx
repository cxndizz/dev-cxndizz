"use client";

import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import moon from "../img/moon.webp";

type Lang = "th" | "en";

const dict = {
  th: {
    nav: {
      items: [
        { label: "เกี่ยวกับ", href: "#profile" },
        { label: "บริการ", href: "#services" },
        { label: "ผลงาน", href: "#work" },
        { label: "วิธีทำงาน", href: "#process" },
        { label: "ตอนนี้", href: "#focus" },
      ],
      cta: "ติดต่อ",
    },
    hero: {
      badge: "เปิดรับงานฟรีแลนซ์",
      title: "ทำเว็บที่ใช้ได้จริง ไม่ใช่แค่ดูดี",
      sub: "Full Stack Dev รับทำเว็บแอป API และระบบ Database แบบที่เอาขึ้น production ได้เลย ไม่ต้องเริ่มใหม่",
      cta1: "เริ่มคุยกัน",
      cta2: "ดูงานก่อน",
      bookingLabel: "ตอนนี้ว่างรับงาน",
      bookingTitle: "Full Stack · Backend · ระบบ Database",
      stat1: "25+",
      stat1Label: "เครื่องมือที่ใช้",
      stat2: "1:1",
      stat2Label: "คุยกับคนเขียนโค้ด",
    },
    hud: {
      eyebrow: "สถานะระบบ",
      live: "ออนไลน์",
      title: "ทุกชิ้นต่อกันเป็นชิ้นเดียว",
      desc: "UI · API · Database · Automation ทำงานพร้อมกัน",
      tags: ["UI", "API", "DB"],
      meters: [
        ["Frontend", "96%"],
        ["Backend", "92%"],
        ["Database", "88%"],
        ["DevOps", "74%"],
      ],
      queueEyebrow: "ลำดับงาน",
      queue: [
        ["01", "เคลียร์ขอบเขต"],
        ["02", "ทำ Prototype"],
        ["03", "ส่งขึ้น Production"],
      ],
      signal: "สัญญาณ",
      stable: "เสถียร",
    },
    profile: {
      eyebrow: "เกี่ยวกับฉัน",
      title: "ทำเว็บที่เข้าใจทั้งฝั่งคนใช้ และฝั่งระบบ",
      p1: "งานของผมอยู่ตรงกลางระหว่าง UI ที่ใช้ง่าย, API ที่ไม่พังบ่อย และฐานข้อมูลที่รองรับการโตได้",
      p2: "ตอนนี้สนใจ AI, system design, Kubernetes ปกติเขียน Next.js, Spring Boot, Node.js เลือกเครื่องมือตามงาน ไม่ใช่ตามเทรนด์",
    },
    cards: [
      ["งานหลัก", "เว็บแอป · Backend · Database"],
      ["วิธีทำงาน", "ตรงไปตรงมา · มีเอกสาร · async ได้"],
      ["จุดแข็ง", "Frontend ละเอียด · Backend เข้าใจธุรกิจ"],
    ],
    services: {
      eyebrow: "บริการ",
      title: "งานที่รับทำ และที่ทำมาหลายรอบจนคุ้นมือ",
      items: [
        ["เว็บแอป Full Stack", "ทำเว็บจองคิว ขายของออนไลน์ หรือเครื่องมือใช้ในออฟฟิศ ตั้งแต่ออกแบบ UI จนถึงดูแล server"],
        ["Backend & API", "เขียน API ที่อ่านโค้ดง่าย แก้ไขสบาย ใช้ Spring Boot, Node.js, NestJS หรือ Express ตามงาน"],
        ["ระบบฐานข้อมูล", "ออกแบบ schema เขียน query ทำ index ให้รับงานจริงไหว ทั้ง PostgreSQL, Oracle, MySQL, MongoDB"],
        ["Frontend ที่ลื่น", "หน้าจอที่ตอบสนองเร็ว ใช้ Next.js + TypeScript + Tailwind ทำให้รู้สึกว่าเป็นแอปจริง ๆ"],
        ["เชื่อม LINE", "ทำ LINE OA, webhook, แจ้งเตือน หรือ chatbot สำหรับร้านค้าและทีมภายใน"],
        ["พร้อมขึ้น Production", "Docker, Kubernetes, Nginx, CI/CD ทำให้ deploy ทีไม่ลุ้นว่าเว็บจะล่มหรือเปล่า"],
      ],
    },
    work: {
      eyebrow: "ผลงาน",
      title: "ตัวอย่างงานที่เคยทำ และยังใช้งานอยู่จริง",
      items: [
        {
          title: "ระบบจองคิวออนไลน์",
          type: "Full Stack",
          metric: "Next.js + Spring Boot",
          copy: "ระบบจองออนไลน์พร้อมแจ้งเตือนผ่าน LINE หน้าแอดมินใช้ง่าย รองรับลูกค้าหลายคนพร้อมกัน",
        },
        {
          title: "ร้านค้าออนไลน์",
          type: "E-Commerce",
          metric: "Node.js + PostgreSQL",
          copy: "ระบบขายของ ตะกร้า ชำระเงิน และแดชบอร์ด เพิ่มสินค้าหรือ category ได้เองโดยไม่ต้องเรียก dev",
        },
        {
          title: "เครื่องมือในออฟฟิศ",
          type: "Internal Tool",
          metric: "Laravel + Oracle",
          copy: "ระบบเอกสารภายในที่เชื่อม Oracle เก่า ๆ ลดเวลาคีย์ข้อมูลซ้ำได้เป็นชั่วโมงต่อวัน",
        },
      ],
    },
    process: {
      eyebrow: "วิธีทำงาน",
      title: "ส่งงานทีละนิด คุยกันตรง ๆ ไม่ทำซับซ้อนเกินจำเป็น",
      steps: [
        "คุยให้เข้าใจตรงกันก่อน ตัดส่วนที่ยังไม่ชัดออกก่อนเขียนโค้ด",
        "ทำ flow หลักให้ใช้ได้จริงก่อน แล้วค่อยเก็บรายละเอียดทีหลัง",
        "ส่งงานเป็นรอบสั้น ๆ พร้อม note อธิบาย ใช้งานได้ทันทีไม่ต้องรอนาน",
      ],
    },
    stack: {
      eyebrow: "Tech Stack",
      title: "เครื่องมือที่ใช้บ่อย เลือกเพราะใช้ได้จริง",
    },
    focus: {
      eyebrow: "ตอนนี้",
      title: "เรื่องที่กำลังเล่น ๆ และเรียนรู้เพิ่ม",
      items: [
        ["Full Stack Workflow", "หาทาง ship งานเร็วขึ้น โดยที่คุณภาพไม่ตก"],
        ["Backend & Database", "ลองโครงสร้างใหม่ ๆ ที่ทำให้ระบบโตได้โดยไม่ต้องรื้อ"],
        ["AI & Automation", "เอา AI มาช่วยงานจริง เช่น สรุปเอกสาร generate code ทำ classification"],
        ["LINE & Integration", "เชื่อม LINE และระบบอื่นให้ตอบ user ได้เร็วและ automate งานซ้ำ"],
      ],
      snapshotEyebrow: "ภาพรวมระบบ",
      snapshotStatus: "Stable",
      snapshotEndpoint: "api.cxndizz.dev",
      snapshotVersion: "v2.4.1",
      snapshotRegion: "ap-southeast-1",
      snapshotMetricsEyebrow: "ตัวชี้วัด · 24 ชม.",
      snapshotMetrics: [
        { value: "99.8", suffix: "%", label: "Uptime", trend: "+0.1" },
        { value: "142", suffix: "ms", label: "Response p95", trend: "-8" },
        { value: "12.4", suffix: "k", label: "Requests / วัน", trend: "+1.2k" },
        { value: "0.02", suffix: "%", label: "Error rate", trend: "-0.01" },
      ],
      snapshotServicesEyebrow: "บริการที่ตรวจสอบ",
      snapshotServices: [
        { name: "API Server", value: "142ms", level: 92 },
        { name: "PostgreSQL", value: "8ms", level: 96 },
        { name: "Redis Cache", value: "1ms", level: 99 },
        { name: "Worker Queue", value: "24 / นาที", level: 84 },
      ],
      snapshotTrafficEyebrow: "Traffic 12 ชม.",
      snapshotDeployLabel: "Deploy ล่าสุด",
      snapshotDeploy: "2 ชั่วโมงที่แล้ว · main",
      snapshotChecks: "ผ่าน CI ทั้ง 24 รายการ",
    },
    fit: {
      eyebrow: "เหมาะกับใคร",
      title: "เหมาะกับเจ้าของธุรกิจและทีม ที่อยากได้คนทำจริง ไม่ใช่แค่ wireframe",
      items: [
        "มีไอเดียอยู่ในหัว แต่ยังไม่รู้จะเริ่มยังไง",
        "อยากได้คนทำทั้ง frontend และ backend ในคนเดียว",
        "อยากได้ระบบที่เชื่อม LINE หรือ automate งานซ้ำ ๆ",
        "เน้นใช้งานได้จริง ไม่ว่ามือถือหรือคอม",
      ],
    },
    contact: {
      eyebrow: "ติดต่อ",
      title: "ส่งโจทย์มาก่อน เริ่มจากตรงนั้น",
      desc: "บอกมาว่าจะทำอะไร ตอนนี้อยู่จุดไหน และเรื่องไหนกังวลที่สุด ผมจะช่วยดูให้ว่าควรเริ่มจากตรงไหน",
      cta1: "ส่งอีเมล",
      cta2: "ดูผลงานเพิ่ม",
      emailLabel: "อีเมล",
      githubLabel: "GitHub",
      fastworkLabel: "Fastwork",
      fastworkValue: "fastwork.co/user/aueasiripracha",
    },
    footer: {
      tagline: "Full Stack Developer รับทำเว็บแอป Backend และระบบฐานข้อมูล",
      copy: "© 2026 CXN. สงวนลิขสิทธิ์",
      built: "ออกแบบให้ใช้ได้ทุกอุปกรณ์",
      links: [
        ["เกี่ยวกับ", "#profile"],
        ["บริการ", "#services"],
        ["ผลงาน", "#work"],
        ["ติดต่อ", "#contact"],
      ],
    },
  },
  en: {
    nav: {
      items: [
        { label: "About", href: "#profile" },
        { label: "Services", href: "#services" },
        { label: "Work", href: "#work" },
        { label: "Process", href: "#process" },
        { label: "Now", href: "#focus" },
      ],
      cta: "Contact",
    },
    hero: {
      badge: "Open for freelance",
      title: "I build web apps that actually ship.",
      sub: "Full stack developer making web apps, APIs, and databases — the kind that hold up in production, not just in demo.",
      cta1: "Let's talk",
      cta2: "See work",
      bookingLabel: "Available now",
      bookingTitle: "Full Stack · Backend · Database",
      stat1: "25+",
      stat1Label: "Tools I use",
      stat2: "1:1",
      stat2Label: "No middlemen",
    },
    hud: {
      eyebrow: "System status",
      live: "Online",
      title: "Everything wired as one",
      desc: "UI · API · Database · Automation moving together",
      tags: ["UI", "API", "DB"],
      meters: [
        ["Frontend", "96%"],
        ["Backend", "92%"],
        ["Database", "88%"],
        ["DevOps", "74%"],
      ],
      queueEyebrow: "Queue",
      queue: [
        ["01", "Scope locked"],
        ["02", "Prototype live"],
        ["03", "Ready to ship"],
      ],
      signal: "Signal",
      stable: "Stable",
    },
    profile: {
      eyebrow: "About",
      title: "I build web apps that respect both users and the system underneath.",
      p1: "My day-to-day sits between product design and engineering — clean UI, APIs that don't break, databases that grow without rewrites.",
      p2: "Currently into AI, system design, and Kubernetes. Default stack: Next.js, Spring Boot, Node.js. I pick tools by fit, not hype.",
    },
    cards: [
      ["What I build", "Web apps · Backend · Database"],
      ["How I work", "Direct · documented · async-friendly"],
      ["Where I'm strong", "Frontend polish · backend judgment"],
    ],
    services: {
      eyebrow: "Services",
      title: "Work I take on, and have shipped enough times to know it.",
      items: [
        ["Full Stack Web Apps", "Booking systems, online stores, internal tools — from UI down to the server."],
        ["Backend & APIs", "APIs that read clean and extend easily. Spring Boot, Node.js, NestJS, Express depending on the job."],
        ["Database Systems", "Schema design, queries, indexes that hold up in production — PostgreSQL, Oracle, MySQL, MongoDB."],
        ["Smooth Frontends", "Fast, responsive UIs that feel like a real app — Next.js, TypeScript, Tailwind."],
        ["LINE Integrations", "LINE OA, webhooks, alerts, chatbots — for stores and internal teams."],
        ["Production Ready", "Docker, Kubernetes, Nginx, CI/CD. Deploy without crossing fingers."],
      ],
    },
    work: {
      eyebrow: "Work",
      title: "Real builds that are still running today.",
      items: [
        {
          title: "Online Booking System",
          type: "Full Stack",
          metric: "Next.js + Spring Boot",
          copy: "Online booking with LINE alerts. Admin panel non-engineers can actually use, handles concurrent customers.",
        },
        {
          title: "Online Store",
          type: "E-Commerce",
          metric: "Node.js + PostgreSQL",
          copy: "Cart, checkout, dashboard. Add products and categories without calling the dev.",
        },
        {
          title: "Internal Office Tool",
          type: "Internal Tool",
          metric: "Laravel + Oracle",
          copy: "Document workflow on top of legacy Oracle. Cuts hours of manual entry per day.",
        },
      ],
    },
    process: {
      eyebrow: "Process",
      title: "Ship in small steps. Talk straight. Skip needless complexity.",
      steps: [
        "Get aligned first. Cut anything that isn't clear before code starts.",
        "Build the main flow first. Polish edges and states once it works.",
        "Hand off in short rounds with notes. Production-ready from day one.",
      ],
    },
    stack: {
      eyebrow: "Tech Stack",
      title: "Tools I actually reach for, picked by fit not novelty.",
    },
    focus: {
      eyebrow: "Now",
      title: "What I'm playing with and learning on the side.",
      items: [
        ["Full Stack Workflow", "Shipping faster without losing quality."],
        ["Backend & Database", "Trying structures that scale without rewrites."],
        ["AI & Automation", "Real uses for AI — summaries, code gen, classification."],
        ["LINE & Integration", "Connecting LINE and other services for faster response."],
      ],
      snapshotEyebrow: "System overview",
      snapshotStatus: "Stable",
      snapshotEndpoint: "api.cxndizz.dev",
      snapshotVersion: "v2.4.1",
      snapshotRegion: "ap-southeast-1",
      snapshotMetricsEyebrow: "Metrics · 24h",
      snapshotMetrics: [
        { value: "99.8", suffix: "%", label: "Uptime", trend: "+0.1" },
        { value: "142", suffix: "ms", label: "Response p95", trend: "-8" },
        { value: "12.4", suffix: "k", label: "Requests / day", trend: "+1.2k" },
        { value: "0.02", suffix: "%", label: "Error rate", trend: "-0.01" },
      ],
      snapshotServicesEyebrow: "Services monitored",
      snapshotServices: [
        { name: "API Server", value: "142ms", level: 92 },
        { name: "PostgreSQL", value: "8ms", level: 96 },
        { name: "Redis Cache", value: "1ms", level: 99 },
        { name: "Worker Queue", value: "24 / min", level: 84 },
      ],
      snapshotTrafficEyebrow: "Traffic last 12h",
      snapshotDeployLabel: "Last deploy",
      snapshotDeploy: "2h ago · main",
      snapshotChecks: "All 24 CI checks passed",
    },
    fit: {
      eyebrow: "Who this is for",
      title: "Founders and teams who want a builder — not a handoff chain.",
      items: [
        "You have an idea but aren't sure where to start",
        "You want one person who handles frontend AND backend",
        "You need LINE integration or automation for repetitive work",
        "You care about both mobile and desktop quality",
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Send the brief. We'll start from there.",
      desc: "Tell me what you're building, where it stands, and what worries you most. I'll help figure out where to begin.",
      cta1: "Send email",
      cta2: "More work",
      emailLabel: "Email",
      githubLabel: "GitHub",
      fastworkLabel: "Fastwork",
      fastworkValue: "fastwork.co/user/aueasiripracha",
    },
    footer: {
      tagline: "Full stack developer building web apps, backend, and database systems.",
      copy: "© 2026 CXN. All rights reserved.",
      built: "Built to feel right on every device.",
      links: [
        ["About", "#profile"],
        ["Services", "#services"],
        ["Work", "#work"],
        ["Contact", "#contact"],
      ],
    },
  },
};

type DictShape = typeof dict.th;

const I18nCtx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  tx: DictShape;
}>(null!);

const useI18n = () => useContext(I18nCtx);

function useLanguage(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("th");
  useEffect(() => {
    const stored = (typeof window !== "undefined" && (window.localStorage.getItem("lang") as Lang | null)) ?? null;
    if (stored === "th" || stored === "en") setLang(stored);
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
    if (typeof window !== "undefined") window.localStorage.setItem("lang", lang);
  }, [lang]);
  return [lang, setLang];
}

function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] hidden lg:block"
      style={{
        background:
          "radial-gradient(620px circle at var(--mx, 50%) var(--my, 50%), rgba(56,189,248,0.07), rgba(139,92,246,0.04) 30%, transparent 60%)",
        transition: "background 0.4s ease",
      }}
    />
  );
}

function FloatingOrbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-20 top-24 h-72 w-72 animate-floatXY rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute right-[-10%] top-[40%] h-80 w-80 animate-floatY rounded-full bg-violet-500/10 blur-3xl [animation-delay:-3s]" />
      <div className="absolute bottom-10 left-[30%] h-60 w-60 animate-floatXY rounded-full bg-fuchsia-400/[0.06] blur-3xl [animation-delay:-6s]" />
    </div>
  );
}

function MagneticLink({
  href,
  children,
  className = "",
  strength = 14,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  strength?: number;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduceMotion) return;
    const r = ref.current!.getBoundingClientRect();
    const cx = e.clientX - (r.left + r.width / 2);
    const cy = e.clientY - (r.top + r.height / 2);
    x.set((cx / r.width) * strength * 2);
    y.set((cy / r.height) * strength * 2);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function TiltCard3D({
  children,
  className = "",
  strength = 8,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [strength, -strength]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-strength, strength]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    x.set(px);
    y.set(py);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt-3d ${className}`}>
      <motion.div
        className="tilt-3d-inner h-full w-full"
        style={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 150, damping: 18 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Marquee({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  const doubled = useMemo(() => [...items, ...items], [items]);
  return (
    <div className="marquee-mask group relative overflow-hidden">
      <div
        className={`flex w-max gap-3 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marqueeReverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-white/72 backdrop-blur-xl transition-colors hover:border-sky-300/40 hover:bg-sky-300/[0.08] hover:text-white"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function CountUp({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  const [val, setVal] = useState(0);
  const reduceMotion = useReducedMotion();

  const decimals = Number.isInteger(to) ? 0 : to < 1 ? 2 : 1;

  useEffect(() => {
    if (!inView) {
      setVal(0);
      return;
    }
    if (reduceMotion) {
      setVal(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduceMotion]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function RevealText({
  children,
  delay = 0,
  className = "",
  as: As = "span",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
}) {
  const Tag = motion[As as keyof typeof motion] as React.ElementType;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.2, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </Tag>
  );
}

function LanguageToggle({
  lang,
  setLang,
  compact = false,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  compact?: boolean;
}) {
  const options: Lang[] = ["th", "en"];
  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative flex items-center rounded-full border border-white/[0.09] bg-black/30 p-1 backdrop-blur-2xl ${
        compact ? "text-[10px]" : "text-[11px]"
      }`}
    >
      {options.map((opt) => {
        const active = lang === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => setLang(opt)}
            aria-pressed={active}
            className={`relative z-10 px-3 py-1.5 font-semibold uppercase tracking-[0.2em] transition-colors ${
              active ? "text-black" : "text-white/55 hover:text-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-sky-200 to-violet-200 shadow-[0_0_24px_rgba(56,189,248,0.35)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {opt.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

function Stars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-[-10%] animate-starDrift bg-[radial-gradient(circle_at_12%_22%,rgba(255,255,255,.72)_0_1px,transparent_1.4px),radial-gradient(circle_at_32%_62%,rgba(255,255,255,.45)_0_1px,transparent_1.4px),radial-gradient(circle_at_56%_18%,rgba(125,211,252,.46)_0_1px,transparent_1.4px),radial-gradient(circle_at_76%_48%,rgba(255,255,255,.56)_0_1px,transparent_1.4px),radial-gradient(circle_at_88%_28%,rgba(196,181,253,.46)_0_1px,transparent_1.4px)] bg-[length:390px_390px] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,transparent_0,rgba(2,3,10,.28)_44%,rgba(2,3,10,.9)_86%)]" />
    </div>
  );
}

function NodeNetwork({ opacity }: { opacity: any }) {
  return (
    <motion.svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full text-sky-300/50 lg:block"
      style={{ opacity }}
      viewBox="0 0 1440 960"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="network-line" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#38bdf8" stopOpacity="0.06" />
          <stop offset="0.48" stopColor="#8b5cf6" stopOpacity="0.22" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <motion.path
        d="M82 650 L238 564 L396 622 L572 485 L768 544 L1010 418 L1210 538 L1362 458"
        fill="none"
        stroke="url(#network-line)"
        strokeWidth="1"
        strokeDasharray="8 22"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      {[
        [82, 650],
        [238, 564],
        [396, 622],
        [572, 485],
        [768, 544],
        [1010, 418],
        [1210, 538],
        [1362, 458],
      ].map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}`}
          className="animate-pulseNode"
          style={{ animationDelay: `${index * 0.4}s` }}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="currentColor"
        />
      ))}
    </motion.svg>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-white/[0.09] bg-white/[0.045] shadow-[0_24px_90px_rgba(0,0,0,.3)] backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Bootstrap",
  "Java",
  "Spring Boot",
  "Node.js",
  "Express",
  "NestJS",
  "PHP",
  "Laravel",
  "PostgreSQL",
  "Oracle",
  "MySQL",
  "MongoDB",
  "Redis",
  "Prisma",
  "Docker",
  "Kubernetes",
  "Git",
  "GitLab",
  "Nginx",
  "PowerShell",
] as const;

export default function Home() {
  const [lang, setLang] = useLanguage();
  const tx = dict[lang];

  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [heroDistance, setHeroDistance] = useState(1600);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setIsMobile(query.matches);
      setHeroDistance(window.innerHeight * (query.matches ? 1.25 : 1.8));
    };
    update();
    query.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const moonY = useTransform(
    smoothScrollY,
    [0, heroDistance],
    isMobile ? ["70vh", "22vh"] : ["70vh", "-4vh"],
  );
  const moonScale = useTransform(smoothScrollY, [0, heroDistance], [1.04, isMobile ? 1.09 : 1.16]);
  const heroTextY = useTransform(smoothScrollY, [heroDistance * 0.06, heroDistance * 0.34], ["0%", "-22%"]);
  const heroTextOpacity = useTransform(
    smoothScrollY,
    [heroDistance * 0.08, heroDistance * 0.32],
    [1, 0],
  );
  const networkOpacity = useTransform(smoothScrollY, [heroDistance * 0.2, heroDistance * 0.62], [0, 0.8]);
  const stateOpacity = useTransform(smoothScrollY, [heroDistance * 0.24, heroDistance * 0.44], [0, 1]);
  const stateY = useTransform(smoothScrollY, [heroDistance * 0.24, heroDistance * 0.44], [56, 0]);
  const stateScale = useTransform(smoothScrollY, [heroDistance * 0.24, heroDistance * 0.5], [0.96, 1]);

  return (
    <I18nCtx.Provider value={{ lang, setLang, tx }}>
      <main className="relative min-h-screen overflow-x-clip bg-void text-white">
        <Spotlight />
        <FloatingNav />

        <section ref={heroRef} className="relative h-[240vh] md:h-[300vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#02030a_0%,#040713_44%,#02030a_100%)]" />
            <Stars />
            <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:84px_84px]" />
            <NodeNetwork opacity={reduceMotion ? 0.12 : networkOpacity} />

            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-[58%] z-10 h-[54vw] max-h-[700px] min-h-[340px] w-[104vw] max-w-[1320px] -translate-x-1/2 rounded-[50%] border border-sky-200/[0.08] opacity-0"
              style={{ opacity: reduceMotion ? 0.14 : networkOpacity }}
            >
              <div className="absolute inset-x-[10%] inset-y-[24%] animate-orbit rounded-[50%] border border-violet-300/[0.1]" />
              <div className="absolute inset-x-[18%] inset-y-[33%] animate-orbit rounded-[50%] border border-sky-300/[0.12] [animation-duration:48s]" />
            </motion.div>

            <motion.div
              className="moon-banner-layer absolute inset-0 z-10 transform-gpu will-change-transform"
              style={{
                y: reduceMotion ? (isMobile ? "62vh" : "68vh") : moonY,
                scale: reduceMotion ? 1.04 : moonScale,
              }}
            >
              <div className="absolute inset-x-[-14%] bottom-[-10%] h-[52%] bg-sky-300/[0.1] blur-3xl" />
              <div className="absolute inset-x-[-16%] bottom-[4%] h-[42%] bg-violet-500/[0.07] blur-3xl" />
              <Image
                src={moon}
                alt=""
                priority
                fill
                sizes="100vw"
                className="relative object-cover object-bottom opacity-100 brightness-[1.18] contrast-[1.08] drop-shadow-[0_-28px_96px_rgba(56,189,248,0.18)]"
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,#02030a_0%,rgba(2,3,10,.94)_17%,rgba(2,3,10,.74)_42%,rgba(2,3,10,.18)_70%,rgba(2,3,10,.42)_86%,rgba(2,3,10,.78)_96%,#02030a_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[58vh] bg-[linear-gradient(180deg,transparent_0%,rgba(2,3,10,.18)_22%,rgba(2,3,10,.5)_48%,rgba(2,3,10,.82)_74%,rgba(2,3,10,.96)_92%,#02030a_100%)]" />

            <motion.div
              className="relative z-30 mx-auto flex h-full max-w-7xl transform-gpu items-center px-5 pt-24 will-change-transform sm:px-8 lg:pt-20"
              style={{
                y: reduceMotion ? 0 : heroTextY,
                opacity: reduceMotion ? 1 : heroTextOpacity,
              }}
            >
              <HeroCopy />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-x-5 top-[56%] z-30 mx-auto max-w-6xl -translate-y-1/2 transform-gpu will-change-transform md:top-[58%]"
              style={{
                opacity: reduceMotion ? 1 : stateOpacity,
                y: reduceMotion ? 0 : stateY,
                scale: reduceMotion ? 1 : stateScale,
              }}
            >
              <DisplayState />
            </motion.div>
          </div>
        </section>

        <div aria-hidden="true" className="section-bridge" />

        <div className="relative z-30 -mt-24 bg-[linear-gradient(180deg,#02030a_0%,#02030a_18%,#040612_52%,#03040c_100%)]">
          <Content />
        </div>
      </main>
    </I18nCtx.Provider>
  );
}

function HeroCopy() {
  const { tx, lang } = useI18n();
  return (
    <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="max-w-4xl">
        <motion.div
          className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-black/30 px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-sky-100/90 shadow-[0_18px_70px_rgba(0,0,0,.28)] backdrop-blur-2xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="h-1.5 w-1.5 animate-glowPulse rounded-full bg-sky-300 shadow-[0_0_18px_rgba(56,189,248,.95)]" />
          <AnimatePresence mode="wait">
            <motion.span
              key={`${lang}-badge`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {tx.hero.badge}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.h1
            key={`${lang}-title`}
            className="max-w-[980px] font-display text-[clamp(2.6rem,6.4vw,6.6rem)] font-semibold leading-[1] tracking-[-0.04em] text-white"
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="gradient-text">{tx.hero.title}</span>
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`${lang}-sub`}
            className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            {tx.hero.sub}
          </motion.p>
        </AnimatePresence>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <MagneticLink
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black shadow-[0_16px_50px_rgba(255,255,255,.12)] transition hover:bg-sky-100"
          >
            {tx.hero.cta1}
          </MagneticLink>
          <MagneticLink
            href="#work"
            className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/[0.045] px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur-xl transition hover:border-sky-200/45 hover:bg-sky-300/10"
          >
            {tx.hero.cta2}
          </MagneticLink>
        </div>
      </div>

      <TiltCard3D strength={6} className="hidden lg:block">
        <GlassCard className="glass-border rounded-2xl bg-black/24 p-5">
          <p className="text-[11px] tracking-[0.18em] text-white/52">{tx.hero.bookingLabel}</p>
          <p className="mt-3 text-xl font-semibold leading-snug tracking-[-0.02em]">
            {tx.hero.bookingTitle}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-2xl font-semibold text-sky-100">{tx.hero.stat1}</p>
              <p className="mt-1 text-white/45">{tx.hero.stat1Label}</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-violet-100">{tx.hero.stat2}</p>
              <p className="mt-1 text-white/45">{tx.hero.stat2Label}</p>
            </div>
          </div>
        </GlassCard>
      </TiltCard3D>
    </div>
  );
}

function FloatingNav() {
  const { tx, lang, setLang } = useI18n();
  return (
    <nav className="fixed left-0 right-0 top-4 z-50 px-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full bg-black/34 px-3 py-2 shadow-[0_18px_80px_rgba(0,0,0,.32)] ring-1 ring-white/[0.08] backdrop-blur-2xl sm:px-5 sm:py-3"
      >
        <a
          href="#"
          className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-white"
        >
          <motion.span
            whileHover={{ rotate: 12, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 320, damping: 14 }}
            className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-white via-sky-100 to-violet-200 text-[11px] tracking-[-0.02em] text-black shadow-[0_0_24px_rgba(125,211,252,0.35)]"
          >
            CX
          </motion.span>
          <span className="hidden sm:inline">CXN</span>
        </a>

        <div className="hidden items-center gap-1 rounded-full bg-white/[0.035] p-1 text-[11px] font-medium tracking-[0.12em] text-white/58 lg:flex">
          {tx.nav.items.map((item) => (
            <a
              key={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-white/[0.07] hover:text-white"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle lang={lang} setLang={setLang} />
          <MagneticLink
            href="#contact"
            className="hidden rounded-full bg-sky-300 px-4 py-2 text-xs font-bold tracking-[0.08em] text-black shadow-[0_0_34px_rgba(56,189,248,.24)] transition hover:bg-white sm:inline-flex"
          >
            {tx.nav.cta}
          </MagneticLink>
        </div>
      </motion.div>
    </nav>
  );
}

function DisplayState() {
  const { tx } = useI18n();
  return (
    <div className="hud-shell relative overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-[#050712]/88 shadow-[0_28px_110px_rgba(0,0,0,.45)] md:rounded-[1.8rem]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(56,189,248,.15),transparent_18rem),radial-gradient(circle_at_82%_72%,rgba(139,92,246,.13),transparent_20rem)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/60 to-transparent" />
      <div className="relative grid gap-px bg-white/[0.055] lg:grid-cols-[0.82fr_1.04fr_0.82fr]">
        <div className="hud-panel p-4 md:p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-sky-200/72">
              {tx.hud.eyebrow}
            </p>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-300/18 bg-emerald-300/[0.08] px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-emerald-100/80">
              <span className="h-1.5 w-1.5 animate-glowPulse rounded-full bg-emerald-300" />
              {tx.hud.live}
            </span>
          </div>
          <p className="mt-4 text-xl font-semibold tracking-[-0.03em] text-white md:text-2xl">
            {tx.hud.title}
          </p>
          <p className="mt-3 hidden text-sm leading-6 text-white/48 md:block">{tx.hud.desc}</p>
          <div className="mt-5 hidden grid-cols-3 gap-2 md:grid">
            {tx.hud.tags.map((item, index) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.07] bg-white/[0.035] px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50"
                style={{ animationDelay: `${index * 0.25}s` }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hud-panel relative p-4 md:p-5">
          <div className="absolute inset-x-5 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-200/22 to-transparent" />
          <div className="absolute left-1/2 top-5 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-transparent via-violet-200/16 to-transparent" />
          <div className="grid grid-cols-2 gap-3">
            {tx.hud.meters.map(([label, value], index) => {
              const widthClass = ["w-[96%]", "w-[92%]", "w-[88%]", "w-[74%]"][index];
              return (
                <div
                  key={label}
                  className={`relative rounded-2xl border border-white/[0.07] bg-black/18 p-3 ${
                    index > 1 ? "hidden md:block" : ""
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/36">{label}</p>
                  <p className="mt-3 text-lg font-semibold text-white/88 md:text-xl">{value}</p>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                    <span
                      className={`hud-meter block h-full rounded-full bg-gradient-to-r from-sky-300 to-violet-300 ${widthClass}`}
                      style={{ animationDelay: `${index * 0.18}s` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hud-panel hidden p-5 lg:block">
          <p className="text-[10px] tracking-[0.22em] text-violet-200/62">{tx.hud.queueEyebrow}</p>
          <div className="mt-5 space-y-4">
            {tx.hud.queue.map(([step, item], index) => (
              <div
                key={item}
                className="hud-row flex items-center gap-3 text-sm text-white/62"
                style={{ animationDelay: `${index * 0.28}s` }}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full border border-sky-200/14 bg-sky-300/[0.06] text-[10px] text-sky-100/70">
                  {step}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-white/[0.07] bg-black/18 p-3">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/36">
              <span>{tx.hud.signal}</span>
              <span>{tx.hud.stable}</span>
            </div>
            <div className="mt-3 flex h-10 items-end gap-1">
              {[40, 68, 52, 82, 60, 92, 76, 58, 86, 70].map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className="hud-bar flex-1 rounded-t bg-sky-300/55"
                  style={{ height: `${height}%`, animationDelay: `${index * 0.08}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemSnapshot() {
  const { tx } = useI18n();
  const fx = tx.focus;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25, margin: "-5% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="glass-border relative h-full overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-[#050712] p-5 sm:p-6"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative flex items-center justify-between gap-3">
        <p className="text-[11px] tracking-[0.18em] text-sky-200/70">{fx.snapshotEyebrow}</p>
        <span className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3 py-1 text-xs text-emerald-100">
          <span className="live-ring h-1.5 w-1.5 rounded-full bg-emerald-300" />
          {fx.snapshotStatus}
        </span>
      </div>

      <div className="relative mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-white/[0.06] bg-black/30 px-4 py-3 font-mono text-[12px] text-white/60">
        <span className="text-sky-200/80">GET</span>
        <span className="truncate text-white/80">{fx.snapshotEndpoint}</span>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/55">
          {fx.snapshotVersion}
        </span>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2 py-0.5 text-[10px] text-white/55">
          {fx.snapshotRegion}
        </span>
      </div>

      <div className="relative mt-5">
        <p className="text-[10px] tracking-[0.2em] text-white/42">{fx.snapshotMetricsEyebrow}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
          {fx.snapshotMetrics.map((m, idx) => {
            const trendUp = m.trend.startsWith("+");
            const numeric = parseFloat(m.value.replace(/[^0-9.]/g, ""));
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.45, delay: 0.1 + idx * 0.06 }}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.035] p-3 transition-colors hover:border-sky-300/30 hover:bg-sky-300/[0.05]"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-white">
                    {Number.isFinite(numeric) ? <CountUp to={numeric} suffix={m.suffix} /> : m.value + m.suffix}
                  </p>
                  <span
                    className={`text-[10px] font-semibold ${
                      trendUp ? "text-emerald-300" : "text-sky-300"
                    }`}
                  >
                    {trendUp ? "▲" : "▼"} {m.trend}
                  </span>
                </div>
                <p className="mt-1 text-[11px] tracking-[0.04em] text-white/50">{m.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="relative mt-5 rounded-2xl border border-white/[0.06] bg-black/24 p-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] tracking-[0.2em] text-white/42">{fx.snapshotServicesEyebrow}</p>
          <span className="text-[10px] text-emerald-200/70">{fx.snapshotServices.length} ok</span>
        </div>
        <div className="mt-3 space-y-2">
          {fx.snapshotServices.map((svc, idx) => (
            <motion.div
              key={svc.name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
              className="grid grid-cols-[12px_1fr_auto] items-center gap-3 text-xs text-white/68"
            >
              <span className="h-1.5 w-1.5 animate-glowPulse rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.7)]" />
              <div className="flex items-center gap-3">
                <span className="text-white/82">{svc.name}</span>
                <div className="hidden h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06] sm:block">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-emerald-300/70 via-sky-300/80 to-violet-300/70"
                    style={{ width: `${svc.level}%` }}
                  />
                </div>
              </div>
              <span className="font-mono text-[11px] text-white/50">{svc.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative mt-5 grid gap-3 sm:grid-cols-[1fr_0.7fr]">
        <div className="rounded-2xl border border-white/[0.06] bg-black/24 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] tracking-[0.2em] text-white/42">{fx.snapshotTrafficEyebrow}</p>
            <span className="text-[10px] text-sky-200/70">avg 142ms</span>
          </div>
          <div className="mt-3 flex h-12 items-end gap-1">
            {[42, 58, 64, 50, 72, 88, 76, 94, 70, 82, 66, 90].map((h, i) => (
              <span
                key={i}
                className="spark-bar block flex-1 rounded-t bg-gradient-to-t from-sky-400/30 via-sky-300/70 to-violet-300/80"
                style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-black/24 p-4">
          <p className="text-[10px] tracking-[0.2em] text-white/42">{fx.snapshotDeployLabel}</p>
          <p className="mt-2 text-sm font-semibold text-white/86">{fx.snapshotDeploy}</p>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-200/80">
            <span className="h-1 w-1 rounded-full bg-emerald-300" />
            {fx.snapshotChecks}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Content() {
  const { tx } = useI18n();
  return (
    <>
      <FloatingOrbs />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <motion.section
          id="profile"
          className="scroll-mt-32 grid gap-10 pt-24 pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:pb-20"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-8% 0px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <SectionEyebrow>{tx.profile.eyebrow}</SectionEyebrow>
          <div>
            <RevealText
              as="h2"
              className="max-w-4xl font-display text-3xl font-semibold leading-[1.04] tracking-[-0.03em] md:text-5xl"
            >
              {tx.profile.title}
            </RevealText>
            <div className="mt-8 grid gap-5 text-base leading-8 text-white/58 md:grid-cols-2">
              <RevealText as="p" delay={0.1}>{tx.profile.p1}</RevealText>
              <RevealText as="p" delay={0.2}>{tx.profile.p2}</RevealText>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="grid gap-px overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25, margin: "-8% 0px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {tx.cards.map(([label, value], index) => (
            <motion.div
              key={label}
              className="group relative overflow-hidden bg-[#050712] p-5 transition-colors hover:bg-[#0a0d1c]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
            >
              <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-[200%] -translate-x-full animate-shimmer bg-[linear-gradient(115deg,transparent_30%,rgba(125,211,252,0.07)_50%,transparent_70%)] [animation-play-state:paused] group-hover:[animation-play-state:running]" />
              <p className="text-[11px] tracking-[0.18em] text-sky-200/60">{label}</p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white/88">{value}</p>
            </motion.div>
          ))}
        </motion.section>

        <section id="services" className="scroll-mt-32 py-16 md:py-20">
          <SectionHeader eyebrow={tx.services.eyebrow} title={tx.services.title} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {tx.services.items.map(([title, copy], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2, margin: "-8% 0px" }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.25), ease: "easeOut" }}
              >
                <TiltCard3D strength={6} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-[1.4rem] border border-white/[0.07] bg-white/[0.025] p-6 transition-colors hover:border-sky-300/30 hover:bg-white/[0.045]">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-400/[0.06] blur-3xl transition-opacity duration-500 group-hover:opacity-100 lg:opacity-0" />
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] tracking-[0.18em] text-white/32">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-12 bg-gradient-to-r from-sky-300/70 to-transparent transition-all duration-500 group-hover:w-20" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] md:text-2xl">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/55 md:text-base">{copy}</p>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="work" className="scroll-mt-32 py-16 md:py-20">
          <SectionHeader eyebrow={tx.work.eyebrow} title={tx.work.title} />
          <div className="mt-10 space-y-4">
            {tx.work.items.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2, margin: "-8% 0px" }}
                transition={{ duration: 0.65, delay: index * 0.06, ease: "easeOut" }}
              >
                <TiltCard3D strength={4}>
                  <div className="group relative grid gap-5 overflow-hidden rounded-[1.4rem] border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-500 hover:border-violet-300/25 hover:bg-white/[0.04] md:grid-cols-[0.42fr_0.58fr] md:p-6">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-sky-300/0 via-violet-300/40 to-sky-300/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-[11px] tracking-[0.18em] text-violet-200/58">{project.type}</p>
                        <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-white/48">{project.metric}</span>
                      </div>
                      <h3 className="mt-10 font-display text-3xl font-semibold tracking-[-0.03em]">
                        {project.title}
                      </h3>
                    </div>
                    <p className="self-end leading-7 text-white/60">{project.copy}</p>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="process" className="scroll-mt-32 grid gap-10 py-16 md:py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionEyebrow>{tx.process.eyebrow}</SectionEyebrow>
            <RevealText
              as="h2"
              className="mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl"
            >
              {tx.process.title}
            </RevealText>
          </div>
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {tx.process.steps.map((item, index) => (
              <motion.div
                key={item}
                className="grid gap-4 py-6 sm:grid-cols-[80px_1fr]"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3, margin: "-8% 0px" }}
                transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
              >
                <span className="text-sm font-semibold text-sky-200/70">0{index + 1}</span>
                <p className="text-lg leading-8 text-white/70">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="stack" className="scroll-mt-32 py-16 md:py-20">
          <SectionHeader eyebrow={tx.stack.eyebrow} title={tx.stack.title} />
          <div className="mt-10 space-y-3">
            <Marquee items={stack.slice(0, 13)} />
            <Marquee items={stack.slice(13)} reverse />
          </div>
        </section>

        <section id="focus" className="scroll-mt-32 grid gap-6 py-16 md:py-20 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeader eyebrow={tx.focus.eyebrow} title={tx.focus.title} />
            <div className="mt-9 divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] backdrop-blur-2xl">
              {tx.focus.items.map(([title, copy], index) => (
                <motion.div
                  key={title}
                  className="group grid gap-2 p-5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[0.35fr_0.65fr]"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
                >
                  <p className="font-semibold text-white/86 transition-colors group-hover:text-sky-200">{title}</p>
                  <p className="text-sm leading-7 text-white/52">{copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <TiltCard3D strength={4}>
            <SystemSnapshot />
          </TiltCard3D>
        </section>

        <section className="py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2, margin: "-10% 0px" }}
            transition={{ duration: 0.7 }}
            className="glass-border rounded-[2rem] border border-white/[0.08] bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,.16),transparent_28rem),radial-gradient(circle_at_84%_40%,rgba(139,92,246,.12),transparent_25rem),rgba(255,255,255,.035)] p-6 backdrop-blur-2xl sm:p-8 lg:p-10"
          >
            <div className="max-w-3xl">
              <SectionEyebrow>{tx.fit.eyebrow}</SectionEyebrow>
              <RevealText
                as="h2"
                className="mt-4 font-display text-2xl font-semibold leading-[1.18] tracking-[-0.02em] [text-wrap:balance] sm:text-3xl md:text-[2.6rem] md:leading-[1.12]"
              >
                {tx.fit.title}
              </RevealText>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
              {tx.fit.items.map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4, margin: "-5% 0px" }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="group flex h-full items-start gap-3 rounded-2xl border border-white/[0.06] bg-black/22 p-4 text-sm leading-6 text-white/68 transition-all hover:-translate-y-0.5 hover:border-sky-200/30 hover:bg-black/40 hover:text-white"
                >
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300/60 transition-all group-hover:bg-sky-300 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
                  <span className="[text-wrap:pretty]">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="contact" className="scroll-mt-32 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2, margin: "-8% 0px" }}
            transition={{ duration: 0.75 }}
            className="glass-border grid gap-8 rounded-[2rem] border border-white/[0.09] bg-white/[0.045] p-6 shadow-[0_26px_110px_rgba(0,0,0,.32)] backdrop-blur-2xl sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10"
          >
            <div>
              <p className="text-[11px] tracking-[0.22em] text-sky-200/70">{tx.contact.eyebrow}</p>
              <RevealText
                as="h2"
                className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl"
              >
                {tx.contact.title}
              </RevealText>
              <p className="mt-6 max-w-2xl leading-8 text-white/55">{tx.contact.desc}</p>
              <div className="mt-8 grid gap-3 text-sm text-white/68 sm:grid-cols-3">
                {[
                  {
                    label: tx.contact.emailLabel,
                    value: "khun.chakkri@gmail.com",
                    href: "mailto:khun.chakkri@gmail.com",
                    external: false,
                  },
                  {
                    label: tx.contact.githubLabel,
                    value: "github.com/cxndizz",
                    href: "https://github.com/cxndizz",
                    external: true,
                  },
                  {
                    label: tx.contact.fastworkLabel,
                    value: tx.contact.fastworkValue,
                    href: "https://fastwork.co/user/aueasiripracha",
                    external: true,
                  },
                ].map((c, idx) => (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noreferrer" : undefined}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: 0.05 + idx * 0.07 }}
                    whileHover={{ y: -4 }}
                    className="flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-black/22 p-4 transition-colors hover:border-sky-200/40 hover:bg-sky-300/[0.06]"
                  >
                    <span className="text-[11px] tracking-[0.18em] text-white/42">{c.label}</span>
                    <span className="break-all text-sm text-white/86">{c.value}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-end gap-3 sm:flex-row lg:flex-col">
              <MagneticLink
                href="mailto:khun.chakkri@gmail.com"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-sky-100"
              >
                {tx.contact.cta1}
              </MagneticLink>
              <MagneticLink
                href="#work"
                className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3 text-center text-sm font-semibold text-white/78 transition hover:bg-white/[0.06]"
              >
                {tx.contact.cta2}
              </MagneticLink>
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </>
  );
}

function Footer() {
  const { tx } = useI18n();
  return (
    <footer className="relative border-t border-white/[0.06] bg-black/22">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.2em]">CXN</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/45">{tx.footer.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/45">
          {tx.footer.links.map(([label, href]) => (
            <a key={href} className="transition hover:text-white" href={href}>
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 pb-8 text-xs tracking-[0.14em] text-white/30 sm:px-8 md:flex-row md:justify-between">
        <p>{tx.footer.copy}</p>
        <p>{tx.footer.built}</p>
      </div>
    </footer>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.22em] text-sky-200/68">{children}</p>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <RevealText
        as="h2"
        className="mt-5 max-w-4xl font-display text-3xl font-semibold leading-[1.04] tracking-[-0.03em] md:text-5xl"
      >
        {title}
      </RevealText>
    </div>
  );
}
