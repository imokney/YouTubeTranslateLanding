import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Flag from "./components/Flag";
import {
  ArrowRight,
  PlayCircle,
  Globe2,
  Subtitles,
  //Mic2,
  //Clapperboard,
  Globe,
  CircleDollarSign,
  ShieldCheck,
  Check,
  Clock,
  Shield,
  Sparkles,
  Moon,
  Sun,
  CheckCheck,
  Target,
  Rocket,
  Heart,
} from "lucide-react";

// 👉 JSON-контент, редактируемый через админку
import home from "../content/home.json";
import VideoShowcase from "./components/VideoShowcase"; // 👈 добавлен импорт
import PriceCalculator from "./components/PriceCalculator";

// Новые UI-компоненты для «дороже» визуала
import FloatingOrbs from "./components/ui/FloatingOrbs";
import GlassCard from "./components/ui/GlassCard";
import MagneticButton from "./components/ui/MagneticButton";

import TechMarquee from "./components/TechMarquee";

import FloatingBlobs from "./components/ui/FloatingBlobs";
import Dust from "./components/ui/Dust";

const AGENCY_NAME = "lang2lang";
const TELEGRAM_LINK = "https://t.me/sup_lang2lang";
const EMAIL = "support@lang2lang.io";

const getPreferredTheme = (): "light" | "dark" => {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
};

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function ThemeSwitch({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
}) {
  const isDark = theme === "dark";
  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);


  return (
    <button
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-colors duration-300 
        ${isDark ? "bg-orange-600 border-orange-600" : "bg-gray-300 border-gray-300"} 
        dark:${isDark ? "bg-orange-600 border-orange-600" : "bg-neutral-700 border-neutral-700"}`}
      aria-label="Переключить тему"
      title={isDark ? "Светлая тема" : "Тёмная тема"}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute flex items-center justify-center h-5 w-5 rounded-full bg-white shadow-sm text-orange-500 ${
          isDark ? "right-0.5" : "left-0.5"
        }`}
      >
        {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      </motion.span>
    </button>
  );
}

export default function Landing() {
  const [theme, setTheme] = useState<"light" | "dark">(() => getPreferredTheme());
  const [scrolled, setScrolled] = useState(false);

      {/* скорлл к форме */}
    const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const header = document.querySelector("header") as HTMLElement | null;
    const offset = header?.offsetHeight ?? 0;
    const y = el.getBoundingClientRect().top + window.scrollY - offset - 8;

  window.scrollTo({ top: y, behavior: "smooth" });
};


// ✅ Калькулятор дохода: логика
useEffect(() => {
  const range = document.getElementById("rangeViews") as HTMLInputElement;
  const viewsOut = document.getElementById("viewsOut")!;
  const incomeOut = document.getElementById("incomeOut")!;
  const bubble = document.getElementById("rangeBubble")!;
  const rpm = { en: 5, pt: 1.5, es: 2.5 };
  const langs = ["en", "pt", "es"];
  let current = 0;

  function animate(el: HTMLElement, start: number, end: number) {
    const t = 260;
    const diff = end - start;
    let st: number | null = null;
    function step(time: number) {
      if (!st) st = time;
      const p = Math.min((time - st) / t, 1);
      el.textContent = "$" + Math.floor(start + diff * p).toLocaleString() + " / месяц";
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function calc() {
    const v = Number(range.value);
    viewsOut.textContent = v.toLocaleString();

    const percent = ((v - 50000) / (5000000 - 50000)) * 100;
    range.style.setProperty("--percent", `${percent}%`);

    const pos = range.offsetWidth * (percent / 100);
    bubble.style.setProperty("--bubble-x", pos + "px");
    bubble.textContent = v.toLocaleString();

    let total = 0;
    langs.forEach(l => {
      const el = document.getElementById(l) as HTMLInputElement;
      if (el?.checked) total += (v / 1000) * rpm[l as keyof typeof rpm];
    });

    animate(incomeOut, current, total);
    current = total;
  }

  range.oninput = calc;
  range.onmousedown = () => bubble.classList.add("show");
  range.onmouseup = () => bubble.classList.remove("show");
  range.ontouchstart = () => bubble.classList.add("show");
  range.ontouchend = () => bubble.classList.remove("show");

  langs.forEach(l => {
    const el = document.getElementById(l) as HTMLInputElement;
    el.onchange = calc;
  });

  calc();
}, []);




  // ScrollSpy + back-to-top
  const sectionIds = useMemo(() => ["services", "process", "pricing", "contact", "faq"], []);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showTop, setShowTop] = useState(false);

   // ✅ Флаг успешной отправки формы
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    const onScrollShadow = () => setScrolled(window.scrollY > 10);
    const onScrollTop = () => setShowTop(window.scrollY > 600);

    window.addEventListener("scroll", onScrollShadow, { passive: true });
    window.addEventListener("scroll", onScrollTop, { passive: true });

    // ✅ Выбираем секцию с максимальным пересечением
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActiveId(vis[0].target.id);
      },
      {
        root: null,
        // Чуть «сужаем» окно, чтобы хедер не мешал
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    // Подписываем нужные секции
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScrollShadow);
      window.removeEventListener("scroll", onScrollTop);
      io.disconnect();
    };
  }, [sectionIds]);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="theme-transition min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100 relative overflow-hidden">
        
 

        {/* Текстура фона */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise" />

        {/* 🔥 Тёплый сияющий акцент снизу справа */}
        <div
        aria-hidden
        className="
          pointer-events-none
          absolute bottom-[-260px] right-[-220px]
          w-[620px] h-[620px]
          rounded-full
          bg-orange-500/35
          blur-[140px]
          dark:bg-orange-400/30
          z-0
        "
      />
        
        {/* Анимированный градиент Hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-[40%] blur-3xl opacity-40 animate-gradient
                     bg-gradient-to-r from-orange-600 via-amber-500 to-rose-500 dark:opacity-25"
        />

        {/* Хедер (glass при скролле) */}
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-black/5 dark:border-white/10 ${
            scrolled ? "glass" : "bg-white/50 dark:bg-neutral-950/40 backdrop-blur"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
              href="/"
              className="flex items-center gap-2 cursor-pointer select-none hover:opacity-80 transition"
            >
            <img src="/icons/logo1.png" className="w-5 h-5" alt="logo" />
            <span className="font-semibold text-sm md:text-base">{AGENCY_NAME}</span>
          </a>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              {[
                { id: "services", label: "Вы получаете" },
                { id: "process", label: "Как мы работаем" },,
                { id: "pricing", label: "Формат" },
                { id: "contact", label: "Контакты" },
                { id: "faq", label: "FAQ" },
              ].map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={`relative hover:text-gray-700 dark:hover:text-neutral-300 transition-colors ${
                    activeId === l.id ? "text-orange-600 dark:text-orange-300" : ""
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full rounded bg-current transition-opacity ${
                      activeId === l.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <ThemeSwitch theme={theme} setTheme={setTheme} />
              <button
              onClick={() => scrollToId("contact")}
              className="hidden sm:inline-block rounded-2xl bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 shadow-md shadow-orange-600/20 text-sm"
              >
              Связаться
              </button>

            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative pt-28 md:pt-32">
          <FloatingOrbs />
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold leading-tight">
                {home.heroTitle}{" "}
                <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">каналы YouTube</span>
                <br />на других языках
              </motion.h1>
              <motion.p variants={fadeInUp} className="mt-4 text-lg text-gray-600 dark:text-neutral-300">
                {home.heroSubtitle}
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-6 flex flex-col sm:flex-row gap-3">
                <MagneticButton onClick={() => scrollToId("contact")}>
                  <span className="inline-flex items-center gap-2">
                    {home.ctaPrimary} <ArrowRight className="w-4 h-4" />
                  </span>
                </MagneticButton>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-2xl border border-orange-300 text-orange-700 hover:bg-orange-50 px-4 py-2 dark:border-orange-500/40 dark:text-orange-300 dark:hover:bg-orange-500/10"
                >
                  {home.ctaSecondary} <PlayCircle className="w-5 h-5" />
                </motion.a>
              </motion.div>
              <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-neutral-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  Быстрый запуск
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-600" />
                  Качественная озвучка
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  Проверка носителями языка
                </div>
              </motion.div>
            </motion.div>

            {/* Правая колонка hero */}

              <VideoShowcase />

          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-24 py-20" data-testid="section-services">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold">
              Вы получаете
            </motion.h2>
            <motion.p variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-gray-600 dark:text-neutral-300 mt-2">
              Начните сотрудничество сейчас чтобы начать не потом
            </motion.p>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid md:grid-cols-3 gap-6"
            >
              {home.services.map((s, idx) => (
                <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -4 }}>
                  <GlassCard>
                    <div className="flex items-center gap-2 font-semibold">
                      {idx === 0 && <Globe className="w-5 h-5" />}
                      {idx === 1 && <CircleDollarSign className="w-5 h-5" />}
                      {idx === 2 && <ShieldCheck className="w-5 h-5" />}
                      {s.title}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-neutral-300 mt-2">{s.desc}</p>
                    {/* Пример списка фич — оставлен как было; можно тоже вынести в JSON при желании */}
                  <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-neutral-300">
                      {s.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-600" />
                    {f}
                  </li>
                    ))}
                  </ul>

                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="scroll-mt-24 py-20 bg-orange-50 dark:bg-[#0D0B0A]" data-testid="section-process">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold">
              Как мы работаем
            </motion.h2>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid md:grid-cols-4 gap-6"
            >
              {[
                { step: "1", title: "Заявка", text: "Оставляете заявку на сайте — мы быстро связываемся, чтобы обсудить детали и запуск." },
                { step: "2", title: "Старт", text: "Запускаем локализованные каналы, адаптируем контент и берём все технические задачи на себя." },
                { step: "3", title: "Рост", text: "Продвигаем ролики, увеличиваем охваты и помогаем вам выйти на новую аудиторию." },
                { step: "4", title: "Оплата", text: "Справедливое распределние доходов, мы зарабатываем только тогда, когда зарабатываете вы." },
              ].map((i) => (
                <motion.div key={i.step} variants={fadeInUp} whileHover={{ y: -3 }}>
                  <GlassCard>
                    <div className="text-xl font-semibold">
                      Шаг {i.step}. {i.title}
                    </div>
                    <div className="text-gray-600 dark:text-neutral-300 mt-2">{i.text}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

{/* YouTube Earnings Calculator */}
<section id="yt-calculator" className="scroll-mt-24 py-20 px-4 text-center">
  <h2 className="text-3xl font-bold mb-2">
    Сколько ваш канал может приносить на других языках?
  </h2>
  <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
    Передвиньте ползунок и узнайте потенциал вашего YouTube-канала
  </p>

  <div
    className="
      relative z-10 max-w-xl mx-auto 
      bg-white dark:bg-neutral-900 
      text-gray-900 dark:text-white
      shadow-xl rounded-2xl p-8 transition
      border border-black/5 dark:border-white/10

      transition-all duration-300
      hover:-translate-y-1
      hover:shadow-[0_0_32px_6px_rgba(255,127,80,0.35)]
    "
  >
    <span className="text-sm text-gray-500 dark:text-gray-400">
      Месячные просмотры
    </span>

    <div className="relative w-full">
      <input 
        id="rangeViews" 
        type="range" 
        min="50000" 
        max="5000000" 
        step="50000" 
        defaultValue="500000"
        className="w-full my-6"
      />
      <div id="rangeBubble" className="range-bubble">500,000</div>
    </div>

    <div id="viewsOut" className="text-2xl font-bold mb-6">500,000</div>

    <div className="flex justify-center gap-10 mb-6">
      {[
        { id: "en", code: "us", defaultChecked: true },
        { id: "pt", code: "pt", defaultChecked: true },
        { id: "es", code: "es", defaultChecked: false }
      ].map((lang) => (
        <label key={lang.id} className="flex flex-col items-center cursor-pointer gap-1">
          <input
            id={lang.id}
            type="checkbox"
            defaultChecked={lang.defaultChecked}
            className="hidden peer"
          />

          <span
            className="
              w-6 h-6 rounded-full border-2 border-gray-400 
              peer-checked:border-orange-600 peer-checked:bg-orange-600 
              transition-all duration-200
            "
          ></span>

          <Flag code={lang.code} />
        </label>
      ))}
    </div>

    <div className="text-gray-500 dark:text-gray-400 text-sm">
      Потенциальный доход:
    </div>
    <div id="incomeOut" className="text-3xl font-extrabold mb-6">
      $0 / месяц
    </div>


  </div>
</section>


{/* Partnership Models */}
<section id="pricing" className="py-24 bg-orange-50 dark:bg-[#0D0B0A] px-4 text-center scroll-mt-24" data-testid="section-pricing">
  <h2 className="text-3xl font-bold mb-2">Формат сотрудничества</h2>
  <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
    Или почему вам стоит выбрать нас
  </p>

<div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

  {[
    {
      icon: Rocket,
      description:
        "Полный цикл локализации, дубляжа и управления каналами. Говорите с миром на любом языке.",
    },
    {
      icon: Heart,
      description:
        "Мы не агентство — мы партнёры. Развиваем международные медиа-бренды вместе.",
    },
    {
      icon: Target,
      description:
        "Тестируем один рынок без риска. Масштабируем — только после доказанного результата.",
    },
  ].map((card, i) => (
    <div key={i} className="relative group [perspective:1200px] cursor-pointer">
      <div className="relative h-80 w-full transition-transform duration-[900ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

        {/* FRONT */}
        <div className="absolute inset-0 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-white/5
                        border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                        flex items-center justify-center
                        [backface-visibility:hidden]
                        transition-all duration-500
                        group-hover:shadow-[0_0_32px_6px_rgba(255,127,80,0.35)]
                        group-hover:border-transparent">

            {/* одна галочка как в старом варианте */}
            <div className="absolute top-6 right-7">
              <Check className="w-7 h-7 text-gray-600 dark:text-gray-400 opacity-40" />
            </div>

          {/* Оранжевый круг + иконка */}
          <div className="w-24 h-24 rounded-full bg-orange-600/20 border border-orange-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(255,127,80,0.4)]">
            <card.icon className="w-14 h-14 text-orange-500" />
          </div>
        </div>

        {/* BACK */}
        <div className="
              absolute inset-0 rounded-2xl backdrop-blur-xl
              bg-white dark:bg-neutral-900
              border border-white/40 dark:border-white/10 shadow-xl
              transition-all duration-500
              group-hover:shadow-[0_0_32px_6px_rgba(255,127,80,0.35)]
              group-hover:border-transparent
              after:absolute after:inset-0 after:rounded-2xl after:p-[2px]
              after:bg-gradient-to-br
              after:from-orange-500/80 after:via-pink-500/80 after:to-purple-500/80
              after:opacity-100 after:transition-opacity
              after:duration-500 after:-z-10
              p-8 flex items-center justify-center
              [transform:rotateY(180deg)] [backface-visibility:hidden]
            ">

            {/* двойная оранжевая галочка сверху справа */}
            <div className="absolute top-6 right-7 flex items-center gap-1">
              <CheckCheck className="w-7 h-7 text-gray-100 dark:text-gray-100" />
            </div>

          <p className="text-base leading-relaxed text-gray-100 dark:text-gray-200 font-medium">
            {card.description}
          </p>
        </div>

      </div>
    </div>
  ))}

</div>

</section>




{/* Contact */}
<section id="contact" className="scroll-mt-24 py-20 bg-gray-50 dark:bg-[#0D0B0A]" data-testid="section-contact">
  <div className="max-w-2xl mx-auto px-4">
    <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold text-center">
      Расскажите о проекте
    </motion.h2>
    <motion.p variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-gray-600 dark:text-neutral-300 text-center mt-2">
      Мы ответим в течение рабочего дня. Или напишите сразу в Telegram.
    </motion.p>

    <motion.form
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      onSubmit={async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target as HTMLFormElement);
        formData.append("access_key", "cd31617a-233d-4a30-ac96-6efa637ee704");

        // honeypot check
        if (formData.get("bot_trap")) return;

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const result = await response.json();
        setIsSubmitting(false);

        if (result.success) {
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 5000); // return form after 5 sec
        } else {
          alert("Ошибка отправки. Попробуйте позже 🙏");
        }
      }}
      className="mt-8 grid gap-4"
    >
      {!submitted ? (
        <>
          {/* Honeypot bot field */}
          <input type="text" name="bot_trap" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

          <input
            name="name"
            placeholder="Ваше имя"
            required
            className="relative z-10 rounded-2xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />

          <input
            type="email"
            name="email"
            placeholder="Почта"
            required
            className="relative z-10 rounded-2xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />

          <input
            name="channel"
            placeholder="Ссылка на канал/видео"
            className="relative z-10 rounded-2xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />

          <textarea
            name="message"
            placeholder="Кратко опишите задачу (язык, длительность, дедлайн)"
            rows={5}
            className="relative z-10 rounded-2xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          />

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
              type="submit"
              className={`rounded-2xl text-white px-4 py-2 shadow-lg shadow-orange-600/25
                ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}`}
            >
              {isSubmitting ? "Отправляем..." : "Отправить"}
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              href={TELEGRAM_LINK} target="_blank"
              className="rounded-2xl border border-orange-300 text-orange-700 hover:bg-orange-50 px-4 py-2 
                         dark:border-orange-500/40 dark:text-orange-300 dark:hover:bg-orange-500/10"
            >
              Написать в Telegram
            </motion.a>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-2 py-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl"
          >
            ✅
          </motion.div>

          <p className="text-lg font-medium">Спасибо! Совсем скоро мы ответим вам 🎉</p>
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            Форма вернётся автоматически
          </p>
        </motion.div>
      )}
    </motion.form>
  </div>
</section>

        {/* ➤ ➤ ➤ ДОБАВЛЕНО: Бегущая строка */}
        <TechMarquee />

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 py-20" data-testid="section-faq">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold">
              FAQ
            </motion.h2>
            <FAQAccordion />
          </div>
        </section>


{/* Банер */}
<section className="mt-24 mb-48 px-4">
<div
    className="
      relative z-10 max-w-7xl mx-auto rounded-3xl p-12 md:p-18
      transition-transform duration-300 hover:-translate-y-1
      shadow-xl
      bg-gradient-to-r from-[#ffc08a] via-[#ffb0b8] to-[#f7b7ff]
      dark:bg-[linear-gradient(135deg,#2c1d15_0%,#451d28_100%)]
    "
  >
    <div className="flex flex-col md:flex-row items-center justify-between gap-10">

      {/* ЛОГО + ТЕКСТ */}
      <div className="flex items-center gap-6 flex-1 min-w-0">
        <img
          src="/icons/logo-white.png"
          alt="logo"
          className="w-20 h-20 object-contain"
        />

        <h2 className="
          text-3xl md:text-4xl lg:text-5xl
          font-bold text-white
          leading-tight whitespace-nowrap
        ">
          Пора вещать на весь мир
        </h2>
      </div>

      {/* КНОПКА */}
      <a
        onClick={() => scrollToId("contact")}
        className="
          cursor-pointer select-none
          px-8 py-4 rounded-xl
          bg-orange-600 text-white font-semibold
          hover:bg-orange-700 transition
          shadow-[0_0_20px_4px_rgba(255,98,0,0.35)]
          whitespace-nowrap
        "
      >
        Стать партнёром
      </a>
    </div>
  </div>
</section>






<footer className="py-12 min-h-[180px] footer-mask">
  <div className="footer-blend"></div>

  {/* Верхняя панель: копирайт + политика */}
  <div className="absolute left-10 bottom-10 flex items-center gap-6 text-black dark:text-white text-sm">
    <span>© lang2lang 2025. Все права защищены</span>
    <a href="https://www.lang2lang.io/privacy.html" className="underline hover:text-white">
      Политика конфиденциальности
    </a>
  </div>

  {/* Кнопки справа → прозрачные + выравнивание */}
  <div className="absolute right-20 bottom-10 flex items-center gap-4">
    <a
      href="https://t.me/sup_lang2lang"
      className="w-12 h-12 flex items-center justify-center rounded-xl
      bg-white/10 backdrop-blur border border-white/20
      hover:bg-orange-600 hover:border-orange-600 transition cursor-pointer shadow-sm"
    >
      <img src="/icons/telegram.svg" className="w-6 h-6 opacity-80" />
    </a>

    <a
      href="mailto:support@lang2lang.io"
      className="w-12 h-12 flex items-center justify-center rounded-xl
      bg-white/10 backdrop-blur border border-white/20
      hover:bg-orange-600 hover:border-orange-600 transition cursor-pointer shadow-sm"
    >
      <img src="/icons/email.svg" className="w-6 h-6 opacity-80" />
    </a>
  </div>
</footer>





        {/* Back to top */}
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-600 text-white px-3 py-2 shadow-lg hover:bg-orange-700 transition-colors"
            aria-label="Наверх"
            title="Наверх"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
}

function FAQAccordion() {
  const items = [
    {
      q: "Сколько стоит локализация, адаптация и другие услуги от Lang2Lang?",
      a: "Мы не берём денег за подписку, работу, локализацию. В нашем сотрудничестве мы платим вам, а не наоборот.",
    },
    {
      q: "Какое количество времени занимает локализация контента?",
      a: "Мы работаем быстро! Сразу после того, как вы становитесь партнёром Lang2Lang, мы сразу начинаем создание каналов и адаптируем его под новые рынки.",
    },
    {
      q: "Чем отличается Lang2Lang и обычные инструменты дубляжа?",
      a: "Большая часть инструментов для дубляжа требует собственного вмешательства, оплаты, загрузки видео, проверок. В нашем случае вам это всё не потребуется, мы делаем всё от начала и до конца, без траты вашего времени и сил.",
    },
    {
      q: "Как долго я могу получать доход с локализованных каналов?",
      a: "Всегда. Пока видео продолжают набирать просмотры, ваш канала будет монетезироваться и мы будем делиться с вами полученным доходом.",
    },
  ];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-8 grid md:grid-cols-2 gap-6">
      {items.map((f, i) => {
        const opened = open === i;
        return (
          <motion.div key={i} variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <button
              onClick={() => setOpen(opened ? null : i)}
              className="w-full text-left relative z-10 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-6 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              aria-expanded={opened}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-semibold">{f.q}</span>
                <span className={`ml-4 transition-transform ${opened ? "rotate-45" : ""}`}>＋</span>
              </div>
            <motion.div
            initial={false}
            animate={{ height: opened ? 'auto' : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
            >
            <p className="text-gray-600 dark:text-neutral-300">{f.a}</p>
            </motion.div>

            </button>
          </motion.div>
        );
      })}
    </div>
  );
}