"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import moon from "../img/moon.webp";

const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Web3", href: "#web3" },
];

const services = [
  {
    title: "Product Frontends",
    copy: "Responsive interfaces for dashboards, marketplaces, portals, and client-facing SaaS workflows.",
  },
  {
    title: "Backend & APIs",
    copy: "Typed APIs, database models, integrations, auth, background jobs, and operational tooling.",
  },
  {
    title: "Automation Systems",
    copy: "Internal systems that remove repetitive work: approvals, alerts, scheduled jobs, and data syncs.",
  },
  {
    title: "SaaS MVP Builds",
    copy: "From scope to launch: product architecture, feature delivery, admin tools, and deployment readiness.",
  },
  {
    title: "Web3 Interfaces",
    copy: "Wallet-aware screens, read-only contract data, token views, and transaction preview patterns.",
  },
  {
    title: "Technical Rescue",
    copy: "Stabilizing slow, fragile, or unfinished builds with clean refactors and practical delivery plans.",
  },
];

const projects = [
  {
    title: "Atlas Client OS",
    type: "SaaS portal",
    metric: "4 week MVP",
    copy: "A secure workspace for project approvals, payment states, task history, and client handoff.",
  },
  {
    title: "Signal Vault",
    type: "Web3 frontend",
    metric: "read-only demo",
    copy: "Wallet-style portfolio screens, contract status panels, and token metadata views without requiring signatures.",
  },
  {
    title: "Ops Relay",
    type: "Automation",
    metric: "12 workflows",
    copy: "Queue-based automation for notifications, CRM sync, review steps, and weekly reporting.",
  },
];

const process = [
  "Scope the product surface and remove unclear work before code starts.",
  "Build the core flow first, then harden edge cases, states, and integrations.",
  "Ship in short review loops with clean handoff notes and production-minded defaults.",
];

const stack = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind",
  "Framer Motion",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "REST",
  "GraphQL",
  "Viem",
  "Wagmi",
  "Ethers",
];

const capabilityRows = [
  ["Wallet state", "Connect flows, account views, network states, and graceful disconnected screens."],
  ["Contract panels", "Read/write form layouts, validation, estimated costs, and clear confirmation states."],
  ["Asset views", "Token balances, NFT metadata, activity tables, and portfolio-style UI patterns."],
  ["No-risk demos", "Placeholder transaction flows for pitch decks, product demos, and internal prototypes."],
];

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
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
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

export default function Home() {
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
    <main className="relative min-h-screen overflow-x-clip bg-void text-white">
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
              alt="Realistic moon rising across a black space banner"
              priority
              fill
              sizes="100vw"
              className="relative object-cover object-bottom opacity-100 brightness-[1.18] contrast-[1.08] drop-shadow-[0_-28px_96px_rgba(56,189,248,0.18)]"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,#02030a_0%,rgba(2,3,10,.94)_17%,rgba(2,3,10,.76)_42%,rgba(2,3,10,.08)_76%,rgba(2,3,10,.5)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[32vh] bg-[linear-gradient(180deg,transparent_0%,rgba(2,3,10,.3)_36%,#02030a_100%)]" />

          <motion.div
            className="relative z-30 mx-auto flex h-full max-w-7xl transform-gpu items-center px-5 pt-24 will-change-transform sm:px-8 lg:pt-20"
            style={{
              y: reduceMotion ? 0 : heroTextY,
              opacity: reduceMotion ? 1 : heroTextOpacity,
            }}
          >
            <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="max-w-4xl">
                <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-black/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-sky-100/90 shadow-[0_18px_70px_rgba(0,0,0,.28)] backdrop-blur-2xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(56,189,248,.95)]" />
                  Independent Software Engineer
                </div>
                <h1 className="max-w-[980px] text-[clamp(3.25rem,6.7vw,7.4rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-white">
                  Building digital products beyond ordinary.
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg md:text-xl">
                  Freelance programmer crafting modern web apps, automation systems, and Web3-ready digital experiences.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black shadow-[0_16px_50px_rgba(255,255,255,.12)] transition hover:bg-sky-100"
                  >
                    Start a Project
                  </a>
                  <a
                    href="#work"
                    className="rounded-full border border-white/16 bg-white/[0.045] px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur-xl transition hover:border-sky-200/45 hover:bg-sky-300/10"
                  >
                    View Work
                  </a>
                </div>
              </div>

              <GlassCard className="hidden rounded-2xl bg-black/24 p-5 lg:block">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">Now Booking</p>
                <p className="mt-3 text-xl font-semibold leading-snug tracking-[-0.03em]">
                  Product builds, automation, and interface systems.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-2xl font-semibold text-sky-100">6+</p>
                    <p className="mt-1 text-white/42">Build lanes</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-violet-100">1:1</p>
                    <p className="mt-1 text-white/42">Direct delivery</p>
                  </div>
                </div>
              </GlassCard>
            </div>
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

      <div className="relative z-30 bg-[linear-gradient(180deg,#02030a_0%,#050713_34%,#03040c_100%)]">
        <Content />
      </div>
    </main>
  );
}

function FloatingNav() {
  return (
    <nav className="fixed left-0 right-0 top-4 z-50 px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full bg-black/34 px-4 py-3 shadow-[0_18px_80px_rgba(0,0,0,.32)] ring-1 ring-white/[0.08] backdrop-blur-2xl sm:px-5">
        <a href="#" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-white">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[11px] tracking-[-0.02em] text-black">
            CX
          </span>
          <span className="hidden sm:inline">CXN</span>
        </a>
        <div className="hidden items-center gap-1 rounded-full bg-white/[0.035] p-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/58 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-white/[0.07] hover:text-white"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-full bg-sky-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black shadow-[0_0_34px_rgba(56,189,248,.24)] transition hover:bg-white"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}

function DisplayState() {
  return (
    <div className="hud-shell relative overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-[#050712]/88 shadow-[0_28px_110px_rgba(0,0,0,.45)] md:rounded-[1.8rem]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(56,189,248,.15),transparent_18rem),radial-gradient(circle_at_82%_72%,rgba(139,92,246,.13),transparent_20rem)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/60 to-transparent" />
      <div className="relative grid gap-px bg-white/[0.055] lg:grid-cols-[0.82fr_1.04fr_0.82fr]">
        <div className="hud-panel p-4 md:p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-200/72">
              Display State
            </p>
            <span className="rounded-full border border-emerald-300/18 bg-emerald-300/[0.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-100/80">
              Live
            </span>
          </div>
          <p className="mt-4 text-xl font-semibold tracking-[-0.04em] text-white md:text-2xl">
            Product system online
          </p>
          <p className="mt-3 hidden text-sm leading-6 text-white/48 md:block">
            UI, API, automation, and wallet-ready surfaces moving as one build.
          </p>
          <div className="mt-5 hidden grid-cols-3 gap-2 md:grid">
            {["UI", "API", "OPS"].map((item, index) => (
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
            {[
              ["Frontend", "96%", "w-[96%]"],
              ["API Layer", "88%", "w-[88%]"],
              ["Automation", "74%", "w-[74%]"],
              ["Web3 UI", "Preview", "w-[64%]"],
            ].map(([label, value, width], index) => (
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
                    className={`hud-meter block h-full rounded-full bg-gradient-to-r from-sky-300 to-violet-300 ${width}`}
                    style={{ animationDelay: `${index * 0.18}s` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hud-panel hidden p-5 lg:block">
          <p className="text-[10px] uppercase tracking-[0.22em] text-violet-200/62">Motion Queue</p>
          <div className="mt-5 space-y-4">
            {[
              ["01", "Scope locked"],
              ["02", "Prototype moving"],
              ["03", "Launch path clear"],
            ].map(([step, item], index) => (
              <div key={item} className="hud-row flex items-center gap-3 text-sm text-white/62" style={{ animationDelay: `${index * 0.28}s` }}>
                <span className="grid h-7 w-7 place-items-center rounded-full border border-sky-200/14 bg-sky-300/[0.06] text-[10px] text-sky-100/70">
                  {step}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-white/[0.07] bg-black/18 p-3">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/36">
              <span>Signal</span>
              <span>Stable</span>
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

function Content() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <motion.section
          id="profile"
          className="scroll-mt-32 grid gap-10 pt-24 pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:pb-20"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <SectionEyebrow>Profile</SectionEyebrow>
          <div>
            <h2 className="max-w-4xl text-3xl font-semibold leading-[1.04] tracking-[-0.04em] md:text-6xl">
              I turn product ideas into clean, durable software that feels ready for real users.
            </h2>
            <div className="mt-8 grid gap-5 text-base leading-8 text-white/58 md:grid-cols-2">
              <p>
                My work sits between product design and engineering: clear interfaces, practical architecture, typed data flows, and smooth user states.
              </p>
              <p>
                I help founders, teams, and operators ship web apps, MVPs, automations, and Web3-facing UI without turning the product into a science project.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="grid gap-px overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-white/[0.07] sm:grid-cols-3"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {[
            ["Build focus", "Web apps, dashboards, SaaS MVPs"],
            ["Delivery style", "Async-friendly, direct, documented"],
            ["Experience layer", "Frontend polish with backend judgment"],
          ].map(([label, value]) => (
            <div key={label} className="bg-[#050712] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-sky-200/60">{label}</p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white/88">{value}</p>
            </div>
          ))}
        </motion.section>

        <section id="services" className="scroll-mt-32 py-16 md:py-20">
          <SectionHeader eyebrow="Services" title="Senior execution for the parts that make a product feel finished." />
          <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="grid gap-4 py-6 md:grid-cols-[0.18fr_0.32fr_0.5fr] md:items-start"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.58, ease: "easeOut", delay: Math.min(index * 0.04, 0.18) }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-white/32">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-12 bg-gradient-to-r from-sky-300/70 to-transparent" />
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.025em] md:text-2xl">{service.title}</h3>
                <p className="max-w-2xl text-sm leading-7 text-white/54 md:text-base">{service.copy}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="work" className="scroll-mt-32 py-16 md:py-20">
          <SectionHeader eyebrow="Selected Work" title="Representative builds with product-grade structure." />
          <div className="mt-10 space-y-4">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className="grid gap-5 rounded-[1.4rem] border border-white/[0.08] bg-white/[0.025] p-5 md:grid-cols-[0.42fr_0.58fr] md:p-6"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-violet-200/58">{project.type}</p>
                    <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-white/48">{project.metric}</span>
                  </div>
                  <h3 className="mt-10 text-3xl font-semibold tracking-[-0.04em]">{project.title}</h3>
                </div>
                <p className="self-end leading-7 text-white/55">{project.copy}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="process" className="scroll-mt-32 grid gap-10 py-16 md:py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionEyebrow>Process</SectionEyebrow>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-5xl">
              Calm delivery. Clear decisions. No theatrical complexity.
            </h2>
          </div>
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {process.map((item, index) => (
              <motion.div
                key={item}
                className="grid gap-4 py-6 sm:grid-cols-[80px_1fr]"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.05 }}
              >
                <span className="text-sm font-semibold text-sky-200/70">0{index + 1}</span>
                <p className="text-lg leading-8 text-white/70">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="stack" className="scroll-mt-32 py-16 md:py-20">
          <SectionHeader eyebrow="Tech Stack" title="Modern tools chosen for speed, maintainability, and deployment." />
          <div className="mt-10 flex flex-wrap gap-3">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-sm text-white/66 backdrop-blur-xl"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section id="web3" className="scroll-mt-32 grid gap-6 py-16 md:py-20 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeader eyebrow="Web3 Capabilities" title="Wallet-style product experiences without casino energy." />
            <div className="mt-9 divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] backdrop-blur-2xl">
              {capabilityRows.map(([title, copy]) => (
                <div key={title} className="grid gap-2 p-5 sm:grid-cols-[0.35fr_0.65fr]">
                  <p className="font-semibold text-white/86">{title}</p>
                  <p className="text-sm leading-7 text-white/52">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.6rem] border border-white/[0.08] bg-[#050712] p-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.24em] text-sky-200/70">Demo wallet card</p>
              <span className="rounded-full border border-emerald-300/18 bg-emerald-300/[0.08] px-3 py-1 text-xs text-emerald-100">
                No transactions
              </span>
            </div>
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-black/32 p-5">
              <p className="text-sm text-white/45">0x8f34...A91c</p>
              <p className="mt-3 text-5xl font-semibold tracking-[-0.05em]">12.84 ETH</p>
              <div className="mt-7 grid grid-cols-2 gap-3 text-sm text-white/62">
                {["Gas preview", "Contract state", "Token metadata", "Read-only calls"].map((item) => (
                  <div key={item} className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/45">
              Placeholder smart contract UI demos only. No wallet connection, signatures, or real blockchain transactions are required.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="rounded-[2rem] border border-white/[0.08] bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,.16),transparent_28rem),radial-gradient(circle_at_84%_40%,rgba(139,92,246,.12),transparent_25rem),rgba(255,255,255,.035)] p-6 backdrop-blur-2xl sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionEyebrow>Fit</SectionEyebrow>
              <div>
                <h2 className="text-3xl font-semibold leading-[1.04] tracking-[-0.04em] md:text-5xl">
                  Best for founders and teams who need a capable builder, not a handoff maze.
                </h2>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "You have a product direction but need execution clarity.",
                    "You need frontend polish and backend follow-through.",
                    "You want a Web3 demo without forcing wallet setup.",
                    "You care about responsive details across devices.",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl bg-black/22 p-4 text-sm leading-7 text-white/58">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-32 py-16 md:py-20">
          <div className="grid gap-8 rounded-[2rem] border border-white/[0.09] bg-white/[0.045] p-6 shadow-[0_26px_110px_rgba(0,0,0,.32)] backdrop-blur-2xl sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-sky-200/70">Contact</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1] tracking-[-0.05em] md:text-6xl">
                Let’s build the part of your product users actually touch.
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-white/55">
                Send the product goal, current stage, and the highest-risk piece. I’ll help shape a practical build path.
              </p>
            </div>
            <div className="flex flex-col justify-end gap-3 sm:flex-row lg:flex-col">
              <a href="mailto:hello@example.com" className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-sky-100">
                Start a Project
              </a>
              <a href="#work" className="rounded-full border border-white/14 px-6 py-3 text-center text-sm font-semibold text-white/78 transition hover:bg-white/[0.06]">
                Review Work
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/22">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">CXN</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/45">
            Freelance software engineering for polished web products, automation systems, and Web3-ready interfaces.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/45">
          <a className="transition hover:text-white" href="#profile">Profile</a>
          <a className="transition hover:text-white" href="#services">Services</a>
          <a className="transition hover:text-white" href="#work">Work</a>
          <a className="transition hover:text-white" href="#contact">Contact</a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 pb-8 text-xs uppercase tracking-[0.2em] text-white/30 sm:px-8 md:flex-row md:justify-between">
        <p>© 2026 CXN. All rights reserved.</p>
        <p>Built for fast, responsive delivery.</p>
      </div>
    </footer>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-200/68">
      {children}
    </p>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-[1.04] tracking-[-0.04em] md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
