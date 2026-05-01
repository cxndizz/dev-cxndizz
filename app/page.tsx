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
  { label: "เกี่ยวกับฉัน", href: "#profile" },
  { label: "บริการ", href: "#services" },
  { label: "ผลงาน", href: "#work" },
  { label: "กระบวนการ", href: "#process" },
  { label: "โฟกัสปัจจุบัน", href: "#focus" },
];

const services = [
  {
    title: "ระบบ Full Stack Web App",
    copy: "พัฒนาเว็บแอปพลิเคชันแบบครบวงจร สำหรับงาน booking, commerce และเครื่องมือภายในองค์กร ตั้งแต่ frontend จนถึง backend และ database",
  },
  {
    title: "Backend & API Development",
    copy: "ออกแบบและสร้าง API ที่บำรุงรักษาง่าย ด้วย Spring Boot, Node.js, NestJS และ Express เน้นโครงสร้างที่สะอาดและขยายตัวได้",
  },
  {
    title: "Database & ระบบจัดการข้อมูล",
    copy: "ออกแบบฐานข้อมูลที่รองรับการใช้งานจริง ด้วย PostgreSQL, Oracle, MySQL, MongoDB พร้อม Prisma ORM และระบบ cache ด้วย Redis",
  },
  {
    title: "Frontend ที่เน้น UX จริงจัง",
    copy: "สร้างหน้าจอที่ตอบสนองดีและใช้งานสะดวก ด้วย Next.js, React, TypeScript, Tailwind CSS และ Bootstrap",
  },
  {
    title: "LINE Integration & Automation",
    copy: "เชื่อมระบบเข้ากับ LINE และสร้าง workflow อัตโนมัติเพื่อลดงานซ้ำซ้อนภายในองค์กร พร้อมการแจ้งเตือนแบบ real-time",
  },
  {
    title: "Production-Ready Architecture",
    copy: "วางสถาปัตยกรรมระบบที่พร้อมขึ้น production ด้วย Docker, Kubernetes, Nginx รวมถึงการนำ AI เข้ามาใช้ในงานจริง",
  },
];

const projects = [
  {
    title: "ระบบจองคิวออนไลน์",
    type: "Full Stack Web App",
    metric: "Next.js + Spring Boot",
    copy: "ระบบจองคิวและจัดตารางเวลาแบบครบวงจร พร้อมการแจ้งเตือนผ่าน LINE และหน้า admin ที่จัดการง่าย รองรับการใช้งานพร้อมกันจำนวนมาก",
  },
  {
    title: "ระบบ E-Commerce",
    type: "Backend + Frontend",
    metric: "Node.js + PostgreSQL",
    copy: "เว็บแอปขายของออนไลน์ พร้อมระบบสมาชิก ตะกร้าสินค้า การชำระเงิน และแดชบอร์ดผู้ดูแลระบบที่ยืดหยุ่นต่อการเพิ่มฟีเจอร์ใหม่",
  },
  {
    title: "เครื่องมือภายในองค์กร",
    type: "Internal Tool",
    metric: "Laravel + Oracle",
    copy: "ระบบจัดการงานเอกสารและข้อมูลภายในองค์กร เชื่อมกับ Oracle Database และมีสคริปต์ automation ที่ช่วยให้ทีมงานลดเวลาทำงานซ้ำได้จริง",
  },
];

const process = [
  "ทำความเข้าใจโจทย์และเป้าหมายของระบบ ตัดส่วนที่ยังไม่ชัดเจนออกก่อนเริ่มเขียนโค้ดจริง",
  "สร้าง flow หลักให้ใช้งานได้ก่อน แล้วค่อยเก็บรายละเอียด edge case รวมถึงการเชื่อมต่อกับระบบอื่น",
  "ส่งงานเป็นรอบสั้น ๆ พร้อมเอกสารที่ชัดเจน และทดสอบให้พร้อมขึ้น production ได้ทันที",
];

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
];

const capabilityRows = [
  ["Full Stack Workflow", "พัฒนาทั้งฝั่ง frontend และ backend ให้สอดคล้องกัน เพื่อสร้าง product flow ที่ดีขึ้นและส่งมอบเร็ว"],
  ["Backend & Database", "ปรับปรุงสถาปัตยกรรมรอบ ๆ บริการ backend และฐานข้อมูลให้เสถียร ขยายตัวได้ และดูแลรักษาง่าย"],
  ["AI & Automation", "ทดลองใช้ AI และ automation ในโปรเจกต์จริง เพื่อช่วยให้ทีมงานทำงานเร็วขึ้นและลดงานซ้ำซ้อน"],
  ["LINE & Integration", "เชื่อมระบบเข้ากับ LINE OA และบริการภายนอก เพื่อตอบสนองผู้ใช้แบบทันทีและทำงานอัตโนมัติ"],
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
              alt="ภาพดวงจันทร์ลอยขึ้นเหนือพื้นที่อวกาศสีดำ"
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
                  Full Stack Developer
                </div>
                <h1 className="max-w-[980px] text-[clamp(3.25rem,6.7vw,7.4rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-white">
                  พัฒนาเว็บแอปที่เน้น backend แข็งแรง และ product mindset ที่ใช้ได้จริง
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 sm:text-lg md:text-xl">
                  Full Stack Developer ที่ทำงานอยู่ตรงจุดตัดระหว่าง UI ที่สะอาด, API ที่เชื่อถือได้ และฐานข้อมูลที่ออกแบบมาเพื่อรองรับการใช้งานจริง
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black shadow-[0_16px_50px_rgba(255,255,255,.12)] transition hover:bg-sky-100"
                  >
                    เริ่มโปรเจกต์
                  </a>
                  <a
                    href="#work"
                    className="rounded-full border border-white/16 bg-white/[0.045] px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur-xl transition hover:border-sky-200/45 hover:bg-sky-300/10"
                  >
                    ดูผลงาน
                  </a>
                </div>
              </div>

              <GlassCard className="hidden rounded-2xl bg-black/24 p-5 lg:block">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">พร้อมรับงาน</p>
                <p className="mt-3 text-xl font-semibold leading-snug tracking-[-0.03em]">
                  ระบบ Full Stack, Backend และฐานข้อมูลที่ออกแบบมาเพื่อใช้งานจริง
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-2xl font-semibold text-sky-100">25+</p>
                    <p className="mt-1 text-white/42">เทคโนโลยีที่ใช้</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-violet-100">1:1</p>
                    <p className="mt-1 text-white/42">ส่งมอบงานตรง</p>
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
        <div className="hidden items-center gap-1 rounded-full bg-white/[0.035] p-1 text-[11px] font-medium tracking-[0.12em] text-white/58 lg:flex">
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
          className="rounded-full bg-sky-300 px-4 py-2 text-xs font-bold tracking-[0.08em] text-black shadow-[0_0_34px_rgba(56,189,248,.24)] transition hover:bg-white"
        >
          ติดต่อฉัน
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
              สถานะระบบ
            </p>
            <span className="rounded-full border border-emerald-300/18 bg-emerald-300/[0.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-100/80">
              ออนไลน์
            </span>
          </div>
          <p className="mt-4 text-xl font-semibold tracking-[-0.04em] text-white md:text-2xl">
            ระบบพร้อมใช้งาน
          </p>
          <p className="mt-3 hidden text-sm leading-6 text-white/48 md:block">
            UI, API, Database และระบบ automation ทำงานสอดประสานกันเป็น build เดียว
          </p>
          <div className="mt-5 hidden grid-cols-3 gap-2 md:grid">
            {["UI", "API", "DB"].map((item, index) => (
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
              ["Backend", "92%", "w-[92%]"],
              ["Database", "88%", "w-[88%]"],
              ["DevOps", "74%", "w-[74%]"],
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
          <p className="text-[10px] uppercase tracking-[0.22em] text-violet-200/62">ลำดับงาน</p>
          <div className="mt-5 space-y-4">
            {[
              ["01", "วางขอบเขตชัดเจน"],
              ["02", "Prototype พร้อมทดสอบ"],
              ["03", "ส่งขึ้น Production"],
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
              <span>สัญญาณ</span>
              <span>เสถียร</span>
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
          <SectionEyebrow>เกี่ยวกับฉัน</SectionEyebrow>
          <div>
            <h2 className="max-w-4xl text-3xl font-semibold leading-[1.04] tracking-[-0.04em] md:text-6xl">
              พัฒนาเว็บแอปด้วย backend ที่แข็งแรง บน mindset ของ product engineering ที่ใช้งานได้จริง
            </h2>
            <div className="mt-8 grid gap-5 text-base leading-8 text-white/58 md:grid-cols-2">
              <p>
                งานของฉันอยู่ตรงจุดตัดระหว่าง UI ที่สะอาด, API ที่เชื่อถือได้ และฐานข้อมูลที่ออกแบบมาให้รองรับการใช้งานจริงในระยะยาว
              </p>
              <p>
                สนใจเรื่อง AI, system design, Kubernetes และสถาปัตยกรรมที่พร้อม production สามารถทำงานได้ตั้งแต่ frontend UX ไปจนถึง backend และ deployment workflow
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
            ["จุดเด่น", "Full Stack Web App, Backend, Database"],
            ["สไตล์การทำงาน", "ตรงไปตรงมา มีเอกสาร ทำงานแบบ async ได้"],
            ["ประสบการณ์", "Frontend ที่ละเอียด + Backend ที่เข้าใจ business"],
          ].map(([label, value]) => (
            <div key={label} className="bg-[#050712] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-sky-200/60">{label}</p>
              <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white/88">{value}</p>
            </div>
          ))}
        </motion.section>

        <section id="services" className="scroll-mt-32 py-16 md:py-20">
          <SectionHeader eyebrow="บริการ" title="งานเขียนโค้ดที่ทำให้ product พร้อมใช้งานจริงตั้งแต่บรรทัดแรก" />
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
          <SectionHeader eyebrow="ผลงานที่เลือกมา" title="ตัวอย่างงานที่ออกแบบมาเพื่อใช้งานจริง ไม่ใช่แค่ demo" />
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
            <SectionEyebrow>กระบวนการทำงาน</SectionEyebrow>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-5xl">
              ส่งมอบงานอย่างเรียบง่าย ตัดสินใจชัดเจน ไม่มีความซับซ้อนที่ไม่จำเป็น
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
          <SectionHeader eyebrow="Core Stack" title="เครื่องมือที่ใช้จริง เลือกมาเพื่อความเร็ว ดูแลง่าย และพร้อม deploy" />
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

        <section id="focus" className="scroll-mt-32 grid gap-6 py-16 md:py-20 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeader eyebrow="โฟกัสปัจจุบัน" title="กำลังทำอะไร และสนใจเรื่องไหนเป็นพิเศษในตอนนี้" />
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
              <p className="text-[11px] uppercase tracking-[0.24em] text-sky-200/70">ภาพรวมระบบ</p>
              <span className="rounded-full border border-emerald-300/18 bg-emerald-300/[0.08] px-3 py-1 text-xs text-emerald-100">
                Stable
              </span>
            </div>
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-black/32 p-5">
              <p className="text-sm text-white/45">api.cxndizz.dev</p>
              <p className="mt-3 text-5xl font-semibold tracking-[-0.05em]">99.8%</p>
              <div className="mt-7 grid grid-cols-2 gap-3 text-sm text-white/62">
                {["API Health", "DB Status", "Cache Layer", "Background Jobs"].map((item) => (
                  <div key={item} className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/45">
              ตัวอย่างการ์ดสรุปสถานะระบบ ใช้แสดง health check ของ API, ฐานข้อมูล และ background job ในรูปแบบที่อ่านง่าย
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="rounded-[2rem] border border-white/[0.08] bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,.16),transparent_28rem),radial-gradient(circle_at_84%_40%,rgba(139,92,246,.12),transparent_25rem),rgba(255,255,255,.035)] p-6 backdrop-blur-2xl sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionEyebrow>เหมาะกับใคร</SectionEyebrow>
              <div>
                <h2 className="text-3xl font-semibold leading-[1.04] tracking-[-0.04em] md:text-5xl">
                  เหมาะกับเจ้าของไอเดียและทีมที่ต้องการคนสร้างจริง ไม่ใช่แค่คนรับงานต่อ
                </h2>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "มีไอเดียโปรดักต์ชัดเจน แต่ต้องการคนช่วย execute ให้ได้จริง",
                    "ต้องการ frontend ที่ละเอียดและ backend ที่ตามมาได้ครบ",
                    "อยากได้ระบบที่เชื่อมกับ LINE หรือ workflow อัตโนมัติ",
                    "ใส่ใจรายละเอียดบนทุกอุปกรณ์และความเสถียรของระบบ",
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
              <p className="text-[11px] uppercase tracking-[0.28em] text-sky-200/70">ติดต่อฉัน</p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1] tracking-[-0.05em] md:text-6xl">
                มาช่วยกันสร้างส่วนของ product ที่ผู้ใช้สัมผัสจริง ๆ
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-white/55">
                บอกเป้าหมายของโปรดักต์ สถานะปัจจุบัน และส่วนที่กังวลที่สุดมาได้เลย จะช่วยวางแผนการพัฒนาที่ใช้งานได้จริงให้
              </p>
              <div className="mt-8 grid gap-3 text-sm text-white/68 sm:grid-cols-2">
                <a
                  href="mailto:khun.chakkri@gmail.com"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-black/22 p-4 transition hover:border-sky-200/40 hover:bg-sky-300/[0.06]"
                >
                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/42">Email</span>
                  <span className="text-white/86">khun.chakkri@gmail.com</span>
                </a>
                <a
                  href="https://github.com/cxndizz"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-black/22 p-4 transition hover:border-sky-200/40 hover:bg-sky-300/[0.06]"
                >
                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/42">GitHub</span>
                  <span className="text-white/86">github.com/cxndizz</span>
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-end gap-3 sm:flex-row lg:flex-col">
              <a href="mailto:khun.chakkri@gmail.com" className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-sky-100">
                ส่งอีเมลหาฉัน
              </a>
              <a href="#work" className="rounded-full border border-white/14 px-6 py-3 text-center text-sm font-semibold text-white/78 transition hover:bg-white/[0.06]">
                ดูผลงานเพิ่มเติม
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
            Full Stack Developer ที่เน้นการพัฒนาเว็บแอป ระบบ backend และ database ที่ออกแบบมาเพื่อใช้งานจริง
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/45">
          <a className="transition hover:text-white" href="#profile">เกี่ยวกับฉัน</a>
          <a className="transition hover:text-white" href="#services">บริการ</a>
          <a className="transition hover:text-white" href="#work">ผลงาน</a>
          <a className="transition hover:text-white" href="#contact">ติดต่อ</a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 pb-8 text-xs uppercase tracking-[0.2em] text-white/30 sm:px-8 md:flex-row md:justify-between">
        <p>© 2026 CXN. สงวนลิขสิทธิ์</p>
        <p>ออกแบบมาเพื่อความเร็วและตอบสนองทุกอุปกรณ์</p>
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
